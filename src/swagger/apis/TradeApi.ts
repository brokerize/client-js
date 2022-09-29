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


import * as runtime from '../runtime';
import {
    Challenge,
    ChallengeFromJSON,
    ChallengeToJSON,
    CreateOrderChallengeParams,
    CreateOrderChallengeParamsFromJSON,
    CreateOrderChallengeParamsToJSON,
    CreateOrderParams,
    CreateOrderParamsFromJSON,
    CreateOrderParamsToJSON,
    CreateTradeResponse,
    CreateTradeResponseFromJSON,
    CreateTradeResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GenericTable,
    GenericTableFromJSON,
    GenericTableToJSON,
    GetCostEstimationParams,
    GetCostEstimationParamsFromJSON,
    GetCostEstimationParamsToJSON,
    GetQuoteParams,
    GetQuoteParamsFromJSON,
    GetQuoteParamsToJSON,
    GetQuoteResponse,
    GetQuoteResponseFromJSON,
    GetQuoteResponseToJSON,
    OrderCostEstimation,
    OrderCostEstimationFromJSON,
    OrderCostEstimationToJSON,
    PrepareTradeResponse,
    PrepareTradeResponseFromJSON,
    PrepareTradeResponseToJSON,
} from '../models';

export interface CreateTradeRequest {
    createOrderParams: CreateOrderParams;
}

export interface CreateTradeChallengeRequest {
    createOrderChallengeParams: CreateOrderChallengeParams;
}

export interface GetCostEstimationRequest {
    getCostEstimationParams: GetCostEstimationParams;
}

export interface GetQuoteRequest {
    portfolioId: string;
    getQuoteParams: GetQuoteParams;
}

export interface GetSecurityDetailedInfoRequest {
    token: string;
}

export interface PrepareTradeRequest {
    isin: string;
    portfolioId: string;
}

/**
 * 
 */
export class TradeApi extends runtime.BaseAPI {

    /**
     * Create a trade.  It is possible that the broker rejects the order because of some extra hints that the user must accept (which can not be figured out in `prepareTrade`, e.g. because the order volume has to be determined first). In thise case, the `MUST_ACCEPT_HINT` error code is returned. The user can choose to accept that hint. If that is the case, the request can be retried with the `acceptHintId` parameter.
     */
    async createTradeRaw(requestParameters: CreateTradeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<CreateTradeResponse>> {
        if (requestParameters.createOrderParams === null || requestParameters.createOrderParams === undefined) {
            throw new runtime.RequiredError('createOrderParams','Required parameter requestParameters.createOrderParams was null or undefined when calling createTrade.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateOrderParamsToJSON(requestParameters.createOrderParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateTradeResponseFromJSON(jsonValue));
    }

    /**
     * Create a trade.  It is possible that the broker rejects the order because of some extra hints that the user must accept (which can not be figured out in `prepareTrade`, e.g. because the order volume has to be determined first). In thise case, the `MUST_ACCEPT_HINT` error code is returned. The user can choose to accept that hint. If that is the case, the request can be retried with the `acceptHintId` parameter.
     */
    async createTrade(requestParameters: CreateTradeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<CreateTradeResponse> {
        const response = await this.createTradeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a challenge
     */
    async createTradeChallengeRaw(requestParameters: CreateTradeChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Challenge>> {
        if (requestParameters.createOrderChallengeParams === null || requestParameters.createOrderChallengeParams === undefined) {
            throw new runtime.RequiredError('createOrderChallengeParams','Required parameter requestParameters.createOrderChallengeParams was null or undefined when calling createTradeChallenge.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/challenge`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateOrderChallengeParamsToJSON(requestParameters.createOrderChallengeParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChallengeFromJSON(jsonValue));
    }

    /**
     * Create a challenge
     */
    async createTradeChallenge(requestParameters: CreateTradeChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Challenge> {
        const response = await this.createTradeChallengeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getCostEstimationRaw(requestParameters: GetCostEstimationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OrderCostEstimation>> {
        if (requestParameters.getCostEstimationParams === null || requestParameters.getCostEstimationParams === undefined) {
            throw new runtime.RequiredError('getCostEstimationParams','Required parameter requestParameters.getCostEstimationParams was null or undefined when calling getCostEstimation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/costEstimation`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetCostEstimationParamsToJSON(requestParameters.getCostEstimationParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderCostEstimationFromJSON(jsonValue));
    }

    /**
     */
    async getCostEstimation(requestParameters: GetCostEstimationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OrderCostEstimation> {
        const response = await this.getCostEstimationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a quote to use with `orderModel=quote`. The actual quote trade is then performed using `createTradeChallenge` / `createTrade` as for other orderModels.
     */
    async getQuoteRaw(requestParameters: GetQuoteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetQuoteResponse>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling getQuote.');
        }

        if (requestParameters.getQuoteParams === null || requestParameters.getQuoteParams === undefined) {
            throw new runtime.RequiredError('getQuoteParams','Required parameter requestParameters.getQuoteParams was null or undefined when calling getQuote.');
        }

        const queryParameters: any = {};

        if (requestParameters.portfolioId !== undefined) {
            queryParameters['portfolioId'] = requestParameters.portfolioId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/quote`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GetQuoteParamsToJSON(requestParameters.getQuoteParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetQuoteResponseFromJSON(jsonValue));
    }

    /**
     * Get a quote to use with `orderModel=quote`. The actual quote trade is then performed using `createTradeChallenge` / `createTrade` as for other orderModels.
     */
    async getQuote(requestParameters: GetQuoteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetQuoteResponse> {
        const response = await this.getQuoteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getSecurityDetailedInfoRaw(requestParameters: GetSecurityDetailedInfoRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GenericTable>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling getSecurityDetailedInfo.');
        }

        const queryParameters: any = {};

        if (requestParameters.token !== undefined) {
            queryParameters['token'] = requestParameters.token;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/securityDetails`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GenericTableFromJSON(jsonValue));
    }

    /**
     */
    async getSecurityDetailedInfo(requestParameters: GetSecurityDetailedInfoRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GenericTable> {
        const response = await this.getSecurityDetailedInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Prepare a trade of `isin` in the given portfolio `portfolioId`. This describes what kind of orders are supported by the broker for the security. This requires the portfolio to have at least one active broker session.
     */
    async prepareTradeRaw(requestParameters: PrepareTradeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PrepareTradeResponse>> {
        if (requestParameters.isin === null || requestParameters.isin === undefined) {
            throw new runtime.RequiredError('isin','Required parameter requestParameters.isin was null or undefined when calling prepareTrade.');
        }

        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling prepareTrade.');
        }

        const queryParameters: any = {};

        if (requestParameters.isin !== undefined) {
            queryParameters['isin'] = requestParameters.isin;
        }

        if (requestParameters.portfolioId !== undefined) {
            queryParameters['portfolioId'] = requestParameters.portfolioId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/trade/prepare`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PrepareTradeResponseFromJSON(jsonValue));
    }

    /**
     * Prepare a trade of `isin` in the given portfolio `portfolioId`. This describes what kind of orders are supported by the broker for the security. This requires the portfolio to have at least one active broker session.
     */
    async prepareTrade(requestParameters: PrepareTradeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PrepareTradeResponse> {
        const response = await this.prepareTradeRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
