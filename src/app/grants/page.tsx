import { grants } from '@/data/grants'
import { GrantCard } from '@/components/grants/GrantCard'

export default function GrantsPage() {
  const activeGrants = grants.filter(g => g.status === 'active')
  const upcomingGrants = grants.filter(g => g.status === 'upcoming')

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Vamp Grants
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Earn funding for your vibecoded projects. Build amazing things and get rewarded.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Active Grants */}
        {activeGrants.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <span>🔥</span> Active Grants
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeGrants.map(grant => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Grants */}
        {upcomingGrants.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <span>⏳</span> Upcoming Grants
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingGrants.map(grant => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
          </section>
        )}

        {/* Sponsor CTA */}
        <section className="glass rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Want to Sponsor a Grant?</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Help grow the vibecoding community by sponsoring grants. Reach out to discuss opportunities.
          </p>
          <a
            href="https://twitter.com/KSimback"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-vamp-purple to-vamp-fuchsia hover:opacity-90 transition-opacity"
          >
            Contact @KSimback
          </a>
        </section>
      </div>
    </div>
  )
}
