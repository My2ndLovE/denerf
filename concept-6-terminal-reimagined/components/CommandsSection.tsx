'use client'

import { motion } from 'framer-motion'

const commands = [
  { cmd: 'ls -la ./projects', desc: 'List all executed projects', output: '156 projects found' },
  { cmd: 'git log --oneline', desc: 'Show development history', output: '2.5k commits' },
  { cmd: 'npm test', desc: 'Run quality assurance', output: '100% pass rate' },
  { cmd: 'docker ps', desc: 'Active deployments', output: '24 containers running' },
]

export default function CommandsSection() {
  return (
    <section className="min-h-screen py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-term text-5xl font-bold text-term-green mb-16 text-center"
        >
          {'>'} Available_Commands
        </motion.h2>

        <div className="space-y-6">
          {commands.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-term-bg/50 border-2 border-term-green/30 rounded-lg p-6 font-term hover:border-term-green transition"
            >
              <div className="text-term-cyan mb-2">$ {item.cmd}</div>
              <div className="text-term-green/60 text-sm mb-2"># {item.desc}</div>
              <div className="text-term-yellow">{'>'} {item.output}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
