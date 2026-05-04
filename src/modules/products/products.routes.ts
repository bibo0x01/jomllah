import { Router } from 'express';
import { ProductsController } from './products.controller.js';
import { requireAuth, requireRoles, requireTenant } from '../../shared/middlewares/auth.js';

const router = Router();
const productsController = new ProductsController();

// Public Routes (or logged in Buyer routes)
router.get('/', requireAuth, productsController.searchProducts);
router.get('/:id', requireAuth, productsController.getProduct);

// Supplier/Tenant Routes
router.post(
  '/', 
  requireAuth, 
  requireRoles(['SUPPLIER_OWNER', 'SUPPLIER_STAFF']), 
  requireTenant, 
  productsController.createProduct
);

router.patch(
  '/:id', 
  requireAuth, 
  requireRoles(['SUPPLIER_OWNER', 'SUPPLIER_STAFF']), 
  requireTenant, 
  productsController.updateProduct
);

export { router as productRoutes };
