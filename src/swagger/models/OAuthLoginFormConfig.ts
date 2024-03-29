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
 * @interface OAuthLoginFormConfig
 */
export interface OAuthLoginFormConfig {
  /**
   *
   * @type {string}
   * @memberof OAuthLoginFormConfig
   */
  logoUrlDark?: string;
  /**
   *
   * @type {string}
   * @memberof OAuthLoginFormConfig
   */
  logoUrlLight?: string;
  /**
   *
   * @type {string}
   * @memberof OAuthLoginFormConfig
   */
  appName?: string;
}

export function OAuthLoginFormConfigFromJSON(json: any): OAuthLoginFormConfig {
  return OAuthLoginFormConfigFromJSONTyped(json, false);
}

export function OAuthLoginFormConfigFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OAuthLoginFormConfig {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    logoUrlDark: !exists(json, "logoUrlDark") ? undefined : json["logoUrlDark"],
    logoUrlLight: !exists(json, "logoUrlLight")
      ? undefined
      : json["logoUrlLight"],
    appName: !exists(json, "appName") ? undefined : json["appName"],
  };
}

export function OAuthLoginFormConfigToJSONRecursive(
  value?: OAuthLoginFormConfig | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    logoUrlDark: value.logoUrlDark,
    logoUrlLight: value.logoUrlLight,
    appName: value.appName,
  };
}

export function OAuthLoginFormConfigToJSON(
  value?: OAuthLoginFormConfig | null
): any {
  return OAuthLoginFormConfigToJSONRecursive(value, false);
}
