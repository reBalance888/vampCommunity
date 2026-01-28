'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ExternalLink, Github, Trophy } from 'lucide-react'
import { useVotes } from '@/hooks/useVotes'
import { UpvoteButton } from '@/components/ui/upvote-button'

interface ProductOfTheDayProps {
  project: Project
}

export function ProductOfTheDay({ project }: ProductOfTheDayProps) {
  const { votes, hasVoted, upvote, isLoading } = useVotes(
    project.id,
    project.initialVotes || 0
  )

  return (
    <section className="border-b border-white/5 bg-gradient-to-br from-vamp-purple/5 via-transparent to-vamp-fuchsia/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">Product of the Day</h2>
          </div>

          {/* Product Card */}
          <div className="glass rounded-2xl overflow-hidden glow-hover">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Left: Upvote */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <UpvoteButton
                  votes={votes}
                  hasVoted={hasVoted}
                  onUpvote={upvote}
                  isLoading={isLoading}
                  size="lg"
                />
              </div>

              {/* Center: Content */}
              <div className="flex-1 space-y-4">
                <Link href={`/projects/${project.slug}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white hover:text-vamp-purple transition-colors">
                      {project.title}
                    </h3>
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      #1
                    </Badge>
                  </div>
                  <p className="text-lg text-zinc-300 mb-4">
                    {project.description}
                  </p>
                </Link>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <span
                      key={tool}
                      className="text-sm px-3 py-1 rounded-lg bg-vamp-purple/10 text-vamp-purple border border-vamp-purple/20"
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
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={project.author.avatar} alt={project.author.name} />
                      <AvatarFallback>{project.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{project.author.name}</p>
                      <p className="text-xs text-zinc-500">@{project.author.twitter}</p>
                    </div>
                  </Link>

                  {/* Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-vamp-purple hover:bg-vamp-purple/80 text-white transition-colors inline-flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      title="View Code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <Link href={`/projects/${project.slug}`} className="flex-shrink-0">
                <div className="relative w-full md:w-64 h-48 md:h-full rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
