'use client'

import { useState } from 'react'
import { Grant } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Clock, CheckCircle2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ApplyGrantDialog } from './ApplyGrantDialog'

interface GrantCardProps {
  grant: Grant
}

export function GrantCard({ grant }: GrantCardProps) {
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const isActive = grant.status === 'active'
  const timeLeft = grant.deadline ? formatDistanceToNow(new Date(grant.deadline), { addSuffix: true }) : null

  return (
    <>
    <div className={`glass rounded-2xl p-8 space-y-6 ${isActive ? 'border-vamp-purple/30 glow-hover' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-white">{grant.title}</h3>
            {isActive && <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Active</Badge>}
            {grant.status === 'upcoming' && <Badge variant="secondary">Coming Soon</Badge>}
          </div>
          <p className="text-zinc-400">{grant.description}</p>
        </div>
      </div>

      {/* Prize Amount */}
      <div className="text-center py-6 rounded-xl bg-gradient-to-br from-vamp-purple/20 to-vamp-fuchsia/20 border border-vamp-purple/30">
        <p className="text-sm text-zinc-400 mb-2">Prize</p>
        <p className="text-4xl font-bold text-gradient">
          {grant.amount ? `$${grant.amount.toLocaleString()} ${grant.currency}` : 'TBA'}
        </p>
      </div>

      {/* Deadline */}
      {grant.deadline && isActive && (
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Deadline {timeLeft}</span>
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
          {grant.longDescription}
        </p>
      </div>

      {/* Requirements */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-white">Requirements:</p>
        <ul className="space-y-2">
          {grant.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-vamp-purple flex-shrink-0 mt-0.5" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sponsor */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <Avatar className="w-10 h-10">
          <AvatarImage src={grant.sponsor.avatar} alt={grant.sponsor.name} />
          <AvatarFallback>{grant.sponsor.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-zinc-500">Sponsored by</p>
          <p className="text-sm font-semibold text-white">{grant.sponsor.name}</p>
        </div>
      </div>

      {/* Action */}
      {isActive && (
        <Button className="w-full" onClick={() => setIsApplyOpen(true)}>
          Apply for Grant
        </Button>
      )}
    </div>

    {/* Apply Dialog */}
    <ApplyGrantDialog
      isOpen={isApplyOpen}
      onClose={() => setIsApplyOpen(false)}
      grantTitle={grant.title}
    />
    </>
  )
}
