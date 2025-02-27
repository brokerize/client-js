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
 * @interface TradeStatisticsDateRange
 */
export interface TradeStatisticsDateRange {
  /**
   *
   * @type {string}
   * @memberof TradeStatisticsDateRange
   */
  dateString: string;
  /**
   *
   * @type {Date}
   * @memberof TradeStatisticsDateRange
   */
  from: Date;
  /**
   *
   * @type {Date}
   * @memberof TradeStatisticsDateRange
   */
  to: Date;
}

export function TradeStatisticsDateRangeFromJSON(
  json: any
): TradeStatisticsDateRange {
  return TradeStatisticsDateRangeFromJSONTyped(json, false);
}

export function TradeStatisticsDateRangeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeStatisticsDateRange {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    dateString: json["dateString"],
    from: new Date(json["from"]),
    to: new Date(json["to"]),
  };
}

export function TradeStatisticsDateRangeToJSONRecursive(
  value?: TradeStatisticsDateRange | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    dateString: value.dateString,
    from: value.from.toISOString(),
    to: value.to.toISOString(),
  };
}

export function TradeStatisticsDateRangeToJSON(
  value?: TradeStatisticsDateRange | null
): any {
  return TradeStatisticsDateRangeToJSONRecursive(value, false);
}
