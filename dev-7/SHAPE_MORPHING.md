# Shape Morphing Feature

## Overview

The 3D object now **morphs through 4 different geometric shapes** as you scroll through the entire page, creating a continuous transformation journey from start to finish.

## The Morphing Sequence

### 1. Torus Knot (Hero Section - 0-25%)
- **Shape**: Complex, intertwined tubular knot
- **Symbolism**: Complexity and interconnectedness
- **Visual**: Intricate curves and continuous loops
- **Animation**: Gentle floating with glass refraction

### 2. Sphere (Section 1 - 25-50%)
- **Shape**: Perfect sphere
- **Symbolism**: Unity and simplicity
- **Visual**: Smooth, uniform surface
- **Animation**: Elegant rotation revealing spherical harmony

### 3. Octahedron (Section 2 - 50-75%)
- **Shape**: 8-sided polyhedron (diamond-like)
- **Symbolism**: Precision and structure
- **Visual**: Sharp edges and flat facets
- **Animation**: Crystalline rotation with pronounced light reflections

### 4. Torus (Section 3 - 75-100%)
- **Shape**: Donut/ring shape
- **Symbolism**: Infinity and continuity
- **Visual**: Smooth circular tube forming a ring
- **Animation**: Completes the journey with circular elegance

## Technical Implementation

### Geometry Management
Located in: `components/3d/AnimatedObject.tsx`

```tsx
const geometries = useMemo(() => {
  return {
    torusKnot: new THREE.TorusKnotGeometry(1, 0.3, 128, 32),
    sphere: new THREE.SphereGeometry(1.2, 64, 64),
    octahedron: new THREE.OctahedronGeometry(1.3, 0),
    torus: new THREE.TorusGeometry(1, 0.4, 32, 64),
  }
}, [])
```

### Shape Selection Logic
```tsx
let targetGeometry = geometries.torusKnot

if (scrollProgress >= 0.75) {
  targetGeometry = geometries.torus        // Final section
} else if (scrollProgress >= 0.5) {
  targetGeometry = geometries.octahedron   // Third section
} else if (scrollProgress >= 0.25) {
  targetGeometry = geometries.sphere       // Second section
}
```

### Continuous Animations

All shapes share these animations throughout the entire scroll:

1. **Rotation** (0-100% scroll)
   ```tsx
   groupRef.current.rotation.y = scrollProgress * Math.PI * 4
   // 4 complete rotations from top to bottom
   ```

2. **Scaling** (breathing effect)
   ```tsx
   const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.3
   // Creates pulsing scale from 0.7x to 1.3x
   ```

3. **Position Movement** (circular path)
   ```tsx
   groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 1.5
   groupRef.current.position.x = Math.cos(scrollProgress * Math.PI * 2) * 0.5
   // Creates figure-8 motion pattern
   ```

## Scroll Tracking Fix

### Previous Issue
The scroll animation stopped halfway because the ScrollTrigger was only tracking the container element:

```tsx
// OLD - stopped at "bottom top"
trigger: containerRef.current,
start: 'top top',
end: 'bottom top',  // Animation stopped here!
```

### Solution
Changed to track the entire document body:

```tsx
// NEW - tracks entire page
trigger: 'body',
start: 'top top',
end: 'bottom bottom',  // Continues to page end!
```

## Glass Morphism Material

The same glass material applies to all shapes, creating consistency:

- **Transmission**: 95% transparency with light refraction
- **Roughness**: 0.2 (slightly rough surface)
- **Chromatic Aberration**: 0.5 (rainbow edge effect)
- **IOR**: 1.5 (glass-like refraction index)
- **Thickness**: 1 unit

This creates the "glass sculpture" effect across all geometric forms.

## Customization Guide

### Change Shape Sequence

Edit `components/3d/AnimatedObject.tsx`:

```tsx
const geometries = useMemo(() => {
  return {
    shape1: new THREE.BoxGeometry(2, 2, 2),           // Cube
    shape2: new THREE.ConeGeometry(1, 2, 32),         // Cone
    shape3: new THREE.TetrahedronGeometry(1.5),       // Tetrahedron
    shape4: new THREE.DodecahedronGeometry(1.2),      // Dodecahedron
  }
}, [])
```

### Adjust Transition Points

Change when shapes morph:

```tsx
// Default: Equal quarters (25% each)
if (scrollProgress >= 0.75) { /* shape 4 */ }
else if (scrollProgress >= 0.5) { /* shape 3 */ }
else if (scrollProgress >= 0.25) { /* shape 2 */ }

// Custom: More time for first shape
if (scrollProgress >= 0.8) { /* shape 4 */ }
else if (scrollProgress >= 0.6) { /* shape 3 */ }
else if (scrollProgress >= 0.4) { /* shape 2 */ }
```

### Modify Animation Speed

```tsx
// Faster rotation (more spins)
groupRef.current.rotation.y = scrollProgress * Math.PI * 8  // 8 spins

// Bigger scale changes
const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.8  // 0.2x to 1.8x

// Wider movement range
groupRef.current.position.x = Math.cos(scrollProgress * Math.PI * 2) * 2  // ±2 units
```

### Add More Shapes

For 6 shapes across 6 sections:

```tsx
const geometries = useMemo(() => {
  return {
    shape1: new THREE.TorusKnotGeometry(1, 0.3, 128, 32),
    shape2: new THREE.SphereGeometry(1.2, 64, 64),
    shape3: new THREE.OctahedronGeometry(1.3, 0),
    shape4: new THREE.IcosahedronGeometry(1.2, 0),
    shape5: new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    shape6: new THREE.TorusGeometry(1, 0.4, 32, 64),
  }
}, [])

// Update threshold logic (16.67% each)
if (scrollProgress >= 0.833) { targetGeometry = geometries.shape6 }
else if (scrollProgress >= 0.667) { targetGeometry = geometries.shape5 }
else if (scrollProgress >= 0.5) { targetGeometry = geometries.shape4 }
else if (scrollProgress >= 0.333) { targetGeometry = geometries.shape3 }
else if (scrollProgress >= 0.167) { targetGeometry = geometries.shape2 }
```

## Performance Considerations

1. **Geometry Caching**: All geometries are created once with `useMemo`
2. **Instant Switching**: Geometries swap instantly (no vertex morphing overhead)
3. **Shared Material**: One material instance used for all shapes
4. **Optimized Segments**: Balance detail vs. performance (64 segments for spheres)

## Visual Effect Tips

### Enhance Transitions
- Add more geometric detail to complex shapes (increase segments)
- Reduce segments for simpler shapes to create contrast
- Try different material properties per shape

### Smooth Morphing Alternative
For smoother transitions, consider using geometry morphing libraries:
- `three-mesh-bvh` for vertex-based morphing
- Custom interpolation between geometries
- Particle-based dissolution effects

## Browser Testing

- **Chrome/Edge**: Best performance, full WebGL 2.0 support
- **Firefox**: Good performance, may have slight material differences
- **Safari**: Works well, may need fallback for some effects
- **Mobile**: Reduce geometry complexity for better performance

## Debugging

To see scroll progress in console:

```tsx
console.log('Scroll:', scrollProgress.toFixed(2), 'Shape:',
  scrollProgress < 0.25 ? 'TorusKnot' :
  scrollProgress < 0.5 ? 'Sphere' :
  scrollProgress < 0.75 ? 'Octahedron' : 'Torus'
)
```

## Future Enhancements

Potential improvements:
1. Smooth vertex morphing between shapes
2. Color transitions per shape
3. Particle effects during transitions
4. Camera zoom/angle changes per shape
5. Interactive controls to pause/resume morphing
6. Shape preview navigation dots
