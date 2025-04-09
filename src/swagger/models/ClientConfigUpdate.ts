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
  BrokerClientCfg,
  BrokerClientCfgFromJSON,
  BrokerClientCfgFromJSONTyped,
  BrokerClientCfgToJSON,
} from "./BrokerClientCfg";
import {
  BrokerEnvFilterType,
  BrokerEnvFilterTypeFromJSON,
  BrokerEnvFilterTypeFromJSONTyped,
  BrokerEnvFilterTypeToJSON,
} from "./BrokerEnvFilterType";
import {
  ClientConfigMaintenanceStatus,
  ClientConfigMaintenanceStatusFromJSON,
  ClientConfigMaintenanceStatusFromJSONTyped,
  ClientConfigMaintenanceStatusToJSON,
} from "./ClientConfigMaintenanceStatus";
import {
  ClientConfigUpdateOAuthLoginForm,
  ClientConfigUpdateOAuthLoginFormFromJSON,
  ClientConfigUpdateOAuthLoginFormFromJSONTyped,
  ClientConfigUpdateOAuthLoginFormToJSON,
} from "./ClientConfigUpdateOAuthLoginForm";
import {
  ClientConfigUpdatePage,
  ClientConfigUpdatePageFromJSON,
  ClientConfigUpdatePageFromJSONTyped,
  ClientConfigUpdatePageToJSON,
} from "./ClientConfigUpdatePage";
import {
  ClientConfigUpdateRateLimitPointsToConsume,
  ClientConfigUpdateRateLimitPointsToConsumeFromJSON,
  ClientConfigUpdateRateLimitPointsToConsumeFromJSONTyped,
  ClientConfigUpdateRateLimitPointsToConsumeToJSON,
} from "./ClientConfigUpdateRateLimitPointsToConsume";
import {
  GuestUserLifetime,
  GuestUserLifetimeFromJSON,
  GuestUserLifetimeFromJSONTyped,
  GuestUserLifetimeToJSON,
} from "./GuestUserLifetime";

/**
 * A client configuration *update* (i.e. fields that are not modified can be left out).
 * @export
 * @interface ClientConfigUpdate
 */
export interface ClientConfigUpdate {
  /**
   *
   * @type {boolean}
   * @memberof ClientConfigUpdate
   */
  allowRequestsWithoutOrigin?: boolean;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  allowedOrigins?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  allowedOriginsRegularExpressions?: Array<string>;
  /**
   *
   * @type {BrokerClientCfg}
   * @memberof ClientConfigUpdate
   */
  brokerClientIds?: BrokerClientCfg;
  /**
   *
   * @type {{ [key: string]: BrokerEnvFilterType; }}
   * @memberof ClientConfigUpdate
   */
  brokerEnvFilter?: { [key: string]: BrokerEnvFilterType };
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  clientSecrets?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  cognitoClientIds?: Array<string>;
  /**
   * If this is true, crypto trading is allowed for this client.
   * @type {boolean}
   * @memberof ClientConfigUpdate
   */
  cryptoTradingAllowed?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ClientConfigUpdate
   */
  enabled?: boolean;
  /**
   *
   * @type {number}
   * @memberof ClientConfigUpdate
   */
  guestUserInactivityTimeoutSeconds?: number | null;
  /**
   *
   * @type {GuestUserLifetime}
   * @memberof ClientConfigUpdate
   */
  guestUserLifetime?: GuestUserLifetime;
  /**
   *
   * @type {string}
   * @memberof ClientConfigUpdate
   */
  legalEntityName?: string;
  /**
   *
   * @type {ClientConfigMaintenanceStatus}
   * @memberof ClientConfigUpdate
   */
  maintenanceStatus?: ClientConfigMaintenanceStatus | null;
  /**
   *
   * @type {Array<number>}
   * @memberof ClientConfigUpdate
   */
  managingUserIds?: Array<number>;
  /**
   *
   * @type {string}
   * @memberof ClientConfigUpdate
   */
  name?: string;
  /**
   *
   * @type {ClientConfigUpdateOAuthLoginForm}
   * @memberof ClientConfigUpdate
   */
  oAuthLoginForm?: ClientConfigUpdateOAuthLoginForm | null;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  oAuthReturnToRegularExpressions?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  oAuthReturnToUrls?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  optionalClientSecrets?: Array<string>;
  /**
   *
   * @type {ClientConfigUpdatePage}
   * @memberof ClientConfigUpdate
   */
  page?: ClientConfigUpdatePage | null;
  /**
   *
   * @type {ClientConfigUpdateRateLimitPointsToConsume}
   * @memberof ClientConfigUpdate
   */
  rateLimitPointsToConsume?: ClientConfigUpdateRateLimitPointsToConsume;
  /**
   * These flags are used in supporting the reporting logic
   * @type {Array<string>}
   * @memberof ClientConfigUpdate
   */
  reportingFlags?: Array<string>;
}

export function ClientConfigUpdateFromJSON(json: any): ClientConfigUpdate {
  return ClientConfigUpdateFromJSONTyped(json, false);
}

export function ClientConfigUpdateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ClientConfigUpdate {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    allowRequestsWithoutOrigin: !exists(json, "allowRequestsWithoutOrigin")
      ? undefined
      : json["allowRequestsWithoutOrigin"],
    allowedOrigins: !exists(json, "allowedOrigins")
      ? undefined
      : json["allowedOrigins"],
    allowedOriginsRegularExpressions: !exists(
      json,
      "allowedOriginsRegularExpressions"
    )
      ? undefined
      : json["allowedOriginsRegularExpressions"],
    brokerClientIds: !exists(json, "brokerClientIds")
      ? undefined
      : BrokerClientCfgFromJSON(json["brokerClientIds"]),
    brokerEnvFilter: !exists(json, "brokerEnvFilter")
      ? undefined
      : mapValues(json["brokerEnvFilter"], BrokerEnvFilterTypeFromJSON),
    clientSecrets: !exists(json, "clientSecrets")
      ? undefined
      : json["clientSecrets"],
    cognitoClientIds: !exists(json, "cognitoClientIds")
      ? undefined
      : json["cognitoClientIds"],
    cryptoTradingAllowed: !exists(json, "cryptoTradingAllowed")
      ? undefined
      : json["cryptoTradingAllowed"],
    enabled: !exists(json, "enabled") ? undefined : json["enabled"],
    guestUserInactivityTimeoutSeconds: !exists(
      json,
      "guestUserInactivityTimeoutSeconds"
    )
      ? undefined
      : json["guestUserInactivityTimeoutSeconds"],
    guestUserLifetime: !exists(json, "guestUserLifetime")
      ? undefined
      : GuestUserLifetimeFromJSON(json["guestUserLifetime"]),
    legalEntityName: !exists(json, "legalEntityName")
      ? undefined
      : json["legalEntityName"],
    maintenanceStatus: !exists(json, "maintenanceStatus")
      ? undefined
      : ClientConfigMaintenanceStatusFromJSON(json["maintenanceStatus"]),
    managingUserIds: !exists(json, "managingUserIds")
      ? undefined
      : json["managingUserIds"],
    name: !exists(json, "name") ? undefined : json["name"],
    oAuthLoginForm: !exists(json, "oAuthLoginForm")
      ? undefined
      : ClientConfigUpdateOAuthLoginFormFromJSON(json["oAuthLoginForm"]),
    oAuthReturnToRegularExpressions: !exists(
      json,
      "oAuthReturnToRegularExpressions"
    )
      ? undefined
      : json["oAuthReturnToRegularExpressions"],
    oAuthReturnToUrls: !exists(json, "oAuthReturnToUrls")
      ? undefined
      : json["oAuthReturnToUrls"],
    optionalClientSecrets: !exists(json, "optionalClientSecrets")
      ? undefined
      : json["optionalClientSecrets"],
    page: !exists(json, "page")
      ? undefined
      : ClientConfigUpdatePageFromJSON(json["page"]),
    rateLimitPointsToConsume: !exists(json, "rateLimitPointsToConsume")
      ? undefined
      : ClientConfigUpdateRateLimitPointsToConsumeFromJSON(
          json["rateLimitPointsToConsume"]
        ),
    reportingFlags: !exists(json, "reportingFlags")
      ? undefined
      : json["reportingFlags"],
  };
}

export function ClientConfigUpdateToJSONRecursive(
  value?: ClientConfigUpdate | null,
  ignoreParent = false
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }

  return {
    allowRequestsWithoutOrigin: value.allowRequestsWithoutOrigin,
    allowedOrigins: value.allowedOrigins,
    allowedOriginsRegularExpressions: value.allowedOriginsRegularExpressions,
    brokerClientIds: BrokerClientCfgToJSON(value.brokerClientIds),
    brokerEnvFilter:
      value.brokerEnvFilter === undefined
        ? undefined
        : mapValues(value.brokerEnvFilter, BrokerEnvFilterTypeToJSON),
    clientSecrets: value.clientSecrets,
    cognitoClientIds: value.cognitoClientIds,
    cryptoTradingAllowed: value.cryptoTradingAllowed,
    enabled: value.enabled,
    guestUserInactivityTimeoutSeconds: value.guestUserInactivityTimeoutSeconds,
    guestUserLifetime: GuestUserLifetimeToJSON(value.guestUserLifetime),
    legalEntityName: value.legalEntityName,
    maintenanceStatus: ClientConfigMaintenanceStatusToJSON(
      value.maintenanceStatus
    ),
    managingUserIds: value.managingUserIds,
    name: value.name,
    oAuthLoginForm: ClientConfigUpdateOAuthLoginFormToJSON(
      value.oAuthLoginForm
    ),
    oAuthReturnToRegularExpressions: value.oAuthReturnToRegularExpressions,
    oAuthReturnToUrls: value.oAuthReturnToUrls,
    optionalClientSecrets: value.optionalClientSecrets,
    page: ClientConfigUpdatePageToJSON(value.page),
    rateLimitPointsToConsume: ClientConfigUpdateRateLimitPointsToConsumeToJSON(
      value.rateLimitPointsToConsume
    ),
    reportingFlags: value.reportingFlags,
  };
}

export function ClientConfigUpdateToJSON(
  value?: ClientConfigUpdate | null
): any {
  return ClientConfigUpdateToJSONRecursive(value, false);
}
