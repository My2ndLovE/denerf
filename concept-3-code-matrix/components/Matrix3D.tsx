'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing'

function CodeCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#00FF41"
        emissive="#00FF41"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  )
}

function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const codeSymbols = ['<html>', '{code}', 'function()', '01010101', 'class{}', '[array]']

  return (
    <group ref={groupRef}>
      {codeSymbols.map((symbol, i) => {
        const angle = (i / codeSymbols.length) * Math.PI * 2
        const radius = 4
        return (
          <Text3D
            key={i}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.3}
            height={0.1}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i) * 2,
              Math.sin(angle) * radius,
            ]}
          >
            {symbol}
            <meshStandardMaterial
              color="#00FF41"
              emissive="#39FF14"
              emissiveIntensity={1}
            />
          </Text3D>
        )
      })}
    </group>
  )
}

export default function Matrix3D() {
  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
        <color attach="background" args={['#0D0208']} />
        <fog attach="fog" args={['#0D0208', 5, 20]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FF41" />

        <CodeCube />
        <FloatingCode />

        <OrbitControls
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
          />
          <Glitch delay={[1.5, 3.5]} duration={[0.1, 0.3]} strength={[0.1, 0.3]} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
