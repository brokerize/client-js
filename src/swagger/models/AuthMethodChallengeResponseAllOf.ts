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
 * @interface AuthMethodChallengeResponseAllOf
 */
export interface AuthMethodChallengeResponseAllOf {
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseAllOf
   */
  flow?: AuthMethodChallengeResponseAllOfFlowEnum;
}

/**
 * @export
 */
export const AuthMethodChallengeResponseAllOfFlowEnum = {
  ChallengeResponse: "CHALLENGE_RESPONSE",
} as const;
export type AuthMethodChallengeResponseAllOfFlowEnum =
  (typeof AuthMethodChallengeResponseAllOfFlowEnum)[keyof typeof AuthMethodChallengeResponseAllOfFlowEnum];

export function AuthMethodChallengeResponseAllOfFromJSON(
  json: any
): AuthMethodChallengeResponseAllOf {
  return AuthMethodChallengeResponseAllOfFromJSONTyped(json, false);
}

export function AuthMethodChallengeResponseAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodChallengeResponseAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    flow: !exists(json, "flow") ? undefined : json["flow"],
  };
}

export function AuthMethodChallengeResponseAllOfToJSONRecursive(
  value?: AuthMethodChallengeResponseAllOf | null,
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

export function AuthMethodChallengeResponseAllOfToJSON(
  value?: AuthMethodChallengeResponseAllOf | null
): any {
  return AuthMethodChallengeResponseAllOfToJSONRecursive(value, false);
}
