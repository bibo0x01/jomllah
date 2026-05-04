import { Router } from 'express';
import { UsersController } from './users.controller.js';
import { requireAuth, requireRoles } from '../../shared/middlewares/auth.js';
const router = Router();
const usersController = new UsersController();
// Profile Routes
router.get('/me', requireAuth, usersController.getProfile);
router.patch('/me', requireAuth, usersController.updateProfile);
// Admin Routes
router.get('/', requireAuth, requireRoles(['ADMIN']), usersController.getAllUsers);
export { router as userRoutes };
//# sourceMappingURL=users.routes.js.map