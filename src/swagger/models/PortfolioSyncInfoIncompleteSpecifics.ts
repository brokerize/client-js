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
/**
 *
 * @export
 * @interface PortfolioSyncInfoIncompleteSpecifics
 */
export interface PortfolioSyncInfoIncompleteSpecifics {
  /**
   *
   * @type {Date}
   * @memberof PortfolioSyncInfoIncompleteSpecifics
   */
  lastSync?: Date;
}

export function PortfolioSyncInfoIncompleteSpecificsFromJSON(
  json: any
): PortfolioSyncInfoIncompleteSpecifics {
  return PortfolioSyncInfoIncompleteSpecificsFromJSONTyped(json, false);
}

export function PortfolioSyncInfoIncompleteSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoIncompleteSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    lastSync: !exists(json, "lastSync")
      ? undefined
      : new Date(json["lastSync"]),
  };
}

export function PortfolioSyncInfoIncompleteSpecificsToJSONRecursive(
  value?: PortfolioSyncInfoIncompleteSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    lastSync:
      value.lastSync === undefined ? undefined : value.lastSync.toISOString(),
  };
}

export function PortfolioSyncInfoIncompleteSpecificsToJSON(
  value?: PortfolioSyncInfoIncompleteSpecifics | null
): any {
  return PortfolioSyncInfoIncompleteSpecificsToJSONRecursive(value, false);
}
