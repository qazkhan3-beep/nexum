import { TrendingUp, Blocks, DollarSign, Package, Activity } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SectionPage } from "@/components/section-page"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Capital Lab - NEXUM",
  description: "Fuel your growth with AI-powered business intelligence.",
}

export default function CapitalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SectionPage
        title="Capital Lab — Fuel Your Growth"
        subtitle="Turn creative output into scalable, optimized revenue systems."
        accentColor="#10B981"
        icon={<TrendingUp className="h-6 w-6" />}
        status={{
          badge: "Founders Layer",
          
        }}
        ctaButton={{
          label: "Enter Capital Lab",
          href: "/capital/system"
        }}
        prevSection={{ label: "Creator District", href: "/creator" }}
        nextSection={{ label: "Arena", href: "/arena" }}
        features={[
          {
            title: "Business Model Generator",
            description: "Structured business model with roadmap, revenue breakdown, and strategic positioning.",
            icon: <Blocks className="h-5 w-5" />,
          },
          {
            title: "Monetization Optimizer",
            description: "Pricing suggestions, funnel analysis, and conversion improvements to maximize revenue.",
            icon: <DollarSign className="h-5 w-5" />,
          },
          {
            title: "Offer Builder",
            description: "Digital product and service structure with tier breakdown, value stacking, and pricing logic.",
            icon: <Package className="h-5 w-5" />,
          },
          {
            title: "Market Pulse",
            description: "Emerging niches, demand signals, and market gaps you can capitalize on before everyone else.",
            icon: <Activity className="h-5 w-5" />,
          },
        ]}
      />
      <Footer />
    </main>
  )
}
