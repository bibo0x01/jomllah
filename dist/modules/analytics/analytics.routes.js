import { Router } from 'express';
import { AnalyticsController } from './analytics.controller.js';
import { requireAuth, requireRoles, requireTenant } from '../../shared/middlewares/auth.js';
const router = Router();
const analyticsController = new AnalyticsController();
router.get('/me', requireAuth, requireRoles(['SUPPLIER_OWNER', 'SUPPLIER_STAFF']), requireTenant, analyticsController.getMyMetrics);
export { router as analyticsRoutes };
//# sourceMappingURL=analytics.routes.js.map