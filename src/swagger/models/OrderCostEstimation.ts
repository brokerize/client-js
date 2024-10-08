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
  Amount,
  AmountFromJSON,
  AmountFromJSONTyped,
  AmountToJSON,
} from "./Amount";
import {
  CostDetailsLink,
  CostDetailsLinkFromJSON,
  CostDetailsLinkFromJSONTyped,
  CostDetailsLinkToJSON,
} from "./CostDetailsLink";
import {
  GenericTable,
  GenericTableFromJSON,
  GenericTableFromJSONTyped,
  GenericTableToJSON,
} from "./GenericTable";

/**
 *
 * @export
 * @interface OrderCostEstimation
 */
export interface OrderCostEstimation {
  /**
   * If present, users have to accept this message before creating an order.
   * If accepting the costs and performing the order is one click (which is allowed), the create order button label
   * must contain the information that costs are accepted.
   * @type {string}
   * @memberof OrderCostEstimation
   */
  costAcceptancePrompt?: string;
  /**
   *
   * @type {CostDetailsLink}
   * @memberof OrderCostEstimation
   */
  costDetailsLink?: CostDetailsLink;
  /**
   *
   * @type {GenericTable}
   * @memberof OrderCostEstimation
   */
  detailedTable?: GenericTable;
  /**
   *
   * @type {Amount}
   * @memberof OrderCostEstimation
   */
  entryCosts?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof OrderCostEstimation
   */
  expectedCounterValue?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof OrderCostEstimation
   */
  orderFees?: Amount;
  /**
   * Detailed explanation for order fees
   * @type {string}
   * @memberof OrderCostEstimation
   */
  orderFeesExplanation?: string;
  /**
   *
   * @type {Amount}
   * @memberof OrderCostEstimation
   */
  totalCosts?: Amount;
  /**
   *
   * @type {Amount}
   * @memberof OrderCostEstimation
   */
  transactionTax?: Amount;
}

export function OrderCostEstimationFromJSON(json: any): OrderCostEstimation {
  return OrderCostEstimationFromJSONTyped(json, false);
}

export function OrderCostEstimationFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OrderCostEstimation {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    costAcceptancePrompt: !exists(json, "costAcceptancePrompt")
      ? undefined
      : json["costAcceptancePrompt"],
    costDetailsLink: !exists(json, "costDetailsLink")
      ? undefined
      : CostDetailsLinkFromJSON(json["costDetailsLink"]),
    detailedTable: !exists(json, "detailedTable")
      ? undefined
      : GenericTableFromJSON(json["detailedTable"]),
    entryCosts: !exists(json, "entryCosts")
      ? undefined
      : AmountFromJSON(json["entryCosts"]),
    expectedCounterValue: !exists(json, "expectedCounterValue")
      ? undefined
      : AmountFromJSON(json["expectedCounterValue"]),
    orderFees: !exists(json, "orderFees")
      ? undefined
      : AmountFromJSON(json["orderFees"]),
    orderFeesExplanation: !exists(json, "orderFeesExplanation")
      ? undefined
      : json["orderFeesExplanation"],
    totalCosts: !exists(json, "totalCosts")
      ? undefined
      : AmountFromJSON(json["totalCosts"]),
    transactionTax: !exists(json, "transactionTax")
      ? undefined
      : AmountFromJSON(json["transactionTax"]),
  };
}

export function OrderCostEstimationToJSONRecursive(
  value?: OrderCostEstimation | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    costAcceptancePrompt: value.costAcceptancePrompt,
    costDetailsLink: CostDetailsLinkToJSON(value.costDetailsLink),
    detailedTable: GenericTableToJSON(value.detailedTable),
    entryCosts: AmountToJSON(value.entryCosts),
    expectedCounterValue: AmountToJSON(value.expectedCounterValue),
    orderFees: AmountToJSON(value.orderFees),
    orderFeesExplanation: value.orderFeesExplanation,
    totalCosts: AmountToJSON(value.totalCosts),
    transactionTax: AmountToJSON(value.transactionTax),
  };
}

export function OrderCostEstimationToJSON(
  value?: OrderCostEstimation | null
): any {
  return OrderCostEstimationToJSONRecursive(value, false);
}
