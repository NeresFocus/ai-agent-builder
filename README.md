# 🤖 AI Agent Builder - White Label Platform

## 🌟 Visão Geral

Plataforma completa para criação, gerenciamento e monetização de agentes de IA personalizados. Crie agentes inteligentes, defina comportamentos, integre com APIs externas e exporte como micro SaaS ou serviço White Label.

## 🚀 Funcionalidades Principais

- ✅ **Editor Visual de Agentes** - Interface intuitiva para criar e configurar agentes
- ✅ **Múltiplos Níveis de Complexidade** - De básico (GPT-3.5) a supremo (GPT-4o)
- ✅ **Sandbox de Testes** - Teste agentes em tempo real antes de publicar
- ✅ **Sistema de Licenciamento** - Gere e gerencie licenças para revenda
- ✅ **Integrações** - Zapier, n8n, Webhooks, APIs REST
- ✅ **Dashboard Completo** - Analíticas, métricas e monitoramento
- ✅ **Sistema de Pagamentos** - Stripe integrado para assinaturas
- ✅ **Multi-tenancy** - Suporte para múltiplos usuários e organizações

## 📋 Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand / React Query
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 20+
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cache**: Redis
- **Auth**: JWT + OAuth 2.0

### AI/ML
- **LLM Provider**: OpenAI API
- **Framework**: LangChain
- **Agent Orchestration**: Custom Engine

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Railway/AWS (Backend)
- **Monitoring**: Sentry

## 🏗️ Estrutura do Projeto

```
ai-agent-builder/
├── frontend/          # Next.js application
├── backend/           # NestJS API
├── shared/            # Shared types and utilities
├── docker/            # Docker configurations
├── .github/           # CI/CD workflows
└── docs/              # Documentation
```

## 🚦 Quick Start

### Pré-requisitos

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### 1. Clone o Repositório

```bash
git clone https://github.com/NeresFocus/ai-agent-builder.git
cd ai-agent-builder
```

### 2. Configurar Variáveis de Ambiente

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Iniciar com Docker (Recomendado)

```bash
docker-compose up -d
```

### 4. Ou Iniciar Manualmente

**Backend:**
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 5. Acessar a Aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs

## 📚 Documentação

- [Guia de Instalação](./docs/INSTALLATION.md)
- [Arquitetura](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Guia de Contribuição](./docs/CONTRIBUTING.md)

## 💰 Modelo de Monetização

### Planos de Assinatura

| Plano | Agentes | Execuções/mês | Preço |
|-------|---------|---------------|-------|
| **Free** | 2 | 1.000 | $0 |
| **Basic** | 10 | 10.000 | $29/mês |
| **Pro** | 50 | 100.000 | $99/mês |
| **Enterprise** | Ilimitado | Ilimitado | Custom |

### White Label
- Exportação de agentes com chave de licença
- API completa para integração
- Suporte para revenda

## 🔐 Segurança

- Autenticação JWT com refresh tokens
- Rate limiting por IP e usuário
- Sanitização de inputs
- CORS configurado
- Secrets gerenciados via variáveis de ambiente

## 🧪 Testes

```bash
# Backend
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage

# Frontend
cd frontend
npm run test
```

## 🚀 Deploy

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NeresFocus/ai-agent-builder)

### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para mais informações.

## 📞 Suporte

- 📧 Email: support@aiagentbuilder.com
- 💬 Discord: [Join our community](https://discord.gg/aiagentbuilder)
- 📖 Documentation: https://docs.aiagentbuilder.com

## 🙏 Agradecimentos

Construído com ❤️ usando tecnologias open source.

---

**Made with 🤖 by [NeresFocus](https://github.com/NeresFocus)**
