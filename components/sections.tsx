"use client"

import { Network, Sparkles, TrendingUp, Trophy } from "lucide-react"
import { SectionCard } from "@/components/section-card"

const sections = [
  {
    id: "core",
    label: "Core",
    title: "The Foundation of Intelligence",
    description:
      "A robust, modular infrastructure layer that connects AI models, data pipelines, and deployment systems into one seamless platform. Built for scale, designed for creators.",
    features: [
      "Distributed neural processing engine",
      "Real-time data synchronization",
      "Auto-scaling compute clusters",
      "Enterprise-grade security & compliance",
    ],
    icon: <Network className="h-7 w-7" />,
    direction: "left" as const,
  },
  {
    id: "creator",
    label: "Creator",
    title: "Tools That Amplify Vision",
    description:
      "An intuitive suite of AI-powered creative tools that adapts to your workflow. From concept to creation, every tool is designed to remove friction and accelerate output.",
    features: [
      "AI-assisted content generation",
      "Intelligent workflow automation",
      "Multi-modal creative studio",
      "Personalized model fine-tuning",
    ],
    icon: <Sparkles className="h-7 w-7" />,
    direction: "right" as const,
  },
  {
    id: "capital",
    label: "Capital",
    title: "Fuel Your Growth",
    description:
      "Access funding, resources, and revenue streams purpose-built for the AI-native creator economy. Turn your creative output into sustainable, scalable income.",
    features: [
      "Creator revenue share program",
      "Micro-investment marketplace",
      "Automated royalty distribution",
      "Growth analytics dashboard",
    ],
    icon: <TrendingUp className="h-7 w-7" />,
    direction: "left" as const,
  },
  {
    id: "arena",
    label: "Arena",
    title: "Where Creators Compete",
    description:
      "A vibrant marketplace and competitive arena where creators showcase work, collaborate on projects, and push the boundaries of what's possible with AI.",
    features: [
      "Creator leaderboards & ranking",
      "Collaborative project spaces",
      "Live showcase events",
      "Community governance & voting",
    ],
    icon: <Trophy className="h-7 w-7" />,
    direction: "right" as const,
  },
]

export function Sections() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-32">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              index={index}
              {...section}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
