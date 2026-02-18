'use client'

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ConstellationBg } from '@/components/constellation-bg'


interface Phase {
  id: number
  number: string
  title: string
  status: string
  color: string
  features: string[]
  objectives: string[]
}

const phases: Phase[] = [
  {
    id: 1,
    number: '01',
    title: 'Foundation & Core Infrastructure',
    status: 'In Development',
    color: 'from-cyan-500 to-blue-500',
    features: [
      'Launch Core Interface',
      'Deploy Unified “Ask NEXUM” System',
      'Release Creator District (Hook Engine v1)',
      'Release Capital Lab (Monetization Builder v1)',
      'Tier System Activation (Citizen / Founder / Architect)',
      'Private Beta Access'
    ],
    objectives: [
      'Establish functional infrastructure and controlled early access',
      'Activate foundational creator systems',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Expansion',
    status: 'In Development',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Advanced Content Blueprint Builder',
      'Branding Lab Module',
      'Monetization Optimizer Upgrade',
      'XP & Rank System',
      'Arena Weekly Challenges',
      'Leaderboard Activation',
    ],
    objectives: [
      'Increase user engagement and deepen creator tools',
      'Strengthen platform retention loops',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Intelligent Automation',
    status: 'Scheduled',
    color: 'from-green-500 to-emerald-500',
    features: [
      'Personalized AI Recommendations',
      'Cross-District Intelligence Routing',
      'Market Pulse Engine',
      'Smart Behavior-Based Suggestions',
      'Tier-Based Feature Unlocks',
    ],

    objectives: [
      'Transition from tool-based platform to intelligent system',
      'Automate cross-district optimization',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Autonomous Intelligence Network',
    status: 'Planned',
    color: 'from-orange-500 to-red-500',
    features: [
      'Public Beta Launch',
      'Partner Integrations',
      'Advanced Capital Systems',
      'Governance Layer',
      'Revenue Model Expansion',
    ],

    objectives: [
      'Position NEXUM as scalable AI infrastructure platform',
      'Expand ecosystem integrations',
    ],
  },
]

export default function RoadmapPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Cinematic Background - 5 Layers */}
      {/* Constellation Background (dots + lines only) */}
      <ConstellationBg className="-z-40" />

      {/* (Optional) dark overlay for readability */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-b from-background/55 via-background/25 to-background/55" />


      {/* Content */}
      <div className="relative z-10 pt-20 pb-20 sm:pt-24 md:pt-32 lg:pt-32 xl:pt-32 w-screen overflow-hidden">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10">
          {/* Header */}
          <div className="mb-12 sm:mb-14 md:mb-16 text-center">
            <div className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Roadmap
              </span>
            </div>
            <h1 className="mb-3 sm:mb-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-6xl leading-tight sm:leading-tight">
              The Path Forward
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Watch as NEXUM evolves from foundational infrastructure to the autonomous operating system of the AI era
            </p>

            {/* Shimmer Divider */}
            <div className="relative mx-auto mb-8 h-0.5 w-24 sm:w-32 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent bg-[length:200%_100%] animate-shimmer" />

            {/* System Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
              <span className="text-xs font-medium tracking-widest text-cyan-400 uppercase text-center">
                NEXUM System: Build Sequence Online
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8 sm:space-y-10 md:space-y-12 overflow-hidden">
            {/* Timeline Line - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-orange-500/30" />

            {phases.map((phase, index) => (
              <div
                key={phase.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                style={{
                  transitionDelay: visibleCards.includes(index) ? `${index * 100}ms` : '0ms'
                }}
                className={`transition-all duration-500 sm:duration-700 will-change-transform ${visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0 blur-0'
                    : 'opacity-0 translate-y-12 blur-sm'
                  }`}
              >
                {/* Timeline Dot & Line - Desktop Layout */}
                <div className="hidden md:mb-6 md:flex md:items-start md:gap-6 xl:mb-6 xl:flex xl:items-start xl:gap-6">
                  {/* Timeline Node */}
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-background/80 backdrop-blur-sm">
                    <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${phase.color} shadow-lg animate-ripple`} />
                  </div>

                  {/* Phase Card - Desktop */}
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_0_60px_rgba(0,191,255,0.15)] hover:-translate-y-1 active:scale-98">
                    {/* Header */}
                    <div className="mb-4 flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          Phase {phase.number}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
                          {phase.title}
                        </h3>
                      </div>
                      <div className={`flex-shrink-0 rounded-full border border-white/20 bg-gradient-to-br ${phase.color} px-3 py-1 sm:px-4 sm:py-2`}>
                        <span className="text-xs font-semibold uppercase tracking-widest text-white whitespace-nowrap">
                          {phase.status}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {phase.features.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              transitionDelay: visibleCards.includes(index) ? `${200 + i * 75}ms` : '0ms'
                            }}
                            className={`flex items-start gap-3 transition-all duration-500 ${visibleCards.includes(index)
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-4'
                              }`}
                          >
                            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br ${phase.color}`} />
                            <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Objectives */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Objectives
                      </h4>
                      <ul className="space-y-2">
                        {phase.objectives.map((objective, i) => (
                          <li
                            key={i}
                            style={{
                              transitionDelay: visibleCards.includes(index) ? `${250 + phase.features.length * 75 + i * 75}ms` : '0ms'
                            }}
                            className={`flex items-start gap-2 transition-all duration-500 ${visibleCards.includes(index)
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-4'
                              }`}
                          >
                            <span className="mt-1 text-foreground/50">▪</span>
                            <span className="text-xs sm:text-sm text-foreground/80">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Layout - Single Column */}
                <div className="md:hidden">
                  {/* Timeline Dot */}
                  <div className="relative mb-4 flex items-start gap-4">
                    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-background/80 backdrop-blur-sm">
                      <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${phase.color} shadow-lg animate-ripple`} />
                    </div>

                    {/* Phase Card - Mobile/Tablet */}
                    <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/8">
                      {/* Header */}
                      <div className="mb-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              Phase {phase.number}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug">
                              {phase.title}
                            </h3>
                          </div>
                          <div className={`flex-shrink-0 rounded-full border border-white/20 bg-gradient-to-br ${phase.color} px-2 py-1`}>
                            <span className="text-xs font-semibold uppercase tracking-widest text-white whitespace-nowrap">
                              {phase.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Key Features
                        </h4>
                        <ul className="space-y-1.5">
                          {phase.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-gradient-to-br ${phase.color}`} />
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Objectives */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Objectives
                        </h4>
                        <ul className="space-y-1">
                          {phase.objectives.map((objective, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-0.5 text-foreground/50 text-xs">▪</span>
                              <span className="text-xs text-foreground/80">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line - Mobile/Tablet */}
                  {index < phases.length - 1 && (
                    <div className="ml-5 h-6 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>

                {/* Connector Line - Desktop */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block ml-6 h-12 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
