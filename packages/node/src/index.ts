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
import {
  buildDepositRequestPayload,
  buildDepositResponsePayload,
  buildWithdrawRequestPayload,
  buildWithdrawResponsePayload,
  createVaultRequestPayload,
  createVaultResponsePayload,
  getVaultDetailsResponsePayload,
  refundRequestPayload,
  refundResponsePayload,
} from './utils/build-payloads';
import { DepositSchema } from './validations/deposit-validation';
import { ValidationError } from './errors';
import { WithdrawSchema } from './validations/withdraw-validation';
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
    const result = DepositSchema.safeParse(input);
    if (!result.success) {
      throw new ValidationError(result.error.errors);
    }

    try {
      const response = await this.api.post(
        '/transactions/deposit',
        buildDepositRequestPayload(input),
      );

      return buildDepositResponsePayload(response);
    } catch (e: any) {
      console.log(e);
      parseError(e);
      throw new Error(e);
    }
  }

  async withdraw(input: WithdrawInput): Promise<WithdrawOutput> {
    const result = WithdrawSchema.safeParse(input);
    if (!result.success) {
      throw new ValidationError(result.error.errors);
    }

    try {
      const response = await this.api.post(
        '/transactions/withdraw',
        buildWithdrawRequestPayload(input),
      );

      return buildWithdrawResponsePayload(response);
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async refund(input: RefundInput): Promise<RefundOutput> {
    try {
      const response = await this.api.post(
        '/transactions/refund',
        refundRequestPayload(input),
      );

      return refundResponsePayload(response);
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }

  async createVault(input: CreateVaultInput): Promise<CreateVaultOutput> {
    try {
      const response = await this.api.post(
        `/vault`,
        createVaultRequestPayload(input),
      );

      return createVaultResponsePayload(response);
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

      return getVaultDetailsResponsePayload(response);
    } catch (e: any) {
      parseError(e);
      throw new Error(e);
    }
  }
}
