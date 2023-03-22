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
 * @interface ValidationDetail
 */
export interface ValidationDetail {
    /**
     * 
     * @type {string}
     * @memberof ValidationDetail
     */
    debugData: string;
    /**
     * 
     * @type {string}
     * @memberof ValidationDetail
     */
    message: string;
}

export function ValidationDetailFromJSON(json: any): ValidationDetail {
    return ValidationDetailFromJSONTyped(json, false);
}

export function ValidationDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidationDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'debugData': json['debugData'],
        'message': json['message'],
    };
}

export function ValidationDetailToJSONRecursive(value?: ValidationDetail | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'debugData': value.debugData,
        'message': value.message,
    };
}

export function ValidationDetailToJSON(value?: ValidationDetail | null): any {
    return ValidationDetailToJSONRecursive(value, false);
}
