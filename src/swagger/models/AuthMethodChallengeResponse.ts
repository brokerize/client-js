/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * # brokerize API  The brokerize API allows clients to implement multi-brokerage with a unified interface. While our partner brokers have different feature sets and legal constraints, our abstractions make it easy to build a consistent trading experience for your users. We provide an accessible demo broker for development and quality assurance purposes that allows you to test the different behaviours without the need to log in to the actual brokers.  # user accounts & temporary guest sessions  All API calls act on behalf of a specific end-user that interacts with your application. It is recommended to directly call the API from frontends (for web applications, this will involve a CORS configuration, which can be attached easily to your client id).  End users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is terminated. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  After retrieving a token for the user, interaction with the API is the same for both cases. All features are available for guest and registered users.  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  See [GetAuthInfo](#operation/GetAuthInfo) to get an overview on the available operations like creation, change and cancellation of orders.  # deviceId  Clients can add the header `x-brkrz-device-id` to requests. If this header is present, it may be used for internal tracking (e.g. counting how many unique users create trades etc.). The device id must be generated on the client (for example, it can be a uuid stored in the user\'s browser).  The header is optional. Be aware that this must not contain personal information about your user.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. The `CreateGuestUser` endpoint is accessible without a token, so _for that endpoint_ an IP-based limiting (1 guest user creation per 10 seconds) is implemented. These rate limits are subject to change and will be refined in the future.  Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.  # privileged clients with client secrets  Our API is designed to be publicly accessible in order to be used directly from browsers and apps. However this comes with relatively strict rate limiting (for example) for the guest user creation.  If a client only calls the API from a secured backend, the limit may be increased.  In order to authenticate as a priviliged client, the header `x-brkrz-client-secret` must be added to requests (a client secret is provided manually in that case).  # request ids  The brokerize backend assigns a requestId to each request and returns it in the `x-request-id` header. The ID can be used to research error details, so it may be displayed to the user in the case of unexpected errors. In the case of internal server errors, the id will also be part of the JSON body; for example:  ``` {     \"message\": \"An internal server error occured.\",     \"requestId\": \"9KzqMpRvVrQHDkFo\" } ```  # tradable securities  In this API, all tradable securities are identified by their ISIN. However, some securities do not have an ISIN. In these cases, we however still use the ISIN field for some special values. Currently frontends should manually map the securities to their security database if suitable.  The following special values for ISIN are currently supported (of course, the actual availability depends on the specific broker implementations):  | `ISIN`  | Description | | ------- | ----------- | | `BTC`   | BTC/EUR     | | `ETH`   | ETH/EUR     | | `LTC`   | LTC/EUR     | | `XRP`   | XRP/EUR     | | `BCH`   | BCH/EUR     | | `EOS`   | EOS/EUR     | | `LINK`  | LINK/EUR    | | `XLM`   | XLM/EUR     | | `DOT`   | DOT/EUR     | | `UNI`   | UNI/EUR     | | `DOGE`  | DOGE/EUR    | | `ETC`   | ETC/EUR     | | `ADA`   | ADA/EUR     | | `SOL`   | SOL/EUR     | | `AAVE`  | AAVE/EUR    | | `ALGO`  | ALGO/EUR    | | `CRV`   | CRV/EUR     | | `LUNA`  | LUNA/EUR    | | `MANA`  | MANA/EUR    | | `MATIC` | MATIC/EUR   | | `XTZ`   | XTZ/EUR     |    API build data: <pre>{     \"buildTime\": \"2023-02-02T11:03:37.076Z\" }</pre>
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
    AuthMethod,
    AuthMethodFromJSON,
    AuthMethodFromJSONTyped,
    AuthMethodToJSON,
} from './AuthMethod';
import {
    AuthMethodChallengeResponseSpecifics,
    AuthMethodChallengeResponseSpecificsFromJSON,
    AuthMethodChallengeResponseSpecificsFromJSONTyped,
    AuthMethodChallengeResponseSpecificsToJSON,
} from './AuthMethodChallengeResponseSpecifics';
import {
    AuthMethodFlow,
    AuthMethodFlowFromJSON,
    AuthMethodFlowFromJSONTyped,
    AuthMethodFlowToJSON,
} from './AuthMethodFlow';

/**
 * With the `CHALLENGE_RESPONSE` flow, to execute an operation, a challenge has to be created as the first step
 * and the response to the challenge will be provided with the actual operation as a second API call:
 * 
 * 1) The end user requests challenge with a button labelled `getChallengeLabel`, which triggers the `createXYZChallenge` endpoint (e.g. `CreateSessionTanChallenge`)
 * 2) The challenge is then presented to the user. It may be a code to look up from a sheet of paper, a photoTAN to scan with the
 *    broker's mobile app or anything else (details are described in `Challenge`).
 * 3) `AuthMethod.challengeResponseIsOnlyConfirmation` determines if and how the user must actually enter a response text:
 *    - If `challengeResponseIsOnlyConfirmation=true`: the final API call (e.g. `EnableSessionTan`) is only a confirmation of some second factor (i.e. the user tells us they
 *      have allowed the action in their broker's mobile app). In this case, the `challengeResponse` must be sent as an empty string once
 *      the user clicks the corresponding confirm button.
 *    - Otherwise, the user is expected to provide a textual `challengeResponse`. In this case, a text field for the `challengeResponse` must be displayed
 *      and labelled with `tanFieldLabel`. The  `challengeResponse` is sent as entered by the user to the actual action endpoint (e.g. `EnableSessionTan`)
 * @export
 * @interface AuthMethodChallengeResponse
 */
export interface AuthMethodChallengeResponse extends AuthMethod {
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    tanFieldLabel: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodChallengeResponse
     */
    challengeResponseIsOnlyConfirmation?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    challengeLabel?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    getChallengeLabel: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthMethodChallengeResponse
     */
    isDefaultMethod?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof AuthMethodChallengeResponse
     */
    id: string;
}

export function AuthMethodChallengeResponseFromJSON(json: any): AuthMethodChallengeResponse {
    return AuthMethodChallengeResponseFromJSONTyped(json, false);
}

export function AuthMethodChallengeResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthMethodChallengeResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AuthMethodFromJSONTyped(json, ignoreDiscriminator),
        'tanFieldLabel': json['tanFieldLabel'],
        'challengeResponseIsOnlyConfirmation': !exists(json, 'challengeResponseIsOnlyConfirmation') ? undefined : json['challengeResponseIsOnlyConfirmation'],
        'challengeLabel': !exists(json, 'challengeLabel') ? undefined : json['challengeLabel'],
        'getChallengeLabel': json['getChallengeLabel'],
        'isDefaultMethod': !exists(json, 'isDefaultMethod') ? undefined : json['isDefaultMethod'],
        'label': json['label'],
        'id': json['id'],
    };
}

export function AuthMethodChallengeResponseToJSONRecursive(value?: AuthMethodChallengeResponse | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        ...ignoreParent ? {} : AuthMethodToJSON(value),


        'tanFieldLabel': value.tanFieldLabel,
        'challengeResponseIsOnlyConfirmation': value.challengeResponseIsOnlyConfirmation,
        'challengeLabel': value.challengeLabel,
        'getChallengeLabel': value.getChallengeLabel,
        'isDefaultMethod': value.isDefaultMethod,
        'label': value.label,
        'id': value.id,
    };
}

export function AuthMethodChallengeResponseToJSON(value?: AuthMethodChallengeResponse | null): any {
    return AuthMethodChallengeResponseToJSONRecursive(value, false);
}
