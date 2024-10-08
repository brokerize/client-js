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

/**
 *
 * @export
 */
export const PortfolioSyncInfoStatus = {
  Pending: "PENDING",
  Incomplete: "INCOMPLETE",
  Complete: "COMPLETE",
  Error: "ERROR",
} as const;
export type PortfolioSyncInfoStatus =
  (typeof PortfolioSyncInfoStatus)[keyof typeof PortfolioSyncInfoStatus];

export function PortfolioSyncInfoStatusFromJSON(
  json: any
): PortfolioSyncInfoStatus {
  return PortfolioSyncInfoStatusFromJSONTyped(json, false);
}

export function PortfolioSyncInfoStatusFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfolioSyncInfoStatus {
  return json as PortfolioSyncInfoStatus;
}

export function PortfolioSyncInfoStatusToJSON(
  value?: PortfolioSyncInfoStatus | null
): any {
  return value as any;
}
