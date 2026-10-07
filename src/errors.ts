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
