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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface EndSessionTanResponse
 */
export interface EndSessionTanResponse {
  /**
   *
   * @type {string}
   * @memberof EndSessionTanResponse
   */
  message?: string;
}

export function EndSessionTanResponseFromJSON(
  json: any
): EndSessionTanResponse {
  return EndSessionTanResponseFromJSONTyped(json, false);
}

export function EndSessionTanResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EndSessionTanResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: !exists(json, "message") ? undefined : json["message"],
  };
}

export function EndSessionTanResponseToJSONRecursive(
  value?: EndSessionTanResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    message: value.message,
  };
}

export function EndSessionTanResponseToJSON(
  value?: EndSessionTanResponse | null
): any {
  return EndSessionTanResponseToJSONRecursive(value, false);
}
