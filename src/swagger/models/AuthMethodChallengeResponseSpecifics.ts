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
 * @interface AuthMethodChallengeResponseSpecifics
 */
export interface AuthMethodChallengeResponseSpecifics {
  /**
   * If this is true, the auth method should not be offered to users on phones (e.g. for photoTAN, where the TAN has to
   * be scanned with a phone).
   * @type {boolean}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  hideOnPhones?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  tanFieldLabel?: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  challengeResponseIsOnlyConfirmation?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  challengeLabel?: string;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  getChallengeLabel?: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  isDefaultMethod?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  label?: string;
  /**
   *
   * @type {string}
   * @memberof AuthMethodChallengeResponseSpecifics
   */
  id?: string;
}

export function AuthMethodChallengeResponseSpecificsFromJSON(
  json: any
): AuthMethodChallengeResponseSpecifics {
  return AuthMethodChallengeResponseSpecificsFromJSONTyped(json, false);
}

export function AuthMethodChallengeResponseSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodChallengeResponseSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    hideOnPhones: !exists(json, "hideOnPhones")
      ? undefined
      : json["hideOnPhones"],
    tanFieldLabel: !exists(json, "tanFieldLabel")
      ? undefined
      : json["tanFieldLabel"],
    challengeResponseIsOnlyConfirmation: !exists(
      json,
      "challengeResponseIsOnlyConfirmation"
    )
      ? undefined
      : json["challengeResponseIsOnlyConfirmation"],
    challengeLabel: !exists(json, "challengeLabel")
      ? undefined
      : json["challengeLabel"],
    getChallengeLabel: !exists(json, "getChallengeLabel")
      ? undefined
      : json["getChallengeLabel"],
    isDefaultMethod: !exists(json, "isDefaultMethod")
      ? undefined
      : json["isDefaultMethod"],
    label: !exists(json, "label") ? undefined : json["label"],
    id: !exists(json, "id") ? undefined : json["id"],
  };
}

export function AuthMethodChallengeResponseSpecificsToJSONRecursive(
  value?: AuthMethodChallengeResponseSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    hideOnPhones: value.hideOnPhones,
    tanFieldLabel: value.tanFieldLabel,
    challengeResponseIsOnlyConfirmation:
      value.challengeResponseIsOnlyConfirmation,
    challengeLabel: value.challengeLabel,
    getChallengeLabel: value.getChallengeLabel,
    isDefaultMethod: value.isDefaultMethod,
    label: value.label,
    id: value.id,
  };
}

export function AuthMethodChallengeResponseSpecificsToJSON(
  value?: AuthMethodChallengeResponseSpecifics | null
): any {
  return AuthMethodChallengeResponseSpecificsToJSONRecursive(value, false);
}
