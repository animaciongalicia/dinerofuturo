import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Todos los artículos — Dinero Futuro',
  description:
    'Todos los artículos de educación financiera de Dinero Futuro: ahorro, inversión, presupuesto, hipotecas, cripto y más. Para toda la hispanosfera.',
  alternates: { canonical: siteUrl('/articulos') },
  openGraph: {
    title: 'Todos los artículos — Dinero Futuro',
    description: 'La biblioteca completa de artículos de finanzas personales.',
    type: 'website',
    url: siteUrl('/articulos'),
    locale: 'es',
    siteName: 'Dinero Futuro',
  },
}

const NIVEL_TABS = [
  { nivel: null, label: 'Todos' },
  { nivel: 0,    label: '🔵 Nivel 0 — Empezar' },
  { nivel: 1,    label: '🟢 Nivel 1 — Ahorrar' },
  { nivel: 2,    label: '🔴 Nivel 2 — Invertir' },
  { nivel: 3,    label: '🟡 Nivel 3 — Cripto' },
]

export default function ArticulosPage() {
  const all = getAllArticles() // sorted by date DESC

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[12px] font-bold uppercase tracking-[.12em] text-ink3 mb-2">Biblioteca completa</p>
            <h1 className="font-fraunces text-[40px] font-black text-ink leading-tight mb-3 max-sm:text-[28px]">
              Todos los artículos
            </h1>
            <p className="text-[16px] text-ink2 leading-[1.65]">
              {all.length} artículos de finanzas personales ordenados por fecha. Sin publicidad editorial,
              sin patrocinios ocultos. Solo información útil.
            </p>
          </div>

          {/* Level quick-links */}
          <div className="flex gap-2 flex-wrap mb-8">
            {NIVEL_TABS.map(({ nivel, label }) => (
              <Link
                key={label}
                href={nivel === null ? '/articulos' : `/nivel/${nivel}`}
                className="px-4 py-[6px] rounded-full text-[12.5px] font-semibold border-[1.5px] transition-all hover:-translate-y-px bg-cream border-border text-ink3 hover:border-sage"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2">
            {all.map(article => (
              <ArticleCard key={article.slug} article={article} variant="third" />
            ))}
          </div>

        </main>

        {/* Sidebar */}
        <aside className="w-[260px] flex-shrink-0 max-lg:hidden">
          <Sidebar />
        </aside>
      </div>
    </div>
  )
}
