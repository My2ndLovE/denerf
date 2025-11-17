'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface IntelligenceSectionProps {
  setCurrentSection: (section: string) => void
}

export default function IntelligenceSection({ setCurrentSection }: IntelligenceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('intelligence')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="intelligence"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative flex items-center"
    >
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cyber text-5xl md:text-7xl font-black neural-gradient mb-6">
              THE FUTURE IS INTELLIGENT
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our AI-powered solutions learn, adapt, and evolve. We build systems that don't just
              execute tasks—they understand context, predict outcomes, and continuously improve.
            </p>
            <div className="space-y-4">
              {['Self-Learning Systems', 'Real-Time Adaptation', 'Continuous Optimization', 'Ethical AI'].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-neural-primary rounded-full animate-pulse" />
                  <span className="text-gray-300 font-mono">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-neural-primary/20 to-neural-secondary/20 rounded-3xl border-2 border-neural-primary/50 p-8 backdrop-blur-sm">
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🤖
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
