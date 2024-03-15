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
  SecurityQuote,
  SecurityQuoteFromJSON,
  SecurityQuoteFromJSONTyped,
  SecurityQuoteToJSON,
} from "./SecurityQuote";

/**
 *
 * @export
 * @interface SecurityQuotes
 */
export interface SecurityQuotes {
  /**
   *
   * @type {SecurityQuote}
   * @memberof SecurityQuotes
   */
  ask?: SecurityQuote;
  /**
   *
   * @type {SecurityQuote}
   * @memberof SecurityQuotes
   */
  bid?: SecurityQuote;
}

export function SecurityQuotesFromJSON(json: any): SecurityQuotes {
  return SecurityQuotesFromJSONTyped(json, false);
}

export function SecurityQuotesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SecurityQuotes {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    ask: !exists(json, "ask") ? undefined : SecurityQuoteFromJSON(json["ask"]),
    bid: !exists(json, "bid") ? undefined : SecurityQuoteFromJSON(json["bid"]),
  };
}

export function SecurityQuotesToJSONRecursive(
  value?: SecurityQuotes | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    ask: SecurityQuoteToJSON(value.ask),
    bid: SecurityQuoteToJSON(value.bid),
  };
}

export function SecurityQuotesToJSON(value?: SecurityQuotes | null): any {
  return SecurityQuotesToJSONRecursive(value, false);
}