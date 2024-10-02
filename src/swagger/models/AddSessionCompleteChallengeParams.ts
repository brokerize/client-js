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
 * @interface AddSessionCompleteChallengeParams
 */
export interface AddSessionCompleteChallengeParams {
  /**
   *
   * @type {string}
   * @memberof AddSessionCompleteChallengeParams
   */
  challengeId: string;
  /**
   *
   * @type {string}
   * @memberof AddSessionCompleteChallengeParams
   */
  challengeResponse: string;
}

export function AddSessionCompleteChallengeParamsFromJSON(
  json: any
): AddSessionCompleteChallengeParams {
  return AddSessionCompleteChallengeParamsFromJSONTyped(json, false);
}

export function AddSessionCompleteChallengeParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AddSessionCompleteChallengeParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    challengeId: json["challengeId"],
    challengeResponse: json["challengeResponse"],
  };
}

export function AddSessionCompleteChallengeParamsToJSONRecursive(
  value?: AddSessionCompleteChallengeParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    challengeId: value.challengeId,
    challengeResponse: value.challengeResponse,
  };
}

export function AddSessionCompleteChallengeParamsToJSON(
  value?: AddSessionCompleteChallengeParams | null
): any {
  return AddSessionCompleteChallengeParamsToJSONRecursive(value, false);
}
