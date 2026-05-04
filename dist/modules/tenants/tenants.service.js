import { TenantsRepository } from './tenants.repository.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';
export class TenantsService {
    tenantsRepo = new TenantsRepository();
    async getTenantProfile(tenantId) {
        const tenant = await this.tenantsRepo.findTenantById(tenantId);
        if (!tenant) {
            throw new NotFoundError('Tenant not found');
        }
        return tenant;
    }
    async updateTenant(tenantId, data) {
        // Check if tenant exists
        await this.getTenantProfile(tenantId);
        return this.tenantsRepo.updateTenant(tenantId, data);
    }
    async verifyTenant(tenantId) {
        // Check if tenant exists
        await this.getTenantProfile(tenantId);
        return this.tenantsRepo.verifyTenant(tenantId);
    }
}
//# sourceMappingURL=tenants.service.js.map