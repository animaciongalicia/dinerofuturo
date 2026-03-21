import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'

// Generado en build time — se regenera con cada nuevo artículo
export const dynamic = 'force-static'

export function GET() {
  const articles = getAllArticles().map(({ slug, title, extracto, resuelve, nivel, categoria, lectura }) => ({
    slug,
    title,
    extracto,
    resuelve,
    nivel,
    categoria,
    lectura,
  }))
  return NextResponse.json(articles)
}
