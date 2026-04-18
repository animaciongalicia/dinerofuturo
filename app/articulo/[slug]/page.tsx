export const dynamic = 'force-static'
export const revalidate = false

import { marked } from 'marked'
import AdUnit from '@/components/AdUnit'
import { getAllArticles, getArticleBySlug, getArticlesByNivel } from '@/lib/articles'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { extractHeadings, headingToId, siteUrl } from '@/lib/utils'
import ArticleSidebar from '@/components/ArticleSidebar'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  let article
  try { article = getArticleBySlug(params.slug) }
  catch { return {} }

  const ogImage = siteUrl(`/articulo/${params.slug}/opengraph-image`)
  const canonical = siteUrl(`/articulo/${params.slug}`)

  return {
    title: article.title,
    description: article.extracto,

    alternates: {
      canonical,
      languages: { es: canonical, 'x-default': canonical },
    },

    openGraph: {
      type: 'article',
      locale: 'es_ES',
      siteName: 'Dinero Futuro',
      title: article.title,
      description: article.extracto,
      url: canonical,
      publishedTime: article.fecha,
      tags: [article.categoria, `nivel-${article.nivel}`, 'finanzas-personales'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },

    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.extracto,
      images: [ogImage],
    },
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────
const NIVEL_LABEL: Record<number, string> = {
  0: 'Nivel 0 · Empezar',
  1: 'Nivel 1 · Ahorrar',
  2: 'Nivel 2 · Invertir',
  3: 'Nivel 3 · Cripto',
}

const NIVEL_CLASS: Record<number, string> = {
  0: 'bg-[#E8F4FD] text-[#1A6FA8]',
  1: 'bg-mist text-forest',
  2: 'bg-[#FEE2E2] text-[#991B1B]',
  3: 'bg-gold-light text-[#7C5C10]',
}

const CATEGORIA_LABEL: Record<string, string> = {
  ahorro:      'Ahorro',
  inversion:   'Inversión',
  cripto:      'Cripto',
  presupuesto: 'Presupuesto',
  hipotecas:   'Hipotecas',
  banca:       'Neobancos',
  jubilacion:  'Jubilación',
  comparativa: 'Comparativas',
  finanzas:    'Finanzas',
  impuestos:   'Impuestos',
  vivienda:    'Vivienda',
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ArticlePage({ params }: { params: { slug: string } }) {
  let article
  try { article = getArticleBySlug(params.slug) }
  catch { notFound() }

  // Render MDX → HTML and inject id attrs into h2/h3 so sidebar TOC links work
  const rawHtml = marked(article.content ?? '') as string
  const contentHtml = rawHtml.replace(
    /<(h[23])>([\s\S]*?)<\/h[23]>/g,
    (_, tag, inner) => {
      const id = headingToId(inner.replace(/<[^>]+>/g, '').trim())
      return `<${tag} id="${id}">${inner}</${tag}>`
    },
  )

  // Sidebar data
  const headings  = extractHeadings(article.content ?? '')
  const allByNivel = getArticlesByNivel(article.nivel)
  const related   = allByNivel.filter(a => a.slug !== article.slug).slice(0, 3)

  // Prev / next navigation (articles sorted newest first)
  const allArticles  = getAllArticles()
  const currentIndex = allArticles.findIndex(a => a.slug === article.slug)
  const prevArticle  = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
  const nextArticle  = currentIndex > 0                      ? allArticles[currentIndex - 1] : null

  // More articles at the bottom (same nivel, excludes current)
  const moreArticles = allArticles
    .filter(a => a.slug !== article.slug && a.nivel === article.nivel)
    .slice(0, 3)

  // Schema.org Article JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.extracto,
    datePublished: article.fecha,
    dateModified: article.fecha,
    inLanguage: 'es',
    educationalLevel: `Nivel ${article.nivel}`,
    about: { '@type': 'Thing', name: CATEGORIA_LABEL[article.categoria] ?? article.categoria },
    publisher: {
      '@type': 'Organization',
      name: 'Dinero Futuro',
      url: siteUrl(),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl(`/articulo/${article.slug}`),
    },
    image: siteUrl(`/articulo/${params.slug}/opengraph-image`),
  }

  const articleUrl = siteUrl(`/articulo/${article.slug}`)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',               item: siteUrl('/') },
      { '@type': 'ListItem', position: 2, name: NIVEL_LABEL[article.nivel], item: siteUrl(`/nivel/${article.nivel}`) },
      { '@type': 'ListItem', position: 3, name: article.title,          item: articleUrl },
    ],
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-wrap mx-auto px-7 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-[6px] text-[13px] text-ink3 mb-8 flex-wrap">
          <Link href="/" className="hover:text-moss transition-colors">Inicio</Link>
          <span className="text-border">/</span>
          <Link href={`/nivel/${article.nivel}`} className="hover:text-moss transition-colors">
            {NIVEL_LABEL[article.nivel]}
          </Link>
          <span className="text-border">/</span>
          <span className="text-ink line-clamp-1">{article.title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap mb-4">
              <span className={`inline-flex items-center text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-md ${NIVEL_CLASS[article.nivel]}`}>
                {NIVEL_LABEL[article.nivel]}
              </span>
              <span className="inline-flex items-center text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-md bg-[#F5F3FF] text-[#5B21B6]">
                {CATEGORIA_LABEL[article.categoria] ?? article.categoria}
              </span>
              {article.nuevo && (
                <span className="inline-flex items-center text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-md bg-gold text-forest">
                  Nuevo
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-fraunces text-[40px] font-black text-ink leading-[1.12] mb-4 max-sm:text-[28px]">
              {article.title}
            </h1>

            {/* Meta bar */}
            <div className="flex items-center gap-4 text-[13px] text-ink3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-cream border border-border px-3 py-[5px] rounded-full font-medium">
                📖 {article.lectura} min de lectura
              </span>
              <time dateTime={article.fecha}>
                {new Date(article.fecha).toLocaleDateString('es-ES', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
            </div>

            {/* Resuelve strip */}
            <div className="bg-cream border-l-[3px] border-sage rounded-r-xl px-5 py-4 mb-8">
              <div className="text-[11px] font-bold uppercase tracking-[.08em] text-sage mb-1">
                Este artículo resuelve
              </div>
              <p className="text-[15px] font-semibold text-forest leading-[1.4]">
                {article.resuelve}
              </p>
            </div>

            {/* Article Content */}
            <article
              className="prose prose-base max-w-none
                prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight
                prose-h2:text-[26px] prose-h2:font-black prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-[20px] prose-h3:font-bold prose-h3:mt-7 prose-h3:mb-3
                prose-p:text-[16px] prose-p:leading-[1.8] prose-p:text-ink2
                prose-a:text-moss prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink prose-strong:font-bold
                prose-li:text-[16px] prose-li:leading-[1.75] prose-li:text-ink2
                prose-ul:my-4 prose-ol:my-4
                prose-blockquote:border-sage prose-blockquote:bg-cream prose-blockquote:rounded-r-xl prose-blockquote:py-1
                prose-table:text-[14px] prose-th:bg-mist prose-th:text-forest
                prose-code:text-moss prose-code:bg-mist prose-code:px-1 prose-code:rounded
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Ad — rectangle after content */}
            <div className="mt-10">
              <p className="text-[11px] text-ink3/50 mb-1 uppercase tracking-[.08em]">Publicidad</p>
              <AdUnit slot="1234567890" format="rectangle" />
            </div>

            {/* Share buttons */}
            <div className="mt-8 pt-8 border-t border-border">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            {/* Prev / Next navigation */}
            {(prevArticle || nextArticle) && (
              <nav className="mt-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1" aria-label="Navegación entre artículos">
                {prevArticle ? (
                  <Link
                    href={`/articulo/${prevArticle.slug}`}
                    className="group flex flex-col gap-1 bg-white border border-border rounded-xl p-4 hover:border-sage hover:shadow-card transition-all"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[.08em] text-ink3">← Artículo anterior</span>
                    <span className="font-fraunces text-[14px] font-bold text-ink leading-[1.3] group-hover:text-moss transition-colors line-clamp-2">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : <div />}
                {nextArticle ? (
                  <Link
                    href={`/articulo/${nextArticle.slug}`}
                    className="group flex flex-col gap-1 bg-white border border-border rounded-xl p-4 hover:border-sage hover:shadow-card transition-all text-right"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[.08em] text-ink3">Artículo siguiente →</span>
                    <span className="font-fraunces text-[14px] font-bold text-ink leading-[1.3] group-hover:text-moss transition-colors line-clamp-2">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : <div />}
              </nav>
            )}

            {/* Ad — horizontal before related articles */}
            <div className="mt-10">
              <p className="text-[11px] text-ink3/50 mb-1 uppercase tracking-[.08em]">Publicidad</p>
              <AdUnit slot="0987654321" format="horizontal" />
            </div>

            {/* More articles grid — mobile TOC + related */}
            {moreArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="font-fraunces text-[22px] font-bold text-ink mb-5">
                  También te puede interesar
                </h2>
                <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                  {moreArticles.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} variant="third" gradientIndex={i + 2} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <ArticleSidebar headings={headings} related={related} />
        </div>
      </div>
    </>
  )
}
