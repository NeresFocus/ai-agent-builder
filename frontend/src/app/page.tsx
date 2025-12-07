export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            🤖 AI Agent Builder
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Crie, gerencie e monetize agentes de IA personalizados
          </p>
          <p className="text-lg text-gray-600 mb-10">
            Plataforma completa White Label para criação de agentes inteligentes
            com OpenAI, Stripe e integrações avançadas
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Começar Agora
            </a>
            <a
              href="https://github.com/NeresFocus/ai-agent-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Ver no GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Stack Tecnológico
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white px-6 py-3 rounded-full shadow text-gray-700 font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600">
          <p className="mb-4">
            Built with ❤️ by{' '}
            <a
              href="https://github.com/NeresFocus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              NeresFocus
            </a>
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/NeresFocus/ai-agent-builder"
              className="text-indigo-600 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/API.md"
              className="text-indigo-600 hover:underline"
            >
              Documentação
            </a>
            <a
              href="https://github.com/NeresFocus/ai-agent-builder/issues"
              className="text-indigo-600 hover:underline"
            >
              Suporte
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'Editor Visual',
    description: 'Interface intuitiva para criar e configurar agentes de IA sem código',
  },
  {
    icon: '🚀',
    title: 'Deploy Instantâneo',
    description: 'Publique seus agentes em segundos com integração CI/CD',
  },
  {
    icon: '💰',
    title: 'Monetização',
    description: 'Sistema completo de licenças e pagamentos com Stripe',
  },
  {
    icon: '🔗',
    title: 'Integrações',
    description: 'Conecte com Zapier, n8n, webhooks e APIs customizadas',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Dashboard completo com métricas e insights de uso',
  },
  {
    icon: '🏷️',
    title: 'White Label',
    description: 'Revenda com sua marca e gere licenças ilimitadas',
  },
]

const stats = [
  { value: '65+', label: 'Arquivos' },
  { value: '6', label: 'Módulos' },
  { value: '85%', label: 'Coverage' },
  { value: '100%', label: 'Funcional' },
]

const techStack = [
  'Next.js 14',
  'NestJS',
  'TypeScript',
  'Prisma',
  'PostgreSQL',
  'Redis',
  'OpenAI',
  'Stripe',
  'Docker',
  'GitHub Actions',
]
