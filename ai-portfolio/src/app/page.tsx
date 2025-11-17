'use client'

import { Suspense } from 'react'
import Navigation from '@/components/layout/Navigation'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/layout/BackToTop'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Portfolio from '@/components/sections/Portfolio'
import Timeline from '@/components/sections/Timeline'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import { SITE_CONFIG } from '@/lib/constants'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <BackToTop />

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
        <footer className="relative border-t border-cyber-cyan/20 bg-gradient-to-b from-cyber-darker to-cyber-dark py-12">
          <div className="mx-auto max-w-7xl px-6">
            {/* Social Links */}
            <div className="mb-8 flex justify-center gap-6">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <div className="rounded-lg border border-cyber-cyan/20 bg-cyber-dark/50 p-3 transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-lg hover:shadow-cyber-cyan/20">
                  <Github className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyber-cyan" />
                </div>
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="rounded-lg border border-cyber-purple/20 bg-cyber-dark/50 p-3 transition-all hover:border-cyber-purple hover:bg-cyber-purple/10 hover:shadow-lg hover:shadow-cyber-purple/20">
                  <Linkedin className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyber-purple" />
                </div>
              </a>
              <a
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Twitter"
              >
                <div className="rounded-lg border border-cyber-pink/20 bg-cyber-dark/50 p-3 transition-all hover:border-cyber-pink hover:bg-cyber-pink/10 hover:shadow-lg hover:shadow-cyber-pink/20">
                  <Twitter className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyber-pink" />
                </div>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="mb-2 text-gray-400">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <p className="mb-3 text-sm text-gray-500">
                Built with{' '}
                <Heart className="inline h-4 w-4 text-cyber-pink" fill="currentColor" />{' '}
                using{' '}
                <span className="text-cyber-cyan">Next.js</span>,{' '}
                <span className="text-cyber-purple">Three.js</span> &{' '}
                <span className="text-cyber-pink">Framer Motion</span>
              </p>

              {/* Quick Links */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                <a href="#home" className="text-gray-500 transition-colors hover:text-cyber-cyan">
                  Home
                </a>
                <span className="text-gray-700">•</span>
                <a href="#about" className="text-gray-500 transition-colors hover:text-cyber-cyan">
                  About
                </a>
                <span className="text-gray-700">•</span>
                <a href="#portfolio" className="text-gray-500 transition-colors hover:text-cyber-cyan">
                  Projects
                </a>
                <span className="text-gray-700">•</span>
                <a href="#contact" className="text-gray-500 transition-colors hover:text-cyber-cyan">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-cyber-cyan/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-cyber-purple/5 blur-3xl" />
          </div>
        </footer>
      </main>
    </>
  )
}
