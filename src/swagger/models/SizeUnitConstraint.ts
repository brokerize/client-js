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
  Direction,
  DirectionFromJSON,
  DirectionFromJSONTyped,
  DirectionToJSON,
} from "./Direction";

/**
 *
 * @export
 * @interface SizeUnitConstraint
 */
export interface SizeUnitConstraint {
  /**
   *
   * @type {Array<string>}
   * @memberof SizeUnitConstraint
   */
  cashAccountIds?: Array<string>;
  /**
   *
   * @type {Array<Direction>}
   * @memberof SizeUnitConstraint
   */
  directions?: Array<Direction>;
  /**
   *
   * @type {Array<string>}
   * @memberof SizeUnitConstraint
   */
  orderModels?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof SizeUnitConstraint
   */
  sizeUnits: Array<string>;
}

export function SizeUnitConstraintFromJSON(json: any): SizeUnitConstraint {
  return SizeUnitConstraintFromJSONTyped(json, false);
}

export function SizeUnitConstraintFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SizeUnitConstraint {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cashAccountIds: !exists(json, "cashAccountIds")
      ? undefined
      : json["cashAccountIds"],
    directions: !exists(json, "directions")
      ? undefined
      : (json["directions"] as Array<any>).map(DirectionFromJSON),
    orderModels: !exists(json, "orderModels") ? undefined : json["orderModels"],
    sizeUnits: json["sizeUnits"],
  };
}

export function SizeUnitConstraintToJSONRecursive(
  value?: SizeUnitConstraint | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    cashAccountIds: value.cashAccountIds,
    directions:
      value.directions === undefined
        ? undefined
        : (value.directions as Array<any>).map(DirectionToJSON),
    orderModels: value.orderModels,
    sizeUnits: value.sizeUnits,
  };
}

export function SizeUnitConstraintToJSON(
  value?: SizeUnitConstraint | null
): any {
  return SizeUnitConstraintToJSONRecursive(value, false);
}
