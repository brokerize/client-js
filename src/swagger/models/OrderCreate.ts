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
   *
   * @type {string}
   * @memberof OrderCreate
   */
  brokerExchangeId: string;
  /**
   * The `brokerSecurityId` is the broker-specific identifier for the security to trade. It is provided by the `PreparedTrade` endpoint
   * and must be used in the order creation process to identify the security.
   *
   * This is only optional temporarily and will be required in the future. It will also replace the fields `isin` and `usTicker` for order creations.
   * @type {string}
   * @memberof OrderCreate
   */
  brokerSecurityId?: string;
  /**
   * If a list of cash accounts is provided for the portfolio, this should contain the selected account.
   * @type {string}
   * @memberof OrderCreate
   */
  cashAccountId?: string;
  /**
   *
   * @type {CashQuotation}
   * @memberof OrderCreate
   */
  cashQuotation?: CashQuotation;
  /**
   *
   * @type {Direction}
   * @memberof OrderCreate
   */
  direction: Direction;
  /**
   *
   * @type {number}
   * @memberof OrderCreate
   */
  ifDoneLimit?: number;
  /**
   * Whether this order is supposed to open or close a position. If `PreparedTrade.availableOrderIntents` (and/or the
   * corresponding subscription via `availableOrderIntentsToken`) is available, it should be set.
   *
   * Set it to `close` for orders that are supposed to close an existing position. Note that this is independent
   * of the order's direction (e.g. a short position is closed by a buy order).
   * @type {string}
   * @memberof OrderCreate
   */
  intent?: OrderCreateIntentEnum;
  /**
   * The ISIN of the security to trade, if applicable. Note that at least one of `isin` and `usTicker` must be set.
   *
   * Note that we will make isin optional in a future version of the API.
   * @type {string}
   * @memberof OrderCreate
   */
  isin: string;
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
   * limit (and stop etc.) currency to use for this order
   * @type {string}
   * @memberof OrderCreate
   */
  limitCurrencyIso?: string;
  /**
   *
   * @type {OrderExtension}
   * @memberof OrderCreate
   */
  orderExtension?: OrderExtension;
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
   * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
   * @type {number}
   * @memberof OrderCreate
   */
  quoteLimit?: number;
  /**
   * If a list of sellPositions has been provided in `PrepareTrade`, this must contain the selected position id to sell from
   * @type {string}
   * @memberof OrderCreate
   */
  sellPositionId?: string;
  /**
   * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
   * @type {number}
   * @memberof OrderCreate
   */
  size: number;
  /**
   * The currency in which the order sizes are provided
   * @type {string}
   * @memberof OrderCreate
   */
  sizeUnit?: string;
  /**
   * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
   *
   * For the orderModel `stop`, the order is executed immediately when the stop is reached.
   * For the orderModel `stopLimit`, the order will only be executed with a limit value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
   * @type {number}
   * @memberof OrderCreate
   */
  stop?: number;
  /**
   * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
   * @type {number}
   * @memberof OrderCreate
   */
  stopLimit?: number;
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
   * @type {TrailingDistance}
   * @memberof OrderCreate
   */
  trailingDistance?: TrailingDistance;
  /**
   * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
   * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
   * a limit value. After that, the order can be regarded as a limit order with that limit value.
   * @type {number}
   * @memberof OrderCreate
   */
  trailingLimitTolerance?: number;
  /**
   * The US ticker of the security to trade, if applicable. Note that at least one of `isin` and `usTicker` must be set.
   * @type {string}
   * @memberof OrderCreate
   * @deprecated
   */
  usTicker?: string;
  /**
   *
   * @type {OrderValidity}
   * @memberof OrderCreate
   */
  validity?: OrderValidity;
}

/**
 * @export
 */
export const OrderCreateIntentEnum = {
  Open: "open",
  Close: "close",
} as const;
export type OrderCreateIntentEnum =
  (typeof OrderCreateIntentEnum)[keyof typeof OrderCreateIntentEnum];

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
    brokerExchangeId: json["brokerExchangeId"],
    brokerSecurityId: !exists(json, "brokerSecurityId")
      ? undefined
      : json["brokerSecurityId"],
    cashAccountId: !exists(json, "cashAccountId")
      ? undefined
      : json["cashAccountId"],
    cashQuotation: !exists(json, "cashQuotation")
      ? undefined
      : CashQuotationFromJSON(json["cashQuotation"]),
    direction: DirectionFromJSON(json["direction"]),
    ifDoneLimit: !exists(json, "ifDoneLimit") ? undefined : json["ifDoneLimit"],
    intent: !exists(json, "intent") ? undefined : json["intent"],
    isin: json["isin"],
    limit: !exists(json, "limit") ? undefined : json["limit"],
    limitCurrencyIso: !exists(json, "limitCurrencyIso")
      ? undefined
      : json["limitCurrencyIso"],
    orderExtension: !exists(json, "orderExtension")
      ? undefined
      : OrderExtensionFromJSON(json["orderExtension"]),
    orderModel: OrderModelFromJSON(json["orderModel"]),
    portfolioId: json["portfolioId"],
    quoteId: !exists(json, "quoteId") ? undefined : json["quoteId"],
    quoteLimit: !exists(json, "quoteLimit") ? undefined : json["quoteLimit"],
    sellPositionId: !exists(json, "sellPositionId")
      ? undefined
      : json["sellPositionId"],
    size: json["size"],
    sizeUnit: !exists(json, "sizeUnit") ? undefined : json["sizeUnit"],
    stop: !exists(json, "stop") ? undefined : json["stop"],
    stopLimit: !exists(json, "stopLimit") ? undefined : json["stopLimit"],
    stopLoss: !exists(json, "stopLoss") ? undefined : json["stopLoss"],
    takeProfit: !exists(json, "takeProfit") ? undefined : json["takeProfit"],
    trailingDistance: !exists(json, "trailingDistance")
      ? undefined
      : TrailingDistanceFromJSON(json["trailingDistance"]),
    trailingLimitTolerance: !exists(json, "trailingLimitTolerance")
      ? undefined
      : json["trailingLimitTolerance"],
    usTicker: !exists(json, "usTicker") ? undefined : json["usTicker"],
    validity: !exists(json, "validity")
      ? undefined
      : OrderValidityFromJSON(json["validity"]),
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
    brokerExchangeId: value.brokerExchangeId,
    brokerSecurityId: value.brokerSecurityId,
    cashAccountId: value.cashAccountId,
    cashQuotation: CashQuotationToJSON(value.cashQuotation),
    direction: DirectionToJSON(value.direction),
    ifDoneLimit: value.ifDoneLimit,
    intent: value.intent,
    isin: value.isin,
    limit: value.limit,
    limitCurrencyIso: value.limitCurrencyIso,
    orderExtension: OrderExtensionToJSON(value.orderExtension),
    orderModel: OrderModelToJSON(value.orderModel),
    portfolioId: value.portfolioId,
    quoteId: value.quoteId,
    quoteLimit: value.quoteLimit,
    sellPositionId: value.sellPositionId,
    size: value.size,
    sizeUnit: value.sizeUnit,
    stop: value.stop,
    stopLimit: value.stopLimit,
    stopLoss: value.stopLoss,
    takeProfit: value.takeProfit,
    trailingDistance: TrailingDistanceToJSON(value.trailingDistance),
    trailingLimitTolerance: value.trailingLimitTolerance,
    usTicker: value.usTicker,
    validity: OrderValidityToJSON(value.validity),
  };
}

export function OrderCreateToJSON(value?: OrderCreate | null): any {
  return OrderCreateToJSONRecursive(value, false);
}
