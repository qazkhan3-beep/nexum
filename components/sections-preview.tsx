"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Network, Sparkles, TrendingUp, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    id: "core",
    label: "Core",
    title: "The Foundation of Intelligence",
    description:
      "A robust, modular infrastructure layer that connects AI models, data pipelines, and deployment systems into one seamless platform.",
    icon: <Network className="h-6 w-6" />,
    href: "/core",
  },
  {
    id: "creator",
    label: "Creator",
    title: "Tools That Amplify Vision",
    description:
      "An intuitive suite of AI-powered creative tools that adapts to your workflow. From concept to creation, every tool removes friction.",
    icon: <Sparkles className="h-6 w-6" />,
    href: "/creator",
  },
  {
    id: "capital",
    label: "Capital",
    title: "Fuel Your Growth",
    description:
      "Access funding, resources, and revenue streams purpose-built for the AI-native creator economy.",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/capital",
  },
  {
    id: "arena",
    label: "Arena",
    title: "Where Creators Compete",
    description:
      "A vibrant marketplace and competitive arena where creators showcase work and push the boundaries of what's possible.",
    icon: <Trophy className="h-6 w-6" />,
    href: "/arena",
  },
]

function PreviewCard({
  section,
  index,
}: {
  section: (typeof sections)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Link
        href={section.href}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_hsl(195_100%_50%/0.08)] hover:translate-y-[-4px]"
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {section.icon}
        </div>

        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
          {section.label}
        </div>

        <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
          {section.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {section.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}

export function SectionsPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">
              Four Pillars of the{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(180_100%_60%)] bg-clip-text text-transparent">
                Creator Economy
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Everything you need to build, create, fund, and compete in the new AI-powered landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <PreviewCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
