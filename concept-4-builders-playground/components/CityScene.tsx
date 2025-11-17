'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Building({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = height / 2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Box
      ref={meshRef}
      args={[1, height, 1]}
      position={[position[0], height / 2, position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={hovered ? '#FFD700' : color}
        roughness={0.7}
        metalness={0.2}
      />
    </Box>
  )
}

function Worker({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime) * 0.5
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Sphere args={[0.15, 16, 16]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#FFD700" />
      </Sphere>
    </group>
  )
}

export default function CityScene() {
  const buildings = [
    { pos: [-2, 0, -2] as [number, number, number], height: 2, color: '#CD5C5C' },
    { pos: [0, 0, -2] as [number, number, number], height: 3, color: '#A9A9A9' },
    { pos: [2, 0, -2] as [number, number, number], height: 1.5, color: '#CD5C5C' },
    { pos: [-2, 0, 0] as [number, number, number], height: 2.5, color: '#A9A9A9' },
    { pos: [2, 0, 0] as [number, number, number], height: 1.8, color: '#CD5C5C' },
    { pos: [0, 0, 2] as [number, number, number], height: 2.2, color: '#A9A9A9' },
  ]

  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [8, 6, 8], fov: 50 }}
        shadows
      >
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 10, 30]} />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Buildings */}
        {buildings.map((building, i) => (
          <Building
            key={i}
            position={building.pos}
            height={building.height}
            color={building.color}
          />
        ))}

        {/* Workers */}
        <Worker position={[-1, 0, -1]} />
        <Worker position={[1, 0, 1]} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#90EE90" />
        </mesh>

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-gray-700 font-playful bg-white/80 px-4 py-2 rounded-full">
          🏗️ Click buildings to explore • Drag to rotate the city
        </p>
      </div>
    </div>
  )
}
