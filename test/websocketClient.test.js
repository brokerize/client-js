import assert from "node:assert/strict";
import { after, describe, it } from "node:test";

import { BrokerizeWebSocketClientImpl } from "../dist/websocketClient.js";
import {
  BrokerizeWebSocketError,
  isBrokerizeWebSocketError,
} from "../dist/errors.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The backoff of the client retries after ~100-1100ms on the first error and after ~1-2s
 * afterwards, so waiting this long is enough to observe a reconnect.
 */
const RECONNECT_WAIT = 2500;

class FakeSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 0;
    this.sent = [];
  }
  send(data) {
    this.sent.push(JSON.parse(data));
  }
  close() {
    this.readyState = 3;
  }

  /* test helpers */
  open() {
    this.readyState = 1;
    this.onopen?.({});
  }
  receive(obj) {
    this.onmessage?.({ data: JSON.stringify(obj) });
  }
  receiveRaw(data) {
    this.onmessage?.({ data });
  }
  fail(ev) {
    this.onerror?.(ev || { type: "error" });
  }
  serverClose() {
    this.readyState = 3;
    this.onclose?.({});
  }
  get subscriptionId() {
    return this.sent.find((m) => m.cmd == "subscribe")?.subscriptionId;
  }
}

const createdClients = [];

/**
 * Every client gets its own socket list so that a client that is still reconnecting from an
 * earlier test cannot interfere.
 */
function createClient(auth) {
  const sockets = [];
  const client = new BrokerizeWebSocketClientImpl(
    "wss://example.invalid/websocket",
    auth || { getToken: async () => ({ idToken: "token" }) },
    (url) => {
      const socket = new FakeSocket(url);
      sockets.push(socket);
      return socket;
    },
  );
  createdClients.push(client);
  return { client, sockets, last: () => sockets[sockets.length - 1] };
}

/** Open the connection and let the server confirm the authorization. */
async function authenticate(socket) {
  socket.open();
  await sleep(5);
  socket.receive({ cmd: "authenticated" });
}

/** Open the connection and let `getToken()` settle, without the server confirming it. */
async function openOnly(socket) {
  socket.open();
  await sleep(5);
}

after(() => createdClients.forEach((c) => c.destroy()));

describe("BrokerizeWebSocketClient error handling", () => {
  it("reports an error on a subscription as a terminal BrokerizeWebSocketError", async () => {
    const { client, sockets } = createClient();
    const seen = [];
    client.subscribeInvalidate({ entity: "sessions" }, (err, data) =>
      seen.push({ err, data }),
    );
    await authenticate(sockets[0]);
    sockets[0].receive({
      subscriptionId: sockets[0].subscriptionId,
      error: { message: "no access to portfolio" },
    });

    const err = seen[0].err;
    assert.ok(err instanceof Error);
    assert.ok(isBrokerizeWebSocketError(err));
    assert.equal(err.message, "no access to portfolio");
    assert.equal(err.code, "WEBSOCKET_ERROR");
    assert.equal(err.terminal, true);
    assert.ok(err.stack);
  });

  it("retries a rejected token once with a forced refresh before giving up", async () => {
    const tokenCalls = [];
    const { client, sockets, last } = createClient({
      getToken: async (opts) => {
        tokenCalls.push(opts);
        return { idToken: "token" };
      },
    });
    const errors = [];
    client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      if (err) errors.push(err);
    });
    await authenticate(sockets[0]);

    sockets[0].receive({ error: { message: "authentication failed" } });
    await sleep(10);
    assert.deepEqual(
      errors,
      [],
      "the first rejection must not reach subscribers",
    );
    assert.equal(client.getConnectionState().status, "reconnecting");

    await sleep(RECONNECT_WAIT);
    assert.ok(sockets.length >= 2, "it must connect again on its own");
    await openOnly(last());
    assert.ok(
      tokenCalls.some((opts) => opts?.forceRefresh === true),
      "the retry must ask for a fresh token",
    );

    last().receive({ error: { message: "authentication failed" } });
    await sleep(10);
    assert.equal(
      errors.length,
      1,
      "the second rejection terminates subscriptions",
    );
    assert.ok(isBrokerizeWebSocketError(errors[0]));
    assert.equal(errors[0].code, "AUTH");
    assert.equal(errors[0].httpStatusCode, 401);
    assert.equal(errors[0].terminal, true);
    assert.equal(client.getConnectionState().status, "fatal");
    assert.equal(client.getConnectionState().error, errors[0]);
  });

  it("restores the retry budget after a successful authentication", async () => {
    const { client, sockets, last } = createClient();
    const errors = [];
    client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      if (err) errors.push(err);
    });
    await authenticate(sockets[0]);

    /* the token expired mid-session */
    sockets[0].receive({ error: { message: "authentication failed" } });
    await sleep(RECONNECT_WAIT);
    await authenticate(last());
    assert.deepEqual(errors, [], "recovering must not terminate subscriptions");
    assert.equal(client.getConnectionState().status, "open");

    /* ... and if it happens again later, it is retried again rather than being fatal */
    last().receive({ error: { message: "authentication failed" } });
    await sleep(10);
    assert.equal(client.getConnectionState().status, "reconnecting");
  });

  it("revives a client with a fatal error via reconnect()", async () => {
    const { client, sockets, last } = createClient();
    const errors = [];
    client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      if (err) errors.push(err);
    });
    await authenticate(sockets[0]);
    sockets[0].receive({ error: { message: "authentication failed" } });
    await sleep(RECONNECT_WAIT);
    await openOnly(last());
    last().receive({ error: { message: "authentication failed" } });
    await sleep(10);
    assert.equal(client.getConnectionState().status, "fatal");

    const socketsBefore = sockets.length;
    client.reconnect();
    const errorsAfterReconnect = [];
    client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      if (err) errorsAfterReconnect.push(err);
    });
    await sleep(RECONNECT_WAIT);
    assert.ok(sockets.length > socketsBefore);
    await authenticate(last());
    assert.equal(client.getConnectionState().status, "open");
    assert.equal(
      errors.length,
      1,
      "terminated subscribers must not be called again",
    );
    assert.deepEqual(errorsAfterReconnect, []);
  });

  it("reports the fatal error asynchronously when subscribing on a dead client", async () => {
    const { client, sockets, last } = createClient();
    client.subscribeInvalidate({ entity: "sessions" }, () => {});
    await authenticate(sockets[0]);
    sockets[0].receive({ error: { message: "authentication failed" } });
    await sleep(RECONNECT_WAIT);
    await openOnly(last());
    last().receive({ error: { message: "authentication failed" } });
    await sleep(10);

    let subscription = null;
    let calledBeforeReturn = false;
    let seen = null;
    subscription = client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      if (subscription === null) calledBeforeReturn = true;
      seen = err;
    });
    assert.equal(
      calledBeforeReturn,
      false,
      "the caller must hold the Subscription before the callback runs",
    );
    assert.equal(typeof subscription.unsubscribe, "function");
    await sleep(5);
    assert.ok(isBrokerizeWebSocketError(seen));
    assert.equal(seen.code, "AUTH");
  });

  it("keeps notifying the other subscribers when one callback throws", async () => {
    const { client, sockets } = createClient();
    let reached = false;
    client.subscribeInvalidate({ entity: "sessions" }, () => {
      throw new Error("boom from a subscriber");
    });
    client.subscribeInvalidate({ entity: "sessions" }, () => {
      reached = true;
    });
    await authenticate(sockets[0]);
    sockets[0].receive({
      cmd: "invalidate",
      subscriptionId: sockets[0].subscriptionId,
    });
    assert.ok(reached);
  });

  it("does not throw out of the message handler on an unparsable message", async () => {
    const { client, sockets } = createClient();
    const states = [];
    client.subscribeConnectionState((s) => states.push(s));
    client.subscribeInvalidate({ entity: "sessions" }, () => {});
    await authenticate(sockets[0]);

    assert.doesNotThrow(() =>
      sockets[0].receiveRaw("<html>502 Bad Gateway</html>"),
    );
    assert.equal(
      states[states.length - 1].error?.code,
      "WEBSOCKET_PROTOCOL_ERROR",
    );
  });

  it("closes and retries instead of hanging when getToken() rejects", async () => {
    let calls = 0;
    const { client, sockets, last } = createClient({
      getToken: async () => {
        calls++;
        if (calls == 1) {
          throw new BrokerizeWebSocketError({
            msg: "refresh token expired",
            code: "AUTH",
          });
        }
        return { idToken: "token" };
      },
    });
    const states = [];
    client.subscribeConnectionState((s) => states.push(s));
    client.subscribeInvalidate({ entity: "sessions" }, () => {});
    sockets[0].open();
    await sleep(20);
    assert.equal(states[states.length - 1].error?.code, "AUTH");

    await sleep(RECONNECT_WAIT);
    assert.ok(
      sockets.length >= 2,
      "it must not stay on the unauthenticated socket",
    );
    await authenticate(last());
    assert.equal(client.getConnectionState().status, "open");
  });

  it("counts a failed connection attempt once for the backoff", async () => {
    const { client, sockets } = createClient();
    client.subscribeInvalidate({ entity: "sessions" }, () => {});
    await sleep(5);
    const states = [];
    client.subscribeConnectionState((s) => states.push(s));

    /* both an error and a close event for a single failed attempt */
    sockets[0].fail();
    sockets[0].serverClose();
    await sleep(10);

    const state = states[states.length - 1];
    assert.equal(state.status, "reconnecting");
    assert.ok(state.error instanceof Error);
    assert.equal(state.error.code, "WEBSOCKET_CONNECTION_FAILED");
    assert.equal(client._errorCount, 1);
  });

  it("does not let the close event of an outdated socket drop the new connection", async () => {
    const { client, sockets, last } = createClient();
    client.subscribeInvalidate({ entity: "sessions" }, () => {});
    await sleep(5);
    const first = sockets[0];
    await authenticate(first);
    assert.equal(client.getConnectionState().status, "open");

    client.reconnect();
    await sleep(5);
    const second = last();
    assert.notEqual(second, first);

    first.onclose?.({}); /* the late close event of the replaced socket */
    await authenticate(second);
    assert.equal(client.getConnectionState().status, "open");
  });

  it("stops reconnecting when destroyed", async () => {
    const { client, sockets } = createClient();
    const subscription = client.subscribeInvalidate(
      { entity: "sessions" },
      () => {},
    );
    await authenticate(sockets[0]);

    client.destroy();
    assert.equal(sockets[0].readyState, 3);
    const socketsBefore = sockets.length;
    await sleep(RECONNECT_WAIT);
    assert.equal(sockets.length, socketsBefore);
    assert.equal(client.getConnectionState().status, "closed");

    let seen = null;
    client.subscribeInvalidate({ entity: "sessions" }, (err) => {
      seen = err;
    });
    await sleep(5);
    assert.ok(isBrokerizeWebSocketError(seen));
    assert.equal(seen.terminal, true);
    assert.doesNotThrow(() => subscription.unsubscribe());
  });
});
