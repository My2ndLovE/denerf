'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
      id="about"
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
            About Me
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-cyber-cyan"
            >
              Building the Future with AI
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed text-gray-300"
            >
              I'm a passionate AI Engineer specializing in machine learning, deep learning,
              and intelligent system design. With years of experience in building production-ready
              AI solutions, I transform complex problems into elegant, scalable systems.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed text-gray-300"
            >
              My expertise spans from natural language processing and computer vision to
              predictive analytics and neural network optimization. I believe in creating
              AI that not only works but makes a meaningful impact.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed text-gray-300"
            >
              When I'm not training models or optimizing algorithms, you'll find me exploring
              the latest research papers, contributing to open-source projects, or sharing
              knowledge with the AI community.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {['Python', 'TensorFlow', 'PyTorch', 'React', 'Docker', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyber-cyan/50 bg-cyber-cyan/10 px-4 py-2 text-sm font-medium text-cyber-cyan"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-6"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/80 p-8 backdrop-blur-sm transition-all"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-purple/5 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-2 text-5xl font-bold text-cyber-cyan">
                    <CountUp end={stat.value} duration={2.5} />
                    {stat.label.includes('Satisfaction') ? '%' : '+'}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {stat.label}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyber-cyan/10 blur-2xl transition-all group-hover:bg-cyber-purple/20" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-cyan/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
