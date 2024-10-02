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

import {
  GenericTableRowValueLinkPortfolio,
  GenericTableRowValueLinkPortfolioFromJSON,
  GenericTableRowValueLinkPortfolioFromJSONTyped,
  GenericTableRowValueLinkPortfolioToJSON,
} from "./GenericTableRowValueLinkPortfolio";
import {
  GenericTableRowValueLinkUrl,
  GenericTableRowValueLinkUrlFromJSON,
  GenericTableRowValueLinkUrlFromJSONTyped,
  GenericTableRowValueLinkUrlToJSON,
} from "./GenericTableRowValueLinkUrl";

/**
 * @type GenericTableRowValueLinkValue
 *
 * @export
 */
export type GenericTableRowValueLinkValue =
  | ({ type: "portfolio" } & GenericTableRowValueLinkPortfolio)
  | ({ type: "url" } & GenericTableRowValueLinkUrl);

export function GenericTableRowValueLinkValueFromJSON(
  json: any
): GenericTableRowValueLinkValue {
  return GenericTableRowValueLinkValueFromJSONTyped(json, false);
}

export function GenericTableRowValueLinkValueFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueLinkValue {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["type"]) {
    case "portfolio":
      return {
        ...GenericTableRowValueLinkPortfolioFromJSONTyped(json, true),
        type: "portfolio",
      };
    case "url":
      return {
        ...GenericTableRowValueLinkUrlFromJSONTyped(json, true),
        type: "url",
      };
    default:
      throw new Error(
        `No variant of GenericTableRowValueLinkValue exists with 'type=${json["type"]}'`
      );
  }
}

export function GenericTableRowValueLinkValueToJSON(
  value?: GenericTableRowValueLinkValue | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["type"]) {
    case "portfolio":
      return GenericTableRowValueLinkPortfolioToJSON(value);
    case "url":
      return GenericTableRowValueLinkUrlToJSON(value);
    default:
      throw new Error(
        `No variant of GenericTableRowValueLinkValue exists with 'type=${value["type"]}'`
      );
  }
}
