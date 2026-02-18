import { Trophy, Swords, Medal, BarChart3, Gift } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SectionPage } from "@/components/section-page"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Arena - NEXUM",
  description: "Where creators compete, climb, and earn.",
}

export default function ArenaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SectionPage
        title="The Arena — Where Creators Compete"
        subtitle="Compete, rank, and earn within a performance-driven creator network."
        accentColor="#f59e0b"
        icon={<Trophy className="h-6 w-6" />}
        status={{
          badge: "Private Beta",
          
        }}
        ctaButton={{
          label: "Enter The Arena",
          href: "/arena/system"
        }}
        prevSection={{ label: "Capital Lab", href: "/capital" }}
        features={[
          {
            title: "Weekly Challenges",
            description: "Structured creator or monetization tasks designed to push your limits and build real skills.",
            icon: <Swords className="h-5 w-5" />,
          },
          {
            title: "Leaderboard",
            description: "Dynamic ranking based on activity, output quality, and community impact across the platform.",
            icon: <Medal className="h-5 w-5" />,
          },
          {
            title: "District Battles",
            description: "Performance comparison between Core, Creator, Capital, and Arena in cross-section showdowns.",
            icon: <BarChart3 className="h-5 w-5" />,
          },
          {
            title: "Reward Vault",
            description: "Tier upgrades, feature unlocks, and future revenue pool access for top performers.",
            icon: <Gift className="h-5 w-5" />,
          },
        ]}
      />
      <Footer />
    </main>
  )
}
