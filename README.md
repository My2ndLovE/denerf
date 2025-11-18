# DeNeRF - AI-Native Landing Page

**A world-class AI-augmented landing page that demonstrates AI capabilities through its own existence.**

Built with bleeding-edge technology, this landing page showcases what's possible when AI meets human creativity.

## 🚀 Features

### AI-Powered Interactions
- **WebGL Fluid Simulation** - Real-time liquid intelligence background
- **Adaptive Performance System** - Site adjusts complexity based on device capabilities
- **Particle System** - Interactive particles responding to mouse movement
- **Generative Visualization** - Canvas-based AI visualization in Process section
- **Smart Multi-Step Form** - Adaptive form with conditional logic

### Technical Excellence
- **Astro 5.x** - Lightning-fast static site generation
- **TypeScript** - Strict type safety throughout
- **Tailwind CSS 4.x** - Custom design system with AI-themed palette
- **Zero Layout Shift** - Perfect Core Web Vitals
- **Accessibility First** - WCAG AA compliant

### Performance Targets
- ✅ Lighthouse Performance: 95+
- ✅ LCP: < 1.0s
- ✅ FID: < 50ms
- ✅ CLS: 0
- ✅ 60fps animations

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm

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

The site will be available at `http://localhost:4321`

## 🎨 Design System

### Color Palette
- **Void**: `#0a0a0a` - Deep background
- **Primary (Cyan)**: `#00f5ff` - Electric blue for primary actions
- **Accent (Purple)**: `#bf40ff` - Energy and creativity
- **Coral**: `#ff6b6b` - Warmth and approachability
- **Golden**: `#ffd700` - Intelligence and insight

### Typography
- **Display/Body**: Inter Variable
- **Monospace**: JetBrains Mono
- **Scale**: 1.25 ratio (Major Third)

## 🏗️ Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ai/                 # AI-specific components
│   │   │   ├── FluidBackground.astro
│   │   │   └── ParticleLayer.astro
│   │   └── sections/           # Page sections
│   │       ├── HeroAI.astro
│   │       ├── ProcessVisualization.astro
│   │       ├── PortfolioGrid.astro
│   │       ├── AIStackShowcase.astro
│   │       └── FutureInvitation.astro
│   ├── scripts/
│   │   ├── ai/
│   │   │   ├── adaptive.ts     # Performance adaptation
│   │   │   └── fluid-simulation.ts
│   │   └── animations/
│   │       └── particles.ts
│   ├── styles/
│   │   └── global.css
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── public/
├── RESEARCH.md
├── AI_IMPLEMENTATION.md
├── PERFORMANCE.md
├── ACCESSIBILITY.md
└── README.md
```

## 🎯 Key Sections

### 1. Hero - "Liquid Intelligence"
- WebGL fluid simulation background
- Glitch effect on hero text
- Parallax scrolling
- Particle layer interactions

### 2. Process - "Interactive Canvas Playground"
- Live generative visualization
- User can type prompts to see AI-like responses
- Animated statistics
- Process explanation cards

### 3. Portfolio - "Adaptive Grid"
- Filterable project showcase
- AI involvement badges
- Hover effects with smooth transitions
- Category-based filtering

### 4. AI Stack - "Data Flow Visualization"
- AI tools as interactive cards
- Pulsing activity indicators
- Glow effects on hover
- Usage frequency indicators

### 5. CTA - "The Smart Form"
- Multi-step form with progress indicator
- Real-time validation
- Conditional fields
- Particle explosion on success

## 🔧 Configuration

### Adaptive Performance
The site automatically detects device capability and adjusts:
- **Level 5**: Full WebGPU effects (300k particles)
- **Level 4**: WebGL fluid + particles (150 particles)
- **Level 3**: Particles only (100 particles)
- **Level 2**: Simple gradients + GSAP (50 particles)
- **Level 1**: Static design, fade-ins only

Preferences are saved to localStorage for repeat visits.

### Reduced Motion
Respects `prefers-reduced-motion` by:
- Disabling fluid simulation
- Removing particle systems
- Simplifying animations to < 0.5s
- Providing static alternatives

## 🌐 Browser Support

- **Chrome/Edge**: 120+
- **Firefox**: 120+
- **Safari**: 17+
- **Mobile**: iOS 16+, Android 12+

## 📊 Performance

Built with performance as a core principle:
- Initial JS bundle: < 80KB (gzipped)
- CSS: < 40KB (gzipped)
- Code splitting for heavy libraries
- Lazy loading below the fold
- Preloading critical assets
- Optimized fonts (variable fonts, subset)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels on all interactive elements
- Keyboard navigation supported
- Screen reader tested (NVDA, VoiceOver)
- 4:1 color contrast minimum (AAA where possible)
- Focus indicators on all focusable elements
- Skip links for keyboard users

## 🚢 Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel/Netlify/Cloudflare Pages
Simply connect your git repository - these platforms auto-detect Astro projects.

### Environment Variables
None required for basic deployment.

## 📝 Customization

### Changing Colors
Edit `tailwind.config.mjs`:
```js
colors: {
  primary: '#00f5ff', // Change to your brand color
  // ...
}
```

### Modifying Content
All content is in section components:
- `src/components/sections/*.astro`

### Adding Projects
Edit `src/components/sections/PortfolioGrid.astro` to add more portfolio items.

### Adjusting Performance
Modify thresholds in `src/scripts/ai/adaptive.ts`:
```ts
// Adjust particle counts, quality levels, etc.
```

## 🤝 Contributing

This is a showcase project, but improvements are welcome!
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Credits

### Inspiration
- OpenAI, Anthropic, Runway ML for design patterns
- Awwwards experimental sites for creative direction
- Three.js and GSAP communities for technical examples

### Technologies
- Astro 5.x
- Three.js
- GSAP
- Tailwind CSS
- WebGL

## 📧 Contact

Questions? Reach out through the contact form on the site!

---

**Built with ❤️ using AI augmentation**

This landing page itself is proof of concept: AI-augmented creativity, human-directed, impossibly polished.
