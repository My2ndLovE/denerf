'use client'

import { motion } from 'framer-motion'

const processes = [
  { pid: 1337, name: 'innovation.exe', cpu: '99%', status: 'Running' },
  { pid: 2048, name: 'creativity.js', cpu: '87%', status: 'Active' },
  { pid: 4096, name: 'excellence.py', cpu: '95%', status: 'Running' },
]

export default function ProcessesSection() {
  return (
    <section className="min-h-screen py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-term text-5xl font-bold text-term-green mb-16 text-center"
        >
          {'>'} ps aux | Running_Processes
        </motion.h2>

        <div className="bg-term-bg/50 border-2 border-term-green rounded-lg p-6 font-term">
          <div className="grid grid-cols-4 gap-4 text-term-cyan mb-4 font-bold">
            <div>PID</div>
            <div>PROCESS</div>
            <div>CPU</div>
            <div>STATUS</div>
          </div>

          {processes.map((proc, i) => (
            <motion.div
              key={proc.pid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-4 gap-4 py-3 border-t border-term-green/30 text-term-green hover:bg-term-green/10 transition"
            >
              <div>{proc.pid}</div>
              <div>{proc.name}</div>
              <div className="text-term-yellow">{proc.cpu}</div>
              <div className="text-term-cyan">{proc.status}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
