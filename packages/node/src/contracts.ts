export interface XcrowInput {
  apiKey: string;
  applicationId: string;
}

interface Token {
  mintAddress: string;
  amount: number;
}

export interface DepositInput {
  payer: string;
  strategy?: 'blockhash' | 'durable_nonce';
  priorityFeeLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  priorityFee?: string;
  token: Token;
  vaultId?: string;
  network?: 'mainnet' | 'devnet';
}

export interface DepositOutput {
  transactionId: string;
  vaultId: string;
  serializedTransaction: string;
  expiresIn: string;
  asset: {
    token: string;
    amount: number;
    decimals: number;
    symbol: string;
    name: string;
    logoUri: string;
  };
}

export interface WithdrawInput {
  payer: string;
  strategy?: 'blockhash' | 'durable_nonce';
  priorityFeeLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  priorityFee?: string;
  token: Token;
  vaultId: string;
  network?: 'mainnet' | 'devnet';
}

export interface WithdrawOutput {
  transactionId: string;
  vaultId: string;
  serializedTransaction: string;
  expiresIn: string;
}

export interface ExecuteInput {
  vaultId: string;
  transactionId: string;
  signedTransaction: string;
}

export interface ExecuteOutput {
  txHash: string;
}
