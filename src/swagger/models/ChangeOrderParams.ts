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
import {
  OrderChanges,
  OrderChangesFromJSON,
  OrderChangesFromJSONTyped,
  OrderChangesToJSON,
} from "./OrderChanges";

/**
 *
 * @export
 * @interface ChangeOrderParams
 */
export interface ChangeOrderParams {
  /**
   *
   * @type {string}
   * @memberof ChangeOrderParams
   */
  authMethod?: string;
  /**
   *
   * @type {string}
   * @memberof ChangeOrderParams
   */
  challengeId?: string;
  /**
   *
   * @type {string}
   * @memberof ChangeOrderParams
   */
  challengeResponse?: string;
  /**
   *
   * @type {OrderChanges}
   * @memberof ChangeOrderParams
   */
  changes: OrderChanges;
}

export function ChangeOrderParamsFromJSON(json: any): ChangeOrderParams {
  return ChangeOrderParamsFromJSONTyped(json, false);
}

export function ChangeOrderParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ChangeOrderParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authMethod: !exists(json, "authMethod") ? undefined : json["authMethod"],
    challengeId: !exists(json, "challengeId") ? undefined : json["challengeId"],
    challengeResponse: !exists(json, "challengeResponse")
      ? undefined
      : json["challengeResponse"],
    changes: OrderChangesFromJSON(json["changes"]),
  };
}

export function ChangeOrderParamsToJSONRecursive(
  value?: ChangeOrderParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    authMethod: value.authMethod,
    challengeId: value.challengeId,
    challengeResponse: value.challengeResponse,
    changes: OrderChangesToJSON(value.changes),
  };
}

export function ChangeOrderParamsToJSON(value?: ChangeOrderParams | null): any {
  return ChangeOrderParamsToJSONRecursive(value, false);
}
