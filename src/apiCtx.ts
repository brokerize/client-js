/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import { WhatWgFetch } from "./dependencyDefinitions/fetch";
import { WebSocket } from "./dependencyDefinitions/webSocket";
import { Configuration } from "./swagger";

export interface BrokerizeConfig {
  fetch?: WhatWgFetch;
  createAbortController: () => AbortController;
  createWebSocket: (url?: string, protocol?: string | string[]) => WebSocket;
  /**
   * Path to the API, e.g. https://api-preview.brokerize.com
   */
  basePath?: string;
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
  cfg: BrokerizeConfig,
  options?: AuthorizedApiContextOptions
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
  Endpoint: string;
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
