"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  phaseT: number
  isAccent: boolean
  colorIndex: number // 0-3 for the 4 phase colors
}

interface Blob {
  x: number
  y: number
  scale: number
  color: string
  pulsePhase: number
  pulseSpeed: number
}

const PHASE_COLORS = ["#00E5FF", "#D946EF", "#10B981", "#F59E0B"]

export function NeuralCanvasRoadmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let blobs: Blob[] = []

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect()
      particles = []
      for (let i = 0; i < 32; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          z: Math.random() * 100 + 50,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() < 0.15 ? 2.5 : Math.random() * 1.2 + 0.8,
          opacity: Math.random() * 0.3 + 0.15,
          phaseT: Math.random() * Math.PI * 2,
          isAccent: Math.random() < 0.15,
          colorIndex: Math.floor(Math.random() * 4),
        })
      }
    }

    const initBlobs = () => {
      const rect = canvas.getBoundingClientRect()
      blobs = [
        {
          x: rect.width * 0.2,
          y: rect.height * 0.15,
          scale: 1,
          color: PHASE_COLORS[0],
          pulsePhase: 0,
          pulseSpeed: 0.0008,
        },
        {
          x: rect.width * 0.8,
          y: rect.height * 0.3,
          scale: 1,
          color: PHASE_COLORS[1],
          pulsePhase: Math.PI * 0.5,
          pulseSpeed: 0.0009,
        },
        {
          x: rect.width * 0.25,
          y: rect.height * 0.7,
          scale: 1,
          color: PHASE_COLORS[2],
          pulsePhase: Math.PI,
          pulseSpeed: 0.00085,
        },
        {
          x: rect.width * 0.75,
          y: rect.height * 0.9,
          scale: 1,
          color: PHASE_COLORS[3],
          pulsePhase: Math.PI * 1.5,
          pulseSpeed: 0.00095,
        },
      ]
    }

    const drawGlowSpot = (x: number, y: number, size: number, color: string, opacity: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, "0")}`)
      gradient.addColorStop(0.5, `${color}08`)
      gradient.addColorStop(1, `${color}00`)
      ctx.fillStyle = gradient
      ctx.fillRect(x - size, y - size, size * 2, size * 2)
    }

    const drawVignette = () => {
      const rect = canvas.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const maxRadius = Math.max(rect.width, rect.height) * 0.8

      const gradient = ctx.createRadialGradient(cx, cy, maxRadius * 0.3, cx, cy, maxRadius)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.4)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)
    }

    const drawScanlines = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
      for (let i = 0; i < rect.height; i += 4) {
        ctx.fillRect(0, i, rect.width, 1)
      }
    }

    const drawGrainTexture = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        ctx.fillRect(x, y, 1, 1)
      }
    }

    let time = 0

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      time += 0.016

      // Draw blobs with pulsing animation
      blobs.forEach((blob) => {
        blob.pulsePhase += blob.pulseSpeed
        blob.scale = 1 + Math.sin(blob.pulsePhase) * 0.075 // 1.0 → 1.075 → 1.0
        const size = 600 * blob.scale
        drawGlowSpot(blob.x, blob.y, size, blob.color, 0.055)
      })

      // Update and draw particles
      particles.forEach((p) => {
        p.phaseT += 0.003
        p.x += p.vx + Math.sin(p.phaseT) * 0.08
        p.y += p.vy + Math.cos(p.phaseT * 0.7) * 0.08

        if (p.x < -50) p.x = rect.width + 50
        if (p.x > rect.width + 50) p.x = -50
        if (p.y < -50) p.y = rect.height + 50
        if (p.y > rect.height + 50) p.y = -50

        const zFactor = p.z / 150
        const displaySize = p.size * zFactor

        // Draw particle
        const color = PHASE_COLORS[p.colorIndex]
        ctx.fillStyle = `${color}${Math.floor((p.opacity * 0.5) * 255).toString(16).padStart(2, "0")}`
        ctx.beginPath()
        if (p.isAccent) {
          // Accent particles as diamonds
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(Math.PI / 4)
          ctx.fillRect(-displaySize / 2, -displaySize / 2, displaySize, displaySize)
          ctx.restore()
        } else {
          // Regular particles as dots
          ctx.arc(p.x, p.y, displaySize, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw connection lines
      ctx.strokeStyle = "rgba(100, 150, 200, 0.05)"
      ctx.lineWidth = 0.4
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.08
            ctx.strokeStyle = `rgba(100, 150, 200, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      drawVignette()
      drawScanlines()
      drawGrainTexture()

      animationId = requestAnimationFrame(animate)
    }

    setupCanvas()
    initParticles()
    initBlobs()
    animate()

    const handleResize = () => {
      setupCanvas()
      initParticles()
      initBlobs()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  )
}
