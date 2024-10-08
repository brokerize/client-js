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
  OrderChanges,
  OrderChangesFromJSON,
  OrderChangesFromJSONTyped,
  OrderChangesToJSON,
} from "./OrderChanges";

/**
 *
 * @export
 * @interface ChangeOrderChallengeParams
 */
export interface ChangeOrderChallengeParams {
  /**
   *
   * @type {string}
   * @memberof ChangeOrderChallengeParams
   */
  authMethod: string;
  /**
   *
   * @type {OrderChanges}
   * @memberof ChangeOrderChallengeParams
   */
  changes: OrderChanges;
}

export function ChangeOrderChallengeParamsFromJSON(
  json: any
): ChangeOrderChallengeParams {
  return ChangeOrderChallengeParamsFromJSONTyped(json, false);
}

export function ChangeOrderChallengeParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ChangeOrderChallengeParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authMethod: json["authMethod"],
    changes: OrderChangesFromJSON(json["changes"]),
  };
}

export function ChangeOrderChallengeParamsToJSONRecursive(
  value?: ChangeOrderChallengeParams | null,
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
    changes: OrderChangesToJSON(value.changes),
  };
}

export function ChangeOrderChallengeParamsToJSON(
  value?: ChangeOrderChallengeParams | null
): any {
  return ChangeOrderChallengeParamsToJSONRecursive(value, false);
}
