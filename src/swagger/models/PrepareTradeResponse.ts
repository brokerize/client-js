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
import {
  PreparedTrade,
  PreparedTradeFromJSON,
  PreparedTradeFromJSONTyped,
  PreparedTradeToJSON,
} from "./PreparedTrade";

/**
 *
 * @export
 * @interface PrepareTradeResponse
 */
export interface PrepareTradeResponse {
  /**
   *
   * @type {PreparedTrade}
   * @memberof PrepareTradeResponse
   */
  preparedTrade: PreparedTrade;
}

export function PrepareTradeResponseFromJSON(json: any): PrepareTradeResponse {
  return PrepareTradeResponseFromJSONTyped(json, false);
}

export function PrepareTradeResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PrepareTradeResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    preparedTrade: PreparedTradeFromJSON(json["preparedTrade"]),
  };
}

export function PrepareTradeResponseToJSONRecursive(
  value?: PrepareTradeResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    preparedTrade: PreparedTradeToJSON(value.preparedTrade),
  };
}

export function PrepareTradeResponseToJSON(
  value?: PrepareTradeResponse | null
): any {
  return PrepareTradeResponseToJSONRecursive(value, false);
}
