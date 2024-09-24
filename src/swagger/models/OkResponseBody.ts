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
 * @interface OkResponseBody
 */
export interface OkResponseBody {
  /**
   *
   * @type {string}
   * @memberof OkResponseBody
   */
  msg: string;
}

export function OkResponseBodyFromJSON(json: any): OkResponseBody {
  return OkResponseBodyFromJSONTyped(json, false);
}

export function OkResponseBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OkResponseBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    msg: json["msg"],
  };
}

export function OkResponseBodyToJSONRecursive(
  value?: OkResponseBody | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    msg: value.msg,
  };
}

export function OkResponseBodyToJSON(value?: OkResponseBody | null): any {
  return OkResponseBodyToJSONRecursive(value, false);
}
