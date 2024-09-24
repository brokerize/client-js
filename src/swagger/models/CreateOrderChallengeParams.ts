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
  OrderCreate,
  OrderCreateFromJSON,
  OrderCreateFromJSONTyped,
  OrderCreateToJSON,
} from "./OrderCreate";

/**
 *
 * @export
 * @interface CreateOrderChallengeParams
 */
export interface CreateOrderChallengeParams {
  /**
   * If the order has been rejected with code `MUST_ACCEPT_HINT` before, the order creation can be retried with setting the
   * `acceptHintId` accordingly after letting the user accept the hint.
   * @type {string}
   * @memberof CreateOrderChallengeParams
   */
  acceptHintId?: string;
  /**
   *
   * @type {string}
   * @memberof CreateOrderChallengeParams
   */
  authMethod?: string;
  /**
   *
   * @type {OrderCreate}
   * @memberof CreateOrderChallengeParams
   */
  order: OrderCreate;
}

export function CreateOrderChallengeParamsFromJSON(
  json: any
): CreateOrderChallengeParams {
  return CreateOrderChallengeParamsFromJSONTyped(json, false);
}

export function CreateOrderChallengeParamsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateOrderChallengeParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    acceptHintId: !exists(json, "acceptHintId")
      ? undefined
      : json["acceptHintId"],
    authMethod: !exists(json, "authMethod") ? undefined : json["authMethod"],
    order: OrderCreateFromJSON(json["order"]),
  };
}

export function CreateOrderChallengeParamsToJSONRecursive(
  value?: CreateOrderChallengeParams | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    acceptHintId: value.acceptHintId,
    authMethod: value.authMethod,
    order: OrderCreateToJSON(value.order),
  };
}

export function CreateOrderChallengeParamsToJSON(
  value?: CreateOrderChallengeParams | null
): any {
  return CreateOrderChallengeParamsToJSONRecursive(value, false);
}
