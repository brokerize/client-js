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
  Security,
  SecurityFromJSON,
  SecurityFromJSONTyped,
  SecurityToJSON,
} from "./Security";

/**
 *
 * @export
 * @interface TradeDraftOrderCreate
 */
export interface TradeDraftOrderCreate {
  /**
   *
   * @type {Direction}
   * @memberof TradeDraftOrderCreate
   */
  direction: Direction;
  /**
   *
   * @type {string}
   * @memberof TradeDraftOrderCreate
   */
  exchangeId: string;
  /**
   * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
   * order at.
   *
   * A limit can be set for orderModel `limit`
   * @type {number}
   * @memberof TradeDraftOrderCreate
   */
  limit?: number;
  /**
   * limit (and stop etc.) currency to use for this order
   * @type {string}
   * @memberof TradeDraftOrderCreate
   */
  limitCurrencyIso?: string;
  /**
   *
   * @type {OrderExtension}
   * @memberof TradeDraftOrderCreate
   */
  orderExtension?: OrderExtension;
  /**
   *
   * @type {OrderModel}
   * @memberof TradeDraftOrderCreate
   */
  orderModel: OrderModel;
  /**
   *
   * @type {string}
   * @memberof TradeDraftOrderCreate
   */
  portfolioId: string;
  /**
   * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
   * @type {number}
   * @memberof TradeDraftOrderCreate
   */
  quoteLimit?: number;
  /**
   *
   * @type {Security}
   * @memberof TradeDraftOrderCreate
   */
  security: Security;
  /**
   * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
   * @type {number}
   * @memberof TradeDraftOrderCreate
   */
  size: number;
  /**
   * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
   *
   * For the orderModel `stop`, the order is executed immediately when the stop is reached.
   * For the orderModel `stopLimit`, the order will only be executed with a limit value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
   * @type {number}
   * @memberof TradeDraftOrderCreate
   */
  stop?: number;
  /**
   * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
   * @type {number}
   * @memberof TradeDraftOrderCreate
   */
  stopLimit?: number;
  /**
   *
   * @type {OrderValidity}
   * @memberof TradeDraftOrderCreate
   */
  validity?: OrderValidity;
}

export function TradeDraftOrderCreateFromJSON(
  json: any
): TradeDraftOrderCreate {
  return TradeDraftOrderCreateFromJSONTyped(json, false);
}

export function TradeDraftOrderCreateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeDraftOrderCreate {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    direction: DirectionFromJSON(json["direction"]),
    exchangeId: json["exchangeId"],
    limit: !exists(json, "limit") ? undefined : json["limit"],
    limitCurrencyIso: !exists(json, "limitCurrencyIso")
      ? undefined
      : json["limitCurrencyIso"],
    orderExtension: !exists(json, "orderExtension")
      ? undefined
      : OrderExtensionFromJSON(json["orderExtension"]),
    orderModel: OrderModelFromJSON(json["orderModel"]),
    portfolioId: json["portfolioId"],
    quoteLimit: !exists(json, "quoteLimit") ? undefined : json["quoteLimit"],
    security: SecurityFromJSON(json["security"]),
    size: json["size"],
    stop: !exists(json, "stop") ? undefined : json["stop"],
    stopLimit: !exists(json, "stopLimit") ? undefined : json["stopLimit"],
    validity: !exists(json, "validity")
      ? undefined
      : OrderValidityFromJSON(json["validity"]),
  };
}

export function TradeDraftOrderCreateToJSONRecursive(
  value?: TradeDraftOrderCreate | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    direction: DirectionToJSON(value.direction),
    exchangeId: value.exchangeId,
    limit: value.limit,
    limitCurrencyIso: value.limitCurrencyIso,
    orderExtension: OrderExtensionToJSON(value.orderExtension),
    orderModel: OrderModelToJSON(value.orderModel),
    portfolioId: value.portfolioId,
    quoteLimit: value.quoteLimit,
    security: SecurityToJSON(value.security),
    size: value.size,
    stop: value.stop,
    stopLimit: value.stopLimit,
    validity: OrderValidityToJSON(value.validity),
  };
}

export function TradeDraftOrderCreateToJSON(
  value?: TradeDraftOrderCreate | null
): any {
  return TradeDraftOrderCreateToJSONRecursive(value, false);
}
