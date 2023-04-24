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
 * @interface DemoAccountSettings
 */
export interface DemoAccountSettings {
  /**
   * Set this to `true` to disallow ending session TANs.
   * @type {boolean}
   * @memberof DemoAccountSettings
   */
  sessionTanCannotBeEnded?: boolean;
  /**
   * Set this to `true` to have the demo account reveal the complete list of auth methods only after
   * the first session TAN challenge request.
   *
   * This also sets `allOperationsRequireSessionTan` to `true` for the account.
   * @type {boolean}
   * @memberof DemoAccountSettings
   */
  lazyAuthMethods?: boolean;
}

export function DemoAccountSettingsFromJSON(json: any): DemoAccountSettings {
  return DemoAccountSettingsFromJSONTyped(json, false);
}

export function DemoAccountSettingsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DemoAccountSettings {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    sessionTanCannotBeEnded: !exists(json, "sessionTanCannotBeEnded")
      ? undefined
      : json["sessionTanCannotBeEnded"],
    lazyAuthMethods: !exists(json, "lazyAuthMethods")
      ? undefined
      : json["lazyAuthMethods"],
  };
}

export function DemoAccountSettingsToJSONRecursive(
  value?: DemoAccountSettings | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    sessionTanCannotBeEnded: value.sessionTanCannotBeEnded,
    lazyAuthMethods: value.lazyAuthMethods,
  };
}

export function DemoAccountSettingsToJSON(
  value?: DemoAccountSettings | null
): any {
  return DemoAccountSettingsToJSONRecursive(value, false);
}