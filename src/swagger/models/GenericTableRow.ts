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
  GenericTableRowEntry,
  GenericTableRowEntryFromJSON,
  GenericTableRowEntryFromJSONTyped,
  GenericTableRowEntryToJSON,
} from "./GenericTableRowEntry";
import {
  GenericTableRowSubheading,
  GenericTableRowSubheadingFromJSON,
  GenericTableRowSubheadingFromJSONTyped,
  GenericTableRowSubheadingToJSON,
} from "./GenericTableRowSubheading";
import {
  GenericTableRowText,
  GenericTableRowTextFromJSON,
  GenericTableRowTextFromJSONTyped,
  GenericTableRowTextToJSON,
} from "./GenericTableRowText";

/**
 * @type GenericTableRow
 *
 * @export
 */
export type GenericTableRow =
  | ({ type: "entry" } & GenericTableRowEntry)
  | ({ type: "subheading" } & GenericTableRowSubheading)
  | ({ type: "text" } & GenericTableRowText);

export function GenericTableRowFromJSON(json: any): GenericTableRow {
  return GenericTableRowFromJSONTyped(json, false);
}

export function GenericTableRowFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRow {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["type"]) {
    case "entry":
      return {
        ...GenericTableRowEntryFromJSONTyped(json, true),
        type: "entry",
      };
    case "subheading":
      return {
        ...GenericTableRowSubheadingFromJSONTyped(json, true),
        type: "subheading",
      };
    case "text":
      return { ...GenericTableRowTextFromJSONTyped(json, true), type: "text" };
    default:
      throw new Error(
        `No variant of GenericTableRow exists with 'type=${json["type"]}'`
      );
  }
}

export function GenericTableRowToJSON(value?: GenericTableRow | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["type"]) {
    case "entry":
      return GenericTableRowEntryToJSON(value);
    case "subheading":
      return GenericTableRowSubheadingToJSON(value);
    case "text":
      return GenericTableRowTextToJSON(value);
    default:
      throw new Error(
        `No variant of GenericTableRow exists with 'type=${value["type"]}'`
      );
  }
}
