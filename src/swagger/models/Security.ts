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
/**
 * A security's basic data like symbols and names.
 * @export
 * @interface Security
 */
export interface Security {
  /**
   *
   * @type {string}
   * @memberof Security
   */
  symbol?: string;
  /**
   *
   * @type {string}
   * @memberof Security
   */
  wkn?: string;
  /**
   *
   * @type {string}
   * @memberof Security
   */
  isin?: string;
  /**
   *
   * @type {string}
   * @memberof Security
   */
  name?: string;
}

export function SecurityFromJSON(json: any): Security {
  return SecurityFromJSONTyped(json, false);
}

export function SecurityFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Security {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    symbol: !exists(json, "symbol") ? undefined : json["symbol"],
    wkn: !exists(json, "wkn") ? undefined : json["wkn"],
    isin: !exists(json, "isin") ? undefined : json["isin"],
    name: !exists(json, "name") ? undefined : json["name"],
  };
}

export function SecurityToJSONRecursive(
  value?: Security | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    symbol: value.symbol,
    wkn: value.wkn,
    isin: value.isin,
    name: value.name,
  };
}

export function SecurityToJSON(value?: Security | null): any {
  return SecurityToJSONRecursive(value, false);
}
