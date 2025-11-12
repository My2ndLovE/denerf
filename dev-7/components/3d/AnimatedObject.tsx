'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedObjectProps {
  scrollProgress?: number
}

// Helper function to normalize geometry to have same vertex count
function normalizeGeometry(geometry: THREE.BufferGeometry, targetVertexCount: number): Float32Array {
  const positions = geometry.attributes.position.array as Float32Array
  const normalized = new Float32Array(targetVertexCount * 3)

  // If geometries match, return as is
  if (positions.length === targetVertexCount * 3) {
    return positions
  }

  // Otherwise, sample or interpolate vertices
  const ratio = positions.length / (targetVertexCount * 3)
  for (let i = 0; i < targetVertexCount * 3; i++) {
    const sourceIndex = Math.floor(i * ratio)
    normalized[i] = positions[Math.min(sourceIndex, positions.length - 1)]
  }

  return normalized
}

export default function AnimatedObject({ scrollProgress = 0 }: AnimatedObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Use IcosahedronGeometry as base - it morphs well with other shapes
  const VERTEX_COUNT = 80 // Standard vertex count for morphing

  // Create all geometries with same vertex count
  const geometries = useMemo(() => {
    return {
      torusKnot: new THREE.IcosahedronGeometry(1, 3),
      sphere: new THREE.IcosahedronGeometry(1.2, 3),
      octahedron: new THREE.IcosahedronGeometry(1.3, 1),
      torus: new THREE.IcosahedronGeometry(1, 3),
    }
  }, [])

  // Store original and target positions for morphing
  const morphData = useMemo(() => {
    const subdivisions = 3
    return {
      torusKnot: createTorusKnotPositions(subdivisions),
      sphere: createSpherePositions(subdivisions),
      octahedron: createOctahedronPositions(subdivisions),
      torus: createTorusPositions(subdivisions),
    }
  }, [])

  useEffect(() => {
    if (meshRef.current) {
      // Initialize with torus knot shape
      const geo = meshRef.current.geometry as THREE.BufferGeometry
      geo.setAttribute('position', new THREE.BufferAttribute(morphData.torusKnot, 3))
      geo.computeVertexNormals()
    }
  }, [morphData])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const geo = meshRef.current.geometry as THREE.BufferGeometry
    const positions = geo.attributes.position.array as Float32Array

    // Continuous rotation animation
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.002

    // Determine morphing progress and target shapes
    let sourceShape: Float32Array
    let targetShape: Float32Array
    let morphProgress: number

    if (scrollProgress < 0.25) {
      // Morph from torusKnot to sphere
      sourceShape = morphData.torusKnot
      targetShape = morphData.sphere
      morphProgress = (scrollProgress % 0.25) / 0.25
    } else if (scrollProgress < 0.5) {
      // Morph from sphere to octahedron
      sourceShape = morphData.sphere
      targetShape = morphData.octahedron
      morphProgress = ((scrollProgress - 0.25) % 0.25) / 0.25
    } else if (scrollProgress < 0.75) {
      // Morph from octahedron to torus
      sourceShape = morphData.octahedron
      targetShape = morphData.torus
      morphProgress = ((scrollProgress - 0.5) % 0.25) / 0.25
    } else {
      // Stay as torus
      sourceShape = morphData.torus
      targetShape = morphData.torus
      morphProgress = 1
    }

    // Smooth interpolation using easing
    const easedProgress = easeInOutCubic(morphProgress)

    // Interpolate between source and target positions
    for (let i = 0; i < positions.length; i++) {
      positions[i] = THREE.MathUtils.lerp(
        sourceShape[i],
        targetShape[i],
        easedProgress
      )
    }

    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()

    // Rotate based on scroll (continuous through all sections)
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4

    // Scale animation based on scroll
    const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.3
    groupRef.current.scale.setScalar(scale)

    // Move position based on scroll (more dynamic)
    groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 1.5
    groupRef.current.position.x = Math.cos(scrollProgress * Math.PI * 2) * 0.5
  })

  return (
    <group ref={groupRef}>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.2}
            thickness={1}
            ior={1.5}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </mesh>
      </Float>
    </group>
  )
}

// Easing function for smooth transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Generate vertex positions for different shapes
function createTorusKnotPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Create torus knot shape
    const theta = Math.atan2(y, x)
    const phi = Math.atan2(z, Math.sqrt(x * x + y * y))

    const p = 2
    const q = 3
    const t = theta * p

    const r = 0.5 + 0.3 * Math.cos(q * t)

    modified[i] = r * Math.cos(theta) * 1.2
    modified[i + 1] = r * Math.sin(theta) * 1.2
    modified[i + 2] = 0.3 * Math.sin(q * t) * 1.2
  }

  return modified
}

function createSpherePositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1.2, subdivisions)
  return geo.attributes.position.array as Float32Array
}

function createOctahedronPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1.3, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Push vertices toward octahedron faces
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Normalize and apply octahedron shape
    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    // Octahedron distance formula: |x| + |y| + |z| = 1
    const scale = 1.3 / (Math.abs(nx) + Math.abs(ny) + Math.abs(nz))

    modified[i] = nx * scale
    modified[i + 1] = ny * scale
    modified[i + 2] = nz * scale
  }

  return modified
}

function createTorusPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Create torus shape
    const theta = Math.atan2(y, x)
    const distance = Math.sqrt(x * x + y * y)

    const R = 1.0 // Major radius
    const r = 0.4 // Minor radius

    const newDistance = R + r * Math.cos(Math.asin(z / 1.2))

    modified[i] = newDistance * Math.cos(theta)
    modified[i + 1] = newDistance * Math.sin(theta)
    modified[i + 2] = r * Math.sin(Math.asin(z / 1.2))
  }

  return modified
}
