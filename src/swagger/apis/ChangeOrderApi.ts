/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-01-04T08:29:57.239Z\" }</pre>
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
    ChangeOrderChallengeParams,
    ChangeOrderChallengeParamsFromJSON,
    ChangeOrderChallengeParamsToJSON,
    ChangeOrderParams,
    ChangeOrderParamsFromJSON,
    ChangeOrderParamsToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    EstimateChangeOrderCostsParams,
    EstimateChangeOrderCostsParamsFromJSON,
    EstimateChangeOrderCostsParamsToJSON,
    OrderCostEstimation,
    OrderCostEstimationFromJSON,
    OrderCostEstimationToJSON,
} from '../models';

export interface ChangeOrderRequest {
    id: string;
    changeOrderParams: ChangeOrderParams;
}

export interface CreateChangeOrderChallengeRequest {
    id: string;
    changeOrderChallengeParams: ChangeOrderChallengeParams;
}

export interface GetChangeOrderCostEstimationRequest {
    id: string;
    estimateChangeOrderCostsParams: EstimateChangeOrderCostsParams;
}

/**
 * 
 */
export class ChangeOrderApi extends runtime.BaseAPI {

    /**
     * Perform an order change.
     */
    async changeOrderRaw(requestParameters: ChangeOrderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling changeOrder.');
        }

        if (requestParameters.changeOrderParams === null || requestParameters.changeOrderParams === undefined) {
            throw new runtime.RequiredError('changeOrderParams','Required parameter requestParameters.changeOrderParams was null or undefined when calling changeOrder.');
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
            path: `/order/{id}/change`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeOrderParamsToJSON(requestParameters.changeOrderParams),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Perform an order change.
     */
    async changeOrder(requestParameters: ChangeOrderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.changeOrderRaw(requestParameters, initOverrides);
    }

    /**
     * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before changing an order, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested and `ChangeOrder` is used right away.
     */
    async createChangeOrderChallengeRaw(requestParameters: CreateChangeOrderChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Challenge>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createChangeOrderChallenge.');
        }

        if (requestParameters.changeOrderChallengeParams === null || requestParameters.changeOrderChallengeParams === undefined) {
            throw new runtime.RequiredError('changeOrderChallengeParams','Required parameter requestParameters.changeOrderChallengeParams was null or undefined when calling createChangeOrderChallenge.');
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
            path: `/order/{id}/changeChallenge`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeOrderChallengeParamsToJSON(requestParameters.changeOrderChallengeParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChallengeFromJSON(jsonValue));
    }

    /**
     * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before changing an order, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested and `ChangeOrder` is used right away.
     */
    async createChangeOrderChallenge(requestParameters: CreateChangeOrderChallengeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Challenge> {
        const response = await this.createChangeOrderChallengeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get an order cost estimation for an order change.
     */
    async getChangeOrderCostEstimationRaw(requestParameters: GetChangeOrderCostEstimationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OrderCostEstimation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getChangeOrderCostEstimation.');
        }

        if (requestParameters.estimateChangeOrderCostsParams === null || requestParameters.estimateChangeOrderCostsParams === undefined) {
            throw new runtime.RequiredError('estimateChangeOrderCostsParams','Required parameter requestParameters.estimateChangeOrderCostsParams was null or undefined when calling getChangeOrderCostEstimation.');
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
            path: `/order/{id}/changeCostEstimation`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EstimateChangeOrderCostsParamsToJSON(requestParameters.estimateChangeOrderCostsParams),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderCostEstimationFromJSON(jsonValue));
    }

    /**
     * Get an order cost estimation for an order change.
     */
    async getChangeOrderCostEstimation(requestParameters: GetChangeOrderCostEstimationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OrderCostEstimation> {
        const response = await this.getChangeOrderCostEstimationRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
