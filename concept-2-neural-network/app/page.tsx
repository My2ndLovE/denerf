'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import NetworkScene from '@/components/NetworkScene'
import SolutionsSection from '@/components/SolutionsSection'
import CapabilitiesSection from '@/components/CapabilitiesSection'
import IntelligenceSection from '@/components/IntelligenceSection'
import ContactSection from '@/components/ContactSection'
import ElectricTrail from '@/components/ElectricTrail'

const NeuralBackground = dynamic(() => import('@/components/NeuralBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-neural-bg" />,
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-neural-bg">
      <NeuralBackground />
      <ElectricTrail />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Navigation currentSection={currentSection} />

            <div className="relative z-10">
              <HeroSection setCurrentSection={setCurrentSection} />

              <Suspense fallback={<div className="h-screen" />}>
                <NetworkScene />
              </Suspense>

              <SolutionsSection setCurrentSection={setCurrentSection} />
              <CapabilitiesSection setCurrentSection={setCurrentSection} />
              <IntelligenceSection setCurrentSection={setCurrentSection} />
              <ContactSection setCurrentSection={setCurrentSection} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
