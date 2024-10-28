export interface XcrowInput {
  apiKey: string;
  applicationId: string;
  environment?: 'production' | 'test';
}

type PriorityFeeLevel = 'Low' | 'Medium' | 'High' | 'VeryHigh' | 'UnsafeMax';
type strategy = 'blockhash' | 'durable_nonce';
type network = 'mainnet' | 'devnet';

interface Token {
  mintAddress: string;
  amount: number;
  decimals?: number;
  symbol?: string;
  name?: string;
  logoUri?: string;
}

export interface DepositInput {
  payer: string;
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  maxPriorityFee?: number;
  token: Token;
  vaultId?: string;
  network?: network;
  transferFee?: {
    signer: string;
    receiver: string;
    mintAddress: string;
    amount: number;
    decimals: number;
  }[];
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
  tokenAccount: string;
}

export interface WithdrawInput {
  payer: string;
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  maxPriorityFee?: number;
  token: Token;
  vaultId: string;
  network?: network;
  transferFee?: {
    signer: string;
    receiver: string;
    mintAddress: string;
    amount: number;
    decimals: number;
  }[];
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
  maxPriorityFee?: number;
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

export interface CreateVaultInput {
  payer: string;
  strategy?: strategy;
  priorityFeeLevel?: PriorityFeeLevel;
  priorityFee?: number;
  maxPriorityFee?: number;
  token: {
    mintAddress: string;
  };
  network: string;
}

export interface CreateVaultOutput {
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
  tokenAccount: string;
}

export interface GetVaultDetailsOutput {
  id: string;
  status: string;
  signer: string;
  createdAt: string;
  asset: {
    id: string;
    token: string;
    amount: number;
    amountParsed: number;
    decimals: number;
    symbol: string;
    name: string;
    logoUri: string;
    createdAt: string;
  };
}
