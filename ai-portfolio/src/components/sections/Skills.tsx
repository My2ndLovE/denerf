'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import OrbitalSkills from '@/components/3d/OrbitalSkills'
import ErrorBoundary from '@/components/ErrorBoundary'
import { SKILLS } from '@/lib/constants'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen bg-cyber-darker px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-gradient md:text-6xl">
            Skills & Expertise
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 3D Orbital Visualization */}
          <div className="relative h-[500px] rounded-2xl border border-cyber-cyan/20 bg-cyber-dark/50 backdrop-blur-sm lg:h-[600px]">
            <ErrorBoundary>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <Suspense fallback={null}>
                  <OrbitalSkills />
                </Suspense>
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={5}
                  maxDistance={15}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </ErrorBoundary>

            {/* Overlay hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm text-gray-400">
                Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>

          {/* Skills List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="mb-8 text-lg text-gray-300"
            >
              My technical arsenal spans across multiple domains of AI and software development.
              Each skill represents years of hands-on experience building production systems.
            </motion.p>

            {SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-200">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-cyber-cyan">
                    {skill.level}%
                  </span>
                </div>

                <div className="relative h-3 overflow-hidden rounded-full bg-cyber-dark">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
                  />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 animate-shimmer-loading opacity-50" />

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/20 to-cyber-cyan/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Category tag */}
                <div className="mt-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-cyber-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl" />
      </div>
    </section>
  )
}
