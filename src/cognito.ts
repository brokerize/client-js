import { BrokerizeConfig, RegisteredUserAuthContextConfiguration, TokenSet } from "./apiCtx";

const clientId = "3a5sb9u5uoprplso87dsv2qom0";

const ENDPOINT = 'https://berg7.auth.eu-central-1.amazoncognito.com';

const refreshedTokens: Record<string, TokenSet> = {};

export class Cognito {
    private _cfg: BrokerizeConfig;

    constructor(cfg: BrokerizeConfig) {
        this._cfg = cfg;
    }

    async createRegisteredUserAuthConfigurationFromLoginRedirect({
        codeVerifier,
        code,
      }: {
        codeVerifier: string;
        code: string;
      }): Promise<RegisteredUserAuthContextConfiguration> {
        const res = await this._cfg.fetch(
          `${ENDPOINT}/oauth2/token`,
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
      url: `${ENDPOINT}/authorize?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${redirectUri}`,
    };
  }

  async getFreshTokens(toks: RegisteredUserAuthContextConfiguration): Promise<TokenSet> {
    debugger
    if (Date.now() < toks.tokens.expiresAt) {
        return toks.tokens;
    }

    if (!refreshedTokens[toks.tokens.refreshToken] || Date.now() > refreshedTokens[toks.tokens.refreshToken].expiresAt) {
        refreshedTokens[toks.tokens.refreshToken] = await this.refreshToken(toks.tokens.refreshToken);
    }

    return refreshedTokens[toks.tokens.refreshToken];
  }

  private async refreshToken(refreshToken: string) {
    const res = await this._cfg.fetch(
        `${ENDPOINT}/oauth2/token`,
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/x-www-form-urlencoded",
          }),
          body: Object.entries({
            grant_type: "refresh_token",
            client_id: clientId,
            refresh_token: refreshToken
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
        idToken: tokens.id_token,
        refreshToken,
        expiresAt: Date.now() + tokens.expires_in * 1000
      };
  }

    

}
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

  