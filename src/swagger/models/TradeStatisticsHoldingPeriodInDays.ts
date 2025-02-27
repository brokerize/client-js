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
 * @interface TradeStatisticsHoldingPeriodInDays
 */
export interface TradeStatisticsHoldingPeriodInDays {
  /**
   * The average holding period in days.
   * @type {number}
   * @memberof TradeStatisticsHoldingPeriodInDays
   */
  average: number;
  /**
   * The maximum holding period in days.
   * @type {number}
   * @memberof TradeStatisticsHoldingPeriodInDays
   */
  max: number;
  /**
   * The minimum holding period in days.
   * @type {number}
   * @memberof TradeStatisticsHoldingPeriodInDays
   */
  min: number;
}

export function TradeStatisticsHoldingPeriodInDaysFromJSON(
  json: any
): TradeStatisticsHoldingPeriodInDays {
  return TradeStatisticsHoldingPeriodInDaysFromJSONTyped(json, false);
}

export function TradeStatisticsHoldingPeriodInDaysFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeStatisticsHoldingPeriodInDays {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    average: json["average"],
    max: json["max"],
    min: json["min"],
  };
}

export function TradeStatisticsHoldingPeriodInDaysToJSONRecursive(
  value?: TradeStatisticsHoldingPeriodInDays | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    average: value.average,
    max: value.max,
    min: value.min,
  };
}

export function TradeStatisticsHoldingPeriodInDaysToJSON(
  value?: TradeStatisticsHoldingPeriodInDays | null
): any {
  return TradeStatisticsHoldingPeriodInDaysToJSONRecursive(value, false);
}
