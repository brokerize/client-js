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
 * @interface LoginResponseReadyAllOf
 */
export interface LoginResponseReadyAllOf {
  /**
   *
   * @type {string}
   * @memberof LoginResponseReadyAllOf
   */
  state?: LoginResponseReadyAllOfStateEnum;
}

/**
 * @export
 */
export const LoginResponseReadyAllOfStateEnum = {
  Ready: "ready",
} as const;
export type LoginResponseReadyAllOfStateEnum =
  (typeof LoginResponseReadyAllOfStateEnum)[keyof typeof LoginResponseReadyAllOfStateEnum];

export function LoginResponseReadyAllOfFromJSON(
  json: any
): LoginResponseReadyAllOf {
  return LoginResponseReadyAllOfFromJSONTyped(json, false);
}

export function LoginResponseReadyAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): LoginResponseReadyAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: !exists(json, "state") ? undefined : json["state"],
  };
}

export function LoginResponseReadyAllOfToJSONRecursive(
  value?: LoginResponseReadyAllOf | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    state: value.state,
  };
}

export function LoginResponseReadyAllOfToJSON(
  value?: LoginResponseReadyAllOf | null
): any {
  return LoginResponseReadyAllOfToJSONRecursive(value, false);
}
