import Link from 'next/link'
import { getArticlesByNivel } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteUrl } from '@/lib/utils'

const NIVEL_META: Record<string, {
  label: string
  h1: string
  desc: string
  body: string
  resuelve: string
  emoji: string
}> = {
  '0': {
    label: 'Nivel 0 — Empezar',
    h1: 'Finanzas desde cero: aprende aunque no sepas nada',
    emoji: '🔵',
    desc: 'Si nunca has pensado en ahorrar o invertir, estás en el sitio correcto. Sin jerga, sin conocimientos previos.',
    body: 'Si nunca has pensado en ahorrar, invertir o entender tu dinero, estás en el sitio correcto. Aquí no se asume nada. Explicamos todo desde el principio, con ejemplos reales y lenguaje normal. Sin jerga, sin condescendencia.',
    resuelve: 'No sé por dónde empezar con mi dinero',
  },
  '1': {
    label: 'Nivel 1 — Ahorrar',
    h1: 'Aprende a ahorrar de verdad, no solo a gastar menos',
    emoji: '🟢',
    desc: 'Métodos concretos, cuentas que dan rentabilidad y herramientas para construir tu colchón financiero.',
    body: 'Ahorrar no es privarte de cosas. Es decidir conscientemente qué haces con tu dinero. En este nivel encontrarás métodos concretos, cuentas que sí dan rentabilidad y herramientas para construir tu colchón financiero.',
    resuelve: 'Llego a fin de mes justo o no ahorro nada',
  },
  '2': {
    label: 'Nivel 2 — Invertir',
    h1: 'Invierte tu dinero sin necesitar un banco ni un experto',
    emoji: '🔴',
    desc: 'Con 50€ al mes y paciencia, cualquier persona puede construir patrimonio. ETFs, fondos indexados y carteras reales.',
    body: 'Invertir no es para ricos ni para gente con carrera de economía. Con 50€ al mes y paciencia, cualquier persona puede construir patrimonio. Aquí te explicamos cómo, con qué herramientas y qué errores evitar.',
    resuelve: 'Tengo ahorros pero no sé qué hacer con ellos',
  },
  '3': {
    label: 'Nivel 3 — Cripto',
    h1: 'Cripto, ETFs avanzados y activos alternativos explicados',
    emoji: '🟡',
    desc: 'Bitcoin, Ethereum, DeFi y fiscalidad avanzada. Sin fanatismos ni promesas de hacerse rico rápido.',
    body: 'Para los que ya controlan lo básico y quieren ir más lejos. Bitcoin, Ethereum, DeFi, fiscalidad avanzada. Todo explicado sin fanatismos ni promesas de hacerse rico rápido.',
    resuelve: 'Quiero entender cripto sin perder dinero',
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
    title: meta.h1,
    description: meta.desc,
    alternates: { canonical, languages: { es: canonical, 'x-default': canonical } },
    openGraph: {
      type: 'website',
      title: meta.h1,
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
            <Link
              key={n}
              href={`/nivel/${n}`}
              className={`px-4 py-[6px] rounded-full text-[12.5px] font-semibold border-[1.5px] transition-all hover:-translate-y-px ${
                n === params.nivel
                  ? `${NIVEL_COLORS[n].badge} border-current font-bold`
                  : 'bg-cream border-border text-ink3 hover:border-sage'
              }`}
            >
              {NIVEL_META[n].emoji} Nivel {n}
            </Link>
          ))}
        </div>

        {/* Accent bar */}
        <div className={`w-12 h-1 rounded-full mb-4 ${colors.bar}`} />

        <h1 className="font-fraunces text-[40px] font-black text-ink tracking-[-0.5px] mb-4 leading-tight max-sm:text-[30px]">
          {meta.h1}
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.75] max-w-[900px] mb-6">
          {meta.body}
        </p>

        {/* Resuelve strip */}
        <div className="inline-flex items-center gap-3 bg-cream border-l-[3px] border-sage rounded-r-xl px-5 py-3">
          <span className="text-[11px] font-bold uppercase tracking-[.08em] text-sage whitespace-nowrap">Resuelve</span>
          <span className="text-[15px] font-semibold text-forest">{meta.resuelve}</span>
        </div>
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
