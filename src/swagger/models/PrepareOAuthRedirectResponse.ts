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
 * @interface PrepareOAuthRedirectResponse
 */
export interface PrepareOAuthRedirectResponse {
  /**
   *
   * @type {string}
   * @memberof PrepareOAuthRedirectResponse
   */
  redirectTo: string;
}

export function PrepareOAuthRedirectResponseFromJSON(
  json: any
): PrepareOAuthRedirectResponse {
  return PrepareOAuthRedirectResponseFromJSONTyped(json, false);
}

export function PrepareOAuthRedirectResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PrepareOAuthRedirectResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    redirectTo: json["redirectTo"],
  };
}

export function PrepareOAuthRedirectResponseToJSONRecursive(
  value?: PrepareOAuthRedirectResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    redirectTo: value.redirectTo,
  };
}

export function PrepareOAuthRedirectResponseToJSON(
  value?: PrepareOAuthRedirectResponse | null
): any {
  return PrepareOAuthRedirectResponseToJSONRecursive(value, false);
}
