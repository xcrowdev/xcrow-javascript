export class InsufficientFundsError extends Error {
  constructor() {
    super('Insufficient funds');
  }
}

export class TokenNotFoundError extends Error {
  constructor() {
    super('Token not found');
  }
}

export class TransactionExpiredError extends Error {
  constructor() {
    super('Transaction expired');
  }
}

export class MissingApiKeyError extends Error {
  constructor() {
    super('Missing API key');
  }
}

export class MissingApplicationIdError extends Error {
  constructor() {
    super('Missing application ID');
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Unknown error');
  }
}
