import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma } from '@prisma/client';

export class ProductsRepository {
  async createProduct(tenantId: string, data: Prisma.ProductCreateWithoutTenantInput) {
    return prisma.product.create({
      data: {
        ...data,
        tenant: { connect: { id: tenantId } },
      },
    });
  }

  async updateProduct(id: string, tenantId: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id, tenantId }, // Ensures a tenant can only update their own products
      data,
    });
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { tenant: { select: { businessName: true, category: true } } }
    });
  }

  async getProducts(filters: Prisma.ProductWhereInput, skip?: number, take?: number) {
    return prisma.product.findMany({
      where: filters,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { tenant: { select: { businessName: true } } }
    });
  }
}
