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

    if (titleRef.current && subtitleRef.current) {
      const chars = titleRef.current.textContent?.split('') || []
      titleRef.current.innerHTML = chars
        .map((char, i) => `<span class="inline-block" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out',
          delay: 0.3,
        }
      )

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5 }
      )
    }
  }, [setCurrentSection])

  return (
    <section
      id="hero"
      aria-label="Hero section - Neural Nexus AI-Powered Development"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,36,255,0.15),transparent_70%)]" />

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1, duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="text-9xl inline-block"
            animate={{
              textShadow: [
                '0 0 20px rgba(0,240,255,0.5)',
                '0 0 40px rgba(176,36,255,0.8)',
                '0 0 20px rgba(0,240,255,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧠
          </motion.div>
        </motion.div>

        <h1
          ref={titleRef}
          className="font-cyber text-7xl md:text-9xl font-black mb-6 neural-gradient"
          style={{ perspective: 1000 }}
        >
          NEURAL NEXUS
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-gray-300 font-mono mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Where <span className="neural-glow font-bold">artificial intelligence</span> meets{' '}
          <span className="neural-glow font-bold">human creativity</span>.
          <br />
          Building the future with{' '}
          <span className="text-neural-primary font-bold">neural-powered</span> software
          solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <motion.button
            aria-label="Explore our AI-powered intelligent solutions and capabilities"
            className="px-8 py-4 bg-gradient-to-r from-neural-primary to-neural-secondary rounded-lg font-cyber font-bold text-xl shadow-2xl shadow-neural-primary/50 border border-neural-primary/50 focus:outline-none focus:ring-4 focus:ring-neural-primary/50"
            whileHover={{ scale: 1.1, y: -5, boxShadow: '0 0 40px rgba(0,240,255,0.8)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            tabIndex={0}
          >
            <span className="flex items-center space-x-2">
              <span>Explore Intelligence</span>
              <span>⚡</span>
            </span>
          </motion.button>

          <motion.button
            aria-label="Connect with our AI team and start your intelligent automation journey"
            className="px-8 py-4 border-2 border-neural-secondary rounded-lg font-cyber font-bold text-xl hover:bg-neural-secondary/10 transition-all focus:outline-none focus:ring-4 focus:ring-neural-secondary/50"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            tabIndex={0}
          >
            <span className="flex items-center space-x-2">
              <span>Connect with AI</span>
              <span>🔗</span>
            </span>
          </motion.button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '99.9%', label: 'Accuracy' },
            { value: '10M+', label: 'Data Points' },
            { value: '50ms', label: 'Response Time' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 bg-neural-dark/50 border border-neural-primary/30 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0,240,255,0.6)' }}
            >
              <div className="text-4xl font-bold neural-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 font-mono uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-4xl text-neural-primary opacity-70">↓</div>
          <p className="text-sm text-gray-400 font-mono mt-2">Dive into the network</p>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-10 text-6xl opacity-20 neuron-pulse">⚡</div>
      <div className="absolute bottom-1/4 right-10 text-6xl opacity-20 neuron-pulse" style={{ animationDelay: '0.5s' }}>🔮</div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 neuron-pulse" style={{ animationDelay: '1s' }}>✨</div>
    </section>
  )
}
