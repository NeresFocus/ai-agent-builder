# 🚀 Guia Rápido de Deploy - Vercel

## ❌ Erro 404? Siga estes passos:

### Solução 1: Configurar Root Directory (Mais Simples)

1. **Acesse seu projeto no Vercel:**
   - https://vercel.com/dashboard
   - Selecione: `ai-agent-builder`

2. **Vá em Settings:**
   - Settings → General
   - Role até "Root Directory"

3. **Configure:**
   ```
   Root Directory: frontend
   ```

4. **Salve e Redeploy:**
   - Clique em "Save"
   - Vá em "Deployments"
   - Clique nos 3 pontos do último deploy
   - Clique em "Redeploy"

5. **Aguarde 2 minutos** ✅

### Solução 2: Deploy Correto desde o Início

Se você ainda não fez o deploy ou quer refazer:

1. **Delete o projeto atual** (se houver):
   - Settings → Delete Project

2. **Novo Deploy:**
   - Acesse: https://vercel.com/new
   - Import: `https://github.com/NeresFocus/ai-agent-builder`

3. **Configure ANTES de clicar em Deploy:**
   ```yaml
   Project Name: ai-agent-builder
   Framework: Next.js
   Root Directory: frontend     ← CRUCIAL!
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Clique em Deploy**

### Solução 3: Via CLI (Mais Rápido)

```bash
# 1. Clone o repositório
git clone https://github.com/NeresFocus/ai-agent-builder.git
cd ai-agent-builder

# 2. Entre na pasta frontend
cd frontend

# 3. Instale Vercel CLI (se não tiver)
npm i -g vercel

# 4. Login
vercel login

# 5. Deploy
vercel --prod

# Responda:
# - Set up and deploy? Yes
# - Which scope? Sua conta pessoal
# - Link to existing project? No (ou Yes se já criou)
# - Project name? ai-agent-builder
# - Deploy? Yes
```

## ✅ Verificação

Após o deploy, teste:

- **Homepage:** https://seu-projeto.vercel.app/
- **Dashboard:** https://seu-projeto.vercel.app/dashboard

Se ainda mostrar 404, o problema é o Root Directory.

## 🔍 Debug

### Verificar se os arquivos existem:

```bash
# Devem existir:
frontend/package.json          ✅
frontend/src/app/page.tsx      ✅
frontend/src/app/layout.tsx    ✅
frontend/next.config.js        ✅
```

Todos esses arquivos já estão no repositório! 

### Logs do Vercel

1. Vá em: Deployments
2. Clique no último deploy
3. Veja "Build Logs"
4. Procure por erros

## 🎯 Causa do 404

O erro acontece porque:

1. **Root Directory não configurado** → Vercel busca na raiz
2. **Arquivos estão em `frontend/`** → Vercel não encontra
3. **Resultado:** 404 NOT_FOUND

**Solução:** Configurar Root Directory = `frontend`

## 📞 Ainda com problemas?

Se após seguir os passos acima ainda tiver 404:

1. Verifique os logs de build no Vercel
2. Confirme que Root Directory = `frontend`
3. Tente fazer redeploy
4. Se persistir, delete o projeto e crie novamente

---

**Tempo estimado:** 2-5 minutos para resolver ✅
