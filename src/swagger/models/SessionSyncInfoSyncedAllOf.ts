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
 * @interface SessionSyncInfoSyncedAllOf
 */
export interface SessionSyncInfoSyncedAllOf {
  /**
   *
   * @type {string}
   * @memberof SessionSyncInfoSyncedAllOf
   */
  status?: SessionSyncInfoSyncedAllOfStatusEnum;
}

/**
 * @export
 */
export const SessionSyncInfoSyncedAllOfStatusEnum = {
  Synced: "SYNCED",
} as const;
export type SessionSyncInfoSyncedAllOfStatusEnum =
  (typeof SessionSyncInfoSyncedAllOfStatusEnum)[keyof typeof SessionSyncInfoSyncedAllOfStatusEnum];

export function SessionSyncInfoSyncedAllOfFromJSON(
  json: any
): SessionSyncInfoSyncedAllOf {
  return SessionSyncInfoSyncedAllOfFromJSONTyped(json, false);
}

export function SessionSyncInfoSyncedAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SessionSyncInfoSyncedAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, "status") ? undefined : json["status"],
  };
}

export function SessionSyncInfoSyncedAllOfToJSONRecursive(
  value?: SessionSyncInfoSyncedAllOf | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    status: value.status,
  };
}

export function SessionSyncInfoSyncedAllOfToJSON(
  value?: SessionSyncInfoSyncedAllOf | null
): any {
  return SessionSyncInfoSyncedAllOfToJSONRecursive(value, false);
}
