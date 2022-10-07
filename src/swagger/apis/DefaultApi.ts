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


import * as runtime from '../runtime';
import {
    Challenge,
    ChallengeFromJSON,
    ChallengeToJSON,
    CreateGuestUserResponse,
    CreateGuestUserResponseFromJSON,
    CreateGuestUserResponseToJSON,
    CreateTanChallengeParams,
    CreateTanChallengeParamsFromJSON,
    CreateTanChallengeParamsToJSON,
    DecoupledOperationStatus,
    DecoupledOperationStatusFromJSON,
    DecoupledOperationStatusToJSON,
    EnableSessionTanParams,
    EnableSessionTanParamsFromJSON,
    EnableSessionTanParamsToJSON,
    EnableSessionTanResponse,
    EnableSessionTanResponseFromJSON,
    EnableSessionTanResponseToJSON,
    EndSessionTanResponse,
    EndSessionTanResponseFromJSON,
    EndSessionTanResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    GetAuthInfoResponse,
    GetAuthInfoResponseFromJSON,
    GetAuthInfoResponseToJSON,
    GetOrderResponse,
    GetOrderResponseFromJSON,
    GetOrderResponseToJSON,
    GetPortfolioOrdersResponse,
    GetPortfolioOrdersResponseFromJSON,
    GetPortfolioOrdersResponseToJSON,
    GetPortfolioPositionsResponse,
    GetPortfolioPositionsResponseFromJSON,
    GetPortfolioPositionsResponseToJSON,
    GetPortfolioQuotesResponse,
    GetPortfolioQuotesResponseFromJSON,
    GetPortfolioQuotesResponseToJSON,
    GetUserResponse,
    GetUserResponseFromJSON,
    GetUserResponseToJSON,
    OkResponseBody,
    OkResponseBodyFromJSON,
    OkResponseBodyToJSON,
    PortfoliosResponse,
    PortfoliosResponseFromJSON,
    PortfoliosResponseToJSON,
    SessionResponse,
    SessionResponseFromJSON,
    SessionResponseToJSON,
} from '../models';

export interface CancelDecoupledOperationRequest {
    sessionId: string;
    decoupledOperationId: string;
}

export interface CreateSessionTanChallengeRequest {
    sessionId: string;
    createTanChallengeParams: CreateTanChallengeParams;
}

export interface DeletePortfolioRequest {
    portfolioId: string;
}

export interface EnableSessionTanRequest {
    sessionId: string;
    enableSessionTanParams: EnableSessionTanParams;
}

export interface EndSessionTanRequest {
    sessionId: string;
}

export interface GetAuthInfoRequest {
    portfolioId: string;
}

export interface GetDecoupledOperationStatusRequest {
    sessionId: string;
    decoupledOperationId: string;
}

export interface GetOrderRequest {
    id: string;
}

export interface GetPortfolioOrdersRequest {
    portfolioId: string;
    take?: number;
    skip?: number;
    isin?: string;
    statuses?: string;
    orderBy?: string;
}

export interface GetPortfolioPositionsRequest {
    portfolioId: string;
}

export interface GetPortfolioQuotesRequest {
    portfolioId: string;
}

export interface LogoutSessionRequest {
    sessionId: string;
}

export interface TriggerSessionSyncRequest {
    sessionId: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async cancelDecoupledOperationRaw(requestParameters: CancelDecoupledOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling cancelDecoupledOperation.');
        }

        if (requestParameters.decoupledOperationId === null || requestParameters.decoupledOperationId === undefined) {
            throw new runtime.RequiredError('decoupledOperationId','Required parameter requestParameters.decoupledOperationId was null or undefined when calling cancelDecoupledOperation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions/{sessionId}/decoupledOperation/{decoupledOperationId}`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))).replace(`{${"decoupledOperationId"}}`, encodeURIComponent(String(requestParameters.decoupledOperationId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async cancelDecoupledOperation(requestParameters: CancelDecoupledOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.cancelDecoupledOperationRaw(requestParameters, initOverrides);
    }

    /**
     * Create a guest user and return an JWT token which can be used to access resources. The user as well as the token have a lifetime of 24 hours.
     */
    async createGuestUserRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<CreateGuestUserResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        const response = await this.request({
            path: `/user/guest`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateGuestUserResponseFromJSON(jsonValue));
    }

    /**
     * Create a guest user and return an JWT token which can be used to access resources. The user as well as the token have a lifetime of 24 hours.
     */
    async createGuestUser(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<CreateGuestUserResponse> {
        const response = await this.createGuestUserRaw(initOverrides);
        return await response.value();
    }

    /**
     * For enabling session TAN with a `CHALLENGE_RESPONSE` flow, the challenge must be requested first.
     */
    async createSessionTanChallengeRaw(requestParameters: CreateSessionTanChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Challenge>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling createSessionTanChallenge.');
        }

        if (requestParameters.createTanChallengeParams === null || requestParameters.createTanChallengeParams === undefined) {
            throw new runtime.RequiredError('createTanChallengeParams','Required parameter requestParameters.createTanChallengeParams was null or undefined when calling createSessionTanChallenge.');
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
            path: `/sessions/{sessionId}/sessiontanchallenge`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTanChallengeParamsToJSON(requestParameters.createTanChallengeParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChallengeFromJSON(jsonValue));
    }

    /**
     * For enabling session TAN with a `CHALLENGE_RESPONSE` flow, the challenge must be requested first.
     */
    async createSessionTanChallenge(requestParameters: CreateSessionTanChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Challenge> {
        const response = await this.createSessionTanChallengeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deletePortfolioRaw(requestParameters: DeletePortfolioRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OkResponseBody>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling deletePortfolio.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios/{portfolioId}`.replace(`{${"portfolioId"}}`, encodeURIComponent(String(requestParameters.portfolioId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OkResponseBodyFromJSON(jsonValue));
    }

    /**
     */
    async deletePortfolio(requestParameters: DeletePortfolioRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OkResponseBody> {
        const response = await this.deletePortfolioRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async enableSessionTanRaw(requestParameters: EnableSessionTanRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<EnableSessionTanResponse>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling enableSessionTan.');
        }

        if (requestParameters.enableSessionTanParams === null || requestParameters.enableSessionTanParams === undefined) {
            throw new runtime.RequiredError('enableSessionTanParams','Required parameter requestParameters.enableSessionTanParams was null or undefined when calling enableSessionTan.');
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
            path: `/sessions/{sessionId}/sessiontan`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EnableSessionTanParamsToJSON(requestParameters.enableSessionTanParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EnableSessionTanResponseFromJSON(jsonValue));
    }

    /**
     */
    async enableSessionTan(requestParameters: EnableSessionTanRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<EnableSessionTanResponse> {
        const response = await this.enableSessionTanRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * End Session TAN for the given broker session.  If applicable, the broker may return a message with a confirmation code which can be looked up in the initial activation SMS. If message is present in the response, it should be displayed to the user.
     */
    async endSessionTanRaw(requestParameters: EndSessionTanRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<EndSessionTanResponse>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling endSessionTan.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions/{sessionId}/sessiontan`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EndSessionTanResponseFromJSON(jsonValue));
    }

    /**
     * End Session TAN for the given broker session.  If applicable, the broker may return a message with a confirmation code which can be looked up in the initial activation SMS. If message is present in the response, it should be displayed to the user.
     */
    async endSessionTan(requestParameters: EndSessionTanRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<EndSessionTanResponse> {
        const response = await this.endSessionTanRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the AuthInfo for the given portfolio.  If the portfolio does not have an online session, this will return a 400 status code.  The `AuthInfo` is used to figure out how operations (enable session tan, create trade, cancel order, change order) can be authorized for the portfolio. - If `sessionTanActive` is `true`: Session TAN has been enabled for the session that currently backs the portfolio. In this case, all operations like `CreateTrade` can be executed right away without an `authMethod`. The UI should *not* show a dropdown with the auth methods in this case. - If `sessionTanActive` is `false` but `sessionTanSupported` is `true`: the user can enable session TAN using `CreateSessionTanChallenge` / `EnableSessionTan`. - If `allOperationsRequireSessionTan` is `true`, the auth methods can *ONLY* be used for enabling session TAN. - Otherwise, the `authMethods` can be used to perform individual operations.  | sessionTanActive | sessionTanSupported | allOperationsRequireSessionTan | Description                                                                                                                                                                                                                                                 | | ---------------- | ------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `true`           | `true`              | -                              | Session TAN has been enabled for the session that currently backs the portfolio. In this case, all operations like `CreateTrade`, `ChangeOrder`, `CancelOrder` can be executed right away without an `authMethod`. The UI should _not_ show adropdown with the auth methods in this case. | | `false`          | `true`              | `true`                         | the user can enable session TAN using the provided auth methods via `CreateSessionTanChallenge` / `EnableSessionTan`. All other operations can only take place after session TAN has been enabled.                                                          | | `false`          | `true`              | `false`                        | the user can enable any operation (enable session tan, create trade, cancel order, change order) using the provided auth methods                                                                                                                            |  The list of available AuthMethods should only be presented to the user if session TAN is not active (yet). The list and names are defined by our partner brokers. Auth Methods are categorized using the `flow` attribute:  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app). Note that currently `DECOUPLED` auth methods only work for enabling session TAN.   |
     */
    async getAuthInfoRaw(requestParameters: GetAuthInfoRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetAuthInfoResponse>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling getAuthInfo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios/{portfolioId}/authinfo`.replace(`{${"portfolioId"}}`, encodeURIComponent(String(requestParameters.portfolioId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAuthInfoResponseFromJSON(jsonValue));
    }

    /**
     * Get the AuthInfo for the given portfolio.  If the portfolio does not have an online session, this will return a 400 status code.  The `AuthInfo` is used to figure out how operations (enable session tan, create trade, cancel order, change order) can be authorized for the portfolio. - If `sessionTanActive` is `true`: Session TAN has been enabled for the session that currently backs the portfolio. In this case, all operations like `CreateTrade` can be executed right away without an `authMethod`. The UI should *not* show a dropdown with the auth methods in this case. - If `sessionTanActive` is `false` but `sessionTanSupported` is `true`: the user can enable session TAN using `CreateSessionTanChallenge` / `EnableSessionTan`. - If `allOperationsRequireSessionTan` is `true`, the auth methods can *ONLY* be used for enabling session TAN. - Otherwise, the `authMethods` can be used to perform individual operations.  | sessionTanActive | sessionTanSupported | allOperationsRequireSessionTan | Description                                                                                                                                                                                                                                                 | | ---------------- | ------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `true`           | `true`              | -                              | Session TAN has been enabled for the session that currently backs the portfolio. In this case, all operations like `CreateTrade`, `ChangeOrder`, `CancelOrder` can be executed right away without an `authMethod`. The UI should _not_ show adropdown with the auth methods in this case. | | `false`          | `true`              | `true`                         | the user can enable session TAN using the provided auth methods via `CreateSessionTanChallenge` / `EnableSessionTan`. All other operations can only take place after session TAN has been enabled.                                                          | | `false`          | `true`              | `false`                        | the user can enable any operation (enable session tan, create trade, cancel order, change order) using the provided auth methods                                                                                                                            |  The list of available AuthMethods should only be presented to the user if session TAN is not active (yet). The list and names are defined by our partner brokers. Auth Methods are categorized using the `flow` attribute:  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app). Note that currently `DECOUPLED` auth methods only work for enabling session TAN.   |
     */
    async getAuthInfo(requestParameters: GetAuthInfoRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetAuthInfoResponse> {
        const response = await this.getAuthInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getDecoupledOperationStatusRaw(requestParameters: GetDecoupledOperationStatusRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<DecoupledOperationStatus>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling getDecoupledOperationStatus.');
        }

        if (requestParameters.decoupledOperationId === null || requestParameters.decoupledOperationId === undefined) {
            throw new runtime.RequiredError('decoupledOperationId','Required parameter requestParameters.decoupledOperationId was null or undefined when calling getDecoupledOperationStatus.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions/{sessionId}/decoupledOperation/{decoupledOperationId}`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))).replace(`{${"decoupledOperationId"}}`, encodeURIComponent(String(requestParameters.decoupledOperationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DecoupledOperationStatusFromJSON(jsonValue));
    }

    /**
     */
    async getDecoupledOperationStatus(requestParameters: GetDecoupledOperationStatusRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<DecoupledOperationStatus> {
        const response = await this.getDecoupledOperationStatusRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getOrderRaw(requestParameters: GetOrderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetOrderResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOrder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/order/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetOrderResponseFromJSON(jsonValue));
    }

    /**
     */
    async getOrder(requestParameters: GetOrderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetOrderResponse> {
        const response = await this.getOrderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPortfolioOrdersRaw(requestParameters: GetPortfolioOrdersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetPortfolioOrdersResponse>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling getPortfolioOrders.');
        }

        const queryParameters: any = {};

        if (requestParameters.take !== undefined) {
            queryParameters['take'] = requestParameters.take;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        if (requestParameters.isin !== undefined) {
            queryParameters['isin'] = requestParameters.isin;
        }

        if (requestParameters.statuses !== undefined) {
            queryParameters['statuses'] = requestParameters.statuses;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['orderBy'] = requestParameters.orderBy;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios/{portfolioId}/orders`.replace(`{${"portfolioId"}}`, encodeURIComponent(String(requestParameters.portfolioId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetPortfolioOrdersResponseFromJSON(jsonValue));
    }

    /**
     */
    async getPortfolioOrders(requestParameters: GetPortfolioOrdersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetPortfolioOrdersResponse> {
        const response = await this.getPortfolioOrdersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPortfolioPositionsRaw(requestParameters: GetPortfolioPositionsRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetPortfolioPositionsResponse>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling getPortfolioPositions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios/{portfolioId}/positions`.replace(`{${"portfolioId"}}`, encodeURIComponent(String(requestParameters.portfolioId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetPortfolioPositionsResponseFromJSON(jsonValue));
    }

    /**
     */
    async getPortfolioPositions(requestParameters: GetPortfolioPositionsRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetPortfolioPositionsResponse> {
        const response = await this.getPortfolioPositionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPortfolioQuotesRaw(requestParameters: GetPortfolioQuotesRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetPortfolioQuotesResponse>> {
        if (requestParameters.portfolioId === null || requestParameters.portfolioId === undefined) {
            throw new runtime.RequiredError('portfolioId','Required parameter requestParameters.portfolioId was null or undefined when calling getPortfolioQuotes.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios/{portfolioId}/quotes`.replace(`{${"portfolioId"}}`, encodeURIComponent(String(requestParameters.portfolioId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetPortfolioQuotesResponseFromJSON(jsonValue));
    }

    /**
     */
    async getPortfolioQuotes(requestParameters: GetPortfolioQuotesRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetPortfolioQuotesResponse> {
        const response = await this.getPortfolioQuotesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPortfoliosRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PortfoliosResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/portfolios`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PortfoliosResponseFromJSON(jsonValue));
    }

    /**
     */
    async getPortfolios(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PortfoliosResponse> {
        const response = await this.getPortfoliosRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get the currently active broker sessions of the user\'s account.
     */
    async getSessionsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<SessionResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SessionResponseFromJSON(jsonValue));
    }

    /**
     * Get the currently active broker sessions of the user\'s account.
     */
    async getSessions(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<SessionResponse> {
        const response = await this.getSessionsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Checks the provided authentication and returns the logged-in user.
     */
    async getUserRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetUserResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUserResponseFromJSON(jsonValue));
    }

    /**
     * Checks the provided authentication and returns the logged-in user.
     */
    async getUser(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetUserResponse> {
        const response = await this.getUserRaw(initOverrides);
        return await response.value();
    }

    /**
     * Log out from the given broker session.
     */
    async logoutSessionRaw(requestParameters: LogoutSessionRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OkResponseBody>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling logoutSession.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions/{sessionId}`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OkResponseBodyFromJSON(jsonValue));
    }

    /**
     * Log out from the given broker session.
     */
    async logoutSession(requestParameters: LogoutSessionRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OkResponseBody> {
        const response = await this.logoutSessionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Trigger a background sync process for the given broker session. This means that a sync will be scheduled as soon as possible. All data related to the portfolio (e.g. positions and orders) will be loaded into the brokerize database.
     */
    async triggerSessionSyncRaw(requestParameters: TriggerSessionSyncRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OkResponseBody>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling triggerSessionSync.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/sessions/{sessionId}/sync`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OkResponseBodyFromJSON(jsonValue));
    }

    /**
     * Trigger a background sync process for the given broker session. This means that a sync will be scheduled as soon as possible. All data related to the portfolio (e.g. positions and orders) will be loaded into the brokerize database.
     */
    async triggerSessionSync(requestParameters: TriggerSessionSyncRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OkResponseBody> {
        const response = await this.triggerSessionSyncRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Most operations at brokerize have asynchronous effects.  For example, consider the flow of an order: when the user creates an order, it will not immediately appear in order list endpoints, because usually brokers take a few seconds until they are retrievable in those lists. Also, after a while, the order may be executed or cancelled asynchronously by the stock exchange.  A common solution for frontends would be to reload the order list regularly. However data is then either delayed or there will be many more requests than needed.  The brokerize websocket endpoint allows getting updates via web sockets. Generally speaking, clients can subscribe by assigning a subscription id and will then receive updates on that subscription.  In this documentation, ⬆️ denotes messages from the client to the server, whereas messages from server to client are marked with ⬇️.  ## authentication When using cookies for authorization, the WebSocket connection is authenticated with the HTTP upgrade request.  If token headers are used, the *first* message from client to server must be:  ``` ⬆️ {     \"cmd\": \"authorize\",     \"idToken\": <string> } ```  In all cases, clients must wait for the welcome message before sending other messages:   ``` ⬇️ { \"cmd\": \"authenticated\" } ```  ## ping After 1 minute of inactivity of a client, the WebSocket connection will be considered stale and will automatically terminated. To prevent this, a ping message can be sent:  ```  ⬆️ {\"cmd\": \"ping\"} ```  The server also sends this message regularly. If no message has been received on a WebSocket connection for more than 1 minute, it should be terminated by the client.  ```  ⬇️ {\"cmd\": \"ping\"} ```  ## subscriptions Subscriptions can be used to get invalidate events or updates for selected resources.   ### invalidate subscriptions Invalidation events can be used for the frontend to know when reload requests via the HTTP endpoints are appropriate. Currently only invalidate events can be subscribed, the actual data must then be reloaded using the HTTP endpoints.  To set up a subscription for an invalidate event, use:  ``` ⬆️ {     \"cmd\": \"subscribe\",     \"type\": \"invalidate\",     \"subscriptionId\": 1,     \"entity: \"brokersessions\" /_* \"positions\" | \"orders\" *_/,     \"portfolioId\": 42 /_* required for \"positions\" or \"orders\" *_/ } ```  If the subscription failed to be set up on the server, an error will be sent for the subscription. This also automatically ends the subscription on the server side:  ``` ⬇️ {     \"subscriptionId\": 1,     \"error\": {         \"message\": \"Could not set up invalidation event due to...\"     } } ```  If an invalid `subscriptionId` is provided (or the subscription id is already in use by the connection), an error like this will be sent: ``` ⬇️ {     \"error\": {         \"message\": \"Could not add subscription due to invalid subscriptionId\"     } } ``` ⚠️ *the connection will then be terminated immediately*.  If the subscription is sucessfuly set up, whenever an invalidation happens, the server will send a message like this:  ``` ⬇️ {     \"cmd\": \"invalidate\",     \"subscriptionId\": 1 } ```  When that invalidation event is received, the client should reload the data using the corresponding endpoints.  Clients can end their subscription with the `unsubscribe` command:  ``` ⬆️ {     \"cmd\": \"unsubscribe\",     \"subscriptionId\": 1 } ```  ### subscribe to the state of a decoupled operation For decoupled operations (e.g. authorizing a session TAN using a second factor device), the state of the operation can be subscribed:  ``` ⬆️ {     \"cmd\": \"subscribe\",     \"type\": \"decoupledOperationStatus\",     \"subscriptionId\": 1,     \"sessionId\": string,     \"decoupledOperationId\": string    } ```  Error handling as well as unsubscribing works as described for invalidate subscriptions. Example message from the server for updating the state:  ``` ⬇️ {     \"cmd\": \"updateDecoupledOperationStatus\",     \"subscriptionId\": number,     \"state\": <DecoupledOperationStatus> } ``` 
     */
    async websocketRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/websocket`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Most operations at brokerize have asynchronous effects.  For example, consider the flow of an order: when the user creates an order, it will not immediately appear in order list endpoints, because usually brokers take a few seconds until they are retrievable in those lists. Also, after a while, the order may be executed or cancelled asynchronously by the stock exchange.  A common solution for frontends would be to reload the order list regularly. However data is then either delayed or there will be many more requests than needed.  The brokerize websocket endpoint allows getting updates via web sockets. Generally speaking, clients can subscribe by assigning a subscription id and will then receive updates on that subscription.  In this documentation, ⬆️ denotes messages from the client to the server, whereas messages from server to client are marked with ⬇️.  ## authentication When using cookies for authorization, the WebSocket connection is authenticated with the HTTP upgrade request.  If token headers are used, the *first* message from client to server must be:  ``` ⬆️ {     \"cmd\": \"authorize\",     \"idToken\": <string> } ```  In all cases, clients must wait for the welcome message before sending other messages:   ``` ⬇️ { \"cmd\": \"authenticated\" } ```  ## ping After 1 minute of inactivity of a client, the WebSocket connection will be considered stale and will automatically terminated. To prevent this, a ping message can be sent:  ```  ⬆️ {\"cmd\": \"ping\"} ```  The server also sends this message regularly. If no message has been received on a WebSocket connection for more than 1 minute, it should be terminated by the client.  ```  ⬇️ {\"cmd\": \"ping\"} ```  ## subscriptions Subscriptions can be used to get invalidate events or updates for selected resources.   ### invalidate subscriptions Invalidation events can be used for the frontend to know when reload requests via the HTTP endpoints are appropriate. Currently only invalidate events can be subscribed, the actual data must then be reloaded using the HTTP endpoints.  To set up a subscription for an invalidate event, use:  ``` ⬆️ {     \"cmd\": \"subscribe\",     \"type\": \"invalidate\",     \"subscriptionId\": 1,     \"entity: \"brokersessions\" /_* \"positions\" | \"orders\" *_/,     \"portfolioId\": 42 /_* required for \"positions\" or \"orders\" *_/ } ```  If the subscription failed to be set up on the server, an error will be sent for the subscription. This also automatically ends the subscription on the server side:  ``` ⬇️ {     \"subscriptionId\": 1,     \"error\": {         \"message\": \"Could not set up invalidation event due to...\"     } } ```  If an invalid `subscriptionId` is provided (or the subscription id is already in use by the connection), an error like this will be sent: ``` ⬇️ {     \"error\": {         \"message\": \"Could not add subscription due to invalid subscriptionId\"     } } ``` ⚠️ *the connection will then be terminated immediately*.  If the subscription is sucessfuly set up, whenever an invalidation happens, the server will send a message like this:  ``` ⬇️ {     \"cmd\": \"invalidate\",     \"subscriptionId\": 1 } ```  When that invalidation event is received, the client should reload the data using the corresponding endpoints.  Clients can end their subscription with the `unsubscribe` command:  ``` ⬆️ {     \"cmd\": \"unsubscribe\",     \"subscriptionId\": 1 } ```  ### subscribe to the state of a decoupled operation For decoupled operations (e.g. authorizing a session TAN using a second factor device), the state of the operation can be subscribed:  ``` ⬆️ {     \"cmd\": \"subscribe\",     \"type\": \"decoupledOperationStatus\",     \"subscriptionId\": 1,     \"sessionId\": string,     \"decoupledOperationId\": string    } ```  Error handling as well as unsubscribing works as described for invalidate subscriptions. Example message from the server for updating the state:  ``` ⬇️ {     \"cmd\": \"updateDecoupledOperationStatus\",     \"subscriptionId\": number,     \"state\": <DecoupledOperationStatus> } ``` 
     */
    async websocket(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.websocketRaw(initOverrides);
    }

}
