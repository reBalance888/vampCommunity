'use client'

import { projects } from '@/data/projects'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

export function RecentActivity() {
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <section className="border-y border-white/5 bg-vamp-dark/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="animate-pulse">🔴</span>
            <span>Recent Submissions</span>
          </h3>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-vamp-purple/50 transition-all group"
              >
                <div className="text-2xl">
                  {project.categories.includes('ai') ? '🤖' :
                   project.categories.includes('creative') ? '🎨' :
                   project.categories.includes('saas') ? '💼' : '🚀'}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate group-hover:text-vamp-purple transition-colors">
                    {project.title}
                  </p>
                  <p className="text-sm text-zinc-500">
                    by @{project.author.twitter}
                  </p>
                </div>

                <div className="text-xs text-zinc-600 whitespace-nowrap">
                  {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/projects"
              className="text-sm text-vamp-purple hover:text-vamp-fuchsia transition-colors"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
