/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.   # auth methods  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   |  # deviceId Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so *for that endpoint* an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example: ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```    API build data: <pre>{     \"buildTime\": \"2022-10-07T07:01:52.271Z\" }</pre>
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
    OrderValidity,
    OrderValidityFromJSON,
    OrderValidityFromJSONTyped,
    OrderValidityToJSON,
} from './OrderValidity';

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

export function DefaultOrderValidityByOrderModelFromJSON(json: any): DefaultOrderValidityByOrderModel {
    return DefaultOrderValidityByOrderModelFromJSONTyped(json, false);
}

export function DefaultOrderValidityByOrderModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): DefaultOrderValidityByOrderModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'quote': !exists(json, 'quote') ? undefined : OrderValidityFromJSON(json['quote']),
        'fraction': !exists(json, 'fraction') ? undefined : OrderValidityFromJSON(json['fraction']),
        'savingsPlan': !exists(json, 'savingsPlan') ? undefined : OrderValidityFromJSON(json['savingsPlan']),
        'market': !exists(json, 'market') ? undefined : OrderValidityFromJSON(json['market']),
        'limit': !exists(json, 'limit') ? undefined : OrderValidityFromJSON(json['limit']),
        'stopMarket': !exists(json, 'stopMarket') ? undefined : OrderValidityFromJSON(json['stopMarket']),
        'stopLimit': !exists(json, 'stopLimit') ? undefined : OrderValidityFromJSON(json['stopLimit']),
        'trailingStopMarket': !exists(json, 'trailingStopMarket') ? undefined : OrderValidityFromJSON(json['trailingStopMarket']),
        'trailingStopLimit': !exists(json, 'trailingStopLimit') ? undefined : OrderValidityFromJSON(json['trailingStopLimit']),
        'ocoStopMarket': !exists(json, 'ocoStopMarket') ? undefined : OrderValidityFromJSON(json['ocoStopMarket']),
        'ocoStopLimit': !exists(json, 'ocoStopLimit') ? undefined : OrderValidityFromJSON(json['ocoStopLimit']),
    };
}

export function DefaultOrderValidityByOrderModelToJSONRecursive(value?: DefaultOrderValidityByOrderModel | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'quote': OrderValidityToJSON(value.quote),
        'fraction': OrderValidityToJSON(value.fraction),
        'savingsPlan': OrderValidityToJSON(value.savingsPlan),
        'market': OrderValidityToJSON(value.market),
        'limit': OrderValidityToJSON(value.limit),
        'stopMarket': OrderValidityToJSON(value.stopMarket),
        'stopLimit': OrderValidityToJSON(value.stopLimit),
        'trailingStopMarket': OrderValidityToJSON(value.trailingStopMarket),
        'trailingStopLimit': OrderValidityToJSON(value.trailingStopLimit),
        'ocoStopMarket': OrderValidityToJSON(value.ocoStopMarket),
        'ocoStopLimit': OrderValidityToJSON(value.ocoStopLimit),
    };
}

export function DefaultOrderValidityByOrderModelToJSON(value?: DefaultOrderValidityByOrderModel | null): any {
    return DefaultOrderValidityByOrderModelToJSONRecursive(value, false);
}
