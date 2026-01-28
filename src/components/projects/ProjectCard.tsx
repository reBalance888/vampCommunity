import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group glass rounded-2xl overflow-hidden glow-hover">
      {/* Image */}
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-vamp-purple to-vamp-fuchsia border-0">
                🔥 Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-vamp-dark/80 to-transparent opacity-60" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Description */}
        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-lg font-semibold text-white group-hover:text-vamp-purple transition-colors mb-2">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-zinc-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {project.categories.slice(0, 3).map(category => (
            <Badge
              key={category}
              variant="secondary"
              className="text-xs"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map(tool => (
            <span
              key={tool}
              className="text-xs px-2 py-1 rounded-md bg-vamp-purple/10 text-vamp-purple border border-vamp-purple/20"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          {/* Author */}
          <Link
            href={`/vibecoders/${project.author.slug}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-zinc-400">@{project.author.twitter}</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              title="View Demo"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              title="View Code"
            >
              <Github className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
