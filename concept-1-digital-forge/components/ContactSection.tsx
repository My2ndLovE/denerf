'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ContactSectionProps {
  setCurrentSection: (section: string) => void
}

export default function ContactSection({ setCurrentSection }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: '',
  })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('contact')
    }
  }, [isInView, setCurrentSection])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-forge-dark to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.15),transparent_70%)]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-forge text-6xl md:text-8xl font-black fire-gradient mb-6">
            LET'S FORGE TOGETHER
          </h2>
          <p className="text-xl text-forge-metal font-mono max-w-2xl mx-auto">
            Ready to turn your vision into reality? The forge is hot and we're ready to craft
            something <span className="text-forge-ember font-bold">legendary</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-2xl p-8"
            >
              <div>
                <label className="block text-forge-ember font-mono text-sm mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-forge-metal/30 rounded-lg text-white font-mono focus:border-forge-ember focus:outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-forge-ember font-mono text-sm mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-forge-metal/30 rounded-lg text-white font-mono focus:border-forge-ember focus:outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-forge-ember font-mono text-sm mb-2">
                  Project Type *
                </label>
                <select
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-forge-metal/30 rounded-lg text-white font-mono focus:border-forge-ember focus:outline-none transition-all"
                >
                  <option value="">Select a project type...</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="3d-experience">3D/Immersive Experience</option>
                  <option value="ai-ml">AI/ML Integration</option>
                  <option value="blockchain">Blockchain/Web3</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-forge-ember font-mono text-sm mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-forge-metal/30 rounded-lg text-white font-mono focus:border-forge-ember focus:outline-none transition-all"
                >
                  <option value="">Select budget range...</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k+">$100k+</option>
                </select>
              </div>

              <div>
                <label className="block text-forge-ember font-mono text-sm mb-2">
                  Project Details *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-forge-metal/30 rounded-lg text-white font-mono focus:border-forge-ember focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your project vision..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold text-xl shadow-2xl shadow-forge-fire/50 hover:shadow-forge-fire/80 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Ignite the Forge 🔥
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              <motion.div
                className="p-6 bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-forge text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-forge-ember font-mono">forge@digitalforge.dev</p>
                <p className="text-forge-metal text-sm mt-2">We respond within 24 hours</p>
              </motion.div>

              <motion.div
                className="p-6 bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-forge text-xl font-bold text-white mb-2">Schedule a Call</h3>
                <p className="text-forge-ember font-mono">calendly.com/digitalforge</p>
                <p className="text-forge-metal text-sm mt-2">Free 30-minute consultation</p>
              </motion.div>

              <motion.div
                className="p-6 bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-3">📍</div>
                <h3 className="font-forge text-xl font-bold text-white mb-2">Visit Our Forge</h3>
                <p className="text-forge-ember font-mono">San Francisco, CA</p>
                <p className="text-forge-metal text-sm mt-2">Remote-first, globally distributed</p>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="p-8 bg-gradient-to-br from-forge-fire/10 to-forge-ember/10 border-2 border-forge-ember/30 rounded-xl">
              <h3 className="font-forge text-2xl font-bold mb-6 fire-gradient text-center">
                Follow the Forge
              </h3>
              <div className="flex justify-center gap-4">
                {['GitHub', 'Twitter', 'LinkedIn', 'Discord'].map((social) => (
                  <motion.button
                    key={social}
                    className="w-12 h-12 bg-black/50 border-2 border-forge-ember/30 rounded-lg flex items-center justify-center hover:border-forge-ember transition-all"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">🔗</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-forge-ember/30 text-center"
        >
          <p className="text-forge-metal font-mono text-sm">
            © 2025 Digital Forge. Crafted with{' '}
            <span className="text-forge-ember">passion</span> and{' '}
            <span className="text-forge-ember">precision</span>.
          </p>
          <div className="mt-4 text-4xl">⚒️</div>
        </motion.div>
      </div>
    </section>
  )
}
