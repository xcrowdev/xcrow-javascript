import { Xcrow } from '../../packages/node/src';
import { signTransaction } from './utils/signTransaction';
import * as dotenv from 'dotenv';
dotenv.config();

async function refundExample() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
  });

  const deposit = await xcrow.deposit({
    payer: 'FRyeXUJWxCnBLcrdgfP1KzsCCmPWRxDmEMM31zno3LtV',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
    token: {
      mintAddress: 'So11111111111111111111111111111111111111112',
      amount: 0.01,
    },
    network: 'devnet',
  });

  const signedTransaction = await signTransaction(
    deposit.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  await xcrow.execute({
    vaultId: deposit.vaultId,
    transactionId: deposit.transactionId,
    signedTransaction,
  });

  // Wait 10 second to ensure the vault is ready
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const refund = await xcrow.refund({
    vaultId: deposit.vaultId,
    network: 'devnet',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
  });

  const refundSignedTransaction = await signTransaction(
    refund.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  await xcrow.execute({
    vaultId: deposit.vaultId,
    transactionId: refund.transactionId,
    signedTransaction: refundSignedTransaction,
  });
}

refundExample();
