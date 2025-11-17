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

const ForgeScene = dynamic(() => import('@/components/ForgeScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <div className="fire-gradient text-6xl font-forge font-bold mb-4 animate-pulse">
          ⚒
        </div>
        <p className="text-forge-ember font-mono">Heating the forge...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-forge-dark to-black">
      <SparksEffect />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navigation currentSection={currentSection} />

            <div className="relative z-10">
              <HeroSection setCurrentSection={setCurrentSection} />

              <Suspense fallback={<div className="h-screen" />}>
                <ForgeScene />
              </Suspense>

              <ProjectsSection setCurrentSection={setCurrentSection} />
              <ServicesSection setCurrentSection={setCurrentSection} />
              <TeamSection setCurrentSection={setCurrentSection} />
              <ContactSection setCurrentSection={setCurrentSection} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
