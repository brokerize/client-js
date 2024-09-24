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
 * @interface CancelOrderChallengeResponseAllOf
 */
export interface CancelOrderChallengeResponseAllOf {
  /**
   *
   * @type {string}
   * @memberof CancelOrderChallengeResponseAllOf
   */
  mode?: CancelOrderChallengeResponseAllOfModeEnum;
}

/**
 * @export
 */
export const CancelOrderChallengeResponseAllOfModeEnum = {
  ChallengeResponse: "challengeResponse",
} as const;
export type CancelOrderChallengeResponseAllOfModeEnum =
  (typeof CancelOrderChallengeResponseAllOfModeEnum)[keyof typeof CancelOrderChallengeResponseAllOfModeEnum];

export function CancelOrderChallengeResponseAllOfFromJSON(
  json: any
): CancelOrderChallengeResponseAllOf {
  return CancelOrderChallengeResponseAllOfFromJSONTyped(json, false);
}

export function CancelOrderChallengeResponseAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CancelOrderChallengeResponseAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    mode: !exists(json, "mode") ? undefined : json["mode"],
  };
}

export function CancelOrderChallengeResponseAllOfToJSONRecursive(
  value?: CancelOrderChallengeResponseAllOf | null,
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

export function CancelOrderChallengeResponseAllOfToJSON(
  value?: CancelOrderChallengeResponseAllOf | null
): any {
  return CancelOrderChallengeResponseAllOfToJSONRecursive(value, false);
}
