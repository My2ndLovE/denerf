'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Text, OrbitControls, Box } from '@react-three/drei'
import { EffectComposer, Bloom, Scanline } from '@react-three/postprocessing'

function HologramCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial
        color="#0DBC79"
        wireframe
        emissive="#0DBC79"
        emissiveIntensity={0.5}
      />
    </Box>
  )
}

function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const codes = ['npm', 'git', 'node', 'code', '$ ls']

  return (
    <group ref={groupRef}>
      {codes.map((code, i) => {
        const angle = (i / codes.length) * Math.PI * 2
        const radius = 4
        return (
          <Text
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i) * 2,
              Math.sin(angle) * radius,
            ]}
            fontSize={0.5}
            color="#3A96DD"
            anchorX="center"
            anchorY="middle"
          >
            {code}
          </Text>
        )
      })}
    </group>
  )
}

export default function HolographicScene() {
  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#0C0C0C']} />
        <fog attach="fog" args={['#0C0C0C', 5, 20]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0DBC79" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3A96DD" />

        <HologramCube />
        <FloatingCode />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <Scanline density={1.25} opacity={0.1} />
        </EffectComposer>
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-term-green font-term text-sm">
          {'>'} Drag to rotate • Holographic rendering active
        </p>
      </div>
    </div>
  )
}
