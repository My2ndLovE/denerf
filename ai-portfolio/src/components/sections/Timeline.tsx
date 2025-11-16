'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, CheckCircle } from 'lucide-react'
import { EXPERIENCE } from '@/lib/constants'

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen bg-cyber-darker px-6 py-24"
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
            Experience
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
          <p className="mt-6 text-lg text-gray-400">
            My professional journey in AI and machine learning
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink md:left-1/2" />

          {/* Timeline items */}
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2'
              }`}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pr-12' : 'md:pl-12'}`}>
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 hidden h-6 w-6 rounded-full border-4 border-cyber-cyan bg-cyber-darker md:block ${
                    index % 2 === 0 ? 'md:-right-3' : 'md:-left-3'
                  }`}
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyber-cyan opacity-20" />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyber-cyan/50"
                >
                  {/* Period badge */}
                  <div className="mb-4 inline-block rounded-full bg-cyber-cyan/10 px-4 py-1 text-sm font-medium text-cyber-cyan">
                    {exp.period}
                  </div>

                  {/* Role and Company */}
                  <div className="mb-3 flex items-start gap-3">
                    <div className="rounded-lg bg-cyber-cyan/10 p-2">
                      <Briefcase className="text-cyber-cyan" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-cyber-cyan">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-gray-400">{exp.company}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-gray-300">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle
                          className="mt-0.5 flex-shrink-0 text-cyber-purple"
                          size={18}
                        />
                        <p className="text-sm text-gray-400">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-purple/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Corner accent */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyber-cyan/10 blur-2xl transition-all group-hover:bg-cyber-purple/20" />
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute left-0 md:left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-cyber-pink bg-cyber-darker">
              <div className="absolute inset-0 animate-pulse rounded-full bg-cyber-pink opacity-30" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl" />
      </div>
    </section>
  )
}
