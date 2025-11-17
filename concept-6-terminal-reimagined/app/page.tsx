'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import TerminalHero from '@/components/TerminalHero'
import CommandsSection from '@/components/CommandsSection'
import ProcessesSection from '@/components/ProcessesSection'
import ContactSection from '@/components/ContactSection'

const HolographicScene = dynamic(() => import('@/components/HolographicScene'), { ssr: false })

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TerminalHero />
        <Suspense fallback={<div className="h-screen bg-term-bg" />}>
          <HolographicScene />
        </Suspense>
        <CommandsSection />
        <ProcessesSection />
        <ContactSection />
      </motion.div>
    </main>
  )
}
