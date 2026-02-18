"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const socialLinks = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-primary/20" />
              <span className="relative font-display text-lg font-bold text-primary">N</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              NEXUM
            </span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Intelligence infrastructure for the next generation of creators.
            Build, scale, and monetize with AI.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/30 text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:shadow-[0_0_15px_hsl(195_100%_50%/0.1)]"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 NEXUM. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
