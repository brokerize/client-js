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
  SyncError,
  SyncErrorFromJSON,
  SyncErrorFromJSONTyped,
  SyncErrorToJSON,
} from "./SyncError";

/**
 *
 * @export
 * @interface PortfolioSyncInfoErrorSpecifics
 */
export interface PortfolioSyncInfoErrorSpecifics {
  /**
   *
   * @type {SyncError}
   * @memberof PortfolioSyncInfoErrorSpecifics
   */
  error?: SyncError;
}

export function PortfolioSyncInfoErrorSpecificsFromJSON(
  json: any
): PortfolioSyncInfoErrorSpecifics {
  return PortfolioSyncInfoErrorSpecificsFromJSONTyped(json, false);
}

export function PortfolioSyncInfoErrorSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoErrorSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    error: !exists(json, "error")
      ? undefined
      : SyncErrorFromJSON(json["error"]),
  };
}

export function PortfolioSyncInfoErrorSpecificsToJSONRecursive(
  value?: PortfolioSyncInfoErrorSpecifics | null,
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

export function PortfolioSyncInfoErrorSpecificsToJSON(
  value?: PortfolioSyncInfoErrorSpecifics | null
): any {
  return PortfolioSyncInfoErrorSpecificsToJSONRecursive(value, false);
}
