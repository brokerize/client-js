/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  CognitoConfig as CognitoCfg, CognitoRefreshToken, CognitoUserSession,
  createCognitoUser,
  createCognitoUserPool, Storage
} from "./awsCognitoIdentityWrapper";
import { WhatWgFetch } from "./dependencyDefinitions/fetch";
import { Configuration } from "./swagger";

export interface BrokerizeConfig {
  fetch: WhatWgFetch;
  createAbortController: () => AbortController;
  createWebSocket: (url?: string, protocol?: string | string[]) => WebSocket;
  /**
   * Path to the API, e.g. https://api-preview.brokerize.com
   */
  basePath?: string;
  clientId: string;
  /**
   * The AWS cognito configuration, if the application is allowed to be used with brokerize accounts.
   */
  cognito?: CognitoConfig;
}

export type CognitoConfig = CognitoCfg;

export type AuthContextConfiguration =
  | GuestAuthContextConfiguration
  | RegisteredUserAuthContextConfiguration;

export type RegisteredUserAuthContextConfiguration = {
  type: "registered";
  username: string;
  tokens: TokenSet;
};

export type TokenSet = {
  idToken: string;
  refreshToken: string;
  expiresAt: number;
};

export interface GuestAuthContextConfiguration {
  type: "guest";
  idToken: string;
}

export interface Auth {
  getToken: () => Promise<{ idToken: string }>;
}

export function createConfiguration(cfg: BrokerizeConfig) {
  if (!cfg.clientId) {
    throw new Error("You must configure a clientId to use the brokerize API.");
  }

  return new Configuration({
    fetchApi: cfg.fetch as any,
    basePath: cfg.basePath,
  });
}

export function createAuth(
  authCfg: AuthContextConfiguration,
  cfg: BrokerizeConfig
): Auth {
  if (authCfg.type == "guest") {
    return {
      async getToken() {
        return { idToken: authCfg.idToken };
      },
    };
  } else if (authCfg.type == "registered") {
    if (!cfg.cognito) {
      throw new Error(
        "Trying to initialize createAuth for cognito, but no cognito config present in BrokerizeConfig."
      );
    }
    const userPool = createCognitoUserPool(cfg.cognito);
    const userData = {
      Username: authCfg.username,
      Pool: userPool,
      Storage,
    };
    const user = createCognitoUser(userData);

    let session: Promise<CognitoUserSession> | null = null;

    async function forceRefreshSession(): Promise<CognitoUserSession> {
      console.log('forceRefreshSession');
      return new Promise((resolve, reject) => {
        user.refreshSession(
          new CognitoRefreshToken({
            RefreshToken: (authCfg as RegisteredUserAuthContextConfiguration)
              .tokens.refreshToken,
          }),
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result as CognitoUserSession);
            }
          }
        );
      });
    }

    async function getFreshSession() {
      if (!session) {
        session = forceRefreshSession();
        return session;
      } else {
        const isValid = (await session).isValid();
        if (!isValid) {
          session = forceRefreshSession();
        }
      }

      return session;
    }

    return {
      async getToken() {
        const session = await getFreshSession();
        const result = { idToken: session!.getIdToken().getJwtToken() };
        return result;
      },
    };
  } else {
    throw new Error("Unsupported auth config.");
  }
}
