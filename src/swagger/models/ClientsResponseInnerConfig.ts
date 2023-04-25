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
  BrokerEnvFilterType,
  BrokerEnvFilterTypeFromJSON,
  BrokerEnvFilterTypeFromJSONTyped,
  BrokerEnvFilterTypeToJSON,
} from "./BrokerEnvFilterType";
import {
  ClientsResponseInnerConfigMaintenanceStatus,
  ClientsResponseInnerConfigMaintenanceStatusFromJSON,
  ClientsResponseInnerConfigMaintenanceStatusFromJSONTyped,
  ClientsResponseInnerConfigMaintenanceStatusToJSON,
} from "./ClientsResponseInnerConfigMaintenanceStatus";
import {
  OAuthLoginFormConfig,
  OAuthLoginFormConfigFromJSON,
  OAuthLoginFormConfigFromJSONTyped,
  OAuthLoginFormConfigToJSON,
} from "./OAuthLoginFormConfig";

/**
 *
 * @export
 * @interface ClientsResponseInnerConfig
 */
export interface ClientsResponseInnerConfig {
  /**
   *
   * @type {any}
   * @memberof ClientsResponseInnerConfig
   */
  page: any | null;
  /**
   *
   * @type {ClientsResponseInnerConfigMaintenanceStatus}
   * @memberof ClientsResponseInnerConfig
   */
  maintenanceStatus: ClientsResponseInnerConfigMaintenanceStatus | null;
  /**
   *
   * @type {boolean}
   * @memberof ClientsResponseInnerConfig
   */
  enabled: boolean;
  /**
   *
   * @type {OAuthLoginFormConfig}
   * @memberof ClientsResponseInnerConfig
   */
  oAuthLoginForm?: OAuthLoginFormConfig;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientsResponseInnerConfig
   */
  oAuthReturnToRegularExpressions: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientsResponseInnerConfig
   */
  oAuthReturnToUrls: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientsResponseInnerConfig
   */
  cognitoClientIds: Array<string>;
  /**
   *
   * @type {{ [key: string]: BrokerEnvFilterType; }}
   * @memberof ClientsResponseInnerConfig
   */
  brokerEnvFilter: { [key: string]: BrokerEnvFilterType };
  /**
   *
   * @type {boolean}
   * @memberof ClientsResponseInnerConfig
   */
  allowRequestsWithoutOrigin: boolean;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientsResponseInnerConfig
   */
  allowedOrigins: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ClientsResponseInnerConfig
   */
  legalEntityName: string;
  /**
   *
   * @type {string}
   * @memberof ClientsResponseInnerConfig
   */
  name: string;
}

export function ClientsResponseInnerConfigFromJSON(
  json: any
): ClientsResponseInnerConfig {
  return ClientsResponseInnerConfigFromJSONTyped(json, false);
}

export function ClientsResponseInnerConfigFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ClientsResponseInnerConfig {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    page: json["page"],
    maintenanceStatus: ClientsResponseInnerConfigMaintenanceStatusFromJSON(
      json["maintenanceStatus"]
    ),
    enabled: json["enabled"],
    oAuthLoginForm: !exists(json, "oAuthLoginForm")
      ? undefined
      : OAuthLoginFormConfigFromJSON(json["oAuthLoginForm"]),
    oAuthReturnToRegularExpressions: json["oAuthReturnToRegularExpressions"],
    oAuthReturnToUrls: json["oAuthReturnToUrls"],
    cognitoClientIds: json["cognitoClientIds"],
    brokerEnvFilter: mapValues(
      json["brokerEnvFilter"],
      BrokerEnvFilterTypeFromJSON
    ),
    allowRequestsWithoutOrigin: json["allowRequestsWithoutOrigin"],
    allowedOrigins: json["allowedOrigins"],
    legalEntityName: json["legalEntityName"],
    name: json["name"],
  };
}

export function ClientsResponseInnerConfigToJSONRecursive(
  value?: ClientsResponseInnerConfig | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    page: value.page,
    maintenanceStatus: ClientsResponseInnerConfigMaintenanceStatusToJSON(
      value.maintenanceStatus
    ),
    enabled: value.enabled,
    oAuthLoginForm: OAuthLoginFormConfigToJSON(value.oAuthLoginForm),
    oAuthReturnToRegularExpressions: value.oAuthReturnToRegularExpressions,
    oAuthReturnToUrls: value.oAuthReturnToUrls,
    cognitoClientIds: value.cognitoClientIds,
    brokerEnvFilter: mapValues(
      value.brokerEnvFilter,
      BrokerEnvFilterTypeToJSON
    ),
    allowRequestsWithoutOrigin: value.allowRequestsWithoutOrigin,
    allowedOrigins: value.allowedOrigins,
    legalEntityName: value.legalEntityName,
    name: value.name,
  };
}

export function ClientsResponseInnerConfigToJSON(
  value?: ClientsResponseInnerConfig | null
): any {
  return ClientsResponseInnerConfigToJSONRecursive(value, false);
}
