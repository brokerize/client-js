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
 *
 * @export
 */
export const GenericTableRowValueType = {
  Text: "text",
  Amount: "amount",
  Datetime: "datetime",
  Link: "link",
} as const;
export type GenericTableRowValueType =
  (typeof GenericTableRowValueType)[keyof typeof GenericTableRowValueType];

export function GenericTableRowValueTypeFromJSON(
  json: any
): GenericTableRowValueType {
  return GenericTableRowValueTypeFromJSONTyped(json, false);
}

export function GenericTableRowValueTypeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueType {
  return json as GenericTableRowValueType;
}

export function GenericTableRowValueTypeToJSON(
  value?: GenericTableRowValueType | null
): any {
  return value as any;
}
