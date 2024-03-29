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
 * @interface BrokerMetaImages
 */
export interface BrokerMetaImages {
  /**
   *
   * @type {string}
   * @memberof BrokerMetaImages
   */
  lightSquare: string;
  /**
   *
   * @type {string}
   * @memberof BrokerMetaImages
   */
  darkSquare: string;
  /**
   *
   * @type {string}
   * @memberof BrokerMetaImages
   */
  light: string;
  /**
   *
   * @type {string}
   * @memberof BrokerMetaImages
   */
  dark: string;
}

export function BrokerMetaImagesFromJSON(json: any): BrokerMetaImages {
  return BrokerMetaImagesFromJSONTyped(json, false);
}

export function BrokerMetaImagesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): BrokerMetaImages {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    lightSquare: json["lightSquare"],
    darkSquare: json["darkSquare"],
    light: json["light"],
    dark: json["dark"],
  };
}

export function BrokerMetaImagesToJSONRecursive(
  value?: BrokerMetaImages | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    lightSquare: value.lightSquare,
    darkSquare: value.darkSquare,
    light: value.light,
    dark: value.dark,
  };
}

export function BrokerMetaImagesToJSON(value?: BrokerMetaImages | null): any {
  return BrokerMetaImagesToJSONRecursive(value, false);
}
