# 🤖 AI Holographic Avatar Company Website

A revolutionary static company website featuring an **AI holographic avatar** that guides visitors through a playful, interactive conversation.

## 🌟 Features

- **Holographic AI Avatar** - Sci-fi aesthetic with scan lines, glow effects, and particles
- **Interactive Conversations** - Chat with the AI to navigate through different sections
- **Horizontal Scroll Portfolio** - Smooth GSAP-powered project showcase
- **Mobile-First Design** - Optimized for 70% mobile, 30% desktop traffic
- **Glassmorphism UI** - Modern glass-effect design system
- **100% Static** - No backend required, deployed on Cloudflare Pages

## 🚀 Tech Stack

- **Astro 4.0** - Static site generator
- **React 18** - Interactive components (avatar + chat only)
- **Tailwind CSS 3.4** - Utility-first styling
- **GSAP 3.12** - Scroll animations (desktop)
- **Framer Motion** - Chat animations
- **Zustand** - State management
- **TypeScript** - Type safety

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ai-avatar/      # Holographic avatar system
│   │   ├── chat/           # Chat interface
│   │   ├── sections/       # Page sections
│   │   ├── portfolio/      # Portfolio components
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── lib/
│   │   ├── conversation/   # Conversation engine
│   │   ├── gsap/           # Animation setup
│   │   ├── store/          # State management
│   │   └── utils/          # Helper functions
│   ├── data/               # JSON data files
│   ├── styles/             # Global styles
│   └── pages/              # Astro pages
├── public/
│   ├── images/             # Images & screenshots
│   └── fonts/              # Self-hosted fonts
└── astro.config.mjs
```

## 🎨 Design System

- **Primary Color**: `#00d4ff` (Cyan hologram)
- **Secondary Color**: `#8b5cf6` (Purple accent)
- **Accent Color**: `#f59e0b` (Amber CTA)
- **Background**: `#0a0a0f` (Almost black)
- **Typography**: Inter (self-hosted)

## 📝 Customization

### Adding Projects

Edit `src/data/projects.json` to add or modify portfolio projects.

### Modifying Conversations

Edit `src/data/conversations.json` to change the AI conversation flows.

### Updating Services

Edit `src/data/services.json` to modify service offerings.

## 🚀 Deployment

This site is configured for deployment to Cloudflare Pages:

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: `18`

## 📊 Performance Targets

- **Mobile Lighthouse**: 85+
- **Desktop Lighthouse**: 90+
- **Bundle Size**: < 120KB (gzipped)
- **FPS**: 60fps scrolling

## 🤝 Contributing

This is a showcase project. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use as a template for your own projects.

---

**Built with ❤️ using Astro, React, and lots of holographic effects!**
