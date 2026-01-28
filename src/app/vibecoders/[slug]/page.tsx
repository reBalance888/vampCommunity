import { notFound } from 'next/navigation'
import Link from 'next/link'
import { vibecoders } from '@/data/vibecoders'
import { projects } from '@/data/projects'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Twitter, Github, Globe, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return vibecoders.map((coder) => ({
    slug: coder.slug,
  }))
}

export default function VibecoderPage({ params }: { params: { slug: string } }) {
  const vibecoder = vibecoders.find(v => v.slug === params.slug)

  if (!vibecoder) {
    notFound()
  }

  // Find projects by this vibecoder
  const vibecoderProjects = projects.filter(p => p.author.slug === vibecoder.slug)

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/vibecoders"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vibecoders
        </Link>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 space-y-6">
            {/* Avatar & Name */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 ring-4 ring-vamp-purple/30">
                <AvatarImage src={vibecoder.avatar} alt={vibecoder.name} />
                <AvatarFallback className="text-4xl">
                  {vibecoder.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {vibecoder.name}
                  </h1>
                  <p className="text-xl text-zinc-400">@{vibecoder.twitter}</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <a
                    href={`https://twitter.com/${vibecoder.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-vamp-dark hover:bg-zinc-800 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  {vibecoder.github && (
                    <a
                      href={`https://github.com/${vibecoder.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-vamp-dark hover:bg-zinc-800 transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {vibecoder.website && (
                    <a
                      href={vibecoder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-vamp-dark hover:bg-zinc-800 transition-colors"
                    >
                      <Globe className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-lg text-zinc-300">{vibecoder.bio}</p>
            </div>

            {/* Specialties */}
            <div className="pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {vibecoder.specialties.map(specialty => (
                  <Badge key={specialty} variant="default">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div className="text-center p-4 rounded-lg bg-vamp-dark">
                <p className="text-3xl font-bold text-gradient mb-1">
                  {vibecoder.projectCount}
                </p>
                <p className="text-sm text-zinc-400">Projects</p>
              </div>
              {vibecoder.featured && (
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-vamp-purple/20 to-vamp-fuchsia/20 border border-vamp-purple/30">
                  <p className="text-2xl mb-1">⭐</p>
                  <p className="text-sm text-zinc-300 font-semibold">Featured Vibecoder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      {vibecoderProjects.length > 0 && (
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Projects by {vibecoder.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vibecoderProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
