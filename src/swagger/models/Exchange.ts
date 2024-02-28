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
  DefaultOrderValidityByOrderModel,
  DefaultOrderValidityByOrderModelFromJSON,
  DefaultOrderValidityByOrderModelFromJSONTyped,
  DefaultOrderValidityByOrderModelToJSON,
} from "./DefaultOrderValidityByOrderModel";
import {
  OrderModel,
  OrderModelFromJSON,
  OrderModelFromJSONTyped,
  OrderModelToJSON,
} from "./OrderModel";
import {
  OrderValidityTypeByOrderModel,
  OrderValidityTypeByOrderModelFromJSON,
  OrderValidityTypeByOrderModelFromJSONTyped,
  OrderValidityTypeByOrderModelToJSON,
} from "./OrderValidityTypeByOrderModel";
import {
  StringMapByOrderModel,
  StringMapByOrderModelFromJSON,
  StringMapByOrderModelFromJSONTyped,
  StringMapByOrderModelToJSON,
} from "./StringMapByOrderModel";
import {
  TakeProfitStopLossCapabilites,
  TakeProfitStopLossCapabilitesFromJSON,
  TakeProfitStopLossCapabilitesFromJSONTyped,
  TakeProfitStopLossCapabilitesToJSON,
} from "./TakeProfitStopLossCapabilites";

/**
 * An `Exchange` describes the order possibilites for a security at one exchange.
 * @export
 * @interface Exchange
 */
export interface Exchange {
  /**
   * The id of the exchange, as defined by the *broker*. This is to be used as the `brokerExchangeId` in quote and trade requests.
   * @type {string}
   * @memberof Exchange
   */
  id: string;
  /**
   * If set, this token can be used to retrieve quotes for the security at this exchange using the corresponding API endpoints (`GetSecurityQuotesMeta` and `GetSecurityQuotes`).
   * @type {string}
   * @memberof Exchange
   */
  securityQuotesToken?: string;
  /**
   * If the exchange can be mapped to the brokerize exchange list, this contains the id of the corresponding entry. Note that this is optional
   * and may be missing if the exchange cannot be mapped.
   * @type {number}
   * @memberof Exchange
   */
  brokerizeExchangeId?: number;
  /**
   * The label of the exchange, as defined by the *broker*.
   * @type {string}
   * @memberof Exchange
   */
  label: string;
  /**
   * The orderModels that are available for order direction `sell`. If this is empty, selling is not allowed on this exchange.
   * @type {Array<OrderModel>}
   * @memberof Exchange
   */
  orderModelsSell: Array<OrderModel>;
  /**
   * The orderModels that are available for order direction `buy`. If this is empty, buying is not allowed on this exchange.
   * @type {Array<OrderModel>}
   * @memberof Exchange
   */
  orderModelsBuy: Array<OrderModel>;
  /**
   * only one orderModel is available and it should not be displayed to the user. This is currently the case for buying funds at some
   * exchanges, where there is actually not a real order in the background, so the user should just see buy & sell buttons.
   *
   * Do not use this field anymore! It actually makes UIs unclear and currently is always `false`.
   * @type {boolean}
   * @memberof Exchange
   * @deprecated
   */
  hideOrderModel?: boolean;
  /**
   * If true, quote orders can be created with quoteMode=limit and quoteOrderOpts.quoteLimit set to a limit. This allows brokers to execute the
   * quote order at a different price instead of rejecting the order when the price has changed.
   * @type {boolean}
   * @memberof Exchange
   */
  allowsQuoteModeLimit?: boolean;
  /**
   * If this is true, limit buy orders may have the additional "ifDoneLimit" set.
   * @type {boolean}
   * @memberof Exchange
   */
  allowsIfDoneLimit?: boolean;
  /**
   *
   * @type {TakeProfitStopLossCapabilites}
   * @memberof Exchange
   */
  takeProfitStopLoss?: TakeProfitStopLossCapabilites;
  /**
   *
   * @type {OrderValidityTypeByOrderModel}
   * @memberof Exchange
   */
  validityTypesByOrderModel: OrderValidityTypeByOrderModel;
  /**
   *
   * @type {DefaultOrderValidityByOrderModel}
   * @memberof Exchange
   */
  defaultValidityByOrderModel?: DefaultOrderValidityByOrderModel;
  /**
   *
   * @type {StringMapByOrderModel}
   * @memberof Exchange
   */
  legalMessagesToConfirmByOrderModel?: StringMapByOrderModel;
  /**
   * Quotes for the instrument at this exchange are in this currency. This affects fields like limit, stop etc.
   * @type {string}
   * @memberof Exchange
   */
  currencyIso: string;
}

export function ExchangeFromJSON(json: any): Exchange {
  return ExchangeFromJSONTyped(json, false);
}

export function ExchangeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Exchange {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    securityQuotesToken: !exists(json, "securityQuotesToken")
      ? undefined
      : json["securityQuotesToken"],
    brokerizeExchangeId: !exists(json, "brokerizeExchangeId")
      ? undefined
      : json["brokerizeExchangeId"],
    label: json["label"],
    orderModelsSell: (json["orderModelsSell"] as Array<any>).map(
      OrderModelFromJSON
    ),
    orderModelsBuy: (json["orderModelsBuy"] as Array<any>).map(
      OrderModelFromJSON
    ),
    hideOrderModel: !exists(json, "hideOrderModel")
      ? undefined
      : json["hideOrderModel"],
    allowsQuoteModeLimit: !exists(json, "allowsQuoteModeLimit")
      ? undefined
      : json["allowsQuoteModeLimit"],
    allowsIfDoneLimit: !exists(json, "allowsIfDoneLimit")
      ? undefined
      : json["allowsIfDoneLimit"],
    takeProfitStopLoss: !exists(json, "takeProfitStopLoss")
      ? undefined
      : TakeProfitStopLossCapabilitesFromJSON(json["takeProfitStopLoss"]),
    validityTypesByOrderModel: OrderValidityTypeByOrderModelFromJSON(
      json["validityTypesByOrderModel"]
    ),
    defaultValidityByOrderModel: !exists(json, "defaultValidityByOrderModel")
      ? undefined
      : DefaultOrderValidityByOrderModelFromJSON(
          json["defaultValidityByOrderModel"]
        ),
    legalMessagesToConfirmByOrderModel: !exists(
      json,
      "legalMessagesToConfirmByOrderModel"
    )
      ? undefined
      : StringMapByOrderModelFromJSON(
          json["legalMessagesToConfirmByOrderModel"]
        ),
    currencyIso: json["currencyIso"],
  };
}

export function ExchangeToJSONRecursive(
  value?: Exchange | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    id: value.id,
    securityQuotesToken: value.securityQuotesToken,
    brokerizeExchangeId: value.brokerizeExchangeId,
    label: value.label,
    orderModelsSell: (value.orderModelsSell as Array<any>).map(
      OrderModelToJSON
    ),
    orderModelsBuy: (value.orderModelsBuy as Array<any>).map(OrderModelToJSON),
    hideOrderModel: value.hideOrderModel,
    allowsQuoteModeLimit: value.allowsQuoteModeLimit,
    allowsIfDoneLimit: value.allowsIfDoneLimit,
    takeProfitStopLoss: TakeProfitStopLossCapabilitesToJSON(
      value.takeProfitStopLoss
    ),
    validityTypesByOrderModel: OrderValidityTypeByOrderModelToJSON(
      value.validityTypesByOrderModel
    ),
    defaultValidityByOrderModel: DefaultOrderValidityByOrderModelToJSON(
      value.defaultValidityByOrderModel
    ),
    legalMessagesToConfirmByOrderModel: StringMapByOrderModelToJSON(
      value.legalMessagesToConfirmByOrderModel
    ),
    currencyIso: value.currencyIso,
  };
}

export function ExchangeToJSON(value?: Exchange | null): any {
  return ExchangeToJSONRecursive(value, false);
}
