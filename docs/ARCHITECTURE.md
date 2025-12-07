# 🏗️ Architecture Overview

## System Architecture

The AI Agent Builder platform follows a modern microservices architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                      (Next.js 14+)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │  Editor  │  │ Sandbox  │  │ Settings │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────┴────────────────────────────────────┐
│                      Backend API                             │
│                     (NestJS)                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Agents  │  │ Licenses │  │ Payments │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
└───────┼─────────────┼─────────────┼─────────────┼──────────┘
        │             │             │             │
        │             │             │             │
┌───────┴─────────────┴─────────────┴─────────────┴──────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │  Redis   │  │  Prisma  │  │  Stripe  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   External Services                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  OpenAI  │  │  Zapier  │  │   n8n    │  │ SendGrid │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### Frontend (Next.js)

The frontend is built with Next.js 14 using the App Router pattern for optimal performance and SEO.

**Key Features:**
- Server-side rendering for improved performance
- Client-side state management with Zustand
- React Query for data fetching and caching
- Tailwind CSS + Shadcn/UI for consistent design
- TypeScript for type safety

**Directory Structure:**
```
frontend/src/
├── app/                    # Next.js pages (App Router)
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── agent-editor/      # Agent creation UI
│   └── dashboard/         # Dashboard widgets
├── lib/                   # Utilities and helpers
│   ├── api.ts             # API client
│   ├── auth.ts            # Auth utilities
│   └── store/             # Zustand stores
└── styles/                # Global styles
```

### Backend (NestJS)

The backend is a robust NestJS application with modular architecture.

**Core Modules:**

1. **Auth Module** (`/modules/auth`)
   - JWT-based authentication
   - OAuth integration (Google, GitHub)
   - Role-based access control (RBAC)
   - Session management

2. **Agents Module** (`/modules/agents`)
   - CRUD operations for AI agents
   - Agent versioning
   - Execution engine
   - Analytics and metrics

3. **AI Module** (`/modules/ai`)
   - OpenAI API integration
   - LangChain orchestration
   - Prompt management
   - Token usage tracking

4. **Licenses Module** (`/modules/licenses`)
   - License generation
   - Validation and verification
   - Usage tracking
   - Expiration management

5. **Payments Module** (`/modules/payments`)
   - Stripe integration
   - Subscription management
   - Webhook handling
   - Invoice generation

6. **Integrations Module** (`/modules/integrations`)
   - Zapier integration
   - n8n workflows
   - Custom webhooks
   - API key management

### Database Schema

**Key Entities:**

- **Users**: Authentication and profile data
- **Agents**: AI agent configurations
- **Executions**: Agent execution history
- **Licenses**: License keys and metadata
- **Integrations**: Third-party connections
- **ApiKeys**: API access tokens

### Data Flow

#### Agent Execution Flow

```
1. User → Frontend: Trigger agent execution
2. Frontend → Backend: POST /api/agents/:id/execute
3. Backend → AI Module: Process with OpenAI/LangChain
4. AI Module → OpenAI: Send prompt and context
5. OpenAI → AI Module: Return generated response
6. AI Module → Database: Store execution record
7. Backend → Frontend: Return result
8. Frontend → User: Display response
```

#### Payment Flow

```
1. User → Frontend: Select plan
2. Frontend → Backend: POST /api/payments/create-checkout
3. Backend → Stripe: Create checkout session
4. Stripe → Frontend: Redirect to checkout
5. User → Stripe: Complete payment
6. Stripe → Backend: Webhook notification
7. Backend → Database: Update user plan
8. Backend → User: Send confirmation email
```

## Security Architecture

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Refresh Tokens**: Extended sessions
- **RBAC**: Role-based permissions (USER, ADMIN, RESELLER)
- **API Keys**: Machine-to-machine authentication

### Data Protection

- **Encryption at Rest**: Sensitive data encrypted in database
- **Encryption in Transit**: TLS/SSL for all connections
- **Secrets Management**: Environment variables + secret managers
- **Input Validation**: All inputs sanitized and validated

### Rate Limiting

- **API Rate Limits**: 100 requests/minute per IP
- **Agent Execution Limits**: Based on plan tier
- **Webhook Rate Limits**: 10 requests/second

## Scalability

### Horizontal Scaling

- **Frontend**: Deploy multiple instances behind load balancer
- **Backend**: Stateless design allows easy scaling
- **Database**: Read replicas for query optimization
- **Cache**: Redis cluster for distributed caching

### Performance Optimization

- **CDN**: Static assets served via CDN
- **Database Indexing**: Optimized queries with indexes
- **Caching Strategy**: Redis for frequently accessed data
- **Connection Pooling**: Efficient database connections

## Monitoring & Observability

### Metrics

- API response times
- Agent execution times
- Token usage
- Error rates
- User activity

### Logging

- Structured logging (JSON format)
- Log aggregation (CloudWatch, DataDog)
- Error tracking (Sentry)
- Audit logs for sensitive operations

### Alerting

- System downtime alerts
- High error rate alerts
- Resource usage alerts
- Payment failure alerts

## Deployment Architecture

### Development

```
Docker Compose:
- PostgreSQL container
- Redis container
- Backend container
- Frontend container (hot reload)
```

### Staging

```
Cloud Infrastructure:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- Managed PostgreSQL
- Managed Redis
```

### Production

```
AWS/GCP Infrastructure:
- CloudFront (CDN)
- ECS/Kubernetes (Backend containers)
- RDS (PostgreSQL Multi-AZ)
- ElastiCache (Redis cluster)
- S3 (File storage)
- Route53 (DNS)
```

## Disaster Recovery

### Backup Strategy

- **Database**: Daily automated backups
- **Files**: S3 with versioning enabled
- **Configs**: Version controlled in Git

### Recovery Plan

- **RTO (Recovery Time Objective)**: < 4 hours
- **RPO (Recovery Point Objective)**: < 1 hour
- **Automated failover** for critical services

## Future Enhancements

1. **Microservices Split**: Separate agent execution into its own service
2. **Message Queue**: Add RabbitMQ/SQS for async processing
3. **GraphQL API**: Alternative to REST for flexible queries
4. **Real-time Updates**: WebSocket for live agent responses
5. **Multi-region Deployment**: Reduce latency globally

## Technology Decisions

### Why Next.js?

- Best-in-class React framework
- Excellent SEO capabilities
- Built-in API routes
- Vercel deployment optimization

### Why NestJS?

- TypeScript-first framework
- Dependency injection
- Modular architecture
- Excellent documentation

### Why PostgreSQL?

- ACID compliance
- JSON support for flexible schemas
- Excellent performance
- Wide ecosystem support

### Why Prisma?

- Type-safe database client
- Intuitive migrations
- Great developer experience
- Active community

## API Design Principles

1. **RESTful**: Following REST conventions
2. **Versioned**: `/api/v1` prefix for future compatibility
3. **Consistent**: Uniform response structure
4. **Documented**: OpenAPI/Swagger documentation
5. **Paginated**: Large datasets use cursor-based pagination

## Testing Strategy

### Unit Tests

- Service logic
- Utility functions
- Component rendering

### Integration Tests

- API endpoints
- Database operations
- External service mocks

### E2E Tests

- Critical user flows
- Payment processing
- Agent execution

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for architecture contribution guidelines.
