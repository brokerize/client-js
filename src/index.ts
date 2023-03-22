/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  CognitoPoolConfig,
  createAuth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration,
} from "./apiCtx";
import {
  AuthorizedApiContext,
  CognitoAuth,
  CognitoSession,
} from "./authorizedApiContext";
import { BrokerizeError } from "./errors";
import * as openApiClient from "./swagger";
import * as Models from "./swagger/models";
import {
  BrokerizeWebSocketClient,
  Callback,
  Subscription,
} from "./websocketClient";
import * as WebSocketTypes from "./websocketTypes";

export {
  BrokerizeConfig,
  AuthContextConfiguration,
  AuthorizedApiContext,
  BrokerizeWebSocketClient,
  Models,
  WebSocketTypes,
  Subscription,
  Callback,
  BrokerizeError,
};
export {
  CognitoPoolConfig,
  RegisteredUserAuthContextConfiguration,
  CognitoAuth,
  CognitoSession,
};

export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;

  constructor(cfg: BrokerizeConfig) {
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
        cognitoAuth: this._cfg.cognito?.authWrapper,
      })
    );
  }

  getCognitoConfig(): CognitoPoolConfig | undefined {
    return this._cfg.cognito?.config;
  }
}
