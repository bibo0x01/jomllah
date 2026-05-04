import { createServer } from 'http';
import { app } from './app.js';
import { config } from './config/index.js';
import { logger } from './infrastructure/logger/index.js';
import { connectRedis, disconnectRedis } from './infrastructure/redis/index.js';
import { setupSocket } from './infrastructure/socket/index.js';
import { setupEventBus } from './infrastructure/events/index.js';
import { setupChatEvents } from './modules/chat/chat.events.js';
import { setupOfferEvents } from './modules/offers/offers.events.js';
import { setupOrderEvents } from './modules/orders/orders.events.js';
import { setupAnalyticsEvents } from './modules/analytics/analytics.events.js';

const startServer = async () => {
  try {
    // 1. Connect Infrastructure
    await connectRedis();
    await setupEventBus();
    setupChatEvents();
    setupOfferEvents();
    setupOrderEvents();
    setupAnalyticsEvents();

    // 2. Create HTTP Server
    const httpServer = createServer(app);

    // 3. Setup Real-time Socket Layer
    setupSocket(httpServer);

    // 4. Start Listening
    httpServer.listen(config.port, () => {
      logger.info(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
    });

    // Graceful Shutdown Handlers
    const shutdown = async () => {
      logger.info('Gracefully shutting down...');
      httpServer.close(async () => {
        logger.info('HTTP server closed');
        await disconnectRedis();
        process.exit(0);
      });
      // Force exit after 10 seconds
      setTimeout(() => {
        logger.error('Forcefully exiting after 10s');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
