import { z } from 'zod';
export declare const createOfferSchema: z.ZodObject<{
    chatRoomId: z.ZodString;
    receiverId: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export declare const counterOfferSchema: z.ZodObject<{
    price: z.ZodNumber;
    quantity: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=offers.validation.d.ts.map