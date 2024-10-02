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
import {
  TradeDraftOrderCreate,
  TradeDraftOrderCreateFromJSON,
  TradeDraftOrderCreateFromJSONTyped,
  TradeDraftOrderCreateToJSON,
} from "./TradeDraftOrderCreate";

/**
 * Trade drafts are orders saved into for the user, to be reviewed and possibly executed at a later time.
 * @export
 * @interface TradeDraft
 */
export interface TradeDraft {
  /**
   * The date when this trade draft was created
   * @type {Date}
   * @memberof TradeDraft
   */
  createdAt: Date;
  /**
   * Information about the connected order.
   * @type {string}
   * @memberof TradeDraft
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof TradeDraft
   */
  id: string;
  /**
   * Whether the trade draft is still active. Executing or dismissing the trade turns the flag to `true`
   * @type {boolean}
   * @memberof TradeDraft
   */
  inactive: boolean;
  /**
   *
   * @type {TradeDraftOrderCreate}
   * @memberof TradeDraft
   */
  orderData: TradeDraftOrderCreate;
  /**
   * If the trade draft is executed, the returned orderId is saved in here
   * @type {number}
   * @memberof TradeDraft
   */
  orderId: number;
  /**
   *
   * @type {number}
   * @memberof TradeDraft
   */
  userId: number;
}

export function TradeDraftFromJSON(json: any): TradeDraft {
  return TradeDraftFromJSONTyped(json, false);
}

export function TradeDraftFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeDraft {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    createdAt: new Date(json["createdAt"]),
    description: json["description"],
    id: json["id"],
    inactive: json["inactive"],
    orderData: TradeDraftOrderCreateFromJSON(json["orderData"]),
    orderId: json["orderId"],
    userId: json["userId"],
  };
}

export function TradeDraftToJSONRecursive(
  value?: TradeDraft | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    createdAt: value.createdAt.toISOString(),
    description: value.description,
    id: value.id,
    inactive: value.inactive,
    orderData: TradeDraftOrderCreateToJSON(value.orderData),
    orderId: value.orderId,
    userId: value.userId,
  };
}

export function TradeDraftToJSON(value?: TradeDraft | null): any {
  return TradeDraftToJSONRecursive(value, false);
}
