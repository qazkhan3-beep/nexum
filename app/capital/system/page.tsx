'use client'

import { motion, useInView } from 'framer-motion'
import { TrendingUp, ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NeuralCanvasBg } from '@/components/neural-canvas-bg'


const accentColor = '#22c55e' // green


export default function CapitalSystemPage() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="relative min-h-screen">
        <NeuralCanvasBg accentColor={accentColor} />

        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 animate-grid-fade"
            style={{
              backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px),
                linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[180px]"
            style={{ background: `${accentColor}06` }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 pb-20 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/capital"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Capital Lab
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${accentColor}15` }}
            >
              <TrendingUp style={{ color: accentColor }} className="h-6 w-6" />
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
              Capital Lab System
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Monetization & capital intelligence layer.

            </p>
            {/* Animated Divider */}
            <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />

            <div className="relative mx-auto mt-2 h-[8px] w-40 overflow-hidden rounded-full">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </div>

          </motion.div>

          {/* Panels */}
          <div className="space-y-6">
            {/* System Overview Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                System Overview
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Capital Lab transforms your creative output into sustainable revenue streams. Through Business Model Generator, you architect your financial strategy. Monetization Optimizer refines your pricing and funnel. Offer Builder packages your services. Market Pulse keeps you ahead of emerging opportunities.
              </p>

            </motion.div>

            {/* Access Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Access Status
              </h2>
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                  style={{ background: `${accentColor}15`, color: accentColor }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ background: accentColor }} />
                </div>
                <div>
                  <p className="font-semibold text-foreground uppercase tracking-widest text-xs" style={{ color: accentColor }}>
                    LAYER 01: CAPITAL ENGINE INITIALIZING
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The Capital layer is being deployed in structured stages to build scalable monetization intelligence.
                    Layer 01 activates foundational revenue architecture and optimization systems.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center pt-6"
            >
              <button
                disabled
                className="button-locked relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all overflow-hidden cursor-not-allowed"
              >
                <div className="absolute inset-0 rounded-full animate-locked-breathing pointer-events-none" />
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-y-0 w-[60%] animate-lock-scan"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.15), rgba(255, 255, 255, 0.08), rgba(0, 191, 255, 0.15), transparent)',
                    }}
                  />
                </div>
                <span className="relative z-10">Founding Access Opens Shortly</span>
                <Lock className="relative z-10 w-3.5 h-3.5 animate-lock-glow-pulse" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
