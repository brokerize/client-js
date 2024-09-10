/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 * The version of the OpenAPI document: 0.0.1-preview
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import {
  CreateTradeDrafts200Response,
  CreateTradeDrafts200ResponseFromJSON,
  CreateTradeDrafts200ResponseToJSON,
  ErrorResponse,
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  GetActiveTradeDraftsResponse,
  GetActiveTradeDraftsResponseFromJSON,
  GetActiveTradeDraftsResponseToJSON,
  TradeDraftCreateParams,
  TradeDraftCreateParamsFromJSON,
  TradeDraftCreateParamsToJSON,
  TradeDraftUpdateParams,
  TradeDraftUpdateParamsFromJSON,
  TradeDraftUpdateParamsToJSON,
} from "../models";

export interface CreateTradeDraftsRequest {
  tradeDraftCreateParams: TradeDraftCreateParams;
}

export interface DeactivateTradeDraftRequest {
  id: string;
}

export interface DeleteTradeDraftRequest {
  id: string;
}

export interface GetTradeDraftsRequest {
  take?: number;
  skip?: number;
}

export interface UpdateTradeDraftRequest {
  id: string;
  tradeDraftUpdateParams: TradeDraftUpdateParams;
}

/**
 *
 */
export class TradeDraftApi extends runtime.BaseAPI {
  /**
   * Create a new trade draft
   */
  async createTradeDraftsRaw(
    requestParameters: CreateTradeDraftsRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<CreateTradeDrafts200Response>> {
    if (
      requestParameters.tradeDraftCreateParams === null ||
      requestParameters.tradeDraftCreateParams === undefined
    ) {
      throw new runtime.RequiredError(
        "tradeDraftCreateParams",
        "Required parameter requestParameters.tradeDraftCreateParams was null or undefined when calling createTradeDrafts."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-access-token"] =
        this.configuration.apiKey("x-access-token"); // idToken authentication
    }

    const response = await this.request(
      {
        path: `/tradeDrafts`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: TradeDraftCreateParamsToJSON(
          requestParameters.tradeDraftCreateParams
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CreateTradeDrafts200ResponseFromJSON(jsonValue)
    );
  }

  /**
   * Create a new trade draft
   */
  async createTradeDrafts(
    requestParameters: CreateTradeDraftsRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<CreateTradeDrafts200Response> {
    const response = await this.createTradeDraftsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Set a trade draft inactive, but NOT deleted. Inactive trade drafts will not be shown to the user anymore.
   */
  async deactivateTradeDraftRaw(
    requestParameters: DeactivateTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling deactivateTradeDraft."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-access-token"] =
        this.configuration.apiKey("x-access-token"); // idToken authentication
    }

    const response = await this.request(
      {
        path: `/tradeDrafts/{id}/deactivate`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Set a trade draft inactive, but NOT deleted. Inactive trade drafts will not be shown to the user anymore.
   */
  async deactivateTradeDraft(
    requestParameters: DeactivateTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<void> {
    await this.deactivateTradeDraftRaw(requestParameters, initOverrides);
  }

  /**
   * Delete an trade draft from the database
   */
  async deleteTradeDraftRaw(
    requestParameters: DeleteTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling deleteTradeDraft."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-access-token"] =
        this.configuration.apiKey("x-access-token"); // idToken authentication
    }

    const response = await this.request(
      {
        path: `/tradeDrafts/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete an trade draft from the database
   */
  async deleteTradeDraft(
    requestParameters: DeleteTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<void> {
    await this.deleteTradeDraftRaw(requestParameters, initOverrides);
  }

  /**
   * Returns active trade draft for a specific user in the specified pagination
   */
  async getTradeDraftsRaw(
    requestParameters: GetTradeDraftsRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GetActiveTradeDraftsResponse>> {
    const queryParameters: any = {};

    if (requestParameters.take !== undefined) {
      queryParameters["take"] = requestParameters.take;
    }

    if (requestParameters.skip !== undefined) {
      queryParameters["skip"] = requestParameters.skip;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-access-token"] =
        this.configuration.apiKey("x-access-token"); // idToken authentication
    }

    const response = await this.request(
      {
        path: `/tradeDrafts`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetActiveTradeDraftsResponseFromJSON(jsonValue)
    );
  }

  /**
   * Returns active trade draft for a specific user in the specified pagination
   */
  async getTradeDrafts(
    requestParameters: GetTradeDraftsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GetActiveTradeDraftsResponse> {
    const response = await this.getTradeDraftsRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Update a trade draft
   */
  async updateTradeDraftRaw(
    requestParameters: UpdateTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateTradeDraft."
      );
    }

    if (
      requestParameters.tradeDraftUpdateParams === null ||
      requestParameters.tradeDraftUpdateParams === undefined
    ) {
      throw new runtime.RequiredError(
        "tradeDraftUpdateParams",
        "Required parameter requestParameters.tradeDraftUpdateParams was null or undefined when calling updateTradeDraft."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-brkrz-client-id"] =
        this.configuration.apiKey("x-brkrz-client-id"); // clientId authentication
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["x-access-token"] =
        this.configuration.apiKey("x-access-token"); // idToken authentication
    }

    const response = await this.request(
      {
        path: `/tradeDrafts/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters.id))
        ),
        method: "PUT",
        headers: headerParameters,
        query: queryParameters,
        body: TradeDraftUpdateParamsToJSON(
          requestParameters.tradeDraftUpdateParams
        ),
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update a trade draft
   */
  async updateTradeDraft(
    requestParameters: UpdateTradeDraftRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<void> {
    await this.updateTradeDraftRaw(requestParameters, initOverrides);
  }
}
