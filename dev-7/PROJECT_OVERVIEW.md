# 3D Scroll Animation Prototype

A high-performance web prototype featuring scroll-driven 3D animations, inspired by luxury web designs like WebGI Jewelry.

## Features

- **Smooth Vertex Morphing**: 3D object smoothly transforms through 4 different geometric shapes
  - Torus Knot (Hero) → Sphere (Section 1) → Octahedron (Section 2) → Torus (Section 3)
  - Vertex-based interpolation with cubic easing
  - Fluid, organic transitions without sudden jumps
- **Smooth Scroll**: Implemented with Lenis for buttery-smooth scrolling experience
- **Continuous Animations**: Object animates throughout entire scroll journey (0-100%)
- **3D Scene**: React Three Fiber with glass morphism material effect
- **Scroll Animations**: GSAP ScrollTrigger for synchronized 3D transformations
- **Dynamic Movement**: Circular motion patterns and scale changes based on scroll position
- **Minimalist Design**: Clean typography and generous whitespace
- **Performance Optimized**: Pre-computed geometries, efficient interpolation, code splitting

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **React Three Fiber** - Declarative Three.js in React
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Visual effects
- **Lenis** - Smooth scroll library
- **GSAP ScrollTrigger** - Scroll-based animations
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - UI animations

## Project Structure

```
dev-7/
├── app/
│   ├── globals.css          # Global styles with custom animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page orchestrator
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx         # Main 3D canvas setup
│   │   ├── AnimatedObject.tsx # 3D object with animations
│   │   └── ScrollScene.tsx   # Scroll-aware 3D wrapper
│   ├── sections/
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Section1.tsx      # Transform section
│   │   ├── Section2.tsx      # Elevate section
│   │   └── Section3.tsx      # Innovate section
│   └── ui/
│       └── SmoothScroll.tsx  # Lenis smooth scroll provider
└── public/                    # Static assets

```

## How It Works

### 1. Smooth Scrolling
The `SmoothScroll` component wraps the entire app with Lenis, providing:
- Natural momentum-based scrolling
- Customizable easing curves
- Better control over scroll behavior

### 2. 3D Scene Management
- `Scene.tsx`: Sets up the Three.js canvas with lighting and environment
- `AnimatedObject.tsx`: Creates the 3D torus knot with glass morphism material
- Continuous rotation + scroll-based transformations

### 3. Scroll-Triggered Animations
The `ScrollScene` component uses GSAP ScrollTrigger to:
- Track scroll progress (0 to 1)
- Pass progress to 3D objects
- Rotate, scale, and translate objects based on scroll position

### 4. Content Sections
Each section is:
- Fixed to viewport height (100vh)
- Positioned relative with z-index above 3D scene
- Contains centered, minimal content

## Animation Flow

1. **Hero (0-25% scroll)**: Torus Knot shape - Complex, intertwined geometry with gentle floating
2. **Section 1 (25-50% scroll)**: Morphs into Sphere - Perfect spherical harmony emerges
3. **Section 2 (50-75% scroll)**: Transforms to Octahedron - Crystalline, diamond-like structure
4. **Section 3 (75-100% scroll)**: Completes as Torus - Infinite ring symbolizing continuity

**Throughout the entire scroll**:
- Continuous Y-axis rotation (4 full spins across the page)
- Dynamic scaling using sine wave (breathing effect)
- Circular X/Y position movement
- Glass morphism material remains constant across all shapes

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

### Change 3D Object
Edit `components/3d/AnimatedObject.tsx`:
- Replace `<torusKnotGeometry>` with other geometries
- Adjust material properties for different glass effects
- Modify animation logic in `useFrame`

### Adjust Scroll Behavior
Edit `components/ui/SmoothScroll.tsx`:
- `duration`: Controls scroll smoothness (higher = smoother)
- `easing`: Custom easing function
- `wheelMultiplier`: Scroll speed

### Modify Animations
Edit `components/3d/ScrollScene.tsx`:
- Adjust `scrub` value for animation responsiveness
- Change `start` and `end` points for trigger timing

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes

## Performance Tips

1. **3D Optimization**
   - Use lower polygon count models for production
   - Implement Level of Detail (LOD)
   - Optimize texture sizes

2. **React Optimization**
   - Use React.memo for static sections
   - Implement lazy loading for heavy components
   - Monitor re-renders with React DevTools

3. **Asset Optimization**
   - Compress 3D models (.glb preferred)
   - Use optimized images (WebP format)
   - Implement code splitting

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (may have WebGL performance differences)

## Known Issues

- Initial load may take a moment for 3D resources
- Mobile performance varies based on device capabilities

## Next Steps

To extend this prototype:
1. Add more 3D objects with different materials
2. Implement camera position transitions
3. Add particle effects with @react-three/postprocessing
4. Create multiple 3D scenes for different sections
5. Add interactive 3D controls (drag, click)
6. Implement scene transitions (morph between objects)

## Credits

Inspired by [WebGI Jewelry](https://webgi-jewelry.vercel.app/)
