                    ┌────────────────────┐
                    │   Admin Panel      │
                    └────────┬───────────┘
                             │
                             ▼
        ┌────────────────────────────────────┐
        │        SaaS Core Platform          │
        │------------------------------------│
        │  Auth + Billing + Tenant Control   │
        └───────────┬───────────┬────────────┘
                    │           │
        ┌───────────▼───┐   ┌──▼────────────┐
        │ Supplier A     │   │ Supplier B    │
        │ (Tenant)       │   │ (Tenant)      │
        └──────┬─────────┘   └────┬─────────┘
               │                  │
        Products + Chats     Products + Chats
               │                  │
               └────── Shared Marketplace ────┘








src/
│
├── server.ts
├── app.ts
│
├── config/
│   ├── env.ts
│   ├── prisma.ts
│   ├── redis.ts
│   ├── logger.ts
│
│
├── infrastructure/              # External systems layer
│   ├── redis/
│   │   ├── redis.client.ts
│   │   ├── redis.keys.ts
│   │   ├── redis.pubsub.ts
│   │   ├── redis.cache.ts
│   │   ├── redis.rateLimiter.ts
│   │
│   ├── events/
│   │   ├── eventBus.ts
│   │   ├── event.types.ts
│   │
│   ├── socket/
│       ├── socket.server.ts
│       ├── socket.handlers.ts
│
│
├── common/                      # Shared logic
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── tenant.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │
│   ├── utils/
│   ├── errors/
│   ├── constants/
│   ├── types/
│   ├── validators/
│
│
├── saas/                        # SaaS core layer
│   ├── billing/
│   │   ├── subscription.service.ts
│   │   ├── plans.ts
│   │
│   ├── tenants/
│   │   ├── tenant.service.ts
│   │   ├── tenant.context.ts
│   │
│   ├── limits/
│   │   ├── usage.service.ts
│
│
├── modules/                    # Business features (CORE)
│
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.types.ts
│   │
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.repository.ts
│   │   ├── user.routes.ts
│   │
│   ├── products/
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   ├── product.repository.ts
│   │   ├── product.routes.ts
│   │
│   ├── marketplace/            # Global browsing layer
│   │   ├── search.service.ts
│   │   ├── filter.service.ts
│   │
│   ├── chat/
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   ├── chat.repository.ts
│   │   ├── chat.gateway.ts
│   │   ├── chat.events.ts
│   │
│   ├── messages/
│   │   ├── message.service.ts
│   │   ├── message.repository.ts
│   │
│   ├── offers/
│   │   ├── offer.controller.ts
│   │   ├── offer.service.ts
│   │   ├── offer.repository.ts
│   │   ├── offer.events.ts
│   │
│   ├── orders/
│   │   ├── order.controller.ts
│   │   ├── order.service.ts
│   │   ├── order.repository.ts
│   │
│   ├── notifications/
│   │   ├── notification.service.ts
│   │   ├── notification.events.ts
│   │
│   ├── analytics/
│   │   ├── supplier.analytics.ts
│   │   ├── platform.analytics.ts
│   │
│   ├── admin/
│       ├── admin.controller.ts
│       ├── admin.service.ts
│       ├── admin.analytics.ts
│
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   ├── seed.ts
│
│
├── docs/
│   ├── swagger/
│   ├── architecture.md
│
│
└── tests/
    ├── unit/
    ├── integration/