# client-js

The official `brokerize` JavaScript client (currently work in progress). The main goal here is to have an API client that comes with TypeScript types so that auto-complete for JS code as well as proper types for TypeScript clients are available. Most of the heavy lifting is in the internal generated code.

Example usage:
```javascript
import { Brokerize, BrokerName } from '@brokerize/client'

async function someBrokerizeActions() {
  const brokerize = new Brokerize({
    /* provide implementations of fetch, AbortController and WebSocket that will
       be used for interacting with the API. */
    fetch: ((url, init) => {
      return fetch(url, init)
    }) as any,
    createAbortController: () => new AbortController(),
    createWebSocket: (url, protocol) => new WebSocket(url, protocol)
  })

  /* create a guest user */
  const user = await brokerize.createGuestUser()

  /* with the guest user's token, create an authorized context.*/
  const ctx = brokerize.createAuthorizedContext({
    type: 'guest',
    idToken: user.idToken
  })

  /* do some API calls */
  console.log('BROKERS', await ctx.getBrokers())
  console.log('EXCHANGES', await ctx.getExchanges())
  const { id } = await ctx.createDemoAccount()
  const demoAccounts = await ctx.getDemoAccounts()
  const demoAccount = demoAccounts.accounts.find(x => x.accountId == id)

  const session = await ctx.addSession({
    brokerName: BrokerName.Demo,
    env: 'test',
    password: '42',
    username: demoAccount.accountName
  })

  /* subscribe to some non-existent decoupled operation */
  const client = ctx.createWebSocketClient()
  const s = client.subscribeDecoupledOperation({
    decoupledOperationId: 'X',
    sessionId: 'XXXX'
  }, (err, data) => {
    console.log('SUBSCR')
  })
  s.unsubscribe();
  console.log('SESSION', session)
}
someBrokerizeActions().then(console.log, console.error)
```

# development
The code in `src/swagger` is generated by the npm script `npm run generate` from the OpenAPI spec and will be regenerated whenever API changes are made, so there should not be any manual changes. `npm run download-spec` will download the current spec from `api-preview.brokerize.com`.

The code in `src/webSocketTypes.ts` is a copy from the backend `webSocketTypes.ts` and must be kept in sync manually for the time being.

# working with registered brokerize users
brokerize uses `AWS Cognito` for user authentication. If clients want brokerize users to log in with their brokerize credentials, they can use the libraries provided by AWS to do so. If you use our component-based solution `@brokerize/elements`, a wrapper is provided there.

`createAuthorizedContext` needs to be provided with an implementation of `cognitoAuth`, which only needs to be able to request the current idToken.

```typescript
const ctx = brokerize.createAuthorizedContext({
    type: 'registered',
    ... 
  }, {
    cognitoAuth: {
      createSession(cognitoPoolConfig, authCfg) {
        return {
          async getToken() {
            /* TODO: here, request idToken from the AWS Cognito service for the
               given cognitoPoolConfig + authCfg */
            return {
              idToken
            }
          }
        };
      }
    }
  })
```
