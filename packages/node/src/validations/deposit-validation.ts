import { z } from 'zod';

const Strategy = z.enum(['blockhash', 'durable_nonce']);
const PriorityFeeLevel = z.enum([
  'Low',
  'Medium',
  'High',
  'Medium',
  'VeryHigh',
  'UnsafeMax',
]);
const Network = z.enum(['mainnet', 'devnet']);

const TransferFee = z.object({
  signer: z.string().min(1, 'Signer is required'),
  receiver: z.string().min(1, 'Receiver is required'),
  mintAddress: z.string().min(1, 'Mint address is required'),
  amount: z.number().positive('Amount must be positive'),
});

const defaultTokenAddresses = [
  'F7Hwf8ib5DVCoiuyGr618Y3gon429Rnd1r5F9R5upump',
  'So11111111111111111111111111111111111111112',
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a',
  'SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa',
];

const DepositToken = z
  .object({
    mintAddress: z.string().min(1, 'Mint address is required'),
    amount: z.number().positive('Amount must be positive'),
    decimals: z
      .number()
      .int()
      .nonnegative('Decimals must be non-negative')
      .optional(),
    symbol: z.string().min(1, 'Symbol is required').optional(),
    name: z.string().min(1, 'Name is required').optional(),
    logoUri: z.string().url('Logo URI must be a valid URL').optional(),
  })
  .refine(
    (data) => {
      const isDefaultToken = defaultTokenAddresses.includes(data.mintAddress);
      if (isDefaultToken) {
        return true;
      }
      return (
        data.decimals !== undefined && data.symbol && data.name && data.logoUri
      );
    },
    {
      message: 'Required fields are missing for non-default tokens',
      path: ['decimals', 'symbol', 'name', 'logoUri'],
    },
  );

export const DepositSchema = z.object({
  payer: z.string().min(1, 'Payer is required'),
  strategy: Strategy.optional(),
  priorityFeeLevel: PriorityFeeLevel.optional(),
  priorityFee: z.number().positive('Priority fee must be positive').optional(),
  token: DepositToken,
  vaultId: z.string().optional(),
  network: Network.optional(),
  transferFee: z.array(TransferFee).optional(),
});
