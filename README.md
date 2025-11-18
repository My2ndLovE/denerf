# Denerf Landing Page

> An immersive digital experience showcasing a software development company's expertise through innovative interactions and cutting-edge web technologies.

![Astro](https://img.shields.io/badge/Astro-5.x-ff5a03?logo=astro)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Project Overview

This landing page breaks the mold of traditional portfolio websites. It's a digital gallery, an interactive story, and a technical demonstration all in one. The site transforms code into visual design before the visitor's eyes, proving expertise through execution rather than claims.

### Key Features

- **🎨 The Code Reveal**: Hero section that literally transforms from source code to visual design
- **📚 Interactive Philosophy**: Horizontal-scrolling principles with SVG mask reveals
- **🎬 Cinematic Portfolio**: Filterable project showcase with smooth transitions
- **✨ Tech Constellation**: Interactive star map showing technology ecosystem
- **💬 Multi-Path CTA**: Three distinct paths for user engagement

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd denerf

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
# Run type checking and build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
denerf/
├── src/
│   ├── components/
│   │   ├── core/              # Base components
│   │   ├── interactive/       # Client-side interactive components
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.astro
│   │   │   ├── PhilosophySection.astro
│   │   │   ├── PortfolioSection.astro
│   │   │   ├── TechStackSection.astro
│   │   │   └── CTASection.astro
│   │   └── ui/                # Reusable UI elements
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout wrapper
│   ├── pages/
│   │   └── index.astro        # Homepage
│   ├── styles/
│   │   ├── global.css         # Global styles
│   │   └── tokens/
│   │       └── colors.css     # Design tokens
│   ├── scripts/
│   │   ├── animations/        # Animation logic
│   │   └── utils/             # Helper functions
│   └── assets/
│       ├── images/            # Image assets
│       ├── fonts/             # Font files
│       └── icons/             # Icon assets
├── public/                    # Static assets
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

### Color Palette: "Future Forward"

```css
--color-base: #0a0e27;           /* Deep space navy */
--color-primary: #00f5ff;        /* Electric cyan */
--color-secondary: #bf40bf;      /* Neon purple */
--color-accent: #ffffff;         /* Bright white */
--color-surface: #1a1d2e;        /* Dark gray surface */
--color-text: #e8e9ed;           /* Off-white text */
```

### Typography

- **Display Font**: Space Grotesk (Variable 300-700)
- **Body Font**: System UI stack for performance
- **Monospace**: JetBrains Mono for code

### Breakpoints

- `xs`: 0px (mobile portrait)
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet portrait)
- `lg`: 1024px (tablet landscape/small desktop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

## ⚡ Performance

The site is built with performance as a core feature:

- **Static Generation**: 100% pre-rendered at build time
- **Optimized Assets**: Automatic image optimization with Sharp
- **Code Splitting**: Manual chunks for animation libraries
- **Minimal JavaScript**: Critical features only, progressively enhanced

### Target Metrics

- First Contentful Paint (FCP): < 0.8s
- Largest Contentful Paint (LCP): < 1.2s
- Cumulative Layout Shift (CLS): < 0.05
- Time to Interactive (TTI): < 1.5s
- Lighthouse Score: 95+

## ♿ Accessibility

Accessibility is non-negotiable:

- **WCAG AA Compliant**: Meets Web Content Accessibility Guidelines
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Focus Management**: Clear focus indicators throughout
- **Skip Links**: Skip-to-content link for keyboard users

## 🎭 Sections Breakdown

### 1. Hero Section - "The Code Reveal"

The most innovative feature. Shows actual Astro/JSX code that transforms into the visual design after 2 seconds or on first scroll.

**Technical Implementation:**
- Vanilla JavaScript for animation control
- CSS transitions for smooth morphing
- Respects `prefers-reduced-motion`

**Files:**
- `src/components/sections/HeroSection.astro`

---

### 2. Philosophy Section - "How We Build"

Horizontal-scrolling cards showcasing 4 core principles with placeholder for SVG mask reveals.

**Principles:**
1. Prototype in 48 Hours
2. Performance is a Feature
3. Accessible to Everyone
4. Technology Serves the User

**Technical Implementation:**
- CSS scroll-snap for smooth scrolling
- Intersection Observer for progress dots
- Mobile-optimized with touch gestures

**Files:**
- `src/components/sections/PhilosophySection.astro`

---

### 3. Portfolio Section - "Selected Work"

Filterable grid of 6 projects with metrics and technology tags.

**Features:**
- Filter by category or technology
- Hover overlay with "View Case Study" button
- Project metrics (users, performance, uptime)
- Responsive grid layout

**Technical Implementation:**
- CSS Grid with auto-fill
- JavaScript filtering without page reload
- Placeholder for case study modals

**Files:**
- `src/components/sections/PortfolioSection.astro`

---

### 4. Tech Stack Section - "Our Toolkit"

Interactive constellation map showing 6 technology categories with connections.

**Categories:**
1. Frontend (React, Vue, Svelte, Astro)
2. Backend (Node.js, Python, Go)
3. Databases (PostgreSQL, MongoDB, Redis)
4. Cloud & DevOps (AWS, Vercel, Cloudflare, Docker)
5. Mobile (React Native, Flutter)
6. AI/ML (OpenAI, TensorFlow, Hugging Face)

**Technical Implementation:**
- SVG for constellation visualization
- Dynamic line drawing between nodes
- Click to expand detail cards
- Proficiency bars for each technology

**Files:**
- `src/components/sections/TechStackSection.astro`

---

### 5. CTA Section - "Ready to Build"

Multi-path engagement strategy with three distinct options.

**Paths:**
1. **Quick Question** (2 min) - Simple contact form
2. **Let's Build** (15 min) - Full project form with details
3. **Explore Resources** - Link to blog/resources

**Features:**
- Modal-based forms
- Real-time validation
- Animated success states
- Trust indicators (free consultation, 24h response, etc.)

**Technical Implementation:**
- Custom modal with overlay
- Form validation and submission handling
- Keyboard accessible (ESC to close)
- Success animation with confetti effect potential

**Files:**
- `src/components/sections/CTASection.astro`

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Format code
npx prettier --write .
```

## 📚 Tech Stack

### Core
- **[Astro 5.x](https://astro.build)** - Static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first styling

### Build Tools
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization
- **[Vite](https://vitejs.dev/)** - Build tool (via Astro)

### Potential Enhancements
- **GSAP ScrollTrigger** - Advanced scroll animations
- **Motion One** - Lightweight animations
- **View Transitions API** - Native page transitions

## 🎯 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Samsung Internet (last 2 versions)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a showcase project for Denerf. For inquiries about collaboration, please use the contact form on the website.

## 📧 Contact

- Website: [Coming Soon]
- Email: [Your Email]
- GitHub: [Your GitHub]

---

**Built with ❤️ and Astro**
