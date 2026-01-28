'use client'

import { useState, useMemo } from 'react'
import { vibecoders } from '@/data/vibecoders'
import { VibecoderCard } from '@/components/vibecoders/VibecoderCard'
import { Search } from 'lucide-react'

export default function VibeccodersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVibecoders = useMemo(() => {
    return vibecoders.filter(coder => {
      const matchesSearch =
        coder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coder.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coder.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSearch
    })
  }, [searchQuery])

  const featuredVibecoders = filteredVibecoders.filter(v => v.featured)
  const regularVibecoders = filteredVibecoders.filter(v => !v.featured)

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Vibecoders
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Meet the builders shaping the future of development with AI.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="border-b border-white/5 sticky top-0 bg-vamp-darker/95 backdrop-blur-xl z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vibecoders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-vamp-dark border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>
          <div className="mt-4 text-sm text-zinc-500">
            {filteredVibecoders.length} {filteredVibecoders.length === 1 ? 'vibecoder' : 'vibecoders'} found
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Featured */}
        {featuredVibecoders.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <span>⭐</span> Featured Vibecoders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVibecoders.map(coder => (
                <VibecoderCard key={coder.id} vibecoder={coder} />
              ))}
            </div>
          </section>
        )}

        {/* All */}
        {regularVibecoders.length > 0 && (
          <section>
            {featuredVibecoders.length > 0 && (
              <h2 className="text-3xl font-bold text-white mb-8">All Vibecoders</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularVibecoders.map(coder => (
                <VibecoderCard key={coder.id} vibecoder={coder} />
              ))}
            </div>
          </section>
        )}

        {filteredVibecoders.length === 0 && (
          <div className="text-center py-20 space-y-6">
            <div className="text-8xl">💻</div>
            <div>
              <p className="text-2xl text-white font-bold mb-2">
                No vibecoders found
              </p>
              <p className="text-zinc-400 text-lg">
                Adjust your search or browse all builders
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 border-2 border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 rounded-lg text-sm font-medium transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
