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
  Exchange,
  ExchangeFromJSON,
  ExchangeFromJSONTyped,
  ExchangeToJSON,
} from "./Exchange";
import {
  OrderIntentAvailability,
  OrderIntentAvailabilityFromJSON,
  OrderIntentAvailabilityFromJSONTyped,
  OrderIntentAvailabilityToJSON,
} from "./OrderIntentAvailability";
import {
  RiskClassInfo,
  RiskClassInfoFromJSON,
  RiskClassInfoFromJSONTyped,
  RiskClassInfoToJSON,
} from "./RiskClassInfo";
import {
  Security,
  SecurityFromJSON,
  SecurityFromJSONTyped,
  SecurityToJSON,
} from "./Security";
import {
  SecurityDetailedInfo,
  SecurityDetailedInfoFromJSON,
  SecurityDetailedInfoFromJSONTyped,
  SecurityDetailedInfoToJSON,
} from "./SecurityDetailedInfo";
import {
  SellPosition,
  SellPositionFromJSON,
  SellPositionFromJSONTyped,
  SellPositionToJSON,
} from "./SellPosition";
import {
  SizeUnitConstraint,
  SizeUnitConstraintFromJSON,
  SizeUnitConstraintFromJSONTyped,
  SizeUnitConstraintToJSON,
} from "./SizeUnitConstraint";

/**
 *
 * @export
 * @interface PreparedTrade
 */
export interface PreparedTrade {
  /**
   *
   * @type {OrderIntentAvailability}
   * @memberof PreparedTrade
   */
  availableOrderIntents?: OrderIntentAvailability;
  /**
   * If available, the available order intents can be polled/subscribed using this token. In this case,
   * the `availableOrderIntents` field must be regarded as the initial snapshot.
   * @type {string}
   * @memberof PreparedTrade
   */
  availableOrderIntentsToken?: string;
  /**
   * The broker security id is the unique identifier for the security *at the given broker*. It is
   * used in subsequent requests in the order creation process to identify the security.
   * @type {string}
   * @memberof PreparedTrade
   */
  brokerSecurityId: string;
  /**
   * True if no cost estimation is available at all for this instrument.
   * @type {boolean}
   * @memberof PreparedTrade
   */
  costEstimationIsNotAvailable: boolean;
  /**
   * If this is true, cost estimations only have the detailed table property, so it is not feasible
   * to embed them into the order form, but show the table in a dedicated view.
   * @type {boolean}
   * @memberof PreparedTrade
   */
  costEstimationIsOnlyDetailedTable?: boolean;
  /**
   * If this is true, the estimated order costs must be shown before the user can create the order.
   * If this is false, showing the order costs is optional.
   * @type {boolean}
   * @memberof PreparedTrade
   */
  costEstimationMustBeShown: boolean;
  /**
   *
   * @type {Array<Exchange>}
   * @memberof PreparedTrade
   */
  exchanges: Array<Exchange>;
  /**
   * If this is true, frontends are not allowed to set an exchange default. Users must select an exchange explicitly.
   * @type {boolean}
   * @memberof PreparedTrade
   */
  noExchangeDefault?: boolean;
  /**
   *
   * @type {RiskClassInfo}
   * @memberof PreparedTrade
   */
  riskClassInfo?: RiskClassInfo;
  /**
   *
   * @type {Security}
   * @memberof PreparedTrade
   */
  security: Security;
  /**
   *
   * @type {SecurityDetailedInfo}
   * @memberof PreparedTrade
   */
  securityDetailedInfo?: SecurityDetailedInfo;
  /**
   * If this is set, the user has to select a position to sell from. This may be the case if a position is
   * stored in different locations or sub-positions are blocked until some date.
   * If the user does not need to specify the position, this is left undefined.
   * If it is set, user interfaces should offer a dropdown for selecting the position.
   * @type {Array<SellPosition>}
   * @memberof PreparedTrade
   */
  sellPositions?: Array<SellPosition>;
  /**
   * The maximum number of decimal places specified for each sizeUnit.
   * If it is defined for the selected sizeUnit, frontends should limit the number input to this number of decimal places.
   * If it is not defined, the number of decimal places is unknown and frontends should allow any number.
   * @type {{ [key: string]: number; }}
   * @memberof PreparedTrade
   */
  sizeMaxDecimalsBySizeUnit?: { [key: string]: number };
  /**
   * - ISO code (e.g. EUR for Euro), if it is a monetary amount
   * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
   * - or 'XXX' if it is pieces
   * - or 'PRC' if it is a percentage
   * - or 'PRM' if it is permil
   * - or 'XXP' if it is points (as for indices)
   * - or 'GRAMS' if it is grams (as for precious metals)
   * @type {string}
   * @memberof PreparedTrade
   */
  sizeUnit: string;
  /**
   * If present, this defines which sizeUnits are available for a combination of cashAccountId, orderModel and direction.
   * An entry in this list is considered a match if all specified attributes match.
   *
   * For example, if an entry specifies orderModels and directions and both orderModel and direction are included
   * in the respective attributes in the constraint, the entry specifies the available sizeUnits.
   * @type {Array<SizeUnitConstraint>}
   * @memberof PreparedTrade
   */
  sizeUnitConstraints?: Array<SizeUnitConstraint>;
  /**
   *
   * @type {{ [key: string]: Array<string>; }}
   * @memberof PreparedTrade
   */
  sizeUnitsByCashAccountId?: { [key: string]: Array<string> };
  /**
   * If present, this hint must be displayed in the order form. It should be visible during the order
   * creation process, but does not need to be accepted by the user explicitly.
   * @type {string}
   * @memberof PreparedTrade
   */
  strikingHint?: string;
}

export function PreparedTradeFromJSON(json: any): PreparedTrade {
  return PreparedTradeFromJSONTyped(json, false);
}

export function PreparedTradeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PreparedTrade {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    availableOrderIntents: !exists(json, "availableOrderIntents")
      ? undefined
      : OrderIntentAvailabilityFromJSON(json["availableOrderIntents"]),
    availableOrderIntentsToken: !exists(json, "availableOrderIntentsToken")
      ? undefined
      : json["availableOrderIntentsToken"],
    brokerSecurityId: json["brokerSecurityId"],
    costEstimationIsNotAvailable: json["costEstimationIsNotAvailable"],
    costEstimationIsOnlyDetailedTable: !exists(
      json,
      "costEstimationIsOnlyDetailedTable"
    )
      ? undefined
      : json["costEstimationIsOnlyDetailedTable"],
    costEstimationMustBeShown: json["costEstimationMustBeShown"],
    exchanges: (json["exchanges"] as Array<any>).map(ExchangeFromJSON),
    noExchangeDefault: !exists(json, "noExchangeDefault")
      ? undefined
      : json["noExchangeDefault"],
    riskClassInfo: !exists(json, "riskClassInfo")
      ? undefined
      : RiskClassInfoFromJSON(json["riskClassInfo"]),
    security: SecurityFromJSON(json["security"]),
    securityDetailedInfo: !exists(json, "securityDetailedInfo")
      ? undefined
      : SecurityDetailedInfoFromJSON(json["securityDetailedInfo"]),
    sellPositions: !exists(json, "sellPositions")
      ? undefined
      : (json["sellPositions"] as Array<any>).map(SellPositionFromJSON),
    sizeMaxDecimalsBySizeUnit: !exists(json, "sizeMaxDecimalsBySizeUnit")
      ? undefined
      : json["sizeMaxDecimalsBySizeUnit"],
    sizeUnit: json["sizeUnit"],
    sizeUnitConstraints: !exists(json, "sizeUnitConstraints")
      ? undefined
      : (json["sizeUnitConstraints"] as Array<any>).map(
          SizeUnitConstraintFromJSON
        ),
    sizeUnitsByCashAccountId: !exists(json, "sizeUnitsByCashAccountId")
      ? undefined
      : json["sizeUnitsByCashAccountId"],
    strikingHint: !exists(json, "strikingHint")
      ? undefined
      : json["strikingHint"],
  };
}

export function PreparedTradeToJSONRecursive(
  value?: PreparedTrade | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    availableOrderIntents: OrderIntentAvailabilityToJSON(
      value.availableOrderIntents
    ),
    availableOrderIntentsToken: value.availableOrderIntentsToken,
    brokerSecurityId: value.brokerSecurityId,
    costEstimationIsNotAvailable: value.costEstimationIsNotAvailable,
    costEstimationIsOnlyDetailedTable: value.costEstimationIsOnlyDetailedTable,
    costEstimationMustBeShown: value.costEstimationMustBeShown,
    exchanges: (value.exchanges as Array<any>).map(ExchangeToJSON),
    noExchangeDefault: value.noExchangeDefault,
    riskClassInfo: RiskClassInfoToJSON(value.riskClassInfo),
    security: SecurityToJSON(value.security),
    securityDetailedInfo: SecurityDetailedInfoToJSON(
      value.securityDetailedInfo
    ),
    sellPositions:
      value.sellPositions === undefined
        ? undefined
        : (value.sellPositions as Array<any>).map(SellPositionToJSON),
    sizeMaxDecimalsBySizeUnit: value.sizeMaxDecimalsBySizeUnit,
    sizeUnit: value.sizeUnit,
    sizeUnitConstraints:
      value.sizeUnitConstraints === undefined
        ? undefined
        : (value.sizeUnitConstraints as Array<any>).map(
            SizeUnitConstraintToJSON
          ),
    sizeUnitsByCashAccountId: value.sizeUnitsByCashAccountId,
    strikingHint: value.strikingHint,
  };
}

export function PreparedTradeToJSON(value?: PreparedTrade | null): any {
  return PreparedTradeToJSONRecursive(value, false);
}
