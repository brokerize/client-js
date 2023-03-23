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
  GenericTableRowSubheadingAllOf,
  GenericTableRowSubheadingAllOfFromJSON,
  GenericTableRowSubheadingAllOfFromJSONTyped,
  GenericTableRowSubheadingAllOfToJSON,
} from "./GenericTableRowSubheadingAllOf";
import {
  GenericTableRowSubheadingSpecifics,
  GenericTableRowSubheadingSpecificsFromJSON,
  GenericTableRowSubheadingSpecificsFromJSONTyped,
  GenericTableRowSubheadingSpecificsToJSON,
} from "./GenericTableRowSubheadingSpecifics";

/**
 *
 * @export
 * @interface GenericTableRowSubheading
 */
export interface GenericTableRowSubheading {
  /**
   *
   * @type {string}
   * @memberof GenericTableRowSubheading
   */
  type: GenericTableRowSubheadingTypeEnum;
  /**
   *
   * @type {string}
   * @memberof GenericTableRowSubheading
   */
  subheading: string;
}

/**
 * @export
 */
export const GenericTableRowSubheadingTypeEnum = {
  Subheading: "subheading",
} as const;
export type GenericTableRowSubheadingTypeEnum =
  (typeof GenericTableRowSubheadingTypeEnum)[keyof typeof GenericTableRowSubheadingTypeEnum];

export function GenericTableRowSubheadingFromJSON(
  json: any
): GenericTableRowSubheading {
  return GenericTableRowSubheadingFromJSONTyped(json, false);
}

export function GenericTableRowSubheadingFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowSubheading {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: json["type"],
    subheading: json["subheading"],
  };
}

export function GenericTableRowSubheadingToJSONRecursive(
  value?: GenericTableRowSubheading | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    type: value.type,
    subheading: value.subheading,
  };
}

export function GenericTableRowSubheadingToJSON(
  value?: GenericTableRowSubheading | null
): any {
  return GenericTableRowSubheadingToJSONRecursive(value, false);
}
