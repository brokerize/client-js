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
export const DecoupledOperationState = {
  Aborted: "AUTHORIZATION_ABORTED",
  Initial: "AUTHORIZATION_INITIAL",
  UserAccepted: "AUTHORIZATION_USER_ACCEPTED",
  UserCanceled: "AUTHORIZATION_USER_CANCELED",
} as const;
export type DecoupledOperationState =
  (typeof DecoupledOperationState)[keyof typeof DecoupledOperationState];

export function DecoupledOperationStateFromJSON(
  json: any
): DecoupledOperationState {
  return DecoupledOperationStateFromJSONTyped(json, false);
}

export function DecoupledOperationStateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DecoupledOperationState {
  return json as DecoupledOperationState;
}

export function DecoupledOperationStateToJSON(
  value?: DecoupledOperationState | null
): any {
  return value as any;
}
