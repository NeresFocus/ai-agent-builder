# 🎯 Componentes React e Endpoints da API

## 📱 Componentes React Principais

### Frontend Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Framework**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand + React Query
- **Form Handling**: React Hook Form + Zod
- **Data Visualization**: Recharts
- **Tables**: TanStack React Table

### Arquitetura de Componentes

```
src/
├── app/
│   ├── (auth)/              # Componentes de autenticação
│   │   ├── login/           # Página de login
│   │   ├── register/        # Página de registro
│   │   └── forgot-password/
│   ├── (dashboard)/         # Área protegida
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Dashboard home
│   │   ├── agents/          # Gestão de agentes
│   │   ├── analytics/       # Dashboard analytics
│   │   ├── settings/        # Configurações
│   │   └── integrations/
│   └── api/
├── components/
│   ├── ui/                  # Base UI Components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Dialog.tsx
│   │   ├── Tabs.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── agent-editor/        # Editor de agentes
│   │   ├── AgentForm.tsx
│   │   ├── PromptEditor.tsx
│   │   ├── IntegrationManager.tsx
│   │   └── TestSandbox.tsx
│   ├── dashboard/           # Widgets do dashboard
│   │   ├── AgentsList.tsx
│   │   ├── ExecutionMetrics.tsx
│   │   ├── UsageChart.tsx
│   │   └── RecentExecutions.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── Footer.tsx
│       └── NotificationToast.tsx
└── lib/
    ├── api.ts               # Cliente HTTP
    ├── auth.ts              # Utilitários de autenticação
    ├── store/
    │   ├── authStore.ts     # Zustand store
    │   ├── agentStore.ts
    │   └── uiStore.ts
    └── utils/
```

### Componentes Principais (Descrições Detalhadas)

#### 1. **AgentEditor** - Editor Visual de Agentes
```typescript
// Responsabilidades:
- Criar novo agente
- Editar configurações existentes
- Definir prompt do sistema
- Selecionar nível de complexidade (BASIC, INTERMEDIATE, ADVANCED, SUPREME)
- Configurar instruções e comportamentos
- Pré-visualizar comportamento

// Props principais:
interface AgentEditorProps {
  agentId?: string;
  onSave: (agent: Agent) => Promise<void>;
  onCancel: () => void;
}
```

#### 2. **TestSandbox** - Ambiente de Testes
```typescript
// Responsabilidades:
- Executar agente em tempo real
- Fornecer entrada de teste
- Exibir resposta do agente
- Mostrar tokens usados
- Exibir tempo de execução
- Registrar histórico de testes

interface SandboxProps {
  agentId: string;
  onExecution: (result: ExecutionResult) => void;
}
```

#### 3. **AgentsList** - Lista de Agentes
```typescript
// Responsabilidades:
- Listar todos os agentes do usuário
- Filtrar por status e especialidade
- Ordenar por data ou popularidade
- Ações rápidas (editar, testar, deletar)
- Paginação

interface AgentsListProps {
  filters?: AgentFilters;
  onSelectAgent: (agent: Agent) => void;
}
```

#### 4. **IntegrationManager** - Gerenciador de Integrações
```typescript
// Responsabilidades:
- Conectar com Zapier
- Configurar n8n
- Adicionar webhooks
- Gerenciar API keys
- Testar integrações

interface IntegrationManagerProps {
  agentId: string;
  onIntegrationAdded: (integration: Integration) => void;
}
```

#### 5. **ExecutionMetrics** - Dashboard de Métricas
```typescript
// Responsabilidades:
- Exibir número total de execuções
- Mostrar taxa de sucesso
- Tempo médio de execução
- Tokens consumidos
- Gráficos de uso ao longo do tempo

interface MetricsProps {
  agentId?: string;
  period: 'day' | 'week' | 'month';
}
```

#### 6. **LicenseGenerator** - Gerador de Licenças
```typescript
// Responsabilidades:
- Gerar chaves de licença
- Definir tipo (MONTHLY, YEARLY, LIFETIME)
- Configurar limite de execuções
- Gerenciar licenças ativas
- Exportar/compartilhar

interface LicenseGeneratorProps {
  agentId: string;
  onLicenseGenerated: (license: License) => void;
}
```

#### 7. **ExportDialog** - Dialog de Exportação
```typescript
// Responsabilidades:
- Exportar agente como componente
- Gerar código de integração
- Criar bundle para white label
- Configurar chave de licença
- Baixar recursos

interface ExportDialogProps {
  agent: Agent;
  onExport: (config: ExportConfig) => void;
}
```

---

## 📡 Endpoints da API

### Base URL
```
Development: http://localhost:4000/api
Production: https://api.aiagentbuilder.com/api
Version: v1
```

### Autenticação

#### `POST /auth/register`
Registrar novo usuário

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "plan": "FREE"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `POST /auth/login`
Login com email e senha

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "plan": "FREE",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `GET /auth/me`
Obter perfil do usuário autenticado

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "cuid123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "plan": "FREE",
  "emailVerified": true,
  "isActive": true
}
```

#### `POST /auth/refresh`
Renovar token JWT

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Agentes

#### `GET /agents`
Listar todos os agentes do usuário

**Query Parameters:**
```
?page=1&limit=10&sort=-createdAt&status=ACTIVE&specialty=SALES
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "agent123",
      "name": "Sales Assistant",
      "description": "Assistente de vendas 24/7",
      "specialty": "SALES",
      "complexity": "INTERMEDIATE",
      "status": "ACTIVE",
      "isPublic": false,
      "version": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### `POST /agents`
Criar novo agente

**Request:**
```json
{
  "name": "Customer Support Bot",
  "description": "Suporte ao cliente automatizado",
  "specialty": "SUPPORT",
  "complexity": "ADVANCED",
  "systemPrompt": "Você é um assistente de suporte ao cliente amigável...",
  "instructions": {
    "tone": "professional",
    "language": "pt-BR",
    "responseLength": "medium"
  },
  "isPublic": false
}
```

**Response (201):**
```json
{
  "id": "agent456",
  "name": "Customer Support Bot",
  "description": "Suporte ao cliente automatizado",
  "specialty": "SUPPORT",
  "complexity": "ADVANCED",
  "status": "DRAFT",
  "version": 1,
  "createdAt": "2025-01-20T15:45:00Z"
}
```

#### `GET /agents/:id`
Obter detalhes de um agente específico

**Response (200):**
```json
{
  "id": "agent456",
  "name": "Customer Support Bot",
  "description": "Suporte ao cliente automatizado",
  "specialty": "SUPPORT",
  "complexity": "ADVANCED",
  "systemPrompt": "Você é um assistente...",
  "instructions": {...},
  "status": "ACTIVE",
  "isPublic": false,
  "version": 2,
  "userId": "user123",
  "executionStats": {
    "totalExecutions": 1250,
    "successRate": 0.96,
    "avgDuration": 2340,
    "avgTokens": 150
  },
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-20T15:45:00Z"
}
```

#### `PUT /agents/:id`
Atualizar configurações do agente

**Request:**
```json
{
  "name": "Updated Support Bot",
  "description": "Novo descrição",
  "systemPrompt": "Nova instrução...",
  "complexity": "SUPREME",
  "instructions": {
    "tone": "casual",
    "language": "pt-BR"
  }
}
```

**Response (200):**
```json
{
  "id": "agent456",
  "name": "Updated Support Bot",
  "version": 3,
  "updatedAt": "2025-01-20T16:00:00Z"
}
```

#### `DELETE /agents/:id`
Deletar agente

**Response (204):** No content

#### `PUT /agents/:id/status`
Atualizar status do agente

**Request:**
```json
{
  "status": "ACTIVE"
}
```

**Status válidos:** DRAFT, TESTING, ACTIVE, INACTIVE, ARCHIVED

**Response (200):**
```json
{
  "id": "agent456",
  "status": "ACTIVE",
  "updatedAt": "2025-01-20T16:05:00Z"
}
```

---

### Teste e Execução de Agentes

#### `POST /agents/:id/execute`
Executar agente com entrada

**Request:**
```json
{
  "input": {
    "message": "Olá, preciso de ajuda com meu pedido",
    "userId": "customer123",
    "context": {
      "order_id": "ORD-12345",
      "timestamp": "2025-01-20T16:30:00Z"
    }
  },
  "options": {
    "timeout": 30000,
    "returnTokens": true
  }
}
```

**Response (200):**
```json
{
  "executionId": "exec789",
  "success": true,
  "output": "Olá! Posso ajudá-lo com seu pedido. Deixe-me verificar os detalhes...",
  "tokens": {
    "prompt": 120,
    "completion": 85,
    "total": 205
  },
  "duration": 2340,
  "model": "gpt-4o",
  "timestamp": "2025-01-20T16:30:00Z"
}
```

**Response (400) - Erro de Execução:**
```json
{
  "statusCode": 400,
  "message": "Execution failed",
  "error": "Invalid input format",
  "details": {
    "field": "input.message",
    "reason": "Message is required"
  }
}
```

#### `POST /agents/:id/test`
Testar agente em sandbox (sem consumir licença)

**Request:**
```json
{
  "input": {
    "message": "Teste rápido"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "output": "Resposta de teste",
  "tokens": 150,
  "duration": 1500,
  "testMode": true
}
```

#### `GET /agents/:id/executions`
Listar histórico de execuções

**Query Parameters:**
```
?page=1&limit=20&status=success&sort=-createdAt
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "exec789",
      "agentId": "agent456",
      "input": {"message": "..."},
      "output": "...",
      "success": true,
      "tokens": 205,
      "duration": 2340,
      "createdAt": "2025-01-20T16:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250
  }
}
```

#### `GET /agents/:id/executions/:executionId`
Obter detalhes de execução específica

**Response (200):**
```json
{
  "id": "exec789",
  "agentId": "agent456",
  "userId": "user123",
  "input": {
    "message": "Olá, preciso de ajuda",
    "context": {...}
  },
  "output": "Resposta do agente",
  "success": true,
  "tokens": 205,
  "duration": 2340,
  "model": "gpt-4o",
  "error": null,
  "createdAt": "2025-01-20T16:30:00Z"
}
```

---

### Licenças

#### `GET /agents/:id/licenses`
Listar licenças de um agente

**Response (200):**
```json
{
  "data": [
    {
      "id": "license123",
      "key": "XXXX-YYYY-ZZZZ-WWWW",
      "type": "MONTHLY",
      "status": "ACTIVE",
      "maxExecutions": 10000,
      "usedExecutions": 3250,
      "expiresAt": "2025-02-20T23:59:59Z",
      "metadata": {
        "clientName": "Company XYZ",
        "clientEmail": "contact@xyz.com"
      },
      "createdAt": "2025-01-20T00:00:00Z"
    }
  ]
}
```

#### `POST /agents/:id/licenses`
Gerar nova licença

**Request:**
```json
{
  "type": "MONTHLY",
  "maxExecutions": 10000,
  "expiresAt": "2025-02-20T23:59:59Z",
  "metadata": {
    "clientName": "Company XYZ",
    "clientEmail": "contact@xyz.com",
    "plan": "BASIC"
  }
}
```

**Response (201):**
```json
{
  "id": "license123",
  "key": "XXXX-YYYY-ZZZZ-WWWW",
  "type": "MONTHLY",
  "status": "ACTIVE",
  "maxExecutions": 10000,
  "expiresAt": "2025-02-20T23:59:59Z",
  "createdAt": "2025-01-20T15:45:00Z"
}
```

#### `PUT /agents/:id/licenses/:licenseId`
Atualizar licença

**Request:**
```json
{
  "status": "REVOKED",
  "maxExecutions": 15000
}
```

**Response (200):**
```json
{
  "id": "license123",
  "status": "REVOKED",
  "maxExecutions": 15000,
  "updatedAt": "2025-01-20T16:00:00Z"
}
```

#### `DELETE /agents/:id/licenses/:licenseId`
Deletar/revogar licença

**Response (204):** No content

#### `GET /licenses/:licenseKey/validate`
Validar licença (público)

**Response (200):**
```json
{
  "valid": true,
  "agentId": "agent456",
  "agentName": "Customer Support Bot",
  "status": "ACTIVE",
  "remaining": 6750,
  "expiresAt": "2025-02-20T23:59:59Z"
}
```

#### `POST /licenses/:licenseKey/execute`
Executar agente com licença (público)

**Request:**
```json
{
  "input": {
    "message": "Teste com licença"
  }
}
```

**Response (200):**
```json
{
  "executionId": "exec999",
  "success": true,
  "output": "Resposta do agente",
  "remaining": 6749,
  "expiresAt": "2025-02-20T23:59:59Z"
}
```

---

### Exportação

#### `POST /agents/:id/export`
Exportar agente

**Request:**
```json
{
  "format": "bundle",
  "includeKey": true,
  "keyType": "LIFETIME",
  "keyMaxExecutions": null
}
```

**Formatos suportados:** bundle, api, sdk, webhook

**Response (200):**
```json
{
  "exportId": "export456",
  "format": "bundle",
  "downloadUrl": "https://api.aiagentbuilder.com/exports/export456/download",
  "expiresAt": "2025-01-22T15:45:00Z",
  "licenseKey": "XXXX-YYYY-ZZZZ-WWWW",
  "integrationCode": "// Código de integração..."
}
```

#### `GET /agents/:id/export/:exportId`
Obter status de exportação

**Response (200):**
```json
{
  "exportId": "export456",
  "agentId": "agent456",
  "format": "bundle",
  "status": "READY",
  "size": 2048576,
  "downloadUrl": "https://api.aiagentbuilder.com/exports/export456/download",
  "expiresAt": "2025-01-22T15:45:00Z"
}
```

#### `GET /agents/:id/export/:exportId/download`
Baixar arquivo exportado

**Response:** File blob (zip/json)

---

### Integrações

#### `GET /agents/:id/integrations`
Listar integrações

**Response (200):**
```json
{
  "data": [
    {
      "id": "integ123",
      "type": "ZAPIER",
      "name": "Zapier - Lead Generation",
      "isActive": true,
      "config": {
        "webhookUrl": "https://hooks.zapier.com/hooks/...",
        "events": ["execution.success"]
      },
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "integ124",
      "type": "WEBHOOK",
      "name": "Custom Webhook",
      "isActive": true,
      "config": {
        "url": "https://example.com/webhook",
        "method": "POST",
        "headers": {...}
      },
      "createdAt": "2025-01-18T14:30:00Z"
    }
  ]
}
```

#### `POST /agents/:id/integrations`
Adicionar integração

**Request:**
```json
{
  "type": "WEBHOOK",
  "name": "CRM Webhook",
  "config": {
    "url": "https://crm.example.com/webhook",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer token123",
      "Content-Type": "application/json"
    },
    "events": ["execution.success", "execution.error"]
  }
}
```

**Response (201):**
```json
{
  "id": "integ125",
  "type": "WEBHOOK",
  "name": "CRM Webhook",
  "isActive": true,
  "createdAt": "2025-01-20T16:00:00Z"
}
```

#### `PUT /agents/:id/integrations/:integrationId`
Atualizar integração

**Request:**
```json
{
  "isActive": false
}
```

**Response (200):**
```json
{
  "id": "integ125",
  "isActive": false,
  "updatedAt": "2025-01-20T16:05:00Z"
}
```

#### `DELETE /agents/:id/integrations/:integrationId`
Deletar integração

**Response (204):** No content

#### `POST /agents/:id/integrations/:integrationId/test`
Testar integração

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "responseTime": 250,
  "message": "Webhook test successful"
}
```

---

### Pagamentos

#### `POST /payments/create-checkout-session`
Criar sessão de checkout

**Request:**
```json
{
  "plan": "PRO",
  "billingPeriod": "MONTHLY"
}
```

**Planos:** FREE, BASIC, PRO, ENTERPRISE

**Response (200):**
```json
{
  "sessionId": "cs_live_123456789",
  "url": "https://checkout.stripe.com/pay/cs_live_123456789",
  "expiresAt": "2025-01-21T16:00:00Z"
}
```

#### `GET /payments/subscription`
Obter informações de assinatura

**Response (200):**
```json
{
  "plan": "PRO",
  "status": "active",
  "currentPeriodStart": "2025-01-01T00:00:00Z",
  "currentPeriodEnd": "2025-02-01T00:00:00Z",
  "cancelAtPeriodEnd": false,
  "price": 99.00,
  "currency": "USD",
  "billingPeriod": "MONTHLY"
}
```

#### `PUT /payments/subscription`
Atualizar assinatura

**Request:**
```json
{
  "plan": "ENTERPRISE",
  "billingPeriod": "YEARLY"
}
```

**Response (200):**
```json
{
  "plan": "ENTERPRISE",
  "status": "active",
  "billingPeriod": "YEARLY",
  "updatedAt": "2025-01-20T16:00:00Z"
}
```

#### `POST /payments/webhook`
Webhook do Stripe (automático)

**Eventos processados:**
- `checkout.session.completed` - Upgrade finalizado
- `customer.subscription.updated` - Assinatura atualizada
- `customer.subscription.deleted` - Cancelamento
- `invoice.payment_failed` - Falha no pagamento

---

## 📊 Rate Limiting

Todos os endpoints respeitam rate limiting:

**Limites Padrão:**
- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

**Headers de Resposta:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 🔐 Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | OK - Sucesso |
| 201 | Created - Recurso criado |
| 204 | No Content - Deletado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (email já registrado) |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Erro no servidor |

---

## 📚 Exemplos de Uso

### JavaScript/Node.js

```javascript
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Criar agente
const agent = await api.post('/agents', {
  name: 'My Agent',
  specialty: 'SALES',
  complexity: 'ADVANCED'
});

// Executar agente
const result = await api.post(`/agents/${agent.data.id}/execute`, {
  input: { message: 'Hello' }
});

// Gerar licença
const license = await api.post(`/agents/${agent.data.id}/licenses`, {
  type: 'MONTHLY',
  maxExecutions: 10000
});

// Executar com licença (público)
const publicResult = await axios.post(
  `http://localhost:4000/api/licenses/${license.data.key}/execute`,
  { input: { message: 'Test' } }
);
```

### Python

```python
import requests

api = requests.Session()
api.headers.update({'Authorization': f'Bearer {token}'})

# Criar agente
agent = api.post('http://localhost:4000/api/agents', json={
    'name': 'My Agent',
    'specialty': 'SUPPORT',
    'complexity': 'ADVANCED'
}).json()

# Executar agente
result = api.post(
    f'http://localhost:4000/api/agents/{agent["id"]}/execute',
    json={'input': {'message': 'Help me'}}
).json()
```

### cURL

```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Criar agente
curl -X POST http://localhost:4000/api/agents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Agent",
    "specialty": "SALES",
    "complexity": "ADVANCED",
    "systemPrompt": "You are a sales agent..."
  }'

# Executar agente
curl -X POST http://localhost:4000/api/agents/AGENT_ID/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"message": "Hello"}}'
```

---

## 🚀 Próximas Etapas

1. **Implementar componentes React** em `frontend/src/components/`
2. **Criar endpoints faltantes** no backend
3. **Adicionar testes unitários** para componentes e endpoints
4. **Implementar WebSockets** para atualizações em tempo real
5. **Adicionar documentação interativa** com Swagger

---

**Última atualização:** Dezembro 2025
