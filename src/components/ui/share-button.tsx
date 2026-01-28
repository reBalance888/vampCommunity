'use client'

import { useState, useCallback } from 'react'
import { Share2, Check, Twitter, Link } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  url: string
  className?: string
}

export function ShareButton({ title, url, className }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const absoluteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = absoluteUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setShowMenu(false)
  }, [absoluteUrl])

  const handleTwitterShare = useCallback(() => {
    const text = `🦇 Check out "${title}" on Vamp Community — vibecoded projects!`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(absoluteUrl)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    setShowMenu(false)
  }, [title, absoluteUrl])

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowMenu(!showMenu)
        }}
        className={cn(
          'p-1.5 rounded-lg hover:bg-white/5 transition-colors',
          className
        )}
        title="Share"
      >
        <Share2 className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-1 z-50 bg-vamp-dark border border-white/10 rounded-lg shadow-xl min-w-[160px]">
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              Share on X
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4 text-zinc-400" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
