# AI Agent Builder - Vercel Deploy

## ✅ Deploy Configurado

Este projeto está configurado para deploy automático no Vercel.

## 🚀 Como Deployar

### Via Dashboard Vercel:
1. Acesse: https://vercel.com/new
2. Importe: https://github.com/NeresFocus/ai-agent-builder
3. **NÃO configure Root Directory** (deixe em branco ou "/")
4. Clique em Deploy

### Via CLI:
```bash
npm i -g vercel
vercel
```

## 📁 Estrutura

```
ai-agent-builder/
├── frontend/           # Next.js app (será buildado)
│   ├── src/
│   │   ├── app/       # App Router
│   │   └── pages/     # Pages Router (fallback)
│   └── package.json
├── backend/           # NestJS (ignored no deploy)
├── vercel.json        # Configuração Vercel
└── package.json       # Root package
```

## 🔧 Configuração

O Vercel automaticamente:
- ✅ Detecta Next.js
- ✅ Instala dependências
- ✅ Builda o projeto
- ✅ Deploya em edge network

## 🌐 URLs

- Homepage: `/`
- Dashboard: `/dashboard`
- API Docs: `/api/docs` (quando backend estiver no ar)

## 🐛 Troubleshooting

### 404 Error
- Verifique se os arquivos estão em `frontend/src/app/`
- Limpe cache: Settings → General → Clear Cache

### Build Error
- Verifique `frontend/package.json`
- Rode local: `cd frontend && npm run build`

## 📞 Suporte

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/NeresFocus/ai-agent-builder/issues
