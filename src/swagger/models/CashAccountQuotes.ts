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

/**
 *
 * @export
 * @interface CashAccountQuotes
 */
export interface CashAccountQuotes {
  /**
   *
   * @type {Amount}
   * @memberof CashAccountQuotes
   */
  balance?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof CashAccountQuotes
   */
  buyingPower?: Amount;
  /**
   *
   * @type {boolean}
   * @memberof CashAccountQuotes
   */
  hideInOverviews?: boolean;
}

export function CashAccountQuotesFromJSON(json: any): CashAccountQuotes {
  return CashAccountQuotesFromJSONTyped(json, false);
}

export function CashAccountQuotesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CashAccountQuotes {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    balance: !exists(json, "balance")
      ? undefined
      : AmountFromJSON(json["balance"]),
    buyingPower: !exists(json, "buyingPower")
      ? undefined
      : AmountFromJSON(json["buyingPower"]),
    hideInOverviews: !exists(json, "hideInOverviews")
      ? undefined
      : json["hideInOverviews"],
  };
}

export function CashAccountQuotesToJSONRecursive(
  value?: CashAccountQuotes | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    balance: AmountToJSON(value.balance),
    buyingPower: AmountToJSON(value.buyingPower),
    hideInOverviews: value.hideInOverviews,
  };
}

export function CashAccountQuotesToJSON(value?: CashAccountQuotes | null): any {
  return CashAccountQuotesToJSONRecursive(value, false);
}
