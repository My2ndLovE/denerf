'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface CapabilitiesSectionProps {
  setCurrentSection: (section: string) => void
}

const capabilities = [
  { id: 1, title: 'Deep Learning', icon: '🧠', description: 'Multi-layer neural architectures' },
  { id: 2, title: 'NLP Processing', icon: '💬', description: 'Natural language understanding' },
  { id: 3, title: 'Computer Vision', icon: '👁️', description: 'Real-time image recognition' },
  { id: 4, title: 'Reinforcement Learning', icon: '🎮', description: 'Self-optimizing agents' },
  { id: 5, title: 'Predictive Analytics', icon: '📈', description: 'Future trend forecasting' },
  { id: 6, title: 'AutoML', icon: '⚙️', description: 'Automated model optimization' },
]

export default function CapabilitiesSection({ setCurrentSection }: CapabilitiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('capabilities')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-cyber text-6xl md:text-8xl font-black neural-gradient mb-6">
            NEURAL CAPABILITIES
          </h2>
          <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
            Advanced AI technologies at your fingertips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-neural-dark/50 to-neural-bg/50 border-2 border-neural-primary/30 rounded-xl p-6 backdrop-blur-sm hover:border-neural-primary transition-all"
            >
              <div className="text-5xl mb-4">{cap.icon}</div>
              <h3 className="font-cyber text-xl font-bold mb-2 text-neural-primary">{cap.title}</h3>
              <p className="text-gray-400 text-sm">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
