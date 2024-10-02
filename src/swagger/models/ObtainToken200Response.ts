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
 * @interface ObtainToken200Response
 */
export interface ObtainToken200Response {
  /**
   *
   * @type {string}
   * @memberof ObtainToken200Response
   */
  accessToken: string;
  /**
   *
   * @type {number}
   * @memberof ObtainToken200Response
   */
  expiresIn: number;
  /**
   *
   * @type {any}
   * @memberof ObtainToken200Response
   */
  refreshToken: any | null;
  /**
   *
   * @type {number}
   * @memberof ObtainToken200Response
   */
  refreshTokenExpiresIn: number;
  /**
   *
   * @type {string}
   * @memberof ObtainToken200Response
   */
  tokenType: string;
}

export function ObtainToken200ResponseFromJSON(
  json: any
): ObtainToken200Response {
  return ObtainToken200ResponseFromJSONTyped(json, false);
}

export function ObtainToken200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ObtainToken200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    accessToken: json["access_token"],
    expiresIn: json["expires_in"],
    refreshToken: json["refresh_token"],
    refreshTokenExpiresIn: json["refresh_token_expires_in"],
    tokenType: json["token_type"],
  };
}

export function ObtainToken200ResponseToJSONRecursive(
  value?: ObtainToken200Response | null,
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
    refresh_token: value.refreshToken,
    refresh_token_expires_in: value.refreshTokenExpiresIn,
    token_type: value.tokenType,
  };
}

export function ObtainToken200ResponseToJSON(
  value?: ObtainToken200Response | null
): any {
  return ObtainToken200ResponseToJSONRecursive(value, false);
}