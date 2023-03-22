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
export const SessionSyncInfoStatus = {
    Pending: 'PENDING',
    Synced: 'SYNCED',
    Error: 'ERROR'
} as const;
export type SessionSyncInfoStatus = typeof SessionSyncInfoStatus[keyof typeof SessionSyncInfoStatus];


export function SessionSyncInfoStatusFromJSON(json: any): SessionSyncInfoStatus {
    return SessionSyncInfoStatusFromJSONTyped(json, false);
}

export function SessionSyncInfoStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): SessionSyncInfoStatus {
    return json as SessionSyncInfoStatus;
}

export function SessionSyncInfoStatusToJSON(value?: SessionSyncInfoStatus | null): any {
    return value as any;
}

