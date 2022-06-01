/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior. The rate limits will be refined in the future.  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   | 
 *
 * The version of the OpenAPI document: 0.0.1-preview
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    CashQuotation,
    CashQuotationFromJSON,
    CashQuotationFromJSONTyped,
    CashQuotationToJSON,
} from './CashQuotation';
import {
    Direction,
    DirectionFromJSON,
    DirectionFromJSONTyped,
    DirectionToJSON,
} from './Direction';
import {
    OrderCreate,
    OrderCreateFromJSON,
    OrderCreateFromJSONTyped,
    OrderCreateToJSON,
} from './OrderCreate';
import {
    OrderExtension,
    OrderExtensionFromJSON,
    OrderExtensionFromJSONTyped,
    OrderExtensionToJSON,
} from './OrderExtension';
import {
    OrderValidity,
    OrderValidityFromJSON,
    OrderValidityFromJSONTyped,
    OrderValidityToJSON,
} from './OrderValidity';
import {
    QuoteOrderCreate,
    QuoteOrderCreateFromJSON,
    QuoteOrderCreateFromJSONTyped,
    QuoteOrderCreateToJSON,
} from './QuoteOrderCreate';
import {
    TrailingDistance,
    TrailingDistanceFromJSON,
    TrailingDistanceFromJSONTyped,
    TrailingDistanceToJSON,
} from './TrailingDistance';

/**
 * 
 * @export
 * @interface OrderForCreate
 */
export interface OrderForCreate {
    /**
     * 
     * @type {number}
     * @memberof OrderForCreate
     */
    stopLoss?: number;
    /**
     * 
     * @type {number}
     * @memberof OrderForCreate
     */
    takeProfit?: number;
    /**
     * 
     * @type {number}
     * @memberof OrderForCreate
     */
    ifDoneLimit?: number;
    /**
     * If supported by the broker, an optional limit can be added to a quote trade.
     * @type {number}
     * @memberof OrderForCreate
     */
    quoteLimit?: number;
    /**
     * 
     * @type {OrderValidity}
     * @memberof OrderForCreate
     */
    validity: OrderValidity;
    /**
     * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
     * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
     * a limit value. After that, the order can be regarded as a limit order with that limit value.
     * @type {number}
     * @memberof OrderForCreate
     */
    trailingLimitTolerance?: number;
    /**
     * 
     * @type {TrailingDistance}
     * @memberof OrderForCreate
     */
    trailingDistance?: TrailingDistance;
    /**
     * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
     * @type {number}
     * @memberof OrderForCreate
     */
    stopLimit?: number;
    /**
     * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
     * 
     * For the orderModel `stop`, the order is executed immediately when the stop is reached.
     * For the orderModel `stopLimit`, the order will only be executed with a limt value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
     * @type {number}
     * @memberof OrderForCreate
     */
    stop?: number;
    /**
     * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
     * order at.
     * 
     * A limit can be set for orderModel `limit`
     * @type {number}
     * @memberof OrderForCreate
     */
    limit?: number;
    /**
     * 
     * @type {CashQuotation}
     * @memberof OrderForCreate
     */
    cashQuotation?: CashQuotation;
    /**
     * 
     * @type {OrderExtension}
     * @memberof OrderForCreate
     */
    orderExtension?: OrderExtension;
    /**
     * 
     * @type {number}
     * @memberof OrderForCreate
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof OrderForCreate
     */
    isin: string;
    /**
     * 
     * @type {string}
     * @memberof OrderForCreate
     */
    brokerExchangeId: string;
    /**
     * 
     * @type {Direction}
     * @memberof OrderForCreate
     */
    direction: Direction;
    /**
     * 
     * @type {string}
     * @memberof OrderForCreate
     */
    portfolioId: string;
    /**
     * 
     * @type {string}
     * @memberof OrderForCreate
     */
    orderModel: OrderForCreateOrderModelEnum;
    /**
     * The quoteId, as retrieved in `GetQuote`
     * @type {string}
     * @memberof OrderForCreate
     */
    quoteId: string;
}

/**
* @export
* @enum {string}
*/
export enum OrderForCreateOrderModelEnum {
    Quote = 'quote'
}

export function OrderForCreateFromJSON(json: any): OrderForCreate {
    return OrderForCreateFromJSONTyped(json, false);
}

export function OrderForCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderForCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stopLoss': !exists(json, 'stopLoss') ? undefined : json['stopLoss'],
        'takeProfit': !exists(json, 'takeProfit') ? undefined : json['takeProfit'],
        'ifDoneLimit': !exists(json, 'ifDoneLimit') ? undefined : json['ifDoneLimit'],
        'quoteLimit': !exists(json, 'quoteLimit') ? undefined : json['quoteLimit'],
        'validity': OrderValidityFromJSON(json['validity']),
        'trailingLimitTolerance': !exists(json, 'trailingLimitTolerance') ? undefined : json['trailingLimitTolerance'],
        'trailingDistance': !exists(json, 'trailingDistance') ? undefined : TrailingDistanceFromJSON(json['trailingDistance']),
        'stopLimit': !exists(json, 'stopLimit') ? undefined : json['stopLimit'],
        'stop': !exists(json, 'stop') ? undefined : json['stop'],
        'limit': !exists(json, 'limit') ? undefined : json['limit'],
        'cashQuotation': !exists(json, 'cashQuotation') ? undefined : CashQuotationFromJSON(json['cashQuotation']),
        'orderExtension': !exists(json, 'orderExtension') ? undefined : OrderExtensionFromJSON(json['orderExtension']),
        'size': json['size'],
        'isin': json['isin'],
        'brokerExchangeId': json['brokerExchangeId'],
        'direction': DirectionFromJSON(json['direction']),
        'portfolioId': json['portfolioId'],
        'orderModel': json['orderModel'],
        'quoteId': json['quoteId'],
    };
}

export function OrderForCreateToJSON(value?: OrderForCreate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stopLoss': value.stopLoss,
        'takeProfit': value.takeProfit,
        'ifDoneLimit': value.ifDoneLimit,
        'quoteLimit': value.quoteLimit,
        'validity': OrderValidityToJSON(value.validity),
        'trailingLimitTolerance': value.trailingLimitTolerance,
        'trailingDistance': TrailingDistanceToJSON(value.trailingDistance),
        'stopLimit': value.stopLimit,
        'stop': value.stop,
        'limit': value.limit,
        'cashQuotation': CashQuotationToJSON(value.cashQuotation),
        'orderExtension': OrderExtensionToJSON(value.orderExtension),
        'size': value.size,
        'isin': value.isin,
        'brokerExchangeId': value.brokerExchangeId,
        'direction': DirectionToJSON(value.direction),
        'portfolioId': value.portfolioId,
        'orderModel': value.orderModel,
        'quoteId': value.quoteId,
    };
}

