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
  CashAccount,
  CashAccountFromJSON,
  CashAccountFromJSONTyped,
  CashAccountToJSON,
} from "./CashAccount";
import {
  Portfolio,
  PortfolioFromJSON,
  PortfolioFromJSONTyped,
  PortfolioToJSON,
} from "./Portfolio";

/**
 *
 * @export
 * @interface PortfoliosResponse
 */
export interface PortfoliosResponse {
  /**
   *
   * @type {Array<CashAccount>}
   * @memberof PortfoliosResponse
   */
  cashAccounts: Array<CashAccount>;
  /**
   *
   * @type {Array<Portfolio>}
   * @memberof PortfoliosResponse
   */
  portfolios: Array<Portfolio>;
}

export function PortfoliosResponseFromJSON(json: any): PortfoliosResponse {
  return PortfoliosResponseFromJSONTyped(json, false);
}

export function PortfoliosResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PortfoliosResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cashAccounts: (json["cashAccounts"] as Array<any>).map(CashAccountFromJSON),
    portfolios: (json["portfolios"] as Array<any>).map(PortfolioFromJSON),
  };
}

export function PortfoliosResponseToJSONRecursive(
  value?: PortfoliosResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    cashAccounts: (value.cashAccounts as Array<any>).map(CashAccountToJSON),
    portfolios: (value.portfolios as Array<any>).map(PortfolioToJSON),
  };
}

export function PortfoliosResponseToJSON(
  value?: PortfoliosResponse | null
): any {
  return PortfoliosResponseToJSONRecursive(value, false);
}
