'use client';

import { useEffect, useRef, useState } from 'react';

interface Phase {
  id: number;
  title: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  features: string[];
  objective: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'Phase I: Foundation',
    status: 'completed',
    features: ['Core AI Infrastructure', 'Creator Tools', 'Beta Platform Launch'],
    objective: 'Establish the foundational AI operating system for creators',
    color: 'cyan',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-[0_0_30px_hsl(188_100%_50%/0.3)]',
  },
  {
    id: 2,
    title: 'Phase II: Expansion',
    status: 'in-progress',
    features: ['Advanced Analytics', 'Monetization Features', 'Community Tools'],
    objective: 'Expand creator capabilities and revenue opportunities',
    color: 'purple',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-[0_0_30px_hsl(280_100%_50%/0.3)]',
  },
  {
    id: 3,
    title: 'Phase III: Scale',
    status: 'upcoming',
    features: ['Global Distribution', 'Enterprise Solutions', 'API Ecosystem'],
    objective: 'Scale operations globally with enterprise-grade solutions',
    color: 'green',
    borderColor: 'border-green-500/30',
    glowColor: 'shadow-[0_0_30px_hsl(160_100%_50%/0.3)]',
  },
  {
    id: 4,
    title: 'Phase IV: Evolution',
    status: 'upcoming',
    features: ['AI Agents', 'Autonomous Systems', 'Next-Gen Infrastructure'],
    objective: 'Pioneer the future of AI-powered creator economy',
    color: 'orange',
    borderColor: 'border-orange-500/30',
    glowColor: 'shadow-[0_0_30px_hsl(24_100%_50%/0.3)]',
  },
];

export function Roadmap() {
  const [visiblePhases, setVisiblePhases] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = phaseRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisiblePhases((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/80" />

        {/* Animated grid */}
        <div className="absolute inset-0 animate-grid-fade opacity-5">
          <svg
            className="h-full w-full"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float-slow animation-delay-4" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float-slow animation-delay-6" />

        {/* Scan line */}
        <div className="absolute inset-0 animate-scan-line opacity-30">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary backdrop-blur-sm">
            Roadmap
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            The Path Forward
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch as we build the future of AI-powered creation
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 origin-top bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-orange-500/30" />

          {/* Phases */}
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              ref={(el) => {
                if (el) phaseRefs.current[index] = el;
              }}
              className={`ml-20 transform transition-all duration-700 ${
                visiblePhases.has(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-14 top-6 w-8 h-8">
                <div
                  className={`relative w-full h-full rounded-full border-2 ${phase.borderColor} bg-background/80 backdrop-blur-sm animate-pulse-glow cursor-pointer transition-all hover:scale-110`}
                  style={{
                    borderColor: phase.color === 'cyan' ? 'hsl(188, 100%, 50%)' : 
                                phase.color === 'purple' ? 'hsl(280, 100%, 50%)' :
                                phase.color === 'green' ? 'hsl(160, 100%, 50%)' :
                                'hsl(24, 100%, 50%)',
                  }}
                />
              </div>

              {/* Phase card */}
              <div
                className={`group rounded-xl border backdrop-blur-md bg-secondary/40 p-6 transition-all duration-300 hover:scale-102 hover:bg-secondary/60 ${phase.borderColor}`}
                style={{
                  boxShadow:
                    phase.color === 'cyan'
                      ? 'inset 0 0 20px hsl(188 100% 50% / 0.1), 0 0 30px hsl(188 100% 50% / 0.2)'
                      : phase.color === 'purple'
                        ? 'inset 0 0 20px hsl(280 100% 50% / 0.1), 0 0 30px hsl(280 100% 50% / 0.2)'
                        : phase.color === 'green'
                          ? 'inset 0 0 20px hsl(160 100% 50% / 0.1), 0 0 30px hsl(160 100% 50% / 0.2)'
                          : 'inset 0 0 20px hsl(24 100% 50% / 0.1), 0 0 30px hsl(24 100% 50% / 0.2)',
                }}
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {phase.title}
                    </h3>
                    <div
                      className={`inline-block rounded-full text-xs font-medium px-3 py-1 ${getStatusColor(phase.status)} border border-current/30 bg-current/10`}
                    >
                      {getStatusText(phase.status)}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  {phase.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            phase.color === 'cyan' ? 'hsl(188, 100%, 50%)'
                              : phase.color === 'purple' ? 'hsl(280, 100%, 50%)'
                                : phase.color === 'green' ? 'hsl(160, 100%, 50%)'
                                  : 'hsl(24, 100%, 50%)',
                        }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Objective */}
                <div className="rounded-lg border border-current/10 bg-current/5 p-4">
                  <p className="text-sm font-medium text-gray-200">Objective:</p>
                  <p className="text-sm text-gray-400 mt-1">{phase.objective}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
