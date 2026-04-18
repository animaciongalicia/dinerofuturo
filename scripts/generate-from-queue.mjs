#!/usr/bin/env node
/**
 * generate-from-queue.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Genera artículos SEO desde content/queue.json en vez de rotar categorías
 * al azar. Cada entrada de la cola incluye keyword principal, keywords
 * secundarios, dolor del lector, sugerencias de interlinking y notas de
 * contexto — todo eso va al prompt de Claude para un artículo más preciso.
 *
 * Flujo:
 *   1. Lee content/queue.json
 *   2. Elige el artículo pending con mayor prioridad
 *   3. Genera MDX con Claude usando contexto rico (keywords + interlinking)
 *   4. Guarda el archivo en content/articulos/
 *   5. Marca el item como "published" en queue.json
 *   6. Git commit + push
 *
 * Requiere: ANTHROPIC_API_KEY en el entorno.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'
import matter from 'gray-matter'

const __dirname    = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articulos')
const QUEUE_FILE   = path.join(__dirname, '..', 'content', 'queue.json')

// ── Helpers ────────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

// ── Paso 1: leer cola editorial ────────────────────────────────────────────────

function readQueue() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.error('❌ No existe content/queue.json')
    process.exit(1)
  }
  const raw = fs.readFileSync(QUEUE_FILE, 'utf-8')
  return JSON.parse(raw)
}

// ── Paso 2: elegir el siguiente artículo ──────────────────────────────────────

function pickNextItem(queue) {
  const pending = queue.queue.filter(item => item.status === 'pending')
  if (pending.length === 0) {
    console.log('✅ La cola está vacía — no hay artículos pendientes.')
    process.exit(0)
  }

  // Ordenar por prioridad desc, luego por id asc como desempate
  pending.sort((a, b) => {
    if (b.prioridad !== a.prioridad) return b.prioridad - a.prioridad
    return a.id - b.id
  })

  const item = pending[0]
  console.log(`\n🎯 Artículo elegido:`)
  console.log(`   ID          : ${item.id}`)
  console.log(`   Slug        : ${item.slug}`)
  console.log(`   Keyword     : ${item.keyword_principal}`)
  console.log(`   Prioridad   : ${item.prioridad}/10`)
  console.log(`   Pendientes  : ${pending.length} restantes en cola`)
  return item
}

// ── Paso 3: leer artículos existentes para contexto ───────────────────────────

function readExistingArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw      = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug:      data.slug     ?? filename.replace('.mdx', ''),
        title:     data.title    ?? '',
        nivel:     data.nivel    ?? 1,
        categoria: data.categoria ?? 'ahorro',
      }
    })
}

// ── Paso 4: generar con Claude ────────────────────────────────────────────────

async function generateWithClaude(item, existingArticles) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const existingTitles = existingArticles.map(a => `  - ${a.title} [/${a.slug}]`).join('\n')

  // Construir lista de links internos sugeridos
  const interlinksEntrada = (item.interlinking_entrada || [])
    .map(slug => {
      const art = existingArticles.find(a => a.slug === slug)
      return art ? `  - "${art.title}" → /articulo/${slug}` : `  - /articulo/${slug}`
    })
    .join('\n')

  const interlinksSalida = (item.interlinking_salida || [])
    .map(href => `  - ${href}`)
    .join('\n')

  const systemPrompt = `Eres un escritor experto en educación financiera para toda la hispanosfera: España, México, Argentina, Colombia, Chile y el resto de América Latina.

AUDIENCIA Y GEOGRAFÍA:
- Escribe en español neutro, válido para TODA la hispanosfera
- Evita referencias exclusivas a un solo país salvo que el artículo sea específico de un país (indicado en el brief)
- Cuando hagas referencia a productos o normativas locales, menciona alternativas de otros países
- Ejemplos numéricos sin símbolo de moneda específico (ej: "si ganas 2.000 al mes")
- Los dolores financieros son universales: deudas, ahorro, inversión, vivienda, jubilación

ESTILO OBLIGATORIO:
- Lenguaje de la calle, como si se lo explicaras a un amigo en un bar
- Cero jerga financiera — si usas un término técnico lo explicas en la misma frase
- Frases cortas. Párrafos de máximo 3 líneas
- Tono directo, cercano, sin humo
- Nunca uses: paradigma, holístico, robusto, sinergia, empoderamiento, disruptivo
- Estructura con H2 claros y H3 cuando sean necesarios

SEO — REGLAS CRÍTICAS:
- La keyword principal debe aparecer de forma natural en el primer párrafo y en al menos 2 H2
- Variaciones de la keyword en el texto (no repetir exactamente siempre)
- Mínimo ${item.palabras_min} palabras de contenido real (sin frontmatter)
- Incluir una tabla comparativa o lista estructurada cuando aporte valor
- Terminar con una sección "Lo que puedes hacer hoy" o "Tu próximo paso" con acción concreta

INTERLINKING OBLIGATORIO:
- Incluir entre 4 y 7 enlaces internos usando la sintaxis Markdown: [texto del link](/articulo/slug)
- Los enlaces marcados como "entrada" en el brief son los más importantes — úsalos sí o sí
- Los enlaces de "salida" son a herramientas o secciones — úsalos donde aporten valor natural
- NO inventes slugs — usa exactamente los que te doy
- Los enlaces deben quedar integrados de forma natural en el texto, no forzada`

  const userPrompt = `Escribe el artículo MDX completo para este brief SEO:

KEYWORD PRINCIPAL: "${item.keyword_principal}"
KEYWORDS SECUNDARIOS: ${item.keywords_secundarios.join(', ')}
DOLOR QUE RESUELVE: "${item.dolor}"
NIVEL: ${item.nivel} (0=principiante absoluto, 1=básico, 2=intermedio, 3=avanzado/cripto)
CATEGORÍA: ${item.categoria}
${item.pais ? `PAÍS ESPECÍFICO: ${item.pais} — escribe pensando en lectores de ese país aunque en español neutro` : 'ALCANCE: Universal (toda la hispanosfera)'}
PALABRAS MÍNIMAS: ${item.palabras_min}
${item.notas ? `NOTAS DE CONTEXTO: ${item.notas}` : ''}

ENLACES INTERNOS QUE DEBES INCLUIR (entrada — obligatorios):
${interlinksEntrada || '  (ninguno especificado)'}

ENLACES INTERNOS ADICIONALES (salida — úsalos si encajan):
${interlinksSalida || '  (ninguno especificado)'}

ARTÍCULOS YA PUBLICADOS (no repitas estos temas):
${existingTitles}

Devuelve ÚNICAMENTE el MDX con este frontmatter exacto (sin texto antes ni después):

---
title: "TÍTULO ATRACTIVO Y DIRECTO — optimizado para CTR en buscadores"
slug: "${item.slug}"
fecha: "${today()}"
nivel: ${item.nivel}
categoria: "${item.categoria}"
${item.pais ? `pais: "${item.pais}"` : ''}
resuelve: "${item.dolor}"
extracto: "1-2 frases que resumen la solución y generan curiosidad para leer"
lectura: [minutos estimados como número]
destacado: false
nuevo: true
---

[CONTENIDO MDX COMPLETO AQUÍ — mínimo ${item.palabras_min} palabras]

No incluyas nada antes del --- inicial ni después del contenido.`

  console.log(`\n🤖 Llamando a Claude (nivel ${item.nivel}, categoría ${item.categoria})…`)
  console.log(`   Keyword: "${item.keyword_principal}"`)

  const message = await client.messages.create({
    model:      'claude-opus-4-5',
    max_tokens: 5000,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userPrompt }],
  })

  const raw = message.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')
    .trim()

  return raw
}

// ── Paso 5: guardar artículo ──────────────────────────────────────────────────

function saveArticle(mdxContent, slug) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true })
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`)

  if (fs.existsSync(filepath)) {
    const backup = `${slug}-${Date.now()}`
    console.warn(`⚠️  Slug "${slug}" ya existe — guardando como "${backup}"`)
    fs.writeFileSync(
      path.join(ARTICLES_DIR, `${backup}.mdx`),
      mdxContent.replace(/^slug:.*$/m, `slug: "${backup}"`),
      'utf-8',
    )
    return backup
  }

  fs.writeFileSync(filepath, mdxContent, 'utf-8')
  return slug
}

// ── Paso 6: actualizar queue.json ────────────────────────────────────────────

function markAsPublished(queueData, itemId, realSlug) {
  const item = queueData.queue.find(i => i.id === itemId)
  if (item) {
    item.status          = 'published'
    item.fecha_publicado = today()
    item.slug_real       = realSlug
  }
  queueData.metadata.ultima_actualizacion = today()
  queueData.metadata.pending = queueData.queue.filter(i => i.status === 'pending').length

  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queueData, null, 2), 'utf-8')
  console.log(`\n📋 queue.json actualizado — ${queueData.metadata.pending} artículos pendientes`)
}

// ── Paso 7: git commit + push ────────────────────────────────────────────────

function gitPush(slug, keyword) {
  const articlePath = `content/articulos/${slug}.mdx`
  const queuePath   = 'content/queue.json'

  try {
    execSync('git config user.email "bot@dinerofuturo.online"', { stdio: 'pipe' })
    execSync('git config user.name "DineroFuturo Bot"',         { stdio: 'pipe' })
    execSync(`git add "${articlePath}" "${queuePath}"`,          { stdio: 'pipe' })
    execSync(`git commit -m "📝 ${slug} [kw: ${keyword}]"`,     { stdio: 'pipe' })
    execSync('git push origin main',                             { stdio: 'inherit' })
    console.log('✅ Pushed a main.')
  } catch (err) {
    console.warn('⚠️  Git push falló (normal en local):', err.message?.split('\n')[0])
  }
}

// ── Log final ────────────────────────────────────────────────────────────────

function logSummary({ slug, item, mdxContent, queueData }) {
  const words   = mdxContent.split(/\s+/).length
  const pending = queueData.queue.filter(i => i.status === 'pending').length

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  ✅ Artículo generado y publicado                            ║
╠══════════════════════════════════════════════════════════════╣
║  Slug      : ${slug.padEnd(46)}║
║  Keyword   : ${item.keyword_principal.substring(0,46).padEnd(46)}║
║  Nivel     : ${String(item.nivel).padEnd(46)}║
║  Categoría : ${item.categoria.padEnd(46)}║
║  Palabras  : ~${String(words).padEnd(45)}║
║  Pendientes: ${String(pending).padEnd(46)}║
╚══════════════════════════════════════════════════════════════╝
`)
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY no está configurada.')
    process.exit(1)
  }

  // 1. Leer cola
  const queueData = readQueue()
  console.log(`📋 Cola cargada — ${queueData.queue.filter(i => i.status === 'pending').length} artículos pendientes`)

  // 2. Elegir artículo
  const item = pickNextItem(queueData)

  // 3. Contexto de artículos existentes
  const existing = readExistingArticles()
  console.log(`📚 Artículos existentes: ${existing.length}`)

  // 4. Generar
  const mdxContent = await generateWithClaude(item, existing)

  if (!mdxContent.startsWith('---')) {
    console.error('❌ La respuesta no empieza con frontmatter ---')
    console.error(mdxContent.slice(0, 300))
    process.exit(1)
  }

  // 5. Guardar
  const realSlug = saveArticle(mdxContent, item.slug)
  console.log(`💾 Guardado: content/articulos/${realSlug}.mdx`)

  // 6. Actualizar cola
  markAsPublished(queueData, item.id, realSlug)

  // 7. Git push
  gitPush(realSlug, item.keyword_principal)

  // Log
  logSummary({ slug: realSlug, item, mdxContent, queueData })
}

main().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
