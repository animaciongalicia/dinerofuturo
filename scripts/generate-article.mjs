#!/usr/bin/env node
/**
 * generate-article.mjs
 * ─────────────────────────────────────────────────────────────
 * Genera automáticamente un artículo MDX usando la API de Anthropic,
 * lo guarda en content/articulos/ y hace git push a main.
 *
 * Requiere en el entorno:
 *   ANTHROPIC_API_KEY  → clave de Anthropic
 *
 * Uso manual:
 *   node scripts/generate-article.mjs
 *
 * Uso en GitHub Actions: se ejecuta en el workflow publish.yml
 * ─────────────────────────────────────────────────────────────
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

// ── Cola SEO: si existe queue.json, delega en generate-from-queue.mjs ─────────
if (fs.existsSync(QUEUE_FILE)) {
  const { createRequire } = await import('module')
  const queueData = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'))
  const pending   = queueData.queue.filter(i => i.status === 'pending')
  if (pending.length > 0) {
    console.log(`📋 Cola SEO encontrada — ${pending.length} artículos pendientes`)
    console.log('🔀 Delegando en generate-from-queue.mjs…')
    const { execSync: exec } = await import('child_process')
    exec('node scripts/generate-from-queue.mjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    process.exit(0)
  } else {
    console.log('📋 Cola SEO vacía — usando generación aleatoria de respaldo')
  }
}

const NIVELES    = [0, 1, 2, 3]
const CATEGORIAS = [
  'ahorro', 'inversion', 'cripto', 'presupuesto',
  'hipotecas', 'banca', 'finanzas', 'comparativa',
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function rotate(arr, current) {
  const idx = arr.indexOf(current)
  return idx === -1 ? arr[0] : arr[(idx + 1) % arr.length]
}

// ── Paso 1: leer artículos existentes ─────────────────────────────────────────

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
        fecha:     data.fecha    ?? '2000-01-01',
      }
    })
    .sort((a, b) => (a.fecha > b.fecha ? -1 : 1)) // más reciente primero
}

// ── Paso 2–3: calcular nivel y categoría rotatorios ──────────────────────────

function calcNextNivelCategoria(articles) {
  if (articles.length === 0) {
    return { nivel: 0, categoria: 'ahorro' }
  }
  const last      = articles[0]
  const nivel     = rotate(NIVELES, last.nivel)
  const categoria = rotate(CATEGORIAS, last.categoria)
  return { nivel, categoria }
}

// ── Paso 4: llamar a Anthropic ───────────────────────────────────────────────

async function generateWithClaude({ nivel, categoria, existingTitles }) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const systemPrompt = `Eres un escritor experto en educación financiera para toda la hispanosfera: España, México, Argentina, Colombia, Chile y el resto de América Latina.

AUDIENCIA Y GEOGRAFÍA:
- Escribe en español neutro, válido para TODA la hispanosfera
- Evita referencias exclusivas a un solo país (no pongas solo Euríbor, Hacienda española, AFORE mexicana, etc.)
- Cuando hagas referencia a productos o normativas locales, menciona alternativas de otros países o indica "en tu país puede llamarse diferente"
- Ejemplos numéricos con moneda genérica (ej: "si ganas 2.000 al mes") sin símbolo de moneda específico
- Los dolores financieros son universales: deudas, ahorro, inversión, vivienda, jubilación

ESTILO OBLIGATORIO:
- Lenguaje de la calle, como si se lo explicaras a un amigo en un bar
- Cero jerga financiera — si usas un término técnico lo explicas en la misma frase con un ejemplo cotidiano
- Frases cortas. Párrafos de máximo 3 líneas.
- Tono directo, cercano, sin humo
- Nunca uses: paradigma, holístico, robusto, sinergia, empoderamiento, disruptivo
- Español neutro válido para toda la hispanosfera

CADA ARTÍCULO RESUELVE UN PROBLEMA CONCRETO:
- Empieza con el dolor del lector (2-3 frases que le hagan pensar "esto me está hablando a mí")
- Explica por qué ocurre ese problema (simple, sin culpar al lector)
- Da la solución paso a paso con ejemplos numéricos reales
- Lista los errores más comunes a evitar
- Termina con 3 puntos clave y UNA acción concreta para hoy

FORMATO MDX:
- Subtítulos con ## y ###
- Listas con - para escanear rápido en móvil
- Negrita solo en lo más importante (máximo 5 por artículo)
- 900-1200 palabras exactas
- Visualmente atractivo para leer en móvil`

  const titlesBlock = existingTitles.length > 0
    ? existingTitles.map(t => `- ${t}`).join('\n')
    : '(ninguno aún)'

  const userPrompt = `Escribe un artículo completo en MDX.

Nivel: ${nivel}
(0=absoluto principiante, 1=ahorro básico, 2=inversión, 3=cripto y avanzado)

Categoría: ${categoria}

Artículos ya publicados — NO repitas estos temas:
${titlesBlock}

Devuelve ÚNICAMENTE el MDX con este frontmatter exacto (sin texto antes ni después):

---
title: "TÍTULO ATRACTIVO Y DIRECTO"
slug: "slug-sin-tildes-ni-espacios"
fecha: "${today()}"
nivel: ${nivel}
categoria: "${categoria}"
resuelve: "El problema concreto que resuelve en una frase"
extracto: "1-2 frases para mostrar en la portada"
lectura: [minutos estimados como número]
destacado: false
nuevo: true
---

[CONTENIDO MDX COMPLETO AQUÍ]

No incluyas nada antes del --- inicial ni después del contenido.`

  console.log(`\n🤖 Llamando a Claude (nivel ${nivel}, categoría ${categoria})…`)

  const message = await client.messages.create({
    model:      'claude-opus-4-5',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const raw = message.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')
    .trim()

  return raw
}

// ── Paso 5: extraer slug y guardar ────────────────────────────────────────────

function extractSlug(mdxContent) {
  const match = mdxContent.match(/^slug:\s*"?([^"\n]+)"?/m)
  if (!match) throw new Error('No se encontró el campo slug en el frontmatter generado.')
  return match[1].trim()
}

function saveArticle(mdxContent, slug) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true })
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`)

  if (fs.existsSync(filepath)) {
    const timestamp = Date.now()
    const newSlug   = `${slug}-${timestamp}`
    console.warn(`⚠️  Slug "${slug}" ya existe — guardando como "${newSlug}"`)
    fs.writeFileSync(
      path.join(ARTICLES_DIR, `${newSlug}.mdx`),
      mdxContent.replace(/^slug:.*$/m, `slug: "${newSlug}"`),
      'utf-8',
    )
    return newSlug
  }

  fs.writeFileSync(filepath, mdxContent, 'utf-8')
  return slug
}

// ── Paso 6: git commit + push ─────────────────────────────────────────────────

function gitPush(slug) {
  const relPath = `content/articulos/${slug}.mdx`

  try {
    execSync('git config user.email "bot@dinerofuturo.com"', { stdio: 'pipe' })
    execSync('git config user.name "DineroFuturo Bot"',      { stdio: 'pipe' })
    execSync(`git add "${relPath}"`,                          { stdio: 'pipe' })
    execSync(`git commit -m "📝 ${slug}"`,                   { stdio: 'pipe' })
    execSync('git push origin main',                          { stdio: 'inherit' })
    console.log('✅ Pushed a main.')
  } catch (err) {
    // El push puede fallar en local si no hay remote — no es fatal
    console.warn('⚠️  Git push falló (normal en local):', err.message?.split('\n')[0])
  }
}

// ── Paso 7: log final ─────────────────────────────────────────────────────────

function logSummary({ slug, nivel, categoria, mdxContent }) {
  const words = mdxContent.split(/\s+/).length
  console.log(`
╔══════════════════════════════════════════════════════╗
║  ✅ Artículo generado y publicado                    ║
╠══════════════════════════════════════════════════════╣
║  Slug      : ${slug.padEnd(38)}║
║  Nivel     : ${String(nivel).padEnd(38)}║
║  Categoría : ${categoria.padEnd(38)}║
║  Palabras  : ~${String(words).padEnd(37)}║
╚══════════════════════════════════════════════════════╝
`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY no está configurada.')
    process.exit(1)
  }

  // 1. Leer artículos existentes
  const existing       = readExistingArticles()
  const existingTitles = existing.map(a => a.title).filter(Boolean)
  console.log(`📚 Artículos existentes: ${existing.length}`)

  // 2–3. Calcular nivel y categoría
  const { nivel, categoria } = calcNextNivelCategoria(existing)
  console.log(`🎯 Próximo: nivel ${nivel}, categoría "${categoria}"`)

  // 4. Generar con Claude
  const mdxContent = await generateWithClaude({ nivel, categoria, existingTitles })

  // Validar que tiene frontmatter
  if (!mdxContent.startsWith('---')) {
    console.error('❌ La respuesta no empieza con frontmatter ---')
    console.error(mdxContent.slice(0, 300))
    process.exit(1)
  }

  // 5. Guardar
  const slug     = extractSlug(mdxContent)
  const realSlug = saveArticle(mdxContent, slug)
  console.log(`💾 Guardado: content/articulos/${realSlug}.mdx`)

  // 6. Git push
  gitPush(realSlug)

  // 7. Log
  logSummary({ slug: realSlug, nivel, categoria, mdxContent })
}

main().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
