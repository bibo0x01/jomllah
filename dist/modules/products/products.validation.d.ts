import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    category: z.ZodString;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
//# sourceMappingURL=products.validation.d.ts.map