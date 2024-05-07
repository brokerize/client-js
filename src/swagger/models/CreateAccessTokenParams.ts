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
 * @interface CreateAccessTokenParams
 */
export interface CreateAccessTokenParams {
  /**
   * Number of days the token should be valid. Currently, values between 1 and 180 are allowed.
   * @type {number}
   * @memberof CreateAccessTokenParams
   */
  expiresInDays: number;
  /**
   * unique name of the access token
   * @type {string}
   * @memberof CreateAccessTokenParams
   */
  name: string;
  /**
   * permissions the access token should have. The following permissions are currently supported:
   *
   * - `admin-report:all` (gives access to all order reports that the user has management access to)
   * - `admin-report:<clientId>` (gives access to order reports for the given client if the user has management access)
   * - `admin-urls:all` (allows the user to manage OAuth URLs and origins for all clients that the user has management access to)
   * - `admin-urls:<clientId>` (allows the user to manage OAuth URLs and origins for the given client if the user has management access)
   * @type {Array<string>}
   * @memberof CreateAccessTokenParams
   */
  permissions: Array<string>;
}

export function CreateAccessTokenParamsFromJSON(
  json: any
): CreateAccessTokenParams {
  return CreateAccessTokenParamsFromJSONTyped(json, false);
}

export function CreateAccessTokenParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateAccessTokenParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    expiresInDays: json["expiresInDays"],
    name: json["name"],
    permissions: json["permissions"],
  };
}

export function CreateAccessTokenParamsToJSONRecursive(
  value?: CreateAccessTokenParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    expiresInDays: value.expiresInDays,
    name: value.name,
    permissions: value.permissions,
  };
}

export function CreateAccessTokenParamsToJSON(
  value?: CreateAccessTokenParams | null
): any {
  return CreateAccessTokenParamsToJSONRecursive(value, false);
}
