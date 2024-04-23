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
  InboxOrder,
  InboxOrderFromJSON,
  InboxOrderFromJSONTyped,
  InboxOrderToJSON,
} from "./InboxOrder";

/**
 *
 * @export
 * @interface GetActiveInboxOrdersResponse
 */
export interface GetActiveInboxOrdersResponse {
  /**
   *
   * @type {Array<InboxOrder>}
   * @memberof GetActiveInboxOrdersResponse
   */
  inboxOrders: Array<InboxOrder>;
  /**
   *
   * @type {number}
   * @memberof GetActiveInboxOrdersResponse
   */
  totalCount: number;
}

export function GetActiveInboxOrdersResponseFromJSON(
  json: any
): GetActiveInboxOrdersResponse {
  return GetActiveInboxOrdersResponseFromJSONTyped(json, false);
}

export function GetActiveInboxOrdersResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetActiveInboxOrdersResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    inboxOrders: (json["inboxOrders"] as Array<any>).map(InboxOrderFromJSON),
    totalCount: json["totalCount"],
  };
}

export function GetActiveInboxOrdersResponseToJSONRecursive(
  value?: GetActiveInboxOrdersResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    inboxOrders: (value.inboxOrders as Array<any>).map(InboxOrderToJSON),
    totalCount: value.totalCount,
  };
}

export function GetActiveInboxOrdersResponseToJSON(
  value?: GetActiveInboxOrdersResponse | null
): any {
  return GetActiveInboxOrdersResponseToJSONRecursive(value, false);
}
