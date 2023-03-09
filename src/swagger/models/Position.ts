/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-03-09T14:59:02.531Z\" }</pre>
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
