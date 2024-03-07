import { Auth } from "./apiCtx";
import { WebSocket } from "./dependencyDefinitions/webSocket";
import type {
  InvalidateMessage,
  SubscribeDecoupledOperation,
  SubscribeInvalidateDetails,
  UpdateDecoupledOperationMessage,
  WebSocketAuthenticatedMessage,
  WebSocketCommand,
  WebSocketCommandSubscribe,
  WebSocketError,
  WebSocketMessage,
  WebSocketMessageErrorOnSubscription,
  WebSocketPingMessage,
  WebSocketSubscriptionMessage,
} from "./websocketTypes";

const LOG_PREFIX = "[brokerize WebSocketClient] ";

export class BrokerizeWebSocketClientImpl implements BrokerizeWebSocketClient {
  private _url: string;
  private _map: Record<string, SubscriptionEntry> = {};
  private _id: number;
  private _socket: WebSocket | null;
  private _pingIntvl: any | null;
  private _reconnectIntvl: any | null;
  private _authenticatedCallback: any = null;
  private _disconnectTimeout: any | null = null;
  private _isOpen = false;
  private _auth: Auth;
  private _createWebsocket: (url: string) => WebSocket;

  private _fatalError: WebSocketError | null = null;
  private _lastNonFatalError: WebSocketError | null = null;
  private _errorCount = 0;

  constructor(
    websocketUrl: string,
    auth: Auth,
    createWebSocket: (url: string) => WebSocket
  ) {
    this._url = websocketUrl;
    this._id = 0;
    this._socket = null;
    this._pingIntvl = null;
    this._updateReconnectInterval();
    this._auth = auth;
    this._createWebsocket = createWebSocket;
  }

  private _updateReconnectInterval() {
    if (this._reconnectIntvl) {
      clearInterval(this._reconnectIntvl);
    }
    if (this._fatalError) {
      return;
    }
    this._reconnectIntvl = setInterval(() => {
      if (!this._socket && this._shouldConnect()) {
        if (this._errorCount > 0) {
          // eslint-disable-next-line no-console
          console.warn(
            LOG_PREFIX +
              "reconnecting. current error count is " +
              this._errorCount +
              ". the last error was: ",
            this._lastNonFatalError
          );
        }
        this._connect();
      }
    }, this._computeReconnectIntervalInMilliseconds(this._errorCount));
  }

  /**
   * Simple backoff behavior: first retry is fast (100ms), next 9 retries 1s, after that we only reconnect every 10s.
   */
  private _computeReconnectIntervalInMilliseconds(errorCount: number) {
    if (errorCount == 0) {
      return 100;
    } else if (errorCount < 10) {
      return 1000;
    } else {
      return 10000;
    }
  }

  private _shouldConnect() {
    if (this._fatalError) {
      return false;
    }

    for (const k in this._map) {
      if (this._map[k].callbacks?.length > 0) {
        return true;
      }
    }
    return false;
  }

  private subscribe(cmd: WebSocketCommandSubscribe, callback: Callback) {
    if (this._fatalError) {
      // no more subscriptions on a websocket client that has a fatal error
      callback(this._fatalError, null);
      return {
        unsubscribe: () => {},
      } as Subscription;
    }

    const key = JSON.stringify(cmd);

    const wrappedCb = (err: any, data: any) => callback(err, data);

    if (!this._map[key]) {
      this._map[key] = {
        callbacks: [wrappedCb],
        idOnSocket: null,
      };
    } else {
      this._map[key].callbacks.push(wrappedCb);
    }

    if (this._map[key].callbacks.length == 1) {
      /* first subscriber must start it */
      this._startSubscription(key);
    }

    this._startOrStopDisconnectTimeout();

    let unsub = false;

    return {
      unsubscribe: () => {
        if (unsub) {
          return;
        }
        unsub = true;
        this._map[key].callbacks = this._map[key].callbacks.filter(
          (cb) => cb != wrappedCb
        );
        if (this._map[key].callbacks.length == 0) {
          this._endSubscription(key);
        }
        this._startOrStopDisconnectTimeout();
      },
    } as Subscription;
  }

  subscribeInvalidate(
    subscribe: SubscribeInvalidateDetails,
    callback: Callback
  ) {
    const cmd: WebSocketCommandSubscribe = {
      cmd: "subscribe",
      type: "invalidate",
      subscriptionId: null as any as number,
      ...subscribe,
    };
    return this.subscribe(cmd, callback);
  }

  subscribeDecoupledOperation(
    subscribe: Pick<
      SubscribeDecoupledOperation,
      "sessionId" | "decoupledOperationId"
    >,
    callback: Callback
  ) {
    const cmd: WebSocketCommandSubscribe = {
      cmd: "subscribe",
      type: "decoupledOperationStatus",
      subscriptionId: null as any as number,
      ...subscribe,
    };
    return this.subscribe(cmd, callback);
  }

  private _startSubscription(key: string) {
    if (this._fatalError) {
      this._notifySubscribersAboutFatalError(key);
      return;
    }

    if (this._socket?.readyState == 1 && this._isOpen) {
      this._id++;
      this._map[key].idOnSocket = this._id;
      const cmd = JSON.parse(key) as WebSocketCommandSubscribe;
      cmd.subscriptionId = this._id;
      this._sendWs(cmd, true);
    } else if (!this._socket) {
      this._connect();
    }
  }

  private _endSubscription(key: string) {
    if (this._map[key].idOnSocket != null) {
      this._sendWs(
        {
          cmd: "unsubscribe",
          subscriptionId: this._map[key].idOnSocket as number,
        },
        true
      );
      this._map[key].idOnSocket = null;
    }
  }

  _startOrStopDisconnectTimeout() {
    if (this._shouldConnect()) {
      if (this._disconnectTimeout) {
        clearTimeout(this._disconnectTimeout);
        this._disconnectTimeout = null;
      }
    } else if (!this._disconnectTimeout) {
      // if there is no subscription open for 3s, disconnect from WebSocket
      this._disconnectTimeout = setTimeout(() => {
        if (!this._shouldConnect()) {
          this._socket?.close();
          this._socket = null;
          this._disconnectTimeout = null;
        }
      }, 3000);
    }
  }

  private _sendWs(data: WebSocketCommand, doConnect = false) {
    if (!this._socket && doConnect) {
      this._connect();
    }

    if (this._socket?.readyState == 1) {
      this._socket?.send(JSON.stringify(data));
    } else {
      // eslint-disable-next-line no-console
      console.log(
        LOG_PREFIX + "socket not ready, not sending message.",
        this._lastNonFatalError,
        this._fatalError
      );
    }
  }

  private _connect() {
    if (this._socket) {
      this._isOpen = false;
      this._socket.close();
    }

    if (this._fatalError) {
      // no more connections on a websocket client that has a fatal error
      return;
    }

    this._authenticatedCallback = null;

    this._socket = this._createWebsocket(this._url);
    this._socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data) as WebSocketMessage;
      if ((message as WebSocketSubscriptionMessage).subscriptionId) {
        /* message concerns a subscription */
        if ((message as InvalidateMessage).cmd == "invalidate") {
          const entry = this._findSubscriptionEntry(
            (message as WebSocketSubscriptionMessage).subscriptionId
          );
          entry?.entry.callbacks.forEach((cb) => cb(null, message));
        } else if (
          (message as UpdateDecoupledOperationMessage).cmd ==
          "updateDecoupledOperationStatus"
        ) {
          const entry = this._findSubscriptionEntry(
            (message as WebSocketSubscriptionMessage).subscriptionId
          );
          entry?.entry.callbacks.forEach((cb) => cb(null, message));
        } else if ((message as WebSocketMessageErrorOnSubscription).error) {
          /* error on subscription */
          const entry = this._findSubscriptionEntry(
            (message as WebSocketSubscriptionMessage).subscriptionId
          );
          entry?.entry.callbacks.forEach((cb) =>
            cb(message as WebSocketMessageErrorOnSubscription, null)
          );
        }
      } else if (
        (message as WebSocketAuthenticatedMessage).cmd == "authenticated"
      ) {
        this._authenticatedCallback && this._authenticatedCallback();
        this._authenticatedCallback = null;
      } else if ((message as WebSocketPingMessage).cmd == "ping") {
        // NOP
      } else if (message as WebSocketError) {
        const e = message as WebSocketError;
        if (e.error?.message == "authentication failed") {
          // we treet authentication failed as a fatal error, this should just not happen if the client creates
          // the websocket client correctly. If it happens, applications will have to create a new instance.
          this._handleFatalError(e);
        } else {
          this._handleNonFatalError(e);
        }
      }
    };

    this._socket.onopen = () => {
      Promise.resolve(this._auth.getToken()).then(
        (token) => {
          const _authCb = () => {
            this._isOpen = true;
            this._resetErrorState();
            for (const k in this._map) {
              this._startSubscription(k);
            }
          };

          if (token) {
            this._sendWs(
              {
                cmd: "authorize",
                idToken: token.idToken,
              },
              true
            );
            this._authenticatedCallback = _authCb;
          } else {
            _authCb();
          }
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.error(LOG_PREFIX + " connection failed", err);
        }
      );
    };

    this._socket.onclose = () => {
      this._socket = null;
      for (const k in this._map) {
        this._endSubscription(k);
      }
    };
    this._pingIntvl && clearInterval(this._pingIntvl);
    this._pingIntvl = setInterval(() => {
      // 2: CLOSING, 3: CLOSED
      if (
        this._socket?.readyState == 2 ||
        (this._socket?.readyState == 3 && this._shouldConnect())
      ) {
        this._connect();
        return;
      }

      if (this._socket?.readyState == 1) {
        // open
        this._sendWs({
          cmd: "ping",
        });
      }
    }, 30000);
  }

  /**
   * Error happend when trying to connect, but it may be solved by trying a reconnect later.
   */
  private _handleNonFatalError(e: WebSocketError) {
    this._errorCount++;
    this._lastNonFatalError = e;
    this._updateReconnectInterval();
  }

  /**
   * Fatal error: this means the client is unusable from now on and must be recreated.
   */
  private _handleFatalError(e: WebSocketError) {
    this._fatalError = e;
    this._updateReconnectInterval();
    this._pingIntvl && clearInterval(this._pingIntvl);
    for (const key in this._map) {
      this._notifySubscribersAboutFatalError(key);
    }
  }

  /**
   * If a fatal error occurs, all registered callbacks must be called with the error parameter.
   */
  private _notifySubscribersAboutFatalError(key: string) {
    this._map[key].callbacks.forEach((cb) => {
      try {
        cb(this._fatalError, null);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(LOG_PREFIX + "error in callback", err);
      }
    });
  }

  /**
   * Once we have successfully established a connection, error counts and states must be reset.
   */
  private _resetErrorState() {
    this._lastNonFatalError = null;
    this._errorCount = 0;
    this._updateReconnectInterval();
  }

  private _findSubscriptionEntry(subscriptionId: number) {
    for (const k in this._map) {
      if (this._map[k].idOnSocket == subscriptionId) {
        return { key: k, entry: this._map[k] };
      }
    }

    return null;
  }
}

export interface BrokerizeWebSocketClient {
  subscribeInvalidate: (
    subscribe: SubscribeInvalidateDetails,
    callback: Callback
  ) => Subscription;

  subscribeDecoupledOperation: (
    subscribe: Pick<
      SubscribeDecoupledOperation,
      "sessionId" | "decoupledOperationId"
    >,
    callback: Callback
  ) => Subscription;
}

export type Callback<T = any> = (err: any, data: T) => void;

export type Subscription = {
  unsubscribe: () => void;
};

type SubscriptionEntry = {
  idOnSocket: number | null;
  callbacks: Callback[];
};
