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
 * An `Exchange` describes the order possibilities for a security at one exchange.
 * @export
 * @interface Exchange
 */
export interface Exchange {
  /**
   * If this is true, limit buy orders may have the additional "ifDoneLimit" set.
   * @type {boolean}
   * @memberof Exchange
   */
  allowsIfDoneLimit?: boolean;
  /**
   * If true, quote orders can be created with quoteMode=limit and quoteOrderOpts.quoteLimit set to a limit. This allows brokers to execute the
   * quote order at a different price instead of rejecting the order when the price has changed.
   * @type {boolean}
   * @memberof Exchange
   */
  allowsQuoteModeLimit?: boolean;
  /**
   * If the exchange can be mapped to the brokerize exchange list, this contains the id of the corresponding entry. Note that this is optional
   * and may be missing if the exchange cannot be mapped.
   * @type {number}
   * @memberof Exchange
   */
  brokerizeExchangeId?: number;
  /**
   * If defined, the cashAccounts that can be used with this exchange. The list should be presented to the user, so that they can
   * select which account to order with. Usually this is just the list of cash accounts, filtered by currency. However, some
   * brokers may allow to trade with cash accounts in a different currency than the exchange's currency, so this provided list should
   * be used.
   *
   * If not defined, all cash accounts assigned to the portfolio can be used (if there is only one or none, the list should not be shown).
   * @type {Array<string>}
   * @memberof Exchange
   */
  cashAccountIds?: Array<string>;
  /**
   * Quotes for the instrument at this exchange are in this currency. This affects fields like limit, stop etc.
   * @type {string}
   * @memberof Exchange
   */
  currencyIso: string;
  /**
   *
   * @type {DefaultOrderValidityByOrderModel}
   * @memberof Exchange
   */
  defaultValidityByOrderModel?: DefaultOrderValidityByOrderModel;
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
   * The id of the exchange, as defined by the *broker*. This is to be used as the `brokerExchangeId` in quote and trade requests.
   * @type {string}
   * @memberof Exchange
   */
  id: string;
  /**
   * The label of the exchange, as defined by the *broker*.
   * @type {string}
   * @memberof Exchange
   */
  label: string;
  /**
   *
   * @type {StringMapByOrderModel}
   * @memberof Exchange
   */
  legalMessagesToConfirmByOrderModel?: StringMapByOrderModel;
  /**
   * The orderModels that are available for order direction `buy`. If this is empty, buying is not allowed on this exchange.
   * @type {Array<OrderModel>}
   * @memberof Exchange
   */
  orderModelsBuy: Array<OrderModel>;
  /**
   * The orderModels that are available for order direction `sell`. If this is empty, selling is not allowed on this exchange.
   * @type {Array<OrderModel>}
   * @memberof Exchange
   */
  orderModelsSell: Array<OrderModel>;
  /**
   * If set, this token can be used to retrieve quotes for the security at this exchange using the corresponding API endpoints (`GetSecurityQuotesMeta` and `GetSecurityQuotes`).
   * @type {string}
   * @memberof Exchange
   */
  securityQuotesToken?: string;
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
    allowsIfDoneLimit: !exists(json, "allowsIfDoneLimit")
      ? undefined
      : json["allowsIfDoneLimit"],
    allowsQuoteModeLimit: !exists(json, "allowsQuoteModeLimit")
      ? undefined
      : json["allowsQuoteModeLimit"],
    brokerizeExchangeId: !exists(json, "brokerizeExchangeId")
      ? undefined
      : json["brokerizeExchangeId"],
    cashAccountIds: !exists(json, "cashAccountIds")
      ? undefined
      : json["cashAccountIds"],
    currencyIso: json["currencyIso"],
    defaultValidityByOrderModel: !exists(json, "defaultValidityByOrderModel")
      ? undefined
      : DefaultOrderValidityByOrderModelFromJSON(
          json["defaultValidityByOrderModel"]
        ),
    hideOrderModel: !exists(json, "hideOrderModel")
      ? undefined
      : json["hideOrderModel"],
    id: json["id"],
    label: json["label"],
    legalMessagesToConfirmByOrderModel: !exists(
      json,
      "legalMessagesToConfirmByOrderModel"
    )
      ? undefined
      : StringMapByOrderModelFromJSON(
          json["legalMessagesToConfirmByOrderModel"]
        ),
    orderModelsBuy: (json["orderModelsBuy"] as Array<any>).map(
      OrderModelFromJSON
    ),
    orderModelsSell: (json["orderModelsSell"] as Array<any>).map(
      OrderModelFromJSON
    ),
    securityQuotesToken: !exists(json, "securityQuotesToken")
      ? undefined
      : json["securityQuotesToken"],
    takeProfitStopLoss: !exists(json, "takeProfitStopLoss")
      ? undefined
      : TakeProfitStopLossCapabilitesFromJSON(json["takeProfitStopLoss"]),
    validityTypesByOrderModel: OrderValidityTypeByOrderModelFromJSON(
      json["validityTypesByOrderModel"]
    ),
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
    allowsIfDoneLimit: value.allowsIfDoneLimit,
    allowsQuoteModeLimit: value.allowsQuoteModeLimit,
    brokerizeExchangeId: value.brokerizeExchangeId,
    cashAccountIds: value.cashAccountIds,
    currencyIso: value.currencyIso,
    defaultValidityByOrderModel: DefaultOrderValidityByOrderModelToJSON(
      value.defaultValidityByOrderModel
    ),
    hideOrderModel: value.hideOrderModel,
    id: value.id,
    label: value.label,
    legalMessagesToConfirmByOrderModel: StringMapByOrderModelToJSON(
      value.legalMessagesToConfirmByOrderModel
    ),
    orderModelsBuy: (value.orderModelsBuy as Array<any>).map(OrderModelToJSON),
    orderModelsSell: (value.orderModelsSell as Array<any>).map(
      OrderModelToJSON
    ),
    securityQuotesToken: value.securityQuotesToken,
    takeProfitStopLoss: TakeProfitStopLossCapabilitesToJSON(
      value.takeProfitStopLoss
    ),
    validityTypesByOrderModel: OrderValidityTypeByOrderModelToJSON(
      value.validityTypesByOrderModel
    ),
  };
}

export function ExchangeToJSON(value?: Exchange | null): any {
  return ExchangeToJSONRecursive(value, false);
}
