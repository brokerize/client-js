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
/**
 *
 * @export
 * @interface CashAccount
 */
export interface CashAccount {
  /**
   * - ISO code (e.g. EUR for Euro), if it is a monetary amount
   * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
   * - or 'XXX' if it is pieces
   * - or 'PRC' if it is a percentage
   * - or 'PRM' if it is permil
   * - or 'XXP' if it is points (as for indices)
   * - or 'GRAMS' if it is grams (as for precious metals)
   * @type {string}
   * @memberof CashAccount
   */
  currency: string;
  /**
   *
   * @type {string}
   * @memberof CashAccount
   */
  displayName: string;
  /**
   *
   * @type {string}
   * @memberof CashAccount
   */
  id: string;
  /**
   *
   * @type {boolean}
   * @memberof CashAccount
   */
  isHiddenDefaultAccount: boolean;
}

export function CashAccountFromJSON(json: any): CashAccount {
  return CashAccountFromJSONTyped(json, false);
}

export function CashAccountFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CashAccount {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    currency: json["currency"],
    displayName: json["displayName"],
    id: json["id"],
    isHiddenDefaultAccount: json["isHiddenDefaultAccount"],
  };
}

export function CashAccountToJSONRecursive(
  value?: CashAccount | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    currency: value.currency,
    displayName: value.displayName,
    id: value.id,
    isHiddenDefaultAccount: value.isHiddenDefaultAccount,
  };
}

export function CashAccountToJSON(value?: CashAccount | null): any {
  return CashAccountToJSONRecursive(value, false);
}
