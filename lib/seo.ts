/** Recorta un título para la etiqueta <title> (Google corta en ~60 caracteres). */
const DANGLING = new Set([
  'a', 'al', 'con', 'cuando', 'cuándo', 'de', 'del', 'el', 'en', 'es', 'esta', 'estás', 'la', 'las', 'lo', 'los',
  'mi', 'mis', 'o', 'para', 'por', 'que', 'qué', 'se', 'si', 'sin', 'su', 'sus', 'tu', 'tus', 'un', 'una', 'y',
  'cómo', 'como', 'cuál', 'cuánto', 'dónde', 'vs', 'te', 'me', 'nos', 'no', 'algo', 'mejor', 'más', 'muy', 'ni', 'hay', 'ya',
])

/** Recorta un título para la etiqueta <title> (Google corta en ~60 caracteres). */
export function seoTitle(title: string, max = 60): string {
  const t = title.trim()
  if (t.length <= max) return t

  // 1) Primera cláusula si cabe y tiene entidad ("Tema: subtítulo" → "Tema")
  const clause = t.split(/\s*[:—–|]\s*/)[0]
  if (clause.length >= 25 && clause.length <= max) return clause

  // 2) Cortar en límite de palabra sin dejar conectores colgando
  const words = t.slice(0, max + 1).replace(/\s+\S*$/, '').split(/\s+/)
  const bare = (w: string) => w.toLowerCase().replace(/^[(¿¡"“'«]+|[,;:)"”'»]+$/g, '')
  while (words.length > 3 && DANGLING.has(bare(words[words.length - 1]))) words.pop()
  let out = words.join(' ').replace(/[\s,;:¿¡(–—-]+$/, '')
  // Paréntesis sin cerrar → quitar la cola abierta
  if ((out.match(/\(/g) ?? []).length > (out.match(/\)/g) ?? []).length) {
    out = out.slice(0, out.lastIndexOf('(')).replace(/[\s,;:¿¡–—-]+$/, '')
  }
  return out
}

/** Recorta una descripción para meta description (~155 caracteres). */
export function seoDescription(text: string, max = 155): string {
  const t = text.trim()
  if (t.length <= max) return t

  // Preferir terminar en una frase completa
  const head = t.slice(0, max)
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('? '), head.lastIndexOf('! '))
  if (sentenceEnd >= 80) return head.slice(0, sentenceEnd + 1)

  const cut = t.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,;:¿¡(–—-]+$/, '')
  return `${cut}…`
}

export interface FaqItem { question: string; answer: string }

function plain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extrae pares pregunta/respuesta de los H2/H3 que son preguntas ("¿…?"), con la
 * respuesta tomada del primer párrafo que les sigue. Todo el texto ya está visible
 * en la página, como exige schema.org para FAQPage.
 */
export function extractFaq(content: string, max = 6): FaqItem[] {
  const lines = content.split('\n')
  const items: FaqItem[] = []
  for (let i = 0; i < lines.length && items.length < max; i++) {
    const m = /^#{2,3}\s+(.*\?)\s*$/.exec(lines[i])
    if (!m) continue
    const question = plain(m[1])
    // Hasta 2 párrafos (la primera frase suele ser solo una introducción)
    const paras: string[] = []
    let cur: string[] = []
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j]
      if (/^#{1,6}\s/.test(l) || /^(\||```|---)/.test(l.trim())) break
      if (!l.trim()) {
        if (cur.length) { paras.push(cur.join(' ')); cur = [] }
        if (paras.length >= 2) break
        continue
      }
      cur.push(l)
    }
    if (cur.length && paras.length < 2) paras.push(cur.join(' '))
    let answer = plain(paras.join(' '))
    // Una respuesta que termina en ":" es una introducción a una lista, no una respuesta
    if (answer.length < 80 || /[:：]\s*$/.test(answer) || /[:：]\s*$/.test(plain(paras[0] ?? ''))) continue
    if (answer.length > 320) {
      const cut = answer.slice(0, 320)
      const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '))
      answer = end > 120 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, '') + '…'
    }
    items.push({ question, answer })
  }
  return items.length >= 2 ? items : []
}
