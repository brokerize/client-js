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
import {
  Amount,
  AmountFromJSON,
  AmountFromJSONTyped,
  AmountToJSON,
} from "./Amount";
import {
  GenericTableRowValueAmountAllOf,
  GenericTableRowValueAmountAllOfFromJSON,
  GenericTableRowValueAmountAllOfFromJSONTyped,
  GenericTableRowValueAmountAllOfToJSON,
} from "./GenericTableRowValueAmountAllOf";
import {
  GenericTableRowValueAmountSpecifics,
  GenericTableRowValueAmountSpecificsFromJSON,
  GenericTableRowValueAmountSpecificsFromJSONTyped,
  GenericTableRowValueAmountSpecificsToJSON,
} from "./GenericTableRowValueAmountSpecifics";

/**
 *
 * @export
 * @interface GenericTableRowValueAmount
 */
export interface GenericTableRowValueAmount {
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueAmount
   */
  type: GenericTableRowValueAmountTypeEnum;
  /**
   *
   * @type {Amount}
   * @memberof GenericTableRowValueAmount
   */
  value: Amount;
}

/**
 * @export
 */
export const GenericTableRowValueAmountTypeEnum = {
  Amount: "amount",
} as const;
export type GenericTableRowValueAmountTypeEnum =
  (typeof GenericTableRowValueAmountTypeEnum)[keyof typeof GenericTableRowValueAmountTypeEnum];

export function GenericTableRowValueAmountFromJSON(
  json: any
): GenericTableRowValueAmount {
  return GenericTableRowValueAmountFromJSONTyped(json, false);
}

export function GenericTableRowValueAmountFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueAmount {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: json["type"],
    value: AmountFromJSON(json["value"]),
  };
}

export function GenericTableRowValueAmountToJSONRecursive(
  value?: GenericTableRowValueAmount | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    type: value.type,
    value: AmountToJSON(value.value),
  };
}

export function GenericTableRowValueAmountToJSON(
  value?: GenericTableRowValueAmount | null
): any {
  return GenericTableRowValueAmountToJSONRecursive(value, false);
}
