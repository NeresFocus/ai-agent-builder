# 📦 Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn**
- **Docker** and **Docker Compose** (recommended)
- **PostgreSQL** 15+ (if not using Docker)
- **Redis** 7+ (if not using Docker)

## Installation Methods

### Method 1: Docker (Recommended)

This is the easiest way to get started with the AI Agent Builder platform.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/NeresFocus/ai-agent-builder.git
cd ai-agent-builder
```

#### Step 2: Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

Edit the `.env` files with your actual values:

**Important Variables:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (for payments)
- `JWT_SECRET` - A secure random string

#### Step 3: Start with Docker Compose

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Backend API on port 4000
- Frontend on port 3000

#### Step 4: Run Database Migrations

```bash
docker-compose exec backend npx prisma migrate dev
```

#### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs

### Method 2: Manual Installation

If you prefer to run services manually without Docker:

#### Step 1: Clone and Configure

```bash
git clone https://github.com/NeresFocus/ai-agent-builder.git
cd ai-agent-builder

# Configure environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

#### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

#### Step 3: Setup Database

Make sure PostgreSQL and Redis are running, then:

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

#### Step 4: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Post-Installation

### Create Your First Admin User

```bash
# Using Prisma Studio
cd backend
npx prisma studio
```

Navigate to the `users` table and create a user with `role: ADMIN`.

### Verify Installation

1. Open http://localhost:3000
2. Register a new account
3. Login
4. Create your first AI agent

## Troubleshooting

### Port Already in Use

If ports 3000 or 4000 are already in use:

```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Frontend
  - "4001:4000"  # Backend
```

### Database Connection Issues

Check your `DATABASE_URL` in `backend/.env`:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aiagentbuilder
```

### OpenAI API Errors

Ensure your `OPENAI_API_KEY` is valid and has sufficient credits.

## Next Steps

- [Architecture Overview](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Contributing Guide](./CONTRIBUTING.md)
