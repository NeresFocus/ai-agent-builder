export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
			<div className="text-center">
				<h1 className="text-5xl font-bold text-gray-900 mb-4">🤖 AI Agent Builder</h1>
				<p className="text-xl text-gray-600 mb-8">Plataforma para criar e gerenciar agentes de IA</p>
				<div className="flex gap-4 justify-center">
					<button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
						Começar
					</button>
					<button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
						Documentação
					</button>
				</div>
			</div>
		</main>
	)
}
