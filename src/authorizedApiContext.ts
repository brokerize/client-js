import { Auth, BrokerizeConfig, createConfiguration } from "./apiCtx";
import * as openApiClient from "./swagger";
import {
  AddSessionParams,
  ConfirmOAuthParams,
  CreateTradeChallengeRequest,
  CreateTradeRequest,
  DeleteDemoAccountRequest,
  GetCostEstimationParams,
  GetQuoteParams,
  GetQuoteRequest,
  PrepareOAuthRedirectParams,
  PrepareTradeRequest,
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
  private _metaApi: openApiClient.MetaApi;
  private _brokerLoginApi: openApiClient.BrokerLoginApi;
  private _cancelOrderApi: openApiClient.CancelOrderApi;
  private _changeOrderApi: openApiClient.ChangeOrderApi;
  constructor(cfg: BrokerizeConfig, auth: Auth) {
    this._cfg = cfg;
    this._auth = auth;

    const apiConfig = createConfiguration(cfg);
    this._defaultApi = new openApiClient.DefaultApi(apiConfig);
    this._demoBrokerApi = new openApiClient.DemobrokerApi(
      apiConfig
    );
    this._tradeApi = new openApiClient.TradeApi(apiConfig);
    this._metaApi = new openApiClient.MetaApi(apiConfig);
    this._brokerLoginApi = new openApiClient.BrokerLoginApi(apiConfig);
    this._cancelOrderApi = new openApiClient.CancelOrderApi(apiConfig);
    this._changeOrderApi = new openApiClient.ChangeOrderApi(apiConfig);
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
        'x-brkrz-client-id': this._cfg.clientId, 
        "x-access-token": tok.idToken,
        "Content-Type": "application/json",
      },
    };
  }
  async getBrokers() {


    return this._metaApi.getBrokers(await this._initRequestInit());
  }
  async getExchanges() {
    return this._metaApi.getExchanges(await this._initRequestInit());
  }
  async addSession(params: AddSessionParams) {
    return this._brokerLoginApi.addSession(
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
    return this._cancelOrderApi.createCancelOrderChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async cancelOrder(req: openApiClient.CancelOrderRequest) {
    return this._cancelOrderApi.cancelOrder(req, await this._initRequestInit());
  }
  async createChangeOrderChallenge(
    req: openApiClient.CreateChangeOrderChallengeRequest
  ) {
    return this._changeOrderApi.createChangeOrderChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async changeOrder(req: openApiClient.ChangeOrderRequest) {
    return this._changeOrderApi.changeOrder(req, await this._initRequestInit());
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
    return this._brokerLoginApi.addSessionCompleteChallenge(
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
  // XXX improve "kind" enum
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
  async triggerDemoSessionSyncError(sessionId: string) {
    return this._demoBrokerApi.triggerDemoSessionSyncError(
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
  async prepareTrade(req: PrepareTradeRequest) {
    return this._tradeApi.prepareTrade(req, await this._initRequestInit());
  }
  async createTrade(req: CreateTradeRequest) {
    return this._tradeApi.createTrade(req, await this._initRequestInit());
  }
  async createTradeChallenge(req: CreateTradeChallengeRequest) {
    return this._tradeApi.createTradeChallenge(
      req,
      await this._initRequestInit()
    );
  }
  async getCostEstimation(p: GetCostEstimationParams) {
    return this._tradeApi.getCostEstimation(
      {
        getCostEstimationParams: p,
      },
      await this._initRequestInit()
    );
  }
  async getQuote(p: GetQuoteRequest) {
    return this._tradeApi.getQuote(p, await this._initRequestInit());
  }
  async prepareOAuthRedirect(p: PrepareOAuthRedirectParams) {
    return this._brokerLoginApi.prepareOAuthRedirect(
      { prepareOAuthRedirectParams: p },
      await this._initRequestInit()
    );
  }
  async confirmOAuth(p: ConfirmOAuthParams) {
    return this._brokerLoginApi.confirmOAuth(
      { confirmOAuthParams: p },
      await this._initRequestInit()
    );
  }

  createWebSocketClient() {
    const basePath = this._cfg.basePath || "https://api-preview.brokerize.com";
    const websocketPath =
      (basePath.startsWith("https")
        ? "wss://" + basePath.substring(8)
        : "ws://" + basePath.substring(7)) + "/websocket";
    return new BrokerizeWebSocketClient(websocketPath, this._auth);
  }
  destroy() {
    this._isDestroyed = true;
    this._abortController.abort();
  }
}
