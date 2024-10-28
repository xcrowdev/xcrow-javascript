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

export class FeeHigherThanMaxPriorityFeeError extends Error {
  constructor() {
    super('Fee higher than max priority fee');
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Unknown error');
  }
}

export class ValidationError extends Error {
  constructor(errors: any) {
    super();
    this.name = 'ValidationError';
    this.message = errors
      .map((error: any) => {
        const path = error.path.join('.');
        return `Error in "${path}": ${error.message}`;
      })
      .join('\n');
  }
}
