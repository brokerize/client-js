/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-02-02T11:03:37.076Z\" }</pre>
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
     * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before creating a trade, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested.
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
     * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before creating a trade, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested.
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
