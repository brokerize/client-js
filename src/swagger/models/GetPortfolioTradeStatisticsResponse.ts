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
  TradeStatisticsItem,
  TradeStatisticsItemFromJSON,
  TradeStatisticsItemFromJSONTyped,
  TradeStatisticsItemToJSON,
} from "./TradeStatisticsItem";

/**
 *
 * @export
 * @interface GetPortfolioTradeStatisticsResponse
 */
export interface GetPortfolioTradeStatisticsResponse {
  /**
   *
   * @type {Array<TradeStatisticsItem>}
   * @memberof GetPortfolioTradeStatisticsResponse
   */
  data: Array<TradeStatisticsItem>;
}

export function GetPortfolioTradeStatisticsResponseFromJSON(
  json: any
): GetPortfolioTradeStatisticsResponse {
  return GetPortfolioTradeStatisticsResponseFromJSONTyped(json, false);
}

export function GetPortfolioTradeStatisticsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetPortfolioTradeStatisticsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: (json["data"] as Array<any>).map(TradeStatisticsItemFromJSON),
  };
}

export function GetPortfolioTradeStatisticsResponseToJSONRecursive(
  value?: GetPortfolioTradeStatisticsResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    data: (value.data as Array<any>).map(TradeStatisticsItemToJSON),
  };
}

export function GetPortfolioTradeStatisticsResponseToJSON(
  value?: GetPortfolioTradeStatisticsResponse | null
): any {
  return GetPortfolioTradeStatisticsResponseToJSONRecursive(value, false);
}
