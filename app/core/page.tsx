import { Network, LayoutDashboard, Terminal, Rss, Award } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SectionPage } from "@/components/section-page"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Core - NEXUM",
  description: "Central Intelligence. Your personal AI command center.",
}

export default function CorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SectionPage
        title="Core — Central Intelligence"
        subtitle="Your personal AI command center. Monitor, command, and evolve."
        accentColor="#00BFFF"
        icon={<Network className="h-6 w-6" />}
        status={{
          badge: "Private Beta",
          
        }}
        ctaButton={{
          label: "Enter Core",
          href: "/core/system"
        }}
        nextSection={{ label: "Creator District", href: "/creator" }}
        features={[
          {
            title: "Personal Intelligence Dashboard",
            description: "AI greeting, productivity score, activity summary, and suggested actions tailored to your workflow.",
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            title: "Unified Command Interface",
            description: "Ask NEXUM anything for cross-district AI execution. One prompt to control the entire platform.",
            icon: <Terminal className="h-5 w-5" />,
          },
          {
            title: "Intelligence Feed",
            description: "Curated updates on AI tools, creator trends, and market shifts filtered by your interests.",
            icon: <Rss className="h-5 w-5" />,
          },
          {
            title: "Rank & Status System",
            description: "XP bar, tier levels, district access gating, and leaderboard preview to track your progress.",
            icon: <Award className="h-5 w-5" />,
          },
        ]}
      />
      <Footer />
    </main>
  )
}
