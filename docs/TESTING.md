# 🧪 Testing Guide

## Overview

This guide covers all testing procedures for the AI Agent Builder platform.

## Test Strategy

### Testing Pyramid

```
           E2E Tests (10%)
        ⬆️ Slow, brittle, expensive
       ╱╲
      ╱  ╲  Integration Tests (30%)
     ╱    ╲ ⬆️ Medium speed, medium cost
    ╱      ╲
   ╱________╲ Unit Tests (60%)
      ⬆️ Fast, reliable, cheap
```

## Setup

### Prerequisites

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Setup test database
cp backend/.env.example backend/.env.test
# Edit .env.test with test database URL
```

### Test Database

```bash
# Create test database
createdb aiagentbuilder_test

# Run migrations
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aiagentbuilder_test" \
  npx prisma migrate deploy
```

## Running Tests

### Backend Tests

#### Unit Tests

```bash
cd backend
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

#### Integration Tests

```bash
npm run test:e2e
```

#### Specific Test Files

```bash
# Test specific module
npm test -- agents.service.spec.ts

# Test with pattern
npm test -- --testNamePattern="should create agent"
```

### Frontend Tests

```bash
cd frontend
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## Backend Testing

### Unit Testing Best Practices

#### 1. Service Tests

```typescript
// agents.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AgentsService } from './agents.service';
import { PrismaService } from '../../database/prisma.service';
import { AiService } from '../ai/ai.service';

describe('AgentsService', () => {
  let service: AgentsService;
  let prisma: PrismaService;
  let aiService: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        {
          provide: PrismaService,
          useValue: {
            agent: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: AiService,
          useValue: {
            executeAgent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AgentsService>(AgentsService);
    prisma = module.get<PrismaService>(PrismaService);
    aiService = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new agent', async () => {
      const mockUser = {
        id: 'user1',
        plan: 'FREE',
        agents: [],
      };

      const mockAgent = {
        id: 'agent1',
        name: 'Test Agent',
        userId: 'user1',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);
      jest.spyOn(prisma.agent, 'create').mockResolvedValue(mockAgent as any);

      const result = await service.create('user1', {
        name: 'Test Agent',
        specialty: 'CUSTOM',
        complexity: 'BASIC',
        systemPrompt: 'Test',
      });

      expect(result).toEqual(mockAgent);
      expect(prisma.agent.create).toHaveBeenCalled();
    });

    it('should throw error when limit reached', async () => {
      const mockUser = {
        id: 'user1',
        plan: 'FREE',
        agents: [{}, {}], // 2 agents (limit for FREE)
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);

      await expect(
        service.create('user1', {
          name: 'Test Agent',
          specialty: 'CUSTOM',
          complexity: 'BASIC',
          systemPrompt: 'Test',
        }),
      ).rejects.toThrow('Agent limit reached');
    });
  });
});
```

### E2E Testing

Run the E2E tests that were created:

```bash
npm run test:e2e
```

**Coverage:**
- ✅ Authentication (register, login)
- ✅ Agents CRUD operations
- ✅ Licenses management
- ✅ Payments integration

## Frontend Testing

### Component Testing

```typescript
// agent-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AgentCard } from './agent-card';

describe('AgentCard', () => {
  const mockAgent = {
    id: '1',
    name: 'Test Agent',
    description: 'Test Description',
    status: 'ACTIVE',
    specialty: 'SALES',
  };

  it('renders agent information', () => {
    render(<AgentCard agent={mockAgent} />);

    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', () => {
    const onEdit = jest.fn();
    render(<AgentCard agent={mockAgent} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockAgent);
  });
});
```

## Manual Testing Checklist

### Authentication Flow

- [ ] User can register with email and password
- [ ] User receives validation errors for invalid inputs
- [ ] User can login with credentials
- [ ] User stays logged in after page refresh
- [ ] User can logout
- [ ] JWT token expires correctly

### Agent Management

- [ ] User can create a new agent
- [ ] User can view list of agents
- [ ] User can edit agent details
- [ ] User can delete agent
- [ ] User can execute agent with input
- [ ] User can clone agent
- [ ] Agent creation respects plan limits

### License System

- [ ] User can generate license for agent
- [ ] License key is properly formatted
- [ ] License validation works correctly
- [ ] Expired licenses are rejected
- [ ] Usage tracking increments correctly

### Payment Flow

- [ ] Stripe checkout session creates successfully
- [ ] User is redirected to Stripe
- [ ] Successful payment upgrades user plan
- [ ] Failed payment keeps user on same plan
- [ ] Webhooks are received and processed
- [ ] Customer portal link works

### Integrations

- [ ] Webhook integration can be created
- [ ] Webhook test function works
- [ ] Integration configuration is saved
- [ ] Integration can be disabled/enabled

## Performance Testing

### Load Testing with Artillery

```yaml
# artillery-config.yml
config:
  target: "http://localhost:4000"
  phases:
    - duration: 60
      arrivalRate: 10
      name: Warm up
    - duration: 120
      arrivalRate: 50
      name: Sustained load
scenarios:
  - name: "Agent Execution"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "TestPassword123!"
          capture:
            json: "$.token"
            as: "token"
      - post:
          url: "/api/agents/{{ agentId }}/execute"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            input:
              message: "Hello, AI!"
```

```bash
# Run load test
npx artillery run artillery-config.yml
```

## Security Testing

### OWASP Top 10 Checks

1. **Injection**
   - [ ] SQL injection prevented (using Prisma)
   - [ ] Command injection prevented
   - [ ] XSS prevented (input sanitization)

2. **Broken Authentication**
   - [ ] Passwords are hashed (bcrypt)
   - [ ] JWT tokens expire
   - [ ] Refresh tokens work correctly

3. **Sensitive Data Exposure**
   - [ ] HTTPS enforced in production
   - [ ] Secrets in environment variables
   - [ ] Database credentials secured

4. **Rate Limiting**
   - [ ] API rate limiting active
   - [ ] Execution limits enforced
   - [ ] Prevents brute force attacks

### Penetration Testing

```bash
# Test for common vulnerabilities
npm install -g snyk
snyk test

# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix
```

## CI/CD Testing

GitHub Actions automatically runs:

1. **On Pull Request:**
   - Linting
   - Type checking
   - Unit tests
   - E2E tests
   - Build verification

2. **On Merge to Main:**
   - Full test suite
   - Coverage report
   - Security scan
   - Docker build
   - Deploy to staging

## Test Coverage Goals

### Current Coverage

- **Backend:** 85%+ target
- **Frontend:** 70%+ target

### Critical Paths (100% Coverage Required)

- Authentication
- Payment processing
- License validation
- Agent execution

## Debugging Tests

### Backend

```bash
# Debug single test
node --inspect-brk node_modules/.bin/jest agents.service.spec.ts

# Then open chrome://inspect in Chrome
```

### Frontend

```bash
# Debug with VS Code
# Add to launch.json:
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Continuous Improvement

### Test Metrics to Track

- Test execution time
- Code coverage percentage
- Number of flaky tests
- Bug escape rate

### Monthly Review

- Review failed tests patterns
- Update test data
- Refactor slow tests
- Add missing coverage

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

---

**Remember:** Good tests are fast, isolated, repeatable, and self-validating.
