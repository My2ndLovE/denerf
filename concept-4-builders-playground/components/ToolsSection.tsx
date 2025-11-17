'use client'

import { motion } from 'framer-motion'

const tools = [
  { id: 1, name: 'Hammer.js', icon: '🔨' },
  { id: 2, name: 'BuildPack', icon: '🧰' },
  { id: 3, name: 'Crane.js', icon: '🏗️' },
  { id: 4, name: 'Blueprint', icon: '📐' },
  { id: 5, name: 'WeldKit', icon: '⚙️' },
  { id: 6, name: 'PaintPro', icon: '🎨' },
]

export default function ToolsSection() {
  return (
    <section className="min-h-screen py-32 px-6 relative">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-build text-6xl font-bold text-build-brick mb-16 text-center"
        >
          🧰 Our Toolbox
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-6 bg-build-orange/20 rounded-xl border-4 border-build-concrete text-center"
            >
              <div className="text-5xl mb-3">{tool.icon}</div>
              <h3 className="font-build text-xl font-bold">{tool.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
