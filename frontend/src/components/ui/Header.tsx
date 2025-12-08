"use client"
import React from 'react'

export default function Header() {
  return (
    <header className="w-full border-b bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">🤖 AI Agent Builder</div>
        <nav>
          <a className="mr-4 text-sm text-gray-600" href="/dashboard">Dashboard</a>
          <a className="mr-4 text-sm text-gray-600" href="/agents">Agents</a>
          <a className="text-sm text-gray-600" href="/settings">Settings</a>
        </nav>
      </div>
    </header>
  )
}
