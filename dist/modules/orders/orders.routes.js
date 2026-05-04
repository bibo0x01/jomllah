import { Router } from 'express';
import { OrdersController } from './orders.controller.js';
import { requireAuth, requireRoles } from '../../shared/middlewares/auth.js';
const router = Router();
const ordersController = new OrdersController();
router.get('/', requireAuth, ordersController.getMyOrders);
router.patch('/:orderId/status', requireAuth, requireRoles(['SUPPLIER_OWNER', 'SUPPLIER_STAFF']), ordersController.updateStatus);
export { router as orderRoutes };
//# sourceMappingURL=orders.routes.js.map