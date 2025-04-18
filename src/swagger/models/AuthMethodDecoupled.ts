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
  AuthMethodDecoupledAllOf,
  AuthMethodDecoupledAllOfFromJSON,
  AuthMethodDecoupledAllOfFromJSONTyped,
  AuthMethodDecoupledAllOfToJSON,
} from "./AuthMethodDecoupledAllOf";
import {
  AuthMethodDecoupledSpecifics,
  AuthMethodDecoupledSpecificsFromJSON,
  AuthMethodDecoupledSpecificsFromJSONTyped,
  AuthMethodDecoupledSpecificsToJSON,
} from "./AuthMethodDecoupledSpecifics";

/**
 * With the `DECOUPLED` flow, the operation is created right away without creating a challenge first. The operation's
 * response will include a `decoupledOperationId` which can be subscribed to using `GetDecoupledOperationStatus` and via
 * a WebSocket subscription. Also, the operation can be cancelled by the user using `CancelDecoupledOperation`.
 * @export
 * @interface AuthMethodDecoupled
 */
export interface AuthMethodDecoupled {
  /**
   *
   * @type {string}
   * @memberof AuthMethodDecoupled
   */
  flow: AuthMethodDecoupledFlowEnum;
  /**
   * If this is true, the auth method should not be offered to users on phones (e.g. for photoTAN, where the TAN has to
   * be scanned with a phone).
   * @type {boolean}
   * @memberof AuthMethodDecoupled
   */
  hideOnPhones?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodDecoupled
   */
  id: string;
  /**
   *
   * @type {boolean}
   * @memberof AuthMethodDecoupled
   */
  isDefaultMethod?: boolean;
  /**
   *
   * @type {string}
   * @memberof AuthMethodDecoupled
   */
  label: string;
}

/**
 * @export
 */
export const AuthMethodDecoupledFlowEnum = {
  Decoupled: "DECOUPLED",
} as const;
export type AuthMethodDecoupledFlowEnum =
  (typeof AuthMethodDecoupledFlowEnum)[keyof typeof AuthMethodDecoupledFlowEnum];

export function AuthMethodDecoupledFromJSON(json: any): AuthMethodDecoupled {
  return AuthMethodDecoupledFromJSONTyped(json, false);
}

export function AuthMethodDecoupledFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AuthMethodDecoupled {
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
  };
}

export function AuthMethodDecoupledToJSONRecursive(
  value?: AuthMethodDecoupled | null,
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
  };
}

export function AuthMethodDecoupledToJSON(
  value?: AuthMethodDecoupled | null
): any {
  return AuthMethodDecoupledToJSONRecursive(value, false);
}
