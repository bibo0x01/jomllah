import { z } from 'zod';
export declare const startChatSchema: z.ZodObject<{
    tenantId: z.ZodString;
    productId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const sendMessageSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=chat.validation.d.ts.map