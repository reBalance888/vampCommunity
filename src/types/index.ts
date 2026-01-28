export type ProjectStatus = 'pending' | 'approved' | 'featured'
export type GrantStatus = 'active' | 'closed' | 'judging' | 'completed'
export type SubmissionStatus = 'submitted' | 'under_review' | 'winner' | 'rejected'
export type ResourceCategory = 'tutorial' | 'tool' | 'course' | 'article' | 'video'
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
export type UserStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Profile {
  id: string
  username: string
  display_name?: string
  bio?: string
  avatar_url?: string
  github_url?: string
  twitter_url?: string
  website_url?: string
  skills: string[]
  is_featured: boolean
  total_upvotes: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  author_id: string
  author?: Profile
  title: string
  tagline: string
  description?: string
  demo_url: string
  github_url: string
  thumbnail_url?: string
  tags: string[]
  tools_used: string[]
  upvotes: number
  status: ProjectStatus
  grant_submission: boolean
  created_at: string
  launched_at?: string
  user_upvoted?: boolean
}

export interface Upvote {
  id: string
  user_id: string
  project_id: string
  created_at: string
}

export interface Resource {
  id: string
  title: string
  description?: string
  url: string
  category: ResourceCategory
  difficulty?: DifficultyLevel
  tags: string[]
  upvotes: number
  submitted_by: string
  is_featured: boolean
  created_at: string
}

export interface Grant {
  id: string
  title: string
  description: string
  prize_amount: number
  deadline?: string
  requirements: string[]
  status: GrantStatus
  winner_project_id?: string
  sponsor_name?: string
  sponsor_logo?: string
  created_at: string
  submissions_count?: number
}

export interface GrantSubmission {
  id: string
  grant_id: string
  project_id: string
  project?: Project
  pitch: string
  submitted_at: string
  status: SubmissionStatus
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'upvotes'>
        Update: Partial<Omit<Project, 'id' | 'author_id'>>
      }
      upvotes: {
        Row: Upvote
        Insert: Omit<Upvote, 'id' | 'created_at'>
        Update: never
      }
      resources: {
        Row: Resource
        Insert: Omit<Resource, 'id' | 'created_at' | 'upvotes'>
        Update: Partial<Omit<Resource, 'id'>>
      }
      grants: {
        Row: Grant
        Insert: Omit<Grant, 'id' | 'created_at'>
        Update: Partial<Omit<Grant, 'id'>>
      }
      grant_submissions: {
        Row: GrantSubmission
        Insert: Omit<GrantSubmission, 'id' | 'submitted_at'>
        Update: Partial<Omit<GrantSubmission, 'id' | 'grant_id' | 'project_id'>>
      }
    }
  }
}
