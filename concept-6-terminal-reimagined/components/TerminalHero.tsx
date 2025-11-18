'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function TerminalHero() {
  const [command, setCommand] = useState('')
  const fullCommand = 'npm run innovation'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setCommand(fullCommand.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      aria-label="Hero section - Terminal Reimagined holographic development"
      className="relative min-h-screen flex items-center justify-center overflow-hidden p-6"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-term-bg/90 border-2 border-term-green rounded-lg shadow-2xl shadow-term-green/30 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-term-green/20 px-4 py-2 flex items-center space-x-2 border-b border-term-green/50">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-term-red" />
              <div className="w-3 h-3 rounded-full bg-term-yellow" />
              <div className="w-3 h-3 rounded-full bg-term-green" />
            </div>
            <span className="text-term-green text-sm font-term ml-4">terminal@reimagined:~</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8 space-y-4 font-term">
            <div className="text-term-cyan">
              <span className="text-term-purple">user@system</span>
              <span className="text-term-green">:</span>
              <span className="text-term-cyan">~</span>
              <span className="text-term-green">$ </span>
              <span className="typing">{command}</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-term-green space-y-2"
            >
              <p>{'>'} Initializing holographic interface...</p>
              <p className="text-term-cyan">{'>'} Loading 3D modules... [OK]</p>
              <p className="text-term-yellow">{'>'} Rendering reality... [OK]</p>
              <p className="text-term-green">{'>'} Terminal reimagined. Welcome.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="pt-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 glitch-text">
                <span className="text-term-green">TERMINAL</span>{' '}
                <span className="text-term-cyan">REIMAGINED</span>
              </h1>
              <p className="text-xl text-term-green/80 mb-8">
                {'>'} Where command line meets <span className="text-term-cyan">holographic 3D</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  aria-label="Execute and explore our holographic terminal interface"
                  className="px-6 py-3 bg-term-green text-term-bg rounded font-bold border-2 border-term-green hover:bg-term-green/80 transition focus:outline-none focus:ring-4 focus:ring-term-green/50"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px #0DBC79' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('commands')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      document.getElementById('commands')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  tabIndex={0}
                >
                  {'>'} ./execute
                </motion.button>
                <motion.button
                  aria-label="Read the manual and learn about terminal features"
                  className="px-6 py-3 border-2 border-term-cyan text-term-cyan rounded font-bold hover:bg-term-cyan/10 transition focus:outline-none focus:ring-4 focus:ring-term-cyan/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('processes')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      document.getElementById('processes')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  tabIndex={0}
                >
                  {'>'} man terminal
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-term-green/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <p className="font-term text-sm">
            {'>'} Press any key to continue... or scroll for holographic mode
          </p>
        </motion.div>
      </div>
    </section>
  )
}
