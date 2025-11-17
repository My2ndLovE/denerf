'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactSection() {
  const [input, setInput] = useState('')

  return (
    <section className="min-h-screen py-32 px-6 relative flex items-center">
      <div className="container mx-auto relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-6xl font-bold matrix-glow mb-6">
            {'>'} CONNECT_TO_MATRIX
          </h2>
          <p className="text-matrix-green font-matrix">
            {'>'} Enter your credentials to join the network_
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/90 border-2 border-matrix-green/50 rounded-lg p-8"
        >
          <div className="space-y-4 font-matrix">
            <div>
              <label className="block text-matrix-green mb-2">{'>'} USER_NAME:</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-matrix-dark border border-matrix-green/30 rounded text-matrix-green font-matrix focus:border-matrix-green focus:outline-none"
                placeholder="neo@matrix.io"
              />
            </div>
            <div>
              <label className="block text-matrix-green mb-2">{'>'} MESSAGE:</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-matrix-dark border border-matrix-green/30 rounded text-matrix-green font-matrix focus:border-matrix-green focus:outline-none resize-none"
                placeholder="I know kung fu..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px #00FF41' }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-matrix-green text-matrix-dark rounded font-cyber font-bold text-xl border-2 border-matrix-green"
            >
              {'>'} TRANSMIT_DATA
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-matrix-green/50 font-matrix text-sm"
        >
          <p>© 2025 CODE_MATRIX | reality.version = 4.2.0</p>
        </motion.div>
      </div>
    </section>
  )
}
