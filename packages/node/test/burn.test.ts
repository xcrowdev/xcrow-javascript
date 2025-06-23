import { Xcrow } from '../src';
import { BurnInput } from '../src/contracts';
import {
  MissingApiKeyError,
  MissingApplicationIdError,
  InsufficientFundsError,
  UnknownError,
} from '../src/errors';

const axiosPostRequestMock = jest.fn();
jest.mock('axios', () => ({
  create: () => ({
    post: axiosPostRequestMock,
  }),
}));

describe('Burn Xcrow', () => {
  let xcrow: Xcrow;

  beforeEach(() => {
    xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
  });

  it('Should burn successfully', async () => {
    const mockResponse = {
      data: {
        transaction_id: '123',
        vault_id: 'vault_1',
        serialized_transaction: 'serialized_tx',
        expires_in: '3600',
        fees: {
          transaction_fee: 5000,
        },
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: BurnInput = {
      strategy: 'blockhash',
      priorityFeeLevel: 'Medium',
      priorityFee: 10,
      vaultId: 'vault_1',
      network: 'mainnet',
    };

    const result = await xcrow.burn(input);
    expect(result).toEqual({
      transactionId: '123',
      vaultId: 'vault_1',
      serializedTransaction: 'serialized_tx',
      expiresIn: '3600',
      fees: {
        priorityFee: null,
        transactionFee: 0.000005,
      },
    });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      '/burn',
      expect.any(Object),
    );
  });

  it('Should throw MissingApiKeyError if not pass the api key', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'x-api-key missing in header' },
        status: 403,
      },
    });

    const input: BurnInput = {
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.burn(input)).rejects.toThrow(MissingApiKeyError);
  });

  it('Should throw MissingApplicationIdError if not pass the application id', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'x-application-id missing in header' },
        status: 403,
      },
    });

    const input: BurnInput = {
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.burn(input)).rejects.toThrow(MissingApplicationIdError);
  });

  it('Should throw InsufficientFundsError if insufficient funds', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'Insufficient funds' },
      },
    });

    const input: BurnInput = {
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.burn(input)).rejects.toThrow(InsufficientFundsError);
  });

  it('Should throw UnknownError for other errors', async () => {
    axiosPostRequestMock.mockRejectedValue(new Error('Unknown error'));

    const input: BurnInput = {
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      vaultId: 'vault_1',
      network: 'mainnet',
    };

    await expect(xcrow.burn(input)).rejects.toThrow(UnknownError);
  });
});
