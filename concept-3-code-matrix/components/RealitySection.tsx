'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const layers = [
  { id: 1, title: 'LAYER_01: USER_INTERFACE', desc: 'What you see. The comfortable illusion.', depth: 'z-10' },
  { id: 2, title: 'LAYER_02: BACKEND_LOGIC', desc: 'Where the real work happens. Hidden from view.', depth: 'z-20' },
  { id: 3, title: 'LAYER_03: DATA_STREAMS', desc: 'The flow of information. Pure, unfiltered data.', depth: 'z-30' },
  { id: 4, title: 'LAYER_04: THE_MATRIX', desc: 'The code beneath everything. Reality itself.', depth: 'z-40' },
]

export default function RealitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 relative">
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="font-cyber text-6xl font-bold matrix-glow mb-16 text-center"
        >
          {'>'} DECODE_REALITY_LAYERS
        </motion.h2>

        <div className="space-y-8">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className="p-8 bg-matrix-dark/50 border-2 border-matrix-green/30 rounded-lg hover:border-matrix-green transition-all backdrop-blur"
            >
              <h3 className="font-cyber text-2xl text-matrix-glow mb-3">
                {'>'} {layer.title}
              </h3>
              <p className="text-matrix-green/70 font-matrix">
                {'>'} {layer.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
