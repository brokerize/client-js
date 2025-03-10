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
  OrderIntentAvailability,
  OrderIntentAvailabilityFromJSON,
  OrderIntentAvailabilityToJSON,
  PrepareTradeResponse,
  PrepareTradeResponseFromJSON,
  PrepareTradeResponseToJSON,
} from "../models";

export interface CreateTradeRequest {
  createOrderParams: CreateOrderParams;
}

export interface CreateTradeChallengeRequest {
  createOrderChallengeParams: CreateOrderChallengeParams;
}

export interface GetAvailableOrderIntentsRequest {
  token: string;
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
  portfolioId: string;
  isin: string;
  usTicker?: string;
  cryptoCode?: string;
  cryptoPair?: string;
  brokerSecurityId?: string;
}

/**
 *
 */
export class TradeApi extends runtime.BaseAPI {
  /**
   * Create a trade.  It is possible that the broker rejects the order because of some extra hints that the user must accept (which can not be figured out in `prepareTrade`, e.g. because the order volume has to be determined first). In this case, the `MUST_ACCEPT_HINT` error code is returned. The user can choose to accept that hint. If that is the case, the request can be retried with the `acceptHintId` parameter.
   */
  async createTradeRaw(
    requestParameters: CreateTradeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<CreateTradeResponse>> {
    if (
      requestParameters.createOrderParams === null ||
      requestParameters.createOrderParams === undefined
    ) {
      throw new runtime.RequiredError(
        "createOrderParams",
        "Required parameter requestParameters.createOrderParams was null or undefined when calling createTrade."
      );
    }

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
        path: `/trade/create`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateOrderParamsToJSON(requestParameters.createOrderParams),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CreateTradeResponseFromJSON(jsonValue)
    );
  }

  /**
   * Create a trade.  It is possible that the broker rejects the order because of some extra hints that the user must accept (which can not be figured out in `prepareTrade`, e.g. because the order volume has to be determined first). In this case, the `MUST_ACCEPT_HINT` error code is returned. The user can choose to accept that hint. If that is the case, the request can be retried with the `acceptHintId` parameter.
   */
  async createTrade(
    requestParameters: CreateTradeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<CreateTradeResponse> {
    const response = await this.createTradeRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before creating a trade, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested.
   */
  async createTradeChallengeRaw(
    requestParameters: CreateTradeChallengeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<Challenge>> {
    if (
      requestParameters.createOrderChallengeParams === null ||
      requestParameters.createOrderChallengeParams === undefined
    ) {
      throw new runtime.RequiredError(
        "createOrderChallengeParams",
        "Required parameter requestParameters.createOrderChallengeParams was null or undefined when calling createTradeChallenge."
      );
    }

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
        path: `/trade/challenge`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateOrderChallengeParamsToJSON(
          requestParameters.createOrderChallengeParams
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ChallengeFromJSON(jsonValue)
    );
  }

  /**
   * If the user chose an auth method from `GetAuthInfo` with the flow `CHALLENGE_RESPONSE`, before creating a trade, a challenge must be requested first. If any other flow is used, a challenge *must not* be requested.
   */
  async createTradeChallenge(
    requestParameters: CreateTradeChallengeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<Challenge> {
    const response = await this.createTradeChallengeRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * If `PreparedTrade` contains an `availableOrderIntentsToken`, this endpoint can be used to update the available order intents.  It is recommended to poll this (e.g. at a rate of one request per 5s). In a future version updates will be provided over WebSockets.
   */
  async getAvailableOrderIntentsRaw(
    requestParameters: GetAvailableOrderIntentsRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<OrderIntentAvailability>> {
    if (
      requestParameters.token === null ||
      requestParameters.token === undefined
    ) {
      throw new runtime.RequiredError(
        "token",
        "Required parameter requestParameters.token was null or undefined when calling getAvailableOrderIntents."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.token !== undefined) {
      queryParameters["token"] = requestParameters.token;
    }

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
        path: `/trade/availableOrderIntents`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      OrderIntentAvailabilityFromJSON(jsonValue)
    );
  }

  /**
   * If `PreparedTrade` contains an `availableOrderIntentsToken`, this endpoint can be used to update the available order intents.  It is recommended to poll this (e.g. at a rate of one request per 5s). In a future version updates will be provided over WebSockets.
   */
  async getAvailableOrderIntents(
    requestParameters: GetAvailableOrderIntentsRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<OrderIntentAvailability> {
    const response = await this.getAvailableOrderIntentsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async getCostEstimationRaw(
    requestParameters: GetCostEstimationRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<OrderCostEstimation>> {
    if (
      requestParameters.getCostEstimationParams === null ||
      requestParameters.getCostEstimationParams === undefined
    ) {
      throw new runtime.RequiredError(
        "getCostEstimationParams",
        "Required parameter requestParameters.getCostEstimationParams was null or undefined when calling getCostEstimation."
      );
    }

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
        path: `/trade/costEstimation`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: GetCostEstimationParamsToJSON(
          requestParameters.getCostEstimationParams
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      OrderCostEstimationFromJSON(jsonValue)
    );
  }

  /**
   */
  async getCostEstimation(
    requestParameters: GetCostEstimationRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<OrderCostEstimation> {
    const response = await this.getCostEstimationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Get a quote to use with `orderModel=quote`. The actual quote trade is then performed using `createTradeChallenge` / `createTrade` as for other orderModels.
   */
  async getQuoteRaw(
    requestParameters: GetQuoteRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GetQuoteResponse>> {
    if (
      requestParameters.portfolioId === null ||
      requestParameters.portfolioId === undefined
    ) {
      throw new runtime.RequiredError(
        "portfolioId",
        "Required parameter requestParameters.portfolioId was null or undefined when calling getQuote."
      );
    }

    if (
      requestParameters.getQuoteParams === null ||
      requestParameters.getQuoteParams === undefined
    ) {
      throw new runtime.RequiredError(
        "getQuoteParams",
        "Required parameter requestParameters.getQuoteParams was null or undefined when calling getQuote."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.portfolioId !== undefined) {
      queryParameters["portfolioId"] = requestParameters.portfolioId;
    }

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
        path: `/trade/quote`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: GetQuoteParamsToJSON(requestParameters.getQuoteParams),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetQuoteResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get a quote to use with `orderModel=quote`. The actual quote trade is then performed using `createTradeChallenge` / `createTrade` as for other orderModels.
   */
  async getQuote(
    requestParameters: GetQuoteRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GetQuoteResponse> {
    const response = await this.getQuoteRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Loads more detailed information about a security specified by the given token. The token is extracted from the securityDetailedInfo object in the prepareTrade response
   */
  async getSecurityDetailedInfoRaw(
    requestParameters: GetSecurityDetailedInfoRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GenericTable>> {
    if (
      requestParameters.token === null ||
      requestParameters.token === undefined
    ) {
      throw new runtime.RequiredError(
        "token",
        "Required parameter requestParameters.token was null or undefined when calling getSecurityDetailedInfo."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.token !== undefined) {
      queryParameters["token"] = requestParameters.token;
    }

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
        path: `/trade/securityDetails`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GenericTableFromJSON(jsonValue)
    );
  }

  /**
   * Loads more detailed information about a security specified by the given token. The token is extracted from the securityDetailedInfo object in the prepareTrade response
   */
  async getSecurityDetailedInfo(
    requestParameters: GetSecurityDetailedInfoRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GenericTable> {
    const response = await this.getSecurityDetailedInfoRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Prepare a trade of the security in the given portfolio `portfolioId`. You can provide `isin`, `usTicker`, `cryptoCode`, `cryptoPair` to select a security. The actual broker implementation then automatically uses the appropriate identifier.  If you already have a `brokerSecurityId` for the given broker, you can also pass that.  Note that for backwards-compatibility reasons `isin` is required. However, if the isin is not applicable, an empty string can be passed.  The response describes what kind of orders are supported by the broker for the security.  It requires the portfolio to have at least one active broker session.
   */
  async prepareTradeRaw(
    requestParameters: PrepareTradeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<PrepareTradeResponse>> {
    if (
      requestParameters.portfolioId === null ||
      requestParameters.portfolioId === undefined
    ) {
      throw new runtime.RequiredError(
        "portfolioId",
        "Required parameter requestParameters.portfolioId was null or undefined when calling prepareTrade."
      );
    }

    if (
      requestParameters.isin === null ||
      requestParameters.isin === undefined
    ) {
      throw new runtime.RequiredError(
        "isin",
        "Required parameter requestParameters.isin was null or undefined when calling prepareTrade."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.portfolioId !== undefined) {
      queryParameters["portfolioId"] = requestParameters.portfolioId;
    }

    if (requestParameters.isin !== undefined) {
      queryParameters["isin"] = requestParameters.isin;
    }

    if (requestParameters.usTicker !== undefined) {
      queryParameters["usTicker"] = requestParameters.usTicker;
    }

    if (requestParameters.cryptoCode !== undefined) {
      queryParameters["cryptoCode"] = requestParameters.cryptoCode;
    }

    if (requestParameters.cryptoPair !== undefined) {
      queryParameters["cryptoPair"] = requestParameters.cryptoPair;
    }

    if (requestParameters.brokerSecurityId !== undefined) {
      queryParameters["brokerSecurityId"] = requestParameters.brokerSecurityId;
    }

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
        path: `/trade/prepare`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PrepareTradeResponseFromJSON(jsonValue)
    );
  }

  /**
   * Prepare a trade of the security in the given portfolio `portfolioId`. You can provide `isin`, `usTicker`, `cryptoCode`, `cryptoPair` to select a security. The actual broker implementation then automatically uses the appropriate identifier.  If you already have a `brokerSecurityId` for the given broker, you can also pass that.  Note that for backwards-compatibility reasons `isin` is required. However, if the isin is not applicable, an empty string can be passed.  The response describes what kind of orders are supported by the broker for the security.  It requires the portfolio to have at least one active broker session.
   */
  async prepareTrade(
    requestParameters: PrepareTradeRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<PrepareTradeResponse> {
    const response = await this.prepareTradeRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
