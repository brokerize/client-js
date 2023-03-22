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
import {
    Amount,
    AmountFromJSON,
    AmountFromJSONTyped,
    AmountToJSON,
} from './Amount';

/**
 * 
 * @export
 * @interface PositionValuation
 */
export interface PositionValuation {
    /**
     * CrossRate that was used to convert from quotation to positionValue, if this applies here.
     * @type {number}
     * @memberof PositionValuation
     */
    crossRate?: number;
    /**
     * 
     * @type {Amount}
     * @memberof PositionValuation
     */
    positionValue?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof PositionValuation
     */
    quotation?: Amount;
    /**
     * 
     * @type {boolean}
     * @memberof PositionValuation
     */
    isDelayed?: boolean;
}

export function PositionValuationFromJSON(json: any): PositionValuation {
    return PositionValuationFromJSONTyped(json, false);
}

export function PositionValuationFromJSONTyped(json: any, ignoreDiscriminator: boolean): PositionValuation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'crossRate': !exists(json, 'crossRate') ? undefined : json['crossRate'],
        'positionValue': !exists(json, 'positionValue') ? undefined : AmountFromJSON(json['positionValue']),
        'quotation': !exists(json, 'quotation') ? undefined : AmountFromJSON(json['quotation']),
        'isDelayed': !exists(json, 'isDelayed') ? undefined : json['isDelayed'],
    };
}

export function PositionValuationToJSONRecursive(value?: PositionValuation | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'crossRate': value.crossRate,
        'positionValue': AmountToJSON(value.positionValue),
        'quotation': AmountToJSON(value.quotation),
        'isDelayed': value.isDelayed,
    };
}

export function PositionValuationToJSON(value?: PositionValuation | null): any {
    return PositionValuationToJSONRecursive(value, false);
}
