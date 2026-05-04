import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma } from '@prisma/client';

export class TenantsRepository {
  async findTenantById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
      include: { users: { select: { id: true, name: true, email: true, role: true } } }
    });
  }

  async updateTenant(id: string, data: Prisma.TenantUpdateInput) {
    return prisma.tenant.update({
      where: { id },
      data,
    });
  }

  // Used by Admin
  async verifyTenant(id: string) {
    return prisma.tenant.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}
