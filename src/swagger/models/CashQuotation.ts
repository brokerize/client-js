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
 * For some exchanges, this can be added to an order:
 * 
 * - `K` Kassa
 * - `O` Only Opening Auction
 * - `C` Only Closing Auction
 * @export
 */
export const CashQuotation = {
    O: 'O',
    K: 'K',
    C: 'C'
} as const;
export type CashQuotation = typeof CashQuotation[keyof typeof CashQuotation];


export function CashQuotationFromJSON(json: any): CashQuotation {
    return CashQuotationFromJSONTyped(json, false);
}

export function CashQuotationFromJSONTyped(json: any, ignoreDiscriminator: boolean): CashQuotation {
    return json as CashQuotation;
}

export function CashQuotationToJSON(value?: CashQuotation | null): any {
    return value as any;
}

