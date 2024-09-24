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
import {
  EnableSessionTanParamsChallengeResponseAllOf,
  EnableSessionTanParamsChallengeResponseAllOfFromJSON,
  EnableSessionTanParamsChallengeResponseAllOfFromJSONTyped,
  EnableSessionTanParamsChallengeResponseAllOfToJSON,
} from "./EnableSessionTanParamsChallengeResponseAllOf";
import {
  EnableSessionTanParamsChallengeResponseSpecifics,
  EnableSessionTanParamsChallengeResponseSpecificsFromJSON,
  EnableSessionTanParamsChallengeResponseSpecificsFromJSONTyped,
  EnableSessionTanParamsChallengeResponseSpecificsToJSON,
} from "./EnableSessionTanParamsChallengeResponseSpecifics";

/**
 *
 * @export
 * @interface EnableSessionTanParamsChallengeResponse
 */
export interface EnableSessionTanParamsChallengeResponse {
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsChallengeResponse
   */
  kind: EnableSessionTanParamsChallengeResponseKindEnum;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsChallengeResponse
   */
  authMethod: string;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsChallengeResponse
   */
  challengeId: string;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsChallengeResponse
   */
  challengeResponse: string;
}

/**
 * @export
 */
export const EnableSessionTanParamsChallengeResponseKindEnum = {
  ChallengeResponse: "challengeResponse",
} as const;
export type EnableSessionTanParamsChallengeResponseKindEnum =
  (typeof EnableSessionTanParamsChallengeResponseKindEnum)[keyof typeof EnableSessionTanParamsChallengeResponseKindEnum];

export function EnableSessionTanParamsChallengeResponseFromJSON(
  json: any
): EnableSessionTanParamsChallengeResponse {
  return EnableSessionTanParamsChallengeResponseFromJSONTyped(json, false);
}

export function EnableSessionTanParamsChallengeResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanParamsChallengeResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    kind: json["kind"],
    authMethod: json["authMethod"],
    challengeId: json["challengeId"],
    challengeResponse: json["challengeResponse"],
  };
}

export function EnableSessionTanParamsChallengeResponseToJSONRecursive(
  value?: EnableSessionTanParamsChallengeResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    kind: value.kind,
    authMethod: value.authMethod,
    challengeId: value.challengeId,
    challengeResponse: value.challengeResponse,
  };
}

export function EnableSessionTanParamsChallengeResponseToJSON(
  value?: EnableSessionTanParamsChallengeResponse | null
): any {
  return EnableSessionTanParamsChallengeResponseToJSONRecursive(value, false);
}
