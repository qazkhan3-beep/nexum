'use client'

import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />

      {/* Animated aurora glow - top left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-aurora-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, rgba(0, 150, 180, 0.1) 70%, transparent 100%)',
        }}
      />

      {/* Animated aurora glow - top right */}
      <div
        className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-3xl animate-aurora-glow"
        style={{
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.25) 0%, rgba(0, 100, 150, 0.05) 70%, transparent 100%)',
          animationDelay: '2s',
        }}
      />

      {/* Animated aurora glow - bottom left */}
      <div
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full blur-3xl animate-aurora-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 255, 0.25) 0%, rgba(0, 100, 180, 0.1) 70%, transparent 100%)',
          animationDelay: '4s',
        }}
      />

      {/* Animated aurora glow - bottom right */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl animate-aurora-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 150, 200, 0.2) 0%, rgba(0, 100, 150, 0.05) 70%, transparent 100%)',
          animationDelay: '3s',
        }}
      />

      {/* Morphing blob shapes */}
      <div
        className="absolute top-1/4 left-1/3 w-72 h-72 opacity-20 animate-morph-blob"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.4) 0%, rgba(100, 200, 255, 0.2) 100%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-15 animate-morph-blob"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 180, 220, 0.3) 0%, rgba(0, 100, 150, 0.1) 100%)',
          filter: 'blur(50px)',
          animationDelay: '2s',
        }}
      />

      {/* Floating elements with subtle animation */}
      <div
        className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-10 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div
        className="absolute top-1/3 right-20 w-56 h-56 rounded-full opacity-10 animate-float-medium"
        style={{
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full opacity-10 animate-float-fast"
        style={{
          background: 'radial-gradient(circle, rgba(0, 180, 220, 0.25) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Grid pattern overlay - subtle */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 229, 255, 0.05) 25%, rgba(0, 229, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 229, 255, 0.05) 75%, rgba(0, 229, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 229, 255, 0.05) 25%, rgba(0, 229, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 229, 255, 0.05) 75%, rgba(0, 229, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Subtle animated border glow - top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 animate-pulse-glow"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent)',
        }}
      />

      {/* Subtle animated border glow - bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20 animate-pulse-glow"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent)',
          animationDelay: '1.5s',
        }}
      />

      {/* Diagonal animated lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 48%, rgba(0, 229, 255, 0.1) 49%, rgba(0, 229, 255, 0.1) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(0, 229, 255, 0.1) 49%, rgba(0, 229, 255, 0.1) 51%, transparent 52%)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}
