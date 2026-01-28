'use client'

import { useState, useMemo } from 'react'
import { projects, projectCategories } from '@/data/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Search } from 'lucide-react'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || project.categories.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Discover Projects
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Explore amazing projects built with vibecoding. Get inspired, learn, and build.
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

          {/* Results count */}
          <div className="mt-4 text-sm text-zinc-500">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-zinc-500">No projects found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
