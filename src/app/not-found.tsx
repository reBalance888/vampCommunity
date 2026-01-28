import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-vamp-darker flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Vamp emoji */}
        <div className="text-8xl">🦇</div>

        {/* 404 */}
        <div>
          <h1 className="text-8xl font-bold text-gradient">404</h1>
          <p className="text-2xl font-semibold text-white mt-2">
            This vibecoder flew away
          </p>
          <p className="text-zinc-400 mt-3">
            Looks like this page doesn&apos;t exist. Maybe it was vibecoded incorrectly.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects" className="inline-flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse Projects
            </Link>
          </Button>
        </div>

        {/* Fun tip */}
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-zinc-400">
            💡 <span className="text-zinc-300 font-medium">Pro tip:</span> Use keyboard shortcuts on the projects page. Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">J</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">K</kbd> to navigate and <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">U</kbd> to upvote.
          </p>
        </div>
      </div>
    </main>
  )
}
