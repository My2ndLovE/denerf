'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero section - Liquid Interface fluid digital experiences"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-liquid-purple rounded-full blob-morph opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-liquid-pink rounded-full blob-morph opacity-50 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-9xl">💧</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-liquid text-7xl md:text-9xl font-bold mb-6 gradient-shift bg-clip-text text-transparent"
        >
          LIQUID INTERFACE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-2xl md:text-3xl text-liquid-light font-liquid mb-12 max-w-3xl mx-auto"
        >
          Where design <span className="font-bold text-liquid-purple">flows</span> like water.
          <br />
          Organic • Adaptive • Alive
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            aria-label="Dive into our fluid interface and discover organic design"
            className="px-8 py-4 gradient-shift rounded-full font-liquid font-bold text-xl shadow-2xl text-white focus:outline-none focus:ring-4 focus:ring-liquid-purple/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            tabIndex={0}
          >
            💧 Dive In
          </motion.button>

          <motion.button
            aria-label="Explore the flow of our adaptive design philosophy"
            className="px-8 py-4 border-2 border-liquid-purple rounded-full font-liquid font-bold text-xl hover:bg-liquid-purple/20 backdrop-blur focus:outline-none focus:ring-4 focus:ring-liquid-purple/50"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            tabIndex={0}
          >
            🌊 Explore Flow
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
