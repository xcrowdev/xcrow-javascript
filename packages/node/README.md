<p align="center">
  <a href="https://xcrow.dev" target="_blank">
    <img src="../../docs/logo.webp" alt="Xcrow" width="280" height="200">
  </a>
</p>

## Official Xcrow SDK for Node
_Helping developers securely escrow funds on Solana through a simple, secure, and reliable interface._

## Installing

```bash
npm install @xcrow/node

# Or yarn
yarn add @xcrow/node
```

## Usage

# Deposit

```js
import { Xcrow } from '@xcrow/node';

// Create a xcrow instace
const xcrow = new Xcrow({
  apiKey: process.env.API_KEY,
  applicationId: process.env.APPLICATION_ID,
});

// Call a function to deposit
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

# Withdraw

```js
import { Xcrow } from '@xcrow/node';

// Create a xcrow instace
const xcrow = new Xcrow({
  apiKey: process.env.API_KEY,
  applicationId: process.env.APPLICATION_ID,
});

// the Vault Id received from the deposit
const vaultId = 'VAULT_ID';

// Call a function to withdraw
const withdraw = await xcrow.withdraw({
  vaultId,
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

# Withdraw

| Error Class                | Description          |
|----------------------------|----------------------|
| InsufficientFundsError     | Insufficient funds   |
| TokenNotFoundError         | Token not found      |
| TransactionExpiredError    | Transaction expired  |
| UnknownError               | Unknown error        |