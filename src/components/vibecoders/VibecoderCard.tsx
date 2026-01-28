import Link from 'next/link'
import { Vibecoder } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Twitter, Github, Globe } from 'lucide-react'

interface VibecoderCardProps {
  vibecoder: Vibecoder
}

export function VibecoderCard({ vibecoder }: VibecoderCardProps) {
  return (
    <Link href={`/vibecoders/${vibecoder.slug}`}>
      <div className="glass rounded-2xl p-6 hover:border-vamp-purple/50 transition-all glow-hover group">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="w-20 h-20 mb-4 ring-2 ring-vamp-purple/30">
            <AvatarImage src={vibecoder.avatar} alt={vibecoder.name} />
            <AvatarFallback className="text-2xl">
              {vibecoder.name[0]}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold text-white group-hover:text-vamp-purple transition-colors">
            {vibecoder.name}
          </h3>
          <p className="text-sm text-zinc-500">@{vibecoder.twitter}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
          {vibecoder.bio}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {vibecoder.specialties.slice(0, 3).map(specialty => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 py-3 border-t border-white/5 text-sm text-zinc-400">
          <span>{vibecoder.projectCount} projects</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/5">
          <a
            href={`https://twitter.com/${vibecoder.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Twitter className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
          </a>
          {vibecoder.github && (
            <a
              href={`https://github.com/${vibecoder.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </a>
          )}
          {vibecoder.website && (
            <a
              href={vibecoder.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </a>
          )}
        </div>
      </div>
    </Link>
  )
}
