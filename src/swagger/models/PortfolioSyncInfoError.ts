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
  PortfolioSyncInfoErrorAllOf,
  PortfolioSyncInfoErrorAllOfFromJSON,
  PortfolioSyncInfoErrorAllOfFromJSONTyped,
  PortfolioSyncInfoErrorAllOfToJSON,
} from "./PortfolioSyncInfoErrorAllOf";
import {
  PortfolioSyncInfoErrorSpecifics,
  PortfolioSyncInfoErrorSpecificsFromJSON,
  PortfolioSyncInfoErrorSpecificsFromJSONTyped,
  PortfolioSyncInfoErrorSpecificsToJSON,
} from "./PortfolioSyncInfoErrorSpecifics";
import {
  SyncError,
  SyncErrorFromJSON,
  SyncErrorFromJSONTyped,
  SyncErrorToJSON,
} from "./SyncError";

/**
 *
 * @export
 * @interface PortfolioSyncInfoError
 */
export interface PortfolioSyncInfoError {
  /**
   *
   * @type {string}
   * @memberof PortfolioSyncInfoError
   */
  status: PortfolioSyncInfoErrorStatusEnum;
  /**
   *
   * @type {SyncError}
   * @memberof PortfolioSyncInfoError
   */
  error: SyncError;
}

/**
 * @export
 */
export const PortfolioSyncInfoErrorStatusEnum = {
  Error: "ERROR",
} as const;
export type PortfolioSyncInfoErrorStatusEnum =
  (typeof PortfolioSyncInfoErrorStatusEnum)[keyof typeof PortfolioSyncInfoErrorStatusEnum];

export function PortfolioSyncInfoErrorFromJSON(
  json: any
): PortfolioSyncInfoError {
  return PortfolioSyncInfoErrorFromJSONTyped(json, false);
}

export function PortfolioSyncInfoErrorFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoError {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: json["status"],
    error: SyncErrorFromJSON(json["error"]),
  };
}

export function PortfolioSyncInfoErrorToJSONRecursive(
  value?: PortfolioSyncInfoError | null,
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
    error: SyncErrorToJSON(value.error),
  };
}

export function PortfolioSyncInfoErrorToJSON(
  value?: PortfolioSyncInfoError | null
): any {
  return PortfolioSyncInfoErrorToJSONRecursive(value, false);
}
