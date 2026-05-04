import { ProductsRepository } from './products.repository.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';
import { redisClient } from '../../infrastructure/redis/index.js';
export class ProductsService {
    productsRepo = new ProductsRepository();
    async createProduct(tenantId, data) {
        const product = await this.productsRepo.createProduct(tenantId, data);
        // Invalidate products cache
        await this.invalidateSearchCache();
        return product;
    }
    async updateProduct(productId, tenantId, data) {
        try {
            const product = await this.productsRepo.updateProduct(productId, tenantId, data);
            await this.invalidateSearchCache();
            await redisClient.del(`product:${productId}`);
            return product;
        }
        catch (error) {
            throw new NotFoundError('Product not found or unauthorized');
        }
    }
    async getProduct(productId) {
        const cacheKey = `product:${productId}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const product = await this.productsRepo.getProductById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(product)); // Cache for 1 hour
        return product;
    }
    async searchProducts(query) {
        const cacheKey = `products:search:${JSON.stringify(query)}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const filters = { isActive: true };
        if (query.category)
            filters.category = query.category;
        if (query.tenantId)
            filters.tenantId = query.tenantId;
        if (query.search) {
            filters.name = { contains: query.search, mode: 'insensitive' };
        }
        const products = await this.productsRepo.getProducts(filters, 0, 50);
        await redisClient.setEx(cacheKey, 600, JSON.stringify(products)); // Cache for 10 minutes
        return products;
    }
    async invalidateSearchCache() {
        // Delete all keys matching products:search:*
        // Note: In production with Redis Cluster, SCAN should be used carefully
        const keys = await redisClient.keys('products:search:*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    }
}
//# sourceMappingURL=products.service.js.map