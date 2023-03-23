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
 * @interface CancelOrderChallengeParams
 */
export interface CancelOrderChallengeParams {
  /**
   *
   * @type {string}
   * @memberof CancelOrderChallengeParams
   */
  authMethod: string;
}

export function CancelOrderChallengeParamsFromJSON(
  json: any
): CancelOrderChallengeParams {
  return CancelOrderChallengeParamsFromJSONTyped(json, false);
}

export function CancelOrderChallengeParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CancelOrderChallengeParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authMethod: json["authMethod"],
  };
}

export function CancelOrderChallengeParamsToJSONRecursive(
  value?: CancelOrderChallengeParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    authMethod: value.authMethod,
  };
}

export function CancelOrderChallengeParamsToJSON(
  value?: CancelOrderChallengeParams | null
): any {
  return CancelOrderChallengeParamsToJSONRecursive(value, false);
}
