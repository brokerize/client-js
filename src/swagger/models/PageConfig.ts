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
/**
 *
 * @export
 * @interface PageConfig
 */
export interface PageConfig {
  /**
   *
   * @type {string}
   * @memberof PageConfig
   */
  logoUrlDark?: string;
  /**
   *
   * @type {string}
   * @memberof PageConfig
   */
  logoUrlLight?: string;
  /**
   *
   * @type {any}
   * @memberof PageConfig
   */
  themeDark?: any | null;
  /**
   *
   * @type {any}
   * @memberof PageConfig
   */
  themeLight?: any | null;
  /**
   *
   * @type {string}
   * @memberof PageConfig
   */
  title?: string;
}

export function PageConfigFromJSON(json: any): PageConfig {
  return PageConfigFromJSONTyped(json, false);
}

export function PageConfigFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PageConfig {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    logoUrlDark: !exists(json, "logoUrlDark") ? undefined : json["logoUrlDark"],
    logoUrlLight: !exists(json, "logoUrlLight")
      ? undefined
      : json["logoUrlLight"],
    themeDark: !exists(json, "themeDark") ? undefined : json["themeDark"],
    themeLight: !exists(json, "themeLight") ? undefined : json["themeLight"],
    title: !exists(json, "title") ? undefined : json["title"],
  };
}

export function PageConfigToJSONRecursive(
  value?: PageConfig | null,
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
    themeDark: value.themeDark,
    themeLight: value.themeLight,
    title: value.title,
  };
}

export function PageConfigToJSON(value?: PageConfig | null): any {
  return PageConfigToJSONRecursive(value, false);
}
