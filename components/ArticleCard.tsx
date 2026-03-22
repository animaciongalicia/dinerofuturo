import Link from 'next/link'
import type { Article } from '@/lib/types'

const NIVEL_BADGE: Record<number, { label: string; dot: string; text: string; bg: string }> = {
  0: { label: 'Nivel 0 · Empezar',  dot: 'bg-[#1A6FA8]', text: 'text-[#1A6FA8]', bg: 'bg-[#E8F4FD]' },
  1: { label: 'Nivel 1 · Ahorrar',  dot: 'bg-forest',    text: 'text-forest',    bg: 'bg-mist'      },
  2: { label: 'Nivel 2 · Invertir', dot: 'bg-[#991B1B]', text: 'text-[#991B1B]', bg: 'bg-[#FEE2E2]' },
  3: { label: 'Nivel 3 · Cripto',   dot: 'bg-[#7C5C10]', text: 'text-[#7C5C10]', bg: 'bg-gold-light' },
}

const CATEGORIA_COLOR: Record<string, string> = {
  comparativa: 'bg-[#F5F3FF] text-[#5B21B6]',
  hipotecas:   'bg-[#FFF7ED] text-[#9A3412]',
  banca:       'bg-[#EFF6FF] text-[#1D4ED8]',
  finanzas:    'bg-[#FDF4FF] text-[#7E22CE]',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

type Variant = 'wide' | 'side' | 'third' | 'half'

interface Props {
  article: Article
  variant?: Variant
  gradientIndex?: number // kept for API compat, unused
}

export default function ArticleCard({ article, variant = 'third' }: Props) {
  const nivel  = NIVEL_BADGE[article.nivel]
  const catCls = CATEGORIA_COLOR[article.categoria]
  const isLarge = variant === 'wide' || variant === 'half'

  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-2xl overflow-hidden flex flex-col group
                 transition-all hover:shadow-card-lg hover:-translate-y-[2px] hover:border-sage h-full"
    >
      {/* Accent bar */}
      <div className={`h-[3px] w-full ${nivel.dot}`} />

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Badges */}
        <div className="flex gap-[6px] flex-wrap mb-3">
          <span className={`inline-flex items-center text-[10.5px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md ${nivel.bg} ${nivel.text}`}>
            {nivel.label}
          </span>
          {catCls && (
            <span className={`inline-flex items-center text-[10.5px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md ${catCls}`}>
              {article.categoria}
            </span>
          )}
          {article.nuevo && (
            <span className="inline-flex items-center text-[10.5px] font-bold tracking-[.06em] uppercase px-[10px] py-[4px] rounded-md bg-gold/20 text-[#7C5C10]">
              Nuevo
            </span>
          )}
        </div>

        {/* Resuelve */}
        {article.resuelve && (
          <p className="text-[12px] text-forest italic mb-2 leading-snug line-clamp-1">
            "{article.resuelve}"
          </p>
        )}

        {/* Title */}
        <h3 className={`font-fraunces font-bold text-ink leading-[1.28] tracking-[-0.2px] flex-1 mb-3
                        group-hover:text-moss transition-colors
                        ${variant === 'wide' ? 'text-[20px]' : variant === 'half' ? 'text-[17px]' : 'text-[15px]'}`}>
          {article.title}
        </h3>

        {/* Excerpt — large variants only */}
        {isLarge && article.extracto && (
          <p className="text-[13px] text-ink3 leading-[1.55] mb-3 line-clamp-2">{article.extracto}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="text-[12px] text-ink3 font-medium">📖 {article.lectura} min</span>
          <span className="text-[12px] text-ink3">{formatDate(article.fecha)}</span>
        </div>
      </div>
    </Link>
  )
}
