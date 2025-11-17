'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ServicesSectionProps {
  setCurrentSection: (section: string) => void
}

const services = [
  {
    id: 1,
    title: 'Full-Stack Forging',
    icon: '⚒️',
    description: 'End-to-end development from concept to deployment. We craft robust, scalable applications.',
    skills: ['React/Next.js', 'Node.js', 'Python', 'Cloud Architecture', 'DevOps'],
    highlight: 'Our specialty',
  },
  {
    id: 2,
    title: '3D & WebGL Mastery',
    icon: '🎨',
    description: 'Immersive 3D experiences that captivate. From Three.js to Unity WebGL.',
    skills: ['Three.js', 'R3F', 'Babylon.js', 'WebGL Shaders', 'Unity'],
    highlight: 'Award-winning',
  },
  {
    id: 3,
    title: 'AI Integration',
    icon: '🤖',
    description: 'Infuse intelligence into your products. Machine learning models that deliver results.',
    skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'LLMs'],
    highlight: 'Cutting-edge',
  },
  {
    id: 4,
    title: 'Blockchain Solutions',
    icon: '⛓️',
    description: 'Decentralized apps and smart contracts. Security and transparency forged in.',
    skills: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS', 'DeFi'],
    highlight: 'Secure',
  },
  {
    id: 5,
    title: 'Mobile Crafting',
    icon: '📱',
    description: 'Native and cross-platform mobile apps. Performance meets beautiful design.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA'],
    highlight: 'User-loved',
  },
  {
    id: 6,
    title: 'Performance Tuning',
    icon: '⚡',
    description: 'Optimize every millisecond. Make your app blazing fast and efficient.',
    skills: ['Profiling', 'Caching', 'CDN', 'Compression', 'Load Balancing'],
    highlight: 'Lightning fast',
  },
]

export default function ServicesSection({ setCurrentSection }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      setCurrentSection('services')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(255,165,0,0.02)_2px,transparent_2px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-forge text-6xl md:text-8xl font-black fire-gradient mb-6">
            OUR SMITHING SKILLS
          </h2>
          <p className="text-xl text-forge-metal font-mono max-w-2xl mx-auto">
            Master craftsmen wielding the{' '}
            <span className="text-forge-ember">latest technologies</span> to forge{' '}
            <span className="text-forge-ember">exceptional solutions</span>.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <motion.div
                className="relative h-full bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-xl p-6 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 165, 0, 0.8)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-forge-fire/0 to-forge-ember/0 group-hover:from-forge-fire/10 group-hover:to-forge-ember/10 transition-all duration-500" />

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-forge-ember/20 border border-forge-ember rounded-full text-xs font-mono text-forge-ember">
                    {service.highlight}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: hoveredService === service.id ? 360 : 0,
                    scale: hoveredService === service.id ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="font-forge text-2xl font-bold text-white mb-3 group-hover:text-forge-glow transition-colors">
                  {service.title}
                </h3>

                <p className="text-forge-metal mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-xs font-mono text-forge-ember uppercase tracking-wider">
                    Technologies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="px-2 py-1 bg-black/50 border border-forge-metal/30 rounded text-xs font-mono text-forge-metal group-hover:border-forge-ember/50 group-hover:text-forge-ember transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Spark effect on hover */}
                {hoveredService === service.id && (
                  <motion.div
                    className="absolute bottom-4 right-4 text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    ✨
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-10 bg-gradient-to-r from-forge-fire/10 to-forge-ember/10 border border-forge-ember/30 rounded-2xl"
        >
          <h3 className="font-forge text-3xl font-bold mb-4 fire-gradient">
            Need a Custom Solution?
          </h3>
          <p className="text-forge-metal font-mono mb-6">
            We specialize in unique challenges. Tell us what you need forged.
          </p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold shadow-lg shadow-forge-fire/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Let's Talk ⚙️
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
