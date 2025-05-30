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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface CreateGuestUserResponse
 */
export interface CreateGuestUserResponse {
  /**
   * The bearer token that can be used to access the API.
   * @type {string}
   * @memberof CreateGuestUserResponse
   */
  accessToken: string;
  /**
   * Expiration time of the token in seconds from now.
   * @type {number}
   * @memberof CreateGuestUserResponse
   */
  expiresIn?: number;
  /**
   *
   * @type {string}
   * @memberof CreateGuestUserResponse
   * @deprecated
   */
  idToken: string;
  /**
   *
   * @type {string}
   * @memberof CreateGuestUserResponse
   */
  refreshToken?: string;
  /**
   * If applicable, expiration time of the refresh token in seconds from now.
   * Note that this is optional and may not be provided in all cases.
   * @type {number}
   * @memberof CreateGuestUserResponse
   */
  refreshTokenExpiresIn?: number;
  /**
   * If applicable for the client configuration, another refresh token which does not have
   * access to the current trading session. It can be used to acquire a new trading session, which will belong to the
   * same user, but have separate active broker sessions.
   * @type {string}
   * @memberof CreateGuestUserResponse
   */
  refreshTokenWithoutTradingsession?: string;
  /**
   *
   * @type {number}
   * @memberof CreateGuestUserResponse
   */
  refreshTokenWithoutTradingsessionExpiresIn?: number;
  /**
   * The OAuth token_type. Currently always `"bearer"`.
   * @type {string}
   * @memberof CreateGuestUserResponse
   */
  tokenType: string;
}

export function CreateGuestUserResponseFromJSON(
  json: any
): CreateGuestUserResponse {
  return CreateGuestUserResponseFromJSONTyped(json, false);
}

export function CreateGuestUserResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateGuestUserResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    accessToken: json["access_token"],
    expiresIn: !exists(json, "expires_in") ? undefined : json["expires_in"],
    idToken: json["idToken"],
    refreshToken: !exists(json, "refresh_token")
      ? undefined
      : json["refresh_token"],
    refreshTokenExpiresIn: !exists(json, "refresh_token_expires_in")
      ? undefined
      : json["refresh_token_expires_in"],
    refreshTokenWithoutTradingsession: !exists(
      json,
      "refresh_token_without_tradingsession"
    )
      ? undefined
      : json["refresh_token_without_tradingsession"],
    refreshTokenWithoutTradingsessionExpiresIn: !exists(
      json,
      "refresh_token_without_tradingsession_expires_in"
    )
      ? undefined
      : json["refresh_token_without_tradingsession_expires_in"],
    tokenType: json["token_type"],
  };
}

export function CreateGuestUserResponseToJSONRecursive(
  value?: CreateGuestUserResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    access_token: value.accessToken,
    expires_in: value.expiresIn,
    idToken: value.idToken,
    refresh_token: value.refreshToken,
    refresh_token_expires_in: value.refreshTokenExpiresIn,
    refresh_token_without_tradingsession:
      value.refreshTokenWithoutTradingsession,
    refresh_token_without_tradingsession_expires_in:
      value.refreshTokenWithoutTradingsessionExpiresIn,
    token_type: value.tokenType,
  };
}

export function CreateGuestUserResponseToJSON(
  value?: CreateGuestUserResponse | null
): any {
  return CreateGuestUserResponseToJSONRecursive(value, false);
}
