export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  author: {
    slug: string
    name: string
    twitter: string
    avatar: string
  }
  categories: string[]
  links: {
    demo: string
    github: string
    twitter?: string
  }
  tools: string[]
  featured: boolean
  createdAt: string
  initialVotes?: number
}

export interface Resource {
  id: string
  title: string
  description: string
  category: 'getting-started' | 'tools' | 'tutorials' | 'articles' | 'twitter' | 'tips'
  type: 'article' | 'video' | 'tool' | 'thread' | 'course'
  url: string
  author?: string
  duration?: string
  icon?: string
  featured?: boolean
  free?: boolean
}

export interface Grant {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  amount?: number
  currency?: string
  status: 'active' | 'upcoming' | 'completed'
  deadline?: string
  requirements: string[]
  submitUrl?: string
  sponsor: {
    name: string
    twitter: string
    avatar: string
  }
  winner?: {
    name: string
    twitter: string
    projectUrl: string
  }
}

export interface Vibecoder {
  id: string
  slug: string
  name: string
  bio: string
  avatar: string
  twitter: string
  github?: string
  website?: string
  projectCount: number
  specialties: string[]
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
}
