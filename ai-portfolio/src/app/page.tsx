'use client'

import { Suspense } from 'react'
import Navigation from '@/components/layout/Navigation'
import LoadingScreen from '@/components/layout/LoadingScreen'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Portfolio from '@/components/sections/Portfolio'
import Timeline from '@/components/sections/Timeline'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <main className="relative overflow-x-hidden">
        <Navigation />

        <Suspense fallback={<div className="h-screen bg-cyber-darker" />}>
          <Hero />
        </Suspense>

        <About />

        <Suspense fallback={<div className="h-screen bg-cyber-darker" />}>
          <Skills />
        </Suspense>

        <Portfolio />

        <Timeline />

        <Testimonials />

        <Contact />

        {/* Footer */}
        <footer className="border-t border-cyber-cyan/20 bg-cyber-darker py-8">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Built with{' '}
              <span className="text-cyber-cyan">Next.js</span>,{' '}
              <span className="text-cyber-purple">Three.js</span> &{' '}
              <span className="text-cyber-pink">GSAP</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Designed & Developed by <span className="text-gradient font-semibold">You</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
