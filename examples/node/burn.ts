import { Xcrow } from '../../packages/node/src';
import { signTransaction } from './utils/signTransaction';
import * as dotenv from 'dotenv';
dotenv.config();

async function burnExample() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
  });

  // First create a deposit to have something to burn
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

  // Wait 10 seconds to ensure the vault is ready
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Now burn the vault
  const burn = await xcrow.burn({
    vaultId: deposit.vaultId,
    network: 'devnet',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
  });

  const burnSignedTransaction = await signTransaction(
    burn.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  await xcrow.execute({
    vaultId: deposit.vaultId,
    transactionId: burn.transactionId,
    signedTransaction: burnSignedTransaction,
  });

  console.log('Burn completed successfully');
}

burnExample();
