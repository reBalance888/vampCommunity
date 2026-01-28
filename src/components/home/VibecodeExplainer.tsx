'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

export function VibecodeExplainer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        <span>What is vibecoding?</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 p-5 glass rounded-xl space-y-3 text-left animate-in fade-in">
          <p className="text-sm text-zinc-300">
            <span className="text-vamp-purple font-semibold">Vibecoding</span> is building software by
            describing what you want to AI coding assistants — Claude Code, Cursor, v0, Bolt.new —
            and letting them generate the code for you.
          </p>
          <p className="text-sm text-zinc-400">
            Instead of writing every line manually, you communicate your vision in natural language.
            The AI handles the implementation. You focus on the idea, the product, the user experience.
          </p>
          <div className="pt-3 border-t border-white/5">
            <p className="text-xs text-zinc-500">
              🚀 Thousands of builders are shipping apps, tools, and products this way.
              Welcome to the movement.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
