# DeNeRF - AI-Native Landing Page

> A world-class landing page that doesn't just talk about AI—it breathes AI.

**Status**: 🚧 In Development - Phase 4
**Tech Stack**: Astro 5.x • TypeScript • Tailwind CSS 4.x • Three.js • GSAP
**Goal**: Create a landing page that makes visitors feel like they've glimpsed 2030

---

## 🎯 Project Vision

This landing page is:
- **A Proof of Concept**: Demonstrates what's possible when AI meets human creativity
- **A Portfolio Piece**: Showcases technical and design excellence
- **A Filtering Mechanism**: Attracts clients who value innovation
- **A Competitive Moat**: Hard to copy—requires skill, taste, and time
- **A Statement**: "We are the future of software development"

---

## 📖 The Narrative

The page tells a story across five chapters:

1. **THE AWAKENING** (Hero) - Neural network materializes, shocking and intriguing visitors
2. **THE COLLABORATION** (Process) - Split-screen shows human creativity + AI precision
3. **THE PROOF** (Portfolio) - Adaptive grid demonstrates real AI-augmented projects
4. **THE INTELLIGENCE** (AI Stack) - Constellation visualizes our AI collaborators
5. **THE INVITATION** (CTA) - Adaptive form that embodies AI capabilities

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

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

---

## 🏗️ Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ai/                # AI-specific components
│   │   │   ├── NeuralBackground.astro
│   │   │   ├── GenerativeParticles.tsx
│   │   │   └── AdaptiveContent.tsx
│   │   ├── 3d/                # Three.js components
│   │   │   ├── NeuralNetwork3D.tsx
│   │   │   └── PointCloud.tsx
│   │   ├── interactive/       # Complex interactions
│   │   │   ├── SmartCursor.tsx
│   │   │   └── AdaptiveForm.tsx
│   │   ├── sections/          # Page sections (COMPLETED)
│   │   │   ├── HeroAI.astro
│   │   │   ├── ProcessVisualization.astro
│   │   │   ├── PortfolioGrid.astro
│   │   │   ├── AIStackShowcase.astro
│   │   │   └── FutureInvitation.astro
│   │   └── ui/                # Base components
│   ├── shaders/               # WebGL shaders
│   │   ├── neural.vert
│   │   └── neural.frag
│   ├── scripts/
│   │   ├── ai/
│   │   │   ├── neural-viz.ts       # Neural network visualization
│   │   │   └── constellation.ts    # AI stack constellation
│   │   ├── animations/
│   │   │   ├── scroll-magic.ts     # GSAP ScrollTrigger
│   │   │   ├── cursor.ts           # Smart cursor system
│   │   │   └── process.ts          # Process animations
│   │   └── utils/
│   ├── styles/
│   │   └── global.css         # Design system (COMPLETED)
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout (COMPLETED)
│   └── pages/
│       └── index.astro        # Homepage (COMPLETED)
├── public/
│   ├── models/                # 3D models
│   ├── textures/              # WebGL textures
│   └── ai-assets/             # AI-generated assets
├── AI_VISION.md               # Research synthesis (COMPLETED)
├── NARRATIVE_ARCHITECTURE.md  # Story & emotional journey (COMPLETED)
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind + design tokens
├── tsconfig.json              # TypeScript strict mode
└── package.json
```

---

## 🎨 Design System

### Neural Noir Color Palette

```css
--color-void: #0a0a0a          /* Near black */
--color-surface: #1a1a1a       /* Dark surface */
--color-elevated: #2a2a2a      /* Elevated elements */

--color-primary: #00f5ff       /* Cyan electric */
--color-accent: #bf40ff        /* Purple energy */
--color-success: #00ff88       /* AI "online" */

--color-text-primary: #ffffff
--color-text-secondary: #a0a0a0
--color-text-tertiary: #606060
```

### Typography Scale (1.25 ratio)

- **Hero**: 6rem (96px)
- **Display**: 4.768rem - 2.441rem
- **Body**: 1.563rem - 1rem
- **Small**: 0.8rem - 0.64rem

### Spacing System (4px base)

- Base unit: 4px (0.25rem)
- Section padding: 8rem desktop, 4rem mobile
- Component gaps: 2rem - 6rem

---

## ✨ Key Features

### Implemented

- ✅ **Astro 5.x Project Structure** - Modern, performance-optimized
- ✅ **TypeScript Strict Mode** - Type safety throughout
- ✅ **Tailwind CSS 4.x** - Utility-first with custom design tokens
- ✅ **Semantic HTML** - Accessibility from the ground up
- ✅ **5 Core Sections** - Hero, Process, Portfolio, AI Stack, CTA
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Design System** - Neural Noir color palette and typography
- ✅ **Research Documentation** - 15+ sources analyzed

### In Progress

- 🚧 **Three.js Neural Network** - Hero animation
- 🚧 **GSAP Scroll Animations** - Narrative-driven transitions
- 🚧 **Smart Cursor System** - Neural pathway trails
- 🚧 **Adaptive Form** - AI-powered contact experience
- 🚧 **Constellation Visualization** - AI tools as celestial bodies
- 🚧 **Performance Optimization** - Target: Lighthouse 95+

### Planned

- ⏳ **WebGL Shaders** - Holographic effects
- ⏳ **Particle Systems** - Generative backgrounds
- ⏳ **Fluid Simulation** - Section transitions
- ⏳ **Accessibility Audit** - WCAG AA/AAA compliance
- ⏳ **Real AI Integration** - Claude API for form responses

---

## 🎯 Performance Targets

### Hard Limits

- **Initial Load**: < 500KB total
- **JavaScript**: < 100KB (gzipped)
- **Fonts**: < 100KB (variable fonts)
- **LCP**: < 1.0s
- **FID**: < 50ms
- **CLS**: < 0.05

### Lighthouse Goals

- Performance: **95+**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

---

## ♿ Accessibility

### Compliance

- WCAG 2.1 Level AA minimum
- Working toward AAA where possible
- Full keyboard navigation
- Screen reader optimized
- Reduced motion support
- High contrast mode

### Testing

- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- Keyboard-only navigation
- Color contrast ratios (7:1 AAA)

---

## 📦 Tech Stack

### Core

- **Astro 5.x** - Static site generator with islands architecture
- **TypeScript** - Strict mode, no `any` types
- **Tailwind CSS 4.x** - Utility-first CSS with custom design system

### Animation

- **GSAP 3.x + ScrollTrigger** - Scroll-driven narrative animations
- **Three.js r160+** - 3D neural network visualization
- **PixiJS 8.x** (planned) - Particle systems and fluid simulations
- **Lottie** (planned) - Micro-animations

### Build & Deploy

- **Vite** - Lightning-fast dev server and build
- **ESBuild** - Fast TypeScript compilation
- **PostCSS** - CSS processing
- **Vercel/Netlify** (deployment target)

---

## 🚧 Development Phases

### Phase 1: Research ✅ COMPLETE
- AI company websites analyzed
- Generative design patterns identified
- Experimental web techniques researched
- Motion design inspiration collected
- AI aesthetics documented

**Deliverable**: `AI_VISION.md` - 400+ line research synthesis

### Phase 2: Narrative Architecture ✅ COMPLETE
- Story structure defined
- Emotional journey mapped
- Section purposes clarified
- Copy voice guidelines established

**Deliverable**: `NARRATIVE_ARCHITECTURE.md`

### Phase 3: Project Initialization ✅ COMPLETE
- Astro 5.x setup with TypeScript
- Tailwind CSS 4.x configuration
- Design system implementation
- Project structure created
- Animation libraries configured

### Phase 4: Section Development 🚧 IN PROGRESS
- Hero section: Neural Genesis ✅
- Process section: Split Screen Reality ✅
- Portfolio section: Adaptive Grid ✅
- AI Stack section: Constellation ✅
- CTA section: Adaptive Form ✅

**Current**: Implementing advanced animations and interactions

### Phase 5: Advanced Features (Next)
- Three.js neural network
- GSAP scroll animations
- Smart cursor system
- Generative backgrounds
- Performance optimization

### Phase 6: Content & SEO (Upcoming)
- Compelling copy writing
- SEO metadata
- Structured data
- Image optimization
- Social sharing

### Phase 7: Testing & Polish (Upcoming)
- Cross-browser testing
- Device testing
- Accessibility audit
- Performance optimization
- Documentation

### Phase 8: Launch (Final)
- Pre-launch checklist
- Analytics setup
- Deployment
- Git commit and push

---

## 📝 Scripts

```json
{
  "dev": "astro dev",           // Start dev server
  "build": "astro check && astro build",  // Build for production
  "preview": "astro preview"     // Preview production build
}
```

---

## 🌟 Signature Features

Based on research, we're implementing 5 **never-seen-before combinations**:

1. **Adaptive Neural Background** - WebGPU compute shader generating evolving neural patterns
2. **Intelligent Cursor System** - Draws neural pathways, predicts clicks
3. **GPGPU Particle Portraits** - GPU-computed particle systems forming shapes
4. **Generative Typography Morph** - Company name forms from swarming AI keywords
5. **Procedural Section Transitions** - Algorithm-driven, never-the-same-twice transitions

---

## 🎓 Learning Resources

### Research Documents

- `AI_VISION.md` - Comprehensive research synthesis with 15+ website references
- `NARRATIVE_ARCHITECTURE.md` - Story structure and emotional journey map

### External Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js Documentation](https://threejs.org/docs)
- [GSAP Documentation](https://greensock.com/docs)
- [TensorFlow Playground](https://playground.tensorflow.org) - Neural network inspiration
- [Awwwards](https://www.awwwards.com) - Design inspiration

---

## 🤝 Contributing

This is a client project, but the code structure and patterns can serve as inspiration for similar projects.

### Code Style

- TypeScript strict mode (no `any`)
- Functional components preferred
- Semantic HTML always
- Accessibility first
- Comments explain "why", not "what"

---

## 📄 License

Proprietary - DeNeRF © 2025

---

## 🎯 Success Metrics

### Quantitative

- ✅ Lighthouse Performance: 95+
- ✅ Lighthouse Accessibility: 100
- ✅ LCP: < 1.0s
- ✅ Conversion rate: > 5%
- ✅ Session duration: > 2 minutes
- ✅ Scroll depth: 75% reach CTA

### Qualitative

- "Wow, this is the coolest website I've seen"
- "How did you make this?"
- "This shows you really know your stuff"
- Used as inspiration by others
- Featured on Awwwards/CSS Design Awards

---

## 📞 Contact

For questions or collaboration:
- Email: hello@denerf.ai
- Website: (coming soon)

---

**Last Updated**: November 18, 2025
**Version**: 0.5.0 (Development)
**Next Milestone**: Complete advanced animations and Three.js implementation

---

*Built with AI. Directed by humans. Designed for the future.*
