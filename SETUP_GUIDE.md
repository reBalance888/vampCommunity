# 🦇 Vamp Community - Setup Guide

## ✅ What's Been Done

### 1. Project Initialization
- ✅ Next.js 14 with App Router
- ✅ TypeScript (strict mode)
- ✅ Tailwind CSS with custom Vamp theme
- ✅ All dependencies installed

### 2. Project Structure
```
vamp-community/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Landing page with hero
│   │   └── globals.css         # Vamp theme styles
│   ├── components/ui/          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── avatar.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser Supabase client
│   │   │   └── server.ts       # Server Supabase client
│   │   └── utils.ts            # Helper functions
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── hooks/                  # (Ready for custom hooks)
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Complete DB schema
│   └── seed.sql                # Sample data
├── public/                     # (Ready for assets)
└── Config files (package.json, tsconfig, tailwind, etc.)
```

### 3. Database Schema (Supabase)
- ✅ `profiles` - User profiles (auto-created via GitHub OAuth)
- ✅ `projects` - Project submissions
- ✅ `upvotes` - Voting system
- ✅ `resources` - Learning resources
- ✅ `grants` - Grant challenges
- ✅ `grant_submissions` - Grant applications
- ✅ RLS policies configured
- ✅ Triggers for auto-updates
- ✅ Indexes for performance

### 4. Design System
- ✅ Vamp color palette (violet, fuchsia, rose)
- ✅ Gradient effects
- ✅ Glow animations
- ✅ Glass-morphism cards
- ✅ Custom utility classes

### 5. Dev Server
- ✅ Running at http://localhost:3000
- ✅ Basic landing page with hero section

---

## 🚀 Next Steps

### Phase 1: Supabase Setup (30 minutes)

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Create new project
   # Wait for project to be ready (~2 minutes)
   ```

2. **Run Database Migration**
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Run the migration
   - Verify all tables are created

3. **Run Seed Data**
   - In SQL Editor, run `supabase/seed.sql`
   - This adds sample grant and resources

4. **Configure GitHub OAuth**
   - Go to Authentication → Providers
   - Enable GitHub
   - Add to GitHub OAuth Apps:
     - Homepage URL: `http://localhost:3000`
     - Callback URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

5. **Set Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```

6. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### Phase 2: Core Features (3-4 hours)

#### 2.1 Authentication
- [ ] Create auth callback route (`/auth/callback`)
- [ ] Add login button (GitHub OAuth)
- [ ] Create header with user menu
- [ ] Add logout functionality

#### 2.2 Projects Page
- [ ] Create `/projects` route
- [ ] List all approved projects
- [ ] Search & filter functionality
- [ ] Sort by: latest, trending, top
- [ ] Pagination

#### 2.3 Project Submission
- [ ] Create `/projects/submit` page
- [ ] Form with validation:
  - Title, tagline, description
  - Demo URL, GitHub URL
  - Thumbnail upload
  - Tags & tools selection
- [ ] Submit to database (status: pending)

#### 2.4 Project Details Page
- [ ] Create `/projects/[id]` route
- [ ] Display project info
- [ ] Upvote button
- [ ] Author profile link
- [ ] Comments section (optional)

#### 2.5 Upvote System
- [ ] Create upvote hook (`useUpvote`)
- [ ] Implement optimistic updates
- [ ] Real-time upvote count
- [ ] Prevent duplicate upvotes

### Phase 3: Additional Pages (2-3 hours)

#### 3.1 Resources Page
- [ ] Create `/resources` route
- [ ] Filter by category & difficulty
- [ ] Display resource cards
- [ ] Link to external resources

#### 3.2 Grants Page
- [ ] Create `/grants` route
- [ ] List active grants
- [ ] Show deadline countdown
- [ ] Grant submission form
- [ ] Link to submitted project

#### 3.3 Vibecoders Directory
- [ ] Create `/vibecoders` route
- [ ] List all profiles
- [ ] Sort by total upvotes
- [ ] Filter by skills

#### 3.4 Profile Page
- [ ] Create `/vibecoders/[username]` route
- [ ] Display profile info
- [ ] List user's projects
- [ ] Edit profile (own profile only)

#### 3.5 Leaderboard
- [ ] Create `/leaderboard` route
- [ ] Top projects (by upvotes)
- [ ] Top vibecoders (by total upvotes)
- [ ] Weekly/monthly/all-time filters

### Phase 4: Polish & Deploy (1-2 hours)

#### 4.1 Polish
- [ ] Add animations (Framer Motion)
- [ ] Loading states & skeletons
- [ ] Error handling & toasts
- [ ] Mobile responsive testing
- [ ] SEO optimization
- [ ] Add favicon & OG image

#### 4.2 Deploy
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add production environment variables
- [ ] Update Supabase redirect URLs
- [ ] Test production build

---

## 📝 Important Reminders

### Grant Requirements (MUST HAVE)
- ❌ NO connect wallet functionality
- ❌ NO personal data collection (beyond GitHub profile)
- ❌ NO downloads required
- ✅ Public demo link
- ✅ Public GitHub repo
- ✅ Built with vibecoding tools

### Code Quality
- Use TypeScript strict mode (already configured)
- Follow Next.js 14 best practices (Server Components first)
- Implement proper error handling
- Add loading states for async operations
- Optimize images with next/image
- Keep bundle size small

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

---

## 🎨 Design Tokens Reference

```css
/* Colors */
--vamp-primary: #8b5cf6    /* Violet */
--vamp-secondary: #c026d3  /* Fuchsia */
--vamp-accent: #f43f5e     /* Rose */
--vamp-glow: #a855f7       /* Glow effect */

/* Gradients */
--gradient-vamp: linear-gradient(135deg, #8b5cf6 0%, #c026d3 50%, #f43f5e 100%)
--gradient-dark: linear-gradient(180deg, #0a0a0b 0%, #18181b 100%)

/* Effects */
.vamp-glow-hover:hover  /* Hover glow effect */
.text-gradient          /* Gradient text */
.glass                  /* Glass-morphism */
.border-gradient        /* Animated border */
```

---

## 🛠 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Git (after completing)
git init
git add .
git commit -m "feat: initial Vamp Community implementation"
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

---

## 🎯 Project Status

**Current Status:** ✅ Initialization Complete

**Next Priority:** Set up Supabase and implement authentication

**Estimated Time to MVP:** 6-8 hours

**Ready to start coding!** 🚀
