import { Xcrow } from '../../packages/node/src';
import { signTransaction } from './utils/signTransaction';
import * as dotenv from 'dotenv';
dotenv.config();

async function createVaultWithTransferFeeExample() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
    environment: 'test',
  });

  // Create vault with transfer fee
  const createVault = await xcrow.createVault({
    payer: 'FRyeXUJWxCnBLcrdgfP1KzsCCmPWRxDmEMM31zno3LtV',
    strategy: 'blockhash',
    priorityFeeLevel: 'Medium',
    token: {
      mintAddress: 'So11111111111111111111111111111111111111112', // SOL
    },
    network: 'devnet',
    transferFee: [
      {
        signer: 'FRyeXUJWxCnBLcrdgfP1KzsCCmPWRxDmEMM31zno3LtV', // Vault creator
        receiver: 'Hd1wAVXrpvpTjbK5KMYS5ZXBKAzBpST7HAQXtXXtUATj', // Fee recipient
        mintAddress: 'So11111111111111111111111111111111111111112', // SOL
        amount: 1000000, // 0.001 SOL (1000000 lamports)
        decimals: 9,
      },
    ],
  });

  console.log('Vault created with transfer fee:', {
    vaultId: createVault.vaultId,
    transactionId: createVault.transactionId,
  });

  // Sign and execute the transaction
  const signedTransaction = await signTransaction(
    createVault.serializedTransaction,
    process.env.PRIVATE_KEY,
  );

  const executeResult = await xcrow.execute({
    vaultId: createVault.vaultId,
    transactionId: createVault.transactionId,
    signedTransaction,
  });

  console.log('Vault creation executed:', executeResult);
}

createVaultWithTransferFeeExample();
