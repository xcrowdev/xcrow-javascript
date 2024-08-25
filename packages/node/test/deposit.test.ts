import { MissingApiKeyError, MissingApplicationIdError, Xcrow } from '../src';
import { DepositInput } from '../src/contracts';
import { TokenNotFoundError, UnknownError } from '../src/errors';

const axiosPostRequestMock = jest.fn();

jest.mock('axios', () => ({
  create: () => ({
    post: axiosPostRequestMock,
  }),
}));

describe('Deposit Xcrow', () => {
  let xcrow: Xcrow;

  beforeEach(() => {
    xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
  });

  it('Should deposit funds successfully', async () => {
    const mockResponse = {
      data: {
        transaction_id: '123',
        vault_id: 'vault_1',
        serialized_transaction: 'serialized_tx',
        expires_in: 3600,
        asset: {
          token: 'token',
          amount: 100,
          decimals: 2,
          symbol: 'TKN',
          name: 'Test Token',
          logo_uri: 'http://example.com/logo.png',
        },
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: DepositInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Medium',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'mainnet',
    };

    const result = await xcrow.deposit(input);
    expect(result).toEqual({
      transactionId: '123',
      vaultId: 'vault_1',
      serializedTransaction: 'serialized_tx',
      expiresIn: 3600,
      asset: {
        token: 'token',
        amount: 100,
        decimals: 2,
        symbol: 'TKN',
        name: 'Test Token',
        logoUri: 'http://example.com/logo.png',
      },
    });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      '/transactions/deposit',
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

    const input: DepositInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.deposit(input)).rejects.toThrow(MissingApiKeyError);
  });

  it('Should throw MissingApplicationIdError if not pass the application id', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'x-application-id missing in header' },
        status: 403,
      },
    });

    const input: DepositInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.deposit(input)).rejects.toThrow(
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

    const input: DepositInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'devnet',
    };

    await expect(xcrow.deposit(input)).rejects.toThrow(TokenNotFoundError);
  });

  it('Should throw UnknownError for other errors', async () => {
    axiosPostRequestMock.mockRejectedValue(new Error('Unknown error'));

    const input: DepositInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Low',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'mainnet',
    };

    await expect(xcrow.deposit(input)).rejects.toThrow(UnknownError);
  });
});
