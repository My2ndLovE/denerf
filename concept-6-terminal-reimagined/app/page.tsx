'use client'

import { Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import TerminalHero from '@/components/TerminalHero'
import CommandsSection from '@/components/CommandsSection'
import ProcessesSection from '@/components/ProcessesSection'
import ContactSection from '@/components/ContactSection'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const HolographicScene = dynamic(() => import('@/components/HolographicScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-term-bg">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse text-term-green">⌘</div>
        <p className="text-term-green font-term">{'>'} Initializing hologram...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <WebGLDetector>
      <ErrorBoundary>
        <main className="relative min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TerminalHero />
            <ErrorBoundary fallback={
              <div className="h-screen flex items-center justify-center bg-term-bg">
                <p className="text-term-green font-term">{'>'} Holographic visualization unavailable</p>
              </div>
            }>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen bg-term-bg">
                  <div className="text-6xl animate-pulse text-term-green">⌘</div>
                </div>
              }>
                <HolographicScene />
              </Suspense>
            </ErrorBoundary>
            <CommandsSection />
            <ProcessesSection />
            <ContactSection />
          </motion.div>
        </main>
      </ErrorBoundary>
    </WebGLDetector>
  )
}
