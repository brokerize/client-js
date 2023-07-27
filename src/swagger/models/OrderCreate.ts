/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 * The version of the OpenAPI document: 0.0.1-preview
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import {
  CashQuotation,
  CashQuotationFromJSON,
  CashQuotationFromJSONTyped,
  CashQuotationToJSON,
} from "./CashQuotation";
import {
  Direction,
  DirectionFromJSON,
  DirectionFromJSONTyped,
  DirectionToJSON,
} from "./Direction";
import {
  OrderExtension,
  OrderExtensionFromJSON,
  OrderExtensionFromJSONTyped,
  OrderExtensionToJSON,
} from "./OrderExtension";
import {
  OrderModel,
  OrderModelFromJSON,
  OrderModelFromJSONTyped,
  OrderModelToJSON,
} from "./OrderModel";
import {
  OrderValidity,
  OrderValidityFromJSON,
  OrderValidityFromJSONTyped,
  OrderValidityToJSON,
} from "./OrderValidity";
import {
  TrailingDistance,
  TrailingDistanceFromJSON,
  TrailingDistanceFromJSONTyped,
  TrailingDistanceToJSON,
} from "./TrailingDistance";

/**
 *
 * @export
 * @interface OrderCreate
 */
export interface OrderCreate {
  /**
   * limit (and stop etc.) currency to use for this order
   * @type {string}
   * @memberof OrderCreate
   */
  limitCurrencyIso?: string;
  /**
   *
   * @type {number}
   * @memberof OrderCreate
   */
  stopLoss?: number;
  /**
   *
   * @type {number}
   * @memberof OrderCreate
   */
  takeProfit?: number;
  /**
   *
   * @type {number}
   * @memberof OrderCreate
   */
  ifDoneLimit?: number;
  /**
   * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
   * @type {number}
   * @memberof OrderCreate
   */
  quoteLimit?: number;
  /**
   *
   * @type {OrderValidity}
   * @memberof OrderCreate
   */
  validity?: OrderValidity;
  /**
   * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
   * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
   * a limit value. After that, the order can be regarded as a limit order with that limit value.
   * @type {number}
   * @memberof OrderCreate
   */
  trailingLimitTolerance?: number;
  /**
   *
   * @type {TrailingDistance}
   * @memberof OrderCreate
   */
  trailingDistance?: TrailingDistance;
  /**
   * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
   * @type {number}
   * @memberof OrderCreate
   */
  stopLimit?: number;
  /**
   * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
   *
   * For the orderModel `stop`, the order is executed immediately when the stop is reached.
   * For the orderModel `stopLimit`, the order will only be executed with a limt value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
   * @type {number}
   * @memberof OrderCreate
   */
  stop?: number;
  /**
   * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
   * order at.
   *
   * A limit can be set for orderModel `limit`
   * @type {number}
   * @memberof OrderCreate
   */
  limit?: number;
  /**
   *
   * @type {CashQuotation}
   * @memberof OrderCreate
   */
  cashQuotation?: CashQuotation;
  /**
   *
   * @type {OrderExtension}
   * @memberof OrderCreate
   */
  orderExtension?: OrderExtension;
  /**
   * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
   * @type {number}
   * @memberof OrderCreate
   */
  size: number;
  /**
   *
   * @type {string}
   * @memberof OrderCreate
   */
  isin: string;
  /**
   *
   * @type {string}
   * @memberof OrderCreate
   */
  brokerExchangeId: string;
  /**
   *
   * @type {Direction}
   * @memberof OrderCreate
   */
  direction: Direction;
  /**
   *
   * @type {OrderModel}
   * @memberof OrderCreate
   */
  orderModel: OrderModel;
  /**
   *
   * @type {string}
   * @memberof OrderCreate
   */
  portfolioId: string;
  /**
   * For `orderModel=quote`: the quoteId, as retrieved from `GetQuote`.
   * @type {string}
   * @memberof OrderCreate
   */
  quoteId?: string;
  /**
   * If a list of sellPositions has been provided in `PrepareTrade`, this must contain the selected position id to sell from
   * @type {string}
   * @memberof OrderCreate
   */
  sellPositionId?: string;
  /**
   * If a list of cash accounts is provided for the portfolio, this should contain the selected account.
   * @type {string}
   * @memberof OrderCreate
   */
  cashAccountId?: string;
  /**
   *
   * @type {string}
   * @memberof OrderCreate
   */
  sizeUnit?: string;
}

export function OrderCreateFromJSON(json: any): OrderCreate {
  return OrderCreateFromJSONTyped(json, false);
}

export function OrderCreateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderCreate {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    limitCurrencyIso: !exists(json, "limitCurrencyIso")
      ? undefined
      : json["limitCurrencyIso"],
    stopLoss: !exists(json, "stopLoss") ? undefined : json["stopLoss"],
    takeProfit: !exists(json, "takeProfit") ? undefined : json["takeProfit"],
    ifDoneLimit: !exists(json, "ifDoneLimit") ? undefined : json["ifDoneLimit"],
    quoteLimit: !exists(json, "quoteLimit") ? undefined : json["quoteLimit"],
    validity: !exists(json, "validity")
      ? undefined
      : OrderValidityFromJSON(json["validity"]),
    trailingLimitTolerance: !exists(json, "trailingLimitTolerance")
      ? undefined
      : json["trailingLimitTolerance"],
    trailingDistance: !exists(json, "trailingDistance")
      ? undefined
      : TrailingDistanceFromJSON(json["trailingDistance"]),
    stopLimit: !exists(json, "stopLimit") ? undefined : json["stopLimit"],
    stop: !exists(json, "stop") ? undefined : json["stop"],
    limit: !exists(json, "limit") ? undefined : json["limit"],
    cashQuotation: !exists(json, "cashQuotation")
      ? undefined
      : CashQuotationFromJSON(json["cashQuotation"]),
    orderExtension: !exists(json, "orderExtension")
      ? undefined
      : OrderExtensionFromJSON(json["orderExtension"]),
    size: json["size"],
    isin: json["isin"],
    brokerExchangeId: json["brokerExchangeId"],
    direction: DirectionFromJSON(json["direction"]),
    orderModel: OrderModelFromJSON(json["orderModel"]),
    portfolioId: json["portfolioId"],
    quoteId: !exists(json, "quoteId") ? undefined : json["quoteId"],
    sellPositionId: !exists(json, "sellPositionId")
      ? undefined
      : json["sellPositionId"],
    cashAccountId: !exists(json, "cashAccountId")
      ? undefined
      : json["cashAccountId"],
    sizeUnit: !exists(json, "sizeUnit") ? undefined : json["sizeUnit"],
  };
}

export function OrderCreateToJSONRecursive(
  value?: OrderCreate | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    limitCurrencyIso: value.limitCurrencyIso,
    stopLoss: value.stopLoss,
    takeProfit: value.takeProfit,
    ifDoneLimit: value.ifDoneLimit,
    quoteLimit: value.quoteLimit,
    validity: OrderValidityToJSON(value.validity),
    trailingLimitTolerance: value.trailingLimitTolerance,
    trailingDistance: TrailingDistanceToJSON(value.trailingDistance),
    stopLimit: value.stopLimit,
    stop: value.stop,
    limit: value.limit,
    cashQuotation: CashQuotationToJSON(value.cashQuotation),
    orderExtension: OrderExtensionToJSON(value.orderExtension),
    size: value.size,
    isin: value.isin,
    brokerExchangeId: value.brokerExchangeId,
    direction: DirectionToJSON(value.direction),
    orderModel: OrderModelToJSON(value.orderModel),
    portfolioId: value.portfolioId,
    quoteId: value.quoteId,
    sellPositionId: value.sellPositionId,
    cashAccountId: value.cashAccountId,
    sizeUnit: value.sizeUnit,
  };
}

export function OrderCreateToJSON(value?: OrderCreate | null): any {
  return OrderCreateToJSONRecursive(value, false);
}
