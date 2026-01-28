export function ProjectSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden p-4 animate-pulse">
      <div className="flex gap-4">
        {/* Upvote skeleton */}
        <div className="flex-shrink-0">
          <div className="w-14 h-20 bg-zinc-800 rounded-lg" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="h-6 bg-zinc-800 rounded w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-zinc-800 rounded w-5/6" />
          </div>

          {/* Tools */}
          <div className="flex gap-2">
            <div className="h-6 bg-zinc-800 rounded w-20" />
            <div className="h-6 bg-zinc-800 rounded w-24" />
            <div className="h-6 bg-zinc-800 rounded w-20" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-zinc-800 rounded-full" />
              <div className="h-3 bg-zinc-800 rounded w-20" />
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-zinc-800 rounded" />
              <div className="w-6 h-6 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="hidden md:block flex-shrink-0 w-24 h-24 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  )
}
