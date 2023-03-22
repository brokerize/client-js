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
import {
    PositionValuation,
    PositionValuationFromJSON,
    PositionValuationFromJSONTyped,
    PositionValuationToJSON,
} from './PositionValuation';
import {
    Security,
    SecurityFromJSON,
    SecurityFromJSONTyped,
    SecurityToJSON,
} from './Security';

/**
 * 
 * @export
 * @interface Position
 */
export interface Position {
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    sourceData?: string;
    /**
     * True if the user may edit a comment for this position.
     * @type {boolean}
     * @memberof Position
     */
    commentIsEditable?: boolean;
    /**
     * Textual comment for the position.
     * @type {string}
     * @memberof Position
     */
    comment?: string;
    /**
     * Relative P/L of the entire position, since acquisition, but including the dividends booked for this position (see `totalDividends`). 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRelWithDividends?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbsWithDividends?: Amount;
    /**
     * Relative P/L of the entire posiiton, since "prevClose". 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRelPrevClose?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbsPrevClose?: Amount;
    /**
     * Relative P/L of the entire posiiton, since acquisition. 1 means +100%
     * @type {number}
     * @memberof Position
     */
    profitLossRel?: number;
    /**
     * 
     * @type {Amount}
     * @memberof Position
     */
    profitLossAbs?: Amount;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    prevCloseValuation?: PositionValuation;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    currentValuation?: PositionValuation;
    /**
     * Date in the format YYYY-MM-DD
     * @type {string}
     * @memberof Position
     */
    purchaseDate?: string;
    /**
     * Date and time of position purchase. If not set, purchaseDate may at least contain the date.
     * @type {Date}
     * @memberof Position
     */
    purchaseDateTime?: Date;
    /**
     * 
     * @type {PositionValuation}
     * @memberof Position
     */
    purchaseValuation?: PositionValuation;
    /**
     * How much of the position is available for sale.
     * @type {number}
     * @memberof Position
     */
    availableSize: number;
    /**
     * Name of the exchange, as provided by the broker.
     * @type {string}
     * @memberof Position
     */
    exchangeName?: string;
    /**
     * The exchange id as defined by the broker.
     * @type {string}
     * @memberof Position
     */
    brokerExchangeId?: string;
    /**
     * The mapped exchange id, as retrievable in the the `/exchanges` endpoint.
     * @type {number}
     * @memberof Position
     */
    exchangeId?: number;
    /**
     * 
     * @type {Security}
     * @memberof Position
     */
    security: Security;
    /**
     * - ISO code (e.g. EUR for Euro), if it is a monetary amount
     * - or 'USDT' if its Tether (https://en.wikipedia.org/wiki/Tether_(cryptocurrency)
     * - or 'XXX' if it is pieces
     * - or 'PRC' if it is a percentage
     * - or 'PRM' if it is permil
     * - or 'XXP' if it is points (as for indices)
     * @type {string}
     * @memberof Position
     */
    sizeUnit: string;
    /**
     * 
     * @type {number}
     * @memberof Position
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof Position
     */
    id: string;
}

export function PositionFromJSON(json: any): Position {
    return PositionFromJSONTyped(json, false);
}

export function PositionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Position {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sourceData': !exists(json, 'sourceData') ? undefined : json['sourceData'],
        'commentIsEditable': !exists(json, 'commentIsEditable') ? undefined : json['commentIsEditable'],
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
        'profitLossRelWithDividends': !exists(json, 'profitLossRelWithDividends') ? undefined : json['profitLossRelWithDividends'],
        'profitLossAbsWithDividends': !exists(json, 'profitLossAbsWithDividends') ? undefined : AmountFromJSON(json['profitLossAbsWithDividends']),
        'profitLossRelPrevClose': !exists(json, 'profitLossRelPrevClose') ? undefined : json['profitLossRelPrevClose'],
        'profitLossAbsPrevClose': !exists(json, 'profitLossAbsPrevClose') ? undefined : AmountFromJSON(json['profitLossAbsPrevClose']),
        'profitLossRel': !exists(json, 'profitLossRel') ? undefined : json['profitLossRel'],
        'profitLossAbs': !exists(json, 'profitLossAbs') ? undefined : AmountFromJSON(json['profitLossAbs']),
        'prevCloseValuation': !exists(json, 'prevCloseValuation') ? undefined : PositionValuationFromJSON(json['prevCloseValuation']),
        'currentValuation': !exists(json, 'currentValuation') ? undefined : PositionValuationFromJSON(json['currentValuation']),
        'purchaseDate': !exists(json, 'purchaseDate') ? undefined : json['purchaseDate'],
        'purchaseDateTime': !exists(json, 'purchaseDateTime') ? undefined : (new Date(json['purchaseDateTime'])),
        'purchaseValuation': !exists(json, 'purchaseValuation') ? undefined : PositionValuationFromJSON(json['purchaseValuation']),
        'availableSize': json['availableSize'],
        'exchangeName': !exists(json, 'exchangeName') ? undefined : json['exchangeName'],
        'brokerExchangeId': !exists(json, 'brokerExchangeId') ? undefined : json['brokerExchangeId'],
        'exchangeId': !exists(json, 'exchangeId') ? undefined : json['exchangeId'],
        'security': SecurityFromJSON(json['security']),
        'sizeUnit': json['sizeUnit'],
        'size': json['size'],
        'id': json['id'],
    };
}

export function PositionToJSONRecursive(value?: Position | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'sourceData': value.sourceData,
        'commentIsEditable': value.commentIsEditable,
        'comment': value.comment,
        'profitLossRelWithDividends': value.profitLossRelWithDividends,
        'profitLossAbsWithDividends': AmountToJSON(value.profitLossAbsWithDividends),
        'profitLossRelPrevClose': value.profitLossRelPrevClose,
        'profitLossAbsPrevClose': AmountToJSON(value.profitLossAbsPrevClose),
        'profitLossRel': value.profitLossRel,
        'profitLossAbs': AmountToJSON(value.profitLossAbs),
        'prevCloseValuation': PositionValuationToJSON(value.prevCloseValuation),
        'currentValuation': PositionValuationToJSON(value.currentValuation),
        'purchaseDate': value.purchaseDate,
        'purchaseDateTime': value.purchaseDateTime === undefined ? undefined : (value.purchaseDateTime.toISOString()),
        'purchaseValuation': PositionValuationToJSON(value.purchaseValuation),
        'availableSize': value.availableSize,
        'exchangeName': value.exchangeName,
        'brokerExchangeId': value.brokerExchangeId,
        'exchangeId': value.exchangeId,
        'security': SecurityToJSON(value.security),
        'sizeUnit': value.sizeUnit,
        'size': value.size,
        'id': value.id,
    };
}

export function PositionToJSON(value?: Position | null): any {
    return PositionToJSONRecursive(value, false);
}
