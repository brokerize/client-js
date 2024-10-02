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
import { Order, OrderFromJSON, OrderFromJSONTyped, OrderToJSON } from "./Order";

/**
 *
 * @export
 * @interface GetOrderResponse
 */
export interface GetOrderResponse {
  /**
   *
   * @type {Order}
   * @memberof GetOrderResponse
   */
  order: Order;
}

export function GetOrderResponseFromJSON(json: any): GetOrderResponse {
  return GetOrderResponseFromJSONTyped(json, false);
}

export function GetOrderResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetOrderResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    order: OrderFromJSON(json["order"]),
  };
}

export function GetOrderResponseToJSONRecursive(
  value?: GetOrderResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    order: OrderToJSON(value.order),
  };
}

export function GetOrderResponseToJSON(value?: GetOrderResponse | null): any {
  return GetOrderResponseToJSONRecursive(value, false);
}
