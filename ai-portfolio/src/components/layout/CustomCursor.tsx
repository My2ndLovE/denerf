'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) {
      // Restore default cursor on mobile
      document.body.style.cursor = 'auto'
      return
    } else {
      // Hide cursor on desktop (CSS handles this)
      document.body.style.cursor = 'none'
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Function to add listeners to interactive elements
    const addListenersToElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      return interactiveElements
    }

    // Initial setup
    let interactiveElements = addListenersToElements()

    // Watch for DOM changes and add listeners to new elements
    const observer = new MutationObserver(() => {
      // Remove old listeners
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      // Re-add to all elements (including new ones)
      interactiveElements = addListenersToElements()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('resize', checkMobile)
      document.body.style.cursor = 'auto'
      observer.disconnect()
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-cyber-cyan mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Cursor follower ring */}
      <motion.div
        className="cursor-follower pointer-events-none fixed z-[9999] rounded-full border-2 border-cyber-cyan/50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />
    </>
  )
}
