/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import { BrokerizeError, Models, TokenRefreshCallback } from ".";
import { WhatWgFetch } from "./dependencyDefinitions/fetch";
import { WebSocket } from "./dependencyDefinitions/webSocket";
import { Configuration } from "./swagger";

export interface BrokerizeConfig {
  fetch?: WhatWgFetch;
  createAbortController?: () => AbortController;
  createWebSocket?: (url?: string, protocol?: string | string[]) => WebSocket;
  /**
   * Path to the API, e.g. https://api-preview.brokerize.com
   */
  basePath?: string;
  /**
   * Path to the crypto trading API (c.f. tradingViaCryptoService), e.g. https://crypto-service-api.com
   */
  basePathCryptoService?: string;
  clientId: string;
  /**
   * The AWS cognito configuration, if the application is supposed to be used with brokerize accounts.
   */
  cognito?: CognitoConfig;
}

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
  /**
   * @deprecated use tokens instead
   */
  idToken: string;
  tokens: { updatedAt: number; response: Models.CreateGuestUserResponse };
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

export function createAuth({
  authCfg,
  cfg,
  options,
  tokenRefreshCallback,
}: {
  authCfg: AuthContextConfiguration;
  cfg: BrokerizeConfig;
  options?: AuthorizedApiContextOptions;
  tokenRefreshCallback?: TokenRefreshCallback;
}): Auth {
  if (authCfg.type == "guest") {
    const guestAuthCfg = JSON.parse(
      JSON.stringify(authCfg)
    ) as GuestAuthContextConfiguration; // clone it
    return {
      async getToken() {
        if (guestAuthCfg.tokens) {
          /* modern tokens */
          const tokenExpiresAt =
            guestAuthCfg.tokens.updatedAt +
            guestAuthCfg.tokens.response.expiresIn! * 1000 -
            10000;
          const needsRefresh = Date.now() > tokenExpiresAt;
          if (needsRefresh && guestAuthCfg.tokens.response.refreshToken) {
            if (!cfg.fetch) {
              throw new Error(
                "Invalid cfg: fetch is required for refreshing tokens."
              );
            }
            const response = await fetch(cfg.basePath + "/user/token", {
              method: "POST",
              headers: {
                "x-brkrz-client-id": cfg.clientId,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              // XXX some runtimes do not have URLSearchParams, so just produce the body in the old-fashioned way
              body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(
                guestAuthCfg.tokens.response.refreshToken
              )}`,
            });

            if (!response.ok) {
              throw new BrokerizeError(401, {
                msg: "The token could not be refreshed. Please log in again.",
                code: "AUTH",
              });
            }

            const responseJson = (await response.json()) as {
              token_type: string;
              access_token: string;
              expires_in: number | undefined;
              refresh_token: any;
              refresh_token_expires_in: number | undefined;
              refresh_Token_without_tradingsession?: string;
              refresh_token_without_tradingsession_expires_in?: number;
            };

            guestAuthCfg.idToken = responseJson.access_token;
            // replace the original object
            guestAuthCfg.tokens = {
              updatedAt: Date.now(),
              response: {
                accessToken: responseJson.access_token,
                refreshToken: responseJson.refresh_token,
                expiresIn: responseJson.expires_in,
                tokenType: responseJson.token_type,
                refreshTokenExpiresIn: responseJson.refresh_token_expires_in,
                idToken: responseJson.access_token,
                refreshTokenWithoutTradingsession:
                  responseJson.refresh_Token_without_tradingsession,
                refreshTokenWithoutTradingsessionExpiresIn:
                  responseJson.refresh_token_without_tradingsession_expires_in,
              },
            };

            if (tokenRefreshCallback) {
              tokenRefreshCallback(guestAuthCfg);
            }

            return { idToken: responseJson.access_token };
          }
        }

        return { idToken: guestAuthCfg.idToken };
      },
    };
  } else if (authCfg.type == "registered") {
    if (!cfg.cognito) {
      throw new Error(
        "Trying to initialize createAuth for cognito, but no cognito config present in BrokerizeConfig."
      );
    }

    if (!options?.cognitoFacade) {
      throw new Error(
        "Trying to initialize createAuth for cognito, but access to the cognito library was not provided in the options."
      );
    }

    const session = options.cognitoFacade.createSession(
      cfg.cognito?.poolConfig,
      authCfg
    );
    return {
      async getToken() {
        return session.getToken();
      },
    };
  } else {
    throw new Error("Unsupported auth config.");
  }
}

export type CognitoConfig = {
  poolConfig: CognitoPoolConfig;
  cognitoFacade: CognitoFacade;
};

export type CognitoPoolConfig = {
  UserPoolId: string;
  ClientId: string;
  Endpoint?: string | null;
};

export type CognitoFacade = {
  createSession: (
    cognitoPoolConfig: CognitoPoolConfig,
    authCfg: RegisteredUserAuthContextConfiguration
  ) => {
    getToken: () => Promise<{ idToken: string }>;
  };
};

export type AuthorizedApiContextOptions = {
  cognitoFacade?: CognitoFacade;
};
