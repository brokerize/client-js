import {
  BrokerName,
  ErrorResponse,
  ValidationDetail
} from "./swagger";

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
   * @type {BrokerName}
   * @memberof ErrorResponse
   */
  msgBrokerName?: BrokerName;
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
