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
  SyncError,
  SyncErrorFromJSON,
  SyncErrorFromJSONTyped,
  SyncErrorToJSON,
} from "./SyncError";

/**
 *
 * @export
 * @interface SessionSyncInfoErrorSpecifics
 */
export interface SessionSyncInfoErrorSpecifics {
  /**
   *
   * @type {SyncError}
   * @memberof SessionSyncInfoErrorSpecifics
   */
  error?: SyncError;
}

export function SessionSyncInfoErrorSpecificsFromJSON(
  json: any
): SessionSyncInfoErrorSpecifics {
  return SessionSyncInfoErrorSpecificsFromJSONTyped(json, false);
}

export function SessionSyncInfoErrorSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SessionSyncInfoErrorSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    error: !exists(json, "error")
      ? undefined
      : SyncErrorFromJSON(json["error"]),
  };
}

export function SessionSyncInfoErrorSpecificsToJSONRecursive(
  value?: SessionSyncInfoErrorSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    error: SyncErrorToJSON(value.error),
  };
}

export function SessionSyncInfoErrorSpecificsToJSON(
  value?: SessionSyncInfoErrorSpecifics | null
): any {
  return SessionSyncInfoErrorSpecificsToJSONRecursive(value, false);
}
