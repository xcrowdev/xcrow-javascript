<p align="center">
  <a href="https://xcrow.dev" target="_blank">
    <img src="https://xcrow-media.s3.amazonaws.com/logo_black.webp" alt="Xcrow" width="280" height="200">
  </a>
</p>

_Helping developers securely escrow funds on Solana through a simple, secure, and reliable interface._

## NPM Libaries

There is a npm library that can be used to interact with xcrow for each platform.

- [`@xcrowdev/node`](https://github.com/xcrowdev/xcrow-javascript/tree/main/packages/node): Node SDK

## Installing

### Package manager

Using npm:

```bash
$ npm install @xcrowdev/node
```

Using bower:

```bash
$ bower install @xcrowdev/node
```

Using yarn:

```bash
$ yarn add @xcrowdev/node
```

Using pnpm:

```bash
$ pnpm add @xcrowdev/node
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { Xcrow } from '@xcrowdev/node';
```

If you use `require` for importing

```js
const { Xcrow } = require('@xcrowdev/node');
```


## Example

```js
import { Xcrow } from '@xcrowdev/node';

// Create a xcrow instace
const xcrow = new Xcrow({
  apiKey: process.env.API_KEY,
  applicationId: process.env.APPLICATION_ID,
});

// Call a function to deposit or withdraw funds
const deposit = await xcrow.deposit({
  payer: 'PUBLIC ADDRESS',
  strategy: 'blockhash',
  priorityFeeLevel: 'Medium',
  token: {
    mintAddress: 'So11111111111111111111111111111111111111112',
    amount: 0.01,
  },
  network: 'mainnet',
});

// Sign the transaction, this action can be made by wallet like phantom or solflare
const signedTransaction = await signTransaction(
  deposit.serializedTransaction,
);


// Finally execute the transaction
await xcrow.execute({
  vaultId: deposit.vaultId,
  transactionId: deposit.transactionId,
  signedTransaction,
});
```