'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Card3D from '@/components/ui/Card3D'
import { PROJECTS } from '@/lib/constants'

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-gradient md:text-6xl">
            Featured Projects
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
          <p className="mt-6 text-lg text-gray-400">
            Showcasing AI-powered solutions that make a difference
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card3D className="group h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/90 to-cyber-darker/90 backdrop-blur-sm transition-all duration-300 hover:border-cyber-cyan/50">
                  {/* Project Image Placeholder */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyber-cyan/20 via-cyber-purple/20 to-cyber-pink/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-cyber-cyan/20">
                        {project.id}
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Action buttons */}
                    <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg bg-cyber-dark/80 p-2 backdrop-blur-sm transition-colors hover:bg-cyber-cyan/20"
                      >
                        <Github size={20} className="text-cyber-cyan" />
                      </motion.a>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg bg-cyber-dark/80 p-2 backdrop-blur-sm transition-colors hover:bg-cyber-cyan/20"
                      >
                        <ExternalLink size={20} className="text-cyber-cyan" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold text-cyber-cyan">
                      {project.title}
                    </h3>

                    <p className="mb-4 text-gray-400">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyber-purple/50 bg-cyber-purple/10 px-3 py-1 text-xs font-medium text-cyber-purple"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block rounded-lg border-2 border-cyber-cyan px-8 py-4 text-lg font-semibold text-cyber-cyan transition-all hover:bg-cyber-cyan hover:text-cyber-darker"
          >
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-cyber-pink/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl" />
      </div>
    </section>
  )
}
