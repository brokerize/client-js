import { ErrorResponse, ValidationDetail } from "./swagger";

export class TradingError extends Error {
  public code?: string;
  public brokerCode?: string | number;
  public brokerError?: any;
  public httpStatusCode: number;
  /**
   * If set, indicates that the `msg` can be attributed to the given broker directly (for example
   * it is not a networking problem).
   */
  public msgBrokerName?: string;
  public hint?: Hint;

  constructor({
    msg,
    code,
    brokerCode,
    brokerError,
    msgBrokerName,
    httpStatusCode,
    hint,
  }: ErrorParams) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain (https://stackoverflow.com/questions/41102060/typescript-extending-error-class)
    this.name = "TradingError";
    this.code = code;
    this.brokerCode = brokerCode;
    this.httpStatusCode = httpStatusCode || 500;
    this.brokerError = brokerError;
    this.msgBrokerName = msgBrokerName;
    this.hint = hint;
  }
}

export type ErrorParams = {
  msg: string;
  code?: string;
  brokerCode?: string | number;
  brokerError?: any;
  httpStatusCode?: number;
  msgBrokerName?: string;
  hint?: Hint;
};

export type Hint = {
  id: string;
  text: string;
};

export class BrokerizeError extends Error {
  /**
   *
   * @type {{ [key: string]: FieldErrorsValue; }}
   * @memberof ErrorResponse
   */
  validationDetails?: { [key: string]: ValidationDetail };
  /**
   *
   * @type {Hint}
   * @memberof ErrorResponse
   */
  hint?: Hint;
  /**
   *
   * @type {string}
   * @memberof ErrorResponse
   */
  msgBrokerName?: string;
  /**
   * The human-readable error message. If available, translated to the users's language.
   * This can always be displayed in frontends (if no specific error code handling is available).
   * @type {string}
   * @memberof ErrorResponse
   */
  msg: string;
  /**
   * The error code.
   * Currently the following codes are implemented:
   * 'TRADING_ERROR', 'AUTH', 'RATE_LIMITED', 'VALIDATION_FAILED', 'MUST_ACCEPT_HINT', 'NO_SESSION_AVAILABLE_FOR_PORTFOLIO',
   *  'SECURITY_NOT_FOUND', 'SECURITY_NOT_TRADABLE_AT_EXCHANGE', 'ORDER_REJECTED', 'INTERNAL_SERVER_ERROR'
   * @type {string}
   * @memberof ErrorResponse
   */
  code: string;

  httpStatusCode: number;

  constructor(statusCode: number, body: ErrorResponse) {
    super(body.msg);
    this.httpStatusCode = statusCode;
    this.name = "BrokerizeError";
    this.msg = body.msg;
    this.code = body.code;
    this.validationDetails = body.validationDetails;
    this.hint = body.hint;
    this.msgBrokerName = body.msgBrokerName;
  }
}

/**
 * Thrown if a request to the brokerize API timed out (HTTP status 504). This is typically sent by
 * a load balancer or gateway in front of the API, so the response body usually is not a regular
 * `ErrorResponse`.
 */
export class BrokerizeTimeoutError extends BrokerizeError {
  constructor(body: ErrorResponse) {
    super(504, body);
    this.name = "BrokerizeTimeoutError";
  }
}

function isErrorResponse(x: unknown): x is ErrorResponse {
  return (
    !!x &&
    typeof x === "object" &&
    typeof (x as ErrorResponse).msg === "string" &&
    typeof (x as ErrorResponse).code === "string"
  );
}

/**
 * Create the error for a failed (status >= 400) API response. If the body is not a valid `ErrorResponse`
 * (e.g. an HTML error page from a load balancer), a generic error body is used instead of failing with a
 * JSON parse error.
 */
export async function createErrorFromResponse(
  response: Response,
): Promise<BrokerizeError> {
  const statusCode = response.status;
  let body: ErrorResponse | undefined;
  try {
    const parsed = JSON.parse(await response.text());
    if (isErrorResponse(parsed)) {
      body = parsed;
    }
  } catch {
    /* not JSON, use the fallback below */
  }

  if (statusCode == 504) {
    return new BrokerizeTimeoutError(
      body || {
        msg: "The request timed out. Please try again.",
        code: "TIMEOUT",
      },
    );
  }

  return new BrokerizeError(
    statusCode,
    body || {
      msg: "The request failed with status " + statusCode + ".",
      code: "INTERNAL_SERVER_ERROR",
    },
  );
}

/**
 * Error codes used by {@link BrokerizeWebSocketError}.
 *
 * - `AUTH`: the websocket connection could not be authenticated. Same code as a failed token
 *   refresh on the REST API, so applications can treat both identically.
 * - `WEBSOCKET_CONNECTION_FAILED`: the connection could not be established or was lost
 *   (network error, failed handshake, closed socket). The client retries these automatically.
 * - `WEBSOCKET_PROTOCOL_ERROR`: a message from the server could not be parsed.
 * - `WEBSOCKET_ERROR`: any other error reported by the server.
 */
export type BrokerizeWebSocketErrorCode =
  | "AUTH"
  | "WEBSOCKET_CONNECTION_FAILED"
  | "WEBSOCKET_PROTOCOL_ERROR"
  | "WEBSOCKET_ERROR";

export type BrokerizeWebSocketErrorParams = {
  msg: string;
  code: BrokerizeWebSocketErrorCode;
  httpStatusCode?: number;
  /**
   * See {@link BrokerizeWebSocketError.terminal}.
   */
  terminal?: boolean;
  /**
   * The underlying error or event, if any (e.g. the rejection of `Auth.getToken` or the
   * `error` event of the websocket).
   */
  cause?: unknown;
};

const DEFAULT_STATUS_CODES: Record<BrokerizeWebSocketErrorCode, number> = {
  AUTH: 401,
  WEBSOCKET_CONNECTION_FAILED: 503,
  WEBSOCKET_PROTOCOL_ERROR: 500,
  WEBSOCKET_ERROR: 500,
};

/**
 * Every error reported by the websocket client is an instance of this class, so applications can
 * handle it like any other error (`instanceof Error`, `err.message`, stack trace) and can use the
 * same error handling as for the REST API, which reports `BrokerizeError`.
 */
export class BrokerizeWebSocketError extends BrokerizeError {
  /**
   * If `true`, the affected subscription is over and will not receive any further data. Errors
   * that are passed to a subscription callback are always terminal; non-terminal errors are only
   * reported via `BrokerizeWebSocketClient.subscribeConnectionState`, because the client
   * recovers from them on its own.
   */
  readonly terminal: boolean;
  /**
   * The underlying error or event, if any.
   */
  readonly cause?: unknown;

  constructor({
    msg,
    code,
    httpStatusCode,
    terminal,
    cause,
  }: BrokerizeWebSocketErrorParams) {
    super(httpStatusCode ?? DEFAULT_STATUS_CODES[code], { msg, code });
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain (https://stackoverflow.com/questions/41102060/typescript-extending-error-class)
    this.name = "BrokerizeWebSocketError";
    this.terminal = terminal ?? false;
    this.cause = cause;
  }
}

/**
 * Check whether the given value is a `BrokerizeWebSocketError`. Prefer this over `instanceof`,
 * which fails if more than one copy of this package ends up in a dependency tree.
 */
export function isBrokerizeWebSocketError(
  x: unknown,
): x is BrokerizeWebSocketError {
  return (
    !!x &&
    typeof x === "object" &&
    (x as Error).name === "BrokerizeWebSocketError"
  );
}

/**
 * Thrown when a request is made on an `AuthorizedApiContext` that was already destroyed.
 *
 * `destroy()` aborts the context's `AbortController`, so a request that is already in flight
 * rejects with a `DOMException` named `AbortError`. This error carries the same `name`, so that
 * both cases can be handled with a single check (`err.name === "AbortError"`), the way `fetch`
 * itself rejects when handed an already-aborted signal.
 */
export class BrokerizeAbortError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain (https://stackoverflow.com/questions/41102060/typescript-extending-error-class)
    this.name = "AbortError";
  }
}
