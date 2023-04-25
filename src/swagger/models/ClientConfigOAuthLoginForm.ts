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
  OAuthLoginFormConfig,
  OAuthLoginFormConfigFromJSON,
  OAuthLoginFormConfigFromJSONTyped,
  OAuthLoginFormConfigToJSON,
} from "./OAuthLoginFormConfig";

/**
 *
 * @export
 * @interface ClientConfigOAuthLoginForm
 */
export interface ClientConfigOAuthLoginForm {
  /**
   *
   * @type {string}
   * @memberof ClientConfigOAuthLoginForm
   */
  logoUrlDark?: string;
  /**
   *
   * @type {string}
   * @memberof ClientConfigOAuthLoginForm
   */
  logoUrlLight?: string;
  /**
   *
   * @type {string}
   * @memberof ClientConfigOAuthLoginForm
   */
  appName?: string;
}

export function ClientConfigOAuthLoginFormFromJSON(
  json: any
): ClientConfigOAuthLoginForm {
  return ClientConfigOAuthLoginFormFromJSONTyped(json, false);
}

export function ClientConfigOAuthLoginFormFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ClientConfigOAuthLoginForm {
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

export function ClientConfigOAuthLoginFormToJSONRecursive(
  value?: ClientConfigOAuthLoginForm | null,
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

export function ClientConfigOAuthLoginFormToJSON(
  value?: ClientConfigOAuthLoginForm | null
): any {
  return ClientConfigOAuthLoginFormToJSONRecursive(value, false);
}