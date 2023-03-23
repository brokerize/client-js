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
 * For orderModels `trailingStopMarket` and `trailingStopLimit`: the distance between the security's quote and the
 * stop value to calculate.
 * @export
 * @interface TrailingDistance
 */
export interface TrailingDistance {
  /**
   *
   * @type {number}
   * @memberof TrailingDistance
   */
  value: number;
  /**
   *
   * @type {string}
   * @memberof TrailingDistance
   */
  mode: TrailingDistanceModeEnum;
}

/**
 * @export
 */
export const TrailingDistanceModeEnum = {
  Abs: "abs",
  Rel: "rel",
} as const;
export type TrailingDistanceModeEnum =
  (typeof TrailingDistanceModeEnum)[keyof typeof TrailingDistanceModeEnum];

export function TrailingDistanceFromJSON(json: any): TrailingDistance {
  return TrailingDistanceFromJSONTyped(json, false);
}

export function TrailingDistanceFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TrailingDistance {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    value: json["value"],
    mode: json["mode"],
  };
}

export function TrailingDistanceToJSONRecursive(
  value?: TrailingDistance | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    value: value.value,
    mode: value.mode,
  };
}

export function TrailingDistanceToJSON(value?: TrailingDistance | null): any {
  return TrailingDistanceToJSONRecursive(value, false);
}
