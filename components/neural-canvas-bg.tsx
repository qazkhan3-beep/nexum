'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  type: 'dot' | 'accent'
  color: string
  noiseOffsetX: number
  noiseOffsetY: number
  phase: number
}

interface NeuralCanvasBgProps {
  accentColor: string
}

// Simple Perlin-like noise for smooth organic motion
class NoiseGenerator {
  private permutation: number[]
  private p: number[]

  constructor() {
    this.permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
      247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
      57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68,
      175, 74, 165, 71, 134, 139, 48, 27, 166, 102, 143, 97, 109, 172, 56,
    ]
    this.p = [...this.permutation, ...this.permutation]
  }

  noise(x: number, y: number): number {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)

    const u = this.smoothstep(xf)
    const v = this.smoothstep(yf)

    const n00 = this.grad(this.p[this.p[xi] + yi], xf, yf)
    const n10 = this.grad(this.p[this.p[xi + 1] + yi], xf - 1, yf)
    const n01 = this.grad(this.p[this.p[xi] + yi + 1], xf, yf - 1)
    const n11 = this.grad(this.p[this.p[xi + 1] + yi + 1], xf - 1, yf - 1)

    const nx0 = this.lerp(u, n00, n10)
    const nx1 = this.lerp(u, n01, n11)
    return this.lerp(v, nx0, nx1)
  }

  private smoothstep(t: number): number {
    return t * t * (3 - 2 * t)
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a)
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3
    const u = h < 2 ? x : y
    const v = h < 2 ? y : x
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }
}

export function NeuralCanvasBg({ accentColor }: NeuralCanvasBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const glowSpotsRef = useRef<any[]>([])
  const noiseRef = useRef<NoiseGenerator>(new NoiseGenerator())
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Track scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    // Initialize particles - 40% of original (80 → 32)
    const particleCount = 32
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const isAccent = Math.random() < 0.25 // 25% accent nodes
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100 - 50,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: 0,
        radius: isAccent ? 1.5 : 1,
        type: isAccent ? 'accent' : 'dot',
        color: isAccent ? accentColor : 'rgba(255, 255, 255, 0.4)',
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        phase: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles

    // Initialize glow spots - 4-6 large radial glows
    const spotCount = 5
    const glowSpots = []
    for (let i = 0; i < spotCount; i++) {
      glowSpots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 800 + Math.random() * 400, // 800-1200px
        opacity: 0.04 + Math.random() * 0.03, // 0.04-0.07
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
      })
    }
    glowSpotsRef.current = glowSpots

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016 // ~60fps
      const time = timeRef.current * 0.6 // 40% slower

      // Clear with minimal fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw glow spots
      glowSpots.forEach((spot) => {
        // Slow drift
        spot.x += spot.vx
        spot.y += spot.vy
        spot.phase += 0.0002

        // Wrap around
        if (spot.x < -spot.radius) spot.x = canvas.width + spot.radius
        if (spot.x > canvas.width + spot.radius) spot.x = -spot.radius
        if (spot.y < -spot.radius) spot.y = canvas.height + spot.radius
        if (spot.y > canvas.height + spot.radius) spot.y = -spot.radius

        // Draw radial gradient glow
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)
        gradient.addColorStop(0, `${accentColor}${Math.round(spot.opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.3, `${accentColor}${Math.round(spot.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${accentColor}00`)

        ctx.fillStyle = gradient
        ctx.fillRect(spot.x - spot.radius, spot.y - spot.radius, spot.radius * 2, spot.radius * 2)
      })

      // Update particles with slow sine-wave drift
      particles.forEach((p) => {
        // Sine-wave path for organic drift
        const noiseX = noiseRef.current.noise(time * 0.3 + p.noiseOffsetX, p.y * 0.0005)
        const noiseY = noiseRef.current.noise(time * 0.3 + p.noiseOffsetY, p.x * 0.0005)

        // Apply slow sine waves
        p.vx = Math.sin(time * 0.002 + p.phase) * 0.15 + noiseX * 0.05
        p.vy = Math.cos(time * 0.002 + p.phase + 1) * 0.15 + noiseY * 0.05

        // Mouse parallax - gentle 0.015 factor
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 250) {
          const angle = Math.atan2(dy, dx)
          const force = (1 - dist / 250) * 0.015
          p.vx += Math.cos(angle) * force
          p.vy += Math.sin(angle) * force
        }

        p.x += p.vx
        p.y += p.vy
        p.z += (scrollRef.current * 0.05 - p.z) * 0.01

        // Wrap around
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
      })

      // Draw neural network lines - very faint
      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.08 // Max 0.08
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      // Draw particles - small and minimal
      particles.forEach((p) => {
        ctx.fillStyle = p.color

        if (p.type === 'dot') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Accent nodes - slightly larger
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Subtle glow for accent nodes
          const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
          glowGradient.addColorStop(0, `${accentColor}20`)
          glowGradient.addColorStop(1, `${accentColor}00`)
          ctx.fillStyle = glowGradient
          ctx.fillRect(p.x - p.radius * 4, p.y - p.radius * 4, p.radius * 8, p.radius * 8)
        }
      })

      // Scanline overlay - minimal
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)'
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Strong center vignette - transparent center to dark edges
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 1.5
      )
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle grain texture - 3% opacity
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * 1.5 // ~3% opacity
        data[i] += grain
        data[i + 1] += grain
        data[i + 2] += grain
      }
      ctx.putImageData(imageData, 0, 0)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [accentColor])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 top-0 left-0"
      style={{ zIndex: 0 }}
    />
  )
}

