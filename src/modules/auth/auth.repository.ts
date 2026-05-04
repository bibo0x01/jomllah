import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma } from '@prisma/client';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });
  }

  async createUserWithTenant(userData: Prisma.UserCreateInput, tenantData?: Prisma.TenantCreateWithoutUsersInput) {
    if (tenantData) {
      return prisma.$transaction(async (tx) => {
        const tenant = await tx.tenant.create({ data: tenantData });
        const user = await tx.user.create({
          data: {
            ...userData,
            tenant: { connect: { id: tenant.id } }
          }
        });
        return { user, tenant };
      });
    }

    const user = await prisma.user.create({ data: userData });
    return { user, tenant: null };
  }
}
