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
 * @interface BitpandaClientCfg
 */
export interface BitpandaClientCfg {
  /**
   *
   * @type {string}
   * @memberof BitpandaClientCfg
   */
  clientIdProduction?: string;
  /**
   *
   * @type {string}
   * @memberof BitpandaClientCfg
   */
  clientIdStaging?: string;
}

export function BitpandaClientCfgFromJSON(json: any): BitpandaClientCfg {
  return BitpandaClientCfgFromJSONTyped(json, false);
}

export function BitpandaClientCfgFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): BitpandaClientCfg {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    clientIdProduction: !exists(json, "clientIdProduction")
      ? undefined
      : json["clientIdProduction"],
    clientIdStaging: !exists(json, "clientIdStaging")
      ? undefined
      : json["clientIdStaging"],
  };
}

export function BitpandaClientCfgToJSONRecursive(
  value?: BitpandaClientCfg | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    clientIdProduction: value.clientIdProduction,
    clientIdStaging: value.clientIdStaging,
  };
}

export function BitpandaClientCfgToJSON(value?: BitpandaClientCfg | null): any {
  return BitpandaClientCfgToJSONRecursive(value, false);
}
