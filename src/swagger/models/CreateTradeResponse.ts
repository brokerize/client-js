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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface CreateTradeResponse
 */
export interface CreateTradeResponse {
  /**
   *
   * @type {string}
   * @memberof CreateTradeResponse
   */
  orderId?: string;
}

export function CreateTradeResponseFromJSON(json: any): CreateTradeResponse {
  return CreateTradeResponseFromJSONTyped(json, false);
}

export function CreateTradeResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateTradeResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    orderId: !exists(json, "orderId") ? undefined : json["orderId"],
  };
}

export function CreateTradeResponseToJSONRecursive(
  value?: CreateTradeResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    orderId: value.orderId,
  };
}

export function CreateTradeResponseToJSON(
  value?: CreateTradeResponse | null
): any {
  return CreateTradeResponseToJSONRecursive(value, false);
}
