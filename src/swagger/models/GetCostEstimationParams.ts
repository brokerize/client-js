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
import {
  OrderCreate,
  OrderCreateFromJSON,
  OrderCreateFromJSONTyped,
  OrderCreateToJSON,
} from "./OrderCreate";

/**
 *
 * @export
 * @interface GetCostEstimationParams
 */
export interface GetCostEstimationParams {
  /**
   *
   * @type {OrderCreate}
   * @memberof GetCostEstimationParams
   */
  order: OrderCreate;
}

export function GetCostEstimationParamsFromJSON(
  json: any
): GetCostEstimationParams {
  return GetCostEstimationParamsFromJSONTyped(json, false);
}

export function GetCostEstimationParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetCostEstimationParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    order: OrderCreateFromJSON(json["order"]),
  };
}

export function GetCostEstimationParamsToJSONRecursive(
  value?: GetCostEstimationParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    order: OrderCreateToJSON(value.order),
  };
}

export function GetCostEstimationParamsToJSON(
  value?: GetCostEstimationParams | null
): any {
  return GetCostEstimationParamsToJSONRecursive(value, false);
}
