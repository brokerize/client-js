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
  CashAccountQuotes,
  CashAccountQuotesFromJSON,
  CashAccountQuotesFromJSONTyped,
  CashAccountQuotesToJSON,
} from "./CashAccountQuotes";
import {
  PortfolioQuotes,
  PortfolioQuotesFromJSON,
  PortfolioQuotesFromJSONTyped,
  PortfolioQuotesToJSON,
} from "./PortfolioQuotes";

/**
 *
 * @export
 * @interface GetPortfolioQuotesResponse
 */
export interface GetPortfolioQuotesResponse {
  /**
   * Quotes each cash account, mapped by the account's id.
   * @type {{ [key: string]: CashAccountQuotes; }}
   * @memberof GetPortfolioQuotesResponse
   */
  cashAccounts?: { [key: string]: CashAccountQuotes };
  /**
   *
   * @type {Date}
   * @memberof GetPortfolioQuotesResponse
   */
  lastSync?: Date;
  /**
   *
   * @type {PortfolioQuotes}
   * @memberof GetPortfolioQuotesResponse
   */
  quotes?: PortfolioQuotes;
}

export function GetPortfolioQuotesResponseFromJSON(
  json: any
): GetPortfolioQuotesResponse {
  return GetPortfolioQuotesResponseFromJSONTyped(json, false);
}

export function GetPortfolioQuotesResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetPortfolioQuotesResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cashAccounts: !exists(json, "cashAccounts")
      ? undefined
      : mapValues(json["cashAccounts"], CashAccountQuotesFromJSON),
    lastSync: !exists(json, "lastSync")
      ? undefined
      : new Date(json["lastSync"]),
    quotes: !exists(json, "quotes")
      ? undefined
      : PortfolioQuotesFromJSON(json["quotes"]),
  };
}

export function GetPortfolioQuotesResponseToJSONRecursive(
  value?: GetPortfolioQuotesResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    cashAccounts:
      value.cashAccounts === undefined
        ? undefined
        : mapValues(value.cashAccounts, CashAccountQuotesToJSON),
    lastSync:
      value.lastSync === undefined ? undefined : value.lastSync.toISOString(),
    quotes: PortfolioQuotesToJSON(value.quotes),
  };
}

export function GetPortfolioQuotesResponseToJSON(
  value?: GetPortfolioQuotesResponse | null
): any {
  return GetPortfolioQuotesResponseToJSONRecursive(value, false);
}
