# Development Guide

Quick reference for developers working on this project.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

## Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## Component Conventions

### Naming
- React components: PascalCase (e.g., `Hero.tsx`)
- Astro components: PascalCase (e.g., `BaseLayout.astro`)
- Utilities: camelCase (e.g., `global.css`)

### Client Directives

Use appropriate hydration strategies:

```astro
<!-- Load immediately -->
<Component client:load />

<!-- Load when visible -->
<Component client:visible />

<!-- Load on idle -->
<Component client:idle />

<!-- Only on media query -->
<Component client:media="(min-width: 768px)" />
```

## Animation Guidelines

### GSAP Best Practices

```typescript
// Always cleanup on unmount
useEffect(() => {
  const animation = gsap.to(...);
  return () => animation.kill();
}, []);

// Use ScrollTrigger
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  }
});
```

### Framer Motion Best Practices

```typescript
// Use variants for complex animations
const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={variants}
/>
```

## Performance Checklist

- [ ] Images optimized (WebP, lazy loading)
- [ ] Components use appropriate hydration
- [ ] Heavy libraries code-split
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Three.js uses `frustumCulled`
- [ ] GSAP animations cleaned up on unmount

## Accessibility Checklist

- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on images
- [ ] Headings in proper hierarchy

## File Organization

```
src/
├── components/       # React components
│   └── *.tsx        # Component with animations
├── layouts/         # Astro layouts
│   └── *.astro      # Page templates
├── pages/           # Astro pages (routes)
│   └── index.astro  # Homepage
└── styles/          # Global styles
    └── global.css   # Tailwind + custom CSS
```

## Styling Conventions

### Tailwind Utilities

Use custom utilities defined in `global.css`:

```html
<div class="glass">           <!-- Glassmorphism effect -->
<div class="gradient-text">   <!-- Gradient text -->
<div class="btn-quantum">     <!-- Quantum button -->
<div class="neon-glow">       <!-- Neon glow effect -->
```

### Custom Colors

```css
/* Use Quantum colors */
bg-quantum-dark
bg-quantum-cyan
bg-quantum-purple
bg-quantum-pink
```

## Three.js Optimization

```typescript
// Use low poly counts
const geometry = new THREE.SphereGeometry(1, 16, 16); // Not 64, 64

// Enable frustum culling
<Points frustumCulled={true} />

// Use PointMaterial for particles
<PointMaterial size={0.02} sizeAttenuation={true} />

// Limit particle count on mobile
const count = window.innerWidth < 768 ? 1000 : 2000;
```

## Common Issues

### Issue: Animations not working on scroll

**Solution:** Make sure GSAP ScrollTrigger is registered:

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Issue: Three.js blank on build

**Solution:** Add to `astro.config.mjs`:

```javascript
vite: {
  ssr: {
    noExternal: ['three'],
  },
}
```

### Issue: Hydration mismatch

**Solution:** Use `client:only` for components that can't render server-side:

```astro
<Component client:only="react" />
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit with meaningful messages
git commit -m "feat: add particle field to hero section"

# Push to remote
git push origin feature/my-feature
```

## Deployment

### Environment Variables

None required for this project.

### Build Output

Static site generated to `dist/` directory.

### Deploy to Cloudflare Pages

```bash
npm run build
# Upload dist/ folder to Cloudflare Pages
```

## Debugging

### Enable React DevTools

Install React DevTools browser extension.

### Enable Three.js Stats

Add to ParticleField component:

```typescript
import { Stats } from '@react-three/drei';

<Canvas>
  <Stats />
  {/* ... */}
</Canvas>
```

### Debug GSAP Animations

```typescript
// See animation details
gsap.globalTimeline.timeScale(0.1); // Slow motion
```

## Resources

- [Astro Docs](https://docs.astro.build)
- [GSAP Docs](https://greensock.com/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

Happy coding! 🚀
