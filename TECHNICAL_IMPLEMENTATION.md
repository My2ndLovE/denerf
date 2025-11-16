# 🛠️ Technical Implementation Guide

## Project Setup

### Initial Setup Commands
```bash
# Create Next.js app with TypeScript
npx create-next-app@latest ai-portfolio --typescript --tailwind --app --src-dir

cd ai-portfolio

# Install 3D dependencies
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Install animation libraries
npm install gsap lenis framer-motion

# Install UI utilities
npm install clsx tailwind-merge
npm install @radix-ui/react-slot lucide-react

# Install dev dependencies
npm install -D @types/three
```

---

## Project Structure

```
ai-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Homepage (sections combined)
│   │   └── globals.css             # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CustomCursor.tsx    # AI-themed cursor
│   │   │   ├── SmoothScroll.tsx    # Lenis wrapper
│   │   │   └── PageTransition.tsx  # Framer Motion transitions
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Neural network hero
│   │   │   ├── About.tsx           # 3D brain/chip section
│   │   │   ├── Skills.tsx          # Orbital skills system
│   │   │   ├── Portfolio.tsx       # 3D card stack
│   │   │   ├── Timeline.tsx        # Horizontal scroll
│   │   │   ├── Testimonials.tsx    # 3D carousel
│   │   │   └── Contact.tsx         # Interactive form
│   │   ├── 3d/
│   │   │   ├── NeuralNetwork.tsx   # Three.js neural net
│   │   │   ├── BrainChip.tsx       # Morphing 3D model
│   │   │   ├── OrbitalSkills.tsx   # Solar system skills
│   │   │   ├── ParticleField.tsx   # Reusable particles
│   │   │   └── Scene.tsx           # Base R3F canvas
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Animated button
│   │   │   ├── Card.tsx            # 3D tilt card
│   │   │   └── LoadingScreen.tsx   # AI training loader
│   │   └── animations/
│   │       ├── TextReveal.tsx      # GSAP text animations
│   │       ├── FadeIn.tsx          # Scroll-triggered fade
│   │       └── CountUp.tsx         # Animated numbers
│   ├── hooks/
│   │   ├── useCursor.ts            # Cursor state management
│   │   ├── useScrollTrigger.ts     # GSAP ScrollTrigger hook
│   │   └── useMediaQuery.ts        # Responsive breakpoints
│   ├── lib/
│   │   ├── utils.ts                # Helper functions
│   │   └── constants.ts            # Site config, colors, etc.
│   └── public/
│       ├── models/                 # GLTF 3D models
│       ├── textures/               # Three.js textures
│       └── fonts/                  # Custom fonts
└── package.json
```

---

## Core Implementation Examples

### 1. Custom Cursor Component

```typescript
// src/components/layout/CustomCursor.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursor } from '@/hooks/useCursor';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { cursorState } = useCursor();

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    switch (cursorState) {
      case 'hover':
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(follower, { scale: 1.8, duration: 0.3 });
        break;
      case 'click':
        gsap.to(cursor, { scale: 0.8, duration: 0.15 });
        break;
      default:
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, duration: 0.3 });
    }
  }, [cursorState]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/50 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
```

### 2. Smooth Scroll Provider

```typescript
// src/components/layout/SmoothScroll.tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
```

### 3. Neural Network Background (Three.js)

```typescript
// src/components/3d/NeuralNetwork.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 50;
    const nodes: Node[] = [];

    // Create random nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }

    // Create connections between nearby nodes
    const connections: number[] = [];
    const maxDistance = 3;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < maxDistance) {
          connections.push(i, j);
        }
      }
    }

    return { nodes, connections };
  }, []);

  // Create geometries
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodes]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 3);

    connections.forEach((nodeIndex, i) => {
      const node = nodes[nodeIndex];
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodes, connections]);

  // Animate nodes
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;

    // Update node positions
    nodes.forEach((node, i) => {
      node.position.add(node.velocity);

      // Bounce off boundaries
      if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 5) node.velocity.z *= -1;

      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    // Update line positions
    connections.forEach((nodeIndex, i) => {
      const node = nodes[nodeIndex];
      linePositions[i * 3] = node.position.x;
      linePositions[i * 3 + 1] = node.position.y;
      linePositions[i * 3 + 2] = node.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <>
      {/* Nodes */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.15}
          color="#00F0FF"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.2} />
      </lineSegments>
    </>
  );
}
```

### 4. Hero Section with R3F Canvas

```typescript
// src/components/sections/Hero.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import NeuralNetwork from '@/components/3d/NeuralNetwork';
import { Suspense } from 'react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Suspense fallback={null}>
            <NeuralNetwork />
          </Suspense>

          {/* Optional: Allow user to rotate view */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-7xl font-bold text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
          <p className="text-2xl text-cyan-400">AI Engineer • ML Specialist</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-cyan-400">
          <div className="mx-auto mt-2 h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
}
```

### 5. GSAP Text Reveal Animation

```typescript
// src/components/animations/TextReveal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextRevealProps {
  children: string;
  className?: string;
  type?: 'words' | 'chars' | 'lines';
}

export default function TextReveal({
  children,
  className = '',
  type = 'words'
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type });
    const elements = type === 'chars' ? split.chars : type === 'lines' ? split.lines : split.words;

    gsap.from(elements, {
      opacity: 0,
      y: 50,
      rotationX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      split.revert();
    };
  }, [children, type]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
```

### 6. 3D Card with Tilt Effect

```typescript
// src/components/ui/Card.tsx
'use client';

import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ xPct, yPct }, api] = useSpring(() => ({
    xPct: 0,
    yPct: 0,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 20;
    const yPct = (y / rect.height - 0.5) * -20;

    api.start({ xPct, yPct });
  };

  const handleMouseLeave = () => {
    api.start({ xPct: 0, yPct: 0 });
  };

  return (
    <animated.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: xPct.to(
          (x, y) => `perspective(1000px) rotateY(${x}deg) rotateX(${yPct.get()}deg)`
        ),
        transformStyle: 'preserve-3d',
      }}
      className={`transition-shadow hover:shadow-2xl hover:shadow-cyan-500/50 ${className}`}
    >
      {children}
    </animated.div>
  );
}
```

### 7. Loading Screen Component

```typescript
// src/components/ui/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
        >
          <div className="text-center">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-cyan-400">
                Initializing Neural Network
              </h2>
              <p className="text-sm text-gray-400">Training model...</p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 w-64 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            {/* Percentage */}
            <div className="mt-4 font-mono text-xl text-cyan-400">
              {Math.floor(progress)}%
            </div>

            {/* Animated dots */}
            <div className="mt-2 flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-cyan-400"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Configuration Files

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00F0FF',
          purple: '#9D00FF',
          pink: '#FF006B',
          dark: '#0A0E1A',
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;
```

---

## Performance Optimization Tips

### 1. Lazy Loading Heavy Components

```typescript
import dynamic from 'next/dynamic';

const NeuralNetwork = dynamic(() => import('@/components/3d/NeuralNetwork'), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>,
});
```

### 2. Reduce Bundle Size

```typescript
// Use specific imports instead of entire library
import { useSpring } from '@react-spring/web';
// NOT: import { useSpring } from 'react-spring';

// Tree-shake Three.js
import { Mesh, BoxGeometry } from 'three';
// NOT: import * as THREE from 'three';
```

### 3. Optimize Three.js Performance

```typescript
// Use instanced meshes for many similar objects
import { InstancedMesh } from 'three';

// Reduce pixel ratio on mobile
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);

// Use frustum culling
mesh.frustumCulled = true;
```

---

## Deployment Checklist

- [ ] Optimize images (use WebP, AVIF)
- [ ] Enable Vercel Analytics
- [ ] Setup proper meta tags for SEO
- [ ] Test on multiple devices/browsers
- [ ] Lighthouse score > 90
- [ ] Setup error monitoring (Sentry)
- [ ] Configure CSP headers
- [ ] Add sitemap.xml
- [ ] Test loading times on slow connections
- [ ] Ensure WCAG accessibility standards

---

Ready to start building! Let me know which section you want to tackle first. 🚀
