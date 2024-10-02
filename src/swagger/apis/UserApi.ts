/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 * The version of the OpenAPI document: 1.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import {
  AccessTokenResult,
  AccessTokenResultFromJSON,
  AccessTokenResultToJSON,
  CreateAccessTokenParams,
  CreateAccessTokenParamsFromJSON,
  CreateAccessTokenParamsToJSON,
  ErrorResponse,
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  GetAccessTokensResponse,
  GetAccessTokensResponseFromJSON,
  GetAccessTokensResponseToJSON,
  GetAcessTokenAvailablePermissions200Response,
  GetAcessTokenAvailablePermissions200ResponseFromJSON,
  GetAcessTokenAvailablePermissions200ResponseToJSON,
} from "../models";

export interface CreateAccessTokenRequest {
  createAccessTokenParams: CreateAccessTokenParams;
}

export interface RevokeAccessTokenRequest {
  accessTokenId: string;
}

/**
 *
 */
export class UserApi extends runtime.BaseAPI {
  /**
   * Create a token for the current user. The token can be used to access resources on behalf of the user.
   */
  async createAccessTokenRaw(
    requestParameters: CreateAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<AccessTokenResult>> {
    if (
      requestParameters.createAccessTokenParams === null ||
      requestParameters.createAccessTokenParams === undefined
    ) {
      throw new runtime.RequiredError(
        "createAccessTokenParams",
        "Required parameter requestParameters.createAccessTokenParams was null or undefined when calling createAccessToken."
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
        path: `/user/accessTokens`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateAccessTokenParamsToJSON(
          requestParameters.createAccessTokenParams
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      AccessTokenResultFromJSON(jsonValue)
    );
  }

  /**
   * Create a token for the current user. The token can be used to access resources on behalf of the user.
   */
  async createAccessToken(
    requestParameters: CreateAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<AccessTokenResult> {
    const response = await this.createAccessTokenRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async getAccessTokensRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GetAccessTokensResponse>> {
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
        path: `/user/accessTokens`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetAccessTokensResponseFromJSON(jsonValue)
    );
  }

  /**
   */
  async getAccessTokens(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GetAccessTokensResponse> {
    const response = await this.getAccessTokensRaw(initOverrides);
    return await response.value();
  }

  /**
   * Figure out which permissions are available to select from for a new access token.
   */
  async getAcessTokenAvailablePermissionsRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<
    runtime.ApiResponse<GetAcessTokenAvailablePermissions200Response>
  > {
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
        path: `/user/accessTokenAvailablePermissions`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetAcessTokenAvailablePermissions200ResponseFromJSON(jsonValue)
    );
  }

  /**
   * Figure out which permissions are available to select from for a new access token.
   */
  async getAcessTokenAvailablePermissions(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GetAcessTokenAvailablePermissions200Response> {
    const response = await this.getAcessTokenAvailablePermissionsRaw(
      initOverrides
    );
    return await response.value();
  }

  /**
   */
  async revokeAccessTokenRaw(
    requestParameters: RevokeAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.accessTokenId === null ||
      requestParameters.accessTokenId === undefined
    ) {
      throw new runtime.RequiredError(
        "accessTokenId",
        "Required parameter requestParameters.accessTokenId was null or undefined when calling revokeAccessToken."
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
        path: `/user/accessTokens/{accessTokenId}`.replace(
          `{${"accessTokenId"}}`,
          encodeURIComponent(String(requestParameters.accessTokenId))
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
   */
  async revokeAccessToken(
    requestParameters: RevokeAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<void> {
    await this.revokeAccessTokenRaw(requestParameters, initOverrides);
  }
}
