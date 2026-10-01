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
  while (words.length > 3 && DANGLING.has(words[words.length - 1].toLowerCase().replace(/[,;:]+$/, ''))) words.pop()
  return words.join(' ').replace(/[\s,;:¿¡(–—-]+$/, '')
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
