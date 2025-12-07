# 🚀 Deploy do Backend no Render

## ✅ Pré-requisitos

- ✅ Repositório GitHub configurado
- ✅ Backend na pasta `backend/`
- ✅ Conta no Render (gratuita)

## 📋 Passo a Passo

### **Etapa 1: Preparar o Ambiente**

1. **Acesse:** https://render.com
2. **Faça login** com GitHub (recomendado)

### **Etapa 2: Criar Novo Web Service**

1. **Clique em "New +"** no canto superior direito
2. Selecione **"Web Service"**

### **Etapa 3: Conectar Repositório**

1. **Connect a repository**
2. Procure por: `ai-agent-builder`
3. Clique em **"Connect"**

### **Etapa 4: Configurar o Serviço**

Configure EXATAMENTE assim:

```yaml
┌─────────────────────────────────────────────┐
│ Name                                         │
│ ┌─────────────────────────────────────────┐ │
│ │ ai-agent-builder-api                    │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Region                                       │
│ ┌─────────────────────────────────────────┐ │
│ │ Oregon (US West)         [Recomendado]  │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Branch                                       │
│ ┌─────────────────────────────────────────┐ │
│ │ main                                     │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Root Directory (🔥 IMPORTANTE!)              │
│ ┌─────────────────────────────────────────┐ │
│ │ backend                                 │ │ ← DIGITE AQUI!
│ └─────────────────────────────────────────┘ │
│                                              │
│ Runtime                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Node                                     │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Build Command                                │
│ ┌─────────────────────────────────────────┐ │
│ │ npm install && npx prisma generate &&   │ │
│ │ npx prisma migrate deploy && npm run    │ │
│ │ build                                    │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Start Command                                │
│ ┌─────────────────────────────────────────┐ │
│ │ npm run start:prod                       │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ Instance Type                                │
│ ┌─────────────────────────────────────────┐ │
│ │ Free                                     │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### **Etapa 5: Configurar Variáveis de Ambiente**

Role até **"Environment Variables"** e adicione:

**OBRIGATÓRIAS:**

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=seu-secret-super-seguro-aqui-min-32-caracteres
```

**OPCIONAIS (adicione depois se tiver):**

```env
OPENAI_API_KEY=sk-sua-chave-openai-aqui
STRIPE_SECRET_KEY=sk_live_sua-chave-stripe-aqui
STRIPE_WEBHOOK_SECRET=whsec_seu-webhook-secret
REDIS_URL=redis://seu-redis-url:6379
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### **Etapa 6: Criar Banco de Dados PostgreSQL**

**Opção A: Render PostgreSQL (Recomendado)**

1. Volte ao Dashboard
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - Name: `ai-agent-builder-db`
   - Database: `aiagentbuilder`
   - User: `postgres`
   - Region: Same as web service (Oregon)
   - Plan: Free
4. Clique em **"Create Database"**
5. **Copie a "Internal Database URL"**
6. Volte ao Web Service → Environment
7. Atualize `DATABASE_URL` com a URL copiada

**Opção B: Usar outro provedor**

Pode usar:
- Supabase (gratuito)
- Neon (gratuito)
- ElephantSQL (gratuito)
- Railway (gratuito)

### **Etapa 7: Deploy!**

1. **Revise todas as configurações**
2. Clique em **"Create Web Service"**
3. **Aguarde o build** (5-10 minutos no primeiro deploy)

Você verá logs em tempo real:
```
==> Installing dependencies...
==> Running prisma generate...
==> Running prisma migrate...
==> Building application...
==> Starting server...
==> Your service is live at https://ai-agent-builder-api.onrender.com
```

### **Etapa 8: Verificar Deploy**

**Teste o Health Check:**
```
https://ai-agent-builder-api.onrender.com/api/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-12-07T...",
  "uptime": 123.45,
  "environment": "production"
}
```

**Teste a API Docs:**
```
https://ai-agent-builder-api.onrender.com/api/docs
```

Deve abrir o Swagger UI!

---

## 🔧 Configurações Adicionais

### **A) Custom Domain**

1. Settings → Custom Domains
2. Add Custom Domain: `api.seudominio.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: ai-agent-builder-api.onrender.com
   ```

### **B) CORS para Frontend**

Adicione variável de ambiente:
```env
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### **C) Auto-Deploy**

Já está configurado! ✅
- Push para `main` → Deploy automático
- Push para outras branches → Não faz deploy

### **D) Logs**

Acesse logs em tempo real:
1. Dashboard → Seu serviço
2. Clique em "Logs"
3. Veja logs em tempo real

---

## 🚨 Troubleshooting

### **Erro: "Build failed"**

**Causa:** Erro no build ou dependências

**Solução:**
1. Verifique os logs de build
2. Confirme que `backend/package.json` existe
3. Tente build local: `cd backend && npm run build`

### **Erro: "Prisma migrate failed"**

**Causa:** DATABASE_URL incorreto ou banco não acessível

**Solução:**
1. Verifique `DATABASE_URL` nas Environment Variables
2. Teste conexão localmente
3. Confirme que o banco existe

### **Erro: "Application failed to start"**

**Causa:** Porta incorreta ou comando de start errado

**Solução:**
1. Confirme: Start Command = `npm run start:prod`
2. Confirme: PORT=4000 nas variáveis
3. Verifique logs para erro específico

### **Erro: "Health check failed"**

**Causa:** Aplicação não está respondendo na rota /api/health

**Solução:**
1. Confirme que HealthModule foi adicionado
2. Teste localmente: `curl http://localhost:4000/api/health`
3. Verifique logs do Render

---

## 💰 Custos

**Free Tier (Suficiente para começar):**
- ✅ 750 horas/mês de runtime
- ✅ 100GB bandwidth
- ✅ PostgreSQL 256MB RAM
- ⚠️ Dorme após 15min de inatividade
- ⚠️ 30 segundos para "acordar"

**Starter Plan ($7/mês):**
- ✅ Sem sleep
- ✅ 512MB RAM
- ✅ Melhor performance

**Standard Plan ($25/mês):**
- ✅ 2GB RAM
- ✅ Auto-scaling
- ✅ Priority support

---

## 🔗 Conectar Frontend ↔ Backend

Após deploy bem-sucedido:

1. **Copie a URL do backend:**
   ```
   https://ai-agent-builder-api.onrender.com
   ```

2. **Atualize o frontend no Vercel:**
   - Vercel Dashboard → ai-agent-builder
   - Settings → Environment Variables
   - Edite `NEXT_PUBLIC_API_URL`:
     ```
     https://ai-agent-builder-api.onrender.com
     ```
   - Redeploy o frontend

3. **Teste a conexão:**
   - Acesse o frontend
   - Tente fazer login/registro
   - Verifique se chama a API corretamente

---

## 📊 Monitoramento

### **Metrics**

Render fornece automaticamente:
- CPU usage
- Memory usage
- Response times
- Request count

Acesse: Dashboard → Metrics

### **Alerts**

Configure alertas:
1. Settings → Notifications
2. Add email para receber alertas
3. Configure triggers (CPU > 80%, Memory > 90%, etc)

---

## 🎯 Checklist Final

Antes de fazer deploy, confirme:

- [ ] Root Directory: `backend`
- [ ] Build Command inclui `prisma generate` e `prisma migrate deploy`
- [ ] Start Command: `npm run start:prod`
- [ ] DATABASE_URL configurado
- [ ] JWT_SECRET configurado (min 32 caracteres)
- [ ] PORT=4000
- [ ] NODE_ENV=production

---

## 🆘 Suporte

Se tiver problemas:
1. Verifique os logs no Render
2. Teste build local: `cd backend && npm run build`
3. Teste Prisma: `npx prisma migrate dev`
4. Abra issue no GitHub

---

**🎉 Parabéns! Backend no ar!**

Acesse: https://ai-agent-builder-api.onrender.com/api/docs
