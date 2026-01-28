import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ExternalLink, Github, Twitter, ArrowLeft } from 'lucide-react'
import { SimilarProjects } from '@/components/projects/SimilarProjects'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CopyLinkButton } from '@/components/projects/CopyLinkButton'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vamp-community.vercel.app'
  const projectUrl = `${siteUrl}/projects/${project.slug}`

  return {
    title: `${project.title} - Vamp Community`,
    description: project.description,
    keywords: [
      'vibecoding',
      'AI development',
      project.title,
      ...project.tools,
      ...project.categories,
    ],
    openGraph: {
      title: `${project.title} - Built with Vibecoding 🦇`,
      description: `${project.description} | Built with ${project.tools.slice(0, 2).join(', ')}`,
      url: projectUrl,
      siteName: 'Vamp Community',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} 🦇`,
      description: `${project.description} | Built with ${project.tools.slice(0, 2).join(', ')}`,
      images: [project.image],
      creator: `@${project.author.twitter}`,
      site: '@KSimback',
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-vamp-darker">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <Breadcrumbs items={[
          { label: 'Projects', href: '/projects' },
          { label: project.title }
        ]} />
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {project.featured && (
            <div className="absolute top-6 left-6">
              <Badge className="bg-gradient-to-r from-vamp-purple to-vamp-fuchsia border-0 text-lg px-4 py-2">
                🔥 Featured Project
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gradient">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-300">
              {project.description}
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {project.categories.map(category => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </Button>
            {project.links.twitter && (
              <Button variant="ghost" asChild>
                <a
                  href={project.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </Button>
            )}
            <CopyLinkButton />
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-white">About This Project</h2>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          {/* Tools */}
          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Built With</h2>
            <div className="flex flex-wrap gap-3">
              {project.tools.map(tool => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-lg bg-vamp-purple/10 text-vamp-purple border border-vamp-purple/20 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Created By</h2>
            <Link
              href={`/vibecoders/${project.author.slug}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-16 h-16">
                <AvatarImage src={project.author.avatar} alt={project.author.name} />
                <AvatarFallback className="text-xl">
                  {project.author.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-white">{project.author.name}</p>
                <p className="text-zinc-400">@{project.author.twitter}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Projects */}
      <SimilarProjects currentProject={project} maxResults={3} />
    </div>
  )
}
