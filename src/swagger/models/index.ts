/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface AddSessionCompleteChallengeParams
 */
export interface AddSessionCompleteChallengeParams {
    /**
     * 
     * @type {string}
     * @memberof AddSessionCompleteChallengeParams
     */
    challengeResponse: string;
    /**
     * 
     * @type {string}
     * @memberof AddSessionCompleteChallengeParams
     */
    challengeId: string;
}
/**
 * 
 * @export
 * @interface AddSessionParams
 */
export interface AddSessionParams {
    /**
     * 
     * @type {string}
     * @memberof AddSessionParams
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof AddSessionParams
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AddSessionParams
     */
    env: string;
    /**
     * 
     * @type {BrokerName}
     * @memberof AddSessionParams
     */
    brokerName: BrokerName;
}
/**
 * 
 * @export
 * @interface Amount
 */
export interface Amount {
    /**
     * If this is present and true, a "value is provided in realtime" indicator can be displayed.
     * If this is present and false, a "value is provided delayed" indicator can be displayed.
     * If this is not present, no such indication is available.
     * @type {boolean}
     * @memberof Amount
     */
    isRealtime?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Amount
     */
    maxDecimals?: number;
    /**
     * 
     * @type {number}
     * @memberof Amount
     */
    minDecimals?: number;
    /**
     * - ISO code (e.g. EUR for Euro), if it is a monetary amount
     * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
     * - or 'XXX' if it is pieces
     * - or 'PRC' if it is a percentage
     * - or 'PRM' if it is permil
     * - or 'XXP' if it is points (as for indices)
     * @type {string}
     * @memberof Amount
     */
    currency?: string;
    /**
     * Date in the format YYYY-MM-DD
     * @type {string}
     * @memberof Amount
     */
    date?: string;
    /**
     * If the amount is valid at a given point in time, this can be set (e.g. for quotes). This is a UNIX timestamp in milliseconds.
     * @type {number}
     * @memberof Amount
     */
    timestamp?: number;
    /**
     * 
     * @type {number}
     * @memberof Amount
     */
    value?: number;
}
/**
 * 
 * @export
 * @interface AuthInfo
 */
export interface AuthInfo {
    /**
     * If this is present and true, the only operation that the AuthMethods can be used to is to activate Session TAN (`session.authorizeSessionTan`).
     * All other operations (e.g. order creation etc.) require Session TAN to be activated first.
     * @type {boolean}
     * @memberof AuthInfo
     */
    allOperationsRequireSessionTan?: boolean;
    /**
     * 
     * @type {Array<AuthMethod>}
     * @memberof AuthInfo
     */
    authMethods?: Array<AuthMethod>;
    /**
     * 
     * @type {boolean}
     * @memberof AuthInfo
     */
    sessionTanSupported?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AuthInfo
     */
    sessionTanActive?: boolean;
}
/**
 * 
 * @export
 * @interface AuthMethod
 */
export interface AuthMethod {
    /**
     * 
     * @type {AuthMethodFlow}
     * @memberof AuthMethod
     */
    flow: AuthMethodFlow;
}
/**
 * With the `CHALLENGE_RESPONSE` flow, to execute an operation, a challenge has to be created as the first step (e.g. requesting)
 * an MTAN. The UI should show a button labelled with the string from `getChallengeLabel`. When the
 * challenge has been requested (e.g. for enabling session TAN with `CreateSessionTanChallenge`), the
 * TAN field should be shown (labelled `tanFieldLabel`). When the user has entered the challenge response,
 * the operation can be executed (e.g. `EnableSessionTan`).
 * @export
 * @interface AuthMethodChallengeResponse
 */
export interface AuthMethodChallengeResponse extends AuthMethod {
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    tanFieldLabel: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    challengeLabel?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    getChallengeLabel: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodChallengeResponse
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface AuthMethodChallengeResponseSpecifics
 */
export interface AuthMethodChallengeResponseSpecifics {
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    tanFieldLabel?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    challengeLabel?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    getChallengeLabel?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponseSpecifics
     */
    id?: string;
}
/**
 * With the `DECOUPLED` flow, the operation is created right away wiuthout creating a challenge first. The operation's
 * response will include a `decoupledOperationId` which can be subscribed to using `GetDecoupledOperationStatus` and via
 * a WebSocket subscription. Also, the operation can be cancelled by the user using `CancelDecoupledOperation`. Currently
 * this flow is only implemented for `EnableSessionTan`.
 * @export
 * @interface AuthMethodDecoupled
 */
export interface AuthMethodDecoupled extends AuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodDecoupled
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodDecoupled
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodDecoupled
     */
    id: string;
}
/**
 * 
 * @export
 * @interface AuthMethodDecoupledSpecifics
 */
export interface AuthMethodDecoupledSpecifics {
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodDecoupledSpecifics
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodDecoupledSpecifics
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodDecoupledSpecifics
     */
    id?: string;
}

/**
 * 
 * @export
 */
export const AuthMethodFlow = {
    Tan: 'TAN',
    Decoupled: 'DECOUPLED',
    ChallengeResponse: 'CHALLENGE_RESPONSE'
} as const;
export type AuthMethodFlow = typeof AuthMethodFlow[keyof typeof AuthMethodFlow];

/**
 * With the `TAN` flow, a TAN can be sent with the operation right away, i.e. without creating a challenge first.
 * This may be the case for brokers that provide a fixed trading password or a list of TANs where the user
 * may select an arbitrary TAN from the list.
 * @export
 * @interface AuthMethodTan
 */
export interface AuthMethodTan extends AuthMethod {
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTan
     */
    tanFieldLabel: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodTan
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTan
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTan
     */
    id: string;
}
/**
 * 
 * @export
 * @interface AuthMethodTanSpecifics
 */
export interface AuthMethodTanSpecifics {
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTanSpecifics
     */
    tanFieldLabel?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodTanSpecifics
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTanSpecifics
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodTanSpecifics
     */
    id?: string;
}
/**
 * 
 * @export
 * @interface BrokerEnvironment
 */
export interface BrokerEnvironment {
    /**
     * 
     * @type {boolean}
     * @memberof BrokerEnvironment
     */
    isTestingEnvironment: boolean;
    /**
     * 
     * @type {string}
     * @memberof BrokerEnvironment
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof BrokerEnvironment
     */
    id: string;
}
/**
 * If a login form can be shown for the broker, describes the fields to show.
 * @export
 * @interface BrokerLoginForm
 */
export interface BrokerLoginForm {
    /**
     * 
     * @type {BrokerLoginFormField}
     * @memberof BrokerLoginForm
     */
    passwordField?: BrokerLoginFormField;
    /**
     * 
     * @type {BrokerLoginFormField}
     * @memberof BrokerLoginForm
     */
    usernameField?: BrokerLoginFormField;
}
/**
 * 
 * @export
 * @interface BrokerLoginFormField
 */
export interface BrokerLoginFormField {
    /**
     * 
     * @type {string}
     * @memberof BrokerLoginFormField
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof BrokerLoginFormField
     */
    type: BrokerLoginFormFieldTypeEnum;
}


/**
 * @export
 */
export const BrokerLoginFormFieldTypeEnum = {
    String: 'string',
    Password: 'password'
} as const;
export type BrokerLoginFormFieldTypeEnum = typeof BrokerLoginFormFieldTypeEnum[keyof typeof BrokerLoginFormFieldTypeEnum];

/**
 * 
 * @export
 * @interface BrokerMeta
 */
export interface BrokerMeta {
    /**
     * If true, the user can login at the broker via OAuth (this involves browser redirects). Use `prepareOAuthRedirect` to obtain a URL to redirect to.
     * @type {boolean}
     * @memberof BrokerMeta
     */
    supportsOAuthLogin?: boolean;
    /**
     * 
     * @type {BrokerLoginForm}
     * @memberof BrokerMeta
     */
    loginForm?: BrokerLoginForm;
    /**
     * 
     * @type {Array<BrokerEnvironment>}
     * @memberof BrokerMeta
     */
    envs: Array<BrokerEnvironment>;
    /**
     * 
     * @type {BrokerName}
     * @memberof BrokerMeta
     */
    brokerName: BrokerName;
}

/**
 * 
 * @export
 */
export const BrokerName = {
    Demo: 'demo',
    Consors: 'consors',
    Finanzen: 'finanzen',
    Justtrade: 'justtrade',
    Comdirect: 'comdirect'
} as const;
export type BrokerName = typeof BrokerName[keyof typeof BrokerName];

/**
 * 
 * @export
 * @interface CancelOrderChallengeParams
 */
export interface CancelOrderChallengeParams {
    /**
     * 
     * @type {string}
     * @memberof CancelOrderChallengeParams
     */
    authMethod: string;
}
/**
 * 
 * @export
 * @interface CancelOrderChallengeResponse
 */
export interface CancelOrderChallengeResponse extends CancelOrderParams {
    /**
     * 
     * @type {string}
     * @memberof CancelOrderChallengeResponse
     */
    challengeId: string;
    /**
     * 
     * @type {string}
     * @memberof CancelOrderChallengeResponse
     */
    challengeResponse: string;
}
/**
 * 
 * @export
 * @interface CancelOrderChallengeResponseSpecifics
 */
export interface CancelOrderChallengeResponseSpecifics {
    /**
     * 
     * @type {string}
     * @memberof CancelOrderChallengeResponseSpecifics
     */
    challengeId?: string;
    /**
     * 
     * @type {string}
     * @memberof CancelOrderChallengeResponseSpecifics
     */
    challengeResponse?: string;
}
/**
 * 
 * @export
 * @interface CancelOrderParams
 */
export interface CancelOrderParams {
    /**
     * 
     * @type {CancelOrderParamsMode}
     * @memberof CancelOrderParams
     */
    mode: CancelOrderParamsMode;
}

/**
 * 
 * @export
 */
export const CancelOrderParamsMode = {
    SessionTan: 'sessionTan',
    ChallengeResponse: 'challengeResponse'
} as const;
export type CancelOrderParamsMode = typeof CancelOrderParamsMode[keyof typeof CancelOrderParamsMode];


/**
 * For some exchanges, this can be added to an order:
 * 
 * - `K` Kassa
 * - `O` Only Opening Auction
 * - `C` Only Closing Auction
 * @export
 */
export const CashQuotation = {
    O: 'O',
    K: 'K',
    C: 'C'
} as const;
export type CashQuotation = typeof CashQuotation[keyof typeof CashQuotation];

/**
 * 
 * @export
 * @interface Challenge
 */
export interface Challenge {
    /**
     * If the challenge needs further explanation, this may contain additional information to display to the user.
     * @type {string}
     * @memberof Challenge
     */
    challengeExplanation?: string;
    /**
     * 
     * @type {string}
     * @memberof Challenge
     */
    challengePrompt: string;
    /**
     * 
     * @type {string}
     * @memberof Challenge
     */
    challengePromptType: ChallengeChallengePromptTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Challenge
     */
    challengeId: string;
}


/**
 * @export
 */
export const ChallengeChallengePromptTypeEnum = {
    Text: 'text',
    Base64png: 'base64png'
} as const;
export type ChallengeChallengePromptTypeEnum = typeof ChallengeChallengePromptTypeEnum[keyof typeof ChallengeChallengePromptTypeEnum];

/**
 * 
 * @export
 * @interface ChangeOrderChallengeParams
 */
export interface ChangeOrderChallengeParams {
    /**
     * 
     * @type {OrderChanges}
     * @memberof ChangeOrderChallengeParams
     */
    changes: OrderChanges;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderChallengeParams
     */
    authMethod: string;
}
/**
 * 
 * @export
 * @interface ChangeOrderParams
 */
export interface ChangeOrderParams {
    /**
     * 
     * @type {OrderChanges}
     * @memberof ChangeOrderParams
     */
    changes: OrderChanges;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderParams
     */
    challengeResponse: string;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderParams
     */
    challengeId: string;
}
/**
 * 
 * @export
 * @interface ConfirmOAuthParams
 */
export interface ConfirmOAuthParams {
    /**
     * 
     * @type {string}
     * @memberof ConfirmOAuthParams
     */
    code: string;
    /**
     * 
     * @type {string}
     * @memberof ConfirmOAuthParams
     */
    ticketId: string;
}
/**
 * 
 * @export
 * @interface ConfirmOAuthResponse
 */
export interface ConfirmOAuthResponse {
    /**
     * 
     * @type {string}
     * @memberof ConfirmOAuthResponse
     */
    sessionId: string;
}
/**
 * 
 * @export
 * @interface CostDetailsLink
 */
export interface CostDetailsLink {
    /**
     * 
     * @type {string}
     * @memberof CostDetailsLink
     */
    footerText?: string;
    /**
     * 
     * @type {string}
     * @memberof CostDetailsLink
     */
    linkTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof CostDetailsLink
     */
    url?: string;
}
/**
 * 
 * @export
 * @interface CreateGuestUserResponse
 */
export interface CreateGuestUserResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateGuestUserResponse
     */
    idToken: string;
}
/**
 * 
 * @export
 * @interface CreateModeSessionTan
 */
export interface CreateModeSessionTan extends CancelOrderParams {
}
/**
 * 
 * @export
 * @interface CreateOrderChallengeParams
 */
export interface CreateOrderChallengeParams {
    /**
     * If the order has been rejected with code `MUST_ACCEPT_HINT` before, the order creation can be retried with setting the
     * `acceptHintId` accordingly after letting the user accept the hint.
     * @type {string}
     * @memberof CreateOrderChallengeParams
     */
    acceptHintId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateOrderChallengeParams
     */
    authMethod?: string;
    /**
     * 
     * @type {OrderCreate}
     * @memberof CreateOrderChallengeParams
     */
    order: OrderCreate;
}
/**
 * 
 * @export
 * @interface CreateOrderParams
 */
export interface CreateOrderParams {
    /**
     * If the order has been rejected with code `MUST_ACCEPT_HINT` before, the order creation can be retried with setting the
     * `acceptHintId` accordingly after letting the user accept the hint.
     * @type {string}
     * @memberof CreateOrderParams
     */
    acceptHintId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateOrderParams
     */
    authMethod?: string;
    /**
     * 
     * @type {OrderCreate}
     * @memberof CreateOrderParams
     */
    order: OrderCreate;
    /**
     * 
     * @type {string}
     * @memberof CreateOrderParams
     */
    challengeId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateOrderParams
     */
    challengeResponse?: string;
}
/**
 * 
 * @export
 * @interface CreateTanChallengeParams
 */
export interface CreateTanChallengeParams {
    /**
     * 
     * @type {string}
     * @memberof CreateTanChallengeParams
     */
    authMethod: string;
}
/**
 * 
 * @export
 * @interface CreateTradeResponse
 */
export interface CreateTradeResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateTradeResponse
     */
    orderId?: string;
}
/**
 * 
 * @export
 * @interface CreatedResponseBody
 */
export interface CreatedResponseBody {
    /**
     * 
     * @type {string}
     * @memberof CreatedResponseBody
     */
    id: string;
}

/**
 * 
 * @export
 */
export const DecoupledOperationState = {
    Aborted: 'AUTHORIZATION_ABORTED',
    Initial: 'AUTHORIZATION_INITIAL',
    UserAccepted: 'AUTHORIZATION_USER_ACCEPTED',
    UserCanceled: 'AUTHORIZATION_USER_CANCELED'
} as const;
export type DecoupledOperationState = typeof DecoupledOperationState[keyof typeof DecoupledOperationState];

/**
 * 
 * @export
 * @interface DefaultOrderValidityByOrderModel
 */
export interface DefaultOrderValidityByOrderModel {
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    quote?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    fraction?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    savingsPlan?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    market?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    limit?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    stopMarket?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    stopLimit?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    trailingStopMarket?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    trailingStopLimit?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    ocoStopMarket?: OrderValidity;
    /**
     * 
     * @type {OrderValidity}
     * @memberof DefaultOrderValidityByOrderModel
     */
    ocoStopLimit?: OrderValidity;
}
/**
 * 
 * @export
 * @interface DemoAccount
 */
export interface DemoAccount {
    /**
     * 
     * @type {string}
     * @memberof DemoAccount
     */
    accountName: string;
    /**
     * 
     * @type {string}
     * @memberof DemoAccount
     */
    accountId: string;
}
/**
 * 
 * @export
 * @interface DemoAccountsResponse
 */
export interface DemoAccountsResponse {
    /**
     * 
     * @type {Array<DemoAccount>}
     * @memberof DemoAccountsResponse
     */
    accounts: Array<DemoAccount>;
}

/**
 * 
 * @export
 */
export const Direction = {
    Buy: 'buy',
    Sell: 'sell'
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

/**
 * 
 * @export
 * @interface EnableSessionTanParams
 */
export interface EnableSessionTanParams {
    /**
     * 
     * @type {EnableSessionTanParamsKind}
     * @memberof EnableSessionTanParams
     */
    kind: EnableSessionTanParamsKind;
}
/**
 * 
 * @export
 * @interface EnableSessionTanParamsChallengeResponse
 */
export interface EnableSessionTanParamsChallengeResponse extends EnableSessionTanParams {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsChallengeResponse
     */
    challengeResponse: string;
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsChallengeResponse
     */
    challengeId: string;
}
/**
 * 
 * @export
 * @interface EnableSessionTanParamsChallengeResponseSpecifics
 */
export interface EnableSessionTanParamsChallengeResponseSpecifics {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsChallengeResponseSpecifics
     */
    challengeResponse?: string;
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsChallengeResponseSpecifics
     */
    challengeId?: string;
}
/**
 * 
 * @export
 * @interface EnableSessionTanParamsDecoupled
 */
export interface EnableSessionTanParamsDecoupled extends EnableSessionTanParams {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsDecoupled
     */
    authMethod: string;
}
/**
 * 
 * @export
 * @interface EnableSessionTanParamsDecoupledSpecifics
 */
export interface EnableSessionTanParamsDecoupledSpecifics {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanParamsDecoupledSpecifics
     */
    authMethod?: string;
}

/**
 * 
 * @export
 */
export const EnableSessionTanParamsKind = {
    ChallengeResponse: 'challengeResponse',
    Decoupled: 'decoupled'
} as const;
export type EnableSessionTanParamsKind = typeof EnableSessionTanParamsKind[keyof typeof EnableSessionTanParamsKind];

/**
 * 
 * @export
 * @interface EnableSessionTanResponse
 */
export interface EnableSessionTanResponse {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanResponse
     */
    decoupledOperationId?: string;
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanResponse
     */
    msg: string;
}
/**
 * 
 * @export
 * @interface EnableSessionTanResponseAnyOf
 */
export interface EnableSessionTanResponseAnyOf {
    /**
     * 
     * @type {string}
     * @memberof EnableSessionTanResponseAnyOf
     */
    decoupledOperationId?: string;
}
/**
 * 
 * @export
 * @interface EndSessionTanResponse
 */
export interface EndSessionTanResponse {
    /**
     * 
     * @type {string}
     * @memberof EndSessionTanResponse
     */
    message?: string;
}
/**
 * 
 * @export
 * @interface EstimateChangeOrderCostsParams
 */
export interface EstimateChangeOrderCostsParams {
    /**
     * 
     * @type {OrderChanges}
     * @memberof EstimateChangeOrderCostsParams
     */
    changes: OrderChanges;
}
/**
 * An `Exchange` describes the order possibilites for a security at one exchange.
 * @export
 * @interface Exchange
 */
export interface Exchange {
    /**
     * The id of the exchange, as defined by the *broker*. This is to be used as the `brokerExchangeId` in quote and trade requests.
     * @type {string}
     * @memberof Exchange
     */
    id: string;
    /**
     * The label of the exchange, as defined by the *broker*.
     * @type {string}
     * @memberof Exchange
     */
    label: string;
    /**
     * The orderModels that are available for order direction `sell`. If this is empty, selling is not allowed on this exchange.
     * @type {Array<OrderModel>}
     * @memberof Exchange
     */
    orderModelsSell: Array<OrderModel>;
    /**
     * The orderModels that are available for order direction `buy`. If this is empty, buying is not allowed on this exchange.
     * @type {Array<OrderModel>}
     * @memberof Exchange
     */
    orderModelsBuy: Array<OrderModel>;
    /**
     * only one orderModel is available and it should not be displayed to the user. This is currently the case for buying funds at some
     * exchanges, where there is actually not a real order in the background, so the user should just see buy & sell buttons.
     * @type {boolean}
     * @memberof Exchange
     */
    hideOrderModel?: boolean;
    /**
     * If true, quote orders can be created with quoteMode=limit and quoteOrderOpts.quoteLimit set to a limit. This allows brokers to execute the
     * quote order at a different price instead of rejecting the order when the price has changed.
     * @type {boolean}
     * @memberof Exchange
     */
    allowsQuoteModeLimit?: boolean;
    /**
     * If this is true, limit buy orders may have the additional "ifDoneLimit" set.
     * @type {boolean}
     * @memberof Exchange
     */
    allowsIfDoneLimit?: boolean;
    /**
     * 
     * @type {OrderValidityTypeByOrderModel}
     * @memberof Exchange
     */
    validityTypesByOrderModel?: OrderValidityTypeByOrderModel;
    /**
     * 
     * @type {DefaultOrderValidityByOrderModel}
     * @memberof Exchange
     */
    defaultValidityByOrderModel?: DefaultOrderValidityByOrderModel;
    /**
     * Quotes for the instrument at this exchange are in this currency. This affects fields like limit, stop etc.
     * @type {string}
     * @memberof Exchange
     */
    currencyIso: string;
}
/**
 * 
 * @export
 * @interface ExchangeMeta
 */
export interface ExchangeMeta {
    /**
     * 
     * @type {string}
     * @memberof ExchangeMeta
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof ExchangeMeta
     */
    id: number;
}
/**
 * 
 * @export
 * @interface ExchangesResponse
 */
export interface ExchangesResponse {
    /**
     * 
     * @type {Array<ExchangeMeta>}
     * @memberof ExchangesResponse
     */
    exchanges: Array<ExchangeMeta>;
}
/**
 * 
 * @export
 * @interface GenericTable
 */
export interface GenericTable {
    /**
     * 
     * @type {CostDetailsLink}
     * @memberof GenericTable
     */
    detailsLink?: CostDetailsLink;
    /**
     * 
     * @type {string}
     * @memberof GenericTable
     */
    footerHtml?: string;
    /**
     * 
     * @type {Array<GenericTableRow>}
     * @memberof GenericTable
     */
    rows?: Array<GenericTableRow>;
}
/**
 * 
 * @export
 * @interface GenericTableRow
 */
export interface GenericTableRow {
    /**
     * 
     * @type {GenericTableRowType}
     * @memberof GenericTableRow
     */
    type: GenericTableRowType;
}
/**
 * 
 * @export
 * @interface GenericTableRowEntry
 */
export interface GenericTableRowEntry extends GenericTableRow {
    /**
     * 
     * @type {GenericTableRowValue}
     * @memberof GenericTableRowEntry
     */
    value?: GenericTableRowValue;
    /**
     * 
     * @type {boolean}
     * @memberof GenericTableRowEntry
     */
    isImportant?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowEntry
     */
    caption: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowEntry
     */
    id?: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowEntrySpecifics
 */
export interface GenericTableRowEntrySpecifics {
    /**
     * 
     * @type {GenericTableRowValue}
     * @memberof GenericTableRowEntrySpecifics
     */
    value?: GenericTableRowValue;
    /**
     * 
     * @type {boolean}
     * @memberof GenericTableRowEntrySpecifics
     */
    isImportant?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowEntrySpecifics
     */
    caption?: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowEntrySpecifics
     */
    id?: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowSubheading
 */
export interface GenericTableRowSubheading extends GenericTableRow {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowSubheading
     */
    subheading: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowSubheadingSpecifics
 */
export interface GenericTableRowSubheadingSpecifics {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowSubheadingSpecifics
     */
    subheading?: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowText
 */
export interface GenericTableRowText extends GenericTableRow {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowText
     */
    text: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowTextSpecifics
 */
export interface GenericTableRowTextSpecifics {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowTextSpecifics
     */
    text?: string;
}

/**
 * 
 * @export
 */
export const GenericTableRowType = {
    Subheading: 'subheading',
    Text: 'text',
    Entry: 'entry'
} as const;
export type GenericTableRowType = typeof GenericTableRowType[keyof typeof GenericTableRowType];

/**
 * 
 * @export
 * @interface GenericTableRowValue
 */
export interface GenericTableRowValue {
    /**
     * 
     * @type {GenericTableRowValueType}
     * @memberof GenericTableRowValue
     */
    type: GenericTableRowValueType;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueAmount
 */
export interface GenericTableRowValueAmount extends GenericTableRowValue {
    /**
     * 
     * @type {Amount}
     * @memberof GenericTableRowValueAmount
     */
    value: Amount;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueAmountSpecifics
 */
export interface GenericTableRowValueAmountSpecifics {
    /**
     * 
     * @type {Amount}
     * @memberof GenericTableRowValueAmountSpecifics
     */
    value?: Amount;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueDatetime
 */
export interface GenericTableRowValueDatetime extends GenericTableRowValue {
    /**
     * *Milliseconds* since *the epoch*.
     * @type {number}
     * @memberof GenericTableRowValueDatetime
     */
    value: number;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueDatetimeSpecifics
 */
export interface GenericTableRowValueDatetimeSpecifics {
    /**
     * *Milliseconds* since *the epoch*.
     * @type {number}
     * @memberof GenericTableRowValueDatetimeSpecifics
     */
    value?: number;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLink
 */
export interface GenericTableRowValueLink extends GenericTableRowValue {
    /**
     * 
     * @type {GenericTableRowValueLinkValue}
     * @memberof GenericTableRowValueLink
     */
    value: GenericTableRowValueLinkValue;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkPortfolio
 */
export interface GenericTableRowValueLinkPortfolio extends GenericTableRowValueLinkValue {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkPortfolio
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkPortfolio
     */
    portfolioId: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkPortfolioSpecifics
 */
export interface GenericTableRowValueLinkPortfolioSpecifics {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkPortfolioSpecifics
     */
    text?: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkPortfolioSpecifics
     */
    portfolioId?: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkSpecifics
 */
export interface GenericTableRowValueLinkSpecifics {
    /**
     * 
     * @type {GenericTableRowValueLinkValue}
     * @memberof GenericTableRowValueLinkSpecifics
     */
    value?: GenericTableRowValueLinkValue;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkUrl
 */
export interface GenericTableRowValueLinkUrl extends GenericTableRowValueLinkValue {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkUrl
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkUrl
     */
    text: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkUrlSpecifics
 */
export interface GenericTableRowValueLinkUrlSpecifics {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkUrlSpecifics
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueLinkUrlSpecifics
     */
    text?: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueLinkValue
 */
export interface GenericTableRowValueLinkValue {
    /**
     * 
     * @type {GenericTableRowValueLinkValueType}
     * @memberof GenericTableRowValueLinkValue
     */
    type: GenericTableRowValueLinkValueType;
}

/**
 * 
 * @export
 */
export const GenericTableRowValueLinkValueType = {
    Portfolio: 'portfolio',
    Url: 'url'
} as const;
export type GenericTableRowValueLinkValueType = typeof GenericTableRowValueLinkValueType[keyof typeof GenericTableRowValueLinkValueType];

/**
 * 
 * @export
 * @interface GenericTableRowValueText
 */
export interface GenericTableRowValueText extends GenericTableRowValue {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueText
     */
    value: string;
}
/**
 * 
 * @export
 * @interface GenericTableRowValueTextSpecifics
 */
export interface GenericTableRowValueTextSpecifics {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowValueTextSpecifics
     */
    value?: string;
}

/**
 * 
 * @export
 */
export const GenericTableRowValueType = {
    Text: 'text',
    Amount: 'amount',
    Datetime: 'datetime',
    Link: 'link'
} as const;
export type GenericTableRowValueType = typeof GenericTableRowValueType[keyof typeof GenericTableRowValueType];

/**
 * 
 * @export
 * @interface GetAuthInfoResponse
 */
export interface GetAuthInfoResponse {
    /**
     * 
     * @type {AuthInfo}
     * @memberof GetAuthInfoResponse
     */
    authInfo: AuthInfo;
}
/**
 * 
 * @export
 * @interface GetBrokersResponse
 */
export interface GetBrokersResponse {
    /**
     * 
     * @type {Array<BrokerMeta>}
     * @memberof GetBrokersResponse
     */
    brokers: Array<BrokerMeta>;
}
/**
 * 
 * @export
 * @interface GetCostEstimationParams
 */
export interface GetCostEstimationParams {
    /**
     * 
     * @type {OrderCreate}
     * @memberof GetCostEstimationParams
     */
    order: OrderCreate;
}
/**
 * 
 * @export
 * @interface GetOrderResponse
 */
export interface GetOrderResponse {
    /**
     * 
     * @type {Order}
     * @memberof GetOrderResponse
     */
    order: Order;
}
/**
 * 
 * @export
 * @interface GetPortfolioOrdersResponse
 */
export interface GetPortfolioOrdersResponse {
    /**
     * 
     * @type {number}
     * @memberof GetPortfolioOrdersResponse
     */
    totalCount: number;
    /**
     * 
     * @type {Array<Order>}
     * @memberof GetPortfolioOrdersResponse
     */
    orders: Array<Order>;
}
/**
 * 
 * @export
 * @interface GetPortfolioPositionsResponse
 */
export interface GetPortfolioPositionsResponse {
    /**
     * 
     * @type {Array<Position>}
     * @memberof GetPortfolioPositionsResponse
     */
    positions: Array<Position>;
}
/**
 * 
 * @export
 * @interface GetPortfolioQuotesResponse
 */
export interface GetPortfolioQuotesResponse {
    /**
     * 
     * @type {PortfolioQuotes}
     * @memberof GetPortfolioQuotesResponse
     */
    quotes?: PortfolioQuotes;
}
/**
 * 
 * @export
 * @interface GetQuoteParams
 */
export interface GetQuoteParams {
    /**
     * 
     * @type {string}
     * @memberof GetQuoteParams
     */
    brokerExchangeId: string;
    /**
     * 
     * @type {number}
     * @memberof GetQuoteParams
     */
    size: number;
    /**
     * 
     * @type {Direction}
     * @memberof GetQuoteParams
     */
    direction: Direction;
    /**
     * 
     * @type {string}
     * @memberof GetQuoteParams
     */
    isin: string;
}
/**
 * 
 * @export
 * @interface GetQuoteResponse
 */
export interface GetQuoteResponse {
    /**
     * 
     * @type {string}
     * @memberof GetQuoteResponse
     */
    quoteId: string;
    /**
     * 
     * @type {string}
     * @memberof GetQuoteResponse
     */
    isin: string;
    /**
     * 
     * @type {Direction}
     * @memberof GetQuoteResponse
     */
    direction: Direction;
    /**
     * 
     * @type {number}
     * @memberof GetQuoteResponse
     */
    size?: number;
    /**
     * 
     * @type {string}
     * @memberof GetQuoteResponse
     */
    sourceName?: string;
    /**
     * 
     * @type {Amount}
     * @memberof GetQuoteResponse
     */
    quotation: Amount;
    /**
     * 
     * @type {QuoteExpiration}
     * @memberof GetQuoteResponse
     */
    expiration?: QuoteExpiration;
    /**
     * 
     * @type {OrderCostEstimation}
     * @memberof GetQuoteResponse
     */
    costEstimation?: OrderCostEstimation;
    /**
     * If the broker does not return a cost estimation summary, but it is possible to retrieve a cost estimation summary
     * using the `GetCostEstimation` token (TODO), the token will be returned here.
     * @type {string}
     * @memberof GetQuoteResponse
     */
    costEstimationToken?: string;
}
/**
 * 
 * @export
 * @interface GetUserResponse
 */
export interface GetUserResponse {
    /**
     * 
     * @type {string}
     * @memberof GetUserResponse
     */
    userId: string;
}
/**
 * 
 * @export
 * @interface Hint
 */
export interface Hint {
    /**
     * 
     * @type {string}
     * @memberof Hint
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof Hint
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     * 
     * @type {LoginResponseState}
     * @memberof LoginResponse
     */
    state: LoginResponseState;
}
/**
 * 
 * @export
 * @interface LoginResponseChallenge
 */
export interface LoginResponseChallenge extends LoginResponse {
    /**
     * 
     * @type {Challenge}
     * @memberof LoginResponseChallenge
     */
    challenge: Challenge;
}
/**
 * 
 * @export
 * @interface LoginResponseChallengeSpecifics
 */
export interface LoginResponseChallengeSpecifics {
    /**
     * 
     * @type {Challenge}
     * @memberof LoginResponseChallengeSpecifics
     */
    challenge?: Challenge;
}
/**
 * 
 * @export
 * @interface LoginResponseReady
 */
export interface LoginResponseReady extends LoginResponse {
    /**
     * 
     * @type {string}
     * @memberof LoginResponseReady
     */
    sessionId: string;
}
/**
 * 
 * @export
 * @interface LoginResponseReadySpecifics
 */
export interface LoginResponseReadySpecifics {
    /**
     * 
     * @type {string}
     * @memberof LoginResponseReadySpecifics
     */
    sessionId?: string;
}

/**
 * 
 * @export
 */
export const LoginResponseState = {
    Ready: 'ready',
    Challenge: 'challenge'
} as const;
export type LoginResponseState = typeof LoginResponseState[keyof typeof LoginResponseState];

/**
 * 
 * @export
 * @interface MustAcceptHint
 */
export interface MustAcceptHint {
    /**
     * 
     * @type {Hint}
     * @memberof MustAcceptHint
     */
    hint: Hint;
    /**
     * 
     * @type {string}
     * @memberof MustAcceptHint
     */
    code: MustAcceptHintCodeEnum;
}


/**
 * @export
 */
export const MustAcceptHintCodeEnum = {
    MustAcceptHint: 'MUST_ACCEPT_HINT'
} as const;
export type MustAcceptHintCodeEnum = typeof MustAcceptHintCodeEnum[keyof typeof MustAcceptHintCodeEnum];

/**
 * 
 * @export
 * @interface NoSessionAvailableForPortfolio
 */
export interface NoSessionAvailableForPortfolio {
    /**
     * 
     * @type {string}
     * @memberof NoSessionAvailableForPortfolio
     */
    code: NoSessionAvailableForPortfolioCodeEnum;
}


/**
 * @export
 */
export const NoSessionAvailableForPortfolioCodeEnum = {
    NoSessionAvailableForPortfolio: 'NO_SESSION_AVAILABLE_FOR_PORTFOLIO'
} as const;
export type NoSessionAvailableForPortfolioCodeEnum = typeof NoSessionAvailableForPortfolioCodeEnum[keyof typeof NoSessionAvailableForPortfolioCodeEnum];

/**
 * 
 * @export
 * @interface OkResponseBody
 */
export interface OkResponseBody {
    /**
     * 
     * @type {string}
     * @memberof OkResponseBody
     */
    msg: string;
}
/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * limit (and stop etc.) currency to use for this order
     * @type {string}
     * @memberof Order
     */
    limitCurrencyIso?: string;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    stopLoss?: number;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    takeProfit?: number;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    ifDoneLimit?: number;
    /**
     * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
     * @type {number}
     * @memberof Order
     */
    quoteLimit?: number;
    /**
     * 
     * @type {OrderValidity}
     * @memberof Order
     */
    validity?: OrderValidity;
    /**
     * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
     * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
     * a limit value. After that, the order can be regarded as a limit order with that limit value.
     * @type {number}
     * @memberof Order
     */
    trailingLimitTolerance?: number;
    /**
     * 
     * @type {TrailingDistance}
     * @memberof Order
     */
    trailingDistance?: TrailingDistance;
    /**
     * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
     * @type {number}
     * @memberof Order
     */
    stopLimit?: number;
    /**
     * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
     * 
     * For the orderModel `stop`, the order is executed immediately when the stop is reached.
     * For the orderModel `stopLimit`, the order will only be executed with a limt value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
     * @type {number}
     * @memberof Order
     */
    stop?: number;
    /**
     * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
     * order at.
     * 
     * A limit can be set for orderModel `limit`
     * @type {number}
     * @memberof Order
     */
    limit?: number;
    /**
     * 
     * @type {CashQuotation}
     * @memberof Order
     */
    cashQuotation?: CashQuotation;
    /**
     * 
     * @type {OrderExtension}
     * @memberof Order
     */
    orderExtension?: OrderExtension;
    /**
     * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
     * @type {number}
     * @memberof Order
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    isin: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    brokerExchangeId: string;
    /**
     * 
     * @type {Direction}
     * @memberof Order
     */
    direction: Direction;
    /**
     * 
     * @type {OrderModel}
     * @memberof Order
     */
    orderModel: OrderModel;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    portfolioId: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    id: string;
    /**
     * The order number to use in the interface to display to the user.
     * Some brokers do not assign order numbers, so if this is not present, the order should be displayed without a number.
     * @type {string}
     * @memberof Order
     */
    displayNo?: string;
    /**
     * 
     * @type {OrderStatus}
     * @memberof Order
     */
    status: OrderStatus;
    /**
     * Order status as text (may be broker-specific, only used for displaying it to users).
     * @type {string}
     * @memberof Order
     */
    statusText?: string;
    /**
     * If `true`, the order size can be changed
     * @type {boolean}
     * @memberof Order
     */
    allowsChangeSize: boolean;
    /**
     * If set, the validity of the order can be changed to the given types.
     * @type {Array<OrderValidityType>}
     * @memberof Order
     */
    allowsChangeValidityTypes?: Array<OrderValidityType>;
    /**
     * If true, the limit of the order can be changed.
     * @type {boolean}
     * @memberof Order
     */
    allowsChangeLimit?: boolean;
    /**
     * If true, the stop limit of the order can be changed.
     * @type {boolean}
     * @memberof Order
     */
    allowsChangeStopLimit?: boolean;
    /**
     * If true, the stop of the order can be changed.
     * @type {boolean}
     * @memberof Order
     */
    allowsChangeStop?: boolean;
    /**
     * If true, the trailing distance of the order can be changed.
     * @type {boolean}
     * @memberof Order
     */
    allowsChangeTrailingDistance?: boolean;
    /**
     * If `true`, the order can be canceled
     * @type {boolean}
     * @memberof Order
     */
    allowsCancel: boolean;
    /**
     * If set, the orderModel may be changed to one of the given orderModels.
     * @type {Array<OrderModel>}
     * @memberof Order
     */
    allowsChangeOrderModels?: Array<OrderModel>;
    /**
     * If present in the order object and `true`, the order is part of a combination order (e.g. OCO order) and it is possible
     * to cancel the entire combination order using `cancelOrder` (TODO flag for cancelAll).
     * @type {boolean}
     * @memberof Order
     */
    allowsCancelAllOrderParts?: boolean;
    /**
     * Name of the exchange as provided by the broker.
     * @type {string}
     * @memberof Order
     */
    exchangeName?: string;
    /**
     * The mapped exchange id, as retrievable in the the `/exchanges` endpoint.
     * @type {number}
     * @memberof Order
     */
    exchangeId?: number;
    /**
     * Timestamp of the order creation.
     * @type {string}
     * @memberof Order
     */
    createdAt?: string;
    /**
     * For fully executed orders: the timestamp of the *latest* execution.
     * @type {string}
     * @memberof Order
     */
    executedAt?: string;
    /**
     * Contains original broker data (in the broker's data format).
     * @type {string}
     * @memberof Order
     */
    sourceData?: string;
    /**
     * 
     * @type {Security}
     * @memberof Order
     */
    security: Security;
    /**
     * Order is visible, but it cannot be interacted with (e.g. because it is the discarded part of a combination order).
     * If this is present and `true`, it should be displayed to the user, but visibily disabled.
     * @type {boolean}
     * @memberof Order
     */
    showAsDisabled?: boolean;
    /**
     * If this is true, it is not possible to show a receipt for this order (this is the case if order data is incomplete in order lists).
     * @type {boolean}
     * @memberof Order
     */
    hasNoOrderReceipt?: boolean;
    /**
     * If this is `true` (for open orders only), this order is currently awaiting the execution of a parent order.
     * @type {boolean}
     * @memberof Order
     */
    orderStatusIsAwaitingParentOrder?: boolean;
    /**
     * Remaining/open size of the order
     * @type {number}
     * @memberof Order
     */
    openSize?: number;
    /**
     * Already executed size of the order
     * @type {number}
     * @memberof Order
     */
    executedSize?: number;
    /**
     * Already cancelled size of the order.
     * @type {number}
     * @memberof Order
     */
    cancelledSize?: number;
    /**
     * If the security is a bond, the currency ISO code to show for the size input field.
     * @type {string}
     * @memberof Order
     */
    bondCurrencyIso?: string;
    /**
     * 
     * @type {Amount}
     * @memberof Order
     */
    profitLossAbs?: Amount;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    profitLossRel?: number;
    /**
     * If present, defines how many decimal places should be displayed for quote values.
     * @type {number}
     * @memberof Order
     */
    quoteDecimals?: number;
    /**
     * If present, defines how many decimal places should be displayed for size values.
     * @type {number}
     * @memberof Order
     */
    sizeDecimals?: number;
    /**
     * If there already have been executions of this order, a list of those.
     * @type {Array<OrderExecution>}
     * @memberof Order
     */
    executions?: Array<OrderExecution>;
    /**
     * For canceled orders: when the order has been canceled.
     * @type {string}
     * @memberof Order
     */
    cancellationDateTime?: string;
    /**
     * If true, the current stop value of this order can be observed. In this case, the stop value can be subcribed via WebSocket (TODO - not implemented yet)
     * @type {boolean}
     * @memberof Order
     */
    mayObserveCurrentStop?: boolean;
    /**
     * 
     * @type {Amount}
     * @memberof Order
     */
    currentStop?: Amount;
}
/**
 * 
 * @export
 * @interface OrderChanges
 */
export interface OrderChanges {
    /**
     * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
     * order at.
     * 
     * A limit can be set for orderModel `limit`
     * @type {number}
     * @memberof OrderChanges
     */
    limit?: number;
    /**
     * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
     * @type {number}
     * @memberof OrderChanges
     */
    stopLimit?: number;
    /**
     * 
     * @type {OrderModel}
     * @memberof OrderChanges
     */
    orderModel: OrderModel;
    /**
     * 
     * @type {OrderValidity}
     * @memberof OrderChanges
     */
    validity: OrderValidity;
    /**
     * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
     * @type {number}
     * @memberof OrderChanges
     */
    size: number;
    /**
     * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
     * 
     * For the orderModel `stop`, the order is executed immediately when the stop is reached.
     * For the orderModel `stopLimit`, the order will only be executed with a limt value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
     * @type {number}
     * @memberof OrderChanges
     */
    stop?: number;
    /**
     * 
     * @type {TrailingDistance}
     * @memberof OrderChanges
     */
    trailingDistance?: TrailingDistance;
}
/**
 * 
 * @export
 * @interface OrderCostEstimation
 */
export interface OrderCostEstimation {
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    entryCosts?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    transactionTax?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    totalCosts?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    expectedCounterValue?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    orderFees?: Amount;
    /**
     * Detailed explanation for order fees
     * @type {string}
     * @memberof OrderCostEstimation
     */
    orderFeesExplanation?: string;
    /**
     * If present, users have to accept this message before creating an order.
     * If accepting the costs and performing the order is one click (which is allowed), the create order button label
     * must contain the information that costs are accepted.
     * @type {string}
     * @memberof OrderCostEstimation
     */
    costAcceptancePrompt?: string;
    /**
     * 
     * @type {GenericTable}
     * @memberof OrderCostEstimation
     */
    detailedTable?: GenericTable;
    /**
     * 
     * @type {CostDetailsLink}
     * @memberof OrderCostEstimation
     */
    costDetailsLink?: CostDetailsLink;
}
/**
 * 
 * @export
 * @interface OrderCreate
 */
export interface OrderCreate {
    /**
     * limit (and stop etc.) currency to use for this order
     * @type {string}
     * @memberof OrderCreate
     */
    limitCurrencyIso?: string;
    /**
     * 
     * @type {number}
     * @memberof OrderCreate
     */
    stopLoss?: number;
    /**
     * 
     * @type {number}
     * @memberof OrderCreate
     */
    takeProfit?: number;
    /**
     * 
     * @type {number}
     * @memberof OrderCreate
     */
    ifDoneLimit?: number;
    /**
     * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
     * @type {number}
     * @memberof OrderCreate
     */
    quoteLimit?: number;
    /**
     * 
     * @type {OrderValidity}
     * @memberof OrderCreate
     */
    validity: OrderValidity;
    /**
     * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
     * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
     * a limit value. After that, the order can be regarded as a limit order with that limit value.
     * @type {number}
     * @memberof OrderCreate
     */
    trailingLimitTolerance?: number;
    /**
     * 
     * @type {TrailingDistance}
     * @memberof OrderCreate
     */
    trailingDistance?: TrailingDistance;
    /**
     * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
     * @type {number}
     * @memberof OrderCreate
     */
    stopLimit?: number;
    /**
     * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
     * 
     * For the orderModel `stop`, the order is executed immediately when the stop is reached.
     * For the orderModel `stopLimit`, the order will only be executed with a limt value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
     * @type {number}
     * @memberof OrderCreate
     */
    stop?: number;
    /**
     * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
     * order at.
     * 
     * A limit can be set for orderModel `limit`
     * @type {number}
     * @memberof OrderCreate
     */
    limit?: number;
    /**
     * 
     * @type {CashQuotation}
     * @memberof OrderCreate
     */
    cashQuotation?: CashQuotation;
    /**
     * 
     * @type {OrderExtension}
     * @memberof OrderCreate
     */
    orderExtension?: OrderExtension;
    /**
     * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
     * @type {number}
     * @memberof OrderCreate
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof OrderCreate
     */
    isin: string;
    /**
     * 
     * @type {string}
     * @memberof OrderCreate
     */
    brokerExchangeId: string;
    /**
     * 
     * @type {Direction}
     * @memberof OrderCreate
     */
    direction: Direction;
    /**
     * 
     * @type {OrderModel}
     * @memberof OrderCreate
     */
    orderModel: OrderModel;
    /**
     * 
     * @type {string}
     * @memberof OrderCreate
     */
    portfolioId: string;
    /**
     * For `orderModel=quote`: the quoteId, as retrieved from `GetQuote`.
     * @type {string}
     * @memberof OrderCreate
     */
    quoteId?: string;
}
/**
 * 
 * @export
 * @interface OrderExecution
 */
export interface OrderExecution {
    /**
     * 
     * @type {number}
     * @memberof OrderExecution
     */
    crossRate?: number;
    /**
     * 
     * @type {string}
     * @memberof OrderExecution
     */
    executionStatusText?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderExecution
     */
    executedDateTime?: string;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    totalAmount?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    amount?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    tax?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    transactionTax?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    quote?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderExecution
     */
    size: Amount;
    /**
     * 
     * @type {string}
     * @memberof OrderExecution
     */
    id?: string;
}

/**
 * Some brokers and exchanges allow adding an order extension that influence how the order is executed.
 * 
 * - `FOK`: Fill or kill
 * - `ICO`: Immediate or cancel
 * - `AON`: All or None
 * - `PEA`: Partial executions allowed
 * @export
 */
export const OrderExtension = {
    Fok: 'FOK',
    Ioc: 'IOC',
    Aon: 'AON',
    Pea: 'PEA'
} as const;
export type OrderExtension = typeof OrderExtension[keyof typeof OrderExtension];


/**
 * The `orderModel` defines how the order is executed at an exchange.
 * Some of the values cannot be used for creation, i.e. currently `fraction` and `savingsPlan` (those
 * two values only appear in order lists / receipts).
 * @export
 */
export const OrderModel = {
    Quote: 'quote',
    Fraction: 'fraction',
    SavingsPlan: 'savingsPlan',
    Market: 'market',
    Limit: 'limit',
    StopMarket: 'stopMarket',
    StopLimit: 'stopLimit',
    TrailingStopMarket: 'trailingStopMarket',
    TrailingStopLimit: 'trailingStopLimit',
    OcoStopMarket: 'ocoStopMarket',
    OcoStopLimit: 'ocoStopLimit'
} as const;
export type OrderModel = typeof OrderModel[keyof typeof OrderModel];


/**
 * 
 * @export
 */
export const OrderStatus = {
    Open: 'open',
    Canceled: 'canceled',
    Executed: 'executed',
    OpenExecuted: 'open_executed',
    CanceledExecuted: 'canceled_executed'
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

/**
 * Defines how long an order is valid.
 * @export
 * @interface OrderValidity
 */
export interface OrderValidity {
    /**
     * 
     * @type {string}
     * @memberof OrderValidity
     */
    eom?: string;
    /**
     * Date in the format YYYY-MM-DD
     * @type {string}
     * @memberof OrderValidity
     */
    date?: string;
    /**
     * 
     * @type {OrderValidityType}
     * @memberof OrderValidity
     */
    type: OrderValidityType;
}

/**
 * Order validity:
 * - `AUTO`: choose automatically
 * - `GFD`: good for day (*today/current trading day*)
 * - `GTC`: good til canceled
 * - `GTD` good til given date
 * - `GTU` good til ultimo (end of month)
 * @export
 */
export const OrderValidityType = {
    Auto: 'AUTO',
    Gfd: 'GFD',
    Gtc: 'GTC',
    Gtu: 'GTU',
    Gtd: 'GTD',
    Eom: 'EOM'
} as const;
export type OrderValidityType = typeof OrderValidityType[keyof typeof OrderValidityType];

/**
 * 
 * @export
 * @interface OrderValidityTypeByOrderModel
 */
export interface OrderValidityTypeByOrderModel {
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    quote?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    fraction?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    savingsPlan?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    market?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    limit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    stopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    stopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    trailingStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    trailingStopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    ocoStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    ocoStopLimit?: Array<OrderValidityType>;
}
/**
 * 
 * @export
 * @interface Portfolio
 */
export interface Portfolio {
    /**
     * 
     * @type {Array<string>}
     * @memberof Portfolio
     */
    sessionIds: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Portfolio
     */
    portfolioName: string;
    /**
     * 
     * @type {BrokerName}
     * @memberof Portfolio
     */
    brokerName: BrokerName;
    /**
     * 
     * @type {string}
     * @memberof Portfolio
     */
    id: string;
}
/**
 * 
 * @export
 * @interface PortfolioQuotes
 */
export interface PortfolioQuotes {
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    profitLossAbsPrevClose?: Amount;
    /**
     * Relative P/L of all open positions, since prevClose (or buy, if that is later than prevClose). 1 means +100%
     * @type {number}
     * @memberof PortfolioQuotes
     */
    profitLossRelPrevClose?: number;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    profitLossAbs?: Amount;
    /**
     * Relative P/L of all open positions, since acquisition. 1 means +100%
     * @type {number}
     * @memberof PortfolioQuotes
     */
    profitLossRel?: number;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    totalValue?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    cashAccountBalance?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    availableCash?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    positionValue?: Amount;
}
/**
 * 
 * @export
 * @interface PortfoliosResponse
 */
export interface PortfoliosResponse {
    /**
     * 
     * @type {Array<Portfolio>}
     * @memberof PortfoliosResponse
     */
    portfolios: Array<Portfolio>;
}
/**
 * 
 * @export
 * @interface Position
 */
export interface Position {
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    sourceData?: string;
    /**
     * True if the user may edit a comment for this position.
     * @type {boolean}
     * @memberof Position
     */
    commentIsEditable?: boolean;
    /**
     * Textual comment for the position.
     * @type {string}
     * @memberof Position
     */
    comment?: string;
    /**
     * Relative P/L of the entire position, since acquisition, but including the dividends booked for this position (see `totalDividends`). 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRelWithDividends?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbsWithDividends?: Amount;
    /**
     * Relative P/L of the entire posiiton, since "prevClose". 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRelPrevClose?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbsPrevClose?: Amount;
    /**
     * Relative P/L of the entire posiiton, since acquisition. 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRel?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbs?: Amount;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    prevCloseValuation?: PositionValuation;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    currentValuation?: PositionValuation;
    /**
     * Date in the format YYYY-MM-DD
     * @type {string}
     * @memberof Position
     */
    purchaseDate?: string;
    /**
     * Date and time of position purchase. If not set, purchaseDate may at least contain the date.
     * @type {string}
     * @memberof Position
     */
    purchaseDateTime?: string;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    purchaseValuation?: PositionValuation;
    /**
     * How much of the position is available for sale.
     * @type {number}
     * @memberof Position
     */
    availableSize: number;
    /**
     * The exchange id as defined by the broker.
     * @type {string}
     * @memberof Position
     */
    brokerExchangeId?: string;
    /**
     * The mapped exchange id, as retrievable in the the `/exchanges` endpoint.
     * @type {number}
     * @memberof Position
     */
    exchangeId?: number;
    /**
     * 
     * @type {Security}
     * @memberof Position
     */
    security: Security;
    /**
     * - ISO code (e.g. EUR for Euro), if it is a monetary amount
     * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
     * - or 'XXX' if it is pieces
     * - or 'PRC' if it is a percentage
     * - or 'PRM' if it is permil
     * - or 'XXP' if it is points (as for indices)
     * @type {string}
     * @memberof Position
     */
    sizeUnit: string;
    /**
     * 
     * @type {number}
     * @memberof Position
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    id: string;
}
/**
 * 
 * @export
 * @interface PositionValuation
 */
export interface PositionValuation {
    /**
     * CrossRate that was used to convert from quotation to positionValue, if this applies here.
     * @type {number}
     * @memberof PositionValuation
     */
    crossRate?: number;
    /**
     * 
     * @type {Amount}
     * @memberof PositionValuation
     */
    positionValue?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof PositionValuation
     */
    quotation?: Amount;
    /**
     * 
     * @type {boolean}
     * @memberof PositionValuation
     */
    isDelayed?: boolean;
}
/**
 * 
 * @export
 * @interface PrepareOAuthRedirectParams
 */
export interface PrepareOAuthRedirectParams {
    /**
     * 
     * @type {string}
     * @memberof PrepareOAuthRedirectParams
     */
    returnToUrl: string;
    /**
     * 
     * @type {string}
     * @memberof PrepareOAuthRedirectParams
     */
    env: string;
    /**
     * 
     * @type {BrokerName}
     * @memberof PrepareOAuthRedirectParams
     */
    brokerName: BrokerName;
}
/**
 * 
 * @export
 * @interface PrepareOAuthRedirectResponse
 */
export interface PrepareOAuthRedirectResponse {
    /**
     * 
     * @type {string}
     * @memberof PrepareOAuthRedirectResponse
     */
    redirectTo: string;
}
/**
 * 
 * @export
 * @interface PrepareTradeResponse
 */
export interface PrepareTradeResponse {
    /**
     * 
     * @type {PreparedTrade}
     * @memberof PrepareTradeResponse
     */
    preparedTrade: PreparedTrade;
}
/**
 * 
 * @export
 * @interface PreparedTrade
 */
export interface PreparedTrade {
    /**
     * If this is true, the estimated order costs must be shown before the user can create the order.
     * If this is false, showing the order costs is optional.
     * @type {boolean}
     * @memberof PreparedTrade
     */
    costEstimationMustBeShown: boolean;
    /**
     * 
     * @type {Array<Exchange>}
     * @memberof PreparedTrade
     */
    exchanges: Array<Exchange>;
    /**
     * If present, this hint must be displayed in the order form. It should be visible during the order
     * creation process, but does not need to be accepted by the user explicitly.
     * @type {string}
     * @memberof PreparedTrade
     */
    strikingHint?: string;
    /**
     * - ISO code (e.g. EUR for Euro), if it is a monetary amount
     * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
     * - or 'XXX' if it is pieces
     * - or 'PRC' if it is a percentage
     * - or 'PRM' if it is permil
     * - or 'XXP' if it is points (as for indices)
     * @type {string}
     * @memberof PreparedTrade
     */
    sizeUnit: string;
    /**
     * 
     * @type {RiskClassInfo}
     * @memberof PreparedTrade
     */
    riskClassInfo?: RiskClassInfo;
    /**
     * 
     * @type {Security}
     * @memberof PreparedTrade
     */
    security: Security;
}
/**
 * 
 * @export
 * @interface QuoteExpiration
 */
export interface QuoteExpiration {
    /**
     * 
     * @type {string}
     * @memberof QuoteExpiration
     */
    expires: string;
    /**
     * 
     * @type {string}
     * @memberof QuoteExpiration
     */
    started: string;
}
/**
 * 
 * @export
 * @interface RiskClassInfo
 */
export interface RiskClassInfo {
    /**
     * Risk class message to display (may contain a subset of HTML: `<a>` tags for linking to external pages, `<p>`/`<br>` to add paragraphs/line breaks, `<ul><li></li></ul>` to show unuordered lists).
     * Users must accept the message before they can create the order. This can happen before the actual order form is visible.
     * @type {string}
     * @memberof RiskClassInfo
     */
    msg?: string;
    /**
     * If true, only sell is allowed for this instrument.
     * @type {boolean}
     * @memberof RiskClassInfo
     */
    onlySellAllowed?: boolean;
    /**
     * If set, must be displayed as a static hint (which the user does not need to confirm) before the order button. May contain (some) HTML.
     * @type {string}
     * @memberof RiskClassInfo
     */
    legalHint?: string;
}
/**
 * A security's basic data like symbols and names.
 * @export
 * @interface Security
 */
export interface Security {
    /**
     * 
     * @type {string}
     * @memberof Security
     */
    symbol?: string;
    /**
     * 
     * @type {string}
     * @memberof Security
     */
    wkn?: string;
    /**
     * 
     * @type {string}
     * @memberof Security
     */
    isin?: string;
    /**
     * 
     * @type {string}
     * @memberof Security
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface SecurityNotAvailableForTrading
 */
export interface SecurityNotAvailableForTrading {
    /**
     * 
     * @type {string}
     * @memberof SecurityNotAvailableForTrading
     */
    code: SecurityNotAvailableForTradingCodeEnum;
}


/**
 * @export
 */
export const SecurityNotAvailableForTradingCodeEnum = {
    SecurityNotFound: 'SECURITY_NOT_FOUND'
} as const;
export type SecurityNotAvailableForTradingCodeEnum = typeof SecurityNotAvailableForTradingCodeEnum[keyof typeof SecurityNotAvailableForTradingCodeEnum];

/**
 * 
 * @export
 * @interface Session
 */
export interface Session {
    /**
     * 
     * @type {SyncError}
     * @memberof Session
     */
    syncError?: SyncError;
    /**
     * 
     * @type {AuthInfo}
     * @memberof Session
     */
    authInfo?: AuthInfo;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    lastSuccessfulSync?: string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    brokerName: string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    id: string;
}
/**
 * 
 * @export
 * @interface SessionResponse
 */
export interface SessionResponse {
    /**
     * 
     * @type {Array<Session>}
     * @memberof SessionResponse
     */
    sessions: Array<Session>;
}
/**
 * 
 * @export
 * @interface SyncError
 */
export interface SyncError {
    /**
     * 
     * @type {string}
     * @memberof SyncError
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof SyncError
     */
    date: string;
}
/**
 * For orderModels `trailingStopMarket` and `trailingStopLimit`: the distance between the security's quote and the
 * stop value to calculate.
 * @export
 * @interface TrailingDistance
 */
export interface TrailingDistance {
    /**
     * 
     * @type {number}
     * @memberof TrailingDistance
     */
    value: number;
    /**
     * 
     * @type {string}
     * @memberof TrailingDistance
     */
    mode: TrailingDistanceModeEnum;
}


/**
 * @export
 */
export const TrailingDistanceModeEnum = {
    Abs: 'abs',
    Rel: 'rel'
} as const;
export type TrailingDistanceModeEnum = typeof TrailingDistanceModeEnum[keyof typeof TrailingDistanceModeEnum];

