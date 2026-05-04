import { Request, Response, NextFunction } from 'express';
import { OrdersService } from './orders.service.js';

import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED']),
});

export class OrdersController {
  private ordersService = new OrdersService();

  getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.ordersService.getMyOrders(
        req.user!.userId,
        req.user!.role,
        req.user!.tenantId
      );
      res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const { status } = updateStatusSchema.parse(req.body);
      
      const order = await this.ordersService.updateOrderStatus(
        req.user!.userId,
        req.user!.tenantId,
        orderId,
        status as any
      );
      res.status(200).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  };
}
