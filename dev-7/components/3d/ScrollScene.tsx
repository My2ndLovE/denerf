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
    // Create scroll trigger that tracks the entire document
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
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
