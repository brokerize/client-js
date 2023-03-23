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
 * @interface CreatedResponseBody
 */
export interface CreatedResponseBody {
  /**
   *
   * @type {string}
   * @memberof CreatedResponseBody
   */
  id: string;
}

export function CreatedResponseBodyFromJSON(json: any): CreatedResponseBody {
  return CreatedResponseBodyFromJSONTyped(json, false);
}

export function CreatedResponseBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreatedResponseBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
  };
}

export function CreatedResponseBodyToJSONRecursive(
  value?: CreatedResponseBody | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    id: value.id,
  };
}

export function CreatedResponseBodyToJSON(
  value?: CreatedResponseBody | null
): any {
  return CreatedResponseBodyToJSONRecursive(value, false);
}
