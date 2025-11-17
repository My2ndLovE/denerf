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
    { id: 'hero', label: 'Forge', icon: '⚒' },
    { id: 'projects', label: 'Crafted', icon: '🔨' },
    { id: 'services', label: 'Skills', icon: '⚙️' },
    { id: 'team', label: 'Smiths', icon: '👥' },
    { id: 'contact', label: 'Summon', icon: '✉️' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-forge-ember/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            <div className="text-4xl">⚒</div>
            <div>
              <h1 className="font-forge text-2xl font-bold fire-gradient">
                DIGITAL FORGE
              </h1>
              <p className="text-xs text-forge-metal">Crafting Innovation</p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-forge-fire to-forge-ember text-white shadow-lg shadow-forge-fire/50'
                    : 'text-forge-metal hover:text-forge-glow'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden lg:block px-6 py-3 bg-gradient-to-r from-forge-fire to-forge-ember rounded-lg font-forge font-bold shadow-lg shadow-forge-fire/50 hover:shadow-forge-fire/80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            Start Forging
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
