# DESIGN DECISIONS - Immersive Landing Page

## Story Summary (The Visitor Experience)

A visitor arrives at a dark screen with a single pulsing question: "What if code could feel alive?" As they move their cursor, particles gather and form the company name, responding to their touch like a living organism. Scrolling down, the page transforms—a split-screen reveals client problems dissolving into elegant solutions as the visitor drags a slider. Each project becomes a before-and-after story they control. The tech stack appears as a constellation of connected stars, inviting exploration through gentle physics. Finally, a thoughtful invitation appears: not "hire us," but "let's build something unexpected together"—a form that feels like the beginning of a conversation, not a transaction. The visitor leaves feeling they've experienced the company's expertise, not just read about it.

---

## Five-Act Journey Map

### ACT 1: INTRIGUE (Hero - "The Portal")
**Emotional Goal**: Awe + Curiosity
**Duration**: 3 seconds to hook, 30 seconds to explore

**What Captures Attention**:
- Full-screen dark canvas (near black #0a0e27)
- Single glowing text: "What if code could feel alive?"
- Particles/nodes that respond to cursor movement
- Subtle instruction: "Move to explore" (fades after 5s)

**The Question We Plant**:
"What kind of company builds experiences THIS thoughtfully?"

**Technical Implementation**:
- Canvas-based particle system (lightweight, <50KB)
- Cursor tracking with magnetic attraction
- Particles gradually form company name/logo as user moves
- Smooth scroll indicator that pulses gently
- No traditional nav (yet) - full immersion

**Success Metric**: Visitor moves cursor and sees response = hooked

---

### ACT 2: DISCOVERY (Philosophy - "How We Think")
**Emotional Goal**: Understanding + "They get it"
**Duration**: 45-60 seconds

**How We Reveal Uniqueness**:
- Transition from Act 1: Particles settle, screen brightens
- Horizontal scroll cards (desktop) / Vertical (mobile)
- 4 core principles, each a "room" in the gallery

**The 4 Principles** (Specific, No Jargon):
1. **"We prototype in 48 hours"**
   - Visual: Clock morphing into wireframe
   - Subtext: "Speed reveals problems. Talking hides them."

2. **"Performance is empathy"**
   - Visual: Loading spinner vs instant interaction
   - Subtext: "Every millisecond respects your user's time."

3. **"Delight hides in the details"**
   - Visual: Button with micro-interaction playing on loop
   - Subtext: "The best experiences feel magical, not complicated."

4. **"Code is craft, not commodity"**
   - Visual: Code block that transforms into beautiful UI
   - Subtext: "We write code humans will read, not just machines."

**Technical Implementation**:
- GSAP ScrollTrigger horizontal scroll (desktop)
- Snap-scroll with progress indicator
- Each card: full-bleed image/animation + text
- Parallax on images within cards
- Mobile: Vertical scroll with intersection observer reveals

**Success Metric**: Visitor reads all 4, nods in agreement

---

### ACT 3: EVIDENCE (Portfolio - "The Transformation Gallery")
**Emotional Goal**: Credibility + "I want that for my project"
**Duration**: 60-90 seconds

**How We Prove Claims Without Being Boring**:
- The "Inverse Portfolio" concept (our unique idea from research)
- 4-6 featured projects shown as before/after transformations

**The Experience**:
- Grid of project cards, each showing "before" state
- Click any card → Expands to full-screen split view
- Left: Client's problem (slow, cluttered, broken)
- Right: Our solution (fast, clean, elegant)
- Draggable divider between them - visitor controls the reveal
- Shows actual metrics: "3.2s → 0.8s load time" overlaid

**Project Categories** (placeholder content):
1. **E-commerce Rescue**: Conversion rate 2.1% → 8.7%
2. **Enterprise Dashboard**: From Excel chaos to real-time clarity
3. **Mobile App**: 50% bounce rate → 12% bounce rate
4. **API Platform**: Developer onboarding 3 days → 3 hours

**Technical Implementation**:
- Masonry grid (Masonry.js or CSS Grid)
- View Transitions API for card → full-screen
- Split-screen with clip-path based on drag position
- Before/After images optimized (WebP/AVIF)
- Close button returns to grid with transition

**Success Metric**: Visitor drags slider on at least 2 projects

---

### ACT 4: CONNECTION (Tech Stack - "The Constellation")
**Emotional Goal**: Trust + "They know their tools"
**Duration**: 30-45 seconds

**How We Humanize the Technical**:
- Tech stack as interactive constellation/network graph
- Not just logos—showing relationships and rationale

**The Experience**:
- Canvas or SVG visualization
- Technologies as glowing nodes
- Lines connect related techs
- Hover a node:
  - Connected techs highlight
  - Tooltip: "Why we use it: [1 sentence]"
- Gentle floating/physics (Matter.js or simple CSS)
- Categories color-coded: Frontend, Backend, DevOps, Design

**Tech Categories** (6 groups):
1. **Frontend**: React, Vue, Astro, Tailwind
2. **Backend**: Node.js, Python, Go
3. **Database**: PostgreSQL, MongoDB, Redis
4. **Cloud**: AWS, Vercel, Railway
5. **DevOps**: Docker, GitHub Actions, K8s
6. **Design**: Figma, Framer, Storybook

**Technical Implementation**:
- Canvas for particles/nodes
- SVG for connection lines
- requestAnimationFrame for smooth animation
- Tooltip component with Floating UI
- Reduce motion: Static grid fallback

**Success Metric**: Visitor hovers on 3+ technologies

---

### ACT 5: INVITATION (CTA - "Let's Begin")
**Emotional Goal**: Action + Ease + Excitement
**Duration**: 30 seconds to decision

**How We Make Contact Feel Like Opportunity**:
- Not "Contact Us" - instead "Let's Build Something Unexpected"
- Multi-path approach based on visitor intent

**The Experience**:
Three clear pathways (visitor chooses):

1. **"Quick Question"**
   - Email field + message (simple)
   - Promise: "Reply within 4 hours during business hours"

2. **"I Have a Project"**
   - Multi-step form (feels like conversation)
   - Step 1: What are you building?
   - Step 2: What's your timeline?
   - Step 3: How can we reach you?
   - Progress indicator

3. **"Just Exploring"**
   - Links to case studies, tech blog, open source
   - Newsletter signup: "Monthly insights, no spam"
   - Alternative contact: LinkedIn, GitHub

**The Form Experience** (for "Quick Question" and "Project"):
- Fields animate in as you scroll to them
- Label floats up on focus (Material Design style)
- Real-time validation (gentle, helpful)
- Submit button has personality:
  - Default: "Send Message"
  - Hover: "Let's Do This"
  - Loading: Animated ellipsis
  - Success: Checkmark + "Message Sent!"
- Success state shows next steps: "We'll reply within 4 hours. Meanwhile, check out [recent case study]"

**Technical Implementation**:
- Form state management (React island or vanilla JS)
- Client-side validation (before submit)
- Netlify Forms or FormSpree for backend
- Success animation with confetti or subtle celebration
- Local storage to save draft (if visitor navigates away)

**Success Metric**: Form submission rate > 3%

---

## Design Direction Decisions

### Hero Section: "The Particle Portal"
**Final Choice**: Direction B from brief - "The Canvas"

**Rationale**:
- Immediately demonstrates technical skill through execution
- Interactive from first moment (no waiting for scroll)
- Scales well mobile (touch-based interaction)
- Lightweight (can be <50KB with careful coding)

**Animation Details**:
- 80-120 particles
- Particle size: 2-4px, glow effect
- Color: Electric cyan (#00f5ff) with opacity variation
- Magnetic attraction to cursor (radius: 120px)
- Particles form logo/name when cursor still for 2s
- Background: Deep space navy (#0a0e27)

---

### Color Palette: "Future Forward" (Modified)
**Base Palette**:
```css
--color-base: #0a0e27;        /* Deep space navy */
--color-primary: #00f5ff;     /* Electric cyan */
--color-secondary: #bf40bf;   /* Neon purple */
--color-accent: #ffffff;      /* Bright white */
--color-surface: #1a1d2e;     /* Dark surface */
--color-text: #e5e7eb;        /* Light gray text */
--color-text-muted: #9ca3af;  /* Muted text */
```

**Section-Specific Shifts** (subtle):
- Hero: Full dark
- Philosophy: Slightly lighter surface (#1f2937)
- Portfolio: Shifts toward purple accent
- Tech Stack: Returns to cyan
- CTA: Gradient background (cyan → purple)

**Rationale**:
- Signals innovation and technical excellence
- High contrast for accessibility
- Cyan/purple combination is distinctive
- Works well with glow/neon effects
- Still professional, not overwhelming

---

### Typography: "Editorial Tech"
**Final Stack**:
```css
--font-display: 'Inter Variable', sans-serif;
--font-body: 'Inter Variable', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Weights**:
- Headlines: 800
- Subheadings: 600
- Body: 400
- Body emphasis: 500

**Scale** (Desktop):
- Hero: 4rem (64px)
- Section titles: 3rem (48px)
- Card titles: 1.5rem (24px)
- Body: 1.125rem (18px)
- Small: 0.875rem (14px)

**Scale** (Mobile):
- Hero: 2.5rem (40px)
- Section titles: 2rem (32px)
- Card titles: 1.25rem (20px)
- Body: 1rem (16px)

**Rationale**:
- Single variable font = performance
- Inter is highly readable, professional
- JetBrains Mono for code snippets adds technical credibility
- Variable font allows micro-adjustments

---

### Section Implementations

#### Philosophy Section: "Horizontal Scroll Cards"
**Choice**: Approach A from brief

**Layout**:
- Desktop: Horizontal scroll with snap
- Each card: 85vw wide, 70vh tall
- 4 cards total
- Progress dots at bottom
- Smooth momentum scroll (Lenis)

**Card Structure**:
- Full-bleed visual (video, animation, or image)
- Text overlay (bottom-left)
- Principle headline (large)
- Supporting text (1 sentence)

**Mobile Adaptation**:
- Vertical scroll
- Each card: Full viewport height
- Swipe-friendly
- Same content, vertical layout

---

#### Portfolio Section: "Inverse Gallery"
**Choice**: Custom implementation - Approach B (Masonry) + Inverse slider

**Grid**:
- Masonry layout (3 columns desktop, 2 tablet, 1 mobile)
- Featured projects: 2x height
- Hover: Lift + shadow

**Expanded View**:
- Click card → Full-screen takeover
- Split-screen with draggable divider
- Before: Left side, grayscale, metrics overlay
- After: Right side, full color, improved metrics
- Drag divider: Smooth clip-path transition
- Close: View Transitions API back to grid

**Data Per Project**:
- Hero image (before & after)
- Project name
- Client industry
- Key metric improvement
- Tech stack tags
- Link to case study (optional)

---

#### Tech Stack Section: "Constellation Map"
**Choice**: Approach A from brief - Constellation with physics

**Layout**:
- Canvas-based visualization
- ~20-25 technologies
- Nodes sized by proficiency (larger = more experience)
- Connections show relationships

**Interactions**:
- Hover node: Highlight + tooltip
- Click node: Filter case studies that used it (optional)
- Gentle floating motion
- Mouse proximity pushes nodes away slightly (physics)

**Mobile**:
- Touch to reveal tooltip
- Simplified physics (performance)
- Larger touch targets

---

#### Team/Culture Section: Decision
**Choice**: Skip it (Option A from brief)

**Rationale**:
- Small company/solo dev context (assumed)
- Personality integrated throughout (voice, interactions)
- Better to do 5 sections excellently than 6 mediocrely
- Portfolio and philosophy already humanize the brand

**Alternative**:
- If client insists: "Values Visualization" (Option C)
- Show workspace, tools, process through photos
- No headshots, focus on artifacts
- Keep it to 30vh section maximum

---

#### CTA Section: "The Three Paths"
**Choice**: Approach A from brief - The Choice

**Layout**:
- Three cards, side-by-side (desktop)
- Each path clearly labeled
- Icons + headline + micro-description
- Click expands chosen path

**Form Design** (for Project path):
- Multi-step with progress
- One question per screen
- Large, friendly inputs
- Magnetic submit button
- Playful micro-interactions

**Alternative Contacts**:
- LinkedIn icon (links to profile)
- GitHub icon (links to repos)
- Email (for those who prefer it)

---

### Micro-Interactions (7 Selected)

1. **Magnetic Buttons** - All CTA buttons
2. **Staggered Reveal** - Every section's content
3. **Text Split Animation** - Hero headline, section titles
4. **Parallax Layers** - Hero particles, portfolio images
5. **Hover Lift + Shadow** - Portfolio cards, tech nodes
6. **Scroll Progress** - Thin line at top (gradient: cyan → purple)
7. **Smooth Scroll** - Lenis for momentum-based scrolling

---

### Responsive Breakpoints

```css
/* Mobile First */
xs: 0px      /* Base - mobile portrait */
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet portrait */
lg: 1024px   /* Tablet landscape / small desktop */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Large desktop */
```

**Critical Adaptations**:
- Hero: Touch interaction instead of cursor
- Philosophy: Horizontal → Vertical scroll
- Portfolio: 3 col → 2 col → 1 col
- Tech Stack: Simplified physics, larger nodes
- CTA: Cards stack vertically

---

### Performance Budget

**Targets** (from brief):
- FCP: < 0.6s
- LCP: < 1.0s
- CLS: < 0.05
- TTI: < 1.5s
- Total: < 500KB

**Strategy**:
- Critical CSS inline (<14KB)
- JavaScript deferred, total <50KB
- Images: WebP/AVIF, lazy load, blur placeholders
- Fonts: Inter Variable (single file ~100KB), subset, preload
- Canvas code: Inline in hero island
- Animations: CSS where possible, GSAP only for complex

**Islands** (Max 5):
1. Hero - Particle canvas (client:load)
2. Philosophy - Horizontal scroll (client:visible)
3. Portfolio - Masonry grid (client:visible)
4. Tech Stack - Constellation (client:visible)
5. CTA - Form logic (client:idle)

---

### Accessibility Requirements

**WCAG AA Compliance**:
- Color contrast: 4.5:1 minimum (text), 3:1 (large text)
- Focus indicators: Visible on all interactive elements
- Keyboard navigation: Tab order logical, skip links
- Screen readers: Semantic HTML, ARIA labels where needed
- Reduced motion: All animations respect `prefers-reduced-motion`

**Specific Implementations**:
- Hero: Skip link to main content
- Particles: Decorative, aria-hidden, static fallback
- Forms: Labels, error messages, validation
- Animations: CSS classes toggle based on media query
- Color: Not sole indicator (use icons + text)

---

## Tech Stack Final

**Core**:
- Astro 5.x (SSG)
- TypeScript (strict mode)
- Tailwind CSS 4.x

**Animation**:
- GSAP + ScrollTrigger (scroll-based)
- Motion One (lightweight UI animations)
- Custom Canvas (particle system, constellation)
- Lenis (smooth scroll)

**Optional Enhancement**:
- Matter.js (if physics needed beyond simple math)
- Splitting.js (text effects, if GSAP SplitText too heavy)

**Utilities**:
- Astro Icon (SVG icons)
- Astro Image (optimization)
- Sharp (image processing)
- Floating UI (tooltips)

**Forms**:
- React (single island for CTA)
- Netlify Forms (backend)

**Dev Tools**:
- Prettier (formatting)
- ESLint (linting)
- TypeScript (type checking)

---

## Next Steps

1. ✅ Narrative defined
2. ✅ Design decisions made
3. → Setup Astro project
4. → Implement section by section
5. → Polish and optimize

---

*Design decisions finalized: 2025-11-18*
*Ready to build*
