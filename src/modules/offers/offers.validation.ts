import { z } from 'zod';

export const createOfferSchema = z.object({
  chatRoomId: z.string().uuid(),
  receiverId: z.string().uuid(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const counterOfferSchema = z.object({
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});
