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
import {
  EnableSessionTanParamsDecoupledAllOf,
  EnableSessionTanParamsDecoupledAllOfFromJSON,
  EnableSessionTanParamsDecoupledAllOfFromJSONTyped,
  EnableSessionTanParamsDecoupledAllOfToJSON,
} from "./EnableSessionTanParamsDecoupledAllOf";
import {
  EnableSessionTanParamsDecoupledSpecifics,
  EnableSessionTanParamsDecoupledSpecificsFromJSON,
  EnableSessionTanParamsDecoupledSpecificsFromJSONTyped,
  EnableSessionTanParamsDecoupledSpecificsToJSON,
} from "./EnableSessionTanParamsDecoupledSpecifics";

/**
 *
 * @export
 * @interface EnableSessionTanParamsDecoupled
 */
export interface EnableSessionTanParamsDecoupled {
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsDecoupled
   */
  kind: EnableSessionTanParamsDecoupledKindEnum;
  /**
   *
   * @type {string}
   * @memberof EnableSessionTanParamsDecoupled
   */
  authMethod: string;
}

/**
 * @export
 */
export const EnableSessionTanParamsDecoupledKindEnum = {
  Decoupled: "decoupled",
} as const;
export type EnableSessionTanParamsDecoupledKindEnum =
  (typeof EnableSessionTanParamsDecoupledKindEnum)[keyof typeof EnableSessionTanParamsDecoupledKindEnum];

export function EnableSessionTanParamsDecoupledFromJSON(
  json: any
): EnableSessionTanParamsDecoupled {
  return EnableSessionTanParamsDecoupledFromJSONTyped(json, false);
}

export function EnableSessionTanParamsDecoupledFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanParamsDecoupled {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    kind: json["kind"],
    authMethod: json["authMethod"],
  };
}

export function EnableSessionTanParamsDecoupledToJSONRecursive(
  value?: EnableSessionTanParamsDecoupled | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    kind: value.kind,
    authMethod: value.authMethod,
  };
}

export function EnableSessionTanParamsDecoupledToJSON(
  value?: EnableSessionTanParamsDecoupled | null
): any {
  return EnableSessionTanParamsDecoupledToJSONRecursive(value, false);
}
