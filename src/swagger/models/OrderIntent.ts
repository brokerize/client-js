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

/**
 * OrderIntent `open` means that the order is supposed to open a new position. `close` means that the order is supposed to close an existing position.
 * Note that this is independent of the order's direction (e.g. a short position is closed by a buy order).
 * @export
 */
export const OrderIntent = {
  Open: "open",
  Close: "close",
} as const;
export type OrderIntent = (typeof OrderIntent)[keyof typeof OrderIntent];

export function OrderIntentFromJSON(json: any): OrderIntent {
  return OrderIntentFromJSONTyped(json, false);
}

export function OrderIntentFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderIntent {
  return json as OrderIntent;
}

export function OrderIntentToJSON(value?: OrderIntent | null): any {
  return value as any;
}
