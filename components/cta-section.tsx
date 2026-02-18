"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Lock } from "lucide-react"


export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">
              Ready to Build the{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(180_100%_60%)] bg-clip-text text-transparent">
                Future
              </span>
              ?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Join the waitlist and be among the first creators to access the most
            powerful intelligence infrastructure ever built.
          </p>
          <div
            className="mt-9 group inline-flex items-center justify-center gap-2 rounded-lg
             px-10 py-4 text-sm font-semibold
             cursor-not-allowed select-none
             border border-white/10
             bg-primary/70 text-primary-foreground/85
             shadow-[0_0_30px_hsl(195_100%_50%/0.18)]
             backdrop-blur-sm
             transition-all duration-300 hover:shadow-[0_0_40px_hsl(195_100%_50%/0.22)]"
          >
            <span>JOIN WAVE 01</span>
            <Lock className="h-4 w-4 opacity-80" />
          </div>


        </motion.div>
      </div>
    </section>
  )
}
