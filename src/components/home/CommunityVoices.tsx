export function CommunityVoices() {
  const testimonials = [
    {
      text: "Found my next 3 side project ideas just browsing Vamp. This is the vibecoding hub we needed.",
      author: "Alex Chen",
      role: "Indie Hacker",
      avatar: "👨‍💻"
    },
    {
      text: "Submitted my project, got upvoted to Product of the Day, and landed my first 100 users. Game changer.",
      author: "Sarah Kim",
      role: "Solo Founder",
      avatar: "👩‍💻"
    },
    {
      text: "The resource library alone is worth bookmarking. Saved me hours of searching for the right tools.",
      author: "Miguel Santos",
      role: "Student Developer",
      avatar: "🧑‍💻"
    }
  ]

  return (
    <section className="border-y border-white/5 bg-vamp-dark/50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white">Loved by Vibecoders</h2>
            <p className="text-lg text-zinc-400">Join thousands of builders shipping with AI</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass rounded-2xl p-6 space-y-4 hover:border-vamp-purple/30 transition-colors">
                {/* Avatar */}
                <div className="text-5xl">{testimonial.avatar}</div>

                {/* Quote */}
                <p className="text-zinc-300 italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-white/5">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
