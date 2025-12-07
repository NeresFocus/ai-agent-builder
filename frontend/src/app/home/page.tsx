export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            🤖 AI Agent Builder
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Plataforma Completa para Criar Agentes de IA
          </p>
          <p className="text-lg text-gray-600 mb-10">
            Deploy bem-sucedido! Seu projeto está no ar! 🎉
          </p>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 text-green-600">
              ✅ Deploy Funcionando!
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Parabéns! Seu site está rodando no Vercel.
            </p>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-left">
              <h3 className="font-bold text-green-900 mb-3">✅ Status:</h3>
              <ul className="space-y-2 text-green-800">
                <li>✅ Frontend Next.js: OK</li>
                <li>✅ Vercel Deploy: OK</li>
                <li>✅ Região: São Paulo (GRU1)</li>
                <li>✅ 72 arquivos no repositório</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <a
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Ver Dashboard
            </a>
            <a
              href="https://github.com/NeresFocus/ai-agent-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Deploy Rápido</h3>
            <p className="text-gray-600">
              Site no ar em minutos com Vercel
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-gray-600">
              Next.js 14 com Edge Runtime
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold mb-2">Seguro</h3>
            <p className="text-gray-600">
              HTTPS automático e proteção DDoS
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">📚 Próximos Passos</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Explore o dashboard: <a href="/dashboard" className="text-indigo-600 hover:underline">/dashboard</a></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Configure o backend (Railway/AWS)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Adicione suas chaves API (OpenAI, Stripe)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Personalize o design</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span>Lance para produção!</span>
            </li>
          </ol>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p className="mb-4">
            Built with ❤️ using Next.js, Tailwind CSS, and Vercel
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/NeresFocus/ai-agent-builder" className="text-indigo-600 hover:underline">
              GitHub
            </a>
            <a href="https://github.com/NeresFocus/ai-agent-builder/blob/main/docs/API.md" className="text-indigo-600 hover:underline">
              Documentação
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
