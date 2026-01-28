import { cn } from '@/lib/utils'

interface ShimmerSkeletonProps {
  className?: string
}

export function ShimmerSkeleton({ className }: ShimmerSkeletonProps) {
  return (
    <div className={cn(
      'relative overflow-hidden bg-zinc-800/50 rounded',
      className
    )}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
