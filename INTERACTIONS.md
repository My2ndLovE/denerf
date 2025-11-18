# Interactions & Animation Catalog

This document catalogs all interactive elements, animations, and micro-interactions implemented in the Denerf landing page.

---

## 📋 Table of Contents

1. [Animation Philosophy](#animation-philosophy)
2. [Global Interactions](#global-interactions)
3. [Section-Specific Interactions](#section-specific-interactions)
4. [Micro-Interactions](#micro-interactions)
5. [Accessibility Considerations](#accessibility-considerations)
6. [Performance Notes](#performance-notes)

---

## 🎨 Animation Philosophy

### Core Principles

1. **Purposeful Motion**: Every animation serves to delight, guide, or inform
2. **Performance First**: 60fps non-negotiable; use transform/opacity for complex animations
3. **Respect Preferences**: Honor `prefers-reduced-motion` with static fallbacks

### Animation Timing

- **Quick Transitions**: 0.3s (hover states, simple reveals)
- **Standard Animations**: 0.6s (section reveals, card animations)
- **Dramatic Effects**: 1.5-2s (hero code reveal, major state changes)
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` for playful bounce effects

---

## 🌍 Global Interactions

### 1. Scroll Progress Indicator

**Location**: Fixed at top of page
**Trigger**: On scroll
**Effect**: Horizontal bar grows from 0-100% based on scroll position

```css
.scroll-progress {
  position: fixed;
  top: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transform-origin: left;
  transform: scaleX(var(--scroll-progress));
}
```

**Implementation**: `src/layouts/BaseLayout.astro` (script section)
**Accessibility**: `aria-hidden="true"` - purely decorative

---

### 2. Animate on Scroll

**Location**: Throughout site on elements with `.animate-on-scroll`
**Trigger**: Element enters viewport (IntersectionObserver)
**Effect**: Fade in + slide up (translateY from 30px to 0)

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Implementation**: `src/layouts/BaseLayout.astro` (script section)
**Accessibility**: Disabled when `prefers-reduced-motion: reduce`

---

### 3. Skip to Content Link

**Location**: Top-left, hidden until focused
**Trigger**: Keyboard Tab navigation
**Effect**: Slides down when focused

```css
.skip-to-content {
  transform: translateY(-200%);
  transition: transform 0.3s ease;
}

.skip-to-content:focus {
  transform: translateY(0);
}
```

**Implementation**: `src/layouts/BaseLayout.astro`
**Accessibility**: Critical for keyboard users

---

## 🎬 Section-Specific Interactions

### Hero Section

#### The Code Reveal (Signature Feature)

**Trigger**: Auto after 2s OR on first scroll
**Duration**: 1.5-2 seconds total
**Effect**: Code fades out → Visual design fades in with scale

**Animation Sequence**:
1. Initial state: Syntax-highlighted code visible
2. Trigger: setTimeout(2000) or scroll event
3. Code layer: `opacity: 1 → 0`, `scale: 1 → 0.95`
4. After 500ms: Visual layer `opacity: 0 → 1`, `scale: 0.95 → 1`
5. After 2000ms: Remove code layer from DOM

**Implementation**:
```javascript
// Fade out code layer
codeLayer.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
codeLayer.style.opacity = '0';
codeLayer.style.transform = 'scale(0.95)';

// Fade in visual layer
setTimeout(() => {
  visualLayer.style.transition = 'opacity 1.5s ease-in, transform 1.5s ease-in';
  visualLayer.style.opacity = '1';
  visualLayer.style.transform = 'scale(1)';
}, 500);
```

**File**: `src/components/sections/HeroSection.astro`
**Accessibility**: Instant transition when `prefers-reduced-motion` detected

---

#### Scroll Indicator Animation

**Trigger**: Continuous loop
**Effect**: Mouse wheel dot scrolls up and down

```css
@keyframes scroll-wheel {
  0%, 100% {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(8px);
  }
}
```

**Duration**: 1.5s infinite loop
**File**: `src/components/sections/HeroSection.astro`

---

#### Button Hover Effects

**Elements**: Primary and Secondary CTAs
**Trigger**: Mouse hover
**Effects**:
- **Primary Button**: `translateY(-2px)` + glow shadow
- **Arrow Icon**: `translateY(3px)` (downward bounce)
- **Secondary Button**: Background color fade + `translateY(-2px)`

---

### Philosophy Section

#### Horizontal Scroll with Snap

**Trigger**: Mouse/touch drag or scroll
**Effect**: Smooth scroll-snap to center of each card

```css
.principles-wrapper {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.principle-card {
  scroll-snap-align: center;
}
```

**File**: `src/components/sections/PhilosophySection.astro`

---

#### Card Hover Lift

**Trigger**: Mouse hover on card
**Effect**: `translateY(-8px)` + border color change + enhanced shadow

```css
.card-inner:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

---

#### Progress Dots

**Location**: Below card carousel
**Trigger**: Scroll position changes
**Effect**: Active dot scales up and changes color

```javascript
// Update active dot based on scroll position
const updateActiveDot = () => {
  // Find card closest to center
  // Update corresponding dot
  dots[activeIndex].classList.add('active');
};
```

**Interaction**: Click dot to scroll to specific card
**File**: `src/components/sections/PhilosophySection.astro`

---

### Portfolio Section

#### Project Filtering

**Trigger**: Click filter button
**Effect**: Filtered projects fade in, others fade out instantly

```javascript
// Show/hide projects based on filter
if (filter === 'all' || categories.includes(filter)) {
  card.classList.remove('hidden');
  card.style.display = 'block';
} else {
  card.classList.add('hidden');
  card.style.display = 'none';
}
```

**Duration**: Instant (no animation for better UX)
**File**: `src/components/sections/PortfolioSection.astro`

---

#### Project Card Hover

**Trigger**: Mouse hover
**Effects**:
1. Card: `translateY(-8px)` + border glow + shadow enhancement
2. Overlay: Fade in from `opacity: 0 → 1`
3. "View Case Study" button appears

```css
.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
}

.project-card:hover .project-overlay {
  opacity: 1;
}
```

---

### Tech Stack Section

#### Constellation Pulse Animation

**Trigger**: Continuous loop on all nodes
**Effect**: Subtle pulse (opacity + scale)

```css
@keyframes pulse-node {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}
```

**Duration**: 3s infinite
**File**: `src/components/sections/TechStackSection.astro`

---

#### Node Hover Effect

**Trigger**: Mouse hover on category node
**Effect**: Node grows + glow effect

```css
.category-node:hover .node-circle {
  r: 3; /* SVG attribute */
  filter: drop-shadow(0 0 8px currentColor);
}
```

---

#### Tech Card Reveal

**Trigger**: Click category node
**Effect**: Modal-style card fades in with scale

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
```

**Interaction**: Click outside card or different node to close
**File**: `src/components/sections/TechStackSection.astro`

---

#### Proficiency Bar Animation

**Trigger**: Card becomes visible
**Effect**: Bar fills from 0 to proficiency percentage

```css
.proficiency-fill {
  width: var(--proficiency);
  transition: width 0.6s ease-out;
}
```

---

### CTA Section

#### Path Card Magnetic Hover

**Trigger**: Mouse hover
**Effect**: Dramatic lift + border glow + shadow

```css
.cta-path-card:hover .card-inner {
  transform: translateY(-12px);
  border-color: var(--color-primary);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

---

#### Modal Open/Close

**Trigger**: Click path button OR close button/overlay
**Effect**: Modal slides in from top with fade

```css
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Implementation**:
- Clicking overlay or close button removes `.active` class
- ESC key also closes modal
- Body scroll is disabled when modal is open

**File**: `src/components/sections/CTASection.astro`

---

#### Form Submit Animation

**Trigger**: Form submission
**Effects**:
1. Button enters loading state
2. After "API call": Form fades out
3. Success message fades in with scale
4. Success icon scales with bounce

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Duration**: ~500ms
**Auto-close**: Modal closes after 3 seconds

---

## ✨ Micro-Interactions

### 1. Gradient Text Effect

**Location**: Hero title, section titles
**Effect**: Animated gradient background clipped to text

```css
.hero-title {
  background: linear-gradient(135deg, #ffffff 0%, #00f5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

### 2. Button Arrow Slide

**Location**: All CTA buttons with arrows
**Trigger**: Hover
**Effect**: Arrow icon slides right 4px

```css
.button:hover .arrow-icon {
  transform: translateX(4px);
}
```

---

### 3. Tag Hover Glow

**Location**: Technology tags throughout site
**Trigger**: Hover
**Effect**: Border brightens, slight background glow

```css
.tag:hover {
  border-color: var(--color-primary);
  background: rgba(0, 245, 255, 0.15);
}
```

---

### 4. Focus Ring

**Location**: All interactive elements
**Trigger**: Keyboard focus
**Effect**: 3px cyan ring with offset

```css
*:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

### 5. Selection Styling

**Location**: All text
**Effect**: Custom selection color matching brand

```css
::selection {
  background-color: var(--color-primary);
  color: var(--color-base);
}
```

---

## ♿ Accessibility Considerations

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript Detection**:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Skip animations, show final state
}
```

---

### Keyboard Navigation

All interactive elements are keyboard accessible:

- ✅ Buttons are `<button>` elements
- ✅ Links are `<a>` elements with proper hrefs
- ✅ Modal can be closed with ESC key
- ✅ Focus trap within modal when open
- ✅ Clear focus indicators (3px cyan ring)

---

### Screen Reader Support

- All interactive elements have proper labels
- Decorative elements have `aria-hidden="true"`
- Modals use `aria-labelledby` and `aria-describedby`
- Skip-to-content link for easy navigation

---

## ⚡ Performance Notes

### Animation Optimization

1. **Transform/Opacity Only**: Complex animations use only transform and opacity (GPU-accelerated)
2. **Will-Change Sparingly**: Only used on elements about to animate
3. **RequestAnimationFrame**: Custom animations use rAF for 60fps
4. **Lazy Observers**: IntersectionObserver for scroll-triggered effects (low overhead)

---

### Avoided Anti-Patterns

❌ **No**:
- Width/height animations
- Box-shadow on moving elements (pre-render shadows)
- Complex filters on large elements
- Scroll event listeners (use IntersectionObserver)

✅ **Yes**:
- Transform (translate, scale, rotate)
- Opacity
- GPU-accelerated properties
- CSS-only animations when possible

---

## 🎯 Future Enhancements

Potential additions if budget/time allows:

1. **GSAP ScrollTrigger** for advanced scroll animations
2. **View Transitions API** for page navigation
3. **Lottie Animations** for complex illustrations
4. **Custom Cursor** with follower dot
5. **Parallax Layers** on scroll for depth
6. **Text Split Animations** character-by-character reveals
7. **Magnetic Buttons** that follow cursor within radius

---

## 📊 Animation Performance Checklist

- ✅ All animations maintain 60fps
- ✅ No layout thrashing (batch DOM reads/writes)
- ✅ IntersectionObserver for scroll effects
- ✅ Passive event listeners where possible
- ✅ Debounced resize handlers
- ✅ RequestAnimationFrame for custom animations
- ✅ CSS animations preferred over JS when possible
- ✅ Will-change used judiciously

---

**Last Updated**: 2025-11-18
**Maintained By**: Denerf Development Team
