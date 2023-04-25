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
  ClientConfigOAuthLoginForm,
  ClientConfigOAuthLoginFormFromJSON,
  ClientConfigOAuthLoginFormFromJSONTyped,
  ClientConfigOAuthLoginFormToJSON,
} from "./ClientConfigOAuthLoginForm";
import {
  ClientConfigPage,
  ClientConfigPageFromJSON,
  ClientConfigPageFromJSONTyped,
  ClientConfigPageToJSON,
} from "./ClientConfigPage";
import {
  ClientConfigRateLimitPointsToConsume,
  ClientConfigRateLimitPointsToConsumeFromJSON,
  ClientConfigRateLimitPointsToConsumeFromJSONTyped,
  ClientConfigRateLimitPointsToConsumeToJSON,
} from "./ClientConfigRateLimitPointsToConsume";
import {
  ClientsResponseInnerConfigMaintenanceStatus,
  ClientsResponseInnerConfigMaintenanceStatusFromJSON,
  ClientsResponseInnerConfigMaintenanceStatusFromJSONTyped,
  ClientsResponseInnerConfigMaintenanceStatusToJSON,
} from "./ClientsResponseInnerConfigMaintenanceStatus";

/**
 *
 * @export
 * @interface ClientConfig
 */
export interface ClientConfig {
  /**
   *
   * @type {ClientConfigPage}
   * @memberof ClientConfig
   */
  page?: ClientConfigPage | null;
  /**
   *
   * @type {ClientsResponseInnerConfigMaintenanceStatus}
   * @memberof ClientConfig
   */
  maintenanceStatus?: ClientsResponseInnerConfigMaintenanceStatus | null;
  /**
   *
   * @type {boolean}
   * @memberof ClientConfig
   */
  enabled?: boolean;
  /**
   *
   * @type {ClientConfigOAuthLoginForm}
   * @memberof ClientConfig
   */
  oAuthLoginForm?: ClientConfigOAuthLoginForm | null;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfig
   */
  oAuthReturnToRegularExpressions?: Array<string>;
  /**
   *
   * @type {Array<number>}
   * @memberof ClientConfig
   */
  managingUserIds?: Array<number>;
  /**
   *
   * @type {{ [key: string]: BrokerEnvFilterType; }}
   * @memberof ClientConfig
   */
  brokerEnvFilter?: { [key: string]: BrokerEnvFilterType };
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfig
   */
  oAuthReturnToUrls?: Array<string>;
  /**
   *
   * @type {ClientConfigRateLimitPointsToConsume}
   * @memberof ClientConfig
   */
  rateLimitPointsToConsume?: ClientConfigRateLimitPointsToConsume;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfig
   */
  clientSecrets?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof ClientConfig
   */
  allowRequestsWithoutOrigin?: boolean;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfig
   */
  allowedOrigins?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfig
   */
  cognitoClientIds?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ClientConfig
   */
  legalEntityName?: string;
  /**
   *
   * @type {string}
   * @memberof ClientConfig
   */
  name?: string;
}

export function ClientConfigFromJSON(json: any): ClientConfig {
  return ClientConfigFromJSONTyped(json, false);
}

export function ClientConfigFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ClientConfig {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    page: !exists(json, "page")
      ? undefined
      : ClientConfigPageFromJSON(json["page"]),
    maintenanceStatus: !exists(json, "maintenanceStatus")
      ? undefined
      : ClientsResponseInnerConfigMaintenanceStatusFromJSON(
          json["maintenanceStatus"]
        ),
    enabled: !exists(json, "enabled") ? undefined : json["enabled"],
    oAuthLoginForm: !exists(json, "oAuthLoginForm")
      ? undefined
      : ClientConfigOAuthLoginFormFromJSON(json["oAuthLoginForm"]),
    oAuthReturnToRegularExpressions: !exists(
      json,
      "oAuthReturnToRegularExpressions"
    )
      ? undefined
      : json["oAuthReturnToRegularExpressions"],
    managingUserIds: !exists(json, "managingUserIds")
      ? undefined
      : json["managingUserIds"],
    brokerEnvFilter: !exists(json, "brokerEnvFilter")
      ? undefined
      : mapValues(json["brokerEnvFilter"], BrokerEnvFilterTypeFromJSON),
    oAuthReturnToUrls: !exists(json, "oAuthReturnToUrls")
      ? undefined
      : json["oAuthReturnToUrls"],
    rateLimitPointsToConsume: !exists(json, "rateLimitPointsToConsume")
      ? undefined
      : ClientConfigRateLimitPointsToConsumeFromJSON(
          json["rateLimitPointsToConsume"]
        ),
    clientSecrets: !exists(json, "clientSecrets")
      ? undefined
      : json["clientSecrets"],
    allowRequestsWithoutOrigin: !exists(json, "allowRequestsWithoutOrigin")
      ? undefined
      : json["allowRequestsWithoutOrigin"],
    allowedOrigins: !exists(json, "allowedOrigins")
      ? undefined
      : json["allowedOrigins"],
    cognitoClientIds: !exists(json, "cognitoClientIds")
      ? undefined
      : json["cognitoClientIds"],
    legalEntityName: !exists(json, "legalEntityName")
      ? undefined
      : json["legalEntityName"],
    name: !exists(json, "name") ? undefined : json["name"],
  };
}

export function ClientConfigToJSONRecursive(
  value?: ClientConfig | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    page: ClientConfigPageToJSON(value.page),
    maintenanceStatus: ClientsResponseInnerConfigMaintenanceStatusToJSON(
      value.maintenanceStatus
    ),
    enabled: value.enabled,
    oAuthLoginForm: ClientConfigOAuthLoginFormToJSON(value.oAuthLoginForm),
    oAuthReturnToRegularExpressions: value.oAuthReturnToRegularExpressions,
    managingUserIds: value.managingUserIds,
    brokerEnvFilter:
      value.brokerEnvFilter === undefined
        ? undefined
        : mapValues(value.brokerEnvFilter, BrokerEnvFilterTypeToJSON),
    oAuthReturnToUrls: value.oAuthReturnToUrls,
    rateLimitPointsToConsume: ClientConfigRateLimitPointsToConsumeToJSON(
      value.rateLimitPointsToConsume
    ),
    clientSecrets: value.clientSecrets,
    allowRequestsWithoutOrigin: value.allowRequestsWithoutOrigin,
    allowedOrigins: value.allowedOrigins,
    cognitoClientIds: value.cognitoClientIds,
    legalEntityName: value.legalEntityName,
    name: value.name,
  };
}

export function ClientConfigToJSON(value?: ClientConfig | null): any {
  return ClientConfigToJSONRecursive(value, false);
}
