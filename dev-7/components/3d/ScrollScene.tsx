'use client'

import { useEffect, useState } from 'react'
import Scene from './Scene'
import AnimatedObject from './AnimatedObject'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollScene() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Create scroll trigger that tracks from the very top
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        // Calculate progress accounting for Hero section
        const heroHeight = window.innerHeight // 100vh
        const currentScroll = window.scrollY

        // If in entire Hero section (100%), show sphere (scrollProgress = 0)
        if (currentScroll < heroHeight) {
          setScrollProgress(0)
        } else {
          // After Hero, map the remaining scroll to 0-1 range
          const totalScrollableHeight = document.body.scrollHeight - window.innerHeight
          const scrollAfterHero = currentScroll - heroHeight
          const maxScrollAfterHero = totalScrollableHeight - heroHeight

          // Calculate progress from 0 to 1 for content after hero
          const progress = Math.max(0, Math.min(1, scrollAfterHero / maxScrollAfterHero))
          setScrollProgress(progress)
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
      <Scene>
        <AnimatedObject scrollProgress={scrollProgress} />
      </Scene>
    </div>
  )
}
