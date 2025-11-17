'use client'

import { motion } from 'framer-motion'

const projects = [
  { id: 1, name: 'FlowBank App', icon: '💰', state: 'Liquid' },
  { id: 2, name: 'WaveHealth', icon: '🏥', state: 'Flowing' },
  { id: 3, name: 'StreamEdu', icon: '🎓', state: 'Morphing' },
]

export default function ProjectsSection() {
  return (
    <section className="min-h-screen py-32 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-liquid text-6xl font-bold gradient-shift bg-clip-text text-transparent mb-16 text-center"
        >
          Flowing Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-gradient-to-br from-liquid-purple/30 to-liquid-blue/30 backdrop-blur rounded-3xl blob-morph border-2 border-liquid-pink/50"
            >
              <div className="text-7xl mb-4">{project.icon}</div>
              <h3 className="font-liquid text-2xl font-bold mb-2">{project.name}</h3>
              <p className="text-liquid-light">State: {project.state}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
