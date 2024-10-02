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
 * @interface LegalTermConfirmItem
 */
export interface LegalTermConfirmItem {
  /**
   *
   * @type {string}
   * @memberof LegalTermConfirmItem
   */
  html: string;
  /**
   *
   * @type {string}
   * @memberof LegalTermConfirmItem
   */
  id: string;
}

export function LegalTermConfirmItemFromJSON(json: any): LegalTermConfirmItem {
  return LegalTermConfirmItemFromJSONTyped(json, false);
}

export function LegalTermConfirmItemFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): LegalTermConfirmItem {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    html: json["html"],
    id: json["id"],
  };
}

export function LegalTermConfirmItemToJSONRecursive(
  value?: LegalTermConfirmItem | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    html: value.html,
    id: value.id,
  };
}

export function LegalTermConfirmItemToJSON(
  value?: LegalTermConfirmItem | null
): any {
  return LegalTermConfirmItemToJSONRecursive(value, false);
}
