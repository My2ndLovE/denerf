'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import MatrixRain from '@/components/MatrixRain'
import HeroSection from '@/components/HeroSection'
import RealitySection from '@/components/RealitySection'
import CodeSection from '@/components/CodeSection'
import ContactSection from '@/components/ContactSection'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebGLDetector from '@/components/WebGLDetector'

const Matrix3D = dynamic(() => import('@/components/Matrix3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-matrix-dark">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse matrix-glow">{'< / >'}</div>
        <p className="text-matrix-green font-cyber">{'>'} Loading the Matrix...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)

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
        <main className="relative min-h-screen bg-matrix-dark">
          <MatrixRain />

          {loaded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <HeroSection />
              <ErrorBoundary fallback={
                <div className="h-screen flex items-center justify-center">
                  <p className="text-matrix-green font-cyber">{'>'} Matrix visualization unavailable</p>
                </div>
              }>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-screen bg-matrix-dark">
                    <div className="text-6xl animate-pulse matrix-glow">{'< / >'}</div>
                  </div>
                }>
                  <Matrix3D />
                </Suspense>
              </ErrorBoundary>
              <RealitySection />
              <CodeSection />
              <ContactSection />
            </motion.div>
          )}
        </main>
      </ErrorBoundary>
    </WebGLDetector>
  )
}
