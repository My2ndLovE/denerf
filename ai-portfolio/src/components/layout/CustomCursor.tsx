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

    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('resize', checkMobile)
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
