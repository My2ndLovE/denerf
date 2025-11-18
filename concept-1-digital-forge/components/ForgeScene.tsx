'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Anvil() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5
      setGlowIntensity(pulse)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          // Hammer strike effect
          if (meshRef.current) {
            meshRef.current.scale.set(1.1, 0.9, 1.1)
            setTimeout(() => {
              if (meshRef.current) {
                meshRef.current.scale.set(1, 1, 1)
              }
            }, 100)
          }
        }}
        castShadow
        receiveShadow
      >
        {/* Anvil Base */}
        <boxGeometry args={[3, 0.5, 1.5]} />
        <meshStandardMaterial
          color={hovered ? '#FFD700' : '#888888'}
          metalness={0.9}
          roughness={0.2}
          emissive={hovered ? '#FFA500' : '#000000'}
          emissiveIntensity={hovered ? glowIntensity : 0}
        />
      </mesh>

      {/* Anvil Horn */}
      <mesh position={[1, 0.5, 0]} castShadow>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshStandardMaterial
          color={hovered ? '#FFD700' : '#888888'}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Hot Metal Piece */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.3]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF6B35"
          emissiveIntensity={1 + glowIntensity}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Sparkles around the hot metal */}
      <Sparkles
        count={50}
        scale={3}
        size={2}
        speed={0.5}
        opacity={0.8}
        color="#FFD700"
      />
    </Float>
  )
}

function Hammer() {
  const meshRef = useRef<THREE.Group>(null)
  const [striking, setStriking] = useState(false)
  const strikeTime = useRef(0)
  const originalY = useRef(3)

  useFrame((state) => {
    if (meshRef.current) {
      if (!striking) {
        // Floating motion
        meshRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.3
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        originalY.current = meshRef.current.position.y
      } else {
        // Smooth strike animation using requestAnimationFrame
        const elapsed = state.clock.elapsedTime - strikeTime.current
        const duration = 0.5 // 0.5 seconds for full strike

        if (elapsed < duration / 2) {
          // Down phase
          const progress = (elapsed / (duration / 2))
          meshRef.current.position.y = THREE.MathUtils.lerp(originalY.current, 0.5, progress)
        } else if (elapsed < duration) {
          // Up phase
          const progress = ((elapsed - duration / 2) / (duration / 2))
          meshRef.current.position.y = THREE.MathUtils.lerp(0.5, originalY.current, progress)
        } else {
          // Animation complete
          setStriking(false)
        }
      }
    }
  })

  const handleClick = () => {
    if (!striking) {
      setStriking(true)
      strikeTime.current = 0
    }
  }

  return (
    <group ref={meshRef} position={[0, 3, 0]} onClick={handleClick}>
      {/* Handle */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Hammer Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function Furnace() {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      // Flickering fire effect
      const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.5 + 2.5
      lightRef.current.intensity = flicker
    }
  })

  return (
    <group position={[-4, 0, -2]}>
      {/* Furnace body */}
      <mesh ref={meshRef} position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 1.5]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Fire opening */}
      <mesh position={[0, 1, 0.76]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF6B35"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Point light for fire */}
      <pointLight
        ref={lightRef}
        position={[0, 1, 1]}
        color="#FF6B35"
        intensity={2}
        distance={10}
        castShadow
      />

      {/* Fire sparkles */}
      <Sparkles
        count={100}
        scale={[2, 2, 2]}
        size={3}
        speed={1}
        opacity={0.6}
        color="#FF6B35"
        position={[0, 1, 1]}
      />
    </group>
  )
}

function RotatingCog() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={[4, 2, -2]} castShadow>
      <cylinderGeometry args={[1, 1, 0.3, 8]} />
      <meshStandardMaterial
        color="#C0C0C0"
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function ForgeScene() {
  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas
        shadows
        camera={{ position: [8, 5, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFA500" />

        {/* 3D Objects */}
        <Anvil />
        <Hammer />
        <Furnace />
        <RotatingCog />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
        </mesh>

        <ContactShadows
          position={[0, -0.49, 0]}
          opacity={0.75}
          scale={10}
          blur={2.5}
          far={4}
        />

        {/* Environment & Controls */}
        <Environment preset="warehouse" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-forge-metal font-mono text-sm">
          🖱️ Click the anvil or hammer • Drag to rotate
        </p>
      </div>
    </div>
  )
}
