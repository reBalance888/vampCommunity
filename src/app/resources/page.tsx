'use client'

import { useState, useMemo } from 'react'
import { resources, resourceCategories } from '@/data/resources'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { Search } from 'lucide-react'

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Curated guides, tools, and tutorials to master vibecoding. Start learning today.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="border-b border-white/5 sticky top-0 bg-vamp-darker/95 backdrop-blur-xl z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-vamp-dark border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {resourceCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-vamp-purple to-vamp-fuchsia text-white'
                    : 'bg-vamp-dark text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-zinc-500">
            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="container mx-auto px-4 py-12">
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="text-8xl">📚</div>
            <div>
              <p className="text-2xl text-white font-bold mb-2">
                No resources match your search
              </p>
              <p className="text-zinc-400 text-lg">
                Try broader terms or explore all categories
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-6 py-2 border-2 border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 rounded-lg text-sm font-medium transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
