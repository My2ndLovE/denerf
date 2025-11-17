'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NavigationProps {
  currentSection: string
}

export default function Navigation({ currentSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: 'Nexus', icon: '🧠' },
    { id: 'solutions', label: 'Solutions', icon: '⚡' },
    { id: 'capabilities', label: 'Powers', icon: '🔮' },
    { id: 'intelligence', label: 'AI', icon: '🤖' },
    { id: 'contact', label: 'Connect', icon: '🔗' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-neural-dark/90 backdrop-blur-2xl border-b border-neural-primary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🧠
            </motion.div>
            <div>
              <h1 className="font-cyber text-2xl font-bold neural-gradient">
                NEURAL NEXUS
              </h1>
              <p className="text-xs text-neural-primary font-mono">AI-Powered Solutions</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  currentSection === item.id
                    ? 'text-neural-primary'
                    : 'text-gray-400 hover:text-neural-glow'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentSection === item.id && (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-neural-primary/20 to-neural-secondary/20 rounded-lg border border-neural-primary/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            className="hidden lg:block px-6 py-3 bg-gradient-to-r from-neural-primary to-neural-secondary rounded-lg font-cyber font-bold text-sm shadow-lg shadow-neural-primary/50 hover:shadow-neural-primary/80 transition-all border border-neural-primary/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            <span className="flex items-center space-x-2">
              <span>Initialize Connection</span>
              <span>→</span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
