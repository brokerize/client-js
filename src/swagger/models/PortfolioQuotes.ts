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
    Amount,
    AmountFromJSON,
    AmountFromJSONTyped,
    AmountToJSON,
} from './Amount';

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
     * All-time relative P/L of the entire portfolio. 1 means +100%
     * @type {number}
     * @memberof PortfolioQuotes
     */
    profitLossRelAllTime?: number;
    /**
     * 
     * @type {Amount}
     * @memberof PortfolioQuotes
     */
    profitLossAbsAllTime?: Amount;
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
    positionValue: Amount;
}

export function PortfolioQuotesFromJSON(json: any): PortfolioQuotes {
    return PortfolioQuotesFromJSONTyped(json, false);
}

export function PortfolioQuotesFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortfolioQuotes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'profitLossAbsPrevClose': !exists(json, 'profitLossAbsPrevClose') ? undefined : AmountFromJSON(json['profitLossAbsPrevClose']),
        'profitLossRelPrevClose': !exists(json, 'profitLossRelPrevClose') ? undefined : json['profitLossRelPrevClose'],
        'profitLossAbs': !exists(json, 'profitLossAbs') ? undefined : AmountFromJSON(json['profitLossAbs']),
        'profitLossRel': !exists(json, 'profitLossRel') ? undefined : json['profitLossRel'],
        'profitLossRelAllTime': !exists(json, 'profitLossRelAllTime') ? undefined : json['profitLossRelAllTime'],
        'profitLossAbsAllTime': !exists(json, 'profitLossAbsAllTime') ? undefined : AmountFromJSON(json['profitLossAbsAllTime']),
        'totalValue': !exists(json, 'totalValue') ? undefined : AmountFromJSON(json['totalValue']),
        'cashAccountBalance': !exists(json, 'cashAccountBalance') ? undefined : AmountFromJSON(json['cashAccountBalance']),
        'availableCash': !exists(json, 'availableCash') ? undefined : AmountFromJSON(json['availableCash']),
        'positionValue': AmountFromJSON(json['positionValue']),
    };
}

export function PortfolioQuotesToJSON(value?: PortfolioQuotes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'profitLossAbsPrevClose': AmountToJSON(value.profitLossAbsPrevClose),
        'profitLossRelPrevClose': value.profitLossRelPrevClose,
        'profitLossAbs': AmountToJSON(value.profitLossAbs),
        'profitLossRel': value.profitLossRel,
        'profitLossRelAllTime': value.profitLossRelAllTime,
        'profitLossAbsAllTime': AmountToJSON(value.profitLossAbsAllTime),
        'totalValue': AmountToJSON(value.totalValue),
        'cashAccountBalance': AmountToJSON(value.cashAccountBalance),
        'availableCash': AmountToJSON(value.availableCash),
        'positionValue': AmountToJSON(value.positionValue),
    };
}

