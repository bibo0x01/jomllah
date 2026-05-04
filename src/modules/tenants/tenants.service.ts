import { TenantsRepository } from './tenants.repository.js';
import { z } from 'zod';
import { updateTenantSchema } from './tenants.validation.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';

export class TenantsService {
  private tenantsRepo = new TenantsRepository();

  async getTenantProfile(tenantId: string) {
    const tenant = await this.tenantsRepo.findTenantById(tenantId);
    if (!tenant) {
      throw new NotFoundError('Tenant not found');
    }
    return tenant;
  }

  async updateTenant(tenantId: string, data: z.infer<typeof updateTenantSchema>) {
    // Check if tenant exists
    await this.getTenantProfile(tenantId);
    return this.tenantsRepo.updateTenant(tenantId, data);
  }

  async verifyTenant(tenantId: string) {
    // Check if tenant exists
    await this.getTenantProfile(tenantId);
    return this.tenantsRepo.verifyTenant(tenantId);
  }
}
