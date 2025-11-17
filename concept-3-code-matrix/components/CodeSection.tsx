'use client'

import { motion } from 'framer-motion'

const codeSnippets = [
  { lang: 'reality.init()', code: 'const truth = decode(perception);' },
  { lang: 'matrix.core', code: 'while(true) { render(illusion); }' },
  { lang: 'system.access', code: 'if (awake) { break free(); }' },
]

export default function CodeSection() {
  return (
    <section className="min-h-screen py-32 px-6 relative flex items-center">
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-cyber text-6xl font-bold matrix-glow mb-16 text-center"
        >
          {'>'} SOURCE_CODE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-black/80 border border-matrix-green rounded-lg font-matrix"
            >
              <div className="text-matrix-dim mb-3">{'>'} {snippet.lang}</div>
              <div className="text-matrix-glow text-lg">{snippet.code}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
