'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
}


export function ConstellationBg({
  className = '',
  nodeCount = 110,
  maxDist = 190,
}: {
  className?: string
  nodeCount?: number
  maxDist?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodesRef = useRef<Node[]>([])
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()
    window.addEventListener('resize', setSize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // init nodes
    const nodes: Node[] = []

    const colors = [
      '#06b6d4', // cyan
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#f59e0b', // orange
    ]


    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      })

    }
    nodesRef.current = nodes

    const tick = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const { x: mx, y: my } = mouseRef.current

      // clear (transparent, so your page background shows through)
      ctx.clearRect(0, 0, w, h)

      // update
      for (const n of nodes) {
        // gentle mouse influence (subtle “satellite drift” feel)
        const dx = mx - n.x
        const dy = my - n.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 240) {
          n.vx += (dx / (d + 1)) * 0.006
          n.vy += (dy / (d + 1)) * 0.006
        }

        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.985
        n.vy *= 0.985

        // wrap
        if (n.x < -30) n.x = w + 30
        if (n.x > w + 30) n.x = -30
        if (n.y < -30) n.y = h + 30
        if (n.y > h + 30) n.y = -30
      }

      // lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const t = 1 - dist / maxDist
            const opacity = t * 0.14
            ctx.strokeStyle = `${a.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, '0')}`

            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const n of nodes) {
        // small glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7)
        g.addColorStop(0, `${n.color}33`)
        g.addColorStop(1, `${n.color}00`)

        ctx.fillStyle = g
        ctx.fillRect(n.x - n.r * 7, n.y - n.r * 7, n.r * 14, n.r * 14)

        // core dot
        ctx.fillStyle = n.color

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [nodeCount, maxDist])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
