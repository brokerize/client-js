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
    Challenge,
    ChallengeFromJSON,
    ChallengeFromJSONTyped,
    ChallengeToJSON,
} from './Challenge';
import {
    LoginResponseChallengeAllOf,
    LoginResponseChallengeAllOfFromJSON,
    LoginResponseChallengeAllOfFromJSONTyped,
    LoginResponseChallengeAllOfToJSON,
} from './LoginResponseChallengeAllOf';
import {
    LoginResponseChallengeSpecifics,
    LoginResponseChallengeSpecificsFromJSON,
    LoginResponseChallengeSpecificsFromJSONTyped,
    LoginResponseChallengeSpecificsToJSON,
} from './LoginResponseChallengeSpecifics';

/**
 * 
 * @export
 * @interface LoginResponseChallenge
 */
export interface LoginResponseChallenge {
    /**
     * 
     * @type {string}
     * @memberof LoginResponseChallenge
     */
    state: LoginResponseChallengeStateEnum;
    /**
     * 
     * @type {Challenge}
     * @memberof LoginResponseChallenge
     */
    challenge: Challenge;
}


/**
 * @export
 */
export const LoginResponseChallengeStateEnum = {
    Challenge: 'challenge'
} as const;
export type LoginResponseChallengeStateEnum = typeof LoginResponseChallengeStateEnum[keyof typeof LoginResponseChallengeStateEnum];


export function LoginResponseChallengeFromJSON(json: any): LoginResponseChallenge {
    return LoginResponseChallengeFromJSONTyped(json, false);
}

export function LoginResponseChallengeFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginResponseChallenge {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'state': json['state'],
        'challenge': ChallengeFromJSON(json['challenge']),
    };
}

export function LoginResponseChallengeToJSONRecursive(value?: LoginResponseChallenge | null, ignoreParent = false): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        


        'state': value.state,
        'challenge': ChallengeToJSON(value.challenge),
    };
}

export function LoginResponseChallengeToJSON(value?: LoginResponseChallenge | null): any {
    return LoginResponseChallengeToJSONRecursive(value, false);
}
