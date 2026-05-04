import { Request, Response, NextFunction } from 'express';
export declare class OrdersController {
    private ordersService;
    getMyOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=orders.controller.d.ts.map