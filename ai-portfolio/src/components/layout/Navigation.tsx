'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let rafId: number | null = null
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)

          // Detect active section
          const sections = NAV_ITEMS.map((item) => item.href.substring(1))
          const scrollPosition = window.scrollY + 100

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const offsetTop = element.offsetTop
              const offsetHeight = element.offsetHeight

              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section)
                break
              }
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Initial call
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-cyber-darker/80 backdrop-blur-lg shadow-lg shadow-cyber-cyan/5' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AI.DEV
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive ? 'text-cyber-cyan' : 'text-gray-300 hover:text-cyber-cyan'
                  }`}
                >
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {item.label}
                  </motion.span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyber-cyan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Hover underline */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyber-cyan/50 transition-all duration-300 hover:w-full" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-cyber-cyan md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-40 w-64 bg-cyber-dark/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col space-y-6 px-6 pt-24">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-xl font-medium transition-colors ${
                        isActive ? 'text-cyber-cyan' : 'text-gray-300 hover:text-cyber-cyan'
                      }`}
                    >
                      {item.label}
                      {isActive && <span className="ml-2 text-xs">●</span>}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
