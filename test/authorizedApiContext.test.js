import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { AuthorizedApiContext } from "../dist/authorizedApiContext.js";

const cfg = {
  clientId: "test-client",
  basePath: "https://example.invalid",
  fetch: async () => {
    throw new Error("no requests expected in these tests");
  },
  createAbortController: () => new AbortController(),
};

const auth = { getToken: async () => ({ idToken: "token" }) };

/** The parts of BrokerizeWebSocketClientImpl that a context interacts with. */
function createFakeWsClient() {
  let apiCtx = null;
  return {
    _setAuthorizedApiContext: (ctx) => {
      apiCtx = ctx;
    },
    _getAuthorizedApiContext: () => apiCtx,
  };
}

describe("AuthorizedApiContext websocket binding", () => {
  it("keeps the first context attached when child contexts are created", () => {
    const wsClient = createFakeWsClient();
    const root = new AuthorizedApiContext(cfg, auth, wsClient);
    assert.equal(wsClient._getAuthorizedApiContext(), root);

    const child = root.createChildContext();
    assert.equal(
      wsClient._getAuthorizedApiContext(),
      root,
      "a child must not take the binding away from the context that owns the client",
    );

    /* ... and destroying the child must not leave a destroyed context behind. */
    child.destroy();
    assert.equal(wsClient._getAuthorizedApiContext(), root);
  });

  it("detaches a destroyed context so that a later one can take over", () => {
    const wsClient = createFakeWsClient();
    const first = new AuthorizedApiContext(cfg, auth, wsClient);
    first.destroy();
    assert.equal(wsClient._getAuthorizedApiContext(), null);

    const second = new AuthorizedApiContext(cfg, auth, wsClient);
    assert.equal(wsClient._getAuthorizedApiContext(), second);
  });

  it("works with a websocket client that does not support the binding", () => {
    const wsClient = {};
    const ctx = new AuthorizedApiContext(cfg, auth, wsClient);
    ctx.createChildContext().destroy();
    ctx.destroy();
  });
});
