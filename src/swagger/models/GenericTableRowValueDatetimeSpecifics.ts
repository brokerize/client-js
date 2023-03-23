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
 * @interface GenericTableRowValueDatetimeSpecifics
 */
export interface GenericTableRowValueDatetimeSpecifics {
  /**
   * *Milliseconds* since *the epoch*.
   * @type {number}
   * @memberof GenericTableRowValueDatetimeSpecifics
   */
  value?: number;
}

export function GenericTableRowValueDatetimeSpecificsFromJSON(
  json: any
): GenericTableRowValueDatetimeSpecifics {
  return GenericTableRowValueDatetimeSpecificsFromJSONTyped(json, false);
}

export function GenericTableRowValueDatetimeSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueDatetimeSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    value: !exists(json, "value") ? undefined : json["value"],
  };
}

export function GenericTableRowValueDatetimeSpecificsToJSONRecursive(
  value?: GenericTableRowValueDatetimeSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    value: value.value,
  };
}

export function GenericTableRowValueDatetimeSpecificsToJSON(
  value?: GenericTableRowValueDatetimeSpecifics | null
): any {
  return GenericTableRowValueDatetimeSpecificsToJSONRecursive(value, false);
}
