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
  ClientConfig,
  ClientConfigFromJSON,
  ClientConfigFromJSONTyped,
  ClientConfigToJSON,
} from "./ClientConfig";

/**
 *
 * @export
 * @interface SetClientConfigRequest
 */
export interface SetClientConfigRequest {
  /**
   *
   * @type {ClientConfig}
   * @memberof SetClientConfigRequest
   */
  config: ClientConfig;
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
    config: ClientConfigFromJSON(json["config"]),
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
    config: ClientConfigToJSON(value.config),
  };
}

export function SetClientConfigRequestToJSON(
  value?: SetClientConfigRequest | null
): any {
  return SetClientConfigRequestToJSONRecursive(value, false);
}
