export type WebSocketCommand =
  | WebSocketCommandAuthorize
  | WebSocketCommandPing
  | WebSocketCommandSubscribe
  | WebSocketCommandUnsubscribe;

type WebSocketCommandAuthorize = {
  cmd: "authorize";
  idToken: string;
};

type WebSocketCommandPing = {
  cmd: "ping";
};

export type WebSocketCommandUnsubscribe = {
  cmd: "unsubscribe";
  subscriptionId: number;
};

export type WebSocketCommandSubscribe =
  | (InvalidateBase & SubscribeInvalidateDetails)
  | SubscribeDecoupledOperation;

type InvalidateBase = {
  cmd: "subscribe";
  type: "invalidate";
  subscriptionId: number;
};

export type SubscribeInvalidateDetails =
  | SubscribeSessions
  | SubscribePositions
  | SubscribeOrders;

type SubscribeSessions = {
  entity: "sessions";
};
type SubscribePositions = {
  entity: "positions";
  portfolioId: string;
};
type SubscribeOrders = {
  entity: "orders";
  portfolioId: string;
};

export type SubscribeDecoupledOperation = {
  cmd: "subscribe";
  type: "decoupledOperationStatus";
  subscriptionId: number;
  sessionId: string;
  decoupledOperationId: string;
};

export type WebSocketMessage =
  | WebSocketSubscriptionMessage
  | WebSocketError
  | WebSocketAuthenticatedMessage;

export type WebSocketSubscriptionMessage =
  | WebSocketMessageErrorOnSubscription
  | WebSocketSubscriptionSuccessfulMessage;

export type WebSocketSubscriptionSuccessfulMessage =
  | InvalidateMessage
  | UpdateDecoupledOperationMessage;

export type WebSocketAuthenticatedMessage = {
  cmd: "authenticated";
};

export type WebSocketMessageErrorOnSubscription = {
  subscriptionId: number;
  error: BrokerizeWebSocketError;
};

export type InvalidateMessage = {
  cmd: "invalidate";
  subscriptionId: number;
};

export type UpdateDecoupledOperationMessage = {
  cmd: "updateDecoupledOperationStatus";
  subscriptionId: number;
  status: DecoupledOperationStatus;
};

export type BrokerizeWebSocketError = {
  message: string;
};

export type WebSocketError = {
  error: BrokerizeWebSocketError;
};

export type DecoupledOperationState =
  | "AUTHORIZATION_ABORTED"
  | "AUTHORIZATION_INITIAL"
  | "AUTHORIZATION_USER_ACCEPTED"
  | "AUTHORIZATION_USER_CANCELED";

export type DecoupledOperationStatus = {
  text?: string;
  state: DecoupledOperationState;
  /**
   * If:
   * - the decoupled operation is an order creation
   * - *AND* it is in the state `AUTHORIZATION_USER_ACCEPTED`
   * - *AND* the broker supports retrieving this information
   *
   * This is the id of the created order. Note that depending on the broker, it is possible
   * (as with non-decoupled order creations as well), that the broker does not return this id, but
   * instead will add the order to the order book asynchronously. In this case it is not possible to directly
   * show an order receipt, but just a message (e.g. "Order has been created successfully - check order list for updates").
   */
  createdOrderId?: string;
};
