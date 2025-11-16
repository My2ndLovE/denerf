'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = TESTIMONIALS[currentIndex]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-gradient md:text-6xl">
            Testimonials
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
          <p className="mt-6 text-lg text-gray-400">
            What clients and colleagues say about working with me
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="group relative overflow-hidden rounded-3xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/90 to-cyber-darker/90 p-8 backdrop-blur-sm md:p-12">
                {/* Quote icon */}
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Quote size={150} className="text-cyber-cyan" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="mb-6 flex gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <Star className="fill-cyber-cyan text-cyber-cyan" size={24} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="mb-8 text-xl leading-relaxed text-gray-300 md:text-2xl">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple text-2xl font-bold text-white">
                      {currentTestimonial.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-cyber-cyan">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-purple/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full border-2 border-cyber-cyan bg-cyber-dark/50 p-3 text-cyber-cyan transition-all hover:bg-cyber-cyan hover:text-cyber-darker"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-cyber-cyan'
                      : 'w-2 bg-cyber-cyan/30 hover:bg-cyber-cyan/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full border-2 border-cyber-cyan bg-cyber-dark/50 p-3 text-cyber-cyan transition-all hover:bg-cyber-cyan hover:text-cyber-darker"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="mt-6 text-center">
            <span className="text-sm font-medium text-gray-400">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-cyber-pink/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-cyber-cyan/5 blur-3xl" />
      </div>
    </section>
  )
}
