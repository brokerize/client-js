/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior. The rate limits will be refined in the future.  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   |    API build data: <pre>{     \"buildTime\": \"2022-06-13T13:22:54.404Z\" }</pre>
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

export function OrderValidityTypeByOrderModelToJSON(value?: OrderValidityTypeByOrderModel | null): any {
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

