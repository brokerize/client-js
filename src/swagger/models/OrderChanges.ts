/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.   # auth methods  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   |  # deviceId Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so *for that endpoint* an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example: ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```    API build data: <pre>{     \"buildTime\": \"2022-09-29T06:14:20.457Z\" }</pre>
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

export function OrderChangesFromJSON(json: any): OrderChanges {
    return OrderChangesFromJSONTyped(json, false);
}

export function OrderChangesFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderChanges {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limit': !exists(json, 'limit') ? undefined : json['limit'],
        'stopLimit': !exists(json, 'stopLimit') ? undefined : json['stopLimit'],
        'orderModel': OrderModelFromJSON(json['orderModel']),
        'validity': OrderValidityFromJSON(json['validity']),
        'size': json['size'],
        'stop': !exists(json, 'stop') ? undefined : json['stop'],
        'trailingDistance': !exists(json, 'trailingDistance') ? undefined : TrailingDistanceFromJSON(json['trailingDistance']),
    };
}

export function OrderChangesToJSONRecursive(value?: OrderChanges | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'limit': value.limit,
        'stopLimit': value.stopLimit,
        'orderModel': OrderModelToJSON(value.orderModel),
        'validity': OrderValidityToJSON(value.validity),
        'size': value.size,
        'stop': value.stop,
        'trailingDistance': TrailingDistanceToJSON(value.trailingDistance),
    };
}

export function OrderChangesToJSON(value?: OrderChanges | null): any {
    return OrderChangesToJSONRecursive(value, false);
}
