'use client'

import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpvoteButtonProps {
  votes: number
  hasVoted: boolean
  onUpvote: () => void
  isLoading?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function UpvoteButton({
  votes,
  hasVoted,
  onUpvote,
  isLoading = false,
  className,
  size = 'md',
}: UpvoteButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-16 gap-0.5',
    md: 'w-14 h-20 gap-1',
    lg: 'w-16 h-24 gap-1',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <button
      data-upvote-btn
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onUpvote()
      }}
      disabled={hasVoted || isLoading}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95',
        sizeClasses[size],
        hasVoted
          ? 'border-orange-500 bg-orange-500/10 text-orange-500'
          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <ChevronUp
        className={cn(
          iconSizes[size],
          'transition-transform',
          hasVoted && 'fill-current'
        )}
      />
      <span className={cn('font-bold leading-none', textSizes[size])}>
        {votes}
      </span>
    </button>
  )
}
