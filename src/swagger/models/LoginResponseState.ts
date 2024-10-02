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

/**
 *
 * @export
 */
export const LoginResponseState = {
  Ready: "ready",
  Challenge: "challenge",
} as const;
export type LoginResponseState =
  (typeof LoginResponseState)[keyof typeof LoginResponseState];

export function LoginResponseStateFromJSON(json: any): LoginResponseState {
  return LoginResponseStateFromJSONTyped(json, false);
}

export function LoginResponseStateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): LoginResponseState {
  return json as LoginResponseState;
}

export function LoginResponseStateToJSON(
  value?: LoginResponseState | null
): any {
  return value as any;
}
