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

/**
 *
 * @export
 */
export const CancelOrderParamsMode = {
  SessionTan: "sessionTan",
  ChallengeResponse: "challengeResponse",
} as const;
export type CancelOrderParamsMode =
  (typeof CancelOrderParamsMode)[keyof typeof CancelOrderParamsMode];

export function CancelOrderParamsModeFromJSON(
  json: any
): CancelOrderParamsMode {
  return CancelOrderParamsModeFromJSONTyped(json, false);
}

export function CancelOrderParamsModeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CancelOrderParamsMode {
  return json as CancelOrderParamsMode;
}

export function CancelOrderParamsModeToJSON(
  value?: CancelOrderParamsMode | null
): any {
  return value as any;
}
