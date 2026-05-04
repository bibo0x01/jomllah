import { prisma } from '../../infrastructure/prisma/index.js';
export class AuthRepository {
    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
            include: { tenant: true },
        });
    }
    async createUserWithTenant(userData, tenantData) {
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
//# sourceMappingURL=auth.repository.js.map