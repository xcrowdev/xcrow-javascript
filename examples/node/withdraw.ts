import { Xcrow } from '../../packages/node/src';
import { signTransaction } from './utils/signTransaction';
import * as dotenv from 'dotenv';
dotenv.config();

async function withdrawExample() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
  });

  const vaultId = '6f214e64-5beb-43b8-a823-e586e6bf46ee';

  const withdraw = await xcrow.withdraw({
    vaultId,
    payer: 'FRyeXUJWxCnBLcrdgfP1KzsCCmPWRxDmEMM31zno3LtV',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
    token: {
      mintAddress: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
      amount: 0.01,
      logoUri: 'https://wormhole.com/token.png',
      symbol: 'W',
      decimals: 6,
      name: 'Wormhole Token',
    },
  });

  const signedTransaction = await signTransaction(
    withdraw.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  await xcrow.execute({
    vaultId,
    transactionId: withdraw.transactionId,
    signedTransaction,
  });
}

withdrawExample();
