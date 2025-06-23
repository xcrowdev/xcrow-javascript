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

export const BurnSchema = z.object({
  strategy: Strategy.optional(),
  priorityFeeLevel: PriorityFeeLevel.optional(),
  priorityFee: z.number().positive('Priority fee must be positive').optional(),
  maxPriorityFee: z
    .number()
    .positive('Maximum fee must be positive')
    .optional(),
  vaultId: z.string().min(1, 'Vault ID is required'),
  network: Network.optional(),
});
