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
  OrderValidityType,
  OrderValidityTypeFromJSON,
  OrderValidityTypeFromJSONTyped,
  OrderValidityTypeToJSON,
} from "./OrderValidityType";

/**
 * Defines how long an order is valid.
 * @export
 * @interface OrderValidity
 */
export interface OrderValidity {
  /**
   * Date in the format YYYY-MM-DD for validityType: 'GTD'
   * Date in the format Date ISO string YYYY-MM-DDThh:mm:ss.fffZ for validityType: 'GTDT'
   * @type {string}
   * @memberof OrderValidity
   */
  date?: string;
  /**
   *
   * @type {string}
   * @memberof OrderValidity
   */
  eom?: string;
  /**
   *
   * @type {OrderValidityType}
   * @memberof OrderValidity
   */
  type: OrderValidityType;
}

export function OrderValidityFromJSON(json: any): OrderValidity {
  return OrderValidityFromJSONTyped(json, false);
}

export function OrderValidityFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderValidity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    date: !exists(json, "date") ? undefined : json["date"],
    eom: !exists(json, "eom") ? undefined : json["eom"],
    type: OrderValidityTypeFromJSON(json["type"]),
  };
}

export function OrderValidityToJSONRecursive(
  value?: OrderValidity | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    date: value.date,
    eom: value.eom,
    type: OrderValidityTypeToJSON(value.type),
  };
}

export function OrderValidityToJSON(value?: OrderValidity | null): any {
  return OrderValidityToJSONRecursive(value, false);
}
