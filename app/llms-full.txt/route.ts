import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'

// Texto completo de todos los artículos en Markdown plano, para que un modelo lo lea de una vez
export const dynamic = 'force-static'

export function GET() {
  const articles = getAllArticles()

  const body = [
    '# Dinero Futuro — contenido completo',
    '',
    '> Educación financiera práctica en español. Contenido educativo, no asesoramiento financiero personalizado.',
    `> Índice resumido: ${siteUrl('/llms.txt')}`,
    '',
    ...articles.map(a =>
      [
        '---',
        '',
        `# ${a.title}`,
        '',
        `URL: ${siteUrl(`/articulo/${a.slug}`)}`,
        `Fecha: ${a.fecha} · Nivel ${a.nivel} · Categoría: ${a.categoria}${a.pais ? ` · País: ${a.pais}` : ''}`,
        `Resuelve: ${a.resuelve}`,
        '',
        (a.content ?? "").trim(),
        '',
      ].join('\n'),
    ),
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
