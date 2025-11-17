'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent || ''
      titleRef.current.innerHTML = text
        .split('')
        .map((char, i) => `<span style="display:inline-block;animation-delay:${i * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          className="mb-8 text-8xl glitch"
        >
          <span className="matrix-glow">{'< / >'}</span>
        </motion.div>

        <h1
          ref={titleRef}
          className="font-cyber text-7xl md:text-9xl font-bold mb-6 matrix-glow"
        >
          CODE MATRIX
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-xl md:text-2xl text-matrix-green/80 font-matrix mb-12 max-w-3xl mx-auto"
        >
          {'>'} Wake up. The code you see is not real.
          <br />
          {'>'} Step behind the digital veil and see the truth.
          <br />
          {'>'} Reality is programmable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            className="px-8 py-4 bg-matrix-green text-matrix-dark rounded font-cyber font-bold text-xl shadow-lg shadow-matrix-green/50 border-2 border-matrix-green"
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px #00FF41' }}
            whileTap={{ scale: 0.95 }}
          >
            {'>'} ENTER THE MATRIX
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-matrix-green rounded font-cyber font-bold text-xl hover:bg-matrix-green/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {'>'} DECODE_REALITY
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-4xl matrix-glow">↓</div>
          <p className="text-sm font-matrix mt-2">{'>'} scroll_to_decode</p>
        </motion.div>
      </div>
    </section>
  )
}
