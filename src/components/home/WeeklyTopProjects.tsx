'use client'

import { useMemo } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'

export function WeeklyTopProjects() {
  const topWeekly = useMemo(() => {
    // Show top 3 by votes from recent projects (last 30 days for static data)
    const now = new Date()
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const recent = projects
      .filter(p => new Date(p.createdAt) > monthAgo)
      .sort((a, b) => (b.initialVotes || 0) - (a.initialVotes || 0))
      .slice(0, 3)

    // Fallback: if no recent projects, show top 3 overall
    if (recent.length === 0) {
      return projects
        .sort((a, b) => (b.initialVotes || 0) - (a.initialVotes || 0))
        .slice(0, 3)
    }

    return recent
  }, [])

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <span>🔥</span>
            <span>Top Projects This Week</span>
          </h2>
          <p className="text-zinc-400">The community&apos;s favorite vibecoded projects</p>
        </div>

        {/* Top 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topWeekly.map((project, index) => (
            <div key={project.id} className="relative">
              {/* Winner Badge for #1 */}
              {index === 0 && (
                <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg z-10 ring-4 ring-vamp-darker">
                  🏆
                </div>
              )}

              {/* Rank Badge for #2 and #3 */}
              {index > 0 && (
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold text-white shadow-lg z-10 ring-4 ring-vamp-darker">
                  #{index + 1}
                </div>
              )}

              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
