/* eslint-disable no-console */
import { Auth } from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import { WebSocket } from "./dependencyDefinitions/webSocket";
import { BrokerizeWebSocketError } from "./errors";
import type {
  BrokerizeWebSocketError as WebSocketErrorPayload,
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
  WebSocketSubscriptionMessage,
  WebSocketPingMessage,
} from "./websocketTypes";

const LOG_PREFIX = "[brokerize WebSocketClient] ";

/**
 * How often in a row the server may reject our token before the client gives up (see
 * `WebSocketConnectionState`). Every attempt fetches a fresh token first, so the first retry
 * already covers the common case of a token that expired in flight, and the remaining ones cover
 * a backend that is briefly unable to validate it. Together with `AUTH_RETRY_INTERVAL` this spans
 * several minutes, after which a token that is still being rejected is not going to be accepted:
 * the session is over and retrying would only keep refreshing tokens for nobody.
 *
 * Until then the client stays in `reconnecting` and reports the rejection through
 * `subscribeConnectionState`, so an application can tell the user that live updates are currently
 * unavailable without tearing down its subscriptions.
 */
const DEFAULT_MAX_CONSECUTIVE_AUTH_FAILURES = 10;

/**
 * The reconnect interval once the token has been rejected more than once. Every one of these
 * attempts costs a token refresh, so they are spaced much wider than a plain reconnect. The first
 * retry is deliberately not slowed down: it is the one that fixes a token that expired in flight.
 */
const AUTH_RETRY_INTERVAL = 30000;

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

  private _fatalError: BrokerizeWebSocketError | null = null;
  private _lastNonFatalError: BrokerizeWebSocketError | null = null;
  private _errorCount = 0;
  private _apiCtx: AuthorizedApiContext | null = null;

  /**
   * How often the server rejected our token in a row. Every retry forces a token refresh, and
   * only `_maxConsecutiveAuthFailures` of them in a row are fatal. Reset on every successful
   * authentication.
   */
  private _authFailureCount = 0;
  private _maxConsecutiveAuthFailures: number;
  private _forceTokenRefresh = false;

  private _destroyed = false;
  private _connectionState: WebSocketConnectionState = { status: "closed" };
  private _connectionStateCallbacks: ConnectionStateCallback[] = [];

  constructor(
    websocketUrl: string,
    auth: Auth,
    createWebSocket: (url: string) => WebSocket,
    options?: BrokerizeWebSocketClientOptions,
  ) {
    this._url = websocketUrl;
    this._id = 0;
    this._socket = null;
    this._pingIntvl = null;
    this._maxConsecutiveAuthFailures =
      options?.maxConsecutiveAuthFailures ??
      DEFAULT_MAX_CONSECUTIVE_AUTH_FAILURES;
    this._updateReconnectInterval();
    this._auth = auth;
    this._createWebsocket = createWebSocket;
  }

  private _updateReconnectInterval() {
    if (this._reconnectIntvl) {
      clearInterval(this._reconnectIntvl);
      this._reconnectIntvl = null;
    }
    if (this._fatalError || this._destroyed) {
      return;
    }
    this._reconnectIntvl = setInterval(() => {
      if (!this._socket && this._shouldConnect()) {
        if (this._errorCount > 0) {
          console.warn(
            LOG_PREFIX +
              "reconnecting. current error count is " +
              this._errorCount +
              ". the last error was: ",
            this._lastNonFatalError,
          );
        }
        this._connect();
      }
    }, this._computeReconnectIntervalInMilliseconds(this._errorCount));
  }

  /**
   * Simple backoff behavior: first retry is fast (100ms), next 9 retries 1s, after that we only reconnect every 10s.
   * Jitter is added to avoid a thundering herd when many clients reconnect simultaneously (e.g. after a server-side disconnect).
   * The first retry uses a wider jitter window (~1s) because that's the scenario most prone to bursts of TLS handshakes.
   *
   * A token that keeps being rejected is retried far more slowly (`AUTH_RETRY_INTERVAL`), because
   * every one of those attempts refreshes the token and a rejection is not something that tends to
   * resolve within a second.
   */
  private _computeReconnectIntervalInMilliseconds(errorCount: number) {
    if (errorCount == 0) {
      return 100 + Math.floor(Math.random() * 1000);
    }
    const base =
      this._authFailureCount > 1
        ? AUTH_RETRY_INTERVAL
        : errorCount < 10
          ? 1000
          : 10000;
    return base + Math.floor(Math.random() * base);
  }

  private _shouldConnect() {
    if (this._fatalError || this._destroyed) {
      return false;
    }

    for (const k in this._map) {
      if (this._map[k].callbacks?.length > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Invoke a subscriber callback. A callback that throws must not prevent the remaining
   * subscribers from being notified, so everything is contained here.
   */
  private _invokeCallback(cb: Callback, err: any, data: any) {
    try {
      cb(err, data);
    } catch (e) {
      console.warn(
        LOG_PREFIX + "a subscription callback threw an error unexpectedly.",
        e,
      );
    }
  }

  private subscribe(cmd: WebSocketCommandSubscribe, callback: Callback) {
    if (this._destroyed) {
      const err = new BrokerizeWebSocketError({
        msg: "the websocket client was destroyed.",
        code: "WEBSOCKET_CONNECTION_FAILED",
        terminal: true,
      });
      Promise.resolve().then(() => this._invokeCallback(callback, err, null));
      return {
        unsubscribe: () => {},
      } as Subscription;
    }

    if (this._fatalError) {
      // no more subscriptions on a websocket client that has a fatal error. Report it
      // asynchronously so the caller holds the Subscription before the callback runs.
      const fatalError = this._fatalError;
      Promise.resolve().then(() =>
        this._invokeCallback(callback, fatalError, null),
      );
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
        interrupted: false,
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
        const entry = this._map[key];
        if (!entry) {
          /* the subscription was already dropped, e.g. because of a fatal error. */
          return;
        }
        entry.callbacks = entry.callbacks.filter((cb) => cb != wrappedCb);
        if (entry.callbacks.length == 0) {
          this._endSubscription(key);
        }
        this._startOrStopDisconnectTimeout();
      },
    } as Subscription;
  }

  subscribeInvalidate(
    subscribe: SubscribeInvalidateDetails,
    callback: Callback,
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
    callback: Callback,
  ) {
    const cmd: WebSocketCommandSubscribe = {
      cmd: "subscribe",
      type: "decoupledOperationStatus",
      subscriptionId: null as any as number,
      ...subscribe,
    };
    return this.subscribe(cmd, callback);
  }

  /**
   * The current connection state. See `subscribeConnectionState`.
   */
  getConnectionState(): WebSocketConnectionState {
    return this._connectionState;
  }

  /**
   * Observe the state of the underlying websocket connection. The callback is invoked immediately
   * with the current state and afterwards on every change.
   *
   * This is the only place where non-terminal errors are reported: the client recovers from them
   * on its own, so they are not passed to the subscription callbacks, which would force
   * applications to tear down subscriptions on every connection hiccup. Use this to show that
   * live updates are currently unavailable.
   */
  subscribeConnectionState(callback: ConnectionStateCallback): Subscription {
    this._connectionStateCallbacks.push(callback);
    try {
      callback(this._connectionState);
    } catch (e) {
      console.warn(
        LOG_PREFIX + "a connection state callback threw an error unexpectedly.",
        e,
      );
    }
    let unsub = false;
    return {
      unsubscribe: () => {
        if (unsub) {
          return;
        }
        unsub = true;
        this._connectionStateCallbacks = this._connectionStateCallbacks.filter(
          (cb) => cb != callback,
        );
      },
    };
  }

  /**
   * Recover from a fatal error (see `WebSocketConnectionState`). The client drops the fatal error
   * state and connects again, retrieving a fresh token. Existing subscriptions were already
   * terminated when the fatal error occurred, so applications have to subscribe again.
   *
   * Calling this without a fatal error forces a reconnect of the current connection.
   */
  reconnect() {
    if (this._destroyed) {
      return;
    }
    this._fatalError = null;
    this._errorCount = 0;
    this._lastNonFatalError = null;
    this._authFailureCount = 0;
    this._forceTokenRefresh = true;
    this._closeSocket();
    this._updateReconnectInterval();
    if (this._shouldConnect()) {
      this._connect();
    } else {
      this._setConnectionState("closed");
    }
  }

  /**
   * Release all resources: close the connection, drop all subscriptions and stop the reconnect and
   * ping timers. A destroyed client cannot be revived with `reconnect()`.
   *
   * This is called by `AuthorizedApiContext.destroy()` for the client it created itself. A client
   * that was passed in from outside is owned by the application and is not destroyed with the
   * context.
   */
  destroy() {
    if (this._destroyed) {
      return;
    }
    this._destroyed = true;
    if (this._reconnectIntvl) {
      clearInterval(this._reconnectIntvl);
      this._reconnectIntvl = null;
    }
    if (this._disconnectTimeout) {
      clearTimeout(this._disconnectTimeout);
      this._disconnectTimeout = null;
    }
    this._closeSocket();
    this._map = {};
    this._setConnectionState("closed");
    this._connectionStateCallbacks = [];
  }

  private _setConnectionState(
    status: WebSocketConnectionStatus,
    error?: BrokerizeWebSocketError,
  ) {
    if (
      this._connectionState.status == status &&
      this._connectionState.error == error
    ) {
      return;
    }
    this._connectionState = error ? { status, error } : { status };
    const state = this._connectionState;
    this._connectionStateCallbacks.slice().forEach((cb) => {
      try {
        cb(state);
      } catch (e) {
        console.warn(
          LOG_PREFIX +
            "a connection state callback threw an error unexpectedly.",
          e,
        );
      }
    });
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

      if (this._map[key].interrupted) {
        this._map[key].interrupted = false;
        this._fillInMessagesAfterConnectionInterruption(
          cmd,
          this._map[key].callbacks,
        );
      }
    } else if (!this._socket) {
      this._connect();
    }
  }

  private _fillInMessagesAfterConnectionInterruption(
    cmd: WebSocketCommandSubscribe,
    callbacks: Callback<any>[],
  ) {
    if (cmd.type == "invalidate") {
      const assumedInvalidate: InvalidateMessage = {
        cmd: "invalidate",
        subscriptionId: cmd.subscriptionId,
      }; // minimal invalidate
      console.log(
        LOG_PREFIX +
          "connection was interrupted. filling in assumed invalidates that may have happened while socket was not available.",
      );
      callbacks.forEach((cb) =>
        this._invokeCallback(cb, null, assumedInvalidate),
      );
    } else if (cmd.type == "decoupledOperationStatus") {
      if (this._apiCtx) {
        this._apiCtx
          .getDecoupledOperationStatus({
            decoupledOperationId: cmd.decoupledOperationId,
          })
          .then(
            (status) => {
              const invMsg: UpdateDecoupledOperationMessage = {
                cmd: "updateDecoupledOperationStatus",
                status: status,
                subscriptionId: cmd.subscriptionId,
              };
              console.log(
                LOG_PREFIX +
                  "sending virtual decoupled operation status updates to subscribers due to connection interruption.",
              );
              callbacks.forEach((cb) => this._invokeCallback(cb, null, invMsg));
            },
            (err) => {
              console.log(
                err,
                LOG_PREFIX +
                  "could not retrieve status of decoupledOperation. ignoring it.",
              );
            },
          );
      }
    }
  }

  private _endSubscription(key: string) {
    const entry = this._map[key];
    if (entry?.idOnSocket != null) {
      this._sendWs({
        cmd: "unsubscribe",
        subscriptionId: entry.idOnSocket as number,
      });
      entry.idOnSocket = null;
    }
  }

  /**
   * Internal method for setting a related AuthorizedApiContext. This is used to retrieve
   * decoupled operation status on interrupted connections.
   *
   * `null` detaches the current one, which a context does when it is destroyed: a destroyed
   * context cannot perform that request, so holding on to it would be worse than holding none.
   */
  _setAuthorizedApiContext(ctx: AuthorizedApiContext | null) {
    this._apiCtx = ctx;
  }

  /**
   * Internal counterpart of `_setAuthorizedApiContext`, so that a context can tell whether the
   * client is already attached to one - and whether that one is itself.
   */
  _getAuthorizedApiContext(): AuthorizedApiContext | null {
    return this._apiCtx;
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
        this._disconnectTimeout = null;
        if (!this._shouldConnect()) {
          this._closeSocket();
          if (!this._fatalError) {
            this._setConnectionState("closed");
          }
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
      console.log(
        LOG_PREFIX + "socket not ready, not sending message.",
        this._lastNonFatalError,
        this._fatalError,
      );
    }
  }

  /**
   * Close the current socket, if any, and detach its handlers so that a late `close` event of an
   * outdated socket cannot interfere with a connection established in the meantime.
   */
  private _closeSocket() {
    const socket = this._socket;
    this._socket = null;
    this._isOpen = false;
    this._authenticatedCallback = null;
    if (this._pingIntvl) {
      clearInterval(this._pingIntvl);
      this._pingIntvl = null;
    }
    if (!socket) {
      return;
    }
    socket.onmessage = null;
    socket.onopen = null;
    /* keep no-op handlers: some implementations (e.g. the `ws` package) throw on unhandled error events. */
    socket.onerror = () => {};
    socket.onclose = () => {};
    try {
      socket.close();
    } catch (err) {
      console.warn(LOG_PREFIX + "closing the socket failed.", err);
    }
  }

  private _connect() {
    if (this._fatalError || this._destroyed) {
      // no more connections on a websocket client that has a fatal error or was destroyed
      return;
    }

    this._closeSocket();
    this._setConnectionState(
      this._errorCount > 0 ? "reconnecting" : "connecting",
      this._lastNonFatalError || undefined,
    );

    let socket: WebSocket;
    try {
      socket = this._createWebsocket(this._url);
    } catch (err) {
      this._handleNonFatalError(
        new BrokerizeWebSocketError({
          msg: "the websocket could not be created.",
          code: "WEBSOCKET_CONNECTION_FAILED",
          cause: err,
        }),
      );
      return;
    }
    this._socket = socket;

    /* Per-socket bookkeeping: a failed connection attempt must be counted exactly once, no matter
       whether we learn about it from an error event, from a close event or from both. */
    let failureReported = false;
    let authenticated = false;
    const reportConnectionFailure = (msg: string, cause?: unknown) => {
      if (failureReported) {
        return;
      }
      failureReported = true;
      this._handleNonFatalError(
        new BrokerizeWebSocketError({
          msg,
          code: "WEBSOCKET_CONNECTION_FAILED",
          cause,
        }),
      );
    };

    socket.onmessage = (msg) => {
      if (this._socket !== socket) {
        return;
      }
      let message: WebSocketMessage;
      try {
        message = JSON.parse(msg.data) as WebSocketMessage;
      } catch (err) {
        this._handleNonFatalError(
          new BrokerizeWebSocketError({
            msg: "a message from the server could not be parsed.",
            code: "WEBSOCKET_PROTOCOL_ERROR",
            cause: err,
          }),
        );
        return;
      }
      this._handleMessage(message);
    };

    socket.onerror = (ev) => {
      if (this._socket !== socket) {
        return;
      }
      /* The error event carries no usable detail; the following close event triggers the retry. */
      reportConnectionFailure("the websocket connection failed.", ev);
    };

    socket.onopen = () => {
      if (this._socket !== socket) {
        return;
      }
      const forceRefresh = this._forceTokenRefresh;
      this._forceTokenRefresh = false;
      Promise.resolve(this._auth.getToken({ forceRefresh })).then(
        (token) => {
          if (this._socket !== socket) {
            return;
          }
          const _authCb = () => {
            authenticated = true;
            this._isOpen = true;
            this._resetErrorState();
            this._setConnectionState("open");
            for (const k in this._map) {
              this._startSubscription(k);
            }
          };

          if (token) {
            this._sendWs({
              cmd: "authorize",
              idToken: token.idToken,
            });
            this._authenticatedCallback = _authCb;
          } else {
            _authCb();
          }
        },
        (err) => {
          if (this._socket !== socket) {
            return;
          }
          /* Without a token we cannot use this connection. Report it and close, so that the
             reconnect interval retries instead of leaving an unauthenticated socket open. */
          failureReported = true;
          this._handleNonFatalError(
            new BrokerizeWebSocketError({
              msg:
                err?.message ||
                "a token for the websocket connection could not be retrieved.",
              code: "AUTH",
              cause: err,
            }),
          );
          this._closeSocket();
        },
      );
    };

    socket.onclose = () => {
      if (this._socket !== socket) {
        return;
      }
      // mark all subscriptions interrupted so they can issue synthetic messages on reconnect
      for (const k in this._map) {
        this._map[k].interrupted = true;
        this._map[k].idOnSocket = null;
      }
      this._socket = null;
      this._isOpen = false;
      this._authenticatedCallback = null;
      if (this._pingIntvl) {
        clearInterval(this._pingIntvl);
        this._pingIntvl = null;
      }
      if (!authenticated) {
        /* the connection never became usable, so this attempt counts towards the backoff. */
        reportConnectionFailure(
          "the websocket connection was closed before it could be used.",
        );
      }
      if (this._shouldConnect()) {
        this._setConnectionState(
          "reconnecting",
          this._lastNonFatalError || undefined,
        );
      } else if (!this._fatalError) {
        this._setConnectionState("closed");
      }
    };

    if (this._pingIntvl) clearInterval(this._pingIntvl);
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

  private _handleMessage(message: WebSocketMessage) {
    const subscriptionId = (message as WebSocketSubscriptionMessage)
      .subscriptionId;
    if (subscriptionId != null) {
      /* message concerns a subscription */
      const entry = this._findSubscriptionEntry(subscriptionId);
      if (
        (message as InvalidateMessage).cmd == "invalidate" ||
        (message as UpdateDecoupledOperationMessage).cmd ==
          "updateDecoupledOperationStatus"
      ) {
        entry?.entry.callbacks.forEach((cb) =>
          this._invokeCallback(cb, null, message),
        );
      } else if ((message as WebSocketMessageErrorOnSubscription).error) {
        /* error on a single subscription. Nothing retries it, so it ends this subscription. */
        const err = toWebSocketError(
          (message as WebSocketMessageErrorOnSubscription).error,
          true,
        );
        entry?.entry.callbacks.forEach((cb) =>
          this._invokeCallback(cb, err, null),
        );
      } else {
        console.warn(
          LOG_PREFIX + "received an unknown subscription message.",
          message,
        );
      }
      return;
    }

    if ((message as WebSocketAuthenticatedMessage).cmd == "authenticated") {
      if (this._authenticatedCallback) this._authenticatedCallback();
      this._authenticatedCallback = null;
    } else if ((message as WebSocketPingMessage).cmd == "ping") {
      // NOP
    } else if ((message as WebSocketError).error) {
      const e = message as WebSocketError;
      if (isAuthenticationError(e.error)) {
        this._handleAuthenticationFailure(e.error);
      } else {
        this._handleNonFatalError(toWebSocketError(e.error, false));
      }
    } else {
      console.warn(LOG_PREFIX + "received an unknown message.", message);
    }
  }

  /**
   * The server rejected our token. The usual cause is an id token that expired between retrieving
   * it and the server validating it, which a fresh token fixes, so retry once before giving up on
   * this client.
   */
  private _handleAuthenticationFailure(payload: WebSocketErrorPayload) {
    this._authFailureCount++;

    if (this._authFailureCount >= this._maxConsecutiveAuthFailures) {
      /* the token has been rejected for several minutes: the session is gone, not expired. */
      this._handleFatalError(toWebSocketError(payload, true));
      return;
    }

    /* A rejected token is worth another attempt with a fresh one: the usual cause is a token that
       expired between retrieving it and the server validating it. The subscriptions stay alive and
       the rejection is reported through the connection state, so nothing has to be rebuilt once we
       are back in. */
    this._forceTokenRefresh = true;
    console.warn(
      LOG_PREFIX +
        "authentication failed (" +
        this._authFailureCount +
        "/" +
        this._maxConsecutiveAuthFailures +
        "). retrying with a refreshed token.",
    );
    this._handleNonFatalError(toWebSocketError(payload, false));
    this._closeSocket();
    this._setConnectionState(
      "reconnecting",
      this._lastNonFatalError || undefined,
    );
  }

  /**
   * Error happend when trying to connect, but it may be solved by trying a reconnect later.
   */
  private _handleNonFatalError(e: BrokerizeWebSocketError) {
    this._errorCount++;
    this._lastNonFatalError = e;
    this._updateReconnectInterval();
    if (this._shouldConnect()) {
      this._setConnectionState("reconnecting", e);
    }
  }

  /**
   * Fatal error: this means the client is unusable from now on and must be recreated or revived
   * with `reconnect()`.
   */
  private _handleFatalError(e: BrokerizeWebSocketError) {
    this._fatalError = e;
    this._updateReconnectInterval();
    if (this._pingIntvl) {
      clearInterval(this._pingIntvl);
      this._pingIntvl = null;
    }
    this._closeSocket();
    for (const key in this._map) {
      this._notifySubscribersAboutFatalError(key);
    }
    /* the subscriptions are terminated, their callbacks must not be called again. */
    this._map = {};
    this._setConnectionState("fatal", e);
  }

  /**
   * If a fatal error occurs, all registered callbacks must be called with the error parameter.
   */
  private _notifySubscribersAboutFatalError(key: string) {
    this._map[key].callbacks.forEach((cb) => {
      this._invokeCallback(cb, this._fatalError, null);
    });
  }

  /**
   * Once we have successfully established a connection, error counts and states must be reset.
   */
  private _resetErrorState() {
    this._lastNonFatalError = null;
    this._errorCount = 0;
    this._authFailureCount = 0;
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

function isAuthenticationError(payload: WebSocketErrorPayload | undefined) {
  return payload?.code == "AUTH" || payload?.message == "authentication failed";
}

/**
 * Turn an error message received over the websocket into a proper `Error`.
 */
function toWebSocketError(
  payload: WebSocketErrorPayload | undefined,
  terminal: boolean,
) {
  return new BrokerizeWebSocketError({
    msg: payload?.message || "an unknown websocket error occurred.",
    code: isAuthenticationError(payload) ? "AUTH" : "WEBSOCKET_ERROR",
    terminal,
  });
}

/**
 * Optional behavior of `BrokerizeWebSocketClientImpl`. The defaults are what an application
 * wants; this exists for the rare case that they have to be tightened.
 */
export type BrokerizeWebSocketClientOptions = {
  /**
   * How often in a row the server may reject our token before the client gives up and goes
   * `fatal`. Defaults to 10, which together with the backoff spans several minutes. Mainly here so
   * that tests do not have to wait that long.
   */
  maxConsecutiveAuthFailures?: number;
};

export interface BrokerizeWebSocketClient {
  subscribeInvalidate: (
    subscribe: SubscribeInvalidateDetails,
    callback: Callback,
  ) => Subscription;

  subscribeDecoupledOperation: (
    subscribe: Pick<
      SubscribeDecoupledOperation,
      "sessionId" | "decoupledOperationId"
    >,
    callback: Callback,
  ) => Subscription;

  subscribeConnectionState: (callback: ConnectionStateCallback) => Subscription;

  getConnectionState: () => WebSocketConnectionState;

  reconnect: () => void;
}

/**
 * - `closed`: not connected, because nothing is subscribed.
 * - `connecting`: the first connection attempt is in progress.
 * - `open`: connected and authenticated, live updates are being delivered.
 * - `reconnecting`: the connection failed or was lost and the client is retrying. `error` holds
 *   the error that caused it. Subscriptions stay alive and receive a synthetic invalidate once
 *   the connection is back.
 *
 *   A rejected token lands here too, so an application can show that live updates are currently
 *   unavailable - and why - while the client works on getting back in, instead of having to
 *   rebuild everything over a token that expired in flight.
 * - `fatal`: the client gave up and is unusable. All subscriptions were terminated with `error`.
 *   This only happens after the token has been rejected over and over for several minutes, i.e.
 *   when the session is gone rather than stale. Call `reconnect()` or create a new client.
 */
export type WebSocketConnectionStatus =
  "closed" | "connecting" | "open" | "reconnecting" | "fatal";

export type WebSocketConnectionState = {
  status: WebSocketConnectionStatus;
  error?: BrokerizeWebSocketError;
};

export type ConnectionStateCallback = (state: WebSocketConnectionState) => void;

/**
 * Callback of a subscription. `err` is always a `BrokerizeWebSocketError` with
 * `terminal === true`: the subscription is over and will not receive any further data. Errors the
 * client recovers from on its own are reported via `subscribeConnectionState` instead.
 */
export type Callback<T = any> = (err: any, data: T) => void;

export type Subscription = {
  unsubscribe: () => void;
};

type SubscriptionEntry = {
  idOnSocket: number | null;
  callbacks: Callback[];
  /**
   * If a subscription was interrupted (socket offline period), this is tracked here in order
   * to fill in messages.
   */
  interrupted: boolean;
};
