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
 * @interface EnableSessionTanResponseAnyOf
 */
export interface EnableSessionTanResponseAnyOf {
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanResponseAnyOf
   */
  decoupledOperationId?: string;
}

export function EnableSessionTanResponseAnyOfFromJSON(
  json: any
): EnableSessionTanResponseAnyOf {
  return EnableSessionTanResponseAnyOfFromJSONTyped(json, false);
}

export function EnableSessionTanResponseAnyOfFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanResponseAnyOf {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    decoupledOperationId: !exists(json, "decoupledOperationId")
      ? undefined
      : json["decoupledOperationId"],
  };
}

export function EnableSessionTanResponseAnyOfToJSONRecursive(
  value?: EnableSessionTanResponseAnyOf | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    decoupledOperationId: value.decoupledOperationId,
  };
}

export function EnableSessionTanResponseAnyOfToJSON(
  value?: EnableSessionTanResponseAnyOf | null
): any {
  return EnableSessionTanResponseAnyOfToJSONRecursive(value, false);
}
