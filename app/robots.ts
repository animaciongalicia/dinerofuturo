import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dinerofuturo.online'

// Rastreadores de buscadores con IA y asistentes. Declararlos explícitamente evita
// ambigüedades; para bloquear alguno basta con moverlo a `disallow`.
const AI_CRAWLERS = [
  'GPTBot',            // OpenAI — entrenamiento
  'OAI-SearchBot',     // OpenAI — búsqueda de ChatGPT
  'ChatGPT-User',      // OpenAI — navegación a petición del usuario
  'ClaudeBot',         // Anthropic — entrenamiento
  'Claude-SearchBot',  // Anthropic — búsqueda
  'Claude-User',       // Anthropic — navegación a petición del usuario
  'PerplexityBot',     // Perplexity — índice de búsqueda
  'Perplexity-User',   // Perplexity — navegación a petición del usuario
  'Google-Extended',   // Google — Gemini / Vertex
  'Applebot-Extended', // Apple Intelligence
  'Bingbot',           // Bing (alimenta a Copilot y a otros asistentes)
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
