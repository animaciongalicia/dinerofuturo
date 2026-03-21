import Link from 'next/link'
import type { Article } from '@/lib/types'

// Badge helpers
const NIVEL_LABEL: Record<number, string> = { 0: 'Nivel 0', 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' }
const NIVEL_CLASS: Record<number, string> = {
  0: 'bg-[rgba(26,111,168,.85)] text-white',
  1: 'bg-white/90 text-forest',
  2: 'bg-[rgba(153,27,27,.85)] text-white',
  3: 'bg-[rgba(124,92,16,.85)] text-white',
}
const CATEGORIA_LABEL: Record<string, string> = {
  comparativa: 'Comparativa',
  ahorro: 'Ahorro',
  inversion: 'Inversión',
  cripto: 'Cripto',
  presupuesto: 'Presupuesto',
  vivienda: 'Vivienda',
  impuestos: 'Impuestos',
  jubilacion: 'Jubilación',
}

const GRADIENTS = [
  'from-[#ECFDF5] to-[#A7F3D0]',
  'from-[#EFF6FF] to-[#BFDBFE]',
  'from-[#FFF7ED] to-[#FED7AA]',
  'from-[#F5F3FF] to-[#DDD6FE]',
  'from-[#FFF1F2] to-[#FECDD3]',
  'from-[#ECFDF5] to-[#D1FAE5]',
  'from-[#FFFBEB] to-[#FDE68A]',
  'from-[#F0FDF4] to-[#BBEED1]',
]

const EMOJIS = ['📊', '🏦', '💡', '₿', '🏠', '🧾', '💰', '📈']

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-[.07em] uppercase px-[10px] py-1 rounded-md ${className}`}>
      {children}
    </span>
  )
}

interface CardProps {
  article: Article
  index: number
  variant: 'wide' | 'side' | 'third' | 'half'
}

function Card({ article, index, variant }: CardProps) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const emoji = EMOJIS[index % EMOJIS.length]
  const isLarge = variant === 'wide' || variant === 'half'
  const imgH = isLarge ? 'h-[150px]' : 'h-[110px]'
  const titleSize = variant === 'wide' ? 'text-[20px]' : variant === 'half' ? 'text-[17px]' : 'text-[14.5px]'
  const bodyPad = isLarge ? 'p-[18px_20px]' : 'p-[14px_16px]'
  const isComparative = article.categoria === 'comparativa'

  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer flex flex-col group transition-all hover:shadow-card-lg hover:-translate-y-[3px] hover:border-mint"
    >
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center text-[44px] flex-shrink-0 ${imgH}`}>
        {emoji}
      </div>
      <div className={`${bodyPad} flex-1 flex flex-col`}>
        <div className="flex gap-[6px] flex-wrap mb-[9px]">
          {isComparative ? (
            <Badge className="bg-[rgba(91,33,182,.85)] text-white backdrop-blur-sm">
              {CATEGORIA_LABEL[article.categoria]}
            </Badge>
          ) : (
            <Badge className={NIVEL_CLASS[article.nivel]}>{NIVEL_LABEL[article.nivel]}</Badge>
          )}
          {article.resuelve && !isComparative && (
            <Badge className="bg-[rgba(21,128,61,.85)] text-white backdrop-blur-sm">✓ Solución directa</Badge>
          )}
        </div>
        <h3 className={`font-fraunces font-bold text-ink leading-[1.28] mb-[7px] tracking-[-0.2px] flex-1 group-hover:text-moss transition-colors ${titleSize}`}>
          {article.title}
        </h3>
        {isLarge && article.extracto && (
          <p className="text-[13px] text-ink3 leading-[1.55] mb-3">{article.extracto}</p>
        )}
        <div className="flex items-center justify-between text-[11.5px] text-ink3 mt-auto">
          <span className="inline-flex items-center gap-1 bg-cream border border-border px-3 py-[5px] rounded-full text-[12px] font-medium">
            📖 {article.lectura} min
          </span>
          <span>{article.fecha}</span>
        </div>
      </div>
    </Link>
  )
}

interface Props {
  articles: Article[]
}

export default function MixedGrid({ articles }: Props) {
  // Slot layout: wide(8), side(4), third(4), third(4), third(4), half(6), half(6)
  const slots: Array<{ variant: CardProps['variant']; colSpan: string }> = [
    { variant: 'wide',  colSpan: 'col-span-8' },
    { variant: 'side',  colSpan: 'col-span-4' },
    { variant: 'third', colSpan: 'col-span-4' },
    { variant: 'third', colSpan: 'col-span-4' },
    { variant: 'third', colSpan: 'col-span-4' },
    { variant: 'half',  colSpan: 'col-span-6' },
    { variant: 'half',  colSpan: 'col-span-6' },
  ]

  return (
    <div className="grid grid-cols-12 gap-[18px] max-lg:flex max-lg:flex-col">
      {slots.map(({ variant, colSpan }, i) => {
        const article = articles[i]
        if (!article) return null
        return (
          <div key={article.slug} className={colSpan}>
            <Card article={article} index={i} variant={variant} />
          </div>
        )
      })}
    </div>
  )
}
