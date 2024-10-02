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
import {
  EnableSessionTanResponseAnyOf,
  EnableSessionTanResponseAnyOfFromJSON,
  EnableSessionTanResponseAnyOfFromJSONTyped,
  EnableSessionTanResponseAnyOfToJSON,
} from "./EnableSessionTanResponseAnyOf";
import {
  OkResponseBody,
  OkResponseBodyFromJSON,
  OkResponseBodyFromJSONTyped,
  OkResponseBodyToJSON,
} from "./OkResponseBody";

/**
 *
 * @export
 * @interface EnableSessionTanResponse
 */
export interface EnableSessionTanResponse {
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanResponse
   */
  decoupledOperationId?: string;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanResponse
   */
  msg: string;
}

export function EnableSessionTanResponseFromJSON(
  json: any
): EnableSessionTanResponse {
  return EnableSessionTanResponseFromJSONTyped(json, false);
}

export function EnableSessionTanResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    decoupledOperationId: !exists(json, "decoupledOperationId")
      ? undefined
      : json["decoupledOperationId"],
    msg: json["msg"],
  };
}

export function EnableSessionTanResponseToJSONRecursive(
  value?: EnableSessionTanResponse | null,
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
    msg: value.msg,
  };
}

export function EnableSessionTanResponseToJSON(
  value?: EnableSessionTanResponse | null
): any {
  return EnableSessionTanResponseToJSONRecursive(value, false);
}
