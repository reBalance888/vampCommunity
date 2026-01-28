'use client'

import { vibecoders } from '@/data/vibecoders'
import { projects } from '@/data/projects'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Trophy, TrendingUp } from 'lucide-react'

export function LeaderboardSection() {
  const leaderboard = vibecoders
    .map(coder => {
      const coderProjects = projects.filter(p => p.author.slug === coder.slug)
      const totalVotes = coderProjects.reduce((sum, p) => sum + (p.initialVotes || 0), 0)
      const avgVotes = coderProjects.length > 0 ? Math.round(totalVotes / coderProjects.length) : 0

      return {
        ...coder,
        totalProjects: coderProjects.length,
        totalVotes,
        avgVotes
      }
    })
    .filter(coder => coder.totalProjects > 0)
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5)

  if (leaderboard.length === 0) return null

  return (
    <section className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span>Top Contributors</span>
      </h2>

      <div className="space-y-4">
        {leaderboard.map((coder, index) => (
          <Link
            key={coder.id}
            href={`/vibecoders/${coder.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className={`text-2xl font-bold ${
              index === 0 ? 'text-yellow-500' :
              index === 1 ? 'text-zinc-400' :
              index === 2 ? 'text-orange-600' :
              'text-zinc-600'
            }`}>
              #{index + 1}
            </div>

            <Avatar className="w-12 h-12">
              <AvatarImage src={coder.avatar} alt={coder.name} />
              <AvatarFallback>{coder.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate group-hover:text-vamp-purple transition-colors">
                {coder.name}
              </p>
              <p className="text-sm text-zinc-500">
                {coder.totalProjects} {coder.totalProjects === 1 ? 'project' : 'projects'} · {coder.totalVotes} votes
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <TrendingUp className="w-4 h-4" />
              <span>{coder.avgVotes} avg</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/vibecoders"
          className="text-sm text-vamp-purple hover:text-vamp-fuchsia transition-colors"
        >
          View all vibecoders →
        </Link>
      </div>
    </section>
  )
}
