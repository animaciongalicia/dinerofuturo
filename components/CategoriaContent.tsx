'use client'

import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/lib/types'

const NIVEL_PILLS = [
  { key: null, label: 'Todos los niveles' },
  { key: 0,    label: '🔵 Nivel 0' },
  { key: 1,    label: '🟢 Nivel 1' },
  { key: 2,    label: '🔴 Nivel 2' },
  { key: 3,    label: '🟡 Nivel 3' },
]

interface Props {
  articles: Article[]
}

export default function CategoriaContent({ articles }: Props) {
  const [nivelFilter, setNivelFilter] = useState<number | null>(null)

  const filtered = nivelFilter === null
    ? articles
    : articles.filter(a => a.nivel === nivelFilter)

  return (
    <>
      {/* Nivel filter */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="text-[12px] font-semibold uppercase tracking-[.08em] text-ink3 mr-1">
          Filtrar por nivel:
        </span>
        {NIVEL_PILLS.map(({ key, label }) => (
          <button
            key={String(key)}
            onClick={() => setNivelFilter(key)}
            className={`px-4 py-[5px] rounded-full text-[12.5px] font-medium border-[1.5px] transition-all hover:-translate-y-px ${
              nivelFilter === key
                ? 'bg-forest text-white border-forest font-semibold'
                : 'bg-cream border-border text-ink3 hover:border-sage'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[13px] text-ink3 mb-6">
        {filtered.length} artículo{filtered.length !== 1 ? 's' : ''}
        {nivelFilter !== null ? ` en Nivel ${nivelFilter}` : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-cream border border-border rounded-2xl p-12 text-center">
          <p className="font-fraunces text-[20px] font-bold text-ink mb-2">Sin artículos</p>
          <p className="text-ink3">
            No hay artículos para este filtro.{' '}
            <button
              onClick={() => setNivelFilter(null)}
              className="text-moss font-semibold hover:underline"
            >
              Ver todos
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((article, i) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="third"
              gradientIndex={i}
            />
          ))}
        </div>
      )}
    </>
  )
}
