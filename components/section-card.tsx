"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionCardProps {
  id: string
  label: string
  title: string
  description: string
  features: string[]
  icon: ReactNode
  direction: "left" | "right"
  index: number
}

export function SectionCard({
  id,
  label,
  title,
  description,
  features,
  icon,
  direction,
  index,
}: SectionCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur-sm">
          {label}
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="group relative w-full max-w-md">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_40px_hsl(195_100%_50%/0.08)]">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
            <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold text-foreground">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {features.slice(0, 4).map((f) => (
                <div
                  key={f}
                  className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-center text-xs text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
                >
                  {f.split(" ").slice(0, 2).join(" ")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
