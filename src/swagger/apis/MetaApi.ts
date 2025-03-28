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
  ErrorResponse,
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  ExchangesResponse,
  ExchangesResponseFromJSON,
  ExchangesResponseToJSON,
  GetBrokersResponse,
  GetBrokersResponseFromJSON,
  GetBrokersResponseToJSON,
  LegalTermsResponse,
  LegalTermsResponseFromJSON,
  LegalTermsResponseToJSON,
  PagesConfigurationResponse,
  PagesConfigurationResponseFromJSON,
  PagesConfigurationResponseToJSON,
} from "../models";

export interface GetPagesConfigurationRequest {
  clientId?: string;
  clientName?: string;
}

/**
 *
 */
export class MetaApi extends runtime.BaseAPI {
  /**
   * List all brokers that users can log in to. Describes *how* to login by specifying either a `loginForm` or some other means of login (e.g. the brokers\' OAuth process in the future). The `loginForm` field is only available for a small combination of brokers and clients and is not guaranteed to be present.
   */
  async getBrokersRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GetBrokersResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    const response = await this.request(
      {
        path: `/brokers`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetBrokersResponseFromJSON(jsonValue)
    );
  }

  /**
   * List all brokers that users can log in to. Describes *how* to login by specifying either a `loginForm` or some other means of login (e.g. the brokers\' OAuth process in the future). The `loginForm` field is only available for a small combination of brokers and clients and is not guaranteed to be present.
   */
  async getBrokers(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GetBrokersResponse> {
    const response = await this.getBrokersRaw(initOverrides);
    return await response.value();
  }

  /**
   * List all exchanges mapped in brokerize.  Brokers provide their own list of exchanges with any order preparation request, so there may be cases where a broker exchange is not mapped to this brokerize exchange list. This is totally valid: this list serves as a known subset of exchanges to facilitate switching between brokers or mapping to your own exchange database.
   */
  async getExchangesRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<ExchangesResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    const response = await this.request(
      {
        path: `/exchanges`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ExchangesResponseFromJSON(jsonValue)
    );
  }

  /**
   * List all exchanges mapped in brokerize.  Brokers provide their own list of exchanges with any order preparation request, so there may be cases where a broker exchange is not mapped to this brokerize exchange list. This is totally valid: this list serves as a known subset of exchanges to facilitate switching between brokers or mapping to your own exchange database.
   */
  async getExchanges(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<ExchangesResponse> {
    const response = await this.getExchangesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Get the legal terms that the user has to accept before logging in to any broker.
   */
  async getLegalTermsRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<LegalTermsResponse>> {
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
        path: `/legalTerms`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      LegalTermsResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get the legal terms that the user has to accept before logging in to any broker.
   */
  async getLegalTerms(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<LegalTermsResponse> {
    const response = await this.getLegalTermsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Get the matching brokerize pages configuration.  The endpoint will try to find a matching configuration in this order: - if parameter `clientId` is given: load the pages configuration for the given client id - if parameter `clientName` is given: load the pages configuration for the given client name - if neither parameter is provided, the requests `origin` will be used to find the configuration.
   */
  async getPagesConfigurationRaw(
    requestParameters: GetPagesConfigurationRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<PagesConfigurationResponse>> {
    const queryParameters: any = {};

    if (requestParameters.clientId !== undefined) {
      queryParameters["clientId"] = requestParameters.clientId;
    }

    if (requestParameters.clientName !== undefined) {
      queryParameters["clientName"] = requestParameters.clientName;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/pages`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PagesConfigurationResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get the matching brokerize pages configuration.  The endpoint will try to find a matching configuration in this order: - if parameter `clientId` is given: load the pages configuration for the given client id - if parameter `clientName` is given: load the pages configuration for the given client name - if neither parameter is provided, the requests `origin` will be used to find the configuration.
   */
  async getPagesConfiguration(
    requestParameters: GetPagesConfigurationRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<PagesConfigurationResponse> {
    const response = await this.getPagesConfigurationRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
