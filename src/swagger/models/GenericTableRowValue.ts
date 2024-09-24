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

import {
  GenericTableRowValueAmount,
  GenericTableRowValueAmountFromJSON,
  GenericTableRowValueAmountFromJSONTyped,
  GenericTableRowValueAmountToJSON,
} from "./GenericTableRowValueAmount";
import {
  GenericTableRowValueDatetime,
  GenericTableRowValueDatetimeFromJSON,
  GenericTableRowValueDatetimeFromJSONTyped,
  GenericTableRowValueDatetimeToJSON,
} from "./GenericTableRowValueDatetime";
import {
  GenericTableRowValueLink,
  GenericTableRowValueLinkFromJSON,
  GenericTableRowValueLinkFromJSONTyped,
  GenericTableRowValueLinkToJSON,
} from "./GenericTableRowValueLink";
import {
  GenericTableRowValueText,
  GenericTableRowValueTextFromJSON,
  GenericTableRowValueTextFromJSONTyped,
  GenericTableRowValueTextToJSON,
} from "./GenericTableRowValueText";

/**
 * @type GenericTableRowValue
 *
 * @export
 */
export type GenericTableRowValue =
  | ({ type: "amount" } & GenericTableRowValueAmount)
  | ({ type: "datetime" } & GenericTableRowValueDatetime)
  | ({ type: "link" } & GenericTableRowValueLink)
  | ({ type: "text" } & GenericTableRowValueText);

export function GenericTableRowValueFromJSON(json: any): GenericTableRowValue {
  return GenericTableRowValueFromJSONTyped(json, false);
}

export function GenericTableRowValueFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValue {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["type"]) {
    case "amount":
      return {
        ...GenericTableRowValueAmountFromJSONTyped(json, true),
        type: "amount",
      };
    case "datetime":
      return {
        ...GenericTableRowValueDatetimeFromJSONTyped(json, true),
        type: "datetime",
      };
    case "link":
      return {
        ...GenericTableRowValueLinkFromJSONTyped(json, true),
        type: "link",
      };
    case "text":
      return {
        ...GenericTableRowValueTextFromJSONTyped(json, true),
        type: "text",
      };
    default:
      throw new Error(
        `No variant of GenericTableRowValue exists with 'type=${json["type"]}'`
      );
  }
}

export function GenericTableRowValueToJSON(
  value?: GenericTableRowValue | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["type"]) {
    case "amount":
      return GenericTableRowValueAmountToJSON(value);
    case "datetime":
      return GenericTableRowValueDatetimeToJSON(value);
    case "link":
      return GenericTableRowValueLinkToJSON(value);
    case "text":
      return GenericTableRowValueTextToJSON(value);
    default:
      throw new Error(
        `No variant of GenericTableRowValue exists with 'type=${value["type"]}'`
      );
  }
}
