import Link from 'next/link'
import type { Article } from '@/lib/types'

const NIVEL_LABEL: Record<number, string> = { 0: 'Nivel 0', 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' }
const NIVEL_CLASS: Record<number, string> = {
  0: 'bg-[rgba(26,111,168,.85)] text-white',
  1: 'bg-white/90 text-forest',
  2: 'bg-[rgba(153,27,27,.85)] text-white',
  3: 'bg-[rgba(124,92,16,.85)] text-white',
}

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-[.07em] uppercase px-[10px] py-1 rounded-md ${className}`}>
      {children}
    </span>
  )
}

interface SideCardProps {
  article: Article
  gradientClass: string
  emoji: string
}

function SideCard({ article, gradientClass, emoji }: SideCardProps) {
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition-all hover:shadow-card hover:border-mint"
    >
      <div className={`h-[120px] flex items-center justify-center text-[40px] bg-gradient-to-br ${gradientClass}`}>
        {emoji}
      </div>
      <div className="p-[14px_16px] flex-1">
        <div className="flex gap-[5px] flex-wrap mb-[7px]">
          <Badge className={NIVEL_CLASS[article.nivel]}>{NIVEL_LABEL[article.nivel]}</Badge>
        </div>
        <h3 className="font-fraunces text-[16px] font-bold text-ink leading-[1.3] mb-1 group-hover:text-moss transition-colors">
          {article.title}
        </h3>
        <p className="text-[12px] text-ink3 leading-[1.45]">{article.extracto}</p>
      </div>
    </Link>
  )
}

interface Props {
  featured: Article
  side: Article[]
}

const SIDE_GRADIENTS = [
  { gradient: 'from-[#E8F4FD] to-[#BFDBFE]', emoji: '📊' },
  { gradient: 'from-[#FEF9C3] to-[#FDE68A]', emoji: '🏦' },
  { gradient: 'from-[#FCE7F3] to-[#FBCFE8]', emoji: '📉' },
]

export default function FeaturedArticle({ featured, side }: Props) {
  return (
    <section className="pt-0">
      <div className="max-w-wrap mx-auto px-7">
        <div className="flex items-baseline justify-between mb-6 pt-11">
          <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Artículo destacado</h2>
          <Link href="/" className="text-[13px] text-moss font-semibold flex items-center gap-1 hover:text-forest">
            Lo más leído →
          </Link>
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-7 mb-14 max-lg:grid-cols-1 animate-fade-up">
          {/* Big featured */}
          <Link
            href={`/articulo/${featured.slug}`}
            className="bg-white border border-border rounded-[20px] overflow-hidden cursor-pointer group transition-shadow hover:shadow-card-lg"
          >
            {/* Image */}
            <div className="h-[280px] relative overflow-hidden bg-gradient-to-br from-mist via-[#B7E4C7] to-mint flex items-center justify-center">
              <span className="text-[80px] opacity-70">💰</span>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <div className="absolute top-[18px] left-[18px] flex gap-[6px]">
                <Badge className={NIVEL_CLASS[featured.nivel]}>{NIVEL_LABEL[featured.nivel]}</Badge>
                {featured.nuevo && <Badge className="bg-gold text-forest">Nuevo</Badge>}
              </div>
            </div>

            {/* Body */}
            <div className="p-[24px_26px]">
              <div className="bg-cream border-l-[3px] border-sage rounded-r-md px-[14px] py-[10px] mb-[14px] text-[13px] text-forest">
                <strong className="font-bold">Resuelve este problema:</strong> {featured.resuelve}
              </div>
              <h2 className="font-fraunces text-[26px] font-bold text-ink leading-[1.25] mb-[10px] tracking-[-0.3px] group-hover:text-moss transition-colors">
                {featured.title}
              </h2>
              <p className="text-[14.5px] text-ink3 leading-[1.65] mb-4">{featured.extracto}</p>
              <div className="flex items-center justify-between text-[12px] text-ink3">
                <span className="inline-flex items-center gap-1 bg-cream border border-border px-3 py-[5px] rounded-full font-medium">
                  📖 {featured.lectura} min · Nivel principiante
                </span>
                <Badge className="bg-[rgba(21,128,61,.85)] text-white backdrop-blur-sm">✓ Solución directa</Badge>
              </div>
            </div>
          </Link>

          {/* Side stack */}
          <div className="flex flex-col gap-[14px]">
            {side.slice(0, 3).map((article, i) => (
              <SideCard
                key={article.slug}
                article={article}
                gradientClass={SIDE_GRADIENTS[i % SIDE_GRADIENTS.length].gradient}
                emoji={SIDE_GRADIENTS[i % SIDE_GRADIENTS.length].emoji}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
