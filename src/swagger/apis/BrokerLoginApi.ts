/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.   # auth methods  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   |  # deviceId Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so *for that endpoint* an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example: ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```    API build data: <pre>{     \"buildTime\": \"2022-10-27T16:02:36.525Z\" }</pre>
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
    AddSessionCompleteChallengeParams,
    AddSessionCompleteChallengeParamsFromJSON,
    AddSessionCompleteChallengeParamsToJSON,
    AddSessionParams,
    AddSessionParamsFromJSON,
    AddSessionParamsToJSON,
    ConfirmOAuthParams,
    ConfirmOAuthParamsFromJSON,
    ConfirmOAuthParamsToJSON,
    ConfirmOAuthResponse,
    ConfirmOAuthResponseFromJSON,
    ConfirmOAuthResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    LoginResponse,
    LoginResponseFromJSON,
    LoginResponseToJSON,
    LoginResponseReady,
    LoginResponseReadyFromJSON,
    LoginResponseReadyToJSON,
    PrepareOAuthRedirectParams,
    PrepareOAuthRedirectParamsFromJSON,
    PrepareOAuthRedirectParamsToJSON,
    PrepareOAuthRedirectResponse,
    PrepareOAuthRedirectResponseFromJSON,
    PrepareOAuthRedirectResponseToJSON,
} from '../models';

export interface AddSessionRequest {
    addSessionParams: AddSessionParams;
}

export interface AddSessionCompleteChallengeRequest {
    addSessionCompleteChallengeParams: AddSessionCompleteChallengeParams;
}

export interface ConfirmOAuthRequest {
    confirmOAuthParams: ConfirmOAuthParams;
}

export interface PrepareOAuthRedirectRequest {
    prepareOAuthRedirectParams: PrepareOAuthRedirectParams;
}

/**
 * 
 */
export class BrokerLoginApi extends runtime.BaseAPI {

    /**
     */
    async addSessionRaw(requestParameters: AddSessionRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<LoginResponse>> {
        if (requestParameters.addSessionParams === null || requestParameters.addSessionParams === undefined) {
            throw new runtime.RequiredError('addSessionParams','Required parameter requestParameters.addSessionParams was null or undefined when calling addSession.');
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
            path: `/sessions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddSessionParamsToJSON(requestParameters.addSessionParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseFromJSON(jsonValue));
    }

    /**
     */
    async addSession(requestParameters: AddSessionRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<LoginResponse> {
        const response = await this.addSessionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * If login returns the state `challenge`, the login must be completed by providing a challenge response first.
     */
    async addSessionCompleteChallengeRaw(requestParameters: AddSessionCompleteChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<LoginResponseReady>> {
        if (requestParameters.addSessionCompleteChallengeParams === null || requestParameters.addSessionCompleteChallengeParams === undefined) {
            throw new runtime.RequiredError('addSessionCompleteChallengeParams','Required parameter requestParameters.addSessionCompleteChallengeParams was null or undefined when calling addSessionCompleteChallenge.');
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
            path: `/sessions/completeLogin`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddSessionCompleteChallengeParamsToJSON(requestParameters.addSessionCompleteChallengeParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseReadyFromJSON(jsonValue));
    }

    /**
     * If login returns the state `challenge`, the login must be completed by providing a challenge response first.
     */
    async addSessionCompleteChallenge(requestParameters: AddSessionCompleteChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<LoginResponseReady> {
        const response = await this.addSessionCompleteChallengeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * For brokers with OAuth login processes, this adds the session to the user\'s account after redirects happen. Only the user that is redirected from the broker login in the browser will receive the `code`. This step ensures that the logged-in user at brokerize is actually the one that has gone through the broker OAuth steps.
     */
    async confirmOAuthRaw(requestParameters: ConfirmOAuthRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<ConfirmOAuthResponse>> {
        if (requestParameters.confirmOAuthParams === null || requestParameters.confirmOAuthParams === undefined) {
            throw new runtime.RequiredError('confirmOAuthParams','Required parameter requestParameters.confirmOAuthParams was null or undefined when calling confirmOAuth.');
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
            path: `/sessions/confirmOAuth`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ConfirmOAuthParamsToJSON(requestParameters.confirmOAuthParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfirmOAuthResponseFromJSON(jsonValue));
    }

    /**
     * For brokers with OAuth login processes, this adds the session to the user\'s account after redirects happen. Only the user that is redirected from the broker login in the browser will receive the `code`. This step ensures that the logged-in user at brokerize is actually the one that has gone through the broker OAuth steps.
     */
    async confirmOAuth(requestParameters: ConfirmOAuthRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<ConfirmOAuthResponse> {
        const response = await this.confirmOAuthRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * For brokers with `isOAuth`, sessions can not be created using `AddSession`. This is how a session can be added for an OAuth-based login process:  1. use `prepareOAuthRedirect` to obtain a URL to redirect to. You can provide a `returnTo` URL which will be redirect to later. Note that a list of allowed URLs has to be configured for the client. 2. redirect the user\'s browser to the `redirectTo` URL 3. after the user has logged in at the broker\'s interface, a redirect to `returnTo` with the URL query parameters `verifysession=1`, `code` and `ticketId` will happen 4. the `returnTo` page must call `confirmOAuth` with the given `ticketId` and `code` to finally add the session to the user\'s account
     */
    async prepareOAuthRedirectRaw(requestParameters: PrepareOAuthRedirectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PrepareOAuthRedirectResponse>> {
        if (requestParameters.prepareOAuthRedirectParams === null || requestParameters.prepareOAuthRedirectParams === undefined) {
            throw new runtime.RequiredError('prepareOAuthRedirectParams','Required parameter requestParameters.prepareOAuthRedirectParams was null or undefined when calling prepareOAuthRedirect.');
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
            path: `/sessions/prepareOAuthRedirect`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PrepareOAuthRedirectParamsToJSON(requestParameters.prepareOAuthRedirectParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PrepareOAuthRedirectResponseFromJSON(jsonValue));
    }

    /**
     * For brokers with `isOAuth`, sessions can not be created using `AddSession`. This is how a session can be added for an OAuth-based login process:  1. use `prepareOAuthRedirect` to obtain a URL to redirect to. You can provide a `returnTo` URL which will be redirect to later. Note that a list of allowed URLs has to be configured for the client. 2. redirect the user\'s browser to the `redirectTo` URL 3. after the user has logged in at the broker\'s interface, a redirect to `returnTo` with the URL query parameters `verifysession=1`, `code` and `ticketId` will happen 4. the `returnTo` page must call `confirmOAuth` with the given `ticketId` and `code` to finally add the session to the user\'s account
     */
    async prepareOAuthRedirect(requestParameters: PrepareOAuthRedirectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PrepareOAuthRedirectResponse> {
        const response = await this.prepareOAuthRedirectRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
