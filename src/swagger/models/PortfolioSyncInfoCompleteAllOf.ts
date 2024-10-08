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
 * @interface PortfolioSyncInfoCompleteAllOf
 */
export interface PortfolioSyncInfoCompleteAllOf {
  /**
   *
   * @type {string}
   * @memberof PortfolioSyncInfoCompleteAllOf
   */
  status?: PortfolioSyncInfoCompleteAllOfStatusEnum;
}

/**
 * @export
 */
export const PortfolioSyncInfoCompleteAllOfStatusEnum = {
  Complete: "COMPLETE",
} as const;
export type PortfolioSyncInfoCompleteAllOfStatusEnum =
  (typeof PortfolioSyncInfoCompleteAllOfStatusEnum)[keyof typeof PortfolioSyncInfoCompleteAllOfStatusEnum];

export function PortfolioSyncInfoCompleteAllOfFromJSON(
  json: any
): PortfolioSyncInfoCompleteAllOf {
  return PortfolioSyncInfoCompleteAllOfFromJSONTyped(json, false);
}

export function PortfolioSyncInfoCompleteAllOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoCompleteAllOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, "status") ? undefined : json["status"],
  };
}

export function PortfolioSyncInfoCompleteAllOfToJSONRecursive(
  value?: PortfolioSyncInfoCompleteAllOf | null,
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

export function PortfolioSyncInfoCompleteAllOfToJSON(
  value?: PortfolioSyncInfoCompleteAllOf | null
): any {
  return PortfolioSyncInfoCompleteAllOfToJSONRecursive(value, false);
}
