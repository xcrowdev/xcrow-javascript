import { Xcrow } from '../../packages/node/src';
import { signTransaction } from './utils/signTransaction';
import * as dotenv from 'dotenv';
import * as solanaWeb3 from '@solana/web3.js';
import bs58 from 'bs58';
dotenv.config();

async function multiplesDeposit() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
  });

  const init = await xcrow.createVault({
    payer: 'FRyeXUJWxCnBLcrdgfP1KzsCCmPWRxDmEMM31zno3LtV',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
    token: {
      mintAddress: 'So11111111111111111111111111111111111111112',
    },
    network: 'devnet',
  });

  const signedTransaction = await signTransaction(
    init.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  await xcrow.execute({
    vaultId: init.vaultId,
    transactionId: init.transactionId,
    signedTransaction,
  });

  const deposit = await xcrow.deposit({
    payer: 'Hd1wAVXrpvpTjbK5KMYS5ZXBKAzBpST7HAQXtXXtUATj',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
    vaultId: init.vaultId,
    token: {
      mintAddress: 'So11111111111111111111111111111111111111112',
      amount: 0.01,
    },
    network: 'devnet',
  });

  const serializedTransactionDeposit =
    solanaWeb3.VersionedTransaction.deserialize(
      Buffer.from(deposit.serializedTransaction, 'base64'),
    );
  serializedTransactionDeposit.sign([
    solanaWeb3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY)), // private key of the vault creator
  ]);

  const ser = Buffer.from(serializedTransactionDeposit.serialize()).toString(
    'base64',
  );

  const signedTransaction2 = await signTransaction(
    ser,
    process.env.PRIVATE_KEY2, // wallet sign of the deposit, simulating wallet sign
  );

  await xcrow.execute({
    vaultId: deposit.vaultId,
    transactionId: deposit.transactionId,
    signedTransaction: signedTransaction2,
  });
}

multiplesDeposit();
