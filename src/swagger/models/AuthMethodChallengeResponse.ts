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
import {
  AuthMethodChallengeResponseAllOf,
  AuthMethodChallengeResponseAllOfFromJSON,
  AuthMethodChallengeResponseAllOfFromJSONTyped,
  AuthMethodChallengeResponseAllOfToJSON,
} from "./AuthMethodChallengeResponseAllOf";
import {
  AuthMethodChallengeResponseSpecifics,
  AuthMethodChallengeResponseSpecificsFromJSON,
  AuthMethodChallengeResponseSpecificsFromJSONTyped,
  AuthMethodChallengeResponseSpecificsToJSON,
} from "./AuthMethodChallengeResponseSpecifics";

/**
 * With the `CHALLENGE_RESPONSE` flow, to execute an operation, a challenge has to be created as the first step
 * and the response to the challenge will be provided with the actual operation as a second API call:
 *
 * 1) The end user requests challenge with a button labelled `getChallengeLabel`, which triggers the `createXYZChallenge` endpoint (e.g. `CreateSessionTanChallenge`)
 * 2) The challenge is then presented to the user. It may be a code to look up from a sheet of paper, a photoTAN to scan with the
 *    broker's mobile app or anything else (details are described in `Challenge`).
 * 3) `AuthMethod.challengeResponseIsOnlyConfirmation` determines if and how the user must actually enter a response text:
 *    - If `challengeResponseIsOnlyConfirmation=true`: the final API call (e.g. `EnableSessionTan`) is only a confirmation of some second factor (i.e. the user tells us they
 *      have allowed the action in their broker's mobile app). In this case, the `challengeResponse` must be sent as an empty string once
 *      the user clicks the corresponding confirm button.
 *    - Otherwise, the user is expected to provide a textual `challengeResponse`. In this case, a text field for the `challengeResponse` must be displayed
 *      and labelled with `tanFieldLabel`. The  `challengeResponse` is sent as entered by the user to the actual action endpoint (e.g. `EnableSessionTan`)
 * @export
 * @interface AuthMethodChallengeResponse
 */
export interface AuthMethodChallengeResponse {
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  flow: AuthMethodChallengeResponseFlowEnum;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  challengeLabel?: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodChallengeResponse
   */
  challengeResponseIsOnlyConfirmation?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  getChallengeLabel: string;
  /**
   * If this is true, the auth method should not be offered to users on phones (e.g. for photoTAN, where the TAN has to
   * be scanned with a phone).
   * @type {boolean}
   * @memberof AuthMethodChallengeResponse
   */
  hideOnPhones?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  id: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodChallengeResponse
   */
  isDefaultMethod?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  label: string;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponse
   */
  tanFieldLabel: string;
}

/**
 * @export
 */
export const AuthMethodChallengeResponseFlowEnum = {
  ChallengeResponse: "CHALLENGE_RESPONSE",
} as const;
export type AuthMethodChallengeResponseFlowEnum =
  (typeof AuthMethodChallengeResponseFlowEnum)[keyof typeof AuthMethodChallengeResponseFlowEnum];

export function AuthMethodChallengeResponseFromJSON(
  json: any
): AuthMethodChallengeResponse {
  return AuthMethodChallengeResponseFromJSONTyped(json, false);
}

export function AuthMethodChallengeResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodChallengeResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    flow: json["flow"],
    challengeLabel: !exists(json, "challengeLabel")
      ? undefined
      : json["challengeLabel"],
    challengeResponseIsOnlyConfirmation: !exists(
      json,
      "challengeResponseIsOnlyConfirmation"
    )
      ? undefined
      : json["challengeResponseIsOnlyConfirmation"],
    getChallengeLabel: json["getChallengeLabel"],
    hideOnPhones: !exists(json, "hideOnPhones")
      ? undefined
      : json["hideOnPhones"],
    id: json["id"],
    isDefaultMethod: !exists(json, "isDefaultMethod")
      ? undefined
      : json["isDefaultMethod"],
    label: json["label"],
    tanFieldLabel: json["tanFieldLabel"],
  };
}

export function AuthMethodChallengeResponseToJSONRecursive(
  value?: AuthMethodChallengeResponse | null,
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
    challengeLabel: value.challengeLabel,
    challengeResponseIsOnlyConfirmation:
      value.challengeResponseIsOnlyConfirmation,
    getChallengeLabel: value.getChallengeLabel,
    hideOnPhones: value.hideOnPhones,
    id: value.id,
    isDefaultMethod: value.isDefaultMethod,
    label: value.label,
    tanFieldLabel: value.tanFieldLabel,
  };
}

export function AuthMethodChallengeResponseToJSON(
  value?: AuthMethodChallengeResponse | null
): any {
  return AuthMethodChallengeResponseToJSONRecursive(value, false);
}
