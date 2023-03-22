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
 * @interface GenericTableRowTextAllOf
 */
export interface GenericTableRowTextAllOf {
    /**
     * 
     * @type {string}
     * @memberof GenericTableRowTextAllOf
     */
    type?: GenericTableRowTextAllOfTypeEnum;
}


/**
 * @export
 */
export const GenericTableRowTextAllOfTypeEnum = {
    Text: 'text'
} as const;
export type GenericTableRowTextAllOfTypeEnum = typeof GenericTableRowTextAllOfTypeEnum[keyof typeof GenericTableRowTextAllOfTypeEnum];


export function GenericTableRowTextAllOfFromJSON(json: any): GenericTableRowTextAllOf {
    return GenericTableRowTextAllOfFromJSONTyped(json, false);
}

export function GenericTableRowTextAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): GenericTableRowTextAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function GenericTableRowTextAllOfToJSONRecursive(value?: GenericTableRowTextAllOf | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'type': value.type,
    };
}

export function GenericTableRowTextAllOfToJSON(value?: GenericTableRowTextAllOf | null): any {
    return GenericTableRowTextAllOfToJSONRecursive(value, false);
}
