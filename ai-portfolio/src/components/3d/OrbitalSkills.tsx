'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
  name: string
  level: number
  angle: number
  radius: number
  speed: number
  color: string
}

const SKILLS_3D: Skill[] = [
  { name: 'Python', level: 95, angle: 0, radius: 3, speed: 0.3, color: '#00F0FF' },
  { name: 'TensorFlow', level: 90, angle: 1, radius: 3.5, speed: 0.25, color: '#FF6B35' },
  { name: 'PyTorch', level: 88, angle: 2, radius: 3.2, speed: 0.28, color: '#EE4C2C' },
  { name: 'JavaScript', level: 92, angle: 3, radius: 2.8, speed: 0.32, color: '#F7DF1E' },
  { name: 'React', level: 90, angle: 4, radius: 3.3, speed: 0.27, color: '#61DAFB' },
  { name: 'Docker', level: 82, radius: 4.2, speed: 0.22, color: '#2496ED', angle: 5 },
  { name: 'AWS', level: 85, angle: 0.5, radius: 3.8, speed: 0.24, color: '#FF9900' },
  { name: 'Node.js', level: 85, angle: 1.5, radius: 3.6, speed: 0.26, color: '#339933' },
]

function OrbitingSkill({ skill }: { skill: Skill }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<any>(null!)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime * skill.speed
    const x = Math.cos(time + skill.angle) * skill.radius
    const z = Math.sin(time + skill.angle) * skill.radius
    const y = Math.sin(time * 0.5) * 0.3

    meshRef.current.position.set(x, y, z)

    if (textRef.current) {
      textRef.current.position.set(x, y + 0.5, z)
      textRef.current.lookAt(0, y + 0.5, 0)
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[0.15, 16, 16]}>
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      <Text
        ref={textRef}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </group>
  )
}

export default function OrbitalSkills() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Center core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </Sphere>

      {/* Orbital rings */}
      {[2.8, 3.3, 3.8, 4.2].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}

      {/* Skills */}
      {SKILLS_3D.map((skill) => (
        <OrbitingSkill key={skill.name} skill={skill} />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9D00FF" />
    </group>
  )
}
