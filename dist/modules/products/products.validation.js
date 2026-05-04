import { z } from 'zod';
export const createProductSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    category: z.string().min(2),
    images: z.array(z.string().url()).optional(),
    isActive: z.boolean().optional(),
});
export const updateProductSchema = createProductSchema.partial();
//# sourceMappingURL=products.validation.js.map