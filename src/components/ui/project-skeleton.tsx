import { ShimmerSkeleton } from './shimmer-skeleton'

export function ProjectSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden p-4">
      <div className="flex gap-4">
        {/* Upvote skeleton */}
        <ShimmerSkeleton className="w-14 h-20 rounded-lg" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          <ShimmerSkeleton className="h-6 w-3/4 rounded" />
          <ShimmerSkeleton className="h-4 w-full rounded" />
          <ShimmerSkeleton className="h-4 w-5/6 rounded" />
          <div className="flex gap-2 pt-2">
            <ShimmerSkeleton className="h-6 w-20 rounded-md" />
            <ShimmerSkeleton className="h-6 w-20 rounded-md" />
            <ShimmerSkeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>

        {/* Thumbnail skeleton */}
        <ShimmerSkeleton className="w-24 h-24 rounded-lg hidden md:block" />
      </div>
    </div>
  )
}
