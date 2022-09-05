/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  createAuth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration
} from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import * as openApiClient from "./swagger";
import {
  BrokerizeWebSocketClient, Callback,
  Subscription
} from "./websocketClient";
export { BrokerName } from "./swagger";
export {
  BrokerizeConfig,
  AuthContextConfiguration,
  AuthorizedApiContext,
  BrokerizeWebSocketClient,
  Models,
  WebSocketTypes,
  Subscription,
  Callback,
  TradingError
};


export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;
  private _cognito?: Cognito;

  constructor(cfg: BrokerizeConfig) {
    this._cfg = cfg;
    this._defaultApi = new openApiClient.DefaultApi(createConfiguration(cfg));
  }

  private getCognito() {
    if (!this._cognito) {
      this._cognito = new Cognito(this._cfg);
    }

    return this._cognito;
  }

  async createGuestUser(): Promise<AuthContextConfiguration> {
    const user = await this._defaultApi.createGuestUser();
    return {
      type: "guest",
      idToken: user.idToken,
    };
  }

  createAuthorizedContext(authCtxCfg: AuthContextConfiguration) {
    return new AuthorizedApiContext(this._cfg, createAuth(authCtxCfg, this._cfg));
  }

  /**
   * Prepare for redirect to the login UI.
   *
   * @param redirectUri the redirect uri to redirect back to (must be allowed for the client)
   * @returns `state` + `codeVerifier` must be stored before redirecting (e.g. in sessionStorage). After that, redirect the browser to `url`. When the redirect back
   * to your application happens, the URL parameters `state` and `code` will be set.
   */
  async prepareLoginRedirect(redirectUri: string) {
    return this.getCognito().prepareLoginRedirect(redirectUri);
  }

  /**
   * When using `prepareLoginRedirect`, the login UI will redirect to your `redirectUri` with the query parameters `code` and `state` when login is sucessful.
   * The app must then look up the stored `codeVerifier` for the given `state` and provide it for this function.
   *
   * @param param0
   * @returns
   */
  async createRegisteredUserAuthConfigurationFromLoginRedirect({
    codeVerifier,
    code,
  }: {
    codeVerifier: string;
    code: string;
  }): Promise<RegisteredUserAuthContextConfiguration> {
    const cognito = this.getCognito();
    return cognito.createRegisteredUserAuthConfigurationFromLoginRedirect({code, codeVerifier});
  }
}

import { Cognito } from "./cognito";
import { TradingError } from "./errors";
import * as Models from "./swagger/models";
import * as WebSocketTypes from "./websocketTypes";

