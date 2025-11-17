'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectsSectionProps {
  setCurrentSection: (section: string) => void
}

const projects = [
  {
    id: 1,
    title: 'FinanceForge',
    category: 'FinTech Platform',
    description: 'Forged a revolutionary blockchain-based payment system handling $50M+ in daily transactions.',
    tech: ['React', 'Three.js', 'Blockchain', 'Node.js'],
    icon: '💰',
    color: 'from-yellow-500 to-orange-600',
    metrics: { users: '500K+', uptime: '99.9%', speed: '0.3s' }
  },
  {
    id: 2,
    title: 'HealthSmith AI',
    category: 'Healthcare AI',
    description: 'Crafted an AI-powered diagnostic assistant that reduced diagnosis time by 60%.',
    tech: ['Python', 'TensorFlow', 'WebGL', 'FastAPI'],
    icon: '🏥',
    color: 'from-green-500 to-teal-600',
    metrics: { accuracy: '94%', patients: '1M+', saved: '40hrs/day' }
  },
  {
    id: 3,
    title: 'EduCraft',
    category: 'EdTech Platform',
    description: 'Molded an immersive 3D learning platform with real-time collaboration for 2M+ students.',
    tech: ['Next.js', 'R3F', 'WebRTC', 'PostgreSQL'],
    icon: '🎓',
    color: 'from-blue-500 to-purple-600',
    metrics: { students: '2M+', courses: '50K+', satisfaction: '4.8/5' }
  },
  {
    id: 4,
    title: 'MetaMall',
    category: 'Metaverse Commerce',
    description: 'Shaped a virtual shopping experience with photorealistic 3D product visualization.',
    tech: ['Unity WebGL', 'Babylon.js', 'AR', 'Cloud'],
    icon: '🛍️',
    color: 'from-pink-500 to-rose-600',
    metrics: { sales: '+340%', visitors: '800K/mo', vr: '15K users' }
  },
]

export default function ProjectsSection({ setCurrentSection }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      setCurrentSection('projects')
    }
  }, [isInView, setCurrentSection])

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.project-card')

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-forge-dark to-black opacity-50" />

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
            FORGED MASTERPIECES
          </h2>
          <p className="text-xl text-forge-metal font-mono max-w-2xl mx-auto">
            Every project is crafted with{' '}
            <span className="text-forge-ember">precision</span>,{' '}
            <span className="text-forge-ember">tested by fire</span>, and{' '}
            <span className="text-forge-ember">built to last</span>.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card group relative"
              whileHover={{ scale: 1.02, z: 50 }}
              style={{ perspective: 1000 }}
            >
              <div className="relative bg-gradient-to-br from-black via-forge-dark to-black border-2 border-forge-ember/30 rounded-2xl p-8 overflow-hidden hover:border-forge-ember transition-all duration-500 shadow-2xl hover:shadow-forge-fire/50">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {project.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-forge text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-forge-ember font-mono text-sm mb-4">
                    {project.category}
                  </p>
                  <p className="text-forge-metal mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-forge-ember/20 border border-forge-ember/50 rounded-full text-xs font-mono text-forge-ember"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-forge-ember/30">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold fire-gradient mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-forge-metal uppercase font-mono">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hammer Icon on Hover */}
                <motion.div
                  className="absolute top-4 right-4 text-4xl opacity-0 group-hover:opacity-100"
                  initial={{ rotate: -45 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  🔨
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-forge-metal font-mono mb-6">
            Ready to forge your next masterpiece?
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold text-xl shadow-2xl shadow-forge-fire/50"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start Your Project 🔥
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-8xl opacity-5 animate-pulse">⚙️</div>
      <div className="absolute bottom-20 right-10 text-8xl opacity-5 animate-pulse">🔨</div>
    </section>
  )
}
