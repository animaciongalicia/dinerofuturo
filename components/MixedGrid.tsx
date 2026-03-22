import Link from 'next/link'
import type { Article } from '@/lib/types'
import ArticleCard from './ArticleCard'

// Wide card (primera posición) — más protagonismo
function WideCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-2xl overflow-hidden flex group
                 transition-all hover:shadow-card-lg hover:-translate-y-[2px] hover:border-sage h-full max-sm:flex-col"
    >
      {/* Left accent */}
      <div className="w-1 flex-shrink-0 bg-forest rounded-l-2xl max-sm:w-full max-sm:h-[3px] max-sm:rounded-none" />

      <div className="p-6 flex flex-col flex-1">
        {/* Badge */}
        <div className="flex gap-2 mb-3">
          <span className="text-[10.5px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md bg-mist text-forest">
            Nivel {article.nivel} · Destacado
          </span>
          {article.nuevo && (
            <span className="text-[10.5px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md bg-gold/20 text-[#7C5C10]">
              Nuevo
            </span>
          )}
        </div>

        {/* Resuelve */}
        {article.resuelve && (
          <p className="text-[13px] text-forest italic mb-2">"{article.resuelve}"</p>
        )}

        {/* Title */}
        <h3 className="font-fraunces text-[22px] font-bold text-ink leading-[1.25] tracking-[-0.3px] mb-3 flex-1 group-hover:text-moss transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.extracto && (
          <p className="text-[14px] text-ink3 leading-[1.6] mb-4 line-clamp-2">{article.extracto}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-[12.5px] text-ink3">📖 {article.lectura} min de lectura</span>
          <span className="text-[13px] font-semibold text-forest group-hover:text-moss transition-colors">Leer →</span>
        </div>
      </div>
    </Link>
  )
}

interface Props {
  articles: Article[]
}

export default function MixedGrid({ articles }: Props) {
  if (!articles.length) return null

  const [first, ...rest] = articles

  return (
    <div className="flex flex-col gap-5">
      {/* Primera card — wide */}
      <WideCard article={first} />

      {/* Resto en grid de 3 */}
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {rest.slice(0, 6).map((article, i) => (
            <ArticleCard key={article.slug} article={article} variant="third" gradientIndex={i} />
          ))}
        </div>
      )}
    </div>
  )
}
