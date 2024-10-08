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
/**
 *
 * @export
 * @interface AvailablePermissionsNode
 */
export interface AvailablePermissionsNode {
  /**
   *
   * @type {Array<AvailablePermissionsNode>}
   * @memberof AvailablePermissionsNode
   */
  children?: Array<AvailablePermissionsNode>;
  /**
   *
   * @type {string}
   * @memberof AvailablePermissionsNode
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof AvailablePermissionsNode
   */
  permission: string;
}

export function AvailablePermissionsNodeFromJSON(
  json: any
): AvailablePermissionsNode {
  return AvailablePermissionsNodeFromJSONTyped(json, false);
}

export function AvailablePermissionsNodeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AvailablePermissionsNode {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    children: !exists(json, "children")
      ? undefined
      : (json["children"] as Array<any>).map(AvailablePermissionsNodeFromJSON),
    description: json["description"],
    permission: json["permission"],
  };
}

export function AvailablePermissionsNodeToJSONRecursive(
  value?: AvailablePermissionsNode | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    children:
      value.children === undefined
        ? undefined
        : (value.children as Array<any>).map(AvailablePermissionsNodeToJSON),
    description: value.description,
    permission: value.permission,
  };
}

export function AvailablePermissionsNodeToJSON(
  value?: AvailablePermissionsNode | null
): any {
  return AvailablePermissionsNodeToJSONRecursive(value, false);
}
