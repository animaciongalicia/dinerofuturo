import Link from 'next/link'
import type { Article } from '@/lib/types'

const NIVEL_LABEL: Record<number, string> = { 0: 'Nivel 0', 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' }
const NIVEL_COLOR: Record<number, string> = {
  0: 'bg-[#E8F4FD] text-[#1A6FA8]',
  1: 'bg-mist text-forest',
  2: 'bg-[#FEE2E2] text-[#991B1B]',
  3: 'bg-[#FEF9C3] text-[#7C5C10]',
}

function FeatCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-[18px] p-[26px] flex flex-col gap-4 group hover:shadow-card hover:border-mint transition-all"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[11px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md ${NIVEL_COLOR[article.nivel]}`}>
          {NIVEL_LABEL[article.nivel]}
        </span>
        {article.nuevo && (
          <span className="text-[11px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md bg-gold/20 text-[#7C5C10]">
            Nuevo
          </span>
        )}
      </div>

      {/* Resuelve */}
      <div className="bg-cream border-l-[3px] border-sage rounded-r-md px-[13px] py-[9px] text-[13px] text-forest leading-[1.45]">
        <span className="font-bold">Resuelve: </span>{article.resuelve}
      </div>

      {/* Title */}
      <h2 className="font-fraunces text-[22px] font-bold text-ink leading-[1.25] tracking-[-0.2px] group-hover:text-moss transition-colors">
        {article.title}
      </h2>

      {/* Extracto */}
      <p className="text-[14px] text-ink3 leading-[1.65] flex-1">{article.extracto}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-[12px] text-ink3 flex items-center gap-1">
          📖 {article.lectura} min de lectura
        </span>
        <span className="text-[13px] font-semibold text-forest group-hover:text-moss transition-colors">
          Leer →
        </span>
      </div>
    </Link>
  )
}

interface Props {
  articles: Article[]
}

export default function FeaturedArticle({ articles }: Props) {
  return (
    <section className="pt-0">
      <div className="max-w-wrap mx-auto px-7 pt-10 pb-2">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-fraunces text-[22px] font-bold text-ink tracking-[-0.3px]">Artículos destacados</h2>
          <Link href="/articulos" className="text-[13px] text-moss font-semibold hover:text-forest">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {articles.map(a => <FeatCard key={a.slug} article={a} />)}
        </div>
      </div>
    </section>
  )
}
