/*
 * This module provides access to AWS Cognito resources. We wrap the AWS SDK here, as it
 * has some bundling issues. Our code must only interact with cognito using this module.
 */

// must import types separately as bundling does not work with the main bundle
//import * as Cognito from 'amazon-cognito-identity-js';
import * as Cognito from 'amazon-cognito-identity-js/dist/amazon-cognito-identity.js';

export type CognitoConfig = {
	UserPoolId: string;
	ClientId: string;
	Endpoint: string;
};

export function initCognitoWrapper(cfg: CognitoConfig) {
	let cachedUser: Cognito.CognitoUser;
	let cachedUsername: string;
	return {
		getCognitoUser(username: string): Cognito.CognitoUser {
			if (!cachedUser || cachedUsername != username) {
				const userData = {
					Username: username,
					Pool: createCognitoUserPool(cfg),
					Storage
				};
				cachedUser = new Cognito.CognitoUser(userData);
				cachedUsername = username;
			}

			return cachedUser;
		}
	};
}

export type CognitoUserSession = Cognito.CognitoUserSession;
export type CognitoUser = Cognito.CognitoUser;
export type CognitoUserData = Cognito.UserData;
export type ICognitoUserAttributeData = Cognito.ICognitoUserAttributeData;
export const CognitoRefreshToken = Cognito.CognitoRefreshToken;

export function createRefreshToken(rt: string) {
	return new Cognito.CognitoRefreshToken({
		RefreshToken: rt
	}) as Cognito.CognitoRefreshToken;
}

export function createAuthenticationDetails(
	a: Cognito.IAuthenticationDetailsData
) {
	return new Cognito.AuthenticationDetails(
		a
	) as Cognito.AuthenticationDetails;
}

export function createCognitoUserAttribute(
	attr: Cognito.ICognitoUserAttributeData
) {
	return new Cognito.CognitoUserAttribute(
		attr
	) as Cognito.CognitoUserAttribute;
}

export function createCognitoUser(data: Cognito.ICognitoUserData) {
	return new Cognito.CognitoUser(data) as Cognito.CognitoUser;
}

let storage: Record<string, string> = {};
export const Storage = {
	getItem(key: string) {
		const result = storage[key];
		//console.log('GET ITEM ', key, '=>', result);
		return result;
	},
	clear() {
		storage = {};
		//sync();
	},
	removeItem(key: string) {
		delete storage[key];
		//sync();
	},
	setItem(key: string, value: string) {
		//console.log('SET ITEM', key, value);
		storage[key] = value;
		//sync();
	},
	async sync() {
		//console.log('PERFORM SYNC', storage);
	}
} as Cognito.ICognitoStorage & { sync(): Promise<void> };

export function createCognitoUserPool(
	CognitoCfg: CognitoConfig
): Cognito.CognitoUserPool {
	return new Cognito.CognitoUserPool({
		UserPoolId: CognitoCfg.UserPoolId,
		ClientId: CognitoCfg.ClientId,
		endpoint: CognitoCfg.Endpoint,
		Storage: Storage
	});
}
