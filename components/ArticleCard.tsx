import Link from 'next/link'
import type { Article } from '@/lib/types'

const NIVEL_BADGE: Record<number, { label: string; className: string }> = {
  0: { label: 'Nivel 0', className: 'bg-[rgba(26,111,168,.85)] text-white backdrop-blur-sm' },
  1: { label: 'Nivel 1', className: 'bg-white/90 text-forest' },
  2: { label: 'Nivel 2', className: 'bg-[rgba(153,27,27,.85)] text-white backdrop-blur-sm' },
  3: { label: 'Nivel 3', className: 'bg-[rgba(124,92,16,.85)] text-white backdrop-blur-sm' },
}

const GRADIENT_LIST = [
  'from-[#ECFDF5] to-[#A7F3D0]',
  'from-[#EFF6FF] to-[#BFDBFE]',
  'from-[#FFF7ED] to-[#FED7AA]',
  'from-[#F5F3FF] to-[#DDD6FE]',
  'from-[#FFF1F2] to-[#FECDD3]',
  'from-[#ECFDF5] to-[#D1FAE5]',
  'from-[#FFFBEB] to-[#FDE68A]',
  'from-[#F0FDF4] to-[#BBEED1]',
]

const EMOJIS: Record<Article['categoria'], string> = {
  ahorro: '🏦',
  inversion: '📈',
  cripto: '₿',
  presupuesto: '💸',
  vivienda: '🏠',
  impuestos: '🧾',
  jubilacion: '🏥',
  comparativa: '📊',
}

type Variant = 'wide' | 'side' | 'third' | 'half'

interface Props {
  article: Article
  variant?: Variant
  gradientIndex?: number
}

export default function ArticleCard({ article, variant = 'third', gradientIndex = 0 }: Props) {
  const gradient = GRADIENT_LIST[gradientIndex % GRADIENT_LIST.length]
  const emoji = EMOJIS[article.categoria] ?? '📄'
  const nivel = NIVEL_BADGE[article.nivel]

  const isLarge = variant === 'wide' || variant === 'half'
  const isSmall = variant === 'side' || variant === 'third'

  const imgHeight = variant === 'wide' || variant === 'half'
    ? 'h-[150px]'
    : 'h-[110px]'

  const titleSize = variant === 'wide'
    ? 'text-[20px]'
    : variant === 'half'
    ? 'text-[17px]'
    : 'text-[14.5px]'

  const bodyPadding = isSmall ? 'p-[14px_16px]' : 'p-[18px_20px]'

  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition-all hover:shadow-card-lg hover:-translate-y-[3px] hover:border-mint"
    >
      {/* Image */}
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center text-[44px] flex-shrink-0 ${imgHeight}`}>
        {emoji}
      </div>

      {/* Body */}
      <div className={`${bodyPadding} flex-1 flex flex-col`}>
        {/* Badges */}
        <div className="flex gap-[6px] flex-wrap mb-[9px]">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-[.07em] uppercase px-[10px] py-1 rounded-md ${nivel.className}`}>
            {nivel.label}
          </span>
          {article.nuevo && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[.07em] uppercase px-[10px] py-1 rounded-md bg-gold text-forest">
              Nuevo
            </span>
          )}
          {article.resuelve && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[.07em] uppercase px-[10px] py-1 rounded-md bg-[rgba(21,128,61,.85)] text-white backdrop-blur-sm">
              ✓ Solución directa
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-fraunces font-bold text-ink leading-[1.28] mb-[7px] tracking-[-0.2px] flex-1 group-hover:text-moss transition-colors ${titleSize}`}>
          {article.title}
        </h3>

        {/* Excerpt — only for large variants */}
        {isLarge && article.extracto && (
          <p className="text-[13px] text-ink3 leading-[1.55] mb-3">{article.extracto}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-[11.5px] text-ink3 mt-auto">
          <span className="inline-flex items-center gap-1 bg-cream border border-border px-3 py-[5px] rounded-full text-[12px] font-medium text-ink3">
            📖 {article.lectura} min
          </span>
          <span>{article.fecha}</span>
        </div>
      </div>
    </Link>
  )
}
