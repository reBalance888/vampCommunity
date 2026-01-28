import Link from 'next/link'
import { Twitter, Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-vamp-darker">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">Vamp</span>
            </Link>
            <p className="text-sm text-zinc-500">
              Product Hunt for vibecoding. Learn. Build. Earn.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/KSimback"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Twitter className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Github className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/vibecoders" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Vibecoders
                </Link>
              </li>
              <li>
                <Link href="/grants" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Grants
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <a
                  href="https://claude.ai/code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Claude Code
                </a>
              </li>
              <li>
                <a
                  href="https://cursor.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Cursor
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/KSimback"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-600 mb-4">
            🔒 <span className="text-zinc-500 font-medium">Privacy First:</span> Your votes are stored
            locally in your browser only. Zero data collection. Zero tracking. Zero servers.
          </p>
        </div>

        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {currentYear} Vamp Community. Built with vibecoding.
          </p>
          <p className="text-xs text-zinc-600">
            Made with ❤️ using Claude Code
          </p>
        </div>
      </div>
    </footer>
  )
}
