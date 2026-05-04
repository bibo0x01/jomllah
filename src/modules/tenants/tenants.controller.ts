import { Request, Response, NextFunction } from 'express';
import { TenantsService } from './tenants.service.js';
import { updateTenantSchema } from './tenants.validation.js';


export class TenantsController {
  private tenantsService = new TenantsService();

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenant = await this.tenantsService.getTenantProfile(req.tenantId!);
      res.status(200).json({ status: 'success', data: tenant });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateTenantSchema.parse(req.body);
      const updated = await this.tenantsService.updateTenant(req.tenantId!, validatedData);
      res.status(200).json({ status: 'success', data: updated });
    } catch (error) {
      next(error);
    }
  };

  verifyTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = req.params.tenantId as string;
      const verified = await this.tenantsService.verifyTenant(tenantId);
      res.status(200).json({ status: 'success', data: verified });
    } catch (error) {
      next(error);
    }
  }
}
