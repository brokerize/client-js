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
  LoginResponseReadyAllOf,
  LoginResponseReadyAllOfFromJSON,
  LoginResponseReadyAllOfFromJSONTyped,
  LoginResponseReadyAllOfToJSON,
} from "./LoginResponseReadyAllOf";
import {
  LoginResponseReadySpecifics,
  LoginResponseReadySpecificsFromJSON,
  LoginResponseReadySpecificsFromJSONTyped,
  LoginResponseReadySpecificsToJSON,
} from "./LoginResponseReadySpecifics";

/**
 *
 * @export
 * @interface LoginResponseReady
 */
export interface LoginResponseReady {
  /**
   *
   * @type {string}
   * @memberof LoginResponseReady
   */
  state: LoginResponseReadyStateEnum;
  /**
   *
   * @type {string}
   * @memberof LoginResponseReady
   */
  sessionId: string;
}

/**
 * @export
 */
export const LoginResponseReadyStateEnum = {
  Ready: "ready",
} as const;
export type LoginResponseReadyStateEnum =
  (typeof LoginResponseReadyStateEnum)[keyof typeof LoginResponseReadyStateEnum];

export function LoginResponseReadyFromJSON(json: any): LoginResponseReady {
  return LoginResponseReadyFromJSONTyped(json, false);
}

export function LoginResponseReadyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): LoginResponseReady {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: json["state"],
    sessionId: json["sessionId"],
  };
}

export function LoginResponseReadyToJSONRecursive(
  value?: LoginResponseReady | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    state: value.state,
    sessionId: value.sessionId,
  };
}

export function LoginResponseReadyToJSON(
  value?: LoginResponseReady | null
): any {
  return LoginResponseReadyToJSONRecursive(value, false);
}
