import Link from 'next/link'
import { getRecentArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'Esta página no existe, pero tenemos muchos artículos que sí te van a ayudar.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  const recent = getRecentArticles(3)

  return (
    <div className="max-w-wrap mx-auto px-7 py-16">
      {/* Main message */}
      <div className="text-center mb-14">
        <div className="font-fraunces text-[120px] font-black text-mist leading-none mb-4 select-none">
          404
        </div>
        <h1 className="font-fraunces text-[32px] font-bold text-ink tracking-[-0.3px] mb-3">
          Esta página no existe
        </h1>
        <p className="text-[16px] text-ink3 max-w-[460px] mx-auto leading-[1.65] mb-8">
          Igual la movimos, igual nunca existió. Lo que sí existe son{' '}
          <strong className="text-ink font-semibold">artículos que resuelven problemas reales</strong>{' '}
          con tu dinero.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-forest text-white px-6 py-[11px] rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors"
          >
            Ir al inicio →
          </Link>
          <Link
            href="/nivel/0"
            className="bg-cream border border-border text-ink3 px-6 py-[11px] rounded-xl text-[14px] font-semibold hover:border-sage hover:text-moss transition-colors"
          >
            Empezar desde cero
          </Link>
        </div>
      </div>

      {/* Recent articles */}
      {recent.length > 0 && (
        <div>
          <h2 className="font-fraunces text-[22px] font-bold text-ink mb-5 text-center">
            Mientras tanto, esto sí existe
          </h2>
          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
            {recent.map((article, i) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="third"
                gradientIndex={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="mt-14 pt-8 border-t border-border grid grid-cols-4 gap-4 max-sm:grid-cols-2">
        {[
          { href: '/nivel/0',               label: '🔵 Nivel 0 — Empezar' },
          { href: '/nivel/1',               label: '🟢 Nivel 1 — Ahorrar' },
          { href: '/nivel/2',               label: '🔴 Nivel 2 — Invertir' },
          { href: '/herramientas',          label: '🧮 Herramientas gratis' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-border rounded-xl px-4 py-3 text-[13.5px] font-semibold text-ink3 hover:border-sage hover:text-moss transition-colors text-center"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
