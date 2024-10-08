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
  GenericTableRowValueLinkPortfolioAllOf,
  GenericTableRowValueLinkPortfolioAllOfFromJSON,
  GenericTableRowValueLinkPortfolioAllOfFromJSONTyped,
  GenericTableRowValueLinkPortfolioAllOfToJSON,
} from "./GenericTableRowValueLinkPortfolioAllOf";
import {
  GenericTableRowValueLinkPortfolioSpecifics,
  GenericTableRowValueLinkPortfolioSpecificsFromJSON,
  GenericTableRowValueLinkPortfolioSpecificsFromJSONTyped,
  GenericTableRowValueLinkPortfolioSpecificsToJSON,
} from "./GenericTableRowValueLinkPortfolioSpecifics";

/**
 *
 * @export
 * @interface GenericTableRowValueLinkPortfolio
 */
export interface GenericTableRowValueLinkPortfolio {
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueLinkPortfolio
   */
  type: GenericTableRowValueLinkPortfolioTypeEnum;
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueLinkPortfolio
   */
  portfolioId: string;
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueLinkPortfolio
   */
  text: string;
}

/**
 * @export
 */
export const GenericTableRowValueLinkPortfolioTypeEnum = {
  Portfolio: "portfolio",
} as const;
export type GenericTableRowValueLinkPortfolioTypeEnum =
  (typeof GenericTableRowValueLinkPortfolioTypeEnum)[keyof typeof GenericTableRowValueLinkPortfolioTypeEnum];

export function GenericTableRowValueLinkPortfolioFromJSON(
  json: any
): GenericTableRowValueLinkPortfolio {
  return GenericTableRowValueLinkPortfolioFromJSONTyped(json, false);
}

export function GenericTableRowValueLinkPortfolioFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueLinkPortfolio {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: json["type"],
    portfolioId: json["portfolioId"],
    text: json["text"],
  };
}

export function GenericTableRowValueLinkPortfolioToJSONRecursive(
  value?: GenericTableRowValueLinkPortfolio | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    type: value.type,
    portfolioId: value.portfolioId,
    text: value.text,
  };
}

export function GenericTableRowValueLinkPortfolioToJSON(
  value?: GenericTableRowValueLinkPortfolio | null
): any {
  return GenericTableRowValueLinkPortfolioToJSONRecursive(value, false);
}
