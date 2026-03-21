import { getArticlesByCategoria } from '@/lib/articles'
import CategoriaContent from '@/components/CategoriaContent'
import type { Metadata } from 'next'
import type { Article } from '@/lib/types'
import { siteUrl } from '@/lib/utils'

const CATEGORIAS: Record<Article['categoria'], { label: string; desc: string; emoji: string }> = {
  ahorro:      { label: 'Ahorro inteligente',   desc: 'Cuentas, depósitos y letras del Tesoro sin complicaciones.',     emoji: '🏦' },
  inversion:   { label: 'Inversión en bolsa',   desc: 'ETFs, fondos indexados y cómo construir una cartera real.',      emoji: '📈' },
  cripto:      { label: 'Cripto sin humo',       desc: 'Bitcoin, Ethereum y cómo no perder la cabeza ni el dinero.',    emoji: '₿' },
  presupuesto: { label: 'Presupuesto y gasto',  desc: 'Controla lo que sale antes de pensar en lo que entra.',         emoji: '💸' },
  vivienda:    { label: 'Vivienda e hipotecas', desc: 'Comprar, alquilar, Euribor. Con calculadoras incluidas.',       emoji: '🏠' },
  impuestos:   { label: 'Impuestos',             desc: 'Declara inversiones sin pagar de más. La guía que no te dan.', emoji: '🧾' },
  jubilacion:  { label: 'Pensión y jubilación', desc: 'No depender solo del Estado. Las opciones que existen.',       emoji: '🏥' },
  comparativa: { label: 'Comparativas',          desc: 'Brókers, cuentas, roboadvisors. Sin sesgo ni patrocinios.',    emoji: '📊' },
}

export function generateStaticParams() {
  return (Object.keys(CATEGORIAS) as Array<Article['categoria']>).map(c => ({ categoria: c }))
}

export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
  const meta = CATEGORIAS[params.categoria as Article['categoria']]
  if (!meta) return {}
  const canonical = siteUrl(`/categoria/${params.categoria}`)
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

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const cat      = params.categoria as Article['categoria']
  const meta     = CATEGORIAS[cat]
  const articles = getArticlesByCategoria(cat)

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      {/* Hero */}
      <div className="mb-8">
        <div className="text-[44px] mb-3">{meta?.emoji ?? '📄'}</div>
        <h1 className="font-fraunces text-[42px] font-black text-ink tracking-[-0.5px] mb-2">
          {meta?.label ?? cat}
        </h1>
        <p className="text-[16px] text-ink3 max-w-[560px] leading-[1.65]">{meta?.desc}</p>
      </div>

      {/* Client component handles filter + grid */}
      <CategoriaContent articles={articles} />
    </div>
  )
}
