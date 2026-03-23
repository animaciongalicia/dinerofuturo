import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'
import type { Article } from '@/lib/types'

const ALL_CATEGORIAS: Array<Article['categoria']> = [
  'ahorro', 'inversion', 'cripto', 'presupuesto',
  'vivienda', 'impuestos', 'jubilacion', 'comparativa',
  'hipotecas', 'banca', 'finanzas',
]

const PAISES = [
  '/pais',
  '/pais/mexico',
  '/pais/colombia',
  '/pais/argentina',
  '/pais/chile',
]

const HERRAMIENTAS = [
  '/herramientas',
  '/herramientas/interes-compuesto',
  '/herramientas/fondo-emergencia',
  '/herramientas/calculadora-hipoteca',
  '/herramientas/objetivo-ahorro',
  '/herramientas/numero-fire',
]

const PERFILES = [
  '/perfiles-inversor',
  '/perfiles-inversor/empezando-desde-cero',
  '/perfiles-inversor/inversor-conservador',
  '/perfiles-inversor/inversor-moderado',
  '/perfiles-inversor/inversor-dinamico',
  '/perfiles-inversor/perfil-fire',
]

const ESTATICAS = [
  { url: '/',                          priority: 1.0, freq: 'daily'   },
  { url: '/que-hacer-con-mi-dinero',   priority: 0.9, freq: 'monthly' },
  { url: '/empieza-aqui',              priority: 0.9, freq: 'monthly' },
  { url: '/finanzas-personales',       priority: 0.8, freq: 'monthly' },
  { url: '/glosario',                  priority: 0.7, freq: 'monthly' },
  { url: '/sobre',                     priority: 0.5, freq: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const now = new Date()

  return [
    // Estáticas
    ...ESTATICAS.map(({ url, priority, freq }) => ({
      url: siteUrl(url),
      lastModified: now,
      changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority,
    })),

    // Niveles
    ...[0, 1, 2, 3].map(n => ({
      url: siteUrl(`/nivel/${n}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Categorías
    ...ALL_CATEGORIAS.map(c => ({
      url: siteUrl(`/categoria/${c}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),

    // Herramientas
    ...HERRAMIENTAS.map(h => ({
      url: siteUrl(h),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),

    // Perfiles de inversor
    ...PERFILES.map(p => ({
      url: siteUrl(p),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),

    // Hubs por país
    ...PAISES.map(p => ({
      url: siteUrl(p),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Artículos
    ...articles.map(a => ({
      url: siteUrl(`/articulo/${a.slug}`),
      lastModified: new Date(a.fecha),
      changeFrequency: 'weekly' as const,
      priority: a.destacado ? 1.0 : 0.8,
    })),
  ]
}
