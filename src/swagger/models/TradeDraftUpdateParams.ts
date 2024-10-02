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
  TradeDraftUpdateParamsOrderId,
  TradeDraftUpdateParamsOrderIdFromJSON,
  TradeDraftUpdateParamsOrderIdFromJSONTyped,
  TradeDraftUpdateParamsOrderIdToJSON,
} from "./TradeDraftUpdateParamsOrderId";

/**
 *
 * @export
 * @interface TradeDraftUpdateParams
 */
export interface TradeDraftUpdateParams {
  /**
   *
   * @type {string}
   * @memberof TradeDraftUpdateParams
   */
  description?: string;
  /**
   *
   * @type {boolean}
   * @memberof TradeDraftUpdateParams
   */
  inactive?: boolean;
  /**
   *
   * @type {TradeDraftUpdateParamsOrderId}
   * @memberof TradeDraftUpdateParams
   */
  orderId?: TradeDraftUpdateParamsOrderId;
}

export function TradeDraftUpdateParamsFromJSON(
  json: any
): TradeDraftUpdateParams {
  return TradeDraftUpdateParamsFromJSONTyped(json, false);
}

export function TradeDraftUpdateParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TradeDraftUpdateParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    description: !exists(json, "description") ? undefined : json["description"],
    inactive: !exists(json, "inactive") ? undefined : json["inactive"],
    orderId: !exists(json, "orderId")
      ? undefined
      : TradeDraftUpdateParamsOrderIdFromJSON(json["orderId"]),
  };
}

export function TradeDraftUpdateParamsToJSONRecursive(
  value?: TradeDraftUpdateParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    description: value.description,
    inactive: value.inactive,
    orderId: TradeDraftUpdateParamsOrderIdToJSON(value.orderId),
  };
}

export function TradeDraftUpdateParamsToJSON(
  value?: TradeDraftUpdateParams | null
): any {
  return TradeDraftUpdateParamsToJSONRecursive(value, false);
}
