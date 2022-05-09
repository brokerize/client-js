/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import { AuthorizedApiContext } from "./authorizedApiContext";
import { WhatWgFetch } from "./dependencyDefinitions/fetch";
import * as openApiClient from "./swagger";
import { Configuration } from "./swagger";

export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;

  constructor(cfg: BrokerizeConfig) {
    this._cfg = cfg;
    this._defaultApi = new openApiClient.DefaultApi(createConfiguration(cfg));
  }

  createGuestUser() {
    return this._defaultApi.createGuestUser();
  }

  createAuthorizedContext(authCtxCfg: AuthContextConfiguration) {
    return new AuthorizedApiContext(this._cfg, createAuth(authCtxCfg));
  }
}

export interface BrokerizeConfig {
  fetch: WhatWgFetch;
  createAbortController: () => AbortController;
  createWebSocket: (url?: string, protocol?: string | string[]) => WebSocket;
}

export type AuthContextConfiguration =
  | GuestAuthContextConfiguration
  | RegisteredUserAuthContextConfiguration;

export type RegisteredUserAuthContextConfiguration = {
  type: "registered";
  // TODO refreshToken etc. for cognito auth
};

export interface GuestAuthContextConfiguration {
  type: "guest";
  idToken: string;
}

export interface Auth {
  getToken: () => Promise<{ idToken: string }>;
}

export function createConfiguration(cfg: BrokerizeConfig) {
  return new Configuration({
    fetchApi: cfg.fetch as any,
  });
}

export function createAuth(authCfg: AuthContextConfiguration): Auth {
  if (authCfg.type == "guest") {
    return {
      async getToken() {
        return { idToken: authCfg.idToken };
      },
    };
  } else {
    throw new Error(
      "Unsupported auth config. Currently only guest user is implemented."
    );
  }
}
