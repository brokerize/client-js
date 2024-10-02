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
 * @interface SyncError
 */
export interface SyncError {
  /**
   *
   * @type {Date}
   * @memberof SyncError
   */
  date: Date;
  /**
   *
   * @type {string}
   * @memberof SyncError
   */
  message: string;
}

export function SyncErrorFromJSON(json: any): SyncError {
  return SyncErrorFromJSONTyped(json, false);
}

export function SyncErrorFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SyncError {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    date: new Date(json["date"]),
    message: json["message"],
  };
}

export function SyncErrorToJSONRecursive(
  value?: SyncError | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    date: value.date.toISOString(),
    message: value.message,
  };
}

export function SyncErrorToJSON(value?: SyncError | null): any {
  return SyncErrorToJSONRecursive(value, false);
}
