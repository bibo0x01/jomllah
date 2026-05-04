import { z } from 'zod';
export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(['BUYER', 'SUPPLIER_OWNER']),
    // If role is SUPPLIER_OWNER, require businessName and category
    businessName: z.string().optional(),
    category: z.string().optional(),
}).refine(data => {
    if (data.role === 'SUPPLIER_OWNER') {
        return !!data.businessName && !!data.category;
    }
    return true;
}, {
    message: "businessName and category are required for SUPPLIER_OWNER",
    path: ['businessName'],
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
//# sourceMappingURL=auth.validation.js.map