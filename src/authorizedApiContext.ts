import { Auth, BrokerizeConfig, createConfiguration } from "./apiCtx";
import { WhatWgAbortSignal } from "./dependencyDefinitions/abortSignal";
import * as openApiClient from "./swagger";
import {
  AddSessionParams,
  DeleteDemoAccountRequest,
  GetOrderRequest,
} from "./swagger";
import { BrokerizeWebSocketClient } from "./websocketClient";

export class AuthorizedApiContext {
  private _cfg: BrokerizeConfig;
  private _auth: Auth;
  private _defaultApi: openApiClient.DefaultApi;
  private _demoBrokerApi: openApiClient.DemobrokerApi;
  private _tradeApi: openApiClient.TradeApi;
  private _isDestroyed: boolean = false;
  private _abortController: AbortController;
  constructor(cfg: BrokerizeConfig, auth: Auth) {
    this._cfg = cfg;
    this._auth = auth;
    this._defaultApi = new openApiClient.DefaultApi(createConfiguration(cfg));
    this._demoBrokerApi = new openApiClient.DemobrokerApi(
      createConfiguration(cfg)
    );
    this._tradeApi = new openApiClient.TradeApi(createConfiguration(cfg));
    this._abortController = cfg.createAbortController();
  }
  private async _initRequestInit() {
    if (this._isDestroyed) {
      throw new Error("AuthorizedApiContext is destroyed");
    }
    const tok = await this._auth.getToken();
    return {
      signal: this._abortController.signal,
      headers: {
        "x-access-token": tok.idToken,
        "Content-Type": "application/json",
      },
    };
  }
  async getBrokers() {
    return this._defaultApi.getBrokers(await this._initRequestInit());
  }
  async getExchanges() {
    return this._defaultApi.getExchanges(await this._initRequestInit());
  }
  async addSession(params: AddSessionParams) {
    return this._defaultApi.addSession(
      { addSessionParams: params },
      await this._initRequestInit()
    );
  }
  async getSessions() {
    return this._defaultApi.getSessions(await this._initRequestInit());
  }
  async createDemoAccount() {
    return this._demoBrokerApi.createDemoAccount(await this._initRequestInit());
  }
  async getDemoAccounts() {
    return this._demoBrokerApi.getDemoAccounts(await this._initRequestInit());
  }
  async deleteDemoAccount(del: DeleteDemoAccountRequest) {
    return this._demoBrokerApi.deleteDemoAccount(
      del,
      await this._initRequestInit()
    );
  }
  async getOrder(o: GetOrderRequest) {
    return this._defaultApi.getOrder(o);
  }
  createWebSocketClient() {
    return new BrokerizeWebSocketClient(
      "https://api-preview.brokerize.com/websocket",
      this._auth
    );
  }
  destroy() {
    this._isDestroyed = true;
    this._abortController.abort();
  }
}
