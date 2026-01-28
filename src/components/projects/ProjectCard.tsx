'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useVotes } from '@/hooks/useVotes'
import { UpvoteButton } from '@/components/ui/upvote-button'
import { ShareButton } from '@/components/ui/share-button'
import { Tooltip } from '@/components/ui/tooltip'

interface ProjectCardProps {
  project: Project
  isFocused?: boolean
  dataIndex?: number
  searchQuery?: string
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-vamp-purple/30 text-vamp-purple rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function ProjectCard({ project, isFocused = false, dataIndex, searchQuery = '' }: ProjectCardProps) {
  const { votes, hasVoted, upvote, isLoading } = useVotes(
    project.id,
    project.initialVotes || 0
  )

  return (
    <div
      className={cn(
        'group glass rounded-2xl overflow-hidden transition-all duration-300',
        'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
        'hover:-translate-y-1',
        'hover:border-vamp-purple/30',
        isFocused && 'ring-2 ring-vamp-purple ring-offset-2 ring-offset-transparent'
      )}
      data-project-index={dataIndex}
    >
      <div className="flex gap-4 p-4">
        {/* Upvote Button */}
        <div className="flex-shrink-0">
          <Tooltip content="Upvote this project">
            <UpvoteButton
              votes={votes}
              hasVoted={hasVoted}
              onUpvote={upvote}
              isLoading={isLoading}
              size="md"
            />
          </Tooltip>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title & Description */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-lg font-semibold text-white group-hover:text-vamp-purple transition-colors">
              {highlightText(project.title, searchQuery)}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
              {highlightText(project.description, searchQuery)}
            </p>
          </Link>

          {/* Tools & Categories */}
          <div className="flex flex-wrap gap-2">
            {project.tools.slice(0, 3).map(tool => (
              <span
                key={tool}
                className="text-xs px-2 py-0.5 rounded-md bg-vamp-purple/10 text-vamp-purple border border-vamp-purple/20"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Author */}
            <Link
              href={`/vibecoders/${project.author.slug}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={project.author.avatar} alt={project.author.name} />
                <AvatarFallback>{project.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-zinc-400">@{project.author.twitter}</span>
            </Link>

            {/* Links & Badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-zinc-500 mr-2">
                <Eye className="w-3 h-3" />
                <span>{Math.floor((project.initialVotes || 0) * 3.7)} views</span>
              </div>
              {project.featured && (
                <Badge className="bg-gradient-to-r from-vamp-purple to-vamp-fuchsia border-0 text-xs">
                  🔥 Featured
                </Badge>
              )}
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                title="View Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
              </a>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                title="View Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
              </a>
              <ShareButton
                title={project.title}
                url={`/projects/${project.slug}`}
              />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <Link href={`/projects/${project.slug}`} className="flex-shrink-0 hidden md:block">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
