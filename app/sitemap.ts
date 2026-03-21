import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'
import type { Article } from '@/lib/types'

const CATEGORIAS: Array<Article['categoria']> = [
  'ahorro', 'inversion', 'cripto', 'presupuesto',
  'vivienda', 'impuestos', 'jubilacion', 'comparativa',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const now = new Date()

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: siteUrl(`/articulo/${a.slug}`),
    lastModified: new Date(a.fecha),
    changeFrequency: 'weekly',
    priority: a.destacado ? 1.0 : 0.8,
  }))

  const nivelUrls: MetadataRoute.Sitemap = [0, 1, 2, 3].map(n => ({
    url: siteUrl(`/nivel/${n}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoriaUrls: MetadataRoute.Sitemap = CATEGORIAS.map(c => ({
    url: siteUrl(`/categoria/${c}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: siteUrl('/'),             lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: siteUrl('/herramientas'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  return [...staticUrls, ...nivelUrls, ...categoriaUrls, ...articleUrls]
}
