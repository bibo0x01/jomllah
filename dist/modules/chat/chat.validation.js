import { z } from 'zod';
export const startChatSchema = z.object({
    tenantId: z.string().uuid(),
    productId: z.string().uuid().optional(), // Metadata
});
export const sendMessageSchema = z.object({
    content: z.string().min(1),
});
//# sourceMappingURL=chat.validation.js.map