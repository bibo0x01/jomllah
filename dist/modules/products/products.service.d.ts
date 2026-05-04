import { z } from 'zod';
import { createProductSchema, updateProductSchema } from './products.validation.js';
export declare class ProductsService {
    private productsRepo;
    createProduct(tenantId: string, data: z.infer<typeof createProductSchema>): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    }>;
    updateProduct(productId: string, tenantId: string, data: z.infer<typeof updateProductSchema>): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        category: string;
        description: string;
        images: string[];
        isActive: boolean;
    }>;
    getProduct(productId: string): Promise<any>;
    searchProducts(query: {
        category?: string;
        tenantId?: string;
        search?: string;
    }): Promise<any>;
    private invalidateSearchCache;
}
//# sourceMappingURL=products.service.d.ts.map