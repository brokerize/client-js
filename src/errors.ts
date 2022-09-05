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

export class ValidationError extends Error {
  details: any;
  constructor(opts: {msg: string, details: any}) {
    super(opts.msg);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain (https://stackoverflow.com/questions/41102060/typescript-extending-error-class)
    this.name = "ValidationError";
    this.details = opts.details;
  }
}