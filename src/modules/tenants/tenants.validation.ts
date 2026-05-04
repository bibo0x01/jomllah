import { z } from 'zod';

export const updateTenantSchema = z.object({
  businessName: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
});
