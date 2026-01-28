import Link from 'next/link'
import { projects } from '@/data/projects'
import { grants } from '@/data/grants'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Code2, Trophy } from 'lucide-react'

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)
  const activeGrant = grants.find(g => g.status === 'active')

  return (
    <main className="min-h-screen bg-vamp-darker">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-vamp-purple/20 via-transparent to-transparent blur-3xl" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Sparkles className="w-4 h-4 text-vamp-purple" />
              <span className="text-zinc-300">Product Hunt for Vibecoding</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gradient">Where Vibecoders</span>
              <br />
              <span className="text-white">Learn, Build & Earn</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              The home for vibecoded projects. Discover what&apos;s possible when AI meets creativity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg">
                <Link href="/projects" className="inline-flex items-center gap-2">
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resources">
                  Start Learning
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-gradient">{projects.length}+</p>
                <p className="text-sm text-zinc-500">Projects</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-gradient">
                  ${grants.reduce((sum, g) => sum + g.amount, 0) / 1000}K+
                </p>
                <p className="text-sm text-zinc-500">in Grants</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-gradient">50+</p>
                <p className="text-sm text-zinc-500">Vibecoders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Grant CTA */}
      {activeGrant && (
        <section className="border-y border-white/5 bg-gradient-to-r from-vamp-purple/10 to-vamp-fuchsia/10">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Active Now
                  </div>
                  <h2 className="text-3xl font-bold text-white">{activeGrant.title}</h2>
                  <p className="text-zinc-400">{activeGrant.description}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold text-gradient">
                        ${activeGrant.amount.toLocaleString()} {activeGrant.currency}
                      </p>
                      <p className="text-sm text-zinc-500">Prize Pool</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button size="lg" asChild>
                    <Link href="/grants" className="inline-flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <span>🔥</span>
              <span>Featured This Week</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Amazing projects built with vibecoding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/projects" className="inline-flex items-center gap-2">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-white/5 bg-vamp-dark/50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">How It Works</h2>
              <p className="text-lg text-zinc-400">
                Your journey to vibecoding success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass rounded-2xl p-8 text-center space-y-4 hover:border-vamp-purple/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vamp-purple to-vamp-fuchsia mx-auto flex items-center justify-center text-3xl">
                  📚
                </div>
                <h3 className="text-2xl font-bold text-white">1. Learn</h3>
                <p className="text-zinc-400">
                  Master vibecoding with curated resources, tutorials, and tools from the best in the field.
                </p>
                <Button variant="ghost" asChild>
                  <Link href="/resources">Browse Resources →</Link>
                </Button>
              </div>

              {/* Step 2 */}
              <div className="glass rounded-2xl p-8 text-center space-y-4 hover:border-vamp-purple/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vamp-purple to-vamp-fuchsia mx-auto flex items-center justify-center text-3xl">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-white">2. Build</h3>
                <p className="text-zinc-400">
                  Create amazing projects with AI assistance. Ship fast and iterate based on community feedback.
                </p>
                <Button variant="ghost" asChild>
                  <Link href="/projects">See Projects →</Link>
                </Button>
              </div>

              {/* Step 3 */}
              <div className="glass rounded-2xl p-8 text-center space-y-4 hover:border-vamp-purple/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vamp-purple to-vamp-fuchsia mx-auto flex items-center justify-center text-3xl">
                  💰
                </div>
                <h3 className="text-2xl font-bold text-white">3. Earn</h3>
                <p className="text-zinc-400">
                  Apply for grants, get discovered by sponsors, and monetize your vibecoded projects.
                </p>
                <Button variant="ghost" asChild>
                  <Link href="/grants">View Grants →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-12 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Ready to Start Vibecoding?
          </h2>
          <p className="text-xl text-zinc-400">
            Join the community of builders shaping the future of development with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects" className="inline-flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Explore Projects
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/vibecoders">
                Meet Vibecoders
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
