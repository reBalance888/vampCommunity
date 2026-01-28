# 🏗 Vamp Community - Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Landing    │  │   Projects   │  │  Resources   │     │
│  │     Page     │  │     Page     │  │     Page     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Grants    │  │  Vibecoders  │  │  Leaderboard │     │
│  │     Page     │  │   Directory  │  │     Page     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS 14 (App Router)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Server Components (Default)                                │
│  ├─ Static Generation (ISR)                                 │
│  ├─ Server Actions                                          │
│  └─ API Routes                                              │
│                                                              │
│  Client Components (Interactive)                            │
│  ├─ Forms & Inputs                                          │
│  ├─ Upvote Buttons                                          │
│  └─ Real-time Updates                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          ↕ SQL + Real-time
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE (Backend)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PostgreSQL Database                                        │
│  ├─ profiles                                                │
│  ├─ projects                                                │
│  ├─ upvotes                                                 │
│  ├─ resources                                               │
│  ├─ grants                                                  │
│  └─ grant_submissions                                       │
│                                                              │
│  Authentication (GitHub OAuth)                              │
│  Row Level Security (RLS)                                   │
│  Real-time Subscriptions                                    │
│  Storage (Images)                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂 Data Flow

### 1. User Authentication Flow
```
User clicks "Login with GitHub"
    ↓
Supabase Auth redirects to GitHub
    ↓
User authorizes app
    ↓
GitHub redirects back with code
    ↓
Supabase exchanges code for session
    ↓
Trigger creates profile in database
    ↓
User is logged in, session stored in cookie
```

### 2. Project Submission Flow
```
User fills submission form
    ↓
Form validation (client-side)
    ↓
Upload thumbnail (Supabase Storage)
    ↓
Server Action creates project (status: pending)
    ↓
Database trigger initializes upvotes = 0
    ↓
Redirect to "Submitted! Under Review" page
```

### 3. Upvote Flow (Optimistic UI)
```
User clicks upvote button
    ↓
Optimistic update (instant UI feedback)
    ↓
Insert into upvotes table
    ↓
Trigger updates project.upvotes count
    ↓
If error: rollback optimistic update
```

### 4. Real-time Updates Flow
```
User A upvotes project
    ↓
Database trigger updates count
    ↓
Supabase broadcasts change
    ↓
User B's browser receives update
    ↓
UI automatically updates count
```

---

## 📦 Component Architecture

### Layout Hierarchy
```
RootLayout (app/layout.tsx)
├─ Header
│  ├─ Logo
│  ├─ Navigation
│  └─ UserMenu / LoginButton
│
├─ Main Content (children)
│  └─ Page-specific content
│
└─ Footer
   ├─ Links
   └─ Social Icons
```

### Page Components (Server Components)
```
ProjectsPage
├─ SearchBar (Client)
├─ FilterSidebar (Client)
├─ SortDropdown (Client)
└─ ProjectGrid
   └─ ProjectCard[] (Server)
      ├─ Thumbnail
      ├─ Title & Tagline
      ├─ Tags (Badge[])
      ├─ Author (Avatar + Name)
      └─ UpvoteButton (Client)
```

### Form Components (Client Components)
```
ProjectSubmitForm
├─ TitleInput
├─ TaglineInput
├─ DescriptionTextarea
├─ URLInputs (Demo, GitHub)
├─ ThumbnailUpload
├─ TagsSelector
├─ ToolsSelector
└─ SubmitButton
```

---

## 🔐 Security Model

### Row Level Security (RLS) Rules

#### Profiles
- **SELECT:** Anyone can view profiles
- **UPDATE:** Users can only update their own profile
- **DELETE:** Only through account deletion

#### Projects
- **SELECT:** Anyone can view approved/featured projects
- **SELECT:** Authors can view their own pending projects
- **INSERT:** Authenticated users can create projects
- **UPDATE:** Authors can only update their own projects
- **DELETE:** Not allowed (use status change instead)

#### Upvotes
- **SELECT:** Anyone can view upvotes
- **INSERT:** Authenticated users can upvote
- **DELETE:** Users can remove their own upvotes
- **Constraint:** One upvote per user per project (UNIQUE)

#### Resources
- **SELECT:** Anyone can view resources
- **INSERT:** Authenticated users can submit resources

#### Grants
- **SELECT:** Anyone can view grants
- **INSERT/UPDATE:** Admin only (service role)

#### Grant Submissions
- **SELECT:** Anyone can view submissions
- **INSERT:** Project authors can submit to grants
- **UPDATE:** Admin only (for status changes)

---

## 🎯 Performance Optimization

### 1. Static Generation (ISR)
```typescript
// app/projects/[id]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export async function generateStaticParams() {
  // Pre-generate top 100 projects at build time
  const projects = await getTopProjects(100)
  return projects.map(p => ({ id: p.id }))
}
```

### 2. Database Indexes
```sql
-- Fast project listing
CREATE INDEX idx_projects_status ON projects(status)
CREATE INDEX idx_projects_upvotes ON projects(upvotes DESC)
CREATE INDEX idx_projects_created_at ON projects(created_at DESC)

-- Fast upvote queries
CREATE INDEX idx_upvotes_user ON upvotes(user_id)
CREATE INDEX idx_upvotes_project ON upvotes(project_id)
```

### 3. Image Optimization
```typescript
// Always use next/image
<Image
  src={thumbnail}
  alt={title}
  width={600}
  height={400}
  className="..."
  priority={isFeatured} // Prioritize featured projects
/>
```

### 4. Code Splitting
```typescript
// Lazy load heavy components
const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

---

## 🧩 Key Patterns

### 1. Server Components First
```typescript
// Default to Server Components for:
// - Data fetching
// - Static content
// - SEO-critical content

// Use Client Components only for:
// - User interactions (clicks, inputs)
// - Browser APIs (localStorage, window)
// - Real-time updates
```

### 2. Server Actions for Mutations
```typescript
// app/actions/projects.ts
'use server'

export async function submitProject(formData: FormData) {
  const supabase = createClient()

  // Validate
  const data = validateProjectData(formData)

  // Insert
  const { error } = await supabase
    .from('projects')
    .insert(data)

  if (error) throw error

  revalidatePath('/projects')
  return { success: true }
}
```

### 3. Optimistic Updates
```typescript
// hooks/useUpvote.ts
export function useUpvote(projectId: string) {
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [count, setCount] = useState(initialCount)

  const toggle = async () => {
    // Optimistic update
    setIsUpvoted(!isUpvoted)
    setCount(prev => isUpvoted ? prev - 1 : prev + 1)

    try {
      await toggleUpvote(projectId)
    } catch (error) {
      // Rollback on error
      setIsUpvoted(isUpvoted)
      setCount(initialCount)
    }
  }

  return { isUpvoted, count, toggle }
}
```

### 4. Type Safety
```typescript
// All database types auto-generated from schema
import type { Database } from '@/types'

type Project = Database['public']['Tables']['projects']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
```

---

## 🚀 Deployment Architecture

```
GitHub Repository
    ↓
Vercel (Auto-deploy on push)
    ↓
Production Environment
    ├─ Next.js Server (Edge Runtime)
    ├─ Static Assets (CDN)
    └─ Environment Variables
           ↓
Supabase Production
    ├─ PostgreSQL Database
    ├─ Auth Services
    └─ Storage
```

### Environment Variables
```
# Production
NEXT_PUBLIC_SUPABASE_URL=https://prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=prod_service_key

# Vercel auto-sets:
VERCEL_URL=vamp-community.vercel.app
```

---

## 📊 Database Schema Overview

```sql
profiles (GitHub user data)
    ├─ id (UUID, FK to auth.users)
    ├─ username, display_name, bio
    ├─ avatar_url, github_url
    ├─ skills[] (tags)
    └─ total_upvotes (computed)

projects (User submissions)
    ├─ id (UUID)
    ├─ author_id (FK to profiles)
    ├─ title, tagline, description
    ├─ demo_url, github_url, thumbnail_url
    ├─ tags[], tools_used[]
    ├─ upvotes (computed via trigger)
    └─ status (pending/approved/featured)

upvotes (Voting records)
    ├─ id (UUID)
    ├─ user_id (FK to profiles)
    ├─ project_id (FK to projects)
    └─ UNIQUE(user_id, project_id)

resources (Learning materials)
    ├─ id (UUID)
    ├─ title, description, url
    ├─ category (enum)
    ├─ difficulty (enum)
    └─ tags[]

grants (Funding opportunities)
    ├─ id (UUID)
    ├─ title, description
    ├─ prize_amount, deadline
    ├─ requirements[]
    └─ status (active/closed/judging/completed)

grant_submissions (Grant applications)
    ├─ id (UUID)
    ├─ grant_id (FK to grants)
    ├─ project_id (FK to projects)
    ├─ pitch
    └─ status (submitted/under_review/winner/rejected)
```

---

## 🎨 Styling Architecture

### Tailwind Configuration
- Custom color palette (Vamp theme)
- Custom animations (glow-pulse, fade-in)
- Custom utilities (text-gradient, glass, vamp-glow)
- Mobile-first breakpoints

### Component Styling Strategy
1. **Base styles** - Tailwind utility classes
2. **Variants** - class-variance-authority (CVA)
3. **States** - Hover, focus, active
4. **Animations** - Framer Motion for complex animations

---

## 🔄 State Management

### Client State
- **Forms:** React Hook Form
- **UI State:** useState, useReducer
- **Server State:** None needed (Server Components handle it)

### Server State
- **Data Fetching:** Direct Supabase queries in Server Components
- **Mutations:** Server Actions
- **Real-time:** Supabase subscriptions in Client Components

No need for Redux, Zustand, or React Query!

---

## 🧪 Testing Strategy (Future)

```
Unit Tests
├─ Utils functions
├─ Form validation
└─ Helper functions

Integration Tests
├─ API Routes
├─ Server Actions
└─ Database queries

E2E Tests
├─ User authentication flow
├─ Project submission flow
├─ Upvote flow
└─ Grant application flow
```

---

**This architecture prioritizes:**
- ✅ Simplicity (minimal abstractions)
- ✅ Performance (Server Components, ISR, caching)
- ✅ Type Safety (TypeScript strict mode)
- ✅ Security (RLS, server-side validation)
- ✅ DX (Next.js conventions, no boilerplate)
