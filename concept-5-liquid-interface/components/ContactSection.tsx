'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section className="min-h-screen py-32 px-6 flex items-center">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-liquid text-6xl font-bold gradient-shift bg-clip-text text-transparent mb-6">
            Merge with Us
          </h2>
          <p className="text-liquid-light font-liquid text-xl">
            Let your ideas flow into reality
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-liquid-purple/20 backdrop-blur rounded-3xl p-8 border-2 border-liquid-purple/50 space-y-4 liquid-flow"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 bg-liquid-dark/50 border-2 border-liquid-purple/30 rounded-2xl text-liquid-light font-liquid focus:border-liquid-purple focus:outline-none backdrop-blur"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-liquid-dark/50 border-2 border-liquid-purple/30 rounded-2xl text-liquid-light font-liquid focus:border-liquid-purple focus:outline-none backdrop-blur"
          />
          <textarea
            rows={5}
            placeholder="Your vision..."
            className="w-full px-4 py-3 bg-liquid-dark/50 border-2 border-liquid-purple/30 rounded-2xl text-liquid-light font-liquid focus:border-liquid-purple focus:outline-none backdrop-blur resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-8 py-4 gradient-shift rounded-full font-liquid font-bold text-xl shadow-2xl text-white"
          >
            💧 Flow Together
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-liquid-light/50 font-liquid mt-8"
        >
          © 2025 Liquid Interface. Always flowing, never static.
        </motion.p>
      </div>
    </section>
  )
}
