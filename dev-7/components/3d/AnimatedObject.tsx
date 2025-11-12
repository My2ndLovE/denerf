'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedObjectProps {
  scrollProgress?: number
}

export default function AnimatedObject({ scrollProgress = 0 }: AnimatedObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    // Continuous rotation animation
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.002

    // React to scroll progress
    if (scrollProgress > 0) {
      // Rotate based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2

      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5
      groupRef.current.scale.setScalar(scale)

      // Move position based on scroll
      groupRef.current.position.y = scrollProgress * 2
    }
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
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
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
