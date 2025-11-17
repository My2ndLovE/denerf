'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import MatrixRain from '@/components/MatrixRain'
import HeroSection from '@/components/HeroSection'
import RealitySection from '@/components/RealitySection'
import CodeSection from '@/components/CodeSection'
import ContactSection from '@/components/ContactSection'

const Matrix3D = dynamic(() => import('@/components/Matrix3D'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-matrix-dark">
      <MatrixRain />

      {loaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <HeroSection />
          <Suspense fallback={<div className="h-screen bg-matrix-dark" />}>
            <Matrix3D />
          </Suspense>
          <RealitySection />
          <CodeSection />
          <ContactSection />
        </motion.div>
      )}
    </main>
  )
}
