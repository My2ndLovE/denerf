'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { OrbitControls, Line, Sphere } from '@react-three/drei'

interface Node {
  id: number
  position: [number, number, number]
  label: string
  color: string
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  // Generate nodes
  const nodes: Node[] = useMemo(() => {
    const nodeData = [
      { label: 'AI Core', color: '#00F0FF' },
      { label: 'Data Processing', color: '#B024FF' },
      { label: 'ML Pipeline', color: '#FF2E97' },
      { label: 'Neural Engine', color: '#00FFAA' },
      { label: 'API Layer', color: '#00F0FF' },
      { label: 'Cloud Compute', color: '#B024FF' },
      { label: 'Security', color: '#FF2E97' },
      { label: 'Analytics', color: '#00FFAA' },
    ]

    return nodeData.map((node, i) => {
      const angle = (i / nodeData.length) * Math.PI * 2
      const radius = 3
      return {
        id: i,
        position: [
          Math.cos(angle) * radius,
          Math.sin(i * 0.5) * 1.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        label: node.label,
        color: node.color,
      }
    })
  }, [])

  // Generate connections
  const connections = useMemo(() => {
    const conns = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          conns.push({ from: i, to: j })
        }
      }
    }
    return conns
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((conn, idx) => (
        <Line
          key={idx}
          points={[nodes[conn.from].position, nodes[conn.to].position]}
          color={hoveredNode === conn.from || hoveredNode === conn.to ? '#00FFAA' : '#00F0FF'}
          lineWidth={hoveredNode === conn.from || hoveredNode === conn.to ? 3 : 1}
          opacity={hoveredNode === conn.from || hoveredNode === conn.to ? 1 : 0.3}
          transparent
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <Neuron
          key={node.id}
          node={node}
          hovered={hoveredNode === node.id}
          onHover={() => setHoveredNode(node.id)}
          onUnhover={() => setHoveredNode(null)}
        />
      ))}

      {/* Central Core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#B024FF"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </group>
  )
}

function Neuron({ node, hovered, onHover, onUnhover }: {
  node: Node
  hovered: boolean
  onHover: () => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + node.id) * 0.1 + 0.9
      meshRef.current.scale.setScalar(hovered ? 1.5 : pulse)

      if (clicked) {
        meshRef.current.rotation.y += 0.1
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      onClick={() => setClicked(!clicked)}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={hovered ? 3 : 1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function PulsingParticles() {
  const count = 200
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00F0FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function NetworkScene() {
  return (
    <div className="h-screen w-full sticky top-0" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 5, 25]} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B024FF" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          color="#FF2E97"
          castShadow
        />

        {/* 3D Elements */}
        <NeuralNetwork />
        <PulsingParticles />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.3}
        />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-neural-primary font-mono text-sm animate-pulse">
          Click nodes to activate • Drag to explore the neural network
        </p>
      </div>
    </div>
  )
}
