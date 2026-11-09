export interface Heading {
  level: 2 | 3
  text: string
  id: string
}

/** Converts a heading text into a URL-safe anchor ID (matches rehype-slug output) */
export function headingToId(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Extracts h2/h3 headings from raw MDX/Markdown source */
export function extractHeadings(source: string): Heading[] {
  return source
    .split('\n')
    .filter(line => /^#{2,3}\s/.test(line))
    .map(line => {
      const level = line.startsWith('### ') ? 3 : 2
      const text = line.replace(/^#{2,3}\s+/, '').trim()
      return { level, text, id: headingToId(text) }
    })
}

/** Estimated reading time in minutes */
export function readingTime(source: string): number {
  const words = source.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/** Absolute site URL helper */
const CANONICAL_ORIGIN = 'https://www.dinerofuturo.online'

export function siteUrl(path = ''): string {
  // La variable de entorno solo se respeta si ya apunta al dominio canónico (www) o a localhost.
  // Cualquier otro valor (p. ej. el dominio sin www) se ignora para no volver a generar
  // canonicals, sitemap o robots hacia una URL que redirige.
  const env = process.env.NEXT_PUBLIC_SITE_URL
  const base = env && /^(https:\/\/www\.dinerofuturo\.online|http:\/\/localhost(:\d+)?)\/?$/.test(env) ? env : CANONICAL_ORIGIN
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`)
}
