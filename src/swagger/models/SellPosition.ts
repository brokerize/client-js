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
 * @interface SellPosition
 */
export interface SellPosition {
  /**
   *
   * @type {string}
   * @memberof SellPosition
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof SellPosition
   */
  label: string;
}

export function SellPositionFromJSON(json: any): SellPosition {
  return SellPositionFromJSONTyped(json, false);
}

export function SellPositionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SellPosition {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    label: json["label"],
  };
}

export function SellPositionToJSONRecursive(
  value?: SellPosition | null,
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
    label: value.label,
  };
}

export function SellPositionToJSON(value?: SellPosition | null): any {
  return SellPositionToJSONRecursive(value, false);
}
