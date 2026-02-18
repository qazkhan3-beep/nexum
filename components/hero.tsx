"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Lock } from "lucide-react"

import Link from "next/link"
import { NeuralCanvasBg } from "./neural-canvas-bg"

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage: `linear-gradient(hsl(195 100% 50% / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsl(195 100% 50% / 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[100px]" />
    </div>
  )
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] h-20 w-20 rounded-xl border border-primary/10 bg-primary/5"
      />
      <motion.div
        animate={{ y: [10, -15, 10], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] top-[30%] h-14 w-14 rounded-full border border-primary/10 bg-primary/5"
      />
      <motion.div
        animate={{ y: [-5, 15, -5], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[20%] h-10 w-10 rotate-45 border border-primary/10 bg-primary/5"
      />
      <motion.div
        animate={{ y: [8, -12, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] right-[25%] h-16 w-16 rounded-xl border border-primary/10 bg-primary/5"
      />
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <NeuralCanvasBg accentColor="#00E5FF" />
      <GridBackground />
      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          Now in Private Beta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-balance">
            INTELLIGENCE{" "}
            <br className="hidden sm:block" />
            INFRASTRUCTURE{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(180_100%_60%)] bg-clip-text text-transparent">
              FOR CREATORS
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          The foundational AI platform that empowers creators to build, scale,
          and monetize at the speed of imagination. Your secret weapon in the
          new creator economy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/core"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(195_100%_50%/0.4)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <div
            className="inline-flex items-center justify-center gap-2
           h-[52px] px-8
           rounded-xl
           text-sm font-semibold
           border border-white/10
           bg-transparent
           text-white/45
           backdrop-blur-sm
           cursor-not-allowed"

          >
            <span>Join Wave 01</span>
            <Lock className="h-4 w-4 opacity-70" />
          </div>


          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/roadmap"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-8 py-3.5 text-sm font-semibold text-primary backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(195_100%_50%/0.3)]"
            >
              View Roadmap
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex items-center justify-center gap-8 text-muted-foreground sm:gap-12"
        >
          {["AI-Powered", "Real-Time", "Scalable", "Secure"].map((label) => (
            <div key={label} className="flex items-center gap-2 text-xs uppercase tracking-widest sm:text-sm">
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-6 w-4 rounded-full border border-muted-foreground/30">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mt-1 h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
