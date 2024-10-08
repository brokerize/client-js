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
 * @interface OrderChanges
 */
export interface OrderChanges {
  /**
   * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
   * order at.
   *
   * A limit can be set for orderModel `limit`
   * @type {number}
   * @memberof OrderChanges
   */
  limit?: number;
  /**
   *
   * @type {OrderModel}
   * @memberof OrderChanges
   */
  orderModel?: OrderModel;
  /**
   *
   * @type {number}
   * @memberof OrderChanges
   */
  size?: number;
  /**
   * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
   *
   * For the orderModel `stop`, the order is executed immediately when the stop is reached.
   * For the orderModel `stopLimit`, the order will only be executed with a limit value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
   * @type {number}
   * @memberof OrderChanges
   */
  stop?: number;
  /**
   * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
   * @type {number}
   * @memberof OrderChanges
   */
  stopLimit?: number;
  /**
   *
   * @type {number}
   * @memberof OrderChanges
   */
  stopLoss?: number;
  /**
   *
   * @type {number}
   * @memberof OrderChanges
   */
  takeProfit?: number;
  /**
   *
   * @type {TrailingDistance}
   * @memberof OrderChanges
   */
  trailingDistance?: TrailingDistance;
  /**
   * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
   * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
   * a limit value. After that, the order can be regarded as a limit order with that limit value.
   * @type {number}
   * @memberof OrderChanges
   */
  trailingLimitTolerance?: number;
  /**
   *
   * @type {OrderValidity}
   * @memberof OrderChanges
   */
  validity?: OrderValidity;
}

export function OrderChangesFromJSON(json: any): OrderChanges {
  return OrderChangesFromJSONTyped(json, false);
}

export function OrderChangesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderChanges {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    limit: !exists(json, "limit") ? undefined : json["limit"],
    orderModel: !exists(json, "orderModel")
      ? undefined
      : OrderModelFromJSON(json["orderModel"]),
    size: !exists(json, "size") ? undefined : json["size"],
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
    validity: !exists(json, "validity")
      ? undefined
      : OrderValidityFromJSON(json["validity"]),
  };
}

export function OrderChangesToJSONRecursive(
  value?: OrderChanges | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    limit: value.limit,
    orderModel: OrderModelToJSON(value.orderModel),
    size: value.size,
    stop: value.stop,
    stopLimit: value.stopLimit,
    stopLoss: value.stopLoss,
    takeProfit: value.takeProfit,
    trailingDistance: TrailingDistanceToJSON(value.trailingDistance),
    trailingLimitTolerance: value.trailingLimitTolerance,
    validity: OrderValidityToJSON(value.validity),
  };
}

export function OrderChangesToJSON(value?: OrderChanges | null): any {
  return OrderChangesToJSONRecursive(value, false);
}
