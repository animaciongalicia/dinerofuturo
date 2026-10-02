import type { Article } from './types'

export interface LinkTarget { phrase: string; href: string; slug?: string }

const LEAD_STRIP = /^(¿\s*)?(qué es|que es|qué son|cómo|como|cuánto|cuánta|cuándo|por qué|guía de|guía para)\s+(el|la|los|las|un|una|unos|unas)?\s*/i

/** Frase ancla candidata a partir del título: cláusula inicial sin interrogativos */
export function anchorFromTitle(title: string): string | null {
  const head = title.split(/\s*[:—–?¿!]\s*/).map(s => s.trim()).filter(Boolean)[0] ?? ''
  const phrase = head.replace(LEAD_STRIP, '').replace(/[.,;]+$/, '').trim()
  const words = phrase.split(/\s+/)
  if (words.length < 2 || words.length > 5 || phrase.length < 10) return null
  return phrase
}

/** Herramientas: frases que merecen enlazar a la calculadora */
export const TOOL_TARGETS: LinkTarget[] = [
  { phrase: 'calculadora de interés compuesto', href: '/herramientas/interes-compuesto' },
  { phrase: 'calculadora de hipoteca', href: '/herramientas/calculadora-hipoteca' },
  { phrase: 'calculadora del fondo de emergencia', href: '/herramientas/fondo-emergencia' },
  { phrase: 'calculadora de fondo de emergencia', href: '/herramientas/fondo-emergencia' },
  { phrase: 'número FIRE', href: '/herramientas/numero-fire' },
  { phrase: 'calculadora de objetivo de ahorro', href: '/herramientas/objetivo-ahorro' },
]

/** Temas troncales: frase natural en el texto → artículo de referencia (pilar) */
const CURATED: Array<[string, string]> = [
  ['fondo de emergencia', 'fondo-de-emergencia-cuanto-necesitas'],
  ['interés compuesto', 'que-es-el-interes-compuesto-ejemplos-reales'],
  ['gastos hormiga', 'gastos-hormiga-fugas-invisibles-presupuesto'],
  ['inflación', 'que-es-la-inflacion-y-como-te-afecta'],
  ['fondo indexado', 'etf-vs-fondo-indexado-diferencias'],
  ['fondos indexados', 'etf-vs-fondo-indexado-diferencias'],
  ['fondo de inversión', 'que-es-un-fondo-de-inversion'],
  ['fondos de inversión', 'que-es-un-fondo-de-inversion'],
  ['euríbor', 'euribor-que-es-como-afecta-tu-hipoteca'],
  ['plan de pensiones', 'plan-de-pensiones-merece-la-pena-2026'],
  ['planes de pensiones', 'plan-de-pensiones-merece-la-pena-2026'],
  ['letras del Tesoro', 'letras-del-tesoro-como-comprarlas-paso-a-paso'],
  ['renta fija', 'renta-fija-que-es-como-invertir'],
  ['diversificar', 'correlacion-entre-activos-como-diversificar-cartera'],
  ['diversificación', 'correlacion-entre-activos-como-diversificar-cartera'],
  ['rebalancear', 'rebalancear-cartera-inversion-como-cuando'],
  ['regla del 72', 'regla-del-72-explicada'],
  ['cuenta remunerada', 'mejores-cuentas-remuneradas-2026'],
  ['cuentas remuneradas', 'mejores-cuentas-remuneradas-2026'],
  ['neobanco', 'neobanco-vs-banco-tradicional-cual-elegir'],
  ['neobancos', 'neobanco-vs-banco-tradicional-cual-elegir'],
  ['presupuesto personal', 'como-hacer-un-presupuesto-personal-que-funcione'],
  ['salir de deudas', 'como-salir-de-deudas-rapido-plan-paso-a-paso'],
  ['independencia financiera', 'independencia-financiera-que-es-como-lograrla'],
  ['stablecoins', 'stablecoins-que-son-como-funcionan-para-principiantes'],
  ['blockchain', 'blockchain-que-es-explicacion-simple'],
  ['smart contracts', 'smart-contracts-que-son-como-funcionan'],
  ['staking', 'staking-criptomonedas-como-funciona-ingresos-pasivos'],
  ['hipoteca variable', 'hipoteca-fija-vs-variable-cual-elegir'],
  ['hipoteca fija', 'hipoteca-fija-vs-variable-cual-elegir'],
  ['tarjeta de crédito', 'tarjeta-credito-trampa-o-herramienta'],
  ['ingresos irregulares', 'gestionar-ingresos-irregulares'],
  ['sistema de sobres', 'sistema-sobres-digital-controlar-dinero'],
  ['comprar Bitcoin', 'como-comprar-bitcoin-de-forma-segura'],
]

/** Frases poco naturales como ancla: listas, comparativas, años… */
const BAD_ANCHOR = /[,()\d]|\bvs\b|\bvs\.|\by\b.*\by\b/i

/** Construye el diccionario frase → URL. Los temas troncales van primero; las frases
 *  derivadas de títulos se descartan si son ambiguas (varios artículos) para no canibalizar. */
export function buildTargets(articles: Article[]): LinkTarget[] {
  const slugs = new Set(articles.map(a => a.slug))
  const curated: LinkTarget[] = CURATED
    .filter(([, slug]) => slugs.has(slug))
    .map(([phrase, slug]) => ({ phrase, href: `/articulo/${slug}`, slug }))
    .sort((x, y) => y.phrase.length - x.phrase.length)
  const curatedPhrases = new Set(curated.map(t => t.phrase.toLowerCase()))

  const byPhrase = new Map<string, Article[]>()
  for (const a of articles) {
    const p = anchorFromTitle(a.title)
    if (!p || BAD_ANCHOR.test(p) || curatedPhrases.has(p.toLowerCase())) continue
    const k = p.toLowerCase()
    byPhrase.set(k, [...(byPhrase.get(k) ?? []), a])
  }
  const derived: LinkTarget[] = []
  byPhrase.forEach(list => {
    if (list.length !== 1) return
    const a = list[0]
    derived.push({ phrase: anchorFromTitle(a.title)!, href: `/articulo/${a.slug}`, slug: a.slug })
  })
  derived.sort((x, y) => y.phrase.length - x.phrase.length)
  return [...TOOL_TARGETS, ...curated, ...derived]
}

const SKIP_TAGS = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style', 'th', 'button'])

function escapeRe(s: string): string { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

/**
 * Inserta enlaces internos contextuales en el HTML ya renderizado.
 * - Solo en texto de párrafos/listas (no en encabezados, enlaces, código ni tablas de cabecera)
 * - Primera aparición de cada frase, cada destino una sola vez, nunca a la propia página
 * - Máximo `max` enlaces automáticos por página
 */
export function autoLink(html: string, selfSlug: string, targets: LinkTarget[], max = 4): { html: string; added: LinkTarget[] } {
  const parts = html.split(/(<[^>]+>)/)
  // Destinos que el artículo ya enlaza a mano: no se repiten
  const used = new Set<string>(Array.from(html.matchAll(/href="([^"#?]+)/g), m => m[1]))
  const added: LinkTarget[] = []
  const stack: string[] = []
  const candidates = targets.filter(t => t.slug !== selfSlug)

  const res = parts.map(tok => {
    if (tok.startsWith('<')) {
      const m = /^<\/?\s*([a-zA-Z0-9]+)/.exec(tok)
      if (m) {
        const tag = m[1].toLowerCase()
        if (tok.startsWith('</')) { const i = stack.lastIndexOf(tag); if (i >= 0) stack.splice(i, 1) }
        else if (SKIP_TAGS.has(tag) && !tok.endsWith('/>')) stack.push(tag)
      }
      return tok
    }
    if (added.length >= max || stack.length) return tok
    let text = tok
    for (const t of candidates) {
      if (added.length >= max) break
      if (used.has(t.href)) continue
      const re = new RegExp(`(^|[^\\p{L}\\p{N}-])(${escapeRe(t.phrase)})(?![\\p{L}\\p{N}-])`, 'iu')
      const m = re.exec(text)
      if (!m) continue
      const start = m.index + m[1].length
      const matched = m[2]
      text = text.slice(0, start) + `<a href="${t.href}">${matched}</a>` + text.slice(start + matched.length)
      used.add(t.href); added.push(t)
    }
    return text
  })
  return { html: res.join(''), added }
}
