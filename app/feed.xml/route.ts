import { NextResponse } from 'next/server'
import { getRecentArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'

// Forzar regeneración en cada request (compatible con Vercel Edge Cache)
export const dynamic = 'force-dynamic'

function escapeXml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;')
}

function toRFC822(dateStr: string): string {
  // dateStr is ISO "YYYY-MM-DD" — parse as UTC noon to avoid timezone issues
  return new Date(`${dateStr}T12:00:00Z`).toUTCString()
}

export async function GET() {
  const articles = getRecentArticles(10)
  const feedUrl  = siteUrl('/feed.xml')
  const homeUrl  = siteUrl('/')

  const items = articles
    .map(a => {
      const link    = siteUrl(`/articulo/${a.slug}`)
      const pubDate = toRFC822(a.fecha)
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.extracto)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(a.categoria)}</category>
      <author>hola@dinerofuturo.online (Dinero Futuro)</author>
    </item>`
    })
    .join('\n')

  const lastBuildDate = articles.length > 0
    ? toRFC822(articles[0].fecha)
    : new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Dinero Futuro</title>
    <link>${homeUrl}</link>
    <description>Educación financiera práctica para personas normales. Sin jerga, sin humo, sin venderte nada que no te sirva.</description>
    <language>es</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl('/og-default.png')}</url>
      <title>Dinero Futuro</title>
      <link>${homeUrl}</link>
    </image>
${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
