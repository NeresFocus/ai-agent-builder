import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Providers from '@/lib/providers'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Agent Builder - Create Intelligent AI Agents',
  description:
    'Build, manage, and monetize AI agents with our powerful white-label platform',
  keywords: ['AI', 'Agent Builder', 'White Label', 'OpenAI', 'Automation'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
