'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import FlowSection from '@/components/FlowSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import LiquidCursor from '@/components/LiquidCursor'

const FluidScene = dynamic(() => import('@/components/FluidScene'), { ssr: false })

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <LiquidCursor />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <HeroSection />
        <Suspense fallback={<div className="h-screen bg-liquid-dark" />}>
          <FluidScene />
        </Suspense>
        <FlowSection />
        <ProjectsSection />
        <ContactSection />
      </motion.div>
    </main>
  )
}
