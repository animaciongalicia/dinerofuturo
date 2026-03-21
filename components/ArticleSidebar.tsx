'use client'

import Link from 'next/link'
import type { Article } from '@/lib/types'
import type { Heading } from '@/lib/utils'

// ── Mini newsletter CTA ────────────────────────────────────────────────────────
function MiniNewsletter() {
  return (
    <div className="bg-forest rounded-xl p-5 text-white">
      <div className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-[6px]">Newsletter</div>
      <p className="font-fraunces text-[18px] font-bold leading-[1.3] mb-2">
        Una idea financiera cada lunes
      </p>
      <p className="text-[12.5px] text-white/60 leading-[1.5] mb-4">
        Sin jerga. Sin spam. Solo lo que necesitas saber.
      </p>
      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-2"
      >
        <input
          type="email"
          placeholder="tu@email.com"
          className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/35 outline-none focus:border-sage transition-colors font-sans"
        />
        <button
          type="submit"
          className="w-full bg-gold text-forest py-[9px] rounded-lg text-[13px] font-bold hover:brightness-110 transition-all"
        >
          Apuntarme gratis →
        </button>
      </form>
    </div>
  )
}

// ── Related articles ───────────────────────────────────────────────────────────
const NIVEL_CLASS: Record<number, string> = {
  0: 'bg-[#E8F4FD] text-[#1A6FA8]',
  1: 'bg-mist text-forest',
  2: 'bg-[#FEE2E2] text-[#991B1B]',
  3: 'bg-gold-light text-[#7C5C10]',
}

function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-3">
        Artículos relacionados
      </h3>
      <div className="flex flex-col gap-3">
        {articles.map(a => (
          <Link
            key={a.slug}
            href={`/articulo/${a.slug}`}
            className="group flex gap-3 items-start bg-white border border-border rounded-xl p-3 hover:border-mint hover:shadow-card transition-all"
          >
            <span
              className={`inline-flex items-center text-[9px] font-bold tracking-[.06em] uppercase px-2 py-[3px] rounded flex-shrink-0 mt-[2px] ${NIVEL_CLASS[a.nivel]}`}
            >
              N{a.nivel}
            </span>
            <span className="font-fraunces text-[13.5px] font-bold text-ink leading-[1.3] group-hover:text-moss transition-colors">
              {a.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Table of Contents ─────────────────────────────────────────────────────────
function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-3">
        En este artículo
      </h3>
      <nav>
        <ol className="flex flex-col gap-[2px]">
          {headings.map(({ level, text, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-[13px] text-ink3 hover:text-moss transition-colors py-[4px] border-l-2 border-transparent hover:border-sage ${
                  level === 3 ? 'pl-5 text-[12px]' : 'pl-3'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

// ── Main sidebar ──────────────────────────────────────────────────────────────
interface Props {
  headings: Heading[]
  related: Article[]
}

export default function ArticleSidebar({ headings, related }: Props) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-[280px] flex-shrink-0">
      {/* Sticky container */}
      <div className="sticky top-[76px] flex flex-col gap-6">
        {headings.length > 0 && (
          <div className="bg-white border border-border rounded-xl p-5">
            <TableOfContents headings={headings} />
          </div>
        )}
        <MiniNewsletter />
        {related.length > 0 && (
          <RelatedArticles articles={related} />
        )}
      </div>
    </aside>
  )
}
