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
  TradeStatisticsHoldingPeriodInDays,
  TradeStatisticsHoldingPeriodInDaysFromJSON,
  TradeStatisticsHoldingPeriodInDaysFromJSONTyped,
  TradeStatisticsHoldingPeriodInDaysToJSON,
} from "./TradeStatisticsHoldingPeriodInDays";

/**
 *
 * @export
 * @interface TradeStatistics
 */
export interface TradeStatistics {
  /**
   * Which fraction of the trades where winners. 1 is 100%, so a value of 1 would indicate
   * "all trades were winners".
   * @type {number}
   * @memberof TradeStatistics
   */
  hitRate: number;
  /**
   *
   * @type {TradeStatisticsHoldingPeriodInDays}
   * @memberof TradeStatistics
   */
  holdingPeriodInDays: TradeStatisticsHoldingPeriodInDays;
  /**
   * The maximum number of consecutive losing trades in the given list of trades.
   * @type {number}
   * @memberof TradeStatistics
   */
  longestLosingStreak: number;
  /**
   * The maximum number of consecutive winning trades in the given list of trades.
   * @type {number}
   * @memberof TradeStatistics
   */
  longestWinningStreak: number;
  /**
   * How many trades had a negative profit/loss.
   * @type {number}
   * @memberof TradeStatistics
   */
  loserCount: number;
  /**
   * How many trades are part of the calculation.
   * @type {number}
   * @memberof TradeStatistics
   */
  tradeCount: number;
  /**
   * How many trades had a positive profit/loss.
   * @type {number}
   * @memberof TradeStatistics
   */
  winnerCount: number;
}

export function TradeStatisticsFromJSON(json: any): TradeStatistics {
  return TradeStatisticsFromJSONTyped(json, false);
}

export function TradeStatisticsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeStatistics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    hitRate: json["hitRate"],
    holdingPeriodInDays: TradeStatisticsHoldingPeriodInDaysFromJSON(
      json["holdingPeriodInDays"]
    ),
    longestLosingStreak: json["longestLosingStreak"],
    longestWinningStreak: json["longestWinningStreak"],
    loserCount: json["loserCount"],
    tradeCount: json["tradeCount"],
    winnerCount: json["winnerCount"],
  };
}

export function TradeStatisticsToJSONRecursive(
  value?: TradeStatistics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    hitRate: value.hitRate,
    holdingPeriodInDays: TradeStatisticsHoldingPeriodInDaysToJSON(
      value.holdingPeriodInDays
    ),
    longestLosingStreak: value.longestLosingStreak,
    longestWinningStreak: value.longestWinningStreak,
    loserCount: value.loserCount,
    tradeCount: value.tradeCount,
    winnerCount: value.winnerCount,
  };
}

export function TradeStatisticsToJSON(value?: TradeStatistics | null): any {
  return TradeStatisticsToJSONRecursive(value, false);
}
