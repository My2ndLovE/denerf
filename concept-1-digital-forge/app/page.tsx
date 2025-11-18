'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import SparksEffect from '@/components/SparksEffect'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const ForgeScene = dynamic(() => import('@/components/ForgeScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <div className="fire-gradient text-6xl font-forge font-bold mb-4 animate-pulse">
          ⚒
        </div>
        <p className="text-forge-ember font-mono">Heating the forge...</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    </div>
  ),
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    setLoaded(true)

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <WebGLDetector>
      <ErrorBoundary>
        <main className="relative min-h-screen bg-gradient-to-b from-black via-forge-dark to-black">
          <SparksEffect />

          <AnimatePresence mode="wait">
            {loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Navigation currentSection={currentSection} />

                <div className="relative z-10">
                  <HeroSection setCurrentSection={setCurrentSection} />

                  <ErrorBoundary
                    fallback={
                      <div className="h-screen flex items-center justify-center">
                        <div className="text-center text-white">
                          <p className="text-2xl mb-4">Unable to load 3D scene</p>
                          <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <Suspense fallback={<div className="h-screen bg-black" />}>
                      <ForgeScene />
                    </Suspense>
                  </ErrorBoundary>

                  <ProjectsSection setCurrentSection={setCurrentSection} />
                  <ServicesSection setCurrentSection={setCurrentSection} />
                  <TeamSection setCurrentSection={setCurrentSection} />
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
