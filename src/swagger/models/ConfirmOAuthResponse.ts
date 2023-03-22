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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ConfirmOAuthResponse
 */
export interface ConfirmOAuthResponse {
    /**
     * 
     * @type {string}
     * @memberof ConfirmOAuthResponse
     */
    sessionId: string;
}

export function ConfirmOAuthResponseFromJSON(json: any): ConfirmOAuthResponse {
    return ConfirmOAuthResponseFromJSONTyped(json, false);
}

export function ConfirmOAuthResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfirmOAuthResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sessionId': json['sessionId'],
    };
}

export function ConfirmOAuthResponseToJSONRecursive(value?: ConfirmOAuthResponse | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'sessionId': value.sessionId,
    };
}

export function ConfirmOAuthResponseToJSON(value?: ConfirmOAuthResponse | null): any {
    return ConfirmOAuthResponseToJSONRecursive(value, false);
}
