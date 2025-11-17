'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface TeamSectionProps {
  setCurrentSection: (section: string) => void
}

const team = [
  {
    id: 1,
    name: 'Marcus Ironheart',
    role: 'Master Architect',
    specialty: 'System Design & Scalability',
    icon: '⚒️',
    stats: { projects: '150+', years: '12y', specialty: 'Cloud Architecture' },
    quote: 'Every line of code is a strike of the hammer.',
  },
  {
    id: 2,
    name: 'Elena Sparkweaver',
    role: 'Lead 3D Artisan',
    specialty: 'WebGL & Immersive Experiences',
    icon: '✨',
    stats: { projects: '80+', years: '8y', specialty: 'Three.js/R3F' },
    quote: 'Transforming pixels into breathtaking realities.',
  },
  {
    id: 3,
    name: 'Kai Dataforge',
    role: 'AI Specialist',
    specialty: 'Machine Learning & Neural Networks',
    icon: '🧠',
    stats: { projects: '60+', years: '7y', specialty: 'Deep Learning' },
    quote: 'Teaching machines to think, one model at a time.',
  },
  {
    id: 4,
    name: 'Aria Chainsmith',
    role: 'Blockchain Engineer',
    specialty: 'Smart Contracts & DeFi',
    icon: '⛓️',
    stats: { projects: '45+', years: '5y', specialty: 'Ethereum/Solidity' },
    quote: 'Forging trust through decentralization.',
  },
]

export default function TeamSection({ setCurrentSection }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('team')
    }
  }, [isInView, setCurrentSection])

  return (
    <section
      id="team"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-forge-dark to-black" />

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
            MASTER SMITHS
          </h2>
          <p className="text-xl text-forge-metal font-mono max-w-2xl mx-auto">
            Meet the artisans behind the forge.{' '}
            <span className="text-forge-ember">Passion</span>,{' '}
            <span className="text-forge-ember">precision</span>, and{' '}
            <span className="text-forge-ember">expertise</span> in every stroke.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-2xl p-8 overflow-hidden group"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255, 165, 0, 0.6)' }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-forge-fire/0 to-forge-ember/0 group-hover:from-forge-fire/10 group-hover:to-forge-ember/10 transition-all duration-500" />

                {/* Icon Avatar */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-forge-fire to-forge-ember rounded-full flex items-center justify-center text-5xl shadow-2xl shadow-forge-fire/50"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {member.icon}
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-forge-glow rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    ✓
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-forge text-3xl font-bold text-white mb-2 group-hover:text-forge-glow transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-forge-ember font-mono text-sm mb-2">{member.role}</p>
                  <p className="text-forge-metal text-sm mb-4">{member.specialty}</p>

                  {/* Quote */}
                  <div className="my-6 p-4 bg-black/50 border-l-4 border-forge-ember rounded">
                    <p className="text-forge-metal italic text-sm">"{member.quote}"</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-forge-ember/30">
                    {Object.entries(member.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold fire-gradient mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-forge-metal uppercase font-mono">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center p-12 bg-gradient-to-r from-forge-fire/5 to-forge-ember/5 border-2 border-forge-ember/30 rounded-2xl"
        >
          <h3 className="font-forge text-4xl font-bold mb-4 fire-gradient">
            Join Our Forge
          </h3>
          <p className="text-forge-metal font-mono mb-8 max-w-2xl mx-auto">
            We're always looking for passionate craftspeople to join our team. If you live and
            breathe code, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold text-xl shadow-2xl shadow-forge-fire/50"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Openings 🔥
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-forge-ember rounded-lg font-forge font-bold text-xl hover:bg-forge-ember/10 transition-all"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Culture & Values ⚙️
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative */}
      <div className="absolute top-1/4 left-10 text-8xl opacity-5 animate-pulse">👥</div>
      <div className="absolute bottom-1/4 right-10 text-8xl opacity-5 animate-pulse">⚒️</div>
    </section>
  )
}
