/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-01-18T13:42:39.809Z\" }</pre>
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
    CostDetailsLink,
    CostDetailsLinkFromJSON,
    CostDetailsLinkFromJSONTyped,
    CostDetailsLinkToJSON,
} from './CostDetailsLink';
import {
    GenericTable,
    GenericTableFromJSON,
    GenericTableFromJSONTyped,
    GenericTableToJSON,
} from './GenericTable';

/**
 * 
 * @export
 * @interface OrderCostEstimation
 */
export interface OrderCostEstimation {
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    entryCosts?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    transactionTax?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    totalCosts?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    expectedCounterValue?: Amount;
    /**
     * 
     * @type {Amount}
     * @memberof OrderCostEstimation
     */
    orderFees?: Amount;
    /**
     * Detailed explanation for order fees
     * @type {string}
     * @memberof OrderCostEstimation
     */
    orderFeesExplanation?: string;
    /**
     * If present, users have to accept this message before creating an order.
     * If accepting the costs and performing the order is one click (which is allowed), the create order button label
     * must contain the information that costs are accepted.
     * @type {string}
     * @memberof OrderCostEstimation
     */
    costAcceptancePrompt?: string;
    /**
     * 
     * @type {GenericTable}
     * @memberof OrderCostEstimation
     */
    detailedTable?: GenericTable;
    /**
     * 
     * @type {CostDetailsLink}
     * @memberof OrderCostEstimation
     */
    costDetailsLink?: CostDetailsLink;
}

export function OrderCostEstimationFromJSON(json: any): OrderCostEstimation {
    return OrderCostEstimationFromJSONTyped(json, false);
}

export function OrderCostEstimationFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderCostEstimation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entryCosts': !exists(json, 'entryCosts') ? undefined : AmountFromJSON(json['entryCosts']),
        'transactionTax': !exists(json, 'transactionTax') ? undefined : AmountFromJSON(json['transactionTax']),
        'totalCosts': !exists(json, 'totalCosts') ? undefined : AmountFromJSON(json['totalCosts']),
        'expectedCounterValue': !exists(json, 'expectedCounterValue') ? undefined : AmountFromJSON(json['expectedCounterValue']),
        'orderFees': !exists(json, 'orderFees') ? undefined : AmountFromJSON(json['orderFees']),
        'orderFeesExplanation': !exists(json, 'orderFeesExplanation') ? undefined : json['orderFeesExplanation'],
        'costAcceptancePrompt': !exists(json, 'costAcceptancePrompt') ? undefined : json['costAcceptancePrompt'],
        'detailedTable': !exists(json, 'detailedTable') ? undefined : GenericTableFromJSON(json['detailedTable']),
        'costDetailsLink': !exists(json, 'costDetailsLink') ? undefined : CostDetailsLinkFromJSON(json['costDetailsLink']),
    };
}

export function OrderCostEstimationToJSONRecursive(value?: OrderCostEstimation | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'entryCosts': AmountToJSON(value.entryCosts),
        'transactionTax': AmountToJSON(value.transactionTax),
        'totalCosts': AmountToJSON(value.totalCosts),
        'expectedCounterValue': AmountToJSON(value.expectedCounterValue),
        'orderFees': AmountToJSON(value.orderFees),
        'orderFeesExplanation': value.orderFeesExplanation,
        'costAcceptancePrompt': value.costAcceptancePrompt,
        'detailedTable': GenericTableToJSON(value.detailedTable),
        'costDetailsLink': CostDetailsLinkToJSON(value.costDetailsLink),
    };
}

export function OrderCostEstimationToJSON(value?: OrderCostEstimation | null): any {
    return OrderCostEstimationToJSONRecursive(value, false);
}
