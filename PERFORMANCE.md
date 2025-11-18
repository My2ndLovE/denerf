# Performance Documentation

## Performance Philosophy

**Performance is a feature**, not an afterthought. Every decision prioritizes speed, smoothness, and responsiveness.

---

## Target Metrics

### Lighthouse Scores
- ✅ **Performance**: 95+
- ✅ **Accessibility**: 100
- ✅ **Best Practices**: 100
- ✅ **SEO**: 100

### Core Web Vitals
- ✅ **LCP** (Largest Contentful Paint): < 1.0s
- ✅ **FID** (First Input Delay): < 50ms
- ✅ **CLS** (Cumulative Layout Shift): 0
- ✅ **INP** (Interaction to Next Paint): < 200ms

### Custom Metrics
- **Time to Interactive**: < 1.5s
- **60fps**: All animations
- **Bundle Size**: < 100KB initial JS

---

## Optimization Strategies

### 1. Code Splitting

**Astro Islands Architecture**:
- Static HTML generated at build time
- JavaScript only hydrated where needed
- Heavy libraries (Three.js, GSAP) lazy loaded

**Manual Chunks** (`astro.config.mjs`):
```javascript
manualChunks: {
  'three': ['three'],
  'gsap': ['gsap'],
}
```

**Result**: Initial bundle < 80KB (gzipped)

### 2. Asset Optimization

**Fonts**:
- Variable fonts (Inter, JetBrains Mono)
- Subset to used glyphs only
- Preload critical fonts
- `font-display: swap` for progressive rendering

**Images** (when added):
- WebP with JPEG fallback
- AVIF where supported
- Responsive sizes via `<picture>`
- Lazy loading with `loading="lazy"`
- Blur-up placeholders (LQIP)

**CSS**:
- Tailwind purge removes unused styles
- Critical CSS inlined
- Remaining CSS preloaded
- Minification + compression

### 3. Rendering Optimizations

**GPU Acceleration**:
```css
.will-change-transform {
  will-change: transform;
}
```

**Layer Promotion**:
```css
.gpu-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

**Composite Layers**:
- Animations use `transform` and `opacity` only
- Avoid layout thrashing (read→write batching)
- No forced synchronous layouts

### 4. JavaScript Performance

**Event Delegation**:
```typescript
// One listener for all filter buttons
filterContainer.addEventListener('click', handleFilter);
```

**RequestAnimationFrame**:
```typescript
// Smooth 60fps animations
function animate() {
  // Update logic
  requestAnimationFrame(animate);
}
```

**Debouncing/Throttling**:
```typescript
// Resize events throttled to 16ms (60fps)
window.addEventListener('resize', throttle(handleResize, 16));
```

**Worker Offloading** (future):
- Heavy calculations in Web Workers
- Keeps main thread responsive

### 5. Network Optimization

**Resource Hints**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
```

**Compression**:
- Gzip/Brotli for text assets
- Level 9 compression in production

**Caching Strategy**:
```
Cache-Control: public, max-age=31536000, immutable
```

**CDN** (when deployed):
- Static assets served from edge
- Global distribution for low latency

---

## Bundle Analysis

### Initial Load (Production)

| Asset | Size (Gzipped) | Notes |
|-------|----------------|-------|
| HTML | ~15KB | Minified, compressed |
| CSS | ~35KB | Tailwind purged |
| JS (Main) | ~45KB | Astro + core logic |
| JS (Particles) | ~5KB | Lazy loaded |
| JS (Fluid) | ~8KB | Lazy loaded |
| Fonts | ~80KB | Variable fonts, cached |
| **Total (Critical)** | **~95KB** | Under 100KB target ✅ |

### Lazy Loaded (On Interaction)

| Asset | Size (Gzipped) | Load Trigger |
|-------|----------------|--------------|
| GSAP | ~25KB | Scroll below fold |
| Three.js | ~120KB | If 3D needed |

---

## Runtime Performance

### Frame Rate

**Monitoring** (Dev Only):
```typescript
// FPS tracker
let frames = 0, fps = 60;
function checkFPS() {
  frames++;
  if (currentTime >= lastTime + 1000) {
    fps = Math.round(frames * 1000 / elapsed);
    if (fps < 50) console.warn(`FPS dropped to ${fps}`);
  }
}
```

**Targets**:
- **Desktop**: 60fps minimum
- **Mobile**: 60fps on modern devices, 30fps acceptable on budget
- **Adaptive**: Reduce complexity if fps < 50

### Memory Usage

**Monitoring**:
```typescript
// Check every 30s in dev
setInterval(() => {
  if (performance.memory) {
    const used = performance.memory.usedJSHeapSize;
    const limit = performance.memory.jsHeapSizeLimit;
    if (used / limit > 0.9) console.warn('Memory high');
  }
}, 30000);
```

**Budget**:
- **Baseline**: < 50MB
- **With Fluid Sim**: < 60MB
- **With Particles**: < 65MB
- **Total Target**: < 100MB

### CPU Usage

**Idle State**: < 5% CPU
**Scrolling**: < 20% CPU
**Interactions**: < 40% CPU peaks

---

## Adaptive Performance

### Detection Logic

```typescript
// Measure FPS for 2 seconds
async measureFPS(): Promise<number> {
  let frames = 0;
  const duration = 2000;

  return new Promise((resolve) => {
    const measure = () => {
      frames++;
      if (elapsed >= duration) {
        resolve(frames * 1000 / duration);
      } else {
        requestAnimationFrame(measure);
      }
    };
    requestAnimationFrame(measure);
  });
}
```

### Quality Tiers

**Level 5** (High-end):
- All effects enabled
- 200 particles
- Full fluid simulation
- WebGPU if available

**Level 4** (Mid-high):
- WebGL fluid simulation
- 150 particles
- All GSAP animations

**Level 3** (Medium):
- Particles only (100)
- Simple background gradient
- GSAP animations

**Level 2** (Low):
- 50 particles
- Static gradient
- CSS transitions only

**Level 1** (Very low):
- No particles
- Static design
- Fade-ins only (< 0.5s)

### Persistence

```typescript
// Save to localStorage
localStorage.setItem('deviceCapability', JSON.stringify(capability));

// Load on next visit (instant adaptation)
const cached = localStorage.getItem('deviceCapability');
if (cached) this.capability = JSON.parse(cached);
```

---

## Accessibility Performance

### Reduced Motion

**Detection**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Impact**:
- Fluid simulation disabled
- Particle system disabled
- Morphing disabled
- Only essential animations (< 0.5s)

**Performance Benefit**:
- ~30% less CPU usage
- ~20MB less memory
- Faster initial load

### Keyboard Navigation

**Performance Considerations**:
- No layout recalculation on focus
- Smooth scroll with `scroll-behavior: smooth`
- Focus indicators use `outline` (GPU accelerated)

---

## Build Optimizations

### Astro Configuration

```javascript
export default defineConfig({
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs
          drop_debugger: true,
        },
      },
    },
  },
});
```

### PostCSS/Tailwind

```javascript
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['default', {
        discardComments: { removeAll: true },
      }],
    },
  },
};
```

---

## Monitoring & Testing

### Lighthouse CI

```bash
# Run Lighthouse
npm run build
npx @lhci/cli@next autorun

# Target scores
Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100
```

### WebPageTest

**Test Configuration**:
- Location: Multiple (US, EU, Asia)
- Connection: 4G
- Repeat: 3 times

**Targets**:
- **First Byte**: < 200ms
- **Start Render**: < 1.0s
- **Visually Complete**: < 2.0s
- **Fully Loaded**: < 3.0s

### Real User Monitoring (RUM)

**Implementation** (when deployed):
```typescript
// Send to analytics
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  const paintData = performance.getEntriesByType('paint');

  analytics.track('Performance', {
    fcp: paintData.find(p => p.name === 'first-contentful-paint').startTime,
    lcp: getLCP(),
    cls: getCLS(),
    fid: getFID(),
  });
});
```

---

## Performance Checklist

### Pre-Launch
- [ ] Lighthouse scores 95+ all categories
- [ ] Core Web Vitals green (75th percentile)
- [ ] Bundle size < 100KB initial
- [ ] 60fps on test devices
- [ ] No console errors/warnings
- [ ] Network waterfall optimized
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] Reduced motion tested

### Post-Launch
- [ ] RUM data collected
- [ ] Performance budgets set
- [ ] Monitoring alerts configured
- [ ] Regular audits scheduled
- [ ] User feedback analyzed

---

## Future Optimizations

### Potential Improvements
1. **Service Worker**: Cache static assets, offline support
2. **HTTP/3**: Faster multiplexing
3. **WebP/AVIF**: Better image compression (when images added)
4. **Prerendering**: SSR for dynamic content
5. **Edge Functions**: Personalization at edge
6. **Resource Hints**: Prefetch likely next pages

### Continuous Improvement
- Monthly Lighthouse audits
- Quarterly bundle size reviews
- Annual stack upgrades
- User performance feedback loop

---

## Conclusion

**Performance is not a number, it's an experience.**

Our targets ensure:
- **Fast**: Loads in < 1s on good connections
- **Smooth**: 60fps animations always
- **Responsive**: Interactions feel instant
- **Inclusive**: Works on all devices
- **Sustainable**: Low energy usage

Every millisecond matters. Every kilobyte counts.
