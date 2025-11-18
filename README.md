# DeNeRF - AI-Native Landing Page

> Building Tomorrow With AI

An AI-native landing page that demonstrates the power of combining human creativity with AI precision. This project showcases cutting-edge web technologies, stunning animations, and interactive experiences.

## ✨ Features

### 🎨 Design Excellence
- **Neural Genesis Hero**: Interactive 3D neural network visualization using Three.js
- **AI-themed Design System**: "Neural Noir" color palette with electric cyan and purple accents
- **Fluid Animations**: GSAP-powered scroll-triggered animations
- **Responsive Design**: Mobile-first approach with desktop enhancements

### 🤖 AI-Powered Sections
1. **The Awakening (Hero)**: Immersive 3D particle system forming a neural network
2. **The Collaboration**: Visual demonstration of Human + AI synergy
3. **The Proof**: Adaptive portfolio grid showcasing AI-powered projects
4. **The Intelligence**: Interactive AI tool showcase with visual hierarchy
5. **The Invitation**: Conversational contact form with multi-step UX

### 🚀 Technical Highlights
- **Astro 5.x**: Static site generation with Islands architecture
- **TypeScript**: Strict mode for type safety
- **Tailwind CSS 4**: Utility-first styling with custom design tokens
- **GSAP + ScrollTrigger**: Professional-grade animations
- **Three.js**: Real-time 3D graphics and particle systems
- **Performance Optimized**: Target Lighthouse score 95+

## 🛠️ Tech Stack

```
Framework:        Astro 5.x
Language:         TypeScript (strict)
Styling:          Tailwind CSS 4.x
Animations:       GSAP 3.x, ScrollTrigger
3D Graphics:      Three.js r171+
Effects:          Canvas Confetti
```

## 📦 Installation

**Note**: This project requires Node.js 18+ and npm/pnpm.

```bash
# Clone the repository
git clone https://github.com/My2ndLovE/denerf.git
cd denerf

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
denerf/
├── src/
│   ├── components/
│   │   ├── ai/                  # AI-specific components
│   │   ├── 3d/                  # Three.js 3D components
│   │   ├── interactive/         # Interactive elements
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroAI.astro
│   │   │   ├── ProcessVisualization.astro
│   │   │   ├── PortfolioGrid.astro
│   │   │   ├── AIStackShowcase.astro
│   │   │   └── ContactForm.astro
│   │   └── ui/                  # Base UI components
│   ├── layouts/
│   │   └── BaseLayout.astro     # Main layout
│   ├── pages/
│   │   └── index.astro          # Homepage
│   ├── scripts/
│   │   ├── ai/                  # AI algorithms
│   │   ├── animations/          # Animation utilities
│   │   └── utils/               # Helper functions
│   ├── styles/
│   │   └── global.css           # Global styles
│   └── shaders/                 # WebGL shaders
├── public/                      # Static assets
├── astro.config.mjs             # Astro configuration
├── tailwind.config.mjs          # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── RESEARCH.md                  # Research documentation
├── NARRATIVE.md                 # Narrative architecture
└── README.md                    # This file
```

## 🎯 Key Sections

### 1. Hero: The Awakening
**Technology**: Three.js particle system with 5,000-10,000 particles
- Real-time neural network visualization
- Nodes pulse and connect based on proximity
- Mouse parallax effect on text
- Smooth GSAP entrance animations

### 2. Process: Human-AI Symphony
**Technology**: GSAP animations, responsive grid
- Split-screen visualization showing collaboration
- Staggered animations on scroll
- Interactive hover states
- Mobile-optimized layout

### 3. Portfolio: Built With AI
**Technology**: Dynamic filtering, GSAP transitions
- 8 project showcases
- Filter by industry/technology
- Hover animations
- Case study links

### 4. AI Stack: Our Arsenal
**Technology**: Interactive cards, pulse animations
- 8+ AI tools showcased
- Usage frequency indicators
- Workflow visualization
- Tooltip-style interactions

### 5. Contact: Conversational Form
**Technology**: Multi-step form, state management
- Chat-style UI
- Progressive disclosure
- Real-time validation
- Confetti success animation

## 🎨 Design System

### Colors
```css
/* Base */
--void: #0a0a0a        /* Near black */
--surface: #1a1a1a     /* Dark surface */
--elevated: #2a2a2a    /* Elevated elements */

/* Primary - Electric Cyan */
--primary: #00f5ff
--primary-glow: #00f5ff80
--primary-dim: #00f5ff40

/* Accent - Purple Energy */
--accent: #bf40ff
--accent-glow: #bf40ff80
--accent-dim: #bf40ff40

/* Semantic */
--success: #00ff88
--warning: #ffaa00
--error: #ff0055
```

### Typography
```css
/* Font Stack */
font-display: 'Inter Variable', 'SF Pro Display', system-ui
font-body: 'Inter Variable', system-ui
font-mono: 'JetBrains Mono', 'Fira Code', monospace

/* Scale (1.25 ratio - Major Third) */
text-xs to text-hero (0.64rem to 6rem)
```

### Spacing
```css
/* Base unit: 4px (0.25rem) */
1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48
```

## 🚀 Performance Targets

- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 0.8s
- **Time to Interactive**: < 1.5s
- **Cumulative Layout Shift**: < 0.05
- **Bundle Size**: < 100KB initial JS

## ♿ Accessibility

- WCAG AA compliant
- Semantic HTML5
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader tested
- Reduced motion support via `prefers-reduced-motion`
- Focus indicators
- Color contrast ratios meet AAA standards

## 🌐 Browser Support

- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari (iOS 17+)
- Chrome Mobile (Android 14+)

## 📄 License

MIT License - feel free to use this project as inspiration for your own AI-native landing pages!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- Email: hello@denerf.ai
- Twitter: [@denerf](https://twitter.com/denerf)
- GitHub: [@My2ndLovE](https://github.com/My2ndLovE)

---

**Built with AI. Approved by humans.** 🚀✨🤖
