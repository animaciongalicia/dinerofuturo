import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Article } from './types'

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articulos')
const WORDS_PER_MINUTE = 200

// Module-level cache so getAllArticles() only reads disk once per build
let _cache: Article[] | null = null

function calcReadingTime(content: string): number {
  const clean = content
    .replace(/```[\s\S]*?```/g, '')  // code blocks
    .replace(/`[^`]*`/g, '')          // inline code
    .replace(/#{1,6} /g, '')          // headings
    .replace(/[*_~[\]()!|]/g, '')     // markdown symbols
    .replace(/https?:\/\/\S+/g, '')   // URLs
    .replace(/\s+/g, ' ')
    .trim()
  const words = clean.split(' ').filter(w => w.length > 0).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function readArticle(filename: string): Article {
  const fullPath = path.join(ARTICLES_DIR, filename)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug:      data.slug      as string,
    title:     data.title     as string,
    fecha:     data.fecha     as string,
    nivel:     data.nivel     as 0 | 1 | 2 | 3,
    categoria: data.categoria as Article['categoria'],
    resuelve:  data.resuelve  as string,
    extracto:  data.extracto  as string,
    lectura:   calcReadingTime(content),   // calculado, ignora frontmatter
    destacado: data.destacado as boolean | undefined,
    nuevo:     data.nuevo     as boolean | undefined,
    content,
  }
}

export function getAllArticles(): Article[] {
  if (_cache) return _cache
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'))
  _cache = files
    .map(f => readArticle(f))
    .sort((a, b) => (a.fecha > b.fecha ? -1 : 1))
  return _cache
}

export function getArticleBySlug(slug: string): Article {
  // filename === slug + '.mdx' by convention — direct read, no scan
  const filename = `${slug}.mdx`
  const fullPath = path.join(ARTICLES_DIR, filename)
  if (!fs.existsSync(fullPath)) throw new Error(`Article not found: ${slug}`)
  return readArticle(filename)
}

export function getFeaturedArticle(): Article {
  const all = getAllArticles()
  return all.find(a => a.destacado) ?? all[0]
}

export function getArticlesByNivel(nivel: number): Article[] {
  return getAllArticles().filter(a => a.nivel === nivel)
}

export function getArticlesByCategoria(categoria: string): Article[] {
  return getAllArticles().filter(a => a.categoria === categoria)
}

export function getRecentArticles(n: number): Article[] {
  return getAllArticles().slice(0, n)
}
