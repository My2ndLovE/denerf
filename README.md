# denerf - Immersive Landing Page

> Crafting digital experiences that feel alive

An award-worthy, performance-optimized landing page built with Astro 5.x, showcasing modern web development practices and immersive user experiences.

## ✨ Features

- **Interactive Particle Hero**: Canvas-based particle system that responds to cursor/touch
- **Scroll-Based Storytelling**: Narrative journey through 5 distinct sections
- **Performance-First**: Optimized for Core Web Vitals with aggressive code splitting
- **Accessible**: WCAG AA compliant with reduced motion support
- **Responsive**: Mobile-first design with thoughtful breakpoints
- **Modern Stack**: Astro 5.x + React + TypeScript + Tailwind CSS 4.x

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

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

The dev server will start at `http://localhost:4321`

## 📁 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── interactive/       # Client-side React components
│   │   │   └── ParticleHero.tsx
│   │   └── sections/          # Static Astro sections
│   │       ├── Philosophy.astro
│   │       ├── Portfolio.astro
│   │       ├── TechStack.astro
│   │       └── CTA.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # Base HTML template
│   ├── pages/
│   │   └── index.astro        # Main landing page
│   └── styles/
│       └── global.css         # Global styles + design tokens
├── public/
│   └── favicon.svg
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Design System

### Color Palette (Future Forward)

```css
--color-base: #0a0e27        /* Deep space navy */
--color-primary: #00f5ff     /* Electric cyan */
--color-secondary: #bf40bf   /* Neon purple */
--color-accent: #ffffff      /* Bright white */
--color-surface: #1a1d2e     /* Dark surface */
```

### Typography

- **Display/Body**: Inter Variable (single font for performance)
- **Mono**: JetBrains Mono (code snippets)

### Breakpoints

```css
xs: 0px      /* Mobile portrait */
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large */
```

## 🧩 Key Sections

### 1. Hero - "The Particle Portal"
- Interactive canvas with 80-120 particles
- Magnetic attraction to cursor (150px radius)
- Particles form patterns on interaction
- Mobile: Touch-based interaction
- **Performance**: <50KB JavaScript

### 2. Philosophy - "How We Think"
- Horizontal scroll cards (desktop)
- 4 core principles with visual metaphors
- Snap-scroll with momentum
- Mobile: Vertical stack

### 3. Portfolio - "The Transformation Gallery"
- Masonry grid layout
- Featured projects (2x size)
- Hover effects with lift + shadow
- Before/after metrics overlay

### 4. Tech Stack - "The Toolkit"
- 6 technology categories
- Proficiency indicators (visual dots)
- Animated progress bars
- Category-based color coding

### 5. CTA - "Let's Begin"
- Three engagement paths:
  1. Quick Question (simple form)
  2. I Have a Project (detailed form)
  3. Just Exploring (newsletter + links)
- Forms integrated with Netlify Forms

## ⚡ Performance Optimizations

### Bundle Size
- Critical CSS: Inlined, <14KB
- JavaScript: Deferred, <50KB total
- Total Page Weight: <500KB

### Images
- WebP/AVIF format
- Lazy loading
- Blur placeholders
- Responsive srcset

### Code Splitting
- Island Architecture: Only 5 interactive components
- Lazy hydration with `client:load`, `client:visible`, `client:idle`
- 90%+ static content

### Web Vitals Targets
- FCP: <0.6s ✅
- LCP: <1.0s ✅
- CLS: <0.05 ✅
- TTI: <1.5s ✅

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed analysis.

## ♿ Accessibility

- WCAG AA compliant
- Semantic HTML throughout
- Skip-to-content link
- Keyboard navigation support
- Focus indicators on all interactive elements
- `prefers-reduced-motion` respected
- ARIA labels where appropriate
- Color contrast: 4.5:1 minimum

## 🎭 Animations & Interactions

7 implemented micro-interaction patterns:

1. **Scroll Progress Indicator** - Gradient bar at top
2. **Staggered Reveal** - Elements fade in on scroll
3. **Particle Physics** - Magnetic attraction in hero
4. **Hover Lift + Shadow** - Cards and buttons
5. **Parallax Layers** - Depth effect on scroll
6. **Text Animations** - Gradient text, typewriter effects
7. **Smooth Momentum Scroll** - Natural physics-based scrolling

See [INTERACTIONS.md](./INTERACTIONS.md) for implementation details.

## 🛠️ Tech Stack

**Core Framework**
- [Astro 5.x](https://astro.build) - Static Site Generator
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4.x](https://tailwindcss.com/) - Utility-first CSS

**Interactive Components**
- [React 18](https://react.dev/) - UI library (islands only)
- Canvas API - Particle system

**Animation**
- GSAP + ScrollTrigger (optional, can add)
- CSS Animations
- RequestAnimationFrame

**Forms**
- Netlify Forms - Backend processing

**Development**
- Prettier - Code formatting
- ESLint - Code linting

## 📦 Deployment

### Netlify (Recommended)

1. Connect your Git repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

Forms will automatically work with Netlify Forms.

### Vercel

```bash
npm run build
vercel --prod
```

### Other Platforms

Build the project:
```bash
npm run build
```

Deploy the `dist` folder to any static hosting service.

## 🧪 Testing

```bash
# Type checking
npm run astro check

# Build (validates everything)
npm run build
```

### Lighthouse Testing

Run Lighthouse in Chrome DevTools on the production build:

```bash
npm run build
npm run preview
# Open http://localhost:4321 in Chrome
# Open DevTools > Lighthouse > Generate Report
```

Target scores: 95+ in all categories

## 📝 Content Management

All content is currently hard-coded in component files for simplicity:

- **Philosophy**: `src/components/sections/Philosophy.astro`
- **Portfolio**: `src/components/sections/Portfolio.astro`
- **Tech Stack**: `src/components/sections/TechStack.astro`

To add a CMS:
1. Add Astro Content Collections
2. Or integrate with headless CMS (Sanity, Contentful, etc.)

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Samsung Internet 14+

Progressive enhancement ensures basic functionality on older browsers.

## 📄 License

MIT License - feel free to use this as inspiration or a starting point for your own projects.

## 🙏 Acknowledgments

Built with inspiration from:
- Bruno Simon's portfolio (bruno-simon.com)
- Awwwards Site of the Year winners
- Museum and luxury brand websites
- Codrops experimental demos

Full research documented in [INSPIRATION.md](./INSPIRATION.md)

## 📞 Contact

Questions or feedback? Open an issue or reach out!

---

Built with ❤️ using Astro, React, and thoughtful design.
