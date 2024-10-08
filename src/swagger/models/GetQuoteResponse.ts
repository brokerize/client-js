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
  Amount,
  AmountFromJSON,
  AmountFromJSONTyped,
  AmountToJSON,
} from "./Amount";
import {
  Direction,
  DirectionFromJSON,
  DirectionFromJSONTyped,
  DirectionToJSON,
} from "./Direction";
import {
  OrderCostEstimation,
  OrderCostEstimationFromJSON,
  OrderCostEstimationFromJSONTyped,
  OrderCostEstimationToJSON,
} from "./OrderCostEstimation";
import {
  QuoteExpiration,
  QuoteExpirationFromJSON,
  QuoteExpirationFromJSONTyped,
  QuoteExpirationToJSON,
} from "./QuoteExpiration";

/**
 *
 * @export
 * @interface GetQuoteResponse
 */
export interface GetQuoteResponse {
  /**
   *
   * @type {OrderCostEstimation}
   * @memberof GetQuoteResponse
   */
  costEstimation?: OrderCostEstimation;
  /**
   * If the broker does not return a cost estimation summary, but it is possible to retrieve a cost estimation summary using the token.
   * @type {string}
   * @memberof GetQuoteResponse
   * @deprecated
   */
  costEstimationToken?: string;
  /**
   *
   * @type {Direction}
   * @memberof GetQuoteResponse
   */
  direction: Direction;
  /**
   *
   * @type {QuoteExpiration}
   * @memberof GetQuoteResponse
   */
  expiration?: QuoteExpiration;
  /**
   *
   * @type {string}
   * @memberof GetQuoteResponse
   */
  isin: string;
  /**
   *
   * @type {Amount}
   * @memberof GetQuoteResponse
   */
  quotation: Amount;
  /**
   * Some token that identifies this exact quote response (referenced in the following trade requests).
   * @type {string}
   * @memberof GetQuoteResponse
   */
  quoteId: string;
  /**
   * If provided, the maximum available size that can be traded at the given price.
   * @type {number}
   * @memberof GetQuoteResponse
   */
  size?: number;
  /**
   * The human-readable name of the quote's source (e.g. the name of a stock exchange).
   * @type {string}
   * @memberof GetQuoteResponse
   */
  sourceName?: string;
  /**
   *
   * @type {Amount}
   * @memberof GetQuoteResponse
   */
  totalAmount?: Amount;
}

export function GetQuoteResponseFromJSON(json: any): GetQuoteResponse {
  return GetQuoteResponseFromJSONTyped(json, false);
}

export function GetQuoteResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetQuoteResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    costEstimation: !exists(json, "costEstimation")
      ? undefined
      : OrderCostEstimationFromJSON(json["costEstimation"]),
    costEstimationToken: !exists(json, "costEstimationToken")
      ? undefined
      : json["costEstimationToken"],
    direction: DirectionFromJSON(json["direction"]),
    expiration: !exists(json, "expiration")
      ? undefined
      : QuoteExpirationFromJSON(json["expiration"]),
    isin: json["isin"],
    quotation: AmountFromJSON(json["quotation"]),
    quoteId: json["quoteId"],
    size: !exists(json, "size") ? undefined : json["size"],
    sourceName: !exists(json, "sourceName") ? undefined : json["sourceName"],
    totalAmount: !exists(json, "totalAmount")
      ? undefined
      : AmountFromJSON(json["totalAmount"]),
  };
}

export function GetQuoteResponseToJSONRecursive(
  value?: GetQuoteResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    costEstimation: OrderCostEstimationToJSON(value.costEstimation),
    costEstimationToken: value.costEstimationToken,
    direction: DirectionToJSON(value.direction),
    expiration: QuoteExpirationToJSON(value.expiration),
    isin: value.isin,
    quotation: AmountToJSON(value.quotation),
    quoteId: value.quoteId,
    size: value.size,
    sourceName: value.sourceName,
    totalAmount: AmountToJSON(value.totalAmount),
  };
}

export function GetQuoteResponseToJSON(value?: GetQuoteResponse | null): any {
  return GetQuoteResponseToJSONRecursive(value, false);
}
