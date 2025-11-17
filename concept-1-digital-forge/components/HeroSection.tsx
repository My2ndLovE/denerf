'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroSectionProps {
  setCurrentSection: (section: string) => void
}

export default function HeroSection({ setCurrentSection }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setCurrentSection('hero')

    // GSAP animations
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 }
      )

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 1 }
      )
    }
  }, [setCurrentSection])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-9xl mb-6 inline-block">⚒</div>
        </motion.div>

        <h1
          ref={titleRef}
          className="font-forge text-7xl md:text-9xl font-black mb-6 fire-gradient"
        >
          THE DIGITAL FORGE
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-forge-metal font-mono mb-12 max-w-3xl mx-auto"
        >
          Where <span className="text-forge-ember font-bold">code</span> meets{' '}
          <span className="text-forge-ember font-bold">craftsmanship</span>.
          <br />
          We forge digital products with{' '}
          <span className="glow-text font-bold">precision & passion</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold text-xl shadow-2xl shadow-forge-fire/50 hover:shadow-forge-fire/80 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Our Work 🔥
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-forge-ember rounded-lg font-forge font-bold text-xl hover:bg-forge-ember/10 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start a Project ⚙️
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-4xl text-forge-ember opacity-70">↓</div>
          <p className="text-sm text-forge-metal font-mono mt-2">Scroll to explore</p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-pulse">🔨</div>
      <div className="absolute bottom-1/4 right-10 text-6xl opacity-20 animate-pulse delay-500">⚙️</div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-pulse delay-1000">✨</div>
    </section>
  )
}
