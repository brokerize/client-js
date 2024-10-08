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

/**
 *
 * @export
 */
export const EnableSessionTanParamsKind = {
  ChallengeResponse: "challengeResponse",
  Decoupled: "decoupled",
  Tan: "tan",
} as const;
export type EnableSessionTanParamsKind =
  (typeof EnableSessionTanParamsKind)[keyof typeof EnableSessionTanParamsKind];

export function EnableSessionTanParamsKindFromJSON(
  json: any
): EnableSessionTanParamsKind {
  return EnableSessionTanParamsKindFromJSONTyped(json, false);
}

export function EnableSessionTanParamsKindFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EnableSessionTanParamsKind {
  return json as EnableSessionTanParamsKind;
}

export function EnableSessionTanParamsKindToJSON(
  value?: EnableSessionTanParamsKind | null
): any {
  return value as any;
}
