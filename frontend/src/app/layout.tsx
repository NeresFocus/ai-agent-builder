import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Agent Builder - Create Intelligent AI Agents',
  description: 'Build, manage, and monetize AI agents with our powerful white-label platform',
  keywords: ['AI', 'Agent Builder', 'White Label', 'OpenAI', 'Automation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
