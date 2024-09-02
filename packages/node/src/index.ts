import {
  CreateVaultInput,
  CreateVaultOutput,
  DepositInput,
  DepositOutput,
  ExecuteInput,
  ExecuteOutput,
  GetVaultDetailsOutput,
  RefundInput,
  RefundOutput,
  WithdrawInput,
  WithdrawOutput,
  XcrowInput,
} from './contracts';
import axios, { AxiosInstance } from 'axios';
import { parseError } from './utils/parse-error';
export * from './contracts';
export * from './errors';

export class Xcrow {
  private api: AxiosInstance;

  constructor({
    apiKey,
    applicationId,
    environment = 'production',
  }: XcrowInput) {
    this.api = axios.create({
      baseURL:
        environment === 'production'
          ? 'https://api.xcrow.dev/v1'
          : 'https://test.api.xcrow.dev/v1',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-application-id': applicationId,
      },
    });
  }

  async deposit(input: DepositInput): Promise<DepositOutput> {
    try {
      const response = await this.api.post('/transactions/deposit', {
        payer: input.payer,
        strategy: input.strategy,
        priority_fee_level: input.priorityFeeLevel,
        priority_fee: input.priorityFee,
        tokens: [
          {
            mint_address: input.token.mintAddress,
            amount: input.token.amount,
          },
        ],
        vault_id: input.vaultId,
        network: input.network ?? 'mainnet',
      });

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
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async withdraw(input: WithdrawInput): Promise<WithdrawOutput> {
    try {
      const response = await this.api.post('/transactions/withdraw', {
        payer: input.payer,
        strategy: input.strategy,
        priority_fee_level: input.priorityFeeLevel,
        priority_fee: input.priorityFee,
        tokens: [
          {
            mint_address: input.token.mintAddress,
            amount: input.token.amount,
          },
        ],
        vault_id: input.vaultId,
        network: input.network ?? 'mainnet',
      });

      return {
        transactionId: response.data.transaction_id,
        vaultId: response.data.vault_id,
        serializedTransaction: response.data.serialized_transaction,
        expiresIn: response.data.expires_in,
      };
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async refund(input: RefundInput): Promise<RefundOutput> {
    try {
      const response = await this.api.post('/transactions/refund', {
        strategy: input.strategy,
        priority_fee_level: input.priorityFeeLevel,
        priority_fee: input.priorityFee,
        vault_id: input.vaultId,
        network: input.network ?? 'mainnet',
      });

      return {
        transactionId: response.data.transaction_id,
        vaultId: response.data.vault_id,
        serializedTransaction: response.data.serialized_transaction,
        expiresIn: response.data.expires_in,
      };
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async createVault(input: CreateVaultInput): Promise<CreateVaultOutput> {
    try {
      const response = await this.api.post(`/vault`, {
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
      });

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
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async execute(input: ExecuteInput): Promise<ExecuteOutput> {
    try {
      const response = await this.api.post(
        `/vault/${input.vaultId}/transactions`,
        {
          transaction_id: input.transactionId,
          serialized_transaction: input.signedTransaction,
        },
      );

      return {
        txHash: response.data.tx_hash,
      };
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async getVaultDetails(vaultId: string): Promise<GetVaultDetailsOutput> {
    try {
      const response = await this.api.get(`/vault/${vaultId}`);

      return {
        id: response.data.id,
        status: response.data.status,
        signer: response.data.signer,
        createdAt: response.data.created_at,
        asset: {
          id: response.data.assets[0].id,
          token: response.data.assets[0].token,
          amount: response.data.assets[0].amount,
          decimals: response.data.assets[0].decimals,
          symbol: response.data.assets[0].symbol,
          name: response.data.assets[0].name,
          logoUri: response.data.assets[0].logo_uri,
          createdAt: response.data.assets[0].created_at,
        },
      };
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }
}
