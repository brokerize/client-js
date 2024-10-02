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
 * @interface CreateTradeDrafts200Response
 */
export interface CreateTradeDrafts200Response {
  /**
   *
   * @type {string}
   * @memberof CreateTradeDrafts200Response
   */
  id: string;
}

export function CreateTradeDrafts200ResponseFromJSON(
  json: any
): CreateTradeDrafts200Response {
  return CreateTradeDrafts200ResponseFromJSONTyped(json, false);
}

export function CreateTradeDrafts200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateTradeDrafts200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
  };
}

export function CreateTradeDrafts200ResponseToJSONRecursive(
  value?: CreateTradeDrafts200Response | null,
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

export function CreateTradeDrafts200ResponseToJSON(
  value?: CreateTradeDrafts200Response | null
): any {
  return CreateTradeDrafts200ResponseToJSONRecursive(value, false);
}
