'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      <Suspense fallback={null}>
        {children}

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-5, 5, 2]}
          intensity={0.5}
          angle={0.3}
          penumbra={1}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset="studio" />
      </Suspense>

      {/* Development controls - remove in production */}
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  )
}
