'use client'

import { Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ToolsSection from '@/components/ToolsSection'
import ContactSection from '@/components/ContactSection'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const CityScene = dynamic(() => import('@/components/CityScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-build-sky">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🏗️</div>
        <p className="text-build-brick font-build">Building your city...</p>
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
            <HeroSection />
            <ErrorBoundary fallback={
              <div className="h-screen flex items-center justify-center bg-build-sky">
                <p className="text-build-brick font-build">City visualization unavailable</p>
              </div>
            }>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen bg-build-sky">
                  <div className="text-6xl animate-pulse">🏗️</div>
                </div>
              }>
                <CityScene />
              </Suspense>
            </ErrorBoundary>
            <ProjectsSection />
            <ToolsSection />
            <ContactSection />
          </motion.div>
        </main>
      </ErrorBoundary>
    </WebGLDetector>
  )
}
