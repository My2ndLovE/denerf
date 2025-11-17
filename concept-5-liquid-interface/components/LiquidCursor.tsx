'use client'

import { useEffect, useRef } from 'react'

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ripples: Array<{ x: number; y: number; radius: number; opacity: number }> = []

    const handleMouseMove = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, radius: 0, opacity: 1 })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]

        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(199, 125, 255, ${ripple.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        ripple.radius += 2
        ripple.opacity -= 0.02

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  )
}
