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
/**
 *
 * @export
 * @interface GetUserResponse
 */
export interface GetUserResponse {
  /**
   *
   * @type {string}
   * @memberof GetUserResponse
   */
  userId: string;
}

export function GetUserResponseFromJSON(json: any): GetUserResponse {
  return GetUserResponseFromJSONTyped(json, false);
}

export function GetUserResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetUserResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    userId: json["userId"],
  };
}

export function GetUserResponseToJSONRecursive(
  value?: GetUserResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    userId: value.userId,
  };
}

export function GetUserResponseToJSON(value?: GetUserResponse | null): any {
  return GetUserResponseToJSONRecursive(value, false);
}
