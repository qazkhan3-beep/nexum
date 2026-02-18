import { Sparkles, Zap, CalendarRange, Fingerprint, Palette } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SectionPage } from "@/components/section-page"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Creator District - NEXUM",
  description: "Tools that amplify your creative vision.",
}

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SectionPage
        title="Creator District — Tools That Amplify Vision"
        subtitle="AI-powered systems to build, structure, and scale your creative output."
        accentColor="#a855f7"
        icon={<Sparkles className="h-6 w-6" />}
        status={{
          badge: "Private Beta",
          
        }}
        ctaButton={{
          label: "Enter Creator District",
          href: "/creator/system"
        }}
        prevSection={{ label: "Core", href: "/core" }}
        nextSection={{ label: "Capital Lab", href: "/capital" }}
        features={[
          {
            title: "Hook Engine",
            description: "Generate viral hooks and structured posts engineered for maximum attention and engagement.",
            icon: <Zap className="h-5 w-5" />,
          },
          {
            title: "Content Blueprint Builder",
            description: "7-day content strategy with format suggestions, audience mapping, and optimal posting schedules.",
            icon: <CalendarRange className="h-5 w-5" />,
          },
          {
            title: "Branding Lab",
            description: "Bio generator, brand voice analyzer, and positioning assistant to define your identity.",
            icon: <Fingerprint className="h-5 w-5" />,
          },
          {
            title: "Visual Concept Generator",
            description: "Scene ideas, emotional tone direction, and color palettes to bring your visual content to life.",
            icon: <Palette className="h-5 w-5" />,
          },
        ]}
      />
      <Footer />
    </main>
  )
}
