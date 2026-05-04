import { z } from 'zod';
export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    avatarUrl: z.string().url().optional(),
});
//# sourceMappingURL=users.validation.js.map