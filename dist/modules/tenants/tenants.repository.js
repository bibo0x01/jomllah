import { prisma } from '../../infrastructure/prisma/index.js';
export class TenantsRepository {
    async findTenantById(id) {
        return prisma.tenant.findUnique({
            where: { id },
            include: { users: { select: { id: true, name: true, email: true, role: true } } }
        });
    }
    async updateTenant(id, data) {
        return prisma.tenant.update({
            where: { id },
            data,
        });
    }
    // Used by Admin
    async verifyTenant(id) {
        return prisma.tenant.update({
            where: { id },
            data: { isVerified: true },
        });
    }
}
//# sourceMappingURL=tenants.repository.js.map