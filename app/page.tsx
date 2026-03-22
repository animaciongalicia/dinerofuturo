import Link from 'next/link'
import AdUnit from '@/components/AdUnit'
import Hero from '@/components/Hero'
import LevelBar from '@/components/LevelBar'
import FeaturedArticle from '@/components/FeaturedArticle'
import ProblemBand from '@/components/ProblemBand'
import MixedGrid from '@/components/MixedGrid'
import ToolsSection from '@/components/ToolsSection'
import CompareSection from '@/components/CompareSection'
import NewsletterSection from '@/components/NewsletterSection'
import TopicsSection from '@/components/TopicsSection'
import {
  getFeaturedArticles,
  getAllArticles,
  getRecentArticles,
} from '@/lib/articles'

// Datos de mercado estáticos (actualiza manualmente o via API)
export default function HomePage() {
  const featuredList = getFeaturedArticles(2)
  const all       = getAllArticles()
  const recent    = getRecentArticles(7)


  return (
    <>
      <Hero />
      <LevelBar />
      <FeaturedArticle articles={featuredList} />
      <ProblemBand />

      {/* Ad — horizontal between ProblemBand and recent articles */}
      <div className="max-w-wrap mx-auto px-7 py-6">
        <p className="text-[11px] text-ink3/50 mb-1 uppercase tracking-[.08em]">Publicidad</p>
        <AdUnit slot="5544332211" format="horizontal" />
      </div>

      <section className="py-[52px]">
        <div className="max-w-wrap mx-auto px-7">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Publicados esta semana</h2>
            <Link href="/nivel/0" className="text-[13px] text-moss font-semibold flex items-center gap-1 hover:text-forest">
              Ver todos los artículos →
            </Link>
          </div>
          <MixedGrid articles={recent} />
        </div>
      </section>
      <ToolsSection />
      <CompareSection />
      <NewsletterSection />
      <TopicsSection />
    </>
  )
}
