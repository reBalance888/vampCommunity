# 🦇 Vamp Community

**Product Hunt for vibecoding** - Learn. Build. Earn.

A community platform for vibecoding enthusiasts to share projects, discover resources, and compete for grants.

## 🚀 Features

- **Project Showcase** - Share your AI-powered projects built with Claude, Cursor, v0, and other vibecoding tools
- **Resource Library** - Curated tutorials, tools, and courses for learning vibecoding
- **Grants & Challenges** - Compete for funding to bring your ideas to life
- **Vibecoder Profiles** - Build your reputation and showcase your skills
- **Upvoting System** - Community-driven project discovery

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (GitHub OAuth)
- **Animations:** Framer Motion
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vamp-community.git
cd vamp-community

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## 📁 Project Structure

```
vamp-community/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                  # Utilities & config
│   │   ├── supabase/         # Supabase client setup
│   │   └── utils.ts          # Helper functions
│   ├── hooks/                # Custom React hooks
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🎨 Design System

### Colors
- **Vamp Primary:** `#8b5cf6` (Violet)
- **Vamp Secondary:** `#c026d3` (Fuchsia)
- **Vamp Accent:** `#f43f5e` (Rose)
- **Background:** `#0a0a0b` (Deep Black)
- **Card:** `#18181b` (Zinc 900)

### Key Components
- Gradient buttons with glow effects
- Glass-morphism cards
- Animated borders
- Smooth transitions

## 🚀 Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Supabase Setup
1. Create new Supabase project
2. Run database migrations (see `/supabase/migrations`)
3. Enable GitHub OAuth provider
4. Configure RLS policies
5. Add redirect URLs in Auth settings

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

This is a competition submission project. Contributions are welcome after the initial launch!

## 📄 License

MIT License - feel free to use this project as inspiration for your own vibecoding platform.

## 🦇 About

Built for the Vamp Community Grant Challenge - showcasing the power of vibecoding with Claude, Next.js, and modern web technologies.

**Learn. Build. Earn.** 🚀
