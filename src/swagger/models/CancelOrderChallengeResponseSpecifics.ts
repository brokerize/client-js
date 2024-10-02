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
 * @interface CancelOrderChallengeResponseSpecifics
 */
export interface CancelOrderChallengeResponseSpecifics {
  /**
   *
   * @type {string}
   * @memberof CancelOrderChallengeResponseSpecifics
   */
  authMethod?: string;
  /**
   *
   * @type {string}
   * @memberof CancelOrderChallengeResponseSpecifics
   */
  challengeId?: string;
  /**
   *
   * @type {string}
   * @memberof CancelOrderChallengeResponseSpecifics
   */
  challengeResponse?: string;
}

export function CancelOrderChallengeResponseSpecificsFromJSON(
  json: any
): CancelOrderChallengeResponseSpecifics {
  return CancelOrderChallengeResponseSpecificsFromJSONTyped(json, false);
}

export function CancelOrderChallengeResponseSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CancelOrderChallengeResponseSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authMethod: !exists(json, "authMethod") ? undefined : json["authMethod"],
    challengeId: !exists(json, "challengeId") ? undefined : json["challengeId"],
    challengeResponse: !exists(json, "challengeResponse")
      ? undefined
      : json["challengeResponse"],
  };
}

export function CancelOrderChallengeResponseSpecificsToJSONRecursive(
  value?: CancelOrderChallengeResponseSpecifics | null,
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
    challengeId: value.challengeId,
    challengeResponse: value.challengeResponse,
  };
}

export function CancelOrderChallengeResponseSpecificsToJSON(
  value?: CancelOrderChallengeResponseSpecifics | null
): any {
  return CancelOrderChallengeResponseSpecificsToJSONRecursive(value, false);
}
