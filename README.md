# 🦇 Vamp Community

**Product Hunt for Vibecoding** - Learn. Build. Earn.

A community platform where vibecoders can discover projects, learn from resources, and compete for grants.

🔗 **Live Demo:** [Coming Soon]
📂 **GitHub:** [This Repository]

---

## ✨ Features

- **Projects Showcase** - Browse 15+ vibecoded projects with search and filters
- **Learning Resources** - Curated tutorials, tools, and guides for mastering vibecoding
- **Active Grants** - $10K+ in funding opportunities for builders
- **Vibecoder Profiles** - Meet the community building with AI
- **Zero Auth Required** - No wallet connect, no personal data collection

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Data:** Static TypeScript files (no database!)

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/vamp-community.git
cd vamp-community

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
vamp-community/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Landing page
│   │   ├── projects/           # Projects pages
│   │   ├── resources/          # Resources page
│   │   ├── grants/             # Grants page
│   │   └── vibecoders/         # Vibecoders pages
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Header, Footer
│   │   ├── projects/           # Project-specific
│   │   ├── resources/          # Resource-specific
│   │   ├── grants/             # Grant-specific
│   │   └── vibecoders/         # Vibecoder-specific
│   ├── data/                   # Static data files
│   │   ├── projects.ts         # 15 projects
│   │   ├── resources.ts        # 25+ resources
│   │   ├── grants.ts           # 2 grants
│   │   └── vibecoders.ts       # 10 vibecoders
│   ├── types/                  # TypeScript types
│   └── lib/                    # Utilities
└── public/                     # Static assets
```

---

## 🎨 Design System

### Vamp Theme

```css
/* Colors */
--vamp-darker: #0a0a0f    /* Main background */
--vamp-dark: #12121a      /* Card backgrounds */
--vamp-purple: #8b5cf6    /* Primary accent */
--vamp-fuchsia: #d946ef   /* Secondary accent */
--vamp-pink: #ec4899      /* Tertiary accent */
```

### Key Features

- Dark theme with vibrant gradients
- Glass-morphism UI elements
- Smooth animations and transitions
- Responsive mobile design
- Accessibility-friendly

---

## 📊 Grant Requirements Checklist

- ✅ Public demo link
- ✅ GitHub repository
- ✅ Built with vibecoding (Claude Code)
- ✅ NO wallet connect
- ✅ NO personal data collection
- ✅ NO download requirements

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Build project
npm run build

# Deploy to Vercel
vercel deploy --prod
```

### Manual Deployment

```bash
npm run build
npm start
```

---

## 📝 Adding Data

### Add a Project

Edit `src/data/projects.ts`:

```typescript
{
  id: '16',
  slug: 'my-project',
  title: 'My Amazing Project',
  description: 'Built with vibecoding',
  image: 'https://images.unsplash.com/...',
  author: {
    slug: 'myusername',
    name: 'My Name',
    twitter: 'myusername',
    avatar: 'https://unavatar.io/twitter/myusername',
  },
  categories: ['ai', 'web'],
  links: {
    demo: 'https://myproject.com',
    github: 'https://github.com/me/myproject',
  },
  tools: ['Claude', 'Next.js'],
  featured: false,
  createdAt: '2025-01-28',
}
```

### Add a Resource

Edit `src/data/resources.ts`:

```typescript
{
  id: 'res-new',
  title: 'My Resource',
  description: 'Learn something cool',
  category: 'tutorials',
  type: 'video',
  url: 'https://youtube.com/...',
  author: '@myhandle',
  free: true,
}
```

---

## 🤝 Contributing

This is a competition submission. After the grant period, contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Built for [Vamp Grant #1](https://twitter.com/KSimback) by [@KSimback](https://twitter.com/KSimback)
- Powered by [Claude Code](https://claude.ai/code)
- Inspired by Product Hunt and the vibecoding community

---

## 📬 Contact

- **Twitter:** [@KSimback](https://twitter.com/KSimback)
- **GitHub:** [Issues](https://github.com/YOUR_USERNAME/vamp-community/issues)

---

**Built with vibecoding in 48 hours** 🦇⚡
