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
    OrderValidityType,
    OrderValidityTypeFromJSON,
    OrderValidityTypeFromJSONTyped,
    OrderValidityTypeToJSON,
} from './OrderValidityType';

/**
 * 
 * @export
 * @interface OrderValidityTypeByOrderModel
 */
export interface OrderValidityTypeByOrderModel {
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    quote?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    fraction?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    savingsPlan?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    market?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    limit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    stopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    stopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    trailingStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    trailingStopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    ocoStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof OrderValidityTypeByOrderModel
     */
    ocoStopLimit?: Array<OrderValidityType>;
}

export function OrderValidityTypeByOrderModelFromJSON(json: any): OrderValidityTypeByOrderModel {
    return OrderValidityTypeByOrderModelFromJSONTyped(json, false);
}

export function OrderValidityTypeByOrderModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderValidityTypeByOrderModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'quote': !exists(json, 'quote') ? undefined : ((json['quote'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'fraction': !exists(json, 'fraction') ? undefined : ((json['fraction'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'savingsPlan': !exists(json, 'savingsPlan') ? undefined : ((json['savingsPlan'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'market': !exists(json, 'market') ? undefined : ((json['market'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'limit': !exists(json, 'limit') ? undefined : ((json['limit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopMarket': !exists(json, 'stopMarket') ? undefined : ((json['stopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopLimit': !exists(json, 'stopLimit') ? undefined : ((json['stopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopMarket': !exists(json, 'trailingStopMarket') ? undefined : ((json['trailingStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopLimit': !exists(json, 'trailingStopLimit') ? undefined : ((json['trailingStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopMarket': !exists(json, 'ocoStopMarket') ? undefined : ((json['ocoStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopLimit': !exists(json, 'ocoStopLimit') ? undefined : ((json['ocoStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
    };
}

export function OrderValidityTypeByOrderModelToJSONRecursive(value?: OrderValidityTypeByOrderModel | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'quote': value.quote === undefined ? undefined : ((value.quote as Array<any>).map(OrderValidityTypeToJSON)),
        'fraction': value.fraction === undefined ? undefined : ((value.fraction as Array<any>).map(OrderValidityTypeToJSON)),
        'savingsPlan': value.savingsPlan === undefined ? undefined : ((value.savingsPlan as Array<any>).map(OrderValidityTypeToJSON)),
        'market': value.market === undefined ? undefined : ((value.market as Array<any>).map(OrderValidityTypeToJSON)),
        'limit': value.limit === undefined ? undefined : ((value.limit as Array<any>).map(OrderValidityTypeToJSON)),
        'stopMarket': value.stopMarket === undefined ? undefined : ((value.stopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'stopLimit': value.stopLimit === undefined ? undefined : ((value.stopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopMarket': value.trailingStopMarket === undefined ? undefined : ((value.trailingStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopLimit': value.trailingStopLimit === undefined ? undefined : ((value.trailingStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopMarket': value.ocoStopMarket === undefined ? undefined : ((value.ocoStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopLimit': value.ocoStopLimit === undefined ? undefined : ((value.ocoStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
    };
}

export function OrderValidityTypeByOrderModelToJSON(value?: OrderValidityTypeByOrderModel | null): any {
    return OrderValidityTypeByOrderModelToJSONRecursive(value, false);
}
