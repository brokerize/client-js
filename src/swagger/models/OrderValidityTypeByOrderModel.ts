/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2022-12-13T16:24:53.307Z\" }</pre>
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
    OrderValidityType,
    OrderValidityTypeFromJSON,
    OrderValidityTypeFromJSONTyped,
    OrderValidityTypeToJSON,
} from './OrderValidityType';

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

export function OrderValidityTypeByOrderModelFromJSON(json: any): OrderValidityTypeByOrderModel {
    return OrderValidityTypeByOrderModelFromJSONTyped(json, false);
}

export function OrderValidityTypeByOrderModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderValidityTypeByOrderModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'quote': !exists(json, 'quote') ? undefined : ((json['quote'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'fraction': !exists(json, 'fraction') ? undefined : ((json['fraction'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'savingsPlan': !exists(json, 'savingsPlan') ? undefined : ((json['savingsPlan'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'market': !exists(json, 'market') ? undefined : ((json['market'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'limit': !exists(json, 'limit') ? undefined : ((json['limit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopMarket': !exists(json, 'stopMarket') ? undefined : ((json['stopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopLimit': !exists(json, 'stopLimit') ? undefined : ((json['stopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopMarket': !exists(json, 'trailingStopMarket') ? undefined : ((json['trailingStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopLimit': !exists(json, 'trailingStopLimit') ? undefined : ((json['trailingStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopMarket': !exists(json, 'ocoStopMarket') ? undefined : ((json['ocoStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopLimit': !exists(json, 'ocoStopLimit') ? undefined : ((json['ocoStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
    };
}

export function OrderValidityTypeByOrderModelToJSONRecursive(value?: OrderValidityTypeByOrderModel | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'quote': value.quote === undefined ? undefined : ((value.quote as Array<any>).map(OrderValidityTypeToJSON)),
        'fraction': value.fraction === undefined ? undefined : ((value.fraction as Array<any>).map(OrderValidityTypeToJSON)),
        'savingsPlan': value.savingsPlan === undefined ? undefined : ((value.savingsPlan as Array<any>).map(OrderValidityTypeToJSON)),
        'market': value.market === undefined ? undefined : ((value.market as Array<any>).map(OrderValidityTypeToJSON)),
        'limit': value.limit === undefined ? undefined : ((value.limit as Array<any>).map(OrderValidityTypeToJSON)),
        'stopMarket': value.stopMarket === undefined ? undefined : ((value.stopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'stopLimit': value.stopLimit === undefined ? undefined : ((value.stopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopMarket': value.trailingStopMarket === undefined ? undefined : ((value.trailingStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopLimit': value.trailingStopLimit === undefined ? undefined : ((value.trailingStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopMarket': value.ocoStopMarket === undefined ? undefined : ((value.ocoStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopLimit': value.ocoStopLimit === undefined ? undefined : ((value.ocoStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
    };
}

export function OrderValidityTypeByOrderModelToJSON(value?: OrderValidityTypeByOrderModel | null): any {
    return OrderValidityTypeByOrderModelToJSONRecursive(value, false);
}
