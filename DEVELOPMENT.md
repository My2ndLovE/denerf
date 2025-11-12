# Development Guide

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ai-avatar/      # Holographic avatar system
│   │   ├── chat/           # Chat interface
│   │   ├── sections/       # Page sections
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── lib/
│   │   ├── conversation/   # Conversation engine
│   │   ├── store/          # Zustand state management
│   │   └── utils/          # Helper functions
│   ├── data/               # JSON data files
│   ├── styles/             # Global styles
│   └── pages/              # Astro pages
└── public/                 # Static assets
```

## Key Technologies

- **Astro 4.0**: Static site generator
- **React 18**: Interactive components (avatar + chat only)
- **Tailwind CSS 3.4**: Utility-first styling
- **Zustand**: Lightweight state management
- **Framer Motion**: Chat animations
- **TypeScript**: Type safety

## Understanding the Architecture

### 1. Holographic Avatar

The avatar is built with pure CSS and SVG for maximum performance:

- **Silhouette**: SVG humanoid shape
- **Scan Lines**: CSS animations
- **Glow Effect**: CSS box-shadow
- **Glitch Effect**: CSS clip-path
- **Particles**: Canvas API (desktop) or CSS (mobile)

Location: `src/components/ai-avatar/`

### 2. Conversation Engine

The conversation system is a simple state machine:

1. User interacts (button click or text input)
2. ResponseMatcher finds matching conversation node
3. MessageQueue displays AI messages sequentially
4. ConversationEngine handles node transitions

Location: `src/lib/conversation/`

Data: `src/data/conversations.json`

### 3. State Management

We use Zustand for minimal, performant state:

- **avatarStore**: Avatar state (idle, speaking, etc.)
- **conversationStore**: Current conversation node, messages, options
- **uiStore**: UI state (mobile menu, modals)

Location: `src/lib/store/`

## Customization Guide

### Adding a New Project

1. Add project data to `src/data/projects.json`:

```json
{
  "id": "my-project",
  "title": "My Project",
  "tagline": "Short description",
  "description": "Longer description",
  "challenge": "The problem we solved",
  "solution": "How we solved it",
  "image": "/images/projects/my-project.jpg",
  "imageWebp": "/images/projects/my-project.webp",
  "link": "https://example.com",
  "tech": ["React", "Node.js"],
  "stats": {
    "users": "1000+",
    "uptime": "99.9%"
  }
}
```

2. Add project screenshot to `public/images/projects/my-project.jpg`
3. Run `npm run optimize-images` to generate WebP versions

### Adding a New Service

Edit `src/data/services.json`:

```json
{
  "id": "my-service",
  "icon": "🎯",
  "title": "My Service",
  "description": "What this service does",
  "tech": ["Tech1", "Tech2"],
  "features": [
    "Feature 1",
    "Feature 2"
  ]
}
```

### Modifying Conversations

Edit `src/data/conversations.json`.

Example conversation node:

```json
{
  "my-node": {
    "id": "my-node",
    "section": "hero",
    "messages": [
      {
        "id": "msg-1",
        "text": "Hello! 👋",
        "delay": 0,
        "avatarState": "speaking"
      }
    ],
    "options": [
      {
        "id": "opt-1",
        "icon": "🚀",
        "label": "Get started",
        "keywords": ["start", "begin", "go"],
        "responseNodeId": "next-node"
      }
    ],
    "allowTextInput": true
  }
}
```

### Changing Colors

Edit `tailwind.config.mjs`:

```javascript
colors: {
  'bg-primary': '#0a0a0f',    // Background
  'primary': '#00d4ff',        // Cyan (hologram)
  'secondary': '#8b5cf6',      // Purple
  'accent': '#f59e0b',         // Amber (CTA)
  'text-primary': '#f8fafc',   // White
}
```

## Performance Tips

### 1. Keep Bundle Size Small

- Use `client:load` sparingly (only for interactive components)
- Lazy load heavy libraries
- Use CSS animations instead of JavaScript where possible

### 2. Optimize Images

- Always use WebP format
- Provide fallback JPEG
- Use responsive images (srcset)
- Lazy load images below the fold

### 3. Avatar Performance

The avatar adapts to device capabilities:

- **High-end**: Canvas particles, all effects
- **Medium**: CSS particles, most effects
- **Low-end**: Minimal effects, CSS-only animations

### 4. Accessibility

- All interactive elements have min 44px touch targets
- Keyboard navigation works everywhere
- Respects `prefers-reduced-motion`
- Semantic HTML throughout

## Testing

### Manual Testing Checklist

- [ ] Hero section: Avatar appears, chat loads, buttons work
- [ ] About section: Timeline displays, stats show
- [ ] Services section: Cards display, hover effects work
- [ ] Portfolio section: Projects show, links work
- [ ] Contact section: Form validates, submission works
- [ ] Mobile: All sections responsive, touch targets adequate
- [ ] Keyboard: Tab through all interactive elements
- [ ] Accessibility: Screen reader friendly

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Common Tasks

### Add a new conversation flow

1. Add nodes to `src/data/conversations.json`
2. Link nodes using `responseNodeId`
3. Test in browser

### Change avatar behavior

Edit `src/lib/store/avatarStore.ts` for state
Edit `src/components/ai-avatar/HolographicAvatar.tsx` for rendering

### Add a new section

1. Create `src/components/sections/MySection.astro`
2. Import and add to `src/pages/index.astro`
3. Update navigation in `Footer.astro`

### Modify animations

- **CSS animations**: Edit `src/styles/hologram.css`
- **Framer Motion**: Edit `src/components/chat/` files
- **GSAP**: Would be added to `src/lib/gsap/` (not implemented yet)

## Debugging

### Avatar not showing

1. Check React component loaded: Look for `client:load` directive
2. Check browser console for errors
3. Verify Zustand store initialized

### Conversation not working

1. Check `conversations.json` syntax
2. Verify node IDs match
3. Check ConversationEngine initialization
4. Look at browser console

### Styling issues

1. Check Tailwind class names
2. Verify global CSS loaded
3. Inspect element in DevTools
4. Check for CSS specificity conflicts

## Next Steps

Potential enhancements:

1. **GSAP Horizontal Scroll**: Add smooth horizontal scroll for portfolio
2. **Project Modals**: Expand projects in modal overlay
3. **Dark/Light Mode**: Add theme switcher
4. **Analytics**: Track conversation paths
5. **A/B Testing**: Test different conversation flows

---

Happy coding! 🎨
