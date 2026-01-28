'use client'

import { Project } from '@/types'
import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

interface SimilarProjectsProps {
  currentProject: Project
  maxResults?: number
}

export function SimilarProjects({ currentProject, maxResults = 3 }: SimilarProjectsProps) {
  const similarProjects = projects
    .filter(p => p.id !== currentProject.id)
    .map(project => {
      let score = 0

      const categoryOverlap = project.categories.filter(cat =>
        currentProject.categories.includes(cat)
      ).length
      score += categoryOverlap * 10

      const toolOverlap = project.tools.filter(tool =>
        currentProject.tools.includes(tool)
      ).length
      score += toolOverlap * 5

      if (project.author.slug === currentProject.author.slug) {
        score += 3
      }

      if (project.featured) {
        score += 2
      }

      return { project, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.project)

  if (similarProjects.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <span>🔗</span>
          <span>Similar Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
