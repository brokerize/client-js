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
 * @interface AccessTokenResult
 */
export interface AccessTokenResult {
  /**
   *
   * @type {string}
   * @memberof AccessTokenResult
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof AccessTokenResult
   */
  token: string;
}

export function AccessTokenResultFromJSON(json: any): AccessTokenResult {
  return AccessTokenResultFromJSONTyped(json, false);
}

export function AccessTokenResultFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccessTokenResult {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    token: json["token"],
  };
}

export function AccessTokenResultToJSONRecursive(
  value?: AccessTokenResult | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    id: value.id,
    token: value.token,
  };
}

export function AccessTokenResultToJSON(value?: AccessTokenResult | null): any {
  return AccessTokenResultToJSONRecursive(value, false);
}
