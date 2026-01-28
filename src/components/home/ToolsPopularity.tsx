'use client'

import { projects } from '@/data/projects'
import { useMemo } from 'react'

export function ToolsPopularity() {
  const toolsData = useMemo(() => {
    const toolCounts: { [key: string]: number } = {}

    projects.forEach(project => {
      project.tools.forEach(tool => {
        toolCounts[tool] = (toolCounts[tool] || 0) + 1
      })
    })

    const sorted = Object.entries(toolCounts)
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    const maxCount = sorted[0]?.count || 1
    return sorted.map(item => ({
      ...item,
      percentage: (item.count / maxCount) * 100
    }))
  }, [])

  return (
    <section className="border-y border-white/5 bg-gradient-to-b from-vamp-dark/50 to-transparent">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Most Popular Tools
            </h2>
            <p className="text-zinc-400 text-lg">
              What vibecoders are building with
            </p>
          </div>

          <div className="space-y-4">
            {toolsData.map((item, index) => (
              <div key={item.tool} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gradient">
                      #{index + 1}
                    </span>
                    <span className="text-white font-medium">
                      {item.tool}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {item.count} {item.count === 1 ? 'project' : 'projects'}
                  </span>
                </div>

                <div className="h-3 bg-vamp-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-vamp-purple to-vamp-fuchsia rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-600">
              Based on {projects.length} vibecoded projects
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
