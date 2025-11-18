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
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const NeuralBackground = dynamic(() => import('@/components/NeuralBackground'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center fixed inset-0 bg-neural-bg">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🧠</div>
        <p className="text-neural-primary font-cyber">Initializing neural network...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    setLoaded(true)

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <WebGLDetector>
      <ErrorBoundary>
        <main className="relative min-h-screen bg-neural-bg">
          <NeuralBackground />
          <ElectricTrail />

          <AnimatePresence mode="wait">
            {loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Navigation currentSection={currentSection} />

                <div className="relative z-10">
                  <HeroSection setCurrentSection={setCurrentSection} />

                  <ErrorBoundary fallback={
                    <div className="h-screen flex items-center justify-center">
                      <p className="text-neural-primary font-cyber">Neural network visualization unavailable</p>
                    </div>
                  }>
                    <Suspense fallback={
                      <div className="h-screen flex items-center justify-center">
                        <div className="text-6xl animate-pulse">🧠</div>
                      </div>
                    }>
                      <NetworkScene />
                    </Suspense>
                  </ErrorBoundary>

                  <SolutionsSection setCurrentSection={setCurrentSection} />
                  <CapabilitiesSection setCurrentSection={setCurrentSection} />
                  <IntelligenceSection setCurrentSection={setCurrentSection} />
                  <ContactSection setCurrentSection={setCurrentSection} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </ErrorBoundary>
    </WebGLDetector>
  )
}
