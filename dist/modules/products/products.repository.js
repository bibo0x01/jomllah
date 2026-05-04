import { prisma } from '../../infrastructure/prisma/index.js';
export class ProductsRepository {
    async createProduct(tenantId, data) {
        return prisma.product.create({
            data: {
                ...data,
                tenant: { connect: { id: tenantId } },
            },
        });
    }
    async updateProduct(id, tenantId, data) {
        return prisma.product.update({
            where: { id, tenantId }, // Ensures a tenant can only update their own products
            data,
        });
    }
    async getProductById(id) {
        return prisma.product.findUnique({
            where: { id },
            include: { tenant: { select: { businessName: true, category: true } } }
        });
    }
    async getProducts(filters, skip, take) {
        return prisma.product.findMany({
            where: filters,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: { tenant: { select: { businessName: true } } }
        });
    }
}
//# sourceMappingURL=products.repository.js.map