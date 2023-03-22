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
    OrderChanges,
    OrderChangesFromJSON,
    OrderChangesFromJSONTyped,
    OrderChangesToJSON,
} from './OrderChanges';

/**
 * 
 * @export
 * @interface ChangeOrderParams
 */
export interface ChangeOrderParams {
    /**
     * 
     * @type {OrderChanges}
     * @memberof ChangeOrderParams
     */
    changes: OrderChanges;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderParams
     */
    challengeResponse?: string;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderParams
     */
    challengeId?: string;
    /**
     * 
     * @type {string}
     * @memberof ChangeOrderParams
     */
    authMethod?: string;
}

export function ChangeOrderParamsFromJSON(json: any): ChangeOrderParams {
    return ChangeOrderParamsFromJSONTyped(json, false);
}

export function ChangeOrderParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChangeOrderParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'changes': OrderChangesFromJSON(json['changes']),
        'challengeResponse': !exists(json, 'challengeResponse') ? undefined : json['challengeResponse'],
        'challengeId': !exists(json, 'challengeId') ? undefined : json['challengeId'],
        'authMethod': !exists(json, 'authMethod') ? undefined : json['authMethod'],
    };
}

export function ChangeOrderParamsToJSONRecursive(value?: ChangeOrderParams | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'changes': OrderChangesToJSON(value.changes),
        'challengeResponse': value.challengeResponse,
        'challengeId': value.challengeId,
        'authMethod': value.authMethod,
    };
}

export function ChangeOrderParamsToJSON(value?: ChangeOrderParams | null): any {
    return ChangeOrderParamsToJSONRecursive(value, false);
}
