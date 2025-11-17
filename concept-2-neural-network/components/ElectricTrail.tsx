'use client'

import { useEffect, useRef } from 'react'

export default function ElectricTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const trails: Array<{ x: number; y: number; life: number }> = []

    const handleMouseMove = (e: MouseEvent) => {
      trails.push({ x: e.clientX, y: e.clientY, life: 30 })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i]
        const opacity = trail.life / 30
        const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, 20)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(176, 36, 255, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, 10, 0, Math.PI * 2)
        ctx.fill()

        trail.life--
        if (trail.life <= 0) {
          trails.splice(i, 1)
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
