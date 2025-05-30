/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import {
  CreatedResponseBody,
  CreatedResponseBodyFromJSON,
  CreatedResponseBodyToJSON,
  DemoAccountSettings,
  DemoAccountSettingsFromJSON,
  DemoAccountSettingsToJSON,
  DemoAccountsResponse,
  DemoAccountsResponseFromJSON,
  DemoAccountsResponseToJSON,
  ErrorResponse,
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  OkResponseBody,
  OkResponseBodyFromJSON,
  OkResponseBodyToJSON,
} from "../models";

export interface CreateDemoAccountRequest {
  demoAccountSettings?: DemoAccountSettings;
}

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
   * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios by default. If the setting `isSinglePortfolio` is set, only one portfolio is created.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge with type text will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - with the password `7`, a challenge with type base64png will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy or stop loss order stays open forever (can be used for testing cancellation)   - cost estimations contain a `costDetailsLink` and a `costAcceptancePrompt`   - securityDetailedInfo is set, so a \"KID\" link should be displayed and linked to the corresponding table   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN LU0378438732 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN LU2611732046 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - two exchanges are available (\"xetra\" and \"quoteExchange\")   - xetra allows market and limit orders for buying and has defaultValidityByOrderModel set to GFD for market and GTD 2030-01-01 for limit   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN DE000MD96WE8 (a knock out with DAX as underlying)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN DE000DTR0CK8 (Daimler Truck Holding)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN DE0005557508 (Deutsche Telekom)   - only quote orders on two different exchanges are supported   - the quotes do *NOT* have an expiration   - quote value is always `42`   - quote comes together with a costEstimation. Subsequent getCostEstimation calls are not allowed.   - `noExchangeDefault` is true, so that exchange must be selected by the user   - order will be canceled after 3 seconds - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error)   - default validity is set to `GTD` with a date of `2030-01-01` - ISIN US29786A1060 (Etsy)   - the prepareTrade request takes 5 seconds   - create challenge takes 5 seconds. for authMethod photoTAN, the challenge will return with an error after that period of time   - only quote and market orders allowed   - at exchange \"Slow exchange\" it takes 7 seconds to get a quote as well as 7 seconds to retrieve order costs   - at exchange \"Exchange with quote and cost errors\" the quote request as well as cost estimation will end with an error after 3 seconds   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN XS2149280948 (bond from Bertelsmann)   - quote, limit and market orders (both buy and sell) are supported on one exchange   - limit orders are executed at exactly the limit price   - market orders are executed at a random quote between 90 and 150 percent   - for market orders, there is a legal message to confirm set (`legalMessagesToConfirmByOrderModel`) - ISIN US64110L1061 (Netflix Inc.)   - one exchange with only quote order   - creating the quote order will return an error (quote expired)  - ISIN US67066G1040 (NVIDIA)    - one exchange with only quote order, allowsQuoteModeLimit=true    - quote orders are executed immediately.      - if a quoteLimit is provided, execution happen at quoteLimit value      - otherwise, a random execution quote will be used - ISIN DE000BAY0017 (Bayer AG)   - one exchange with only market order   - `costEstimationIsNotAvailable` is true, so no cost estimations should be linked/shown   - orders will be canceled after 3 seconds - ISIN DE000PAH0038 (Porsche)   - one exchange with only market order   - all orders will be canceled   - `GetCostEstimation` contains (only) a link to a PDF document. This can be used to test whether linking to a PDF works.   - the instrument has both a `riskClassInfo.legalHint` as well as a `strikingHint`. Both should be visible in the order form. - ISIN DE0008404005 (Allianz) and some other hidden ISINs (can be requested from brokerize support)   - one exchange with all available orderModels   - orders are executed immediately   - limit orders are executed at exactly the provided limit price - ISIN DE0008430026 (Munich Re)   - one exchange (L&S) with all available orderModels   - orders are executed immediately - ISIN FR0000120321 (L\'Oréal)   - one exchange with all available orderModels   - the exchange has a `securityQuotesToken` set   - orders stay open   - changesHaveCostEstimations is `true` for orders with this ISIN - ISIN US5949181045 (Microsoft)   - one exchange with all available orderModels   - if size is even, a partial execution with size 1 is executed, the remaining part stays open   - if size is odd, a partial execution with size 1 is executed, the remaining part is canceled - ISIN US30303M1027 (Meta)   - one exchange with all available orderModels   - for each piece of the order size, there will be one execution with size 1 (so e.g. 10 executions for size 10)   - sizes > 30 are not accepted - ISIN US2546871060 (Disney)   - one exchange with all available orderModels   - all orders are canceled after 3s   - `costEstimationMustBeShown` is false and `costEstimationIsOnlyDetailedTable` is true (frontends must only show a link to the cost estimation table) - ISIN XX1234567890 (example of an ISIN that can never be mapped by frontends)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007100000 (Mercedes-Benz)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007472060 (Wirecard)   - test instrument for `empty orderModelsBuy` / `onlySellAllowed` - ISIN BTC (Bitcoin/Euro)   - has one exchange with support for quote, market and limit orders   - orders will be executed right away (with the exception of limit orders with the limit 42. Those stay open!)   - can be used to test frontend mapping of cryptos   - when you prepare a trade in the *second* portfolio (which has two cash accounts), `sizeUnitsByCashAccountId` will be set, so that the frontend can let the user select a combination of `cashAccount` and `sizeUnit`.   - positions of BTC/EUR will always have sizeDecimals=8 - ISIN DE0006231004 (Infineon Technologies AG)   - one exchange with `orderModelsSell=[\'market\']` and `orderModelsBuy=[]` - ISIN DE0005552004 (Deutsche Post AG)   - one exchange with `orderModelsSell=[]` and `orderModelsBuy=[\'market\']`   - market buy orders are executed immediately   - positions of DE0005552004 will always have sizeDecimals=undefined - ISIN US8740541094 (Take Two)   - three exchanges are available. all have `market` and `limit` available   - configuration for `takeProfitStopLoss` is different for the three exchanges. This can be used to test the implementation of takeProfit/stopLoss creation.     - exchange_with_exclusive_tp_sl: `takeProfitStopLoss.exclusive` is `true`, so that only one of the two can be set. Also, both fields are limited to market buy orders     - exchange_with_unlimited_tp_sl: `takeProfitStopLoss.exclusive` is `false`, so that both tp and sl may be set, for both sell and buy orders and both support orderModels     - exchange_without_tp_sl: `takeProfitStopLoss` is not set, so that no tp/sl can be set   - orders stay open forever   - the order size can be changed (`allowsChangeSize=true`) - ISIN US5529531015 (MGM Resorts International)   - one exchange with market and limit orders   - orders are executed immediately   - short selling is allowed, so `availableOrderIntents` as well as `availableOrderIntentsToken` is set. \"sell to open\" and \"buy to close\" can be tested here. - ISIN XAU (Gold)   - only quote trading is allowed   - depending on the selected portfolio, it is possible to select a cash account (e.g. EUR or USD) to trade with   - users can chose between specifying the order size in the cash currency or in grams   - quotes have the `totalAmount` field set - `CryptoPair` ADA-USD (Cardano - US Dollar)   - `quote`, `market`, `limit` order models are available   - One of the created demobroker portfolios does not have an USD cash account. For this portfolio an error will appear upon opening the order form   - users can chose between specifying the order size in the cash currency (USD) or in ADA   - validity types for limit orders are [`IOC`, `GTDT`]. With `GTDT` the user can specify a date AND time at which his order should be executed   - the size input decimal places are limited per sizeUnit. For USD it\'s 2 and for ADA it is 4 decimal places   - the orders will be executed after 10 seconds - all other orders will be canceled after 3 seconds  When orders are created using a `decoupled` method, the order id is only returned if the order size is greater than `5`. This can be used to test if the order receipt is skipped correctly in UIs.  Cost estimations for `buy` and `sell` return a different set of fields. This can be used to test proper UI behavior when fields are set or unavailable.  Behavior of `PortfolioQuotes` in the demo broker: - portfolio 1 starts with 100.000€ cash. portfolio 2 has two cash accounts, one starts with 100.000€, one with 100.000$. - when cash account values are summed up, we just assume an exchange rate of 1:1 - each open buy order reserves 10€ cash from the availableCash - profit loss of the portfolio is the sum of the position\'s profit loss - if a EUR cashAccount has the value 0,00€, its `hideInOverviews` property is set to true. This can be used to test the frontend\'s behavior when a cash account is hidden.
   */
  async createDemoAccountRaw(
    requestParameters: CreateDemoAccountRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<CreatedResponseBody>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("idToken", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/demo/accounts`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: DemoAccountSettingsToJSON(requestParameters.demoAccountSettings),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CreatedResponseBodyFromJSON(jsonValue)
    );
  }

  /**
   * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios by default. If the setting `isSinglePortfolio` is set, only one portfolio is created.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge with type text will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - with the password `7`, a challenge with type base64png will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy or stop loss order stays open forever (can be used for testing cancellation)   - cost estimations contain a `costDetailsLink` and a `costAcceptancePrompt`   - securityDetailedInfo is set, so a \"KID\" link should be displayed and linked to the corresponding table   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN LU0378438732 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN LU2611732046 (a DAX ETF)   - preparedTrade has `costEstimationIsOnlyDetailedTable` set to true, so that deviating order form behaviors can be tested   - two exchanges are available (\"xetra\" and \"quoteExchange\")   - xetra allows market and limit orders for buying and has defaultValidityByOrderModel set to GFD for market and GTD 2030-01-01 for limit   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN DE000MD96WE8 (a knock out with DAX as underlying)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN DE000DTR0CK8 (Daimler Truck Holding)   - prepareTrade is rejected with a message that the user may not trade risky derivatives. - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN DE0005557508 (Deutsche Telekom)   - only quote orders on two different exchanges are supported   - the quotes do *NOT* have an expiration   - quote value is always `42`   - quote comes together with a costEstimation. Subsequent getCostEstimation calls are not allowed.   - `noExchangeDefault` is true, so that exchange must be selected by the user   - order will be canceled after 3 seconds - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error)   - default validity is set to `GTD` with a date of `2030-01-01` - ISIN US29786A1060 (Etsy)   - the prepareTrade request takes 5 seconds   - create challenge takes 5 seconds. for authMethod photoTAN, the challenge will return with an error after that period of time   - only quote and market orders allowed   - at exchange \"Slow exchange\" it takes 7 seconds to get a quote as well as 7 seconds to retrieve order costs   - at exchange \"Exchange with quote and cost errors\" the quote request as well as cost estimation will end with an error after 3 seconds   - the preparedTrade\'s `costEstimationMustBeShown` is true, so that the correct behavior (users cannot skip cost estimation in that case) can be tested. - ISIN XS2149280948 (bond from Bertelsmann)   - quote, limit and market orders (both buy and sell) are supported on one exchange   - limit orders are executed at exactly the limit price   - market orders are executed at a random quote between 90 and 150 percent   - for market orders, there is a legal message to confirm set (`legalMessagesToConfirmByOrderModel`) - ISIN US64110L1061 (Netflix Inc.)   - one exchange with only quote order   - creating the quote order will return an error (quote expired)  - ISIN US67066G1040 (NVIDIA)    - one exchange with only quote order, allowsQuoteModeLimit=true    - quote orders are executed immediately.      - if a quoteLimit is provided, execution happen at quoteLimit value      - otherwise, a random execution quote will be used - ISIN DE000BAY0017 (Bayer AG)   - one exchange with only market order   - `costEstimationIsNotAvailable` is true, so no cost estimations should be linked/shown   - orders will be canceled after 3 seconds - ISIN DE000PAH0038 (Porsche)   - one exchange with only market order   - all orders will be canceled   - `GetCostEstimation` contains (only) a link to a PDF document. This can be used to test whether linking to a PDF works.   - the instrument has both a `riskClassInfo.legalHint` as well as a `strikingHint`. Both should be visible in the order form. - ISIN DE0008404005 (Allianz) and some other hidden ISINs (can be requested from brokerize support)   - one exchange with all available orderModels   - orders are executed immediately   - limit orders are executed at exactly the provided limit price - ISIN DE0008430026 (Munich Re)   - one exchange (L&S) with all available orderModels   - orders are executed immediately - ISIN FR0000120321 (L\'Oréal)   - one exchange with all available orderModels   - the exchange has a `securityQuotesToken` set   - orders stay open   - changesHaveCostEstimations is `true` for orders with this ISIN - ISIN US5949181045 (Microsoft)   - one exchange with all available orderModels   - if size is even, a partial execution with size 1 is executed, the remaining part stays open   - if size is odd, a partial execution with size 1 is executed, the remaining part is canceled - ISIN US30303M1027 (Meta)   - one exchange with all available orderModels   - for each piece of the order size, there will be one execution with size 1 (so e.g. 10 executions for size 10)   - sizes > 30 are not accepted - ISIN US2546871060 (Disney)   - one exchange with all available orderModels   - all orders are canceled after 3s   - `costEstimationMustBeShown` is false and `costEstimationIsOnlyDetailedTable` is true (frontends must only show a link to the cost estimation table) - ISIN XX1234567890 (example of an ISIN that can never be mapped by frontends)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007100000 (Mercedes-Benz)   - one exchange with all available orderModels   - the instrument has two sellPositions to choose from (\"Sell Position A\" and \"Sell Position B\"). If no correct sell position is provided, trades will be rejected.   - orders are executed immediately - ISIN DE0007472060 (Wirecard)   - test instrument for `empty orderModelsBuy` / `onlySellAllowed` - ISIN BTC (Bitcoin/Euro)   - has one exchange with support for quote, market and limit orders   - orders will be executed right away (with the exception of limit orders with the limit 42. Those stay open!)   - can be used to test frontend mapping of cryptos   - when you prepare a trade in the *second* portfolio (which has two cash accounts), `sizeUnitsByCashAccountId` will be set, so that the frontend can let the user select a combination of `cashAccount` and `sizeUnit`.   - positions of BTC/EUR will always have sizeDecimals=8 - ISIN DE0006231004 (Infineon Technologies AG)   - one exchange with `orderModelsSell=[\'market\']` and `orderModelsBuy=[]` - ISIN DE0005552004 (Deutsche Post AG)   - one exchange with `orderModelsSell=[]` and `orderModelsBuy=[\'market\']`   - market buy orders are executed immediately   - positions of DE0005552004 will always have sizeDecimals=undefined - ISIN US8740541094 (Take Two)   - three exchanges are available. all have `market` and `limit` available   - configuration for `takeProfitStopLoss` is different for the three exchanges. This can be used to test the implementation of takeProfit/stopLoss creation.     - exchange_with_exclusive_tp_sl: `takeProfitStopLoss.exclusive` is `true`, so that only one of the two can be set. Also, both fields are limited to market buy orders     - exchange_with_unlimited_tp_sl: `takeProfitStopLoss.exclusive` is `false`, so that both tp and sl may be set, for both sell and buy orders and both support orderModels     - exchange_without_tp_sl: `takeProfitStopLoss` is not set, so that no tp/sl can be set   - orders stay open forever   - the order size can be changed (`allowsChangeSize=true`) - ISIN US5529531015 (MGM Resorts International)   - one exchange with market and limit orders   - orders are executed immediately   - short selling is allowed, so `availableOrderIntents` as well as `availableOrderIntentsToken` is set. \"sell to open\" and \"buy to close\" can be tested here. - ISIN XAU (Gold)   - only quote trading is allowed   - depending on the selected portfolio, it is possible to select a cash account (e.g. EUR or USD) to trade with   - users can chose between specifying the order size in the cash currency or in grams   - quotes have the `totalAmount` field set - `CryptoPair` ADA-USD (Cardano - US Dollar)   - `quote`, `market`, `limit` order models are available   - One of the created demobroker portfolios does not have an USD cash account. For this portfolio an error will appear upon opening the order form   - users can chose between specifying the order size in the cash currency (USD) or in ADA   - validity types for limit orders are [`IOC`, `GTDT`]. With `GTDT` the user can specify a date AND time at which his order should be executed   - the size input decimal places are limited per sizeUnit. For USD it\'s 2 and for ADA it is 4 decimal places   - the orders will be executed after 10 seconds - all other orders will be canceled after 3 seconds  When orders are created using a `decoupled` method, the order id is only returned if the order size is greater than `5`. This can be used to test if the order receipt is skipped correctly in UIs.  Cost estimations for `buy` and `sell` return a different set of fields. This can be used to test proper UI behavior when fields are set or unavailable.  Behavior of `PortfolioQuotes` in the demo broker: - portfolio 1 starts with 100.000€ cash. portfolio 2 has two cash accounts, one starts with 100.000€, one with 100.000$. - when cash account values are summed up, we just assume an exchange rate of 1:1 - each open buy order reserves 10€ cash from the availableCash - profit loss of the portfolio is the sum of the position\'s profit loss - if a EUR cashAccount has the value 0,00€, its `hideInOverviews` property is set to true. This can be used to test the frontend\'s behavior when a cash account is hidden.
   */
  async createDemoAccount(
    requestParameters: CreateDemoAccountRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<CreatedResponseBody> {
    const response = await this.createDemoAccountRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
   */
  async deleteDemoAccountRaw(
    requestParameters: DeleteDemoAccountRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<OkResponseBody>> {
    if (
      requestParameters.accountId === null ||
      requestParameters.accountId === undefined
    ) {
      throw new runtime.RequiredError(
        "accountId",
        "Required parameter requestParameters.accountId was null or undefined when calling deleteDemoAccount."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("idToken", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/demo/accounts/{accountId}`.replace(
          `{${"accountId"}}`,
          encodeURIComponent(String(requestParameters.accountId))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      OkResponseBodyFromJSON(jsonValue)
    );
  }

  /**
   * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
   */
  async deleteDemoAccount(
    requestParameters: DeleteDemoAccountRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<OkResponseBody> {
    const response = await this.deleteDemoAccountRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
   */
  async getDemoAccountsRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<DemoAccountsResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("idToken", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/demo/accounts`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      DemoAccountsResponseFromJSON(jsonValue)
    );
  }

  /**
   * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
   */
  async getDemoAccounts(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<DemoAccountsResponse> {
    const response = await this.getDemoAccountsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Only for demo broker portfolios: set a sync error for a session. This can be used for testing.
   */
  async triggerDemoSessionSyncErrorRaw(
    requestParameters: TriggerDemoSessionSyncErrorRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<OkResponseBody>> {
    if (
      requestParameters.sessionId === null ||
      requestParameters.sessionId === undefined
    ) {
      throw new runtime.RequiredError(
        "sessionId",
        "Required parameter requestParameters.sessionId was null or undefined when calling triggerDemoSessionSyncError."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("idToken", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/sessions/{sessionId}/triggerSyncError`.replace(
          `{${"sessionId"}}`,
          encodeURIComponent(String(requestParameters.sessionId))
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      OkResponseBodyFromJSON(jsonValue)
    );
  }

  /**
   * Only for demo broker portfolios: set a sync error for a session. This can be used for testing.
   */
  async triggerDemoSessionSyncError(
    requestParameters: TriggerDemoSessionSyncErrorRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<OkResponseBody> {
    const response = await this.triggerDemoSessionSyncErrorRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
