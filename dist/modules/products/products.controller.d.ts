import { Request, Response, NextFunction } from 'express';
export declare class ProductsController {
    private productsService;
    createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=products.controller.d.ts.map