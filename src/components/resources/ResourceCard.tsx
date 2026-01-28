'use client'

import { Resource } from '@/types'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Video, FileText, Wrench, Twitter, BookOpen, Bookmark } from 'lucide-react'

interface ResourceCardProps {
  resource: Resource
  onToggleBookmark?: (id: string) => void
  isBookmarked?: boolean
}

const typeIcons = {
  article: FileText,
  video: Video,
  tool: Wrench,
  thread: Twitter,
  course: BookOpen,
}

export function ResourceCard({ resource, onToggleBookmark, isBookmarked = false }: ResourceCardProps) {
  const TypeIcon = typeIcons[resource.type] || FileText

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass rounded-xl p-6 hover:border-vamp-purple/50 transition-all glow-hover group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-3 rounded-lg ${
          resource.featured
            ? 'bg-gradient-to-br from-vamp-purple to-vamp-fuchsia'
            : 'bg-vamp-dark'
        }`}>
          {resource.icon ? (
            <span className="text-2xl">{resource.icon}</span>
          ) : (
            <TypeIcon className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-vamp-purple transition-colors mb-1 flex items-center gap-2">
                {resource.title}
                {resource.featured && <span className="text-sm">🔥</span>}
              </h3>
              <p className="text-sm text-zinc-400">
                {resource.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onToggleBookmark && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onToggleBookmark(resource.id)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-vamp-purple text-white'
                      : 'hover:bg-white/5 text-zinc-500'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              )}
              <ExternalLink className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {resource.type}
            </Badge>
            {resource.author && (
              <span className="text-xs text-zinc-500">{resource.author}</span>
            )}
            {resource.duration && (
              <span className="text-xs text-zinc-500">⏱ {resource.duration}</span>
            )}
            {resource.free && (
              <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                Free
              </Badge>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
