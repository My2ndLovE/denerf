'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ContactSectionProps {
  setCurrentSection: (section: string) => void
}

export default function ContactSection({ setCurrentSection }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('contact')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative"
    >
      <div className="container mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cyber text-6xl md:text-8xl font-black neural-gradient mb-6">
            CONNECT WITH US
          </h2>
          <p className="text-xl text-gray-300 font-mono">
            Ready to build intelligent solutions together?
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 bg-neural-dark/50 border-2 border-neural-primary/30 rounded-2xl p-8 backdrop-blur-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-neural-primary font-mono text-sm mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-neural-bg/50 border-2 border-neural-primary/30 rounded-lg text-white font-mono focus:border-neural-primary focus:outline-none transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-neural-primary font-mono text-sm mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-neural-bg/50 border-2 border-neural-primary/30 rounded-lg text-white font-mono focus:border-neural-primary focus:outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-neural-primary font-mono text-sm mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-neural-bg/50 border-2 border-neural-primary/30 rounded-lg text-white font-mono focus:border-neural-primary focus:outline-none transition-all resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <motion.button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-neural-primary to-neural-secondary rounded-lg font-cyber font-bold text-xl shadow-2xl shadow-neural-primary/50 border border-neural-primary/50"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,240,255,0.8)' }}
            whileTap={{ scale: 0.98 }}
          >
            Initiate Connection ⚡
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-gray-500 font-mono text-sm"
        >
          <p>© 2025 Neural Nexus. Powered by AI. Built for the future.</p>
        </motion.div>
      </div>
    </section>
  )
}
