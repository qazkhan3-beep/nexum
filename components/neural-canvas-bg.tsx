'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
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

class NoiseGenerator {
  private permutation: number[]
  private p: number[]

  constructor() {
    this.permutation = [
      151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,
      140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,
      247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,
      57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,
      175,74,165,71,134,139,48,27,166,102,143,97,109,172,56,
    ]
    this.p = [...this.permutation, ...this.permutation]
  }

  noise(x: number, y: number): number {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)

    const u = xf * xf * (3 - 2 * xf)
    const v = yf * yf * (3 - 2 * yf)

    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 3
      const u = h < 2 ? x : y
      const v = h < 2 ? y : x
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
    }

    const lerp = (t: number, a: number, b: number) => a + t * (b - a)

    const n00 = grad(this.p[this.p[xi] + yi], xf, yf)
    const n10 = grad(this.p[this.p[xi + 1] + yi], xf - 1, yf)
    const n01 = grad(this.p[this.p[xi] + yi + 1], xf, yf - 1)
    const n11 = grad(this.p[this.p[xi + 1] + yi + 1], xf - 1, yf - 1)

    const nx0 = lerp(u, n00, n10)
    const nx1 = lerp(u, n01, n11)

    return lerp(v, nx0, nx1)
  }
}

export function NeuralCanvasBg({ accentColor }: NeuralCanvasBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const glowSpotsRef = useRef<any[]>([])
  const noiseRef = useRef(new NoiseGenerator())
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseRef.current = { x: e.clientX, y: e.clientY }
      },
      { passive: true }
    )

    // Particles
    const particles: Particle[] = []
    for (let i = 0; i < 32; i++) {
      const isAccent = Math.random() < 0.25
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        radius: isAccent ? 1.5 : 1,
        type: isAccent ? 'accent' : 'dot',
        color: isAccent ? accentColor : 'rgba(255,255,255,0.4)',
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        phase: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles

    // Glow spots
    const glowSpots = []
    for (let i = 0; i < 5; i++) {
      glowSpots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 800 + Math.random() * 400,
        opacity: 0.04 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
      })
    }
    glowSpotsRef.current = glowSpots

    const animate = () => {
      timeRef.current += 0.016
      const time = timeRef.current * 0.6

      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Glow spots
      glowSpots.forEach((spot) => {
        spot.x += spot.vx
        spot.y += spot.vy

        const gradient = ctx.createRadialGradient(
          spot.x,
          spot.y,
          0,
          spot.x,
          spot.y,
          spot.radius
        )
        gradient.addColorStop(0, `${accentColor}22`)
        gradient.addColorStop(0.3, `${accentColor}12`)
        gradient.addColorStop(1, `${accentColor}00`)

        ctx.fillStyle = gradient
        ctx.fillRect(
          spot.x - spot.radius,
          spot.y - spot.radius,
          spot.radius * 2,
          spot.radius * 2
        )
      })

      // Particles
      particles.forEach((p) => {
        const noiseX = noiseRef.current.noise(time * 0.3 + p.noiseOffsetX, p.y * 0.0005)
        const noiseY = noiseRef.current.noise(time * 0.3 + p.noiseOffsetY, p.x * 0.0005)

        p.vx = Math.sin(time * 0.002 + p.phase) * 0.15 + noiseX * 0.05
        p.vy = Math.cos(time * 0.002 + p.phase + 1) * 0.15 + noiseY * 0.05

        p.x += p.vx
        p.y += p.vy

        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Lighter scanlines (reduced density)
      ctx.strokeStyle = 'rgba(255,255,255,0.01)'
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 6) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [accentColor])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
