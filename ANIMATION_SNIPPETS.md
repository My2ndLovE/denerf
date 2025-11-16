# ⚡ Animation Snippets Library

Quick copy-paste code for common animations. All tested and ready to use!

---

## GSAP Animations

### 1. Scroll-Triggered Fade In

```typescript
gsap.from('.element', {
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1, // Smooth scrubbing
    markers: true, // Remove in production
  },
});
```

### 2. Parallax Scroll Effect

```typescript
gsap.to('.background', {
  y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
  ease: 'none',
  scrollTrigger: {
    start: 0,
    end: 'max',
    invalidateOnRefresh: true,
    scrub: 0,
  },
});

// HTML: <div class="background" data-speed="0.5"></div>
```

### 3. Text Character Animation

```typescript
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const split = new SplitText('.text', { type: 'chars' });

gsap.from(split.chars, {
  opacity: 0,
  y: 80,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.8,
  ease: 'back.out(1.7)',
});
```

### 4. Stagger Animation (Cards)

```typescript
gsap.from('.card', {
  opacity: 0,
  scale: 0.8,
  y: 50,
  stagger: {
    amount: 0.8,
    from: 'start',
    ease: 'power2.inOut',
  },
  scrollTrigger: {
    trigger: '.card-container',
    start: 'top 70%',
  },
});
```

### 5. Pinned Section with Horizontal Scroll

```typescript
const sections = gsap.utils.toArray('.panel');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + document.querySelector('.container').offsetWidth,
  },
});
```

### 6. Number Counter Animation

```typescript
const counter = { value: 0 };

gsap.to(counter, {
  value: 1000,
  duration: 2,
  onUpdate: () => {
    document.querySelector('.counter').textContent = Math.floor(counter.value);
  },
  scrollTrigger: {
    trigger: '.stats',
    start: 'top 70%',
  },
});
```

### 7. Magnetic Button Effect

```typescript
const button = document.querySelector('.magnetic-btn');
const strength = 50;

button.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = button.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const deltaX = (e.clientX - centerX) / width;
  const deltaY = (e.clientY - centerY) / height;

  gsap.to(button, {
    x: deltaX * strength,
    y: deltaY * strength,
    duration: 0.3,
    ease: 'power2.out',
  });
});

button.addEventListener('mouseleave', () => {
  gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
});
```

### 8. Page Transition

```typescript
// Exit animation
const pageTransitionOut = () => {
  return gsap.to('.page-transition', {
    scaleY: 1,
    transformOrigin: 'bottom',
    duration: 0.5,
    ease: 'power4.inOut',
  });
};

// Enter animation
const pageTransitionIn = () => {
  return gsap.to('.page-transition', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 0.5,
    ease: 'power4.inOut',
    delay: 0.3,
  });
};
```

### 9. Cursor Follow Effect

```typescript
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
  });

  gsap.to(cursorFollower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
  });
});

// Hover states
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to([cursor, cursorFollower], { scale: 1.5, duration: 0.3 });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to([cursor, cursorFollower], { scale: 1, duration: 0.3 });
  });
});
```

### 10. Reveal on Scroll (Image/Text)

```typescript
gsap.utils.toArray('.reveal').forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
});
```

---

## Three.js Snippets

### 1. Particle System

```typescript
import * as THREE from 'three';

const particleCount = 1000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.1,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animation loop
function animate() {
  particles.rotation.y += 0.001;
  particles.rotation.x += 0.0005;
}
```

### 2. Mouse-Interactive Sphere

```typescript
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = mouse.y * 0.5;
      meshRef.current.rotation.y = mouse.x * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#00F0FF"
        wireframe
        emissive="#00F0FF"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
```

### 3. Floating Objects Animation

```typescript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
```

### 4. Glow Effect (Bloom)

```typescript
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Scene() {
  return (
    <>
      {/* Your 3D objects */}
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial emissive="#00F0FF" emissiveIntensity={2} />
      </mesh>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}
```

### 5. Animated Gradient Background

```typescript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec3 color1 = vec3(0.0, 0.94, 1.0); // Cyan
      vec3 color2 = vec3(0.61, 0.0, 1.0); // Purple

      float mixer = sin(uv.x * 2.0 + uTime * 0.5) * 0.5 + 0.5;
      vec3 color = mix(color1, color2, mixer);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
}
```

### 6. 3D Text

```typescript
import { Text3D, Center } from '@react-three/drei';

function Text3DComponent() {
  return (
    <Center>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1}
        height={0.2}
        curveSegments={12}
      >
        Hello AI
        <meshStandardMaterial color="#00F0FF" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  );
}
```

### 7. Raycaster (Click Detection)

```typescript
import { useThree } from '@react-three/fiber';
import { useState } from 'react';

function ClickableObject() {
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      scale={clicked ? 1.5 : 1}
    >
      <boxGeometry />
      <meshStandardMaterial color={clicked ? 'hotpink' : 'cyan'} />
    </mesh>
  );
}
```

### 8. Follow Mouse Camera

```typescript
import { useFrame, useThree } from '@react-three/fiber';

function CameraController() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
```

---

## Framer Motion Animations

### 1. Page Transition Variants

```typescript
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
>
  {children}
</motion.div>
```

### 2. Stagger Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 3. Hover Scale & Rotate

```typescript
<motion.button
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  Click Me
</motion.button>
```

### 4. Scroll Progress Indicator

```typescript
import { useScroll, motion } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-50"
    />
  );
}
```

### 5. AnimatePresence (Conditional Rendering)

```typescript
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      Modal Content
    </motion.div>
  )}
</AnimatePresence>
```

### 6. Path Drawing Animation

```typescript
<motion.svg width="100" height="100">
  <motion.path
    d="M 10 80 Q 52.5 10, 95 80 T 180 80"
    stroke="#00F0FF"
    fill="transparent"
    strokeWidth="3"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
</motion.svg>
```

---

## CSS Animations (for performance)

### 1. Shimmer Effect

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### 2. Glow Pulse

```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px #00F0FF, 0 0 10px #00F0FF;
  }
  50% {
    box-shadow: 0 0 20px #00F0FF, 0 0 30px #00F0FF, 0 0 40px #00F0FF;
  }
}

.glow {
  animation: glow 2s ease-in-out infinite;
}
```

### 3. Floating Animation

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

### 4. Gradient Animation

```css
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(-45deg, #00F0FF, #9D00FF, #FF006B);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
```

---

## Lottie Animation Integration

```typescript
import Lottie from 'lottie-react';
import animationData from './animation.json';

function LottieAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 300, height: 300 }}
    />
  );
}
```

---

## Performance Tips

### Debounce Scroll Events

```typescript
import { useEffect, useState } from 'react';

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

### Intersection Observer (Lazy Animations)

```typescript
import { useEffect, useRef, useState } from 'react';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView];
}

// Usage
const [ref, inView] = useInView({ threshold: 0.5 });

<div ref={ref}>
  {inView && <AnimatedComponent />}
</div>
```

---

## Quick Tips

1. **Use `will-change` sparingly** - Only on elements being animated
2. **Prefer `transform` and `opacity`** - Hardware accelerated
3. **Cleanup GSAP animations** - Use `onComplete` or `kill()`
4. **Lazy load Three.js** - Use `next/dynamic` with `ssr: false`
5. **Reduce particle count on mobile** - Check `window.innerWidth`
6. **Use `useMemo`** for heavy computations in Three.js
7. **Disable animations on mobile** if performance is poor
8. **Use `requestAnimationFrame`** for smooth 60fps animations

---

Mix and match these snippets to create your unique portfolio! 🎨
