import { Request, Response, NextFunction } from 'express';
export declare class OffersController {
    private offersService;
    createOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    counterOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    acceptOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    rejectOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=offers.controller.d.ts.map