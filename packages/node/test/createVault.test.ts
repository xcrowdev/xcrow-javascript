import { Xcrow } from '../src';
import { CreateVaultInput } from '../src/contracts';
import {
  MissingApiKeyError,
  MissingApplicationIdError,
  TokenNotFoundError,
  UnknownError,
} from '../src/errors';

const axiosPostRequestMock = jest.fn();
jest.mock('axios', () => ({
  create: () => ({
    post: axiosPostRequestMock,
  }),
}));

describe('CreateVault Xcrow', () => {
  let xcrow: Xcrow;

  beforeEach(() => {
    xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
  });

  it('Should create vault successfully', async () => {
    const mockResponse = {
      data: {
        vault_id: 'vault_1',
        transaction_id: '123',
        serialized_transaction: 'serialized_tx',
        expires_in: '3600',
        asset: {
          token: 'token',
          amount: 0,
          decimals: 9,
          symbol: 'SOL',
          name: 'Solana',
          logo_uri: 'http://example.com/logo.png',
        },
        token_account: 'token_account_address',
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Medium',
      priorityFee: 10,
      token: {
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      network: 'mainnet',
    };

    const result = await xcrow.createVault(input);
    expect(result).toEqual({
      vaultId: 'vault_1',
      transactionId: '123',
      serializedTransaction: 'serialized_tx',
      expiresIn: '3600',
      asset: {
        token: 'token',
        amount: 0,
        decimals: 9,
        symbol: 'SOL',
        name: 'Solana',
        logoUri: 'http://example.com/logo.png',
      },
      tokenAccount: 'token_account_address',
    });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      '/vault',
      expect.any(Object),
    );
  });

  it('Should create vault with transfer fee successfully', async () => {
    const mockResponse = {
      data: {
        vault_id: 'vault_1',
        transaction_id: '123',
        serialized_transaction: 'serialized_tx',
        expires_in: '3600',
        asset: {
          token: 'token',
          amount: 0,
          decimals: 9,
          symbol: 'SOL',
          name: 'Solana',
          logo_uri: 'http://example.com/logo.png',
        },
        token_account: 'token_account_address',
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Medium',
      priorityFee: 10,
      token: {
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      network: 'mainnet',
      transferFee: [
        {
          signer: 'signer1',
          receiver: 'receiver1',
          mintAddress: 'So11111111111111111111111111111111111111112',
          amount: 1000,
          decimals: 9,
        },
      ],
    };

    const result = await xcrow.createVault(input);
    expect(result).toEqual({
      vaultId: 'vault_1',
      transactionId: '123',
      serializedTransaction: 'serialized_tx',
      expiresIn: '3600',
      asset: {
        token: 'token',
        amount: 0,
        decimals: 9,
        symbol: 'SOL',
        name: 'Solana',
        logoUri: 'http://example.com/logo.png',
      },
      tokenAccount: 'token_account_address',
    });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      '/vault',
      expect.objectContaining({
        transfer_fee: [
          {
            signer: 'signer1',
            receiver: 'receiver1',
            mint_address: 'So11111111111111111111111111111111111111112',
            amount: 1000,
            decimals: 9,
          },
        ],
      }),
    );
  });

  it('Should throw MissingApiKeyError if not pass the api key', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'x-api-key missing in header' },
        status: 403,
      },
    });

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      network: 'devnet',
    };

    await expect(xcrow.createVault(input)).rejects.toThrow(MissingApiKeyError);
  });

  it('Should throw MissingApplicationIdError if not pass the application id', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'x-application-id missing in header' },
        status: 403,
      },
    });

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      network: 'devnet',
    };

    await expect(xcrow.createVault(input)).rejects.toThrow(
      MissingApplicationIdError,
    );
  });

  it('Should throw TokenNotFoundError if token not found', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'Token not found' },
        status: 404,
      },
    });

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'unknown_token',
      },
      network: 'devnet',
    };

    await expect(xcrow.createVault(input)).rejects.toThrow(TokenNotFoundError);
  });

  it('Should throw UnknownError for other errors', async () => {
    axiosPostRequestMock.mockRejectedValue(new Error('Unknown error'));

    const input: CreateVaultInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      network: 'mainnet',
    };

    await expect(xcrow.createVault(input)).rejects.toThrow(UnknownError);
  });
});
