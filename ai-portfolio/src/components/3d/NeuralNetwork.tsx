'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Node {
  position: THREE.Vector3
  velocity: THREE.Vector3
}

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const { mouse } = useThree()

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 80
    const nodes: Node[] = []

    // Create random nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
      })
    }

    // Create connections between nearby nodes
    const connections: number[] = []
    const maxDistance = 4

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < maxDistance) {
          connections.push(i, j)
        }
      }
    }

    return { nodes, connections }
  }, [])

  // Create geometries
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(nodes.length * 3)

    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [nodes])

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(connections.length * 3)

    connections.forEach((nodeIndex, i) => {
      const node = nodes[nodeIndex]
      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [nodes, connections])

  // Animate nodes
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array

    // Update node positions
    nodes.forEach((node, i) => {
      // Apply velocity
      node.position.add(node.velocity)

      // Mouse attraction
      const mouseInfluence = new THREE.Vector3(
        mouse.x * 10,
        mouse.y * 10,
        0
      )
      const direction = new THREE.Vector3().subVectors(mouseInfluence, node.position)
      const distance = direction.length()

      if (distance < 8) {
        direction.normalize().multiplyScalar(0.002)
        node.velocity.add(direction)
      }

      // Bounce off boundaries
      if (Math.abs(node.position.x) > 12) node.velocity.x *= -1
      if (Math.abs(node.position.y) > 12) node.velocity.y *= -1
      if (Math.abs(node.position.z) > 7) node.velocity.z *= -1

      // Apply friction
      node.velocity.multiplyScalar(0.99)

      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })

    // Update line positions
    connections.forEach((nodeIndex, i) => {
      const node = nodes[nodeIndex]
      linePositions[i * 3] = node.position.x
      linePositions[i * 3 + 1] = node.position.y
      linePositions[i * 3 + 2] = node.position.z
    })

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.position.needsUpdate = true

    // Gentle rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <>
      {/* Nodes */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.18}
          color="#00F0FF"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.15} />
      </lineSegments>

      {/* Ambient light for depth */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9D00FF" />
    </>
  )
}
