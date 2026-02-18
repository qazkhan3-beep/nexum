"use client"

import { motion, useInView } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, type ReactNode } from "react"
import { NeuralCanvasBg } from "./neural-canvas-bg"

interface Feature {
  title: string
  description: string
  icon: ReactNode
}

interface SectionStatus {
  badge: string
  message?: string
}

interface SectionPageProps {
  title: string
  subtitle: string
  features: Feature[]
  icon: ReactNode
  accentColor: string
  status: SectionStatus
  ctaButton: {
    label: string
    href: string
  }
  prevSection?: { label: string; href: string }
  nextSection?: { label: string; href: string }
}

function FeatureCard({
  feature,
  index,
  accentColor,
}: {
  feature: Feature
  index: number
  accentColor: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_hsl(195_100%_50%/0.08)] hover:translate-y-[-4px]"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: accentColor }}
      />

      <div className="relative p-6">
        {/* Icon circle */}
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg transition-shadow duration-300"
          style={{
            background: `${accentColor}15`,
            boxShadow: `0 0 20px ${accentColor}20`,
          }}
        >
          <span style={{ color: accentColor }}>{feature.icon}</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-display text-base font-bold text-foreground">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export function SectionPage({
  title,
  subtitle,
  features,
  icon,
  accentColor,
  status,
  ctaButton,
  prevSection,
  nextSection,
}: SectionPageProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="relative min-h-screen">
      <NeuralCanvasBg accentColor={accentColor} />
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-grid-fade"
          style={{
            backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px),
              linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[180px]"
          style={{ background: `${accentColor}06` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: `${accentColor}15` }}
          >
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">{title}</span>
          </h1>
          
          {/* Status badge */}
          <div className="mx-auto mt-5 mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
          >
            <div className="h-2 w-2 rounded-full" style={{ background: accentColor }} />
            <span style={{ color: accentColor }}>{status.badge}</span>
          </div>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {status.message}
          </p>
          
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            {subtitle}
          </p>
          <div
            className="mx-auto mt-5 h-0.5 w-12 rounded-full"
            style={{ background: accentColor }}
          />

          {/* Section CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href={ctaButton.href}
              className="group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accentColor}dd 0%, ${accentColor}aa 100%)`,
                color: "#050505",
                boxShadow: `0 0 30px ${accentColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 50px ${accentColor}60, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {/* Shine sweep effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shine-sweep 3s ease-in-out infinite',
                }}
              />
              <span className="relative z-10">{ctaButton.label}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              accentColor={accentColor}
            />
          ))}
        </div>

{/*         CTA Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-2xl border border-border/50 bg-card/40 p-8 text-center backdrop-blur-sm"
        >
          <h3 className="font-display text-xl font-bold text-foreground">
            Ready to get started?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Join our waitlist to unlock full access to this section and shape the future of the creator economy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300"
            style={{
              background: accentColor,
              color: "#050505",
              boxShadow: `0 0 24px ${accentColor}30`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}50`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px ${accentColor}30`
            }}
          >
            Join Waitlist
          </motion.button>
        </motion.div> */}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 flex items-center justify-between border-t border-border pt-8"
        >
          {prevSection ? (
            <Link
              href={prevSection.href}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {prevSection.label}
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Home
            </Link>
          )}
          {nextSection ? (
            <Link
              href={nextSection.href}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {nextSection.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  )
}
