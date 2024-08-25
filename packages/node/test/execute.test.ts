import { Xcrow } from '../src';
import { ExecuteInput } from '../src/contracts';
import {
  InsufficientFundsError,
  TransactionExpiredError,
  UnknownError,
} from '../src/errors';

const axiosPostRequestMock = jest.fn();

jest.mock('axios', () => ({
  create: () => ({
    post: axiosPostRequestMock,
  }),
}));

describe('Execute Xcrow', () => {
  let xcrow: Xcrow;

  beforeEach(() => {
    xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
  });

  it('Should execute transaction successfully', async () => {
    const mockResponse = {
      data: {
        tx_hash: 'txhash',
      },
    };
    axiosPostRequestMock.mockResolvedValue(mockResponse);

    const input: ExecuteInput = {
      vaultId: 'vault_1',
      transactionId: '123',
      signedTransaction: 'signed_tx',
    };

    const result = await xcrow.execute(input);
    expect(result).toEqual({ txHash: mockResponse.data.tx_hash });
    expect(axiosPostRequestMock).toHaveBeenCalledWith(
      `/vault/${input.vaultId}/transactions`,
      expect.any(Object),
    );
  });

  it('Should throw InsufficientFundsError if insufficient funds', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'Insufficient funds' },
      },
    });

    const input: ExecuteInput = {
      vaultId: 'vault_1',
      transactionId: '123',
      signedTransaction: 'signed_tx',
    };

    await expect(xcrow.execute(input)).rejects.toThrow(InsufficientFundsError);
  });

  it('Should throw TransactionExpiredError if transaction expired', async () => {
    axiosPostRequestMock.mockRejectedValue({
      response: {
        data: { message: 'Transaction expired' },
      },
    });

    const input: ExecuteInput = {
      vaultId: 'vault_1',
      transactionId: '123',
      signedTransaction: 'signed_tx',
    };

    await expect(xcrow.execute(input)).rejects.toThrow(TransactionExpiredError);
  });

  it('Should throw UnknownError for other errors', async () => {
    axiosPostRequestMock.mockRejectedValue(new Error('Unknown error'));

    const input: ExecuteInput = {
      vaultId: 'vault_1',
      transactionId: '123',
      signedTransaction: 'signed_tx',
    };

    await expect(xcrow.execute(input)).rejects.toThrow(UnknownError);
  });
});
