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
  CreateModeSessionTanAllOf,
  CreateModeSessionTanAllOfFromJSON,
  CreateModeSessionTanAllOfFromJSONTyped,
  CreateModeSessionTanAllOfToJSON,
} from "./CreateModeSessionTanAllOf";

/**
 *
 * @export
 * @interface CreateModeSessionTan
 */
export interface CreateModeSessionTan {
  /**
   *
   * @type {string}
   * @memberof CreateModeSessionTan
   */
  mode: CreateModeSessionTanModeEnum;
}

/**
 * @export
 */
export const CreateModeSessionTanModeEnum = {
  SessionTan: "sessionTan",
} as const;
export type CreateModeSessionTanModeEnum =
  (typeof CreateModeSessionTanModeEnum)[keyof typeof CreateModeSessionTanModeEnum];

export function CreateModeSessionTanFromJSON(json: any): CreateModeSessionTan {
  return CreateModeSessionTanFromJSONTyped(json, false);
}

export function CreateModeSessionTanFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateModeSessionTan {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    mode: json["mode"],
  };
}

export function CreateModeSessionTanToJSONRecursive(
  value?: CreateModeSessionTan | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    mode: value.mode,
  };
}

export function CreateModeSessionTanToJSON(
  value?: CreateModeSessionTan | null
): any {
  return CreateModeSessionTanToJSONRecursive(value, false);
}
