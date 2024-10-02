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
import {
  AuthMethodTanAllOf,
  AuthMethodTanAllOfFromJSON,
  AuthMethodTanAllOfFromJSONTyped,
  AuthMethodTanAllOfToJSON,
} from "./AuthMethodTanAllOf";
import {
  AuthMethodTanSpecifics,
  AuthMethodTanSpecificsFromJSON,
  AuthMethodTanSpecificsFromJSONTyped,
  AuthMethodTanSpecificsToJSON,
} from "./AuthMethodTanSpecifics";

/**
 * With the `TAN` flow, a TAN can be sent with the operation right away, i.e. without creating a challenge first.
 * This may be the case for brokers that provide a fixed trading password or a list of TANs where the user
 * may select an arbitrary TAN from the list.
 * @export
 * @interface AuthMethodTan
 */
export interface AuthMethodTan {
  /**
   *
   * @type {string}
   * @memberof AuthMethodTan
   */
  flow: AuthMethodTanFlowEnum;
  /**
   * If this is true, the auth method should not be offered to users on phones (e.g. for photoTAN, where the TAN has to
   * be scanned with a phone).
   * @type {boolean}
   * @memberof AuthMethodTan
   */
  hideOnPhones?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodTan
   */
  id: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodTan
   */
  isDefaultMethod?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodTan
   */
  label: string;
  /**
   *
   * @type {string}
   * @memberof AuthMethodTan
   */
  tanFieldLabel: string;
}

/**
 * @export
 */
export const AuthMethodTanFlowEnum = {
  Tan: "TAN",
} as const;
export type AuthMethodTanFlowEnum =
  (typeof AuthMethodTanFlowEnum)[keyof typeof AuthMethodTanFlowEnum];

export function AuthMethodTanFromJSON(json: any): AuthMethodTan {
  return AuthMethodTanFromJSONTyped(json, false);
}

export function AuthMethodTanFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodTan {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    flow: json["flow"],
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

export function AuthMethodTanToJSONRecursive(
  value?: AuthMethodTan | null,
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
    hideOnPhones: value.hideOnPhones,
    id: value.id,
    isDefaultMethod: value.isDefaultMethod,
    label: value.label,
    tanFieldLabel: value.tanFieldLabel,
  };
}

export function AuthMethodTanToJSON(value?: AuthMethodTan | null): any {
  return AuthMethodTanToJSONRecursive(value, false);
}
