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
/**
 *
 * @export
 * @interface Amount
 */
export interface Amount {
  /**
   * - ISO code (e.g. EUR for Euro), if it is a monetary amount
   * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
   * - or 'XXX' if it is pieces
   * - or 'PRC' if it is a percentage
   * - or 'PRM' if it is permil
   * - or 'XXP' if it is points (as for indices)
   * - or 'GRAMS' if it is grams (as for precious metals)
   * @type {string}
   * @memberof Amount
   */
  currency?: string;
  /**
   * Date in the format YYYY-MM-DD for validityType: 'GTD'
   * Date in the format Date ISO string YYYY-MM-DDThh:mm:ss.fffZ for validityType: 'GTDT'
   * @type {string}
   * @memberof Amount
   */
  date?: string;
  /**
   * If this is present and true, a "value is provided in realtime" indicator can be displayed.
   * If this is present and false, a "value is provided delayed" indicator can be displayed.
   * If this is not present, no such indication is available.
   * @type {boolean}
   * @memberof Amount
   */
  isRealtime?: boolean;
  /**
   *
   * @type {number}
   * @memberof Amount
   */
  maxDecimals?: number;
  /**
   *
   * @type {number}
   * @memberof Amount
   */
  minDecimals?: number;
  /**
   * If the amount is valid at a given point in time, this can be set (e.g. for quotes). This is a UNIX timestamp in milliseconds.
   * @type {number}
   * @memberof Amount
   */
  timestamp?: number;
  /**
   *
   * @type {number}
   * @memberof Amount
   */
  value?: number;
}

export function AmountFromJSON(json: any): Amount {
  return AmountFromJSONTyped(json, false);
}

export function AmountFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Amount {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    currency: !exists(json, "currency") ? undefined : json["currency"],
    date: !exists(json, "date") ? undefined : json["date"],
    isRealtime: !exists(json, "isRealtime") ? undefined : json["isRealtime"],
    maxDecimals: !exists(json, "maxDecimals") ? undefined : json["maxDecimals"],
    minDecimals: !exists(json, "minDecimals") ? undefined : json["minDecimals"],
    timestamp: !exists(json, "timestamp") ? undefined : json["timestamp"],
    value: !exists(json, "value") ? undefined : json["value"],
  };
}

export function AmountToJSONRecursive(
  value?: Amount | null,
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
    date: value.date,
    isRealtime: value.isRealtime,
    maxDecimals: value.maxDecimals,
    minDecimals: value.minDecimals,
    timestamp: value.timestamp,
    value: value.value,
  };
}

export function AmountToJSON(value?: Amount | null): any {
  return AmountToJSONRecursive(value, false);
}
