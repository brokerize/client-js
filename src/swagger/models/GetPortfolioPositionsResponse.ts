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

import { exists, mapValues } from "../runtime";
import {
  Position,
  PositionFromJSON,
  PositionFromJSONTyped,
  PositionToJSON,
} from "./Position";

/**
 *
 * @export
 * @interface GetPortfolioPositionsResponse
 */
export interface GetPortfolioPositionsResponse {
  /**
   *
   * @type {Array<Position>}
   * @memberof GetPortfolioPositionsResponse
   */
  positions: Array<Position>;
}

export function GetPortfolioPositionsResponseFromJSON(
  json: any
): GetPortfolioPositionsResponse {
  return GetPortfolioPositionsResponseFromJSONTyped(json, false);
}

export function GetPortfolioPositionsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetPortfolioPositionsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    positions: (json["positions"] as Array<any>).map(PositionFromJSON),
  };
}

export function GetPortfolioPositionsResponseToJSONRecursive(
  value?: GetPortfolioPositionsResponse | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    positions: (value.positions as Array<any>).map(PositionToJSON),
  };
}

export function GetPortfolioPositionsResponseToJSON(
  value?: GetPortfolioPositionsResponse | null
): any {
  return GetPortfolioPositionsResponseToJSONRecursive(value, false);
}
