import { Prisma } from '@prisma/client';
export declare class ProductsRepository {
    createProduct(tenantId: string, data: Prisma.ProductCreateWithoutTenantInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: Prisma.Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    }>;
    updateProduct(id: string, tenantId: string, data: Prisma.ProductUpdateInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: Prisma.Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    }>;
    getProductById(id: string): Promise<({
        tenant: {
            businessName: string;
            category: string;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: Prisma.Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    }) | null>;
    getProducts(filters: Prisma.ProductWhereInput, skip?: number, take?: number): Promise<({
        tenant: {
            businessName: string;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: Prisma.Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    })[]>;
}
//# sourceMappingURL=products.repository.d.ts.map