"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Lock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Core", href: "/core" },
  { label: "Creator", href: "/creator" },
  { label: "Capital", href: "/capital" },
  { label: "Arena", href: "/arena" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-primary/20" />
            <span className="relative font-display text-lg font-bold text-primary">N</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            NEXUM
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-3"
        >
          {/* Roadmap button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/roadmap"
              className="button-secondary group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all overflow-hidden"
            >
              {/* Spark particles */}
              <div className="absolute inset-0 rounded-full pointer-events-none">
                <div className="spark-particle animate-spark-travel absolute" style={{ top: '25%', left: '0%', animationDelay: '0s' }} />
                <div className="spark-particle animate-spark-travel absolute" style={{ top: '50%', left: '0%', animationDelay: '1.3s' }} />
                <div className="spark-particle animate-spark-travel absolute" style={{ top: '75%', left: '0%', animationDelay: '2.6s' }} />
              </div>

              {/* Breathing glow background */}
              <div className="absolute inset-0 rounded-full animate-breathing-glow pointer-events-none" style={{ opacity: 0.7 }} />

              {/* Shine sweep effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shine-sweep 6s ease-in-out infinite',
                }}
              />

              <span className="relative z-10 font-semibold tracking-wide">Roadmap</span>
            </Link>
          </motion.div>

          {/* Locked Join Wave 01 button */}
          <div className="group relative">
            <button
              disabled
              className="button-locked relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all overflow-hidden cursor-not-allowed"
            >
              {/* Subtle locked breathing glow */}
              <div className="absolute inset-0 rounded-full animate-locked-breathing pointer-events-none" />

              {/* Lock scan effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-y-0 w-[60%] animate-lock-scan"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.15), rgba(255, 255, 255, 0.08), rgba(0, 191, 255, 0.15), transparent)',
                  }}
                />
              </div>

              {/* Shimmer on hover only */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shine-sweep 3s ease-in-out infinite',
                }}
              />

              <span className="relative z-10 font-semibold tracking-wide">Join Wave 01</span>
              <Lock className="relative z-10 w-3.5 h-3.5 animate-lock-glow-pulse" />
            </button>

            {/* Tooltip on hover */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(1, 50, 67, 0.9) 0%, rgba(0, 80, 100, 0.8) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 191, 255, 0.3)',
                color: 'hsl(195, 80%, 80%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 191, 255, 0.1)',
              }}
            >
              Wave 01 opens soon
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                style={{
                  background: 'rgba(1, 50, 67, 0.9)',
                  borderLeft: '1px solid rgba(0, 191, 255, 0.3)',
                  borderTop: '1px solid rgba(0, 191, 255, 0.3)',
                }}
              />
            </div>
          </div>
        </motion.div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link
                  href="/roadmap"
                  onClick={() => setMobileOpen(false)}
                  className="button-secondary relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-full animate-breathing-glow pointer-events-none" style={{ opacity: 0.5 }} />
                  <span className="relative z-10 font-semibold">Roadmap</span>
                </Link>
                <button
                  disabled
                  className="button-locked relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all overflow-hidden cursor-not-allowed"
                >
                  <div className="absolute inset-0 rounded-full animate-locked-breathing pointer-events-none" />
                  <span className="relative z-10 font-semibold">Join Wave 01</span>
                  <Lock className="relative z-10 w-3.5 h-3.5 animate-lock-glow-pulse" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
