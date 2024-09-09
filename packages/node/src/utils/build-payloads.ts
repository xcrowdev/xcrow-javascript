import {
  CreateVaultInput,
  DepositInput,
  RefundInput,
  WithdrawInput,
} from '../contracts';

export function buildDepositRequestPayload(input: DepositInput) {
  return {
    payer: input.payer,
    strategy: input.strategy,
    priority_fee_level: input.priorityFeeLevel,
    priority_fee: input.priorityFee,
    tokens: [
      {
        mint_address: input.token.mintAddress,
        amount: input.token.amount,
        decimals: input.token.decimals,
        symbol: input.token.symbol,
        name: input.token.name,
        logo_uri: input.token.logoUri,
      },
    ],
    vault_id: input.vaultId,
    network: input.network ?? 'mainnet',
    transfer_fee: input.transferFee?.map((fee) => ({
      signer: fee.signer,
      receiver: fee.receiver,
      mint_address: fee.mintAddress,
      amount: fee.amount,
    })),
  };
}

export function buildDepositResponsePayload(response: any) {
  return {
    transactionId: response.data.transaction_id,
    vaultId: response.data.vault_id,
    serializedTransaction: response.data.serialized_transaction,
    expiresIn: response.data.expires_in,
    asset: {
      token: response.data.asset.token,
      amount: response.data.asset.amount,
      decimals: response.data.asset.decimals,
      symbol: response.data.asset.symbol,
      name: response.data.asset.name,
      logoUri: response.data.asset.logo_uri,
    },
  };
}

export function buildWithdrawRequestPayload(input: WithdrawInput) {
  return {
    payer: input.payer,
    strategy: input.strategy,
    priority_fee_level: input.priorityFeeLevel,
    priority_fee: input.priorityFee,
    tokens: [
      {
        mint_address: input.token.mintAddress,
        amount: input.token.amount,
        decimals: input.token.decimals,
        symbol: input.token.symbol,
        name: input.token.name,
        logo_uri: input.token.logoUri,
      },
    ],
    vault_id: input.vaultId,
    network: input.network ?? 'mainnet',
    transfer_fee: input.transferFee?.map((fee) => ({
      signer: fee.signer,
      receiver: fee.receiver,
      mint_address: fee.mintAddress,
      amount: fee.amount,
    })),
  };
}

export function buildWithdrawResponsePayload(response: any) {
  return {
    transactionId: response.data.transaction_id,
    vaultId: response.data.vault_id,
    serializedTransaction: response.data.serialized_transaction,
    expiresIn: response.data.expires_in,
  };
}

export function refundRequestPayload(input: RefundInput) {
  return {
    strategy: input.strategy,
    priority_fee_level: input.priorityFeeLevel,
    priority_fee: input.priorityFee,
    vault_id: input.vaultId,
    network: input.network ?? 'mainnet',
  };
}

export function refundResponsePayload(response: any) {
  return {
    transactionId: response.data.transaction_id,
    vaultId: response.data.vault_id,
    serializedTransaction: response.data.serialized_transaction,
    expiresIn: response.data.expires_in,
  };
}

export function createVaultRequestPayload(input: CreateVaultInput) {
  return {
    payer: input.payer,
    network: input.network,
    tokens: [
      {
        mint_address: input.token.mintAddress,
      },
    ],
    strategy: input.strategy,
    priority_fee_level: input.priorityFeeLevel,
    priority_fee: input.priorityFee,
  };
}

export function createVaultResponsePayload(response: any) {
  return {
    vaultId: response.data.vault_id,
    transactionId: response.data.transaction_id,
    serializedTransaction: response.data.serialized_transaction,
    expiresIn: response.data.expires_in,
    asset: {
      token: response.data.asset.token,
      amount: response.data.asset.amount,
      decimals: response.data.asset.decimals,
      symbol: response.data.asset.symbol,
      name: response.data.asset.name,
      logoUri: response.data.asset.logo_uri,
    },
    tokenAccount: response.data.tokenAccount,
  };
}

export function getVaultDetailsResponsePayload(response: any) {
  return {
    id: response.data.id,
    status: response.data.status,
    signer: response.data.signer,
    createdAt: response.data.created_at,
    asset: {
      id: response.data.assets[0].id,
      token: response.data.assets[0].token,
      amount: response.data.assets[0].amount,
      amountParsed:
        response.data.assets[0].amount /
        Math.pow(10, response.data.assets[0].decimals),
      decimals: response.data.assets[0].decimals,
      symbol: response.data.assets[0].symbol,
      name: response.data.assets[0].name,
      logoUri: response.data.assets[0].logo_uri,
      createdAt: response.data.assets[0].created_at,
    },
  };
}
