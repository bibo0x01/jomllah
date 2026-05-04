export interface JwtPayload {
  userId: string;
  role: 'ADMIN' | 'SUPPLIER_OWNER' | 'SUPPLIER_STAFF' | 'BUYER';
  tenantId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      tenantId?: string;
    }
  }
}
