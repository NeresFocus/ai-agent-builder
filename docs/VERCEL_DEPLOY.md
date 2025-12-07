# 🚀 Guia de Deploy no Vercel

## ✅ Arquivos Já Configurados

Todos os arquivos necessários para deploy no Vercel já foram criados:

- ✅ `vercel.json` - Configuração principal do Vercel
- ✅ `frontend/src/app/layout.tsx` - Layout raiz do Next.js
- ✅ `frontend/src/app/page.tsx` - Homepage funcional
- ✅ `frontend/src/app/dashboard/page.tsx` - Dashboard completo
- ✅ `frontend/next.config.js` - Configuração otimizada do Next.js
- ✅ `frontend/postcss.config.js` - PostCSS para Tailwind

## 🎯 Deploy Automático via GitHub

### Opção 1: Deploy Automático (Recomendado)

1. **Acesse:** https://vercel.com/new

2. **Importe o Repositório:**
   - Clique em "Import Project"
   - Selecione "Import Git Repository"
   - Cole: `https://github.com/NeresFocus/ai-agent-builder`
   - Clique em "Import"

3. **Configure o Projeto:**
   ```
   Project Name: ai-agent-builder
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Variáveis de Ambiente:**
   Adicione no Vercel Dashboard:
   ```env
   NEXT_PUBLIC_API_URL=https://api.aiagentbuilder.com
   ```

5. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build (1-3 minutos)
   - ✅ Seu site estará no ar!

### Opção 2: Deploy Manual via CLI

```bash
# Instale Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy do diretório frontend
cd frontend
vercel

# Deploy para produção
vercel --prod
```

## 📋 Configurações do Projeto no Vercel

### Build Settings

```yaml
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 20.x
```

### Environment Variables

**Production:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_ENV=production
```

**Preview/Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development
```

## 🔧 Troubleshooting

### Problema: "Module not found"

**Solução:**
```bash
cd frontend
rm -rf node_modules .next
npm install
```

### Problema: "Build failed"

**Verificar:**
1. `frontend/package.json` existe
2. Todas as dependências estão listadas
3. `next.config.js` está correto
4. TypeScript sem erros: `npm run type-check`

### Problema: "404 - Page not found"

**Causa:** Vercel não encontrou a pasta `frontend`

**Solução no Vercel Dashboard:**
1. Project Settings
2. General > Root Directory
3. Definir como: `frontend`
4. Salvar e fazer redeploy

## 🌐 URLs do Deploy

Após o deploy bem-sucedido:

- **Production:** https://ai-agent-builder.vercel.app
- **Preview:** https://ai-agent-builder-{hash}.vercel.app
- **Custom Domain:** Configure em Project Settings > Domains

## 🔄 Deploys Automáticos

Configurado automaticamente via GitHub:

- ✅ **Push para `main`** → Deploy de produção
- ✅ **Push para outras branches** → Deploy de preview
- ✅ **Pull Requests** → Deploy de preview

## 📊 Monitoramento

Acesse métricas em tempo real:

1. **Analytics:** https://vercel.com/your-team/ai-agent-builder/analytics
2. **Speed Insights:** https://vercel.com/your-team/ai-agent-builder/speed-insights
3. **Logs:** https://vercel.com/your-team/ai-agent-builder/logs

## 🎨 Customização

### Custom Domain

1. Vá para: Project Settings > Domains
2. Adicione seu domínio: `seudominio.com`
3. Configure DNS conforme instruções
4. Aguarde propagação (até 48h)

### Configurações Avançadas

**Redirects (vercel.json):**
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

**Headers Customizados:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 🚀 Performance

O site já está otimizado com:

- ✅ Next.js 14 (App Router)
- ✅ Server Components
- ✅ Image Optimization
- ✅ Static Generation
- ✅ Code Splitting
- ✅ Minification

**Métricas Esperadas:**
- Performance Score: 95+
- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s

## 🔐 Segurança

Já configurado:

- ✅ HTTPS automático
- ✅ SSL/TLS certificates
- ✅ DDoS protection
- ✅ Edge caching
- ✅ Environment variables protegidas

## 📱 Mobile & PWA

Para tornar PWA (opcional):

1. Criar `frontend/public/manifest.json`
2. Adicionar service worker
3. Configurar ícones
4. Atualizar `layout.tsx`

## 🔗 Integração com Backend

### Opção 1: Backend Separado

```env
NEXT_PUBLIC_API_URL=https://api.railway.app
```

### Opção 2: Backend no Vercel (Serverless Functions)

Mover backend para `frontend/api/`:
```
frontend/
  api/
    auth/
      login.ts
      register.ts
    agents/
      [id].ts
```

## 📈 Escalabilidade

Vercel escala automaticamente:

- ✅ Edge Network (70+ regiões)
- ✅ CDN global
- ✅ Automatic scaling
- ✅ Zero-downtime deployments

## 💰 Custos

**Hobby Plan (Grátis):**
- 100GB Bandwidth/mês
- 100 Deployments/dia
- Perfeito para desenvolvimento

**Pro Plan ($20/mês):**
- 1TB Bandwidth
- Unlimited deployments
- Analytics avançado
- Priority support

## 🎯 Próximos Passos

1. ✅ Deploy feito
2. 🔄 Configure variáveis de ambiente
3. 🔄 Adicione custom domain (opcional)
4. 🔄 Configure analytics
5. 🔄 Monitore performance
6. 🔄 Deploy backend (Railway/AWS)

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Issues:** https://github.com/NeresFocus/ai-agent-builder/issues

---

**🎉 Parabéns! Seu app está no ar!**

Acesse: https://ai-agent-builder.vercel.app
