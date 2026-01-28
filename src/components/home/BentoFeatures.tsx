'use client'

import { Sparkles, Zap, Users, Trophy, Search, TrendingUp } from 'lucide-react'

export function BentoFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: 'Smart Discovery',
      description: 'AI-powered project recommendations based on your interests',
      color: 'from-purple-500 to-pink-500',
      size: 'col-span-2 row-span-2'
    },
    {
      icon: TrendingUp,
      title: 'Live Leaderboards',
      description: 'See top contributors and trending projects',
      color: 'from-pink-500 to-orange-500',
      size: 'col-span-1 row-span-1'
    },
    {
      icon: Search,
      title: 'Advanced Filters',
      description: 'Multi-criteria search with tools & date filters',
      color: 'from-blue-500 to-purple-500',
      size: 'col-span-1 row-span-1'
    },
    {
      icon: Users,
      title: 'Community',
      description: '50+ vibecoders building the future',
      color: 'from-green-500 to-teal-500',
      size: 'col-span-1 row-span-1'
    },
    {
      icon: Trophy,
      title: '$5K+ Grants',
      description: 'Compete for funding on your projects',
      color: 'from-yellow-500 to-orange-500',
      size: 'col-span-1 row-span-1'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Upvote and bookmark in real-time',
      color: 'from-purple-500 to-blue-500',
      size: 'col-span-2 row-span-1'
    }
  ]

  return (
    <section className="border-y border-white/5 bg-gradient-to-b from-transparent via-vamp-dark/30 to-transparent">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-zinc-400 text-lg">
              Built for vibecoders, by vibecoders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`${feature.size} glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
