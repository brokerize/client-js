/*
 * This module provides access to AWS Cognito resources. We wrap the AWS SDK here, as it
 * has some bundling issues. Our code must only interact with cognito using this module.
 */

// must import types separately as bundling does not work with the main bundle
import * as Cognito from "amazon-cognito-identity-js";
import { decodeJwt } from "jose";
import {
  BrokerizeConfig,
  CognitoConfig,
  RegisteredUserAuthContextConfiguration,
} from "./apiCtx";


export class CognitoWrapper {
  private _cfg: BrokerizeConfig;
  private _cachedUser?: Cognito.CognitoUser;
  private _cachedUsername?: string;
  private _cognitoCfg: CognitoConfig;

  constructor(brokerizeCfg: BrokerizeConfig) {
    this._cfg = brokerizeCfg;
    if (!this._cfg.cognito) {
      throw new Error(
        "Tried to init a CognitoWrapper without cognito config. This is not allowed. Please provide a cognito config."
      );
    }
    this._cognitoCfg = this._cfg.cognito;
  }

  getCognitoUser(username: string): Cognito.CognitoUser {
    if (!this._cachedUser || this._cachedUsername != username) {
      const userData = {
        Username: username,
        Pool: createCognitoUserPool(this._cognitoCfg),
        Storage,
      };
      this._cachedUser = new Cognito.CognitoUser(userData);
      this._cachedUsername = username;
    }

    return this._cachedUser;
  }

  async getCognitoUserByAuthCfg(
    cfg: RegisteredUserAuthContextConfiguration
  ): Promise<Cognito.CognitoUser> {
    const userData = {
      Username: cfg.username,
      Pool: this.createCognitoUserPool(),
      Storage: Storage,
    };
    const _user = createCognitoUser(userData);
    const data: Cognito.CognitoUserSession = await new Promise(
      (resolve, reject) => {
        _user.refreshSession(
          createRefreshToken(cfg.tokens.refreshToken),
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result as Cognito.CognitoUserSession);
            }
          }
        );
      }
    );

    return _user;
  }

  /**
   * Prepare for redirect to the login UI.
   *
   * @param redirectUri the redirect uri to redirect back to (must be allowed for the client)
   * @returns `state` + `codeVerifier` must be stored before redirecting (e.g. in sessionStorage). After that, redirect the browser to `url`. When the redirect back
   * to your application happens, the URL parameters `state` and `code` will be set.
   */
  async prepareLoginRedirect(redirectUri: string) {
    const state = await generateNonce();
    const codeVerifier = await generateNonce();
    const codeChallenge = await base64URLEncode(await sha256(codeVerifier));
    return {
      state,
      codeVerifier,
      url: `${this._cognitoCfg.Endpoint}/authorize?response_type=code&client_id=${this._cognitoCfg.ClientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${redirectUri}`,
    };
  }

  async createRegisteredUserAuthConfigurationFromLoginRedirect({
    codeVerifier,
    code,
  }: {
    codeVerifier: string;
    code: string;
  }): Promise<RegisteredUserAuthContextConfiguration> {
    const res = await this._cfg.fetch(
      `${this._cognitoCfg.Endpoint}/oauth2/token`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/x-www-form-urlencoded",
        }),
        body: Object.entries({
          grant_type: "authorization_code",
          client_id: this._cognitoCfg.ClientId,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: window.location.origin,
        })
          .map(([k, v]) => `${k}=${v}`)
          .join("&"),
      }
    );
    if (!res.ok) {
      throw new Error(await res.json());
    }
    const tokens = await res.json();

    const decoded = decodeJwt(tokens.id_token);
    const username = decoded["cognito:username"] as string;

    return {
      type: "registered",
      username,
      tokens: {
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      },
    };
  }

  createCognitoUserPool() {
    return createCognitoUserPool(this._cognitoCfg);
  }

  createAuthenticationDetails(a: Cognito.IAuthenticationDetailsData) {
    return new Cognito.AuthenticationDetails(
      a
    ) as Cognito.AuthenticationDetails;
  }

  createCognitoUserAttribute(attr: Cognito.ICognitoUserAttributeData) {
    return new Cognito.CognitoUserAttribute(
      attr
    ) as Cognito.CognitoUserAttribute;
  }
}

export type CognitoUserSession = Cognito.CognitoUserSession;
export type CognitoUser = Cognito.CognitoUser;
export type CognitoUserData = Cognito.UserData;
export type ICognitoUserAttributeData = Cognito.ICognitoUserAttributeData;
export const CognitoRefreshToken = Cognito.CognitoRefreshToken;

export function createRefreshToken(rt: string) {
  return new Cognito.CognitoRefreshToken({
    RefreshToken: rt,
  }) as Cognito.CognitoRefreshToken;
}

export function createAuthenticationDetails(
  a: Cognito.IAuthenticationDetailsData
) {
  return new Cognito.AuthenticationDetails(a) as Cognito.AuthenticationDetails;
}

export function createCognitoUserAttribute(
  attr: Cognito.ICognitoUserAttributeData
) {
  return new Cognito.CognitoUserAttribute(attr) as Cognito.CognitoUserAttribute;
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
  },
} as Cognito.ICognitoStorage & { sync(): Promise<void> };

export function createCognitoUserPool(
  CognitoCfg: CognitoConfig
): Cognito.CognitoUserPool {
  return new Cognito.CognitoUserPool({
    UserPoolId: CognitoCfg.UserPoolId,
    ClientId: CognitoCfg.ClientId,
    endpoint: CognitoCfg.Endpoint,
    Storage: Storage,
  });
}

async function sha256(s: string) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
}

async function generateNonce() {
  const hash = await sha256(
    crypto.getRandomValues(new Uint32Array(4)).toString()
  );
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function base64URLEncode(s: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(s as any) as any))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
