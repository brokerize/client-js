/* Import/Export the DOM parts we rely on. Those are partial copies from the official TypeScript DOM library definitions (https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts),
   but reduced to the parts actually used by bg-trading. */
import {
  AuthContextConfiguration,
  BrokerizeConfig,
  createAuth,
  createConfiguration,
} from "./apiCtx";
import { AuthorizedApiContext } from "./authorizedApiContext";
import * as openApiClient from "./swagger";
export { BrokerName } from "./swagger";

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
