'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactSection() {
  const [input, setInput] = useState('')

  return (
    <section className="min-h-screen py-32 px-6 flex items-center">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-term text-5xl font-bold text-term-green mb-6">
            {'>'} ./connect --interactive
          </h2>
          <p className="text-term-cyan">Initialize collaboration protocol</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-term-bg border-2 border-term-green rounded-lg p-8 font-term"
        >
          <div className="space-y-4">
            <div>
              <label className="text-term-green block mb-2">$ echo "name" {'>'}</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-term-bg border border-term-green/30 rounded text-term-green font-term focus:border-term-green focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-term-green block mb-2">$ cat email.txt {'>'}</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-term-bg border border-term-green/30 rounded text-term-green font-term focus:border-term-green focus:outline-none"
                placeholder="your@email.dev"
              />
            </div>
            <div>
              <label className="text-term-green block mb-2">$ vim message.md {'>'}</label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 bg-term-bg border border-term-green/30 rounded text-term-green font-term focus:border-term-green focus:outline-none resize-none"
                placeholder="Your message here..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px #0DBC79' }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-term-green text-term-bg rounded font-bold border-2 border-term-green"
            >
              {'>'} ./submit --now
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-term-green/50 font-term text-sm"
        >
          <p>© 2025 Terminal Reimagined | exit status: 0</p>
        </motion.div>
      </div>
    </section>
  )
}
