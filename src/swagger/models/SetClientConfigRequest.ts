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
  ClientConfigUpdate,
  ClientConfigUpdateFromJSON,
  ClientConfigUpdateFromJSONTyped,
  ClientConfigUpdateToJSON,
} from "./ClientConfigUpdate";

/**
 *
 * @export
 * @interface SetClientConfigRequest
 */
export interface SetClientConfigRequest {
  /**
   *
   * @type {ClientConfigUpdate}
   * @memberof SetClientConfigRequest
   */
  config: ClientConfigUpdate;
}

export function SetClientConfigRequestFromJSON(
  json: any
): SetClientConfigRequest {
  return SetClientConfigRequestFromJSONTyped(json, false);
}

export function SetClientConfigRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SetClientConfigRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    config: ClientConfigUpdateFromJSON(json["config"]),
  };
}

export function SetClientConfigRequestToJSONRecursive(
  value?: SetClientConfigRequest | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    config: ClientConfigUpdateToJSON(value.config),
  };
}

export function SetClientConfigRequestToJSON(
  value?: SetClientConfigRequest | null
): any {
  return SetClientConfigRequestToJSONRecursive(value, false);
}
