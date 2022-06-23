/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so *for that endpoint* an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   |  # request ids The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example: ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```
 *
 * The version of the OpenAPI document: 0.0.1-preview
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
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

export function CreatedResponseBodyFromJSON(json: any): CreatedResponseBody {
    return CreatedResponseBodyFromJSONTyped(json, false);
}

export function CreatedResponseBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreatedResponseBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
    };
}

export function CreatedResponseBodyToJSON(value?: CreatedResponseBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'id': value.id,
    };
}

