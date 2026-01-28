'use client'

import { useEffect, useState } from 'react'
import { X, Keyboard } from 'lucide-react'

export function KeyboardShortcutsToast() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('vamp-keyboard-hint')
    if (!hasSeenHint) {
      setTimeout(() => setShow(true), 2000)
    }
  }, [])

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('vamp-keyboard-hint', 'true')
  }

  if (!show) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-5">
      <div className="glass rounded-xl p-4 max-w-sm shadow-2xl border-vamp-purple/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Keyboard className="w-5 h-5 text-vamp-purple flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium mb-1">💡 Pro Tip</p>
              <p className="text-sm text-zinc-400">
                Use{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 mx-0.5">J</kbd>
                {' '}/{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 mx-0.5">K</kbd>
                {' '}to navigate,{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 mx-0.5">U</kbd>
                {' '}to upvote
              </p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
