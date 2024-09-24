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
 * Some brokers and exchanges allow adding an order extension that influence how the order is executed.
 *
 * - `FOK`: Fill or kill
 * - `ICO`: Immediate or cancel
 * - `AON`: All or None
 * - `PEA`: Partial executions allowed
 * @export
 */
export const OrderExtension = {
  Fok: "FOK",
  Ioc: "IOC",
  Aon: "AON",
  Pea: "PEA",
} as const;
export type OrderExtension =
  (typeof OrderExtension)[keyof typeof OrderExtension];

export function OrderExtensionFromJSON(json: any): OrderExtension {
  return OrderExtensionFromJSONTyped(json, false);
}

export function OrderExtensionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderExtension {
  return json as OrderExtension;
}

export function OrderExtensionToJSON(value?: OrderExtension | null): any {
  return value as any;
}
