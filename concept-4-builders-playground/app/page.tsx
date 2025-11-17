'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ToolsSection from '@/components/ToolsSection'
import ContactSection from '@/components/ContactSection'

const CityScene = dynamic(() => import('@/components/CityScene'), { ssr: false })

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        <Suspense fallback={<div className="h-screen bg-build-sky" />}>
          <CityScene />
        </Suspense>
        <ProjectsSection />
        <ToolsSection />
        <ContactSection />
      </motion.div>
    </main>
  )
}
