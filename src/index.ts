/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  CognitoConfig,
  CognitoFacade,
  CognitoPoolConfig,
  createAuth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration,
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
    const user = await this._defaultApi.createGuestUser({
      headers: {
        "x-brkrz-client-id": this._cfg.clientId,
        "Content-Type": "application/json",
      },
    });
    return {
      type: "guest",
      idToken: user.idToken,
    };
  }

  createAuthorizedContext(authCtxCfg: AuthContextConfiguration) {
    return new AuthorizedApiContext(
      this._cfg,
      createAuth(authCtxCfg, this._cfg, {
        cognitoFacade: this._cfg.cognito?.cognitoFacade,
      })
    );
  }

  getCognitoConfig(): CognitoPoolConfig | undefined {
    return this._cfg.cognito?.poolConfig;
  }
}

function getGlobalObject() {
  let global;
  try {
    global = Function("return this")();
  } catch (e) {
    global = window;
  }
  return global;
}
