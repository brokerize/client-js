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
import {
  Amount,
  AmountFromJSON,
  AmountFromJSONTyped,
  AmountToJSON,
} from "./Amount";
import {
  Direction,
  DirectionFromJSON,
  DirectionFromJSONTyped,
  DirectionToJSON,
} from "./Direction";
import {
  PositionValuation,
  PositionValuationFromJSON,
  PositionValuationFromJSONTyped,
  PositionValuationToJSON,
} from "./PositionValuation";
import {
  Security,
  SecurityFromJSON,
  SecurityFromJSONTyped,
  SecurityToJSON,
} from "./Security";

/**
 *
 * @export
 * @interface Position
 */
export interface Position {
  /**
   * How much of the position is available for sale.
   * @type {number}
   * @memberof Position
   */
  availableSize: number;
  /**
   * The exchange id as defined by the broker.
   * @type {string}
   * @memberof Position
   */
  brokerExchangeId?: string;
  /**
   * Textual comment for the position.
   * @type {string}
   * @memberof Position
   */
  comment?: string;
  /**
   * True if the user may edit a comment for this position.
   * @type {boolean}
   * @memberof Position
   */
  commentIsEditable?: boolean;
  /**
   *
   * @type {PositionValuation}
   * @memberof Position
   */
  currentValuation?: PositionValuation;
  /**
   *
   * @type {Direction}
   * @memberof Position
   */
  direction?: Direction;
  /**
   * The mapped exchange id, as retrievable in the the `/exchanges` endpoint.
   * @type {number}
   * @memberof Position
   */
  exchangeId?: number;
  /**
   * Name of the exchange, as provided by the broker.
   * @type {string}
   * @memberof Position
   */
  exchangeName?: string;
  /**
   *
   * @type {string}
   * @memberof Position
   */
  id: string;
  /**
   *
   * @type {PositionValuation}
   * @memberof Position
   */
  prevCloseValuation?: PositionValuation;
  /**
   *
   * @type {Amount}
   * @memberof Position
   */
  profitLossAbs?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof Position
   */
  profitLossAbsPrevClose?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof Position
   */
  profitLossAbsWithDividends?: Amount;
  /**
   * Relative P/L of the entire posiiton, since acquisition. 1 means +100%
   * @type {number}
   * @memberof Position
   */
  profitLossRel?: number;
  /**
   * Relative P/L of the entire posiiton, since "prevClose". 1 means +100%
   * @type {number}
   * @memberof Position
   */
  profitLossRelPrevClose?: number;
  /**
   * Relative P/L of the entire position, since acquisition, but including the dividends booked for this position (see `totalDividends`). 1 means +100%
   * @type {number}
   * @memberof Position
   */
  profitLossRelWithDividends?: number;
  /**
   * Date in the format YYYY-MM-DD
   * @type {string}
   * @memberof Position
   */
  purchaseDate?: string;
  /**
   * Date and time of position purchase. If not set, purchaseDate may at least contain the date.
   * @type {Date}
   * @memberof Position
   */
  purchaseDateTime?: Date;
  /**
   *
   * @type {PositionValuation}
   * @memberof Position
   */
  purchaseValuation?: PositionValuation;
  /**
   *
   * @type {Security}
   * @memberof Position
   */
  security: Security;
  /**
   *
   * @type {number}
   * @memberof Position
   */
  size: number;
  /**
   * If present, defines how many decimal places should be displayed for size values.
   * @type {number}
   * @memberof Position
   */
  sizeDecimals?: number;
  /**
   * - ISO code (e.g. EUR for Euro), if it is a monetary amount
   * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
   * - or 'XXX' if it is pieces
   * - or 'PRC' if it is a percentage
   * - or 'PRM' if it is permil
   * - or 'XXP' if it is points (as for indices)
   * - or 'GRAMS' if it is grams (as for precious metals)
   * @type {string}
   * @memberof Position
   */
  sizeUnit: string;
  /**
   *
   * @type {string}
   * @memberof Position
   */
  sourceData?: string;
}

export function PositionFromJSON(json: any): Position {
  return PositionFromJSONTyped(json, false);
}

export function PositionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Position {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    availableSize: json["availableSize"],
    brokerExchangeId: !exists(json, "brokerExchangeId")
      ? undefined
      : json["brokerExchangeId"],
    comment: !exists(json, "comment") ? undefined : json["comment"],
    commentIsEditable: !exists(json, "commentIsEditable")
      ? undefined
      : json["commentIsEditable"],
    currentValuation: !exists(json, "currentValuation")
      ? undefined
      : PositionValuationFromJSON(json["currentValuation"]),
    direction: !exists(json, "direction")
      ? undefined
      : DirectionFromJSON(json["direction"]),
    exchangeId: !exists(json, "exchangeId") ? undefined : json["exchangeId"],
    exchangeName: !exists(json, "exchangeName")
      ? undefined
      : json["exchangeName"],
    id: json["id"],
    prevCloseValuation: !exists(json, "prevCloseValuation")
      ? undefined
      : PositionValuationFromJSON(json["prevCloseValuation"]),
    profitLossAbs: !exists(json, "profitLossAbs")
      ? undefined
      : AmountFromJSON(json["profitLossAbs"]),
    profitLossAbsPrevClose: !exists(json, "profitLossAbsPrevClose")
      ? undefined
      : AmountFromJSON(json["profitLossAbsPrevClose"]),
    profitLossAbsWithDividends: !exists(json, "profitLossAbsWithDividends")
      ? undefined
      : AmountFromJSON(json["profitLossAbsWithDividends"]),
    profitLossRel: !exists(json, "profitLossRel")
      ? undefined
      : json["profitLossRel"],
    profitLossRelPrevClose: !exists(json, "profitLossRelPrevClose")
      ? undefined
      : json["profitLossRelPrevClose"],
    profitLossRelWithDividends: !exists(json, "profitLossRelWithDividends")
      ? undefined
      : json["profitLossRelWithDividends"],
    purchaseDate: !exists(json, "purchaseDate")
      ? undefined
      : json["purchaseDate"],
    purchaseDateTime: !exists(json, "purchaseDateTime")
      ? undefined
      : new Date(json["purchaseDateTime"]),
    purchaseValuation: !exists(json, "purchaseValuation")
      ? undefined
      : PositionValuationFromJSON(json["purchaseValuation"]),
    security: SecurityFromJSON(json["security"]),
    size: json["size"],
    sizeDecimals: !exists(json, "sizeDecimals")
      ? undefined
      : json["sizeDecimals"],
    sizeUnit: json["sizeUnit"],
    sourceData: !exists(json, "sourceData") ? undefined : json["sourceData"],
  };
}

export function PositionToJSONRecursive(
  value?: Position | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    availableSize: value.availableSize,
    brokerExchangeId: value.brokerExchangeId,
    comment: value.comment,
    commentIsEditable: value.commentIsEditable,
    currentValuation: PositionValuationToJSON(value.currentValuation),
    direction: DirectionToJSON(value.direction),
    exchangeId: value.exchangeId,
    exchangeName: value.exchangeName,
    id: value.id,
    prevCloseValuation: PositionValuationToJSON(value.prevCloseValuation),
    profitLossAbs: AmountToJSON(value.profitLossAbs),
    profitLossAbsPrevClose: AmountToJSON(value.profitLossAbsPrevClose),
    profitLossAbsWithDividends: AmountToJSON(value.profitLossAbsWithDividends),
    profitLossRel: value.profitLossRel,
    profitLossRelPrevClose: value.profitLossRelPrevClose,
    profitLossRelWithDividends: value.profitLossRelWithDividends,
    purchaseDate: value.purchaseDate,
    purchaseDateTime:
      value.purchaseDateTime === undefined
        ? undefined
        : value.purchaseDateTime.toISOString(),
    purchaseValuation: PositionValuationToJSON(value.purchaseValuation),
    security: SecurityToJSON(value.security),
    size: value.size,
    sizeDecimals: value.sizeDecimals,
    sizeUnit: value.sizeUnit,
    sourceData: value.sourceData,
  };
}

export function PositionToJSON(value?: Position | null): any {
  return PositionToJSONRecursive(value, false);
}
