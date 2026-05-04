import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service.js';
import { createProductSchema, updateProductSchema } from './products.validation.js';


export class ProductsController {
  private productsService = new ProductsService();

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createProductSchema.parse(req.body);
      const product = await this.productsService.createProduct(req.tenantId!, validatedData);
      res.status(201).json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validatedData = updateProductSchema.parse(req.body);
      const product = await this.productsService.updateProduct(id, req.tenantId!, validatedData);
      res.status(200).json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productsService.getProduct(id);
      res.status(200).json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  };

  searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productsService.searchProducts(req.query as any);
      res.status(200).json({ status: 'success', data: products });
    } catch (error) {
      next(error);
    }
  };
}
