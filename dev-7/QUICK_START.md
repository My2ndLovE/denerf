# Quick Start Guide

## What You Have

A working prototype with:
- 3D glass morphism torus knot that animates on scroll
- Smooth scrolling experience with Lenis
- 4 sections: Hero, Transform, Elevate, Innovate
- Minimalist luxury design aesthetic

## View the Prototype

The development server is running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.0.4:3000

## What to Try

1. **Scroll slowly** to see the 3D object rotate, scale, and move
2. **Notice the smooth scrolling** - no janky movements
3. **Watch the glass effect** on the 3D object (refractions and transparency)
4. **Observe the floating animation** - subtle up/down movement

## Key Files to Customize

### Change the 3D Object
**File**: `components/3d/AnimatedObject.tsx`

Replace the torus knot with another shape:
```tsx
// Current:
<torusKnotGeometry args={[1, 0.3, 128, 32]} />

// Try a sphere:
<sphereGeometry args={[1, 32, 32]} />

// Try a box:
<boxGeometry args={[2, 2, 2]} />

// Try an icosahedron:
<icosahedronGeometry args={[1, 0]} />
```

### Adjust Scroll Speed
**File**: `components/ui/SmoothScroll.tsx`

```tsx
duration: 1.2,  // Increase for slower, smoother scroll
wheelMultiplier: 1,  // Increase for faster scroll
```

### Change Animation Behavior
**File**: `components/3d/AnimatedObject.tsx` (in the useFrame hook)

```tsx
// Adjust rotation speed
meshRef.current.rotation.x += 0.003  // Make it spin faster: 0.01
meshRef.current.rotation.y += 0.002  // Make it spin faster: 0.01

// Change scroll-based rotation
groupRef.current.rotation.y = scrollProgress * Math.PI * 2  // More rotations: * 4

// Adjust scaling
const scale = 1 + scrollProgress * 0.5  // Scale more: * 1.5

// Change vertical movement
groupRef.current.position.y = scrollProgress * 2  // Move more: * 4
```

### Modify Glass Material
**File**: `components/3d/AnimatedObject.tsx`

```tsx
<MeshTransmissionMaterial
  transmission={0.95}  // 0-1: transparency (higher = more transparent)
  roughness={0.2}      // 0-1: surface roughness (higher = more rough)
  thickness={1}        // Glass thickness
  ior={1.5}            // Index of refraction (1.5 = glass)
  chromaticAberration={0.5}  // Color separation effect
  color="#ffffff"      // Change to "#ff0000" for red tint
/>
```

### Change Content
**Files**: `components/sections/*.tsx`

Edit the text in any section:
```tsx
<h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
  Your Title Here
</h2>
<p className="text-lg md:text-xl text-gray-600 font-light tracking-wide leading-relaxed">
  Your description here
</p>
```

## Add Your Own 3D Model

1. Get a `.glb` or `.gltf` 3D model
2. Put it in the `public/models/` folder
3. Update `AnimatedObject.tsx`:

```tsx
import { useGLTF } from '@react-three/drei'

export default function AnimatedObject({ scrollProgress = 0 }) {
  const { scene } = useGLTF('/models/your-model.glb')
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}
```

## Performance Tips

If the animation is laggy:

1. **Reduce geometry detail**:
   ```tsx
   <torusKnotGeometry args={[1, 0.3, 64, 16]} />  // Lower numbers
   ```

2. **Lower transmission samples**:
   ```tsx
   <MeshTransmissionMaterial samples={8} />  // Lower from 16
   ```

3. **Disable shadows**:
   ```tsx
   <Canvas shadows={false}>  // In Scene.tsx
   ```

## Common Issues

### "Canvas is blank"
- Check browser console for errors
- Try refreshing the page
- Ensure WebGL is supported in your browser

### "Scroll is not smooth"
- Clear browser cache
- Check if you have other smooth scroll extensions
- Verify Lenis is initialized (check console)

### "3D object not animating"
- Verify GSAP ScrollTrigger is working (check console)
- Ensure you're scrolling enough to trigger animations
- Check the ScrollTrigger start/end points

## Next Steps

1. Add more 3D objects in different sections
2. Create camera movements (not just object transforms)
3. Add particle effects
4. Implement click interactions on 3D objects
5. Add loading screen with progress indicator
6. Create scene transitions between sections

## Need Help?

Check the detailed documentation in `PROJECT_OVERVIEW.md`
