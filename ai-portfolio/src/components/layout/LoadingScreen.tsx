'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
          return 100
        }
        // Simulate loading with random increments
        return Math.min(prev + Math.random() * 15, 100)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-cyber-darker"
        >
          <div className="text-center">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="mb-3 text-3xl font-bold text-cyber-cyan">
                Initializing Neural Network
              </h2>
              <p className="text-sm text-gray-400">Training AI models...</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="relative mx-auto h-2 w-80 overflow-hidden rounded-full bg-cyber-dark">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
              />
              <div className="absolute inset-0 animate-shimmer-loading" />
            </div>

            {/* Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-mono text-2xl text-cyber-cyan"
            >
              {Math.floor(progress)}%
            </motion.div>

            {/* Animated dots */}
            <div className="mt-4 flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-cyber-cyan"
                />
              ))}
            </div>

            {/* Status messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-mono text-xs text-gray-500"
            >
              {progress < 30 && 'Loading dependencies...'}
              {progress >= 30 && progress < 60 && 'Compiling shaders...'}
              {progress >= 60 && progress < 90 && 'Initializing 3D environment...'}
              {progress >= 90 && 'Almost ready...'}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
