import {
  DepositInput,
  DepositOutput,
  ExecuteInput,
  ExecuteOutput,
  WithdrawInput,
  WithdrawOutput,
  XcrowInput,
} from './contracts';
import axios, { AxiosInstance } from 'axios';

export class Xcrow {
  private api: AxiosInstance;

  constructor(input: XcrowInput) {
    this.api = axios.create({
      baseURL: 'https://dev.api.xcrow.dev/v1',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': input.apiKey,
        'x-application-id': input.applicationId,
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
        vaultId: input.vaultId,
        network: input.network,
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
    } catch (e) {
      console.log(e);
      throw new Error('Failed to deposit');
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
        network: input.network,
      });

      return {
        transactionId: response.data.transaction_id,
        vaultId: response.data.vault_id,
        serializedTransaction: response.data.serialized_transaction,
        expiresIn: response.data.expires_in,
      };
    } catch (e) {
      console.log(e);
      throw new Error('Failed to deposit');
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

      return response.data;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to execute transactions');
    }
  }
}
