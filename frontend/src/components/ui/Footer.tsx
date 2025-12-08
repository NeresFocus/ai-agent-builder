"use client"
import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Agent Builder — Built with ❤️
      </div>
    </footer>
  )
}
