'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import NeuralNetwork from '@/components/3d/NeuralNetwork'
import ErrorBoundary from '@/components/ErrorBoundary'
import { SITE_CONFIG } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-cyber-darker">
      {/* Three.js Canvas - Neural Network Background */}
      <div className="absolute inset-0">
        <ErrorBoundary>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} />
            <Suspense fallback={null}>
              <NeuralNetwork />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-darker/20 to-cyber-darker" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient glow-cyan">
              {SITE_CONFIG.name}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-2xl text-cyber-cyan md:text-3xl lg:text-4xl"
          >
            {SITE_CONFIG.title}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 text-lg text-gray-400 md:text-xl"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple px-8 py-4 text-lg font-semibold text-white transition-all"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyber-purple to-cyber-pink opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border-2 border-cyber-cyan px-8 py-4 text-lg font-semibold text-cyber-cyan transition-all hover:bg-cyber-cyan hover:text-cyber-darker"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-6 rounded-full border-2 border-cyber-cyan p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-2 w-2 rounded-full bg-cyber-cyan"
            />
          </div>
          <ChevronDown className="text-cyber-cyan" size={24} />
        </div>
      </motion.button>
    </section>
  )
}
