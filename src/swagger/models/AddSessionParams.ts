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
 * @interface AddSessionParams
 */
export interface AddSessionParams {
  /**
   *
   * @type {string}
   * @memberof AddSessionParams
   */
  password: string;
  /**
   *
   * @type {string}
   * @memberof AddSessionParams
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof AddSessionParams
   */
  env: string;
  /**
   *
   * @type {string}
   * @memberof AddSessionParams
   */
  brokerName: string;
}

export function AddSessionParamsFromJSON(json: any): AddSessionParams {
  return AddSessionParamsFromJSONTyped(json, false);
}

export function AddSessionParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AddSessionParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    password: json["password"],
    username: json["username"],
    env: json["env"],
    brokerName: json["brokerName"],
  };
}

export function AddSessionParamsToJSONRecursive(
  value?: AddSessionParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    password: value.password,
    username: value.username,
    env: value.env,
    brokerName: value.brokerName,
  };
}

export function AddSessionParamsToJSON(value?: AddSessionParams | null): any {
  return AddSessionParamsToJSONRecursive(value, false);
}
