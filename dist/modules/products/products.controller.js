import { ProductsService } from './products.service.js';
import { createProductSchema, updateProductSchema } from './products.validation.js';
export class ProductsController {
    productsService = new ProductsService();
    createProduct = async (req, res, next) => {
        try {
            const validatedData = createProductSchema.parse(req.body);
            const product = await this.productsService.createProduct(req.tenantId, validatedData);
            res.status(201).json({ status: 'success', data: product });
        }
        catch (error) {
            next(error);
        }
    };
    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const validatedData = updateProductSchema.parse(req.body);
            const product = await this.productsService.updateProduct(id, req.tenantId, validatedData);
            res.status(200).json({ status: 'success', data: product });
        }
        catch (error) {
            next(error);
        }
    };
    getProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.productsService.getProduct(id);
            res.status(200).json({ status: 'success', data: product });
        }
        catch (error) {
            next(error);
        }
    };
    searchProducts = async (req, res, next) => {
        try {
            const products = await this.productsService.searchProducts(req.query);
            res.status(200).json({ status: 'success', data: products });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=products.controller.js.map