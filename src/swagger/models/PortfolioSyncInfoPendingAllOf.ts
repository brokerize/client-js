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
 * @interface PortfolioSyncInfoPendingAllOf
 */
export interface PortfolioSyncInfoPendingAllOf {
  /**
   *
   * @type {string}
   * @memberof PortfolioSyncInfoPendingAllOf
   */
  status?: PortfolioSyncInfoPendingAllOfStatusEnum;
}

/**
 * @export
 */
export const PortfolioSyncInfoPendingAllOfStatusEnum = {
  Pending: "PENDING",
} as const;
export type PortfolioSyncInfoPendingAllOfStatusEnum =
  (typeof PortfolioSyncInfoPendingAllOfStatusEnum)[keyof typeof PortfolioSyncInfoPendingAllOfStatusEnum];

export function PortfolioSyncInfoPendingAllOfFromJSON(
  json: any
): PortfolioSyncInfoPendingAllOf {
  return PortfolioSyncInfoPendingAllOfFromJSONTyped(json, false);
}

export function PortfolioSyncInfoPendingAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoPendingAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, "status") ? undefined : json["status"],
  };
}

export function PortfolioSyncInfoPendingAllOfToJSONRecursive(
  value?: PortfolioSyncInfoPendingAllOf | null,
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

export function PortfolioSyncInfoPendingAllOfToJSON(
  value?: PortfolioSyncInfoPendingAllOf | null
): any {
  return PortfolioSyncInfoPendingAllOfToJSONRecursive(value, false);
}
