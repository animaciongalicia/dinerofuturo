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
  getFeaturedArticle,
  getAllArticles,
  getRecentArticles,
} from '@/lib/articles'

// Datos de mercado estáticos (actualiza manualmente o via API)
function DataFAQSection() {
  const marketData = [
    { name: 'Euribor 12M', val: '2.43%', chg: '▼ −0.08 este mes', up: false },
    { name: 'IPC España',  val: '2.8%',  chg: '▼ vs 3.1% anterior', up: false },
    { name: 'S&P 500',     val: '5.847', chg: '▲ +0.4% hoy', up: true },
    { name: 'Bitcoin',     val: '$84k',  chg: '▲ +1.2% 24h', up: true },
  ]

  const faqs = [
    { q: '¿Con cuánto dinero puedo empezar a invertir?', a: 'Desde 1€ en algunos brókers. Lo importante es el hábito, no la cantidad inicial.' },
    { q: '¿Es seguro invertir en bolsa sin experiencia?',  a: 'Con fondos indexados, sí. Es el vehículo de menor riesgo para principiantes.' },
    { q: '¿Qué es un ETF y para qué sirve?',              a: 'Un fondo que cotiza en bolsa. Barato, diversificado y perfecto para empezar sin complicarse.' },
    { q: '¿Vale la pena el cripto si soy principiante?',  a: 'Solo si entiendes lo que compras. Nunca más del 5–10% de tu cartera total.' },
  ]

  return (
    <section className="py-[52px]">
      <div className="max-w-wrap mx-auto px-7">
        <div className="grid grid-cols-2 gap-7 max-lg:grid-cols-1">
          {/* Data block */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="px-[22px] py-[18px] border-b border-border flex items-center justify-between">
              <h3 className="font-fraunces text-[18px] font-bold text-ink tracking-[-0.2px]">Datos del mercado hoy</h3>
              <span className="text-[11px] text-ink3">Actualizado 21 mar 2026</span>
            </div>
            <div className="grid grid-cols-2">
              {marketData.map(({ name, val, chg, up }, i) => (
                <div
                  key={name}
                  className="px-[22px] py-[18px] border-r border-border2 border-b border-border2 [&:nth-child(even)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="text-[10.5px] uppercase tracking-[.08em] text-ink3 font-semibold mb-1">{name}</div>
                  <div className="font-fraunces text-[26px] font-black text-ink leading-none">{val}</div>
                  <div className={`text-[12px] font-semibold mt-1 ${up ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>{chg}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ block */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="px-[22px] py-[18px] border-b border-border">
              <h3 className="font-fraunces text-[18px] font-bold text-ink tracking-[-0.2px]">Preguntas frecuentes</h3>
            </div>
            {faqs.map(({ q, a }) => (
              <div key={q} className="px-[22px] py-4 border-b border-border2 last:border-b-0 hover:bg-cream transition-colors cursor-pointer">
                <div className="text-[14px] font-semibold text-ink mb-[3px] leading-[1.35]">{q}</div>
                <div className="text-[13px] text-ink3 leading-[1.5]">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const featured  = getFeaturedArticle()
  const all       = getAllArticles()
  const recent    = getRecentArticles(7)
  const sideCards = all.filter(a => a.slug !== featured.slug).slice(0, 3)

  return (
    <>
      <Hero />
      <LevelBar />
      <FeaturedArticle featured={featured} side={sideCards} />
      <ProblemBand />
      <section className="py-[52px]">
        <div className="max-w-wrap mx-auto px-7">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Publicados esta semana</h2>
            <a href="/nivel/0" className="text-[13px] text-moss font-semibold flex items-center gap-1 hover:text-forest">
              Ver todos los artículos →
            </a>
          </div>
          <MixedGrid articles={recent} />
        </div>
      </section>
      <ToolsSection />
      <CompareSection />
      <NewsletterSection />
      <TopicsSection />
      <DataFAQSection />
    </>
  )
}
