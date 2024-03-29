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
 * @interface EnableSessionTanParamsTanSpecifics
 */
export interface EnableSessionTanParamsTanSpecifics {
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsTanSpecifics
   */
  tan?: string;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsTanSpecifics
   */
  authMethod?: string;
}

export function EnableSessionTanParamsTanSpecificsFromJSON(
  json: any
): EnableSessionTanParamsTanSpecifics {
  return EnableSessionTanParamsTanSpecificsFromJSONTyped(json, false);
}

export function EnableSessionTanParamsTanSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanParamsTanSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    tan: !exists(json, "tan") ? undefined : json["tan"],
    authMethod: !exists(json, "authMethod") ? undefined : json["authMethod"],
  };
}

export function EnableSessionTanParamsTanSpecificsToJSONRecursive(
  value?: EnableSessionTanParamsTanSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    tan: value.tan,
    authMethod: value.authMethod,
  };
}

export function EnableSessionTanParamsTanSpecificsToJSON(
  value?: EnableSessionTanParamsTanSpecifics | null
): any {
  return EnableSessionTanParamsTanSpecificsToJSONRecursive(value, false);
}
