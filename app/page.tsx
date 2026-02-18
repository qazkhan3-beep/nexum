import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SectionsPreview } from "@/components/sections-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SectionsPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
