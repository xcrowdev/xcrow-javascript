export interface XcrowInput {
  apiKey: string;
  applicationId: string;
}

type PriorityFeeLevel = 'Low' | 'Medium' | 'High' | 'VeryHigh' | 'UnsafeMax';
type strategy = 'blockhash' | 'durable_nonce';
type network = 'mainnet' | 'devnet';

interface Token {
  mintAddress: string;
  amount: number;
}

export interface DepositInput {
  payer: string;
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  token: Token;
  vaultId?: string;
  network?: network;
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
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  token: Token;
  vaultId: string;
  network?: network;
}

export interface WithdrawOutput {
  transactionId: string;
  vaultId: string;
  serializedTransaction: string;
  expiresIn: string;
}

export interface RefundInput {
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  vaultId: string;
  network?: network;
}

export interface RefundOutput {
  transactionId: string;
  vaultId: string;
  serializedTransaction: string;
  expiresIn: string;
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
