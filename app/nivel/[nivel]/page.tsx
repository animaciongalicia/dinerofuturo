import { getArticlesByNivel } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteUrl } from '@/lib/utils'

const NIVEL_META: Record<string, {
  label: string; desc: string; emoji: string; longDesc: string
}> = {
  '0': {
    label: 'Nivel 0 — Empezar',
    emoji: '🔵',
    desc: 'Conceptos básicos para quien parte de cero. Sin conocimientos previos.',
    longDesc: 'Si nunca has pensado en finanzas personales o no sabes por dónde empezar, estás en el sitio correcto. Aquí no se asume ningún conocimiento previo: explicamos qué es un presupuesto, por qué el dinero parado en cuenta pierde valor y cuáles son los primeros pasos que cualquier persona debería dar.',
  },
  '1': {
    label: 'Nivel 1 — Ahorrar',
    emoji: '🟢',
    desc: 'Aprende a gestionar tus ahorros y hacer que trabajen para ti.',
    longDesc: 'Ya controlas tus gastos básicos y quieres que tu dinero deje de estar parado. En este nivel verás cómo construir un fondo de emergencia sólido, qué productos de ahorro tienen más sentido hoy (cuentas remuneradas, letras del Tesoro, depósitos) y cuánto necesitas tener líquido antes de pensar en invertir.',
  },
  '2': {
    label: 'Nivel 2 — Invertir',
    emoji: '🔴',
    desc: 'ETFs, bolsa y fondos indexados. Para quienes ya tienen las bases.',
    longDesc: 'Tienes el fondo de emergencia, sin deudas caras y estás listo para que tu dinero trabaje a largo plazo. Aquí explicamos cómo funciona la inversión indexada pasiva, qué son los ETFs y fondos indexados, cómo construir una cartera diversificada y qué hacer (y qué no hacer) cuando el mercado cae.',
  },
  '3': {
    label: 'Nivel 3 — Cripto',
    emoji: '🟡',
    desc: 'Bitcoin, Ethereum y el mundo de las criptomonedas sin sensacionalismos.',
    longDesc: 'El nivel más avanzado y más volátil. Aquí tratamos las criptomonedas sin euforia ni catastrofismo: qué son Bitcoin y Ethereum, cómo funcionan las carteras digitales, qué es el halving, cómo tributan en España y por qué nunca deberías poner más del 5–10% de tu cartera en activos tan volátiles.',
  },
}

export function generateStaticParams() {
  return [{ nivel: '0' }, { nivel: '1' }, { nivel: '2' }, { nivel: '3' }]
}

export function generateMetadata({ params }: { params: { nivel: string } }): Metadata {
  const meta = NIVEL_META[params.nivel]
  if (!meta) return {}
  const canonical = siteUrl(`/nivel/${params.nivel}`)
  return {
    title: meta.label,
    description: meta.desc,
    alternates: { canonical, languages: { es: canonical, 'x-default': canonical } },
    openGraph: {
      type: 'website',
      title: meta.label,
      description: meta.desc,
      url: canonical,
      locale: 'es_ES',
      siteName: 'Dinero Futuro',
    },
  }
}

const NIVEL_COLORS: Record<string, { badge: string; bar: string }> = {
  '0': { badge: 'bg-[#E8F4FD] text-[#1A6FA8]', bar: 'bg-[#1A6FA8]' },
  '1': { badge: 'bg-mist text-forest',          bar: 'bg-sage' },
  '2': { badge: 'bg-[#FEE2E2] text-[#991B1B]',  bar: 'bg-[#991B1B]' },
  '3': { badge: 'bg-gold-light text-[#7C5C10]', bar: 'bg-gold' },
}

const ALL_NIVELES = ['0', '1', '2', '3']

export default function NivelPage({ params }: { params: { nivel: string } }) {
  const meta = NIVEL_META[params.nivel]
  if (!meta) notFound()

  const colors   = NIVEL_COLORS[params.nivel]
  const articles = getArticlesByNivel(Number(params.nivel))

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      {/* Hero */}
      <div className="mb-10">
        {/* Level switcher pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {ALL_NIVELES.map(n => (
            <a
              key={n}
              href={`/nivel/${n}`}
              className={`px-4 py-[6px] rounded-full text-[12.5px] font-semibold border-[1.5px] transition-all hover:-translate-y-px ${
                n === params.nivel
                  ? `${NIVEL_COLORS[n].badge} border-current font-bold`
                  : 'bg-cream border-border text-ink3 hover:border-sage'
              }`}
            >
              {NIVEL_META[n].emoji} Nivel {n}
            </a>
          ))}
        </div>

        {/* Accent bar */}
        <div className={`w-12 h-1 rounded-full mb-4 ${colors.bar}`} />

        <h1 className="font-fraunces text-[42px] font-black text-ink tracking-[-0.5px] mb-3">
          {meta.label}
        </h1>
        <p className="text-[16px] text-ink3 leading-[1.7] max-w-[600px]">{meta.longDesc}</p>
      </div>

      {/* Count */}
      {articles.length > 0 && (
        <p className="text-[13px] text-ink3 mb-6">
          {articles.length} artículo{articles.length !== 1 ? 's' : ''} en este nivel
        </p>
      )}

      {/* Grid */}
      {articles.length === 0 ? (
        <div className="bg-cream border border-border rounded-2xl p-12 text-center">
          <div className="text-[48px] mb-4">{meta.emoji}</div>
          <p className="font-fraunces text-[20px] font-bold text-ink mb-2">Próximamente</p>
          <p className="text-ink3">Estamos preparando el contenido de este nivel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} variant="third" gradientIndex={i} />
          ))}
        </div>
      )}
    </div>
  )
}
