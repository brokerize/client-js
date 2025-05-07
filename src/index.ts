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
import {
  AuthorizedApiContext,
  getWebSocketURLByBasePath,
} from "./authorizedApiContext";
import { BrokerizeError } from "./errors";
import * as openApiClient from "./swagger";
import * as Models from "./modelExports";
import {
  BrokerizeWebSocketClient,
  BrokerizeWebSocketClientImpl,
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

  /**
   * Create a context for making authorized API calls. This context will automatically take care of refreshing the access token
   * tokens if required. The `AuthorizedApiContext` then is used to make API calls on behalf of the active user.
   *
   * @param authCtxCfg the auth context data, e.g. a token set for a guest user
   * @param tokenRefreshCallback when a token refresh occurs, this callback is called and can store the stored tokens
   * @returns
   */
  createAuthorizedContext(
    authCtxCfg: AuthContextConfiguration,
    tokenRefreshCallback?: TokenRefreshCallback,
    customWebSocketClient?: BrokerizeWebSocketClient
  ) {
    const auth = this.createAuth(authCtxCfg, tokenRefreshCallback);
    return new AuthorizedApiContext(this._cfg, auth, customWebSocketClient);
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
   * @param tokenRefreshCallback when a token refresh occurs, this callback is called and can store the stored tokens
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

  /**
   * Create a customized WebSocket client. You can override the WebSocket connection URL and the Auth implementation
   * for a custom token retrieval behavior.
   *
   * Note that in most contexts this is not needed.
   *
   * If you want to use it, you should use the created client in your call to `createAuthorizedContext`, so that it
   * is used by clients:
   *
   * ```
   * const customWebSocketClient = Brokerize.createCustomWebSocketClient({ auth: { async getToken() {...} }});
   * const authorizedApiCtx = Brokerize.createAuthorizedContext(authCtxCfg, tokenRefreshCallback, customWebSocketClient);
   * ```
   */
  createCustomWebSocketClient({
    url,
    auth,
  }: {
    url?: string;
    auth: Auth;
  }): BrokerizeWebSocketClient {
    if (!url?.length) {
      const basePath =
        this._cfg.basePath || "https://api-preview.brokerize.com";
      url = getWebSocketURLByBasePath(basePath);
    }
    if (this._cfg.createWebSocket == null) {
      throw new Error("createWebSocket must be configured");
    }
    if (!auth?.getToken) {
      throw new Error(
        "Auth implementation with getToken function must be provided"
      );
    }

    return new BrokerizeWebSocketClientImpl(
      url,
      auth,
      this._cfg.createWebSocket
    );
  }
}

/**
 * When a token update occurs (e.g. due to a refreshToken call), this callback is called.
 * Clients can save the new tokens to their persistent token storage.
 */
export type TokenRefreshCallback = (cfg: AuthContextConfiguration) => void;

function getGlobalObject(): any {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw new Error("Unable to determine global object");
}
