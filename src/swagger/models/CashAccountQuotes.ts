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
 * @interface CashAccountQuotes
 */
export interface CashAccountQuotes {
    /**
     * 
     * @type {Amount}
     * @memberof CashAccountQuotes
     */
    buyingPower?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof CashAccountQuotes
     */
    balance?: Amount;
}

export function CashAccountQuotesFromJSON(json: any): CashAccountQuotes {
    return CashAccountQuotesFromJSONTyped(json, false);
}

export function CashAccountQuotesFromJSONTyped(json: any, ignoreDiscriminator: boolean): CashAccountQuotes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'buyingPower': !exists(json, 'buyingPower') ? undefined : AmountFromJSON(json['buyingPower']),
        'balance': !exists(json, 'balance') ? undefined : AmountFromJSON(json['balance']),
    };
}

export function CashAccountQuotesToJSONRecursive(value?: CashAccountQuotes | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'buyingPower': AmountToJSON(value.buyingPower),
        'balance': AmountToJSON(value.balance),
    };
}

export function CashAccountQuotesToJSON(value?: CashAccountQuotes | null): any {
    return CashAccountQuotesToJSONRecursive(value, false);
}
