import { Router } from 'express';
import { TenantsController } from './tenants.controller.js';
import { requireAuth, requireRoles, requireTenant } from '../../shared/middlewares/auth.js';

const router = Router();
const tenantsController = new TenantsController();

// Tenant Owner Routes
router.get(
  '/me', 
  requireAuth, 
  requireRoles(['SUPPLIER_OWNER', 'SUPPLIER_STAFF']), 
  requireTenant, 
  tenantsController.getProfile
);

router.patch(
  '/me', 
  requireAuth, 
  requireRoles(['SUPPLIER_OWNER']), 
  requireTenant, 
  tenantsController.updateProfile
);

// Admin Routes
router.post(
  '/:tenantId/verify',
  requireAuth,
  requireRoles(['ADMIN']),
  tenantsController.verifyTenant
);

export { router as tenantRoutes };
