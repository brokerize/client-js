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
    DefaultOrderValidityByOrderModel,
    DefaultOrderValidityByOrderModelFromJSON,
    DefaultOrderValidityByOrderModelFromJSONTyped,
    DefaultOrderValidityByOrderModelToJSON,
} from './DefaultOrderValidityByOrderModel';
import {
    OrderModel,
    OrderModelFromJSON,
    OrderModelFromJSONTyped,
    OrderModelToJSON,
} from './OrderModel';
import {
    OrderValidityTypeByOrderModel,
    OrderValidityTypeByOrderModelFromJSON,
    OrderValidityTypeByOrderModelFromJSONTyped,
    OrderValidityTypeByOrderModelToJSON,
} from './OrderValidityTypeByOrderModel';
import {
    StringMapByOrderModel,
    StringMapByOrderModelFromJSON,
    StringMapByOrderModelFromJSONTyped,
    StringMapByOrderModelToJSON,
} from './StringMapByOrderModel';

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
     * If the exchange can be mapped to the brokerize exchange list, this contains the id of the corresponding entry. Note that this is optional
     * and may be missing if the exchange cannot be mapped.
     * @type {number}
     * @memberof Exchange
     */
    brokerizeExchangeId?: number;
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
     * 
     * @type {StringMapByOrderModel}
     * @memberof Exchange
     */
    legalMessagesToConfirmByOrderModel?: StringMapByOrderModel;
    /**
     * Quotes for the instrument at this exchange are in this currency. This affects fields like limit, stop etc.
     * @type {string}
     * @memberof Exchange
     */
    currencyIso: string;
}

export function ExchangeFromJSON(json: any): Exchange {
    return ExchangeFromJSONTyped(json, false);
}

export function ExchangeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Exchange {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'brokerizeExchangeId': !exists(json, 'brokerizeExchangeId') ? undefined : json['brokerizeExchangeId'],
        'label': json['label'],
        'orderModelsSell': ((json['orderModelsSell'] as Array<any>).map(OrderModelFromJSON)),
        'orderModelsBuy': ((json['orderModelsBuy'] as Array<any>).map(OrderModelFromJSON)),
        'hideOrderModel': !exists(json, 'hideOrderModel') ? undefined : json['hideOrderModel'],
        'allowsQuoteModeLimit': !exists(json, 'allowsQuoteModeLimit') ? undefined : json['allowsQuoteModeLimit'],
        'allowsIfDoneLimit': !exists(json, 'allowsIfDoneLimit') ? undefined : json['allowsIfDoneLimit'],
        'validityTypesByOrderModel': !exists(json, 'validityTypesByOrderModel') ? undefined : OrderValidityTypeByOrderModelFromJSON(json['validityTypesByOrderModel']),
        'defaultValidityByOrderModel': !exists(json, 'defaultValidityByOrderModel') ? undefined : DefaultOrderValidityByOrderModelFromJSON(json['defaultValidityByOrderModel']),
        'legalMessagesToConfirmByOrderModel': !exists(json, 'legalMessagesToConfirmByOrderModel') ? undefined : StringMapByOrderModelFromJSON(json['legalMessagesToConfirmByOrderModel']),
        'currencyIso': json['currencyIso'],
    };
}

export function ExchangeToJSONRecursive(value?: Exchange | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'id': value.id,
        'brokerizeExchangeId': value.brokerizeExchangeId,
        'label': value.label,
        'orderModelsSell': ((value.orderModelsSell as Array<any>).map(OrderModelToJSON)),
        'orderModelsBuy': ((value.orderModelsBuy as Array<any>).map(OrderModelToJSON)),
        'hideOrderModel': value.hideOrderModel,
        'allowsQuoteModeLimit': value.allowsQuoteModeLimit,
        'allowsIfDoneLimit': value.allowsIfDoneLimit,
        'validityTypesByOrderModel': OrderValidityTypeByOrderModelToJSON(value.validityTypesByOrderModel),
        'defaultValidityByOrderModel': DefaultOrderValidityByOrderModelToJSON(value.defaultValidityByOrderModel),
        'legalMessagesToConfirmByOrderModel': StringMapByOrderModelToJSON(value.legalMessagesToConfirmByOrderModel),
        'currencyIso': value.currencyIso,
    };
}

export function ExchangeToJSON(value?: Exchange | null): any {
    return ExchangeToJSONRecursive(value, false);
}
