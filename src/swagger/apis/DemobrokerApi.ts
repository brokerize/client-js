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
    CreatedResponseBody,
    CreatedResponseBodyFromJSON,
    CreatedResponseBodyToJSON,
    DemoAccountsResponse,
    DemoAccountsResponseFromJSON,
    DemoAccountsResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OkResponseBody,
    OkResponseBodyFromJSON,
    OkResponseBodyToJSON,
} from '../models';

export interface DeleteDemoAccountRequest {
    accountId: string;
}

export interface TriggerDemoSessionSyncErrorRequest {
    sessionId: string;
}

/**
 * 
 */
export class DemobrokerApi extends runtime.BaseAPI {

    /**
     * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge with type text will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - with the password `7`, a challenge with type base64png will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy or stop loss order stays open forever (can be used for testing cancellation)   - cost estimations contain a `costDetailsLink` and a `costAcceptancePrompt`   - securityDetailedInfo is set, so a \"KID\" link should be displayed and linked to the corresponding table   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN LU0378438732 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN DE000MD96WE8 (a knock out with DAX as underlying)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN DE0005557508 (Deutsche Telekom)   - only quote orders on two different exchanges are supported   - the quotes do *NOT* have an expiration   - quote value is always `42`   - quote comes together with a costEstimation. Subsequent getCostEstimation calls are not allowed.   - `noExchangeDefault` is true, so that exchange must be selected by the user   - order will be canceled after 3 seconds - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error) - ISIN US29786A1060 (Etsy)   - the prepareTrade request takes 5 seconds   - create challenge takes 5 seconds. for authMethod photoTAN, the challenge will return with an error after that period of time   - only quote and market orders allowed   - at exchange \"Slow exchange\" it takes 7 seconds to get a quote as well as 7 seconds to retrieve order costs   - at exchange \"Exchange with quote and cost errors\" the quote request as well as cost estimation will end with an error after 3 seconds   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN XS2149280948 (bond from Bertelsmann)   - quote, limit and market orders (both buy and sell) are supported on on exchange   - limit orders are executed at exactly the limit price   - market orders are executed at a random quote between 90 and 150 percent   - for market orders, there is a legal message to confirm set (`legalMessagesToConfirmByOrderModel`) - ISIN US64110L1061 (Netflix Inc.)   - one exchange with only quote order   - creating the quote order will return an error (quote expired)  - ISIN US67066G1040 (NVIDIA)    - one exchange with only quote order, allowsQuoteModeLimit=true    - quote orders are executed immediately.      - if a quoteLimit is provided, execution happen at quoteLimit value      - otherwise, a random execution quote will be used - ISIN DE000BAY0017 (Bayer AG)   - one exchange with only market order   - `costEstimationIsNotAvailable` is true, so no cost estimations should be linked/shown   - orders will be canceled after 3 seconds - ISIN DE000PAH0038 (Porsche)   - one exchange with only market order   - all orders will be canceled   - `GetCostEstimation` contains (only) a link to a PDF document. This can be used to test whether linking to a PDF works.   - the instrument has both a `riskClassInfo.legalHint` as well as a `strikingHint`. Both should be visible in the order form. - ISIN DE0008404005 (Allianz)   - one exchange with all available orderModels   - orders are executed immediately - ISIN FR0000120321 (L\'Oréal)   - one exchange with all available orderModels   - orders stay open - ISIN US5949181045 (Microsoft)   - one exchange with all available orderModels   - if size is even, a partial execution with size 1 is executed, the remaining part stays open   - if size is odd, a partial execution with size 1 is executed, the remaining part is canceled - ISIN US2546871060 (Disney)   - one exchange with all available orderModels   - all orders are canceled after 3s   - `costEstimationMustBeShown` is false and `costEstimationIsOnlyDetailedTable` is true (frontends must only show a link to the cost estimation table) - ISIN XX1234567890 (example of an ISIN that can never be mapped by frontends)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007472060 (Wirecard)   - test instrument for `empty orderModelsBuy` / `onlySellAllowed`  - all other orders will be canceled after 3 seconds  Cost estimations for `buy` and `sell` return a different set of fields. This can be used to test proper UI behavior when fields are set or unavailable.  Behavior of `PortfolioQuotes` in the demo broker: - portfolios start with 100.000€ cash - each open buy order reserves 10€ cash from the availableCash - profit loss of the portfolio is the sum of the position\'s profit loss
     */
    async createDemoAccountRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<CreatedResponseBody>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/demo/accounts`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreatedResponseBodyFromJSON(jsonValue));
    }

    /**
     * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge with type text will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - with the password `7`, a challenge with type base64png will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy or stop loss order stays open forever (can be used for testing cancellation)   - cost estimations contain a `costDetailsLink` and a `costAcceptancePrompt`   - securityDetailedInfo is set, so a \"KID\" link should be displayed and linked to the corresponding table   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN LU0378438732 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN DE000MD96WE8 (a knock out with DAX as underlying)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN DE0005557508 (Deutsche Telekom)   - only quote orders on two different exchanges are supported   - the quotes do *NOT* have an expiration   - quote value is always `42`   - quote comes together with a costEstimation. Subsequent getCostEstimation calls are not allowed.   - `noExchangeDefault` is true, so that exchange must be selected by the user   - order will be canceled after 3 seconds - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error) - ISIN US29786A1060 (Etsy)   - the prepareTrade request takes 5 seconds   - create challenge takes 5 seconds. for authMethod photoTAN, the challenge will return with an error after that period of time   - only quote and market orders allowed   - at exchange \"Slow exchange\" it takes 7 seconds to get a quote as well as 7 seconds to retrieve order costs   - at exchange \"Exchange with quote and cost errors\" the quote request as well as cost estimation will end with an error after 3 seconds   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN XS2149280948 (bond from Bertelsmann)   - quote, limit and market orders (both buy and sell) are supported on on exchange   - limit orders are executed at exactly the limit price   - market orders are executed at a random quote between 90 and 150 percent   - for market orders, there is a legal message to confirm set (`legalMessagesToConfirmByOrderModel`) - ISIN US64110L1061 (Netflix Inc.)   - one exchange with only quote order   - creating the quote order will return an error (quote expired)  - ISIN US67066G1040 (NVIDIA)    - one exchange with only quote order, allowsQuoteModeLimit=true    - quote orders are executed immediately.      - if a quoteLimit is provided, execution happen at quoteLimit value      - otherwise, a random execution quote will be used - ISIN DE000BAY0017 (Bayer AG)   - one exchange with only market order   - `costEstimationIsNotAvailable` is true, so no cost estimations should be linked/shown   - orders will be canceled after 3 seconds - ISIN DE000PAH0038 (Porsche)   - one exchange with only market order   - all orders will be canceled   - `GetCostEstimation` contains (only) a link to a PDF document. This can be used to test whether linking to a PDF works.   - the instrument has both a `riskClassInfo.legalHint` as well as a `strikingHint`. Both should be visible in the order form. - ISIN DE0008404005 (Allianz)   - one exchange with all available orderModels   - orders are executed immediately - ISIN FR0000120321 (L\'Oréal)   - one exchange with all available orderModels   - orders stay open - ISIN US5949181045 (Microsoft)   - one exchange with all available orderModels   - if size is even, a partial execution with size 1 is executed, the remaining part stays open   - if size is odd, a partial execution with size 1 is executed, the remaining part is canceled - ISIN US2546871060 (Disney)   - one exchange with all available orderModels   - all orders are canceled after 3s   - `costEstimationMustBeShown` is false and `costEstimationIsOnlyDetailedTable` is true (frontends must only show a link to the cost estimation table) - ISIN XX1234567890 (example of an ISIN that can never be mapped by frontends)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007472060 (Wirecard)   - test instrument for `empty orderModelsBuy` / `onlySellAllowed`  - all other orders will be canceled after 3 seconds  Cost estimations for `buy` and `sell` return a different set of fields. This can be used to test proper UI behavior when fields are set or unavailable.  Behavior of `PortfolioQuotes` in the demo broker: - portfolios start with 100.000€ cash - each open buy order reserves 10€ cash from the availableCash - profit loss of the portfolio is the sum of the position\'s profit loss
     */
    async createDemoAccount(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<CreatedResponseBody> {
        const response = await this.createDemoAccountRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
     */
    async deleteDemoAccountRaw(requestParameters: DeleteDemoAccountRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OkResponseBody>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteDemoAccount.');
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
            path: `/demo/accounts/{accountId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OkResponseBodyFromJSON(jsonValue));
    }

    /**
     * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
     */
    async deleteDemoAccount(requestParameters: DeleteDemoAccountRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OkResponseBody> {
        const response = await this.deleteDemoAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
     */
    async getDemoAccountsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<DemoAccountsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-brkrz-client-id"] = this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/demo/accounts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DemoAccountsResponseFromJSON(jsonValue));
    }

    /**
     * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
     */
    async getDemoAccounts(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<DemoAccountsResponse> {
        const response = await this.getDemoAccountsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Only for demo broker portfolios: set a sync error for a session. This can be used for testing.
     */
    async triggerDemoSessionSyncErrorRaw(requestParameters: TriggerDemoSessionSyncErrorRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<OkResponseBody>> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling triggerDemoSessionSyncError.');
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
            path: `/sessions/{sessionId}/triggerSyncError`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OkResponseBodyFromJSON(jsonValue));
    }

    /**
     * Only for demo broker portfolios: set a sync error for a session. This can be used for testing.
     */
    async triggerDemoSessionSyncError(requestParameters: TriggerDemoSessionSyncErrorRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<OkResponseBody> {
        const response = await this.triggerDemoSessionSyncErrorRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
