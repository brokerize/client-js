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
  DecoupledOperationState,
  DecoupledOperationStateFromJSON,
  DecoupledOperationStateFromJSONTyped,
  DecoupledOperationStateToJSON,
} from "./DecoupledOperationState";

/**
 *
 * @export
 * @interface DecoupledOperationStatus
 */
export interface DecoupledOperationStatus {
  /**
   *
   * @type {DecoupledOperationState}
   * @memberof DecoupledOperationStatus
   */
  state: DecoupledOperationState;
  /**
   *
   * @type {string}
   * @memberof DecoupledOperationStatus
   */
  text?: string;
}

export function DecoupledOperationStatusFromJSON(
  json: any
): DecoupledOperationStatus {
  return DecoupledOperationStatusFromJSONTyped(json, false);
}

export function DecoupledOperationStatusFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DecoupledOperationStatus {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: DecoupledOperationStateFromJSON(json["state"]),
    text: !exists(json, "text") ? undefined : json["text"],
  };
}

export function DecoupledOperationStatusToJSONRecursive(
  value?: DecoupledOperationStatus | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    state: DecoupledOperationStateToJSON(value.state),
    text: value.text,
  };
}

export function DecoupledOperationStatusToJSON(
  value?: DecoupledOperationStatus | null
): any {
  return DecoupledOperationStatusToJSONRecursive(value, false);
}
