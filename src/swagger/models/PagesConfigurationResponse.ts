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
 * @interface PagesConfigurationResponse
 */
export interface PagesConfigurationResponse {
  /**
   * The brokerize clientId to use for the configured page.
   * @type {string}
   * @memberof PagesConfigurationResponse
   */
  clientId: string;
  /**
   *
   * @type {any}
   * @memberof PagesConfigurationResponse
   */
  page: any | null;
}

export function PagesConfigurationResponseFromJSON(
  json: any
): PagesConfigurationResponse {
  return PagesConfigurationResponseFromJSONTyped(json, false);
}

export function PagesConfigurationResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PagesConfigurationResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    clientId: json["clientId"],
    page: json["page"],
  };
}

export function PagesConfigurationResponseToJSONRecursive(
  value?: PagesConfigurationResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    clientId: value.clientId,
    page: value.page,
  };
}

export function PagesConfigurationResponseToJSON(
  value?: PagesConfigurationResponse | null
): any {
  return PagesConfigurationResponseToJSONRecursive(value, false);
}
