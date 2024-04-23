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
import {
  AuthInfo,
  AuthInfoFromJSON,
  AuthInfoFromJSONTyped,
  AuthInfoToJSON,
} from "./AuthInfo";
import {
  SessionSyncInfo,
  SessionSyncInfoFromJSON,
  SessionSyncInfoFromJSONTyped,
  SessionSyncInfoToJSON,
} from "./SessionSyncInfo";
import {
  SyncError,
  SyncErrorFromJSON,
  SyncErrorFromJSONTyped,
  SyncErrorToJSON,
} from "./SyncError";

/**
 *
 * @export
 * @interface Session
 */
export interface Session {
  /**
   *
   * @type {AuthInfo}
   * @memberof Session
   */
  authInfo?: AuthInfo;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  brokerName: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  id: string;
  /**
   *
   * @type {Date}
   * @memberof Session
   * @deprecated
   */
  lastSuccessfulSync?: Date;
  /**
   *
   * @type {SyncError}
   * @memberof Session
   */
  syncError?: SyncError;
  /**
   *
   * @type {SessionSyncInfo}
   * @memberof Session
   */
  syncInfo: SessionSyncInfo;
}

export function SessionFromJSON(json: any): Session {
  return SessionFromJSONTyped(json, false);
}

export function SessionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Session {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authInfo: !exists(json, "authInfo")
      ? undefined
      : AuthInfoFromJSON(json["authInfo"]),
    brokerName: json["brokerName"],
    id: json["id"],
    lastSuccessfulSync: !exists(json, "lastSuccessfulSync")
      ? undefined
      : new Date(json["lastSuccessfulSync"]),
    syncError: !exists(json, "syncError")
      ? undefined
      : SyncErrorFromJSON(json["syncError"]),
    syncInfo: SessionSyncInfoFromJSON(json["syncInfo"]),
  };
}

export function SessionToJSONRecursive(
  value?: Session | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    authInfo: AuthInfoToJSON(value.authInfo),
    brokerName: value.brokerName,
    id: value.id,
    lastSuccessfulSync:
      value.lastSuccessfulSync === undefined
        ? undefined
        : value.lastSuccessfulSync.toISOString(),
    syncError: SyncErrorToJSON(value.syncError),
    syncInfo: SessionSyncInfoToJSON(value.syncInfo),
  };
}

export function SessionToJSON(value?: Session | null): any {
  return SessionToJSONRecursive(value, false);
}
