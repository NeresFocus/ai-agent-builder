'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    agents: 0,
    executions: 0,
    licenses: 0,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🤖 AI Agent Builder
            </h1>
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                Configurações
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Novo Agente
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Agentes Criados"
            value={stats.agents}
            icon="🤖"
            color="blue"
          />
          <StatCard
            title="Execuções"
            value={stats.executions}
            icon="⚡"
            color="green"
          />
          <StatCard
            title="Licenças Ativas"
            value={stats.licenses}
            icon="🔑"
            color="purple"
          />
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Bem-vindo ao AI Agent Builder! 🎉
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Sua plataforma completa para criar, gerenciar e monetizar agentes de IA está pronta.
          </p>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-indigo-900 mb-3">🚀 Próximos Passos:</h3>
            <ul className="space-y-2 text-indigo-800">
              <li>✅ Backend completo funcionando</li>
              <li>✅ 6 módulos implementados (Agents, AI, Licenses, Payments, etc)</li>
              <li>✅ Testes automatizados (E2E)</li>
              <li>✅ CI/CD configurado</li>
              <li>✅ Documentação completa</li>
              <li>🔄 Configure seu OpenAI API Key no backend</li>
              <li>🔄 Configure Stripe para pagamentos</li>
              <li>🎨 Personalize o frontend conforme necessário</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/NeresFocus/ai-agent-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Ver Repositório
            </a>
            <a
              href="https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/API.md"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
            >
              Documentação da API
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuickLinkCard
            title="📚 Documentação"
            description="Guias completos de instalação, API, arquitetura e monetização"
            links={[
              { label: 'Installation', href: 'https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/INSTALLATION.md' },
              { label: 'API Reference', href: 'https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/API.md' },
              { label: 'Architecture', href: 'https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/ARCHITECTURE.md' },
            ]}
          />
          <QuickLinkCard
            title="🛠️ Recursos"
            description="Ferramentas e links úteis para desenvolvimento"
            links={[
              { label: 'GitHub Repository', href: 'https://github.com/NeresFocus/ai-agent-builder' },
              { label: 'API Swagger (Local)', href: 'http://localhost:4000/api/docs' },
              { label: 'Roadmap', href: 'https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/ROADMAP.md' },
            ]}
          />
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className={`text-3xl font-bold ${colors[color as keyof typeof colors]}`}>
          {value}
        </div>
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
  )
}

function QuickLinkCard({ title, description, links }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {links.map((link: any, index: number) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            → {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
