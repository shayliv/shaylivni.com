import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SectionDivider } from "@/components/section-divider"
import { FeaturedArticlesSection } from "@/components/featured-articles-section"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SectionDivider />
      <FeaturedArticlesSection />
    </main>
  )
}
