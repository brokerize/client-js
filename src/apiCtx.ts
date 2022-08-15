/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import { Cognito } from "./cognito";
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
}

export type AuthContextConfiguration =
  | GuestAuthContextConfiguration
  | RegisteredUserAuthContextConfiguration;

export type RegisteredUserAuthContextConfiguration = {
  type: "registered";
  tokens: TokenSet;
};

export type TokenSet = {
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

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
    basePath: cfg.basePath
  });
}

export function createAuth(authCfg: AuthContextConfiguration, cfg: BrokerizeConfig): Auth {
  if (authCfg.type == "guest") {
    return {
      async getToken() {
        return { idToken: authCfg.idToken };
      },
    };
  } else if (authCfg.type == "registered") {
    const cognito = new Cognito(cfg);
    return {
      async getToken() {
        const tokens = await cognito.getFreshTokens(authCfg);
        return { idToken: tokens.idToken };
      },
    };
  } else {
    throw new Error("Unsupported auth config.");
  }
}
