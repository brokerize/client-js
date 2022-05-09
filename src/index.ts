/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  createAuth,
  createConfiguration,
  RegisteredUserAuthContextConfiguration,
} from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import * as openApiClient from "./swagger";
import { BrokerizeWebSocketClient } from "./websocketClient";
export { BrokerName } from "./swagger";

async function sha256(s: string) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
}

async function generateNonce() {
  const hash = await sha256(
    crypto.getRandomValues(new Uint32Array(4)).toString()
  );
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function base64URLEncode(s: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(s as any) as any))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const clientId = "3a5sb9u5uoprplso87dsv2qom0";

export class Brokerize {
  private _cfg: BrokerizeConfig;
  private _defaultApi: openApiClient.DefaultApi;

  constructor(cfg: BrokerizeConfig) {
    this._cfg = cfg;
    this._defaultApi = new openApiClient.DefaultApi(createConfiguration(cfg));
  }

  async createGuestUser(): Promise<AuthContextConfiguration> {
    const user = await this._defaultApi.createGuestUser();
    return {
      type: "guest",
      idToken: user.idToken,
    };
  }

  createAuthorizedContext(authCtxCfg: AuthContextConfiguration) {
    return new AuthorizedApiContext(this._cfg, createAuth(authCtxCfg));
  }

  /**
   * Prepare for redirect to the login UI.
   *
   * @param redirectUri the redirect uri to redirect back to (must be allowed for the client)
   * @returns `state` + `codeVerifier` must be stored before redirecting (e.g. in sessionStorage). After that, redirect the browser to `url`. When the redirect back
   * to your application happens, the URL parameters `state` and `code` will be set.
   */
  async prepareLoginRedirect(redirectUri: string) {
    const state = await generateNonce();
    const codeVerifier = await generateNonce();
    const codeChallenge = await base64URLEncode(await sha256(codeVerifier));
    return {
      state,
      codeVerifier,
      url: `https://berg7.auth.eu-central-1.amazoncognito.com/authorize?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${redirectUri}`,
    };
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
    const res = await this._cfg.fetch(
      `https://berg7.auth.eu-central-1.amazoncognito.com/oauth2/token`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/x-www-form-urlencoded",
        }),
        body: Object.entries({
          grant_type: "authorization_code",
          client_id: clientId,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: window.location.origin,
        })
          .map(([k, v]) => `${k}=${v}`)
          .join("&"),
      }
    );
    if (!res.ok) {
      throw new Error(await res.json());
    }
    const tokens = await res.json();
    return {
      type: "registered",
      tokens: {
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      },
    };
  }
}

export { BrokerizeConfig, AuthContextConfiguration, AuthorizedApiContext, BrokerizeWebSocketClient };
