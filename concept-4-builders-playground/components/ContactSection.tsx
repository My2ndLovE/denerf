'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section className="min-h-screen py-32 px-6 relative flex items-center">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-build text-6xl font-bold text-build-brick mb-6">
            🏗️ Let's Build Together!
          </h2>
          <p className="text-xl text-gray-700 font-playful">
            Ready to construct your dream project?
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-build-yellow space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border-2 border-build-concrete rounded-lg font-playful"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border-2 border-build-concrete rounded-lg font-playful"
          />
          <textarea
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 border-2 border-build-concrete rounded-lg font-playful resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-8 py-4 bg-build-yellow text-gray-800 rounded-xl font-build font-bold text-xl shadow-lg border-4 border-build-orange"
          >
            🏗️ Start Building!
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 font-playful mt-8"
        >
          © 2025 Builder's Playground. Constructing digital dreams! 🏗️
        </motion.p>
      </div>
    </section>
  )
}
