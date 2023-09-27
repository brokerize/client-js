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

export class BrokerizeWebSocketClientImpl implements BrokerizeWebSocketClient {
  private _url: string;
  private _map: Record<string, SubscriptionEntry> = {};
  private _id: number;
  private _socket: WebSocket | null;
  private _pingIntvl: any | null;
  private _reconnectIntvl: any | null;
  private _authenticatedCallback: any = null;
  private _isOpen = false;
  private _auth: Auth;
  private _createWebsocket: (url: string) => WebSocket;

  constructor(
    websocketUrl: string,
    auth: Auth,
    createWebSocket: (url: string) => WebSocket
  ) {
    this._url = websocketUrl;
    this._id = 0;
    this._socket = null;
    this._pingIntvl = null;
    this._reconnectIntvl = setInterval(() => {
      if (!this._socket && this._needsConnection()) {
        this._connect();
      }
    }, 1000);
    this._auth = auth;
    this._createWebsocket = createWebSocket;
  }

  private _needsConnection() {
    for (const k in this._map) {
      if (this._map[k].callbacks?.length > 0) {
      }
      return true;
    }
    return false;
  }

  private subscribe(cmd: WebSocketCommandSubscribe, callback: Callback) {
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

  private _sendWs(data: WebSocketCommand, doConnect = false) {
    if (!this._socket && doConnect) {
      this._connect();
    }

    if (this._socket?.readyState == 1) {
      this._socket?.send(JSON.stringify(data));
    } else {
      // eslint-disable-next-line no-console
      console.log(
        "[brokerize WebSocketClient] socket not ready, not sending message."
      );
    }
  }

  private _connect() {
    if (this._socket) {
      this._isOpen = false;
      this._socket.close();
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
        // eslint-disable-next-line no-console
        console.error((message as WebSocketError).error);
      }
    };

    this._socket.onopen = () => {
      Promise.resolve(this._auth.getToken()).then(
        (token) => {
          const _authCb = () => {
            this._isOpen = true;
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
          console.error(err);
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
      if (this._socket?.readyState == 2 || this._socket?.readyState == 3) {
        this._connect();
        return;
      }
      this._sendWs({
        cmd: "ping",
      });
    }, 30000);
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

export type Callback = (err: any, data: any) => void;

export type Subscription = {
  unsubscribe: () => void;
};

type SubscriptionEntry = {
  idOnSocket: number | null;
  callbacks: Callback[];
};
