/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 * The version of the OpenAPI document: 1.1.0
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
  OrderExecution,
  OrderExecutionFromJSON,
  OrderExecutionFromJSONTyped,
  OrderExecutionToJSON,
} from "./OrderExecution";
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
  OrderStatus,
  OrderStatusFromJSON,
  OrderStatusFromJSONTyped,
  OrderStatusToJSON,
} from "./OrderStatus";
import {
  OrderValidity,
  OrderValidityFromJSON,
  OrderValidityFromJSONTyped,
  OrderValidityToJSON,
} from "./OrderValidity";
import {
  OrderValidityType,
  OrderValidityTypeFromJSON,
  OrderValidityTypeFromJSONTyped,
  OrderValidityTypeToJSON,
} from "./OrderValidityType";
import {
  Security,
  SecurityFromJSON,
  SecurityFromJSONTyped,
  SecurityToJSON,
} from "./Security";
import {
  TrailingDistance,
  TrailingDistanceFromJSON,
  TrailingDistanceFromJSONTyped,
  TrailingDistanceToJSON,
} from "./TrailingDistance";

/**
 *
 * @export
 * @interface Order
 */
export interface Order {
  /**
   * If `true`, the order can be canceled
   * @type {boolean}
   * @memberof Order
   */
  allowsCancel: boolean;
  /**
   * If true, the limit of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeLimit?: boolean;
  /**
   * If set, the orderModel may be changed to one of the given orderModels.
   * @type {Array<OrderModel>}
   * @memberof Order
   */
  allowsChangeOrderModels?: Array<OrderModel>;
  /**
   * If `true`, the order size can be changed
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeSize: boolean;
  /**
   * If true, the stop of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeStop?: boolean;
  /**
   * If true, the stop limit of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeStopLimit?: boolean;
  /**
   * `true` if the `stopLoss` of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeStopLoss?: boolean;
  /**
   * `true` if the `takeProfit` of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeTakeProfit?: boolean;
  /**
   * If true, the trailing distance of the order can be changed.
   * @type {boolean}
   * @memberof Order
   */
  allowsChangeTrailingDistance?: boolean;
  /**
   * If set, the validity of the order can be changed to the given types.
   * @type {Array<OrderValidityType>}
   * @memberof Order
   */
  allowsChangeValidityTypes?: Array<OrderValidityType>;
  /**
   * If the security is a bond, the currency ISO code to show for the size input field.
   * @type {string}
   * @memberof Order
   */
  bondCurrencyIso?: string;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  brokerExchangeId: string;
  /**
   * The `brokerSecurityId` is the broker-specific identifier for the security to trade. It is provided by the `PreparedTrade` endpoint
   * and must be used in the order creation process to identify the security.
   *
   * This is only optional temporarily and will be required in the future. It will also replace the fields `isin` and `usTicker` for order creations.
   * @type {string}
   * @memberof Order
   */
  brokerSecurityId?: string;
  /**
   * For canceled orders: when the order has been canceled.
   * @type {Date}
   * @memberof Order
   */
  cancellationDateTime?: Date;
  /**
   * Already cancelled size of the order.
   * @type {number}
   * @memberof Order
   */
  cancelledSize?: number;
  /**
   *
   * @type {CashQuotation}
   * @memberof Order
   */
  cashQuotation?: CashQuotation;
  /**
   * If set and `true`, the endpoint `getChangeOrderCostEstimation` can be used to retrieve cost estimations
   * for order changes.
   * @type {boolean}
   * @memberof Order
   */
  changesHaveCostEstimations?: boolean;
  /**
   * Timestamp of the order creation.
   * @type {Date}
   * @memberof Order
   */
  createdAt: Date;
  /**
   *
   * @type {Amount}
   * @memberof Order
   */
  currentStop?: Amount;
  /**
   *
   * @type {Direction}
   * @memberof Order
   */
  direction: Direction;
  /**
   * The order number to use in the interface to display to the user.
   * Some brokers do not assign order numbers, so if this is not present, the order should be displayed without a number.
   * @type {string}
   * @memberof Order
   */
  displayNo?: string;
  /**
   * The mapped exchange id, as retrievable from the `/exchanges` endpoint.
   * @type {number}
   * @memberof Order
   */
  exchangeId?: number;
  /**
   * Name of the exchange as provided by the broker.
   * @type {string}
   * @memberof Order
   */
  exchangeName?: string;
  /**
   * For fully executed orders: the timestamp of the *latest* execution.
   * @type {Date}
   * @memberof Order
   */
  executedAt?: Date;
  /**
   * Already executed size of the order
   * @type {number}
   * @memberof Order
   */
  executedSize?: number;
  /**
   * If there already have been executions of this order, a list of those.
   * @type {Array<OrderExecution>}
   * @memberof Order
   */
  executions?: Array<OrderExecution>;
  /**
   * If this is true, it is not possible to show a receipt for this order (this is the case if order data is incomplete in order lists).
   * @type {boolean}
   * @memberof Order
   */
  hasNoOrderReceipt?: boolean;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  id: string;
  /**
   *
   * @type {number}
   * @memberof Order
   */
  ifDoneLimit?: number;
  /**
   * Whether this order is supposed to open or close a position. If `PreparedTrade.availableOrderIntents` (and/or the
   * corresponding subscription via `availableOrderIntentsToken`) is available, it should be set.
   *
   * Set it to `close` for orders that are supposed to close an existing position. Note that this is independent
   * of the order's direction (e.g. a short position is closed by a buy order).
   * @type {string}
   * @memberof Order
   */
  intent?: OrderIntentEnum;
  /**
   * The ISIN of the security to trade, if applicable. Note that at least one of `isin` and `usTicker` must be set.
   *
   * Note that we will make isin optional in a future version of the API.
   * @type {string}
   * @memberof Order
   */
  isin: string;
  /**
   * The limit of an order specifies a maximum (direction buy) or minimum (direction sell) value to execute the
   * order at.
   *
   * A limit can be set for orderModel `limit`
   * @type {number}
   * @memberof Order
   */
  limit?: number;
  /**
   * limit (and stop etc.) currency to use for this order
   * @type {string}
   * @memberof Order
   */
  limitCurrencyIso?: string;
  /**
   * If true, the current stop value of this order can be observed. In this case, the stop value can be subcribed via WebSocket (TODO - not implemented yet)
   * @type {boolean}
   * @memberof Order
   */
  mayObserveCurrentStop?: boolean;
  /**
   * Remaining/open size of the order
   * @type {number}
   * @memberof Order
   */
  openSize?: number;
  /**
   *
   * @type {OrderExtension}
   * @memberof Order
   */
  orderExtension?: OrderExtension;
  /**
   *
   * @type {OrderModel}
   * @memberof Order
   */
  orderModel: OrderModel;
  /**
   * If this is `true` (for open orders only), this order is currently awaiting the execution of a parent order.
   * @type {boolean}
   * @memberof Order
   */
  orderStatusIsAwaitingParentOrder?: boolean;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  portfolioId: string;
  /**
   *
   * @type {Amount}
   * @memberof Order
   */
  profitLossAbs?: Amount;
  /**
   *
   * @type {number}
   * @memberof Order
   */
  profitLossRel?: number;
  /**
   * If present, defines how many decimal places should be displayed for quote values.
   * @type {number}
   * @memberof Order
   */
  quoteDecimals?: number;
  /**
   * If supported by the broker, an optional limit can be added to a quote trade (`orderModel=quote`).
   * @type {number}
   * @memberof Order
   */
  quoteLimit?: number;
  /**
   *
   * @type {Security}
   * @memberof Order
   */
  security: Security;
  /**
   * Order is visible, but it cannot be interacted with (e.g. because it is the discarded part of a combination order).
   * If this is present and `true`, it should be displayed to the user, but visibily disabled.
   * @type {boolean}
   * @memberof Order
   */
  showAsDisabled?: boolean;
  /**
   * How much of the security should be traded. For stocks, this is the number of stocks. For bonds, this is a monetary amount.
   * @type {number}
   * @memberof Order
   */
  size: number;
  /**
   * If present, defines how many decimal places should be displayed for size values.
   * @type {number}
   * @memberof Order
   */
  sizeDecimals?: number;
  /**
   * The currency in which the order sizes are provided
   * @type {string}
   * @memberof Order
   */
  sizeUnit?: string;
  /**
   * Contains original broker data (in the broker's data format).
   * @type {string}
   * @memberof Order
   */
  sourceData?: string;
  /**
   *
   * @type {OrderStatus}
   * @memberof Order
   */
  status: OrderStatus;
  /**
   * Order status as text (may be broker-specific, only used for displaying it to users).
   * @type {string}
   * @memberof Order
   */
  statusText?: string;
  /**
   * The stop of an order specifies a usually higher value than the current quote (direction buy) or a usually lower value than the current quote (direction sell).
   *
   * For the orderModel `stop`, the order is executed immediately when the stop is reached.
   * For the orderModel `stopLimit`, the order will only be executed with a limit value of `stopLimit` (so for buy orders the price of execution will not be higher than `stopLimit`, for sell it orders it will not be lower than `stopLimit`).
   * @type {number}
   * @memberof Order
   */
  stop?: number;
  /**
   * The stop limit specifies a limit to use *after stop has been reached*. For buy orders, the stopLimit will be usually higher than stop, for sell orders the stopLimit will usually be lower than stop.
   * @type {number}
   * @memberof Order
   */
  stopLimit?: number;
  /**
   *
   * @type {number}
   * @memberof Order
   */
  stopLoss?: number;
  /**
   *
   * @type {number}
   * @memberof Order
   */
  takeProfit?: number;
  /**
   *
   * @type {TrailingDistance}
   * @memberof Order
   */
  trailingDistance?: TrailingDistance;
  /**
   * For orderModel `trailingStopLimit`: when the trailing stop has been reached, the tolerance
   * value is added to (for buy orders) or subtracted from (for sell orders) the stop value to obtain
   * a limit value. After that, the order can be regarded as a limit order with that limit value.
   * @type {number}
   * @memberof Order
   */
  trailingLimitTolerance?: number;
  /**
   * The US ticker of the security to trade, if applicable. Note that at least one of `isin` and `usTicker` must be set.
   * @type {string}
   * @memberof Order
   * @deprecated
   */
  usTicker?: string;
  /**
   *
   * @type {OrderValidity}
   * @memberof Order
   */
  validity?: OrderValidity;
}

/**
 * @export
 */
export const OrderIntentEnum = {
  Open: "open",
  Close: "close",
} as const;
export type OrderIntentEnum =
  (typeof OrderIntentEnum)[keyof typeof OrderIntentEnum];

export function OrderFromJSON(json: any): Order {
  return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Order {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    allowsCancel: json["allowsCancel"],
    allowsChangeLimit: !exists(json, "allowsChangeLimit")
      ? undefined
      : json["allowsChangeLimit"],
    allowsChangeOrderModels: !exists(json, "allowsChangeOrderModels")
      ? undefined
      : (json["allowsChangeOrderModels"] as Array<any>).map(OrderModelFromJSON),
    allowsChangeSize: json["allowsChangeSize"],
    allowsChangeStop: !exists(json, "allowsChangeStop")
      ? undefined
      : json["allowsChangeStop"],
    allowsChangeStopLimit: !exists(json, "allowsChangeStopLimit")
      ? undefined
      : json["allowsChangeStopLimit"],
    allowsChangeStopLoss: !exists(json, "allowsChangeStopLoss")
      ? undefined
      : json["allowsChangeStopLoss"],
    allowsChangeTakeProfit: !exists(json, "allowsChangeTakeProfit")
      ? undefined
      : json["allowsChangeTakeProfit"],
    allowsChangeTrailingDistance: !exists(json, "allowsChangeTrailingDistance")
      ? undefined
      : json["allowsChangeTrailingDistance"],
    allowsChangeValidityTypes: !exists(json, "allowsChangeValidityTypes")
      ? undefined
      : (json["allowsChangeValidityTypes"] as Array<any>).map(
          OrderValidityTypeFromJSON
        ),
    bondCurrencyIso: !exists(json, "bondCurrencyIso")
      ? undefined
      : json["bondCurrencyIso"],
    brokerExchangeId: json["brokerExchangeId"],
    brokerSecurityId: !exists(json, "brokerSecurityId")
      ? undefined
      : json["brokerSecurityId"],
    cancellationDateTime: !exists(json, "cancellationDateTime")
      ? undefined
      : new Date(json["cancellationDateTime"]),
    cancelledSize: !exists(json, "cancelledSize")
      ? undefined
      : json["cancelledSize"],
    cashQuotation: !exists(json, "cashQuotation")
      ? undefined
      : CashQuotationFromJSON(json["cashQuotation"]),
    changesHaveCostEstimations: !exists(json, "changesHaveCostEstimations")
      ? undefined
      : json["changesHaveCostEstimations"],
    createdAt: new Date(json["createdAt"]),
    currentStop: !exists(json, "currentStop")
      ? undefined
      : AmountFromJSON(json["currentStop"]),
    direction: DirectionFromJSON(json["direction"]),
    displayNo: !exists(json, "displayNo") ? undefined : json["displayNo"],
    exchangeId: !exists(json, "exchangeId") ? undefined : json["exchangeId"],
    exchangeName: !exists(json, "exchangeName")
      ? undefined
      : json["exchangeName"],
    executedAt: !exists(json, "executedAt")
      ? undefined
      : new Date(json["executedAt"]),
    executedSize: !exists(json, "executedSize")
      ? undefined
      : json["executedSize"],
    executions: !exists(json, "executions")
      ? undefined
      : (json["executions"] as Array<any>).map(OrderExecutionFromJSON),
    hasNoOrderReceipt: !exists(json, "hasNoOrderReceipt")
      ? undefined
      : json["hasNoOrderReceipt"],
    id: json["id"],
    ifDoneLimit: !exists(json, "ifDoneLimit") ? undefined : json["ifDoneLimit"],
    intent: !exists(json, "intent") ? undefined : json["intent"],
    isin: json["isin"],
    limit: !exists(json, "limit") ? undefined : json["limit"],
    limitCurrencyIso: !exists(json, "limitCurrencyIso")
      ? undefined
      : json["limitCurrencyIso"],
    mayObserveCurrentStop: !exists(json, "mayObserveCurrentStop")
      ? undefined
      : json["mayObserveCurrentStop"],
    openSize: !exists(json, "openSize") ? undefined : json["openSize"],
    orderExtension: !exists(json, "orderExtension")
      ? undefined
      : OrderExtensionFromJSON(json["orderExtension"]),
    orderModel: OrderModelFromJSON(json["orderModel"]),
    orderStatusIsAwaitingParentOrder: !exists(
      json,
      "orderStatusIsAwaitingParentOrder"
    )
      ? undefined
      : json["orderStatusIsAwaitingParentOrder"],
    portfolioId: json["portfolioId"],
    profitLossAbs: !exists(json, "profitLossAbs")
      ? undefined
      : AmountFromJSON(json["profitLossAbs"]),
    profitLossRel: !exists(json, "profitLossRel")
      ? undefined
      : json["profitLossRel"],
    quoteDecimals: !exists(json, "quoteDecimals")
      ? undefined
      : json["quoteDecimals"],
    quoteLimit: !exists(json, "quoteLimit") ? undefined : json["quoteLimit"],
    security: SecurityFromJSON(json["security"]),
    showAsDisabled: !exists(json, "showAsDisabled")
      ? undefined
      : json["showAsDisabled"],
    size: json["size"],
    sizeDecimals: !exists(json, "sizeDecimals")
      ? undefined
      : json["sizeDecimals"],
    sizeUnit: !exists(json, "sizeUnit") ? undefined : json["sizeUnit"],
    sourceData: !exists(json, "sourceData") ? undefined : json["sourceData"],
    status: OrderStatusFromJSON(json["status"]),
    statusText: !exists(json, "statusText") ? undefined : json["statusText"],
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

export function OrderToJSONRecursive(
  value?: Order | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    allowsCancel: value.allowsCancel,
    allowsChangeLimit: value.allowsChangeLimit,
    allowsChangeOrderModels:
      value.allowsChangeOrderModels === undefined
        ? undefined
        : (value.allowsChangeOrderModels as Array<any>).map(OrderModelToJSON),
    allowsChangeSize: value.allowsChangeSize,
    allowsChangeStop: value.allowsChangeStop,
    allowsChangeStopLimit: value.allowsChangeStopLimit,
    allowsChangeStopLoss: value.allowsChangeStopLoss,
    allowsChangeTakeProfit: value.allowsChangeTakeProfit,
    allowsChangeTrailingDistance: value.allowsChangeTrailingDistance,
    allowsChangeValidityTypes:
      value.allowsChangeValidityTypes === undefined
        ? undefined
        : (value.allowsChangeValidityTypes as Array<any>).map(
            OrderValidityTypeToJSON
          ),
    bondCurrencyIso: value.bondCurrencyIso,
    brokerExchangeId: value.brokerExchangeId,
    brokerSecurityId: value.brokerSecurityId,
    cancellationDateTime:
      value.cancellationDateTime === undefined
        ? undefined
        : value.cancellationDateTime.toISOString(),
    cancelledSize: value.cancelledSize,
    cashQuotation: CashQuotationToJSON(value.cashQuotation),
    changesHaveCostEstimations: value.changesHaveCostEstimations,
    createdAt: value.createdAt.toISOString(),
    currentStop: AmountToJSON(value.currentStop),
    direction: DirectionToJSON(value.direction),
    displayNo: value.displayNo,
    exchangeId: value.exchangeId,
    exchangeName: value.exchangeName,
    executedAt:
      value.executedAt === undefined
        ? undefined
        : value.executedAt.toISOString(),
    executedSize: value.executedSize,
    executions:
      value.executions === undefined
        ? undefined
        : (value.executions as Array<any>).map(OrderExecutionToJSON),
    hasNoOrderReceipt: value.hasNoOrderReceipt,
    id: value.id,
    ifDoneLimit: value.ifDoneLimit,
    intent: value.intent,
    isin: value.isin,
    limit: value.limit,
    limitCurrencyIso: value.limitCurrencyIso,
    mayObserveCurrentStop: value.mayObserveCurrentStop,
    openSize: value.openSize,
    orderExtension: OrderExtensionToJSON(value.orderExtension),
    orderModel: OrderModelToJSON(value.orderModel),
    orderStatusIsAwaitingParentOrder: value.orderStatusIsAwaitingParentOrder,
    portfolioId: value.portfolioId,
    profitLossAbs: AmountToJSON(value.profitLossAbs),
    profitLossRel: value.profitLossRel,
    quoteDecimals: value.quoteDecimals,
    quoteLimit: value.quoteLimit,
    security: SecurityToJSON(value.security),
    showAsDisabled: value.showAsDisabled,
    size: value.size,
    sizeDecimals: value.sizeDecimals,
    sizeUnit: value.sizeUnit,
    sourceData: value.sourceData,
    status: OrderStatusToJSON(value.status),
    statusText: value.statusText,
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

export function OrderToJSON(value?: Order | null): any {
  return OrderToJSONRecursive(value, false);
}
