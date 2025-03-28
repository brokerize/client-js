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
  BitpandaClientCfg,
  BitpandaClientCfgFromJSON,
  BitpandaClientCfgFromJSONTyped,
  BitpandaClientCfgToJSON,
} from "./BitpandaClientCfg";
import {
  CoinbaseClientCfg,
  CoinbaseClientCfgFromJSON,
  CoinbaseClientCfgFromJSONTyped,
  CoinbaseClientCfgToJSON,
} from "./CoinbaseClientCfg";

/**
 *
 * @export
 * @interface BrokerClientCfg
 */
export interface BrokerClientCfg {
  /**
   *
   * @type {BitpandaClientCfg}
   * @memberof BrokerClientCfg
   */
  bitpanda?: BitpandaClientCfg;
  /**
   *
   * @type {CoinbaseClientCfg}
   * @memberof BrokerClientCfg
   */
  coinbase?: CoinbaseClientCfg;
}

export function BrokerClientCfgFromJSON(json: any): BrokerClientCfg {
  return BrokerClientCfgFromJSONTyped(json, false);
}

export function BrokerClientCfgFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): BrokerClientCfg {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    bitpanda: !exists(json, "bitpanda")
      ? undefined
      : BitpandaClientCfgFromJSON(json["bitpanda"]),
    coinbase: !exists(json, "coinbase")
      ? undefined
      : CoinbaseClientCfgFromJSON(json["coinbase"]),
  };
}

export function BrokerClientCfgToJSONRecursive(
  value?: BrokerClientCfg | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    bitpanda: BitpandaClientCfgToJSON(value.bitpanda),
    coinbase: CoinbaseClientCfgToJSON(value.coinbase),
  };
}

export function BrokerClientCfgToJSON(value?: BrokerClientCfg | null): any {
  return BrokerClientCfgToJSONRecursive(value, false);
}
