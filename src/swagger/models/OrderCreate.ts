/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     | 
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
    OrderExtension,
    OrderExtensionFromJSON,
    OrderExtensionFromJSONTyped,
    OrderExtensionToJSON,
} from './OrderExtension';
import {
    OrderModel,
    OrderModelFromJSON,
    OrderModelFromJSONTyped,
    OrderModelToJSON,
} from './OrderModel';
import {
    OrderValidity,
    OrderValidityFromJSON,
    OrderValidityFromJSONTyped,
    OrderValidityToJSON,
} from './OrderValidity';
import {
    TrailingDistance,
    TrailingDistanceFromJSON,
    TrailingDistanceFromJSONTyped,
    TrailingDistanceToJSON,
} from './TrailingDistance';

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
    /**
     * If a list of sellPositions has been provided in `PrepareTrade`, this must contain the selected position id to sell from
     * @type {string}
     * @memberof OrderCreate
     */
    sellPositionId?: string;
    /**
     * If a list of cash accounts is provided for the portfolio, this should contain the selected account.
     * @type {string}
     * @memberof OrderCreate
     */
    cashAccountId?: string;
}

export function OrderCreateFromJSON(json: any): OrderCreate {
    return OrderCreateFromJSONTyped(json, false);
}

export function OrderCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limitCurrencyIso': !exists(json, 'limitCurrencyIso') ? undefined : json['limitCurrencyIso'],
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
        'orderModel': OrderModelFromJSON(json['orderModel']),
        'portfolioId': json['portfolioId'],
        'quoteId': !exists(json, 'quoteId') ? undefined : json['quoteId'],
        'sellPositionId': !exists(json, 'sellPositionId') ? undefined : json['sellPositionId'],
        'cashAccountId': !exists(json, 'cashAccountId') ? undefined : json['cashAccountId'],
    };
}

export function OrderCreateToJSONRecursive(value?: OrderCreate | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'limitCurrencyIso': value.limitCurrencyIso,
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
        'orderModel': OrderModelToJSON(value.orderModel),
        'portfolioId': value.portfolioId,
        'quoteId': value.quoteId,
        'sellPositionId': value.sellPositionId,
        'cashAccountId': value.cashAccountId,
    };
}

export function OrderCreateToJSON(value?: OrderCreate | null): any {
    return OrderCreateToJSONRecursive(value, false);
}
