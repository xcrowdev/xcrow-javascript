import { Xcrow } from '../src';
import { WithdrawInput } from '../src/contracts';
import { TokenNotFoundError, UnknownError } from '../src/errors';

const axiosPostRequestMock = jest.fn();

jest.mock('axios', () => ({
  create: () => ({
    post: axiosPostRequestMock,
  }),
}));

describe('Withdraw Xcrow', () => {
  let xcrow: Xcrow;

  beforeEach(() => {
    xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
  });

  it('Should withdraw funds successfully', async () => {
    const mockResponse = {
      data: {
        transaction_id: '123',
        vault_id: 'vault_1',
        serialized_transaction: 'serialized_tx',
        expires_in: 3600,
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: WithdrawInput = {
      payer: 'payer',
      strategy: 'blockhash',
      priorityFeeLevel: 'Medium',
      priorityFee: 10,
      token: {
        mintAddress: 'mintAddress',
        amount: 100,
      },
      vaultId: 'vault_1',
      network: 'devnet',
    };

    const result = await xcrow.withdraw(input);
    expect(result).toEqual({
      transactionId: '123',
      vaultId: 'vault_1',
      serializedTransaction: 'serialized_tx',
      expiresIn: 3600,
    });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      '/transactions/withdraw',
      expect.any(Object),
    );
  });

  it('Should throw TokenNotFoundError if token not found', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'Token not found' },
        status: 404,
      },
    });

    const input: WithdrawInput = {
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

    await expect(xcrow.withdraw(input)).rejects.toThrow(TokenNotFoundError);
  });

  it('Should throw UnknownError for other errors', async () => {
    axiosPostRequestMock.mockRejectedValue(new Error('Unknown error'));

    const input: WithdrawInput = {
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

    await expect(xcrow.withdraw(input)).rejects.toThrow(UnknownError);
  });
});
