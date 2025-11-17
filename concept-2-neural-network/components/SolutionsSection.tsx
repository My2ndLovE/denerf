'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface SolutionsSectionProps {
  setCurrentSection: (section: string) => void
}

const solutions = [
  {
    id: 1,
    title: 'Predictive Analytics Engine',
    category: 'AI/ML',
    description: 'Neural networks that forecast market trends with 95%+ accuracy using deep learning.',
    icon: '📊',
    metrics: { accuracy: '95%', speed: '10ms', data: '1B+ points' },
  },
  {
    id: 2,
    title: 'NLP Communication Hub',
    category: 'Natural Language',
    description: 'Advanced language models for real-time translation, sentiment analysis, and chatbots.',
    icon: '💬',
    metrics: { languages: '100+', users: '5M+', uptime: '99.99%' },
  },
  {
    id: 3,
    title: 'Computer Vision Platform',
    category: 'Vision AI',
    description: 'Real-time object detection, facial recognition, and image analysis at scale.',
    icon: '👁️',
    metrics: { fps: '120', objects: '1000+', accuracy: '98%' },
  },
  {
    id: 4,
    title: 'Autonomous Decision System',
    category: 'Reinforcement Learning',
    description: 'Self-learning AI agents that optimize complex business processes autonomously.',
    icon: '🤖',
    metrics: { efficiency: '+300%', cost: '-60%', learning: 'Real-time' },
  },
]

export default function SolutionsSection({ setCurrentSection }: SolutionsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('solutions')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neural-bg via-neural-dark to-neural-bg opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.1),transparent_50%)]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-cyber text-6xl md:text-8xl font-black neural-gradient mb-6">
            INTELLIGENT SOLUTIONS
          </h2>
          <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
            Powered by cutting-edge neural networks and machine learning algorithms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-neural-dark/80 to-neural-bg/80 border-2 border-neural-primary/30 rounded-2xl p-8 overflow-hidden backdrop-blur-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neural-primary/0 to-neural-secondary/0 group-hover:from-neural-primary/10 group-hover:to-neural-secondary/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{solution.icon}</div>
                <span className="px-3 py-1 bg-neural-primary/20 border border-neural-primary rounded-full text-xs font-mono text-neural-primary mb-4 inline-block">
                  {solution.category}
                </span>
                <h3 className="font-cyber text-3xl font-bold text-white mb-3 group-hover:text-neural-glow transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-400 mb-6">{solution.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neural-primary/30">
                  {Object.entries(solution.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xl font-bold neural-gradient mb-1">{value}</div>
                      <div className="text-xs text-gray-500 uppercase font-mono">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
