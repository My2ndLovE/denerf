'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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
  const prevScrollRef = useRef<number>(scrollProgress)
  const { invalidate, gl, scene, camera } = useThree()

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
      sphere: createSpherePositions(subdivisions),
      cube: createCubePositions(subdivisions),
      quantumField: createQuantumFieldPositions(subdivisions),
      neuralNetwork: createNeuralNetworkPositions(subdivisions),
      tesseract: createTesseractPositions(subdivisions),
      dnaHelix: createDNAHelixPositions(subdivisions),
      molecularLattice: createMolecularLatticePositions(subdivisions),
      lowPolyDiamond: createLowPolyDiamondPositions(subdivisions),
      octahedron: createOctahedronPositions(subdivisions),
      fractalPyramid: createFractalPyramidPositions(subdivisions),
      glitchSphere: createGlitchSpherePositions(subdivisions),
      torus: createTorusPositions(subdivisions),
    }
  }, [])

  useEffect(() => {
    if (meshRef.current) {
      // Initialize with sphere shape
      const geo = meshRef.current.geometry as THREE.BufferGeometry
      geo.setAttribute('position', new THREE.BufferAttribute(morphData.sphere, 3))
      geo.computeVertexNormals()
    }
  }, [morphData])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const geo = meshRef.current.geometry as THREE.BufferGeometry
    const positions = geo.attributes.position.array as Float32Array
    const material = meshRef.current.material as any

    // Detect transition back to hero section - recreate entire geometry
    const justReturnedToHero = prevScrollRef.current > 0 && scrollProgress === 0
    if (justReturnedToHero) {
      // Dispose old geometry and create fresh one
      geo.dispose()
      const newGeo = new THREE.IcosahedronGeometry(1, 3)
      const newPositions = newGeo.attributes.position.array as Float32Array
      // Copy sphere positions
      for (let i = 0; i < newPositions.length; i++) {
        newPositions[i] = morphData.sphere[i]
      }
      meshRef.current.geometry = newGeo
      // Force multiple invalidations and manual render
      invalidate()
      gl.render(scene, camera)
      invalidate()
      prevScrollRef.current = scrollProgress
      return
    }
    prevScrollRef.current = scrollProgress

    // Continuous rotation animation (varies by section)
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.002

    // Determine morphing progress and target shapes (14 shapes across page)
    let sourceShape: Float32Array
    let targetShape: Float32Array
    let morphProgress: number
    let materialStyle: number // 0-6: glass → holographic → quantum → matrix → neon → plasma → metallic

    // Calculate which shape to show based on scroll
    if (scrollProgress === 0) {
      // Hero section - show sphere
      sourceShape = morphData.sphere
      targetShape = morphData.sphere
      morphProgress = 0
      materialStyle = 0
    } else {
      const section = Math.floor(scrollProgress / (1/12)) // 12 sections now (removed scattered)
      const localProgress = (scrollProgress % (1/12)) / (1/12)

      switch(section) {
        case 0: // Sphere → Cube (Glass → Holographic)
          sourceShape = morphData.sphere
          targetShape = morphData.cube
          morphProgress = localProgress
          materialStyle = localProgress * 1
          break
        case 1: // Cube → Quantum Field (Holographic)
          sourceShape = morphData.cube
          targetShape = morphData.quantumField
          morphProgress = localProgress
          materialStyle = 1
          break
        case 2: // Quantum Field → Neural Network (Holographic → Quantum)
          sourceShape = morphData.quantumField
          targetShape = morphData.neuralNetwork
          morphProgress = localProgress
          materialStyle = 1 + localProgress * 1
          break
        case 3: // Neural Network → Tesseract (Quantum)
          sourceShape = morphData.neuralNetwork
          targetShape = morphData.tesseract
          morphProgress = localProgress
          materialStyle = 2
          break
        case 4: // Tesseract → DNA Helix (Quantum → Matrix)
          sourceShape = morphData.tesseract
          targetShape = morphData.dnaHelix
          morphProgress = localProgress
          materialStyle = 2 + localProgress * 1
          break
        case 5: // DNA Helix → Molecular Lattice (Matrix)
          sourceShape = morphData.dnaHelix
          targetShape = morphData.molecularLattice
          morphProgress = localProgress
          materialStyle = 3
          break
        case 6: // Molecular Lattice → Low Poly Diamond (Matrix → Wireframe)
          sourceShape = morphData.molecularLattice
          targetShape = morphData.lowPolyDiamond
          morphProgress = localProgress
          materialStyle = 3 + localProgress * 1
          break
        case 7: // Low Poly Diamond → Octahedron (Wireframe → Neon)
          sourceShape = morphData.lowPolyDiamond
          targetShape = morphData.octahedron
          morphProgress = localProgress
          materialStyle = 4 + localProgress * 1
          break
        case 8: // Octahedron → Fractal Pyramid (Neon)
          sourceShape = morphData.octahedron
          targetShape = morphData.fractalPyramid
          morphProgress = localProgress
          materialStyle = 5
          break
        case 9: // Fractal Pyramid → Glitch Sphere (Neon → Plasma)
          sourceShape = morphData.fractalPyramid
          targetShape = morphData.glitchSphere
          morphProgress = localProgress
          materialStyle = 5 + localProgress * 1
          break
        case 10: // Glitch Sphere → Torus (Plasma)
          sourceShape = morphData.glitchSphere
          targetShape = morphData.torus
          morphProgress = localProgress
          materialStyle = 6
          break
        case 11: // Torus (Plasma → Metallic)
        default:
          sourceShape = morphData.torus
          targetShape = morphData.torus
          morphProgress = 1
          materialStyle = 6 + localProgress * 1
          break
      }
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

    // Force update
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()

    // Update material properties based on materialStyle
    if (material) {
      // Glass (0) → Holographic (1) → Quantum (2) → Matrix (3) → Wireframe (4) → Neon (5) → Plasma (6) → Metallic (7)

      // Transmission (glass effect)
      material.transmission = THREE.MathUtils.lerp(0.95, 0, Math.min(materialStyle, 1))

      // Thickness
      material.thickness = THREE.MathUtils.lerp(1, 0.1, Math.min(materialStyle, 1))

      // Roughness - varies across all material states
      if (materialStyle < 1) {
        material.roughness = 0.2 // Glass
      } else if (materialStyle < 2) {
        material.roughness = THREE.MathUtils.lerp(0.2, 0.7, materialStyle - 1) // Holographic
      } else if (materialStyle < 3) {
        material.roughness = THREE.MathUtils.lerp(0.7, 0.4, materialStyle - 2) // Quantum (shimmery)
      } else if (materialStyle < 4) {
        material.roughness = THREE.MathUtils.lerp(0.4, 0.85, materialStyle - 3) // Matrix (code-like)
      } else if (materialStyle < 5) {
        material.roughness = 0.9 // Wireframe/matte
      } else if (materialStyle < 6) {
        material.roughness = THREE.MathUtils.lerp(0.9, 0.15, materialStyle - 5) // Neon (glossy)
      } else if (materialStyle < 7) {
        material.roughness = THREE.MathUtils.lerp(0.15, 0.3, materialStyle - 6) // Plasma (energetic)
      } else {
        material.roughness = 0.05 // Metallic (mirror-like)
      }

      // Chromatic aberration - stronger in middle sections
      if (materialStyle < 3) {
        material.chromaticAberration = THREE.MathUtils.lerp(0.5, 2.0, materialStyle / 3)
      } else {
        material.chromaticAberration = THREE.MathUtils.lerp(2.0, 0.8, (materialStyle - 3) / 4)
      }

      // IOR (index of refraction)
      material.ior = THREE.MathUtils.lerp(1.5, 2.8, Math.min(materialStyle / 4, 1))

      // Distortion for quantum/matrix effects
      if (materialStyle >= 2 && materialStyle < 4) {
        material.distortion = THREE.MathUtils.lerp(0.2, 0.8, (materialStyle - 2) / 2)
        material.distortionScale = 0.7
      } else {
        material.distortion = 0.2
        material.distortionScale = 0.5
      }

      // Color shifts across 7 material states
      if (materialStyle < 1) {
        material.color.setHex(0xffffff) // White glass
      } else if (materialStyle < 2) {
        // White to cyan holographic
        material.color.lerpColors(
          new THREE.Color(0xffffff),
          new THREE.Color(0x00ffff),
          materialStyle - 1
        )
      } else if (materialStyle < 3) {
        // Cyan to electric blue (quantum)
        material.color.lerpColors(
          new THREE.Color(0x00ffff),
          new THREE.Color(0x0088ff),
          materialStyle - 2
        )
      } else if (materialStyle < 4) {
        // Electric blue to green (matrix)
        material.color.lerpColors(
          new THREE.Color(0x0088ff),
          new THREE.Color(0x00ff88),
          materialStyle - 3
        )
      } else if (materialStyle < 5) {
        // Green to purple (wireframe)
        material.color.lerpColors(
          new THREE.Color(0x00ff88),
          new THREE.Color(0xaa00ff),
          materialStyle - 4
        )
      } else if (materialStyle < 6) {
        // Purple to magenta/pink (neon)
        material.color.lerpColors(
          new THREE.Color(0xaa00ff),
          new THREE.Color(0xff00aa),
          materialStyle - 5
        )
      } else if (materialStyle < 7) {
        // Magenta to orange/red (plasma)
        material.color.lerpColors(
          new THREE.Color(0xff00aa),
          new THREE.Color(0xff4400),
          materialStyle - 6
        )
      } else {
        // Orange copper metallic
        material.color.setHex(0xff6600)
      }
    }

    // Rotate based on scroll (continuous through all sections)
    groupRef.current.rotation.y = scrollProgress * Math.PI * 6

    // Scale animation based on scroll
    const scale = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.3
    groupRef.current.scale.setScalar(scale)

    // Move position based on scroll (more dynamic)
    groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 1.5
    groupRef.current.position.x = Math.cos(scrollProgress * Math.PI * 4) * 0.5
    groupRef.current.position.z = Math.sin(scrollProgress * Math.PI * 3) * 0.3
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
function createScatteredParticlesPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Create 12 small pieces orbiting around center
  const pieces = [
    { x: 0, y: 2.0, z: 0 },       // Top
    { x: 1.8, y: 1.2, z: 0.5 },   // Top-right
    { x: 2.2, y: 0, z: -0.3 },    // Right
    { x: 1.5, y: -1.5, z: 0.8 },  // Bottom-right
    { x: 0, y: -2.2, z: 0 },      // Bottom
    { x: -1.8, y: -1.0, z: -0.7 },// Bottom-left
    { x: -2.0, y: 0.3, z: 0.5 },  // Left
    { x: -1.2, y: 1.8, z: -0.4 }, // Top-left
    { x: 0.8, y: 0.5, z: 2.0 },   // Front
    { x: -0.6, y: -0.8, z: 1.8 }, // Front-bottom
    { x: 0.5, y: 1.0, z: -2.0 },  // Back
    { x: -0.9, y: 0.2, z: -1.8 }, // Back-middle
  ]

  const totalVertices = positions.length / 3
  const verticesPerPiece = Math.ceil(totalVertices / pieces.length)

  for (let i = 0; i < positions.length; i += 3) {
    const vertexIndex = Math.floor(i / 3)
    const pieceIndex = Math.min(Math.floor(vertexIndex / verticesPerPiece), pieces.length - 1)
    const piece = pieces[pieceIndex]

    // Get original vertex position
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Normalize to get direction
    const len = Math.sqrt(x * x + y * y + z * z) || 1

    // Create small pieces with proper geometry
    const scale = 0.08 // Very small pieces

    modified[i] = piece.x + (x / len) * scale
    modified[i + 1] = piece.y + (y / len) * scale
    modified[i + 2] = piece.z + (z / len) * scale
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

function createCubePositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Transform sphere to cube using normalized coordinates
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    // Project onto cube surface (max component determines face)
    const absX = Math.abs(nx)
    const absY = Math.abs(ny)
    const absZ = Math.abs(nz)
    const maxAxis = Math.max(absX, absY, absZ)

    const scale = 1.2 / maxAxis

    modified[i] = nx * scale
    modified[i + 1] = ny * scale
    modified[i + 2] = nz * scale
  }

  return modified
}

function createDNAHelixPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Create double helix structure
    const theta = Math.atan2(y, x)
    const heightFactor = z / 1.2

    // Two helixes intertwined
    const helix1Angle = heightFactor * Math.PI * 4 + theta
    const helix2Angle = helix1Angle + Math.PI

    const radius = 0.6
    const amplitude = 0.3

    // Determine which helix this point belongs to
    const distToHelix1 = Math.abs(Math.sin(helix1Angle))
    const distToHelix2 = Math.abs(Math.sin(helix2Angle))

    let targetAngle = distToHelix1 < distToHelix2 ? helix1Angle : helix2Angle

    modified[i] = radius * Math.cos(targetAngle) + amplitude * Math.cos(theta)
    modified[i + 1] = radius * Math.sin(targetAngle) + amplitude * Math.sin(theta)
    modified[i + 2] = heightFactor * 1.5
  }

  return modified
}

function createLowPolyDiamondPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Create diamond/gem shape with flat facets
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    // Create sharp diamond shape
    const verticalScale = nz > 0 ? 0.7 : 1.5 // Pointed top, wide bottom
    const horizontalScale = 1.2

    // Snap to facets (reduce vertex variety for low-poly look)
    const facetSize = 0.3
    const facetedX = Math.round(nx / facetSize) * facetSize
    const facetedY = Math.round(ny / facetSize) * facetSize

    modified[i] = facetedX * horizontalScale
    modified[i + 1] = facetedY * horizontalScale
    modified[i + 2] = nz * verticalScale
  }

  return modified
}

function createGlitchSpherePositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1.2, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Create glitched sphere with random perturbations
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Add glitch effect - random displacement in chunks
    const chunkSize = 30
    const chunkIndex = Math.floor(i / chunkSize)

    // Pseudo-random but consistent glitch per chunk
    const glitchSeed = Math.sin(chunkIndex * 12.9898 + chunkIndex * 78.233) * 43758.5453
    const glitchAmount = (glitchSeed - Math.floor(glitchSeed)) * 0.3

    const theta = Math.atan2(y, x)
    const phi = Math.acos(z / 1.2)

    // Some vertices pushed out, some pulled in
    const distortion = chunkIndex % 3 === 0 ? 1 + glitchAmount : 1 - glitchAmount * 0.5

    modified[i] = x * distortion
    modified[i + 1] = y * distortion
    modified[i + 2] = z * distortion
  }

  return modified
}

function createQuantumFieldPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    const quantumWave = Math.sin(i * 0.1) * 0.2 + Math.cos(i * 0.15) * 0.15
    const radius = 1.1 + quantumWave

    modified[i] = nx * radius
    modified[i + 1] = ny * radius
    modified[i + 2] = nz * radius
  }

  return modified
}

function createNeuralNetworkPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const angle = Math.atan2(y, x)
    const verticalPos = z / 1.2
    const layer = Math.floor((verticalPos + 1) * 2)

    const layerRadius = 0.6 + layer * 0.2
    const nodeCount = 8 + layer * 4

    const nodeAngle = Math.round(angle / (Math.PI * 2 / nodeCount)) * (Math.PI * 2 / nodeCount)

    modified[i] = layerRadius * Math.cos(nodeAngle)
    modified[i + 1] = layerRadius * Math.sin(nodeAngle)
    modified[i + 2] = (verticalPos * 1.2)
  }

  return modified
}

function createTesseractPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    const w = Math.sin(i * 0.1) * 0.5
    const scale = 1.2 / (1 + w)

    modified[i] = nx * scale * 1.3
    modified[i + 1] = ny * scale * 1.3
    modified[i + 2] = nz * scale * 1.3
  }

  return modified
}

function createMolecularLatticePositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const gridSize = 0.4
    const latticeX = Math.round(x / gridSize) * gridSize
    const latticeY = Math.round(y / gridSize) * gridSize
    const latticeZ = Math.round(z / gridSize) * gridSize

    const bondStrength = 0.15
    const centerDist = Math.sqrt(latticeX * latticeX + latticeY * latticeY + latticeZ * latticeZ)
    const pull = 1 + bondStrength * Math.sin(centerDist * 3)

    modified[i] = latticeX * pull * 1.2
    modified[i + 1] = latticeY * pull * 1.2
    modified[i + 2] = latticeZ * pull * 1.2
  }

  return modified
}

function createDataVortexPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  // Seeded random function for consistent results
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // Normalize to get direction
    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    // Scatter pieces outward from sphere surface using seeded random
    // Some pieces closer, some further - creates "exploding" effect
    const scatterAmount = 0.3 + seededRandom(i * 1.1) * 0.5

    // Seeded random offset for organic but consistent scatter
    const randomOffsetX = (seededRandom(i * 2.3) - 0.5) * 0.4
    const randomOffsetY = (seededRandom(i * 3.7) - 0.5) * 0.4
    const randomOffsetZ = (seededRandom(i * 5.1) - 0.5) * 0.4

    modified[i] = nx * (1 + scatterAmount) + randomOffsetX
    modified[i + 1] = ny * (1 + scatterAmount) + randomOffsetY
    modified[i + 2] = nz * (1 + scatterAmount) + randomOffsetZ
  }

  return modified
}

function createFractalPyramidPositions(subdivisions: number): Float32Array {
  const geo = new THREE.IcosahedronGeometry(1, subdivisions)
  const positions = geo.attributes.position.array as Float32Array
  const modified = new Float32Array(positions.length)

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    const length = Math.sqrt(x * x + y * y + z * z)
    const nx = x / length
    const ny = y / length
    const nz = z / length

    const verticalScale = nz > 0 ? 0.3 : 1.2
    const horizontalScale = 1 - Math.abs(nz) * 0.3

    const fractalDetail = Math.sin(i * 0.5) * 0.1

    modified[i] = nx * horizontalScale * 1.3 + fractalDetail
    modified[i + 1] = ny * horizontalScale * 1.3 + fractalDetail
    modified[i + 2] = nz * verticalScale * 1.5
  }

  return modified
}
