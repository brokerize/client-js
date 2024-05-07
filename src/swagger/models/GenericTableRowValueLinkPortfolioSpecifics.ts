/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage with a unified interface. For more information, visit brokerize.com
 *
 * The version of the OpenAPI document: 0.0.1-preview
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface GenericTableRowValueLinkPortfolioSpecifics
 */
export interface GenericTableRowValueLinkPortfolioSpecifics {
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueLinkPortfolioSpecifics
   */
  portfolioId?: string;
  /**
   *
   * @type {string}
   * @memberof GenericTableRowValueLinkPortfolioSpecifics
   */
  text?: string;
}

export function GenericTableRowValueLinkPortfolioSpecificsFromJSON(
  json: any
): GenericTableRowValueLinkPortfolioSpecifics {
  return GenericTableRowValueLinkPortfolioSpecificsFromJSONTyped(json, false);
}

export function GenericTableRowValueLinkPortfolioSpecificsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GenericTableRowValueLinkPortfolioSpecifics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    portfolioId: !exists(json, "portfolioId") ? undefined : json["portfolioId"],
    text: !exists(json, "text") ? undefined : json["text"],
  };
}

export function GenericTableRowValueLinkPortfolioSpecificsToJSONRecursive(
  value?: GenericTableRowValueLinkPortfolioSpecifics | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    portfolioId: value.portfolioId,
    text: value.text,
  };
}

export function GenericTableRowValueLinkPortfolioSpecificsToJSON(
  value?: GenericTableRowValueLinkPortfolioSpecifics | null
): any {
  return GenericTableRowValueLinkPortfolioSpecificsToJSONRecursive(
    value,
    false
  );
}
