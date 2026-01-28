'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/projects', label: 'Projects' },
    { href: '/resources', label: 'Resources' },
    { href: '/grants', label: 'Grants' },
    { href: '/vibecoders', label: 'Vibecoders' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-vamp-darker/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">Vamp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild variant="outline">
              <Link href="/grants">Apply for Grant</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <nav className="flex flex-col gap-4">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="outline" className="mt-2">
                <Link href="/grants">Apply for Grant</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
