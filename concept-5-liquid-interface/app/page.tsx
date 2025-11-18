'use client'

import { Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import FlowSection from '@/components/FlowSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import LiquidCursor from '@/components/LiquidCursor'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const FluidScene = dynamic(() => import('@/components/FluidScene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-liquid-dark">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">💧</div>
        <p className="text-liquid-purple font-liquid">Morphing interface...</p>
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
          <LiquidCursor />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <HeroSection />
            <ErrorBoundary fallback={
              <div className="h-screen flex items-center justify-center bg-liquid-dark">
                <p className="text-liquid-purple font-liquid">Fluid visualization unavailable</p>
              </div>
            }>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen bg-liquid-dark">
                  <div className="text-6xl animate-pulse">💧</div>
                </div>
              }>
                <FluidScene />
              </Suspense>
            </ErrorBoundary>
            <FlowSection />
            <ProjectsSection />
            <ContactSection />
          </motion.div>
        </main>
      </ErrorBoundary>
    </WebGLDetector>
  )
}
