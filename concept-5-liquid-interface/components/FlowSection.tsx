'use client'

import { motion } from 'framer-motion'

const flows = [
  { id: 1, title: 'Adaptive Design', desc: 'Interfaces that reshape to user needs', icon: '🌊' },
  { id: 2, title: 'Fluid Transitions', desc: 'Seamless morphing between states', icon: '💧' },
  { id: 3, title: 'Organic Animations', desc: 'Natural, life-like movements', icon: '✨' },
]

export default function FlowSection() {
  return (
    <section className="min-h-screen py-32 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-liquid text-6xl font-bold gradient-shift bg-clip-text text-transparent mb-16 text-center"
        >
          The Flow Philosophy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flows.map((flow, i) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-liquid-purple/20 backdrop-blur rounded-3xl liquid-flow border-2 border-liquid-purple/50"
            >
              <div className="text-6xl mb-4">{flow.icon}</div>
              <h3 className="font-liquid text-2xl font-bold text-liquid-pink mb-3">{flow.title}</h3>
              <p className="text-liquid-light">{flow.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
