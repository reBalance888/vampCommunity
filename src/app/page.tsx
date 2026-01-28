export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="inline-block">
            <h1 className="text-7xl font-bold tracking-tight">
              <span className="text-gradient">Vamp</span>{" "}
              <span className="text-white">Community</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-4xl font-semibold text-zinc-300">
            Learn. Build. Earn.
          </p>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Product Hunt for vibecoding. Share your AI-powered projects,
            discover the best resources, and compete for grants.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-vamp vamp-glow-hover transition-all hover:scale-105">
              Submit Your Project
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all">
              Explore Projects
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-gradient">150+</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-gradient">$50K+</p>
              <p className="text-sm text-muted-foreground">in Grants</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-gradient">1,000+</p>
              <p className="text-sm text-muted-foreground">Vibecoders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 glass rounded-2xl space-y-4 hover:border-violet-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-vamp flex items-center justify-center text-2xl">
              🚀
            </div>
            <h3 className="text-2xl font-bold">Launch Projects</h3>
            <p className="text-muted-foreground">
              Share your vibecoded projects with the community and get instant feedback.
            </p>
          </div>

          <div className="p-8 glass rounded-2xl space-y-4 hover:border-violet-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-vamp flex items-center justify-center text-2xl">
              📚
            </div>
            <h3 className="text-2xl font-bold">Learn & Grow</h3>
            <p className="text-muted-foreground">
              Access curated resources, tutorials, and tools to master vibecoding.
            </p>
          </div>

          <div className="p-8 glass rounded-2xl space-y-4 hover:border-violet-500/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-vamp flex items-center justify-center text-2xl">
              💰
            </div>
            <h3 className="text-2xl font-bold">Win Grants</h3>
            <p className="text-muted-foreground">
              Compete in challenges and grants to earn funding for your ideas.
            </p>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="container mx-auto px-4 py-12 text-center text-muted-foreground border-t border-zinc-800">
        <p>Vamp Community © 2026 - Built with vibecoding</p>
      </footer>
    </main>
  )
}
