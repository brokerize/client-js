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
 *
 * @export
 * @interface RiskClassInfo
 */
export interface RiskClassInfo {
  /**
   * If set, must be displayed as a static hint (which the user does not need to confirm) before the order button. May contain (some) HTML.
   * @type {string}
   * @memberof RiskClassInfo
   */
  legalHint?: string;
  /**
   * Risk class message to display (may contain a subset of HTML: `<a>` tags for linking to external pages, `<p>`/`<br>` to add paragraphs/line breaks, `<ul><li></li></ul>` to show unuordered lists).
   * Users must accept the message before they can create the order. This can happen before the actual order form is visible.
   * @type {string}
   * @memberof RiskClassInfo
   */
  msg?: string;
  /**
   * If true, only sell is allowed for this instrument.
   * @type {boolean}
   * @memberof RiskClassInfo
   */
  onlySellAllowed?: boolean;
}

export function RiskClassInfoFromJSON(json: any): RiskClassInfo {
  return RiskClassInfoFromJSONTyped(json, false);
}

export function RiskClassInfoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RiskClassInfo {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    legalHint: !exists(json, "legalHint") ? undefined : json["legalHint"],
    msg: !exists(json, "msg") ? undefined : json["msg"],
    onlySellAllowed: !exists(json, "onlySellAllowed")
      ? undefined
      : json["onlySellAllowed"],
  };
}

export function RiskClassInfoToJSONRecursive(
  value?: RiskClassInfo | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    legalHint: value.legalHint,
    msg: value.msg,
    onlySellAllowed: value.onlySellAllowed,
  };
}

export function RiskClassInfoToJSON(value?: RiskClassInfo | null): any {
  return RiskClassInfoToJSONRecursive(value, false);
}
