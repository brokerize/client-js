import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  BrokerizeError,
  createErrorFromResponse,
  createTokenRefreshError,
  isRateLimitError,
  parseRetryAfter,
} from "../dist/errors.js";

/** A minimal stand-in for the fetch Response parts the error helpers read. */
function createResponse(status, body, headers = {}) {
  return {
    status,
    headers: new Headers(headers),
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  };
}

const RATE_LIMIT_BODY = { code: "RATE_LIMITED", msg: "Rate-Limit exceeded" };

describe("parseRetryAfter", () => {
  it("reads the fractional seconds the API sends", () => {
    assert.equal(parseRetryAfter("5.683"), 5683);
    assert.equal(parseRetryAfter("0"), 0);
    assert.equal(parseRetryAfter(" 12 "), 12000);
  });

  it("reads an absolute date, as a proxy may send it", () => {
    const inTenSeconds = new Date(Date.now() + 10000).toUTCString();
    const parsed = parseRetryAfter(inTenSeconds);
    assert.ok(
      parsed >= 9000 && parsed <= 10000,
      `expected about 10s, got ${parsed}`,
    );
  });

  it("never reports a negative delay", () => {
    assert.equal(parseRetryAfter("-5"), undefined);
    assert.equal(
      parseRetryAfter(new Date(Date.now() - 60000).toUTCString()),
      0,
    );
  });

  it("returns undefined when the header is absent or unusable", () => {
    assert.equal(parseRetryAfter(null), undefined);
    assert.equal(parseRetryAfter(undefined), undefined);
    assert.equal(parseRetryAfter(""), undefined);
    assert.equal(parseRetryAfter("soon"), undefined);
    assert.equal(parseRetryAfter("Infinity"), undefined);
  });
});

describe("createErrorFromResponse", () => {
  it("carries Retry-After over to the error", async () => {
    const err = await createErrorFromResponse(
      createResponse(429, RATE_LIMIT_BODY, { "Retry-After": "5.683" }),
    );
    assert.equal(err.httpStatusCode, 429);
    assert.equal(err.code, "RATE_LIMITED");
    assert.equal(err.retryAfterMs, 5683);
  });

  it("leaves retryAfterMs unset when the server announces no wait time", async () => {
    const err = await createErrorFromResponse(
      createResponse(429, RATE_LIMIT_BODY),
    );
    assert.equal(err.code, "RATE_LIMITED");
    assert.equal(err.retryAfterMs, undefined);
  });

  it("still works when the body is not an ErrorResponse", async () => {
    const err = await createErrorFromResponse(
      createResponse(429, "<html>Too Many Requests</html>", {
        "Retry-After": "2",
      }),
    );
    assert.equal(err.httpStatusCode, 429);
    assert.equal(err.retryAfterMs, 2000);
    assert.ok(isRateLimitError(err), "a 429 is a rate limit whatever the body");
  });
});

describe("isRateLimitError", () => {
  it("recognises a rate limit by code and by status", () => {
    assert.ok(isRateLimitError(new BrokerizeError(429, RATE_LIMIT_BODY)));
    assert.ok(
      isRateLimitError(
        new BrokerizeError(429, { code: "INTERNAL_SERVER_ERROR", msg: "x" }),
      ),
    );
  });

  it("does not match other errors", () => {
    assert.equal(
      isRateLimitError(new BrokerizeError(401, { code: "AUTH", msg: "x" })),
      false,
    );
    assert.equal(isRateLimitError(new Error("boom")), false);
    assert.equal(isRateLimitError(undefined), false);
  });
});

describe("createTokenRefreshError", () => {
  it("keeps a rate limit distinguishable instead of flattening it to AUTH", async () => {
    const err = await createTokenRefreshError(
      createResponse(429, RATE_LIMIT_BODY, { "Retry-After": "3" }),
    );
    assert.equal(err.httpStatusCode, 429);
    assert.equal(err.code, "RATE_LIMITED");
    assert.equal(err.retryAfterMs, 3000);
  });

  it("passes a server error through", async () => {
    const err = await createTokenRefreshError(
      createResponse(503, { code: "MAINTENANCE", msg: "Maintenance" }),
    );
    assert.equal(err.httpStatusCode, 503);
    assert.equal(err.code, "MAINTENANCE");
  });

  it("reports a rejected token as AUTH, so callers log the user in again", async () => {
    for (const status of [401, 403]) {
      const err = await createTokenRefreshError(
        createResponse(status, { code: "AUTH", msg: "Invalid refresh token" }),
      );
      assert.equal(err.httpStatusCode, 401);
      assert.equal(err.code, "AUTH");
    }
  });
});
