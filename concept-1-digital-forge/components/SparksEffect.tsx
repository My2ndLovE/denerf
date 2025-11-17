'use client'

import { useEffect, useRef } from 'react'

export default function SparksEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const sparks: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
    }> = []

    const createSpark = (x: number, y: number) => {
      for (let i = 0; i < 5; i++) {
        sparks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          life: 1,
          maxLife: Math.random() * 60 + 40,
          size: Math.random() * 3 + 1,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.95) {
        createSpark(e.clientX, e.clientY)
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i]

        spark.x += spark.vx
        spark.y += spark.vy
        spark.vy += 0.1 // gravity
        spark.life++

        const opacity = 1 - spark.life / spark.maxLife
        const gradient = ctx.createRadialGradient(spark.x, spark.y, 0, spark.x, spark.y, spark.size)
        gradient.addColorStop(0, `rgba(255, 215, 0, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(255, 107, 53, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()

        if (spark.life >= spark.maxLife) {
          sparks.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
