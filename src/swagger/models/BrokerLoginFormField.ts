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
 * @interface BrokerLoginFormField
 */
export interface BrokerLoginFormField {
  /**
   *
   * @type {string}
   * @memberof BrokerLoginFormField
   */
  label: string;
  /**
   *
   * @type {string}
   * @memberof BrokerLoginFormField
   */
  type: BrokerLoginFormFieldTypeEnum;
}

/**
 * @export
 */
export const BrokerLoginFormFieldTypeEnum = {
  String: "string",
  Password: "password",
} as const;
export type BrokerLoginFormFieldTypeEnum =
  (typeof BrokerLoginFormFieldTypeEnum)[keyof typeof BrokerLoginFormFieldTypeEnum];

export function BrokerLoginFormFieldFromJSON(json: any): BrokerLoginFormField {
  return BrokerLoginFormFieldFromJSONTyped(json, false);
}

export function BrokerLoginFormFieldFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): BrokerLoginFormField {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    label: json["label"],
    type: json["type"],
  };
}

export function BrokerLoginFormFieldToJSONRecursive(
  value?: BrokerLoginFormField | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    label: value.label,
    type: value.type,
  };
}

export function BrokerLoginFormFieldToJSON(
  value?: BrokerLoginFormField | null
): any {
  return BrokerLoginFormFieldToJSONRecursive(value, false);
}
