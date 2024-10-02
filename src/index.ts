/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  CognitoConfig,
  CognitoFacade,
  CognitoPoolConfig,
  createAuth,
  Auth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration,
  TokenSet,
} from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import { BrokerizeError } from "./errors";
import * as openApiClient from "./swagger";
import * as Models from "./modelExports";
import {
  BrokerizeWebSocketClient,
  Callback,
  Subscription,
} from "./websocketClient";
import * as WebSocketTypes from "./websocketTypes";
import * as Utils from "./utils";

export {
  BrokerizeConfig,
  AuthContextConfiguration,
  AuthorizedApiContext,
  BrokerizeWebSocketClient,
  Models,
  WebSocketTypes,
  Subscription,
  Callback,
  Utils,
  BrokerizeError,
  Auth,
  TokenSet,
};
export { CognitoPoolConfig, RegisteredUserAuthContextConfiguration };
export { CognitoConfig, CognitoFacade };

export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;

  constructor(cfg: BrokerizeConfig) {
    if (!cfg.fetch) {
      const global = getGlobalObject();
      if (!global.fetch) {
        throw new Error(
          "fetch is not provided and no global fetch function is available"
        );
      }
      cfg.fetch = global.fetch.bind(global) as any;
    }

    if (!cfg.createAbortController) {
      const global = getGlobalObject();
      if (!global.AbortController) {
        throw new Error(
          "createAbortController not provided and no global AbortController is available"
        );
      }
      cfg.createAbortController = () => {
        return new global.AbortController();
      };
    }

    if (!cfg.createWebSocket) {
      const global = getGlobalObject();
      if (!global.WebSocket) {
        throw new Error(
          "WebSocket implementation not available. Please provide one in BrokerizeConfig."
        );
      }
      cfg.createWebSocket = (url?: string, protocol?: string | string[]) =>
        new global.WebSocket(url, protocol);
    }

    this._cfg = cfg;
    this._defaultApi = new openApiClient.DefaultApi(createConfiguration(cfg));
  }

  async createGuestUser(): Promise<AuthContextConfiguration> {
    const updatedAt = Date.now();
    const user = await this._defaultApi.createGuestUser({
      headers: {
        "x-brkrz-client-id": this._cfg.clientId,
        "Content-Type": "application/json",
      },
    });
    return {
      type: "guest",
      idToken: user.idToken,
      tokens: {
        updatedAt,
        response: user,
      },
    };
  }

  createAuthorizedContext(
    authCtxCfg: AuthContextConfiguration,
    tokenRefreshCallback?: TokenRefreshCallback
  ) {
    return new AuthorizedApiContext(
      this._cfg,
      this.createAuth(authCtxCfg, tokenRefreshCallback)
    );
  }

  getCognitoConfig(): CognitoPoolConfig | undefined {
    return this._cfg.cognito?.poolConfig;
  }

  /**
   * Create an "Auth" object which can be used to retrive access tokens.
   * Can be used by applications to manually make requests to the API without
   * using the provided `AuthorizedApiContext` methods.
   *
   * @param authCtxCfg the auth context configuration
   * @returns
   */
  createAuth(
    authCtxCfg: AuthContextConfiguration,
    tokenRefreshCallback?: TokenRefreshCallback
  ): Auth {
    return createAuth({
      authCfg: authCtxCfg,
      cfg: this._cfg,
      tokenRefreshCallback,
      options: {
        cognitoFacade: this._cfg.cognito?.cognitoFacade,
      },
    });
  }
}

/**
 * When a token update occurs (e.g. due to a refreshToken call), this callback is called.
 * Clients can save the new tokens to their persistent token storage.
 */
export type TokenRefreshCallback = (cfg: AuthContextConfiguration) => void;

function getGlobalObject() {
  let global;
  try {
    global = Function("return this")();
  } catch (e) {
    global = window;
  }
  return global;
}
