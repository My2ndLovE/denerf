'use client'

import { motion } from 'framer-motion'

const projects = [
  { id: 1, name: 'City Hall App', icon: '🏛️', built: '2024', blocks: '10K' },
  { id: 2, name: 'Shopping Mall', icon: '🏬', built: '2024', blocks: '8K' },
  { id: 3, name: 'Tech Tower', icon: '🏢', built: '2025', blocks: '15K' },
]

export default function ProjectsSection() {
  return (
    <section className="min-h-screen py-32 px-6 relative">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-build text-6xl font-bold text-build-brick mb-16 text-center"
        >
          🏗️ Built Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="p-8 bg-white rounded-2xl shadow-2xl border-4 border-build-yellow"
            >
              <div className="text-7xl mb-4">{project.icon}</div>
              <h3 className="font-build text-2xl font-bold mb-2">{project.name}</h3>
              <div className="text-gray-600 font-playful">
                <p>Built: {project.built}</p>
                <p>Blocks: {project.blocks}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
