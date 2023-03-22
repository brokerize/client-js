/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-03-21T09:24:59.640Z\" }</pre>
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
    AddOAuthReturnToUrlRequest,
    AddOAuthReturnToUrlRequestFromJSON,
    AddOAuthReturnToUrlRequestToJSON,
    AddOriginRequest,
    AddOriginRequestFromJSON,
    AddOriginRequestToJSON,
    ClientsResponseInner,
    ClientsResponseInnerFromJSON,
    ClientsResponseInnerToJSON,
    CreateClient200Response,
    CreateClient200ResponseFromJSON,
    CreateClient200ResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    SetClientConfigRequest,
    SetClientConfigRequestFromJSON,
    SetClientConfigRequestToJSON,
} from '../models';

export interface AddOAuthReturnToUrlOperationRequest {
    clientId: string;
    addOAuthReturnToUrlRequest: AddOAuthReturnToUrlRequest;
}

export interface AddOriginOperationRequest {
    clientId: string;
    addOriginRequest: AddOriginRequest;
}

export interface DeleteClientRequest {
    clientId: string;
}

export interface GetOrderReportRequest {
    from: string;
    to: string;
    clientIds?: string;
}

export interface RemoveOAuthReturnToUrlRequest {
    clientId: string;
    addOAuthReturnToUrlRequest: AddOAuthReturnToUrlRequest;
}

export interface RemoveOriginRequest {
    clientId: string;
    addOriginRequest: AddOriginRequest;
}

export interface SetClientConfigOperationRequest {
    clientId: string;
    setClientConfigRequest: SetClientConfigRequest;
}

/**
 * 
 */
export class AdminApi extends runtime.BaseAPI {

    /**
     * Add an OAuth return to URL to the client config.
     */
    async addOAuthReturnToUrlRaw(requestParameters: AddOAuthReturnToUrlOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling addOAuthReturnToUrl.');
        }

        if (requestParameters.addOAuthReturnToUrlRequest === null || requestParameters.addOAuthReturnToUrlRequest === undefined) {
            throw new runtime.RequiredError('addOAuthReturnToUrlRequest','Required parameter requestParameters.addOAuthReturnToUrlRequest was null or undefined when calling addOAuthReturnToUrl.');
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
            path: `/admin/clients/{clientId}/oauthReturnTo`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddOAuthReturnToUrlRequestToJSON(requestParameters.addOAuthReturnToUrlRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add an OAuth return to URL to the client config.
     */
    async addOAuthReturnToUrl(requestParameters: AddOAuthReturnToUrlOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.addOAuthReturnToUrlRaw(requestParameters, initOverrides);
    }

    /**
     * Add an allowed CORS origin to the client config.
     */
    async addOriginRaw(requestParameters: AddOriginOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling addOrigin.');
        }

        if (requestParameters.addOriginRequest === null || requestParameters.addOriginRequest === undefined) {
            throw new runtime.RequiredError('addOriginRequest','Required parameter requestParameters.addOriginRequest was null or undefined when calling addOrigin.');
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
            path: `/admin/clients/{clientId}/origin`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddOriginRequestToJSON(requestParameters.addOriginRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add an allowed CORS origin to the client config.
     */
    async addOrigin(requestParameters: AddOriginOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.addOriginRaw(requestParameters, initOverrides);
    }

    /**
     * Create an API client.
     */
    async createClientRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<CreateClient200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/admin/client`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateClient200ResponseFromJSON(jsonValue));
    }

    /**
     * Create an API client.
     */
    async createClient(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<CreateClient200Response> {
        const response = await this.createClientRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete the given client permanently.
     */
    async deleteClientRaw(requestParameters: DeleteClientRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling deleteClient.');
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
            path: `/admin/client/{clientId}`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete the given client permanently.
     */
    async deleteClient(requestParameters: DeleteClientRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteClientRaw(requestParameters, initOverrides);
    }

    /**
     * List all clients that the current user may administrate.
     */
    async getMyClientsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<ClientsResponseInner>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/admin/clients`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ClientsResponseInnerFromJSON));
    }

    /**
     * List all clients that the current user may administrate.
     */
    async getMyClients(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<ClientsResponseInner>> {
        const response = await this.getMyClientsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get an order report for a client.
     */
    async getOrderReportRaw(requestParameters: GetOrderReportRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getOrderReport.');
        }

        if (requestParameters.to === null || requestParameters.to === undefined) {
            throw new runtime.RequiredError('to','Required parameter requestParameters.to was null or undefined when calling getOrderReport.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.clientIds !== undefined) {
            queryParameters['clientIds'] = requestParameters.clientIds;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/admin/orderReport`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Get an order report for a client.
     */
    async getOrderReport(requestParameters: GetOrderReportRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string> {
        const response = await this.getOrderReportRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove an OAuth return to URL from the client config.
     */
    async removeOAuthReturnToUrlRaw(requestParameters: RemoveOAuthReturnToUrlRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling removeOAuthReturnToUrl.');
        }

        if (requestParameters.addOAuthReturnToUrlRequest === null || requestParameters.addOAuthReturnToUrlRequest === undefined) {
            throw new runtime.RequiredError('addOAuthReturnToUrlRequest','Required parameter requestParameters.addOAuthReturnToUrlRequest was null or undefined when calling removeOAuthReturnToUrl.');
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
            path: `/admin/clients/{clientId}/oauthReturnTo`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: AddOAuthReturnToUrlRequestToJSON(requestParameters.addOAuthReturnToUrlRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove an OAuth return to URL from the client config.
     */
    async removeOAuthReturnToUrl(requestParameters: RemoveOAuthReturnToUrlRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.removeOAuthReturnToUrlRaw(requestParameters, initOverrides);
    }

    /**
     * Remove an allowed CORS origin from the client config.
     */
    async removeOriginRaw(requestParameters: RemoveOriginRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling removeOrigin.');
        }

        if (requestParameters.addOriginRequest === null || requestParameters.addOriginRequest === undefined) {
            throw new runtime.RequiredError('addOriginRequest','Required parameter requestParameters.addOriginRequest was null or undefined when calling removeOrigin.');
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
            path: `/admin/clients/{clientId}/origin`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: AddOriginRequestToJSON(requestParameters.addOriginRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove an allowed CORS origin from the client config.
     */
    async removeOrigin(requestParameters: RemoveOriginRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.removeOriginRaw(requestParameters, initOverrides);
    }

    /**
     * Replace the client configuration. Keys that are not provided will not be changed.
     */
    async setClientConfigRaw(requestParameters: SetClientConfigOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.clientId === null || requestParameters.clientId === undefined) {
            throw new runtime.RequiredError('clientId','Required parameter requestParameters.clientId was null or undefined when calling setClientConfig.');
        }

        if (requestParameters.setClientConfigRequest === null || requestParameters.setClientConfigRequest === undefined) {
            throw new runtime.RequiredError('setClientConfigRequest','Required parameter requestParameters.setClientConfigRequest was null or undefined when calling setClientConfig.');
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
            path: `/admin/clients/{clientId}/config`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters.clientId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SetClientConfigRequestToJSON(requestParameters.setClientConfigRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Replace the client configuration. Keys that are not provided will not be changed.
     */
    async setClientConfig(requestParameters: SetClientConfigOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.setClientConfigRaw(requestParameters, initOverrides);
    }

}
