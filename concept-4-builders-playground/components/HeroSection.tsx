'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-build-sky via-blue-200 to-build-sky opacity-50" />

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
          className="mb-8 text-9xl"
        >
          🏗️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-build text-7xl md:text-9xl font-bold mb-6 text-build-brick"
        >
          BUILDER'S PLAYGROUND
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-3xl text-gray-700 font-playful mb-12 max-w-3xl mx-auto"
        >
          Constructing <span className="text-build-orange font-bold">digital dreams</span>{' '}
          one block at a time 🧱
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            className="px-8 py-4 bg-build-yellow text-gray-800 rounded-xl font-build font-bold text-xl shadow-2xl border-4 border-build-orange"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            🏗️ Start Building
          </motion.button>

          <motion.button
            className="px-8 py-4 border-4 border-build-brick rounded-xl font-build font-bold text-xl hover:bg-build-brick/10"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            👷 Meet the Crew
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bounce-build"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-5xl">↓</div>
          <p className="text-sm font-playful mt-2">Explore the city</p>
        </motion.div>
      </div>

      {/* Decorative clouds */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-10 text-6xl opacity-30"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-40 right-20 text-7xl opacity-40"
      >
        ☁️
      </motion.div>
    </section>
  )
}
