/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
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
  tokens: {
    idToken: string;
    refreshToken: string;
    expiresAt: number;
  };
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
    debugger
    throw new Error("You must configure a clientId to use the brokerize API.");
  }

  return new Configuration({
    fetchApi: cfg.fetch as any,
    basePath: cfg.basePath
  });
}

export function createAuth(authCfg: AuthContextConfiguration): Auth {
  if (authCfg.type == "guest") {
    return {
      async getToken() {
        return { idToken: authCfg.idToken };
      },
    };
  } else if (authCfg.type == "registered") {
    return {
      async getToken() {
        // TODO implement refresh token
        return { idToken: authCfg.tokens.idToken };
      },
    };
  } else {
    throw new Error("Unsupported auth config.");
  }
}
