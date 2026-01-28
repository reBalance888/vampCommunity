'use client'

import { useState, useMemo } from 'react'
import { projects, projectCategories } from '@/data/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { SubmitProjectDialog } from '@/components/submit/SubmitProjectDialog'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { Search, Plus, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes')
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || project.categories.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })

    // Sort by votes or recent
    if (sortBy === 'votes') {
      filtered = filtered.sort((a, b) => (b.initialVotes || 0) - (a.initialVotes || 0))
    } else {
      filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const { focusIndex } = useKeyboardNav({ totalItems: filteredProjects.length })

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-gradient mb-4">
                Discover Projects
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl">
                Explore amazing projects built with vibecoding. Get inspired, learn, and build.
              </p>
            </div>
            <Button
              onClick={() => setIsSubmitDialogOpen(true)}
              size="lg"
              className="hidden md:inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Submit Project
            </Button>
          </div>
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
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-vamp-dark border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-vamp-purple transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {projectCategories.map(category => (
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

          {/* Sort & Results */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-zinc-500">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('votes')}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  sortBy === 'votes'
                    ? 'bg-vamp-purple text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Most Upvoted
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  sortBy === 'recent'
                    ? 'bg-vamp-purple text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Most Recent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How to Submit FAQ */}
      <div className="container mx-auto px-4 pb-6">
        <details className="glass rounded-xl overflow-hidden group">
          <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors">
            <span className="text-white font-medium flex items-center gap-2">
              <span>❓</span>
              <span>How to submit your project</span>
            </span>
            <svg
              className="w-5 h-5 text-zinc-400 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="px-6 pb-6 space-y-4 text-sm">
            <div className="space-y-2">
              <p className="text-white font-medium">Q: How do I submit my project?</p>
              <p className="text-zinc-400">
                Click &quot;Submit Project&quot; → Fill the form → Your email client opens with pre-filled details → Hit send!
                We review within 24-48 hours.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-white font-medium">Q: What projects can I submit?</p>
              <p className="text-zinc-400">
                Any project built with vibecoding tools like Claude Code, Cursor, v0, Bolt, Lovable, etc.
                Must have a public demo link.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-white font-medium">Q: How long until my project appears?</p>
              <p className="text-zinc-400">
                We manually review all submissions within 24-48 hours to ensure quality.
                You&apos;ll see your project live after approval.
              </p>
            </div>
          </div>
        </details>
      </div>

      {/* Projects List */}
      <div className="container mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="text-8xl animate-bounce">🦇</div>

            <div>
              <p className="text-2xl text-white font-bold mb-2">
                {searchQuery ? `No vibes found for "${searchQuery}"` : 'No projects in this category'}
              </p>
              <p className="text-zinc-400 text-lg">
                This bat flew into the wrong cave. Try different keywords?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear All Filters
              </Button>
              <Button onClick={() => setIsSubmitDialogOpen(true)}>
                Submit Your Project Instead
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFocused={focusIndex === index}
                dataIndex={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Legend */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-2 bg-vamp-dark/90 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
          <Keyboard className="w-3.5 h-3.5 text-zinc-500" />
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">J</kbd> <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">K</kbd> navigate</span>
            <span className="text-zinc-700">·</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">U</kbd> upvote</span>
            <span className="text-zinc-700">·</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">Esc</kbd> clear</span>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <SubmitProjectDialog
        isOpen={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
      />
    </div>
  )
}
