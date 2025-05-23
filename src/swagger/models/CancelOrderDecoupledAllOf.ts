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
 * @interface CancelOrderDecoupledAllOf
 */
export interface CancelOrderDecoupledAllOf {
  /**
   *
   * @type {string}
   * @memberof CancelOrderDecoupledAllOf
   */
  mode?: CancelOrderDecoupledAllOfModeEnum;
}

/**
 * @export
 */
export const CancelOrderDecoupledAllOfModeEnum = {
  Decoupled: "decoupled",
} as const;
export type CancelOrderDecoupledAllOfModeEnum =
  (typeof CancelOrderDecoupledAllOfModeEnum)[keyof typeof CancelOrderDecoupledAllOfModeEnum];

export function CancelOrderDecoupledAllOfFromJSON(
  json: any
): CancelOrderDecoupledAllOf {
  return CancelOrderDecoupledAllOfFromJSONTyped(json, false);
}

export function CancelOrderDecoupledAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CancelOrderDecoupledAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    mode: !exists(json, "mode") ? undefined : json["mode"],
  };
}

export function CancelOrderDecoupledAllOfToJSONRecursive(
  value?: CancelOrderDecoupledAllOf | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    mode: value.mode,
  };
}

export function CancelOrderDecoupledAllOfToJSON(
  value?: CancelOrderDecoupledAllOf | null
): any {
  return CancelOrderDecoupledAllOfToJSONRecursive(value, false);
}
