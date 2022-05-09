import { Auth, BrokerizeConfig, createConfiguration } from "./apiCtx";
import * as openApiClient from "./swagger";
import { AddSessionParams, DeleteDemoAccountRequest } from "./swagger";
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
  async getOrder(orderId: string) {
    return this._defaultApi.getOrder(
      { id: orderId },
      await this._initRequestInit()
    );
  }
  async createCancelOrderChallenge(
    req: openApiClient.CreateCancelOrderChallengeRequest
  ) {
    return this._defaultApi.createCancelOrderChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async cancelOrder(req: openApiClient.CancelOrderRequest) {
    return this._defaultApi.cancelOrder(req, await this._initRequestInit());
  }
  async createChangeOrderChallenge(
    req: openApiClient.CreateChangeOrderChallengeRequest
  ) {
    return this._defaultApi.createChangeOrderChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async changeOrder(req: openApiClient.ChangeOrderRequest) {
    return this._defaultApi.changeOrder(req, await this._initRequestInit());
  }
  async getPortfolios() {
    return this._defaultApi.getPortfolios(await this._initRequestInit());
  }
  async deletePortfolio(portfolioId: string) {
    return this._defaultApi.deletePortfolio(
      { portfolioId },
      await this._initRequestInit()
    );
  }
  async getPortfolioQuotes(portfolioId: string) {
    return this._defaultApi.getPortfolioQuotes(
      { portfolioId },
      await this._initRequestInit()
    );
  }
  async getPortfolioPositions(portfolioId: string) {
    return this._defaultApi.getPortfolioPositions(
      { portfolioId },
      await this._initRequestInit()
    );
  }
  async getPortfolioOrders(req: openApiClient.GetPortfolioOrdersRequest) {
    return this._defaultApi.getPortfolioOrders(
      req,
      await this._initRequestInit()
    );
  }
  async getAuthInfo(portfolioId: string) {
    return this._defaultApi.getAuthInfo(
      { portfolioId },
      await this._initRequestInit()
    );
  }
  async addSessionCompleteChallenge(
    req: openApiClient.AddSessionCompleteChallengeRequest
  ) {
    return this._defaultApi.addSessionCompleteChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async createSessionTanChallenge(
    req: openApiClient.CreateSessionTanChallengeRequest
  ) {
    return this._defaultApi.createSessionTanChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async enableSessionTan(req: openApiClient.EnableSessionTanRequest) {
    return this._defaultApi.enableSessionTan(
      req,
      await this._initRequestInit()
    );
  }

  async endSessionTan(sessionId: string) {
    return this._defaultApi.endSessionTan(
      { sessionId },
      await this._initRequestInit()
    );
  }
  async getDecoupledOperationStatus(
    req: openApiClient.GetDecoupledOperationStatusRequest
  ) {
    return this._defaultApi.getDecoupledOperationStatus(
      req,
      await this._initRequestInit()
    );
  }
  async cancelDecoupledOperation(
    req: openApiClient.CancelDecoupledOperationRequest
  ) {
    return this._defaultApi.cancelDecoupledOperation(
      req,
      await this._initRequestInit()
    );
  }
  async triggerSessionSync(sessionId: string) {
    return this._defaultApi.triggerSessionSync(
      { sessionId },
      await this._initRequestInit()
    );
  }
  async logoutSession(sessionId: string) {
    return this._defaultApi.logoutSession(
      { sessionId },
      await this._initRequestInit()
    );
  }
  async getUser() {
    return this._defaultApi.getUser(await this._initRequestInit());
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
