/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  CognitoConfig,
  createAuth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration,
} from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import { CognitoWrapper } from "./awsCognitoIdentityWrapper";
import { BrokerizeError } from "./errors";
import * as openApiClient from "./swagger";
import * as Models from "./swagger/models";
import {
  BrokerizeWebSocketClient,
  Callback,
  Subscription,
} from "./websocketClient";
import * as WebSocketTypes from "./websocketTypes";

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
  BrokerizeError,
};

export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;
  private _cognito?: CognitoWrapper;

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
      createAuth(authCtxCfg, this._cfg)
    );
  }

  /**
   * Prepare for redirect to the login UI.
   *
   * @param redirectUri the redirect uri to redirect back to (must be allowed for the client)
   * @returns `state` + `codeVerifier` must be stored before redirecting (e.g. in sessionStorage). After that, redirect the browser to `url`. When the redirect back
   * to your application happens, the URL parameters `state` and `code` will be set.
   */
  async prepareLoginRedirect(redirectUri: string) {
    return this.getCognitoWrapper().prepareLoginRedirect(redirectUri);
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
    const cognito = this.getCognitoWrapper();
    return cognito.createRegisteredUserAuthConfigurationFromLoginRedirect({
      code,
      codeVerifier,
    });
  }

  getCognitoWrapper() {
    if (!this._cognito) {
      this._cognito = new CognitoWrapper(this._cfg);
    }

    return this._cognito;
  }
}

export { CognitoWrapper, CognitoConfig };
