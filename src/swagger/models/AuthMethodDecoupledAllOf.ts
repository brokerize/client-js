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
 * @interface AuthMethodDecoupledAllOf
 */
export interface AuthMethodDecoupledAllOf {
  /**
   *
   * @type {string}
   * @memberof AuthMethodDecoupledAllOf
   */
  flow?: AuthMethodDecoupledAllOfFlowEnum;
}

/**
 * @export
 */
export const AuthMethodDecoupledAllOfFlowEnum = {
  Decoupled: "DECOUPLED",
} as const;
export type AuthMethodDecoupledAllOfFlowEnum =
  (typeof AuthMethodDecoupledAllOfFlowEnum)[keyof typeof AuthMethodDecoupledAllOfFlowEnum];

export function AuthMethodDecoupledAllOfFromJSON(
  json: any
): AuthMethodDecoupledAllOf {
  return AuthMethodDecoupledAllOfFromJSONTyped(json, false);
}

export function AuthMethodDecoupledAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodDecoupledAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    flow: !exists(json, "flow") ? undefined : json["flow"],
  };
}

export function AuthMethodDecoupledAllOfToJSONRecursive(
  value?: AuthMethodDecoupledAllOf | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    flow: value.flow,
  };
}

export function AuthMethodDecoupledAllOfToJSON(
  value?: AuthMethodDecoupledAllOf | null
): any {
  return AuthMethodDecoupledAllOfToJSONRecursive(value, false);
}
