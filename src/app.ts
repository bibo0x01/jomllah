import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './infrastructure/logger/index.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { tenantRoutes } from './modules/tenants/tenants.routes.js';
import { userRoutes } from './modules/users/users.routes.js';
import { productRoutes } from './modules/products/products.routes.js';
import { chatRoutes } from './modules/chat/chat.routes.js';
import { offerRoutes } from './modules/offers/offers.routes.js';
import { orderRoutes } from './modules/orders/orders.routes.js';
import { analyticsRoutes } from './modules/analytics/analytics.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming Request');
  next();
});

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Jomllah API is running' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tenants', tenantRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/offers', offerRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Global Error Handler
app.use(errorHandler);

export { app };
