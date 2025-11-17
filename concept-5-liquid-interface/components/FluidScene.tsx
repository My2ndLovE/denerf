'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'

function LiquidBlob({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.6}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default function FluidScene() {
  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={['#10002B']} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C77DFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E0AAFF" />

        <LiquidBlob position={[0, 0, 0]} color="#C77DFF" />
        <LiquidBlob position={[-2.5, 0, -1]} color="#E0AAFF" />
        <LiquidBlob position={[2.5, 0, -1]} color="#7209B7" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-liquid-light font-liquid">
          💧 Drag to interact • Watch the fluid morph
        </p>
      </div>
    </div>
  )
}
