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
 * @interface SecuritySelector
 */
export interface SecuritySelector {
  /**
   * The securities crypto code if it is of type "crypto". E.g. 'BTC'
   * @type {string}
   * @memberof SecuritySelector
   */
  cryptoCode?: string;
  /**
   * The securities crypto pair if it is of type "crypto". E.g. 'BTC-EUR'
   * @type {string}
   * @memberof SecuritySelector
   */
  cryptoPair?: string;
  /**
   * The security's `isin` (International Securities Identification Number).
   * @type {string}
   * @memberof SecuritySelector
   */
  isin?: string;
  /**
   * The security's symbol as used by the broker `sino` (can be used to implement broker-specific security matching behavior)
   * @type {string}
   * @memberof SecuritySelector
   */
  sinoTicker?: string;
  /**
   * The security's US Ticker symbol
   * @type {string}
   * @memberof SecuritySelector
   */
  usTicker?: string;
  /**
   * The security's `wkn` (Wertpapierkennnummer).
   * @type {string}
   * @memberof SecuritySelector
   */
  wkn?: string;
}

export function SecuritySelectorFromJSON(json: any): SecuritySelector {
  return SecuritySelectorFromJSONTyped(json, false);
}

export function SecuritySelectorFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SecuritySelector {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cryptoCode: !exists(json, "cryptoCode") ? undefined : json["cryptoCode"],
    cryptoPair: !exists(json, "cryptoPair") ? undefined : json["cryptoPair"],
    isin: !exists(json, "isin") ? undefined : json["isin"],
    sinoTicker: !exists(json, "sinoTicker") ? undefined : json["sinoTicker"],
    usTicker: !exists(json, "usTicker") ? undefined : json["usTicker"],
    wkn: !exists(json, "wkn") ? undefined : json["wkn"],
  };
}

export function SecuritySelectorToJSONRecursive(
  value?: SecuritySelector | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    cryptoCode: value.cryptoCode,
    cryptoPair: value.cryptoPair,
    isin: value.isin,
    sinoTicker: value.sinoTicker,
    usTicker: value.usTicker,
    wkn: value.wkn,
  };
}

export function SecuritySelectorToJSON(value?: SecuritySelector | null): any {
  return SecuritySelectorToJSONRecursive(value, false);
}
