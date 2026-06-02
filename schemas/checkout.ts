import z from 'zod';

export const stripePriceIdSchema = z.object({
  stripePriceId: z.string(),
});
