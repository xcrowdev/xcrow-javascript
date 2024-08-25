import {
  InsufficientFundsError,
  MissingApiKeyError,
  MissingApplicationIdError,
  TokenNotFoundError,
  TransactionExpiredError,
  UnknownError,
} from '../errors';

export function parseError(error: any) {
  if (!error.response) throw new UnknownError();

  const errorMessage = error?.response?.data?.message;

  if (errorMessage === 'Token not found') {
    throw new TokenNotFoundError();
  } else if (errorMessage === 'Insufficient funds') {
    throw new InsufficientFundsError();
  } else if (errorMessage === 'Transaction expired') {
    throw new TransactionExpiredError();
  } else if (errorMessage === 'x-api-key missing in header') {
    throw new MissingApiKeyError();
  } else if (errorMessage === 'x-application-id missing in header') {
    throw new MissingApplicationIdError();
  }

  throw new UnknownError();
}
