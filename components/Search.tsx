'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import type Fuse from 'fuse.js'

const NIVEL_LABEL: Record<number, string> = {
  0: 'N0', 1: 'N1', 2: 'N2', 3: 'N3',
}
const NIVEL_CLASS: Record<number, string> = {
  0: 'bg-[#E8F4FD] text-[#1A6FA8]',
  1: 'bg-mist text-forest',
  2: 'bg-[#FEE2E2] text-[#991B1B]',
  3: 'bg-gold-light text-[#7C5C10]',
}

interface SearchItem {
  slug: string
  title: string
  extracto: string
  resuelve: string
  nivel: number
  categoria: string
  lectura: number
}

export default function Search() {
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState<SearchItem[]>([])
  const [open, setOpen]         = useState(false)
  const [loading, setLoading]   = useState(false)

  const fuseRef   = useRef<Fuse<SearchItem> | null>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // Lazy-load index + Fuse on first keystroke
  const ensureFuse = useCallback(async () => {
    if (fuseRef.current) return
    setLoading(true)
    try {
      const [{ default: FuseClass }, res] = await Promise.all([
        import('fuse.js'),
        fetch('/api/search-index'),
      ])
      const data: SearchItem[] = await res.json()
      fuseRef.current = new FuseClass(data, {
        keys: [
          { name: 'title',    weight: 0.6 },
          { name: 'resuelve', weight: 0.3 },
          { name: 'extracto', weight: 0.1 },
        ],
        threshold: 0.35,
        minMatchCharLength: 2,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    if (!fuseRef.current) return
    const res = fuseRef.current.search(query.trim(), { limit: 6 })
    setResults(res.map(r => r.item))
  }, [query])

  // Close on outside click or Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
    }
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  async function handleFocus() {
    setOpen(true)
    await ensureFuse()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setOpen(true)
  }

  function handleSelect() {
    setOpen(false)
    setQuery('')
  }

  const showDropdown = open && (query.length > 0)

  return (
    <div ref={wrapRef} className="relative">
      {/* Input */}
      <label className="flex items-center gap-[7px] bg-cream border border-border rounded-lg px-[13px] py-[7px] text-[13px] text-ink3 w-[190px] hover:border-sage transition-colors cursor-text">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 opacity-60">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Busca tu problema…"
          className="bg-transparent outline-none w-full text-ink placeholder:text-ink3/70 font-sans"
          autoComplete="off"
          spellCheck={false}
        />
        {loading && (
          <div className="w-3 h-3 border-[1.5px] border-sage border-t-transparent rounded-full animate-spin flex-shrink-0" />
        )}
      </label>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-card-lg z-50 overflow-hidden min-w-[320px]">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-[13px] text-ink3">
              {query.length < 2
                ? 'Escribe al menos 2 letras…'
                : `Sin resultados para "${query}"`
              }
            </div>
          ) : (
            <>
              <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[.08em] text-ink3 border-b border-border">
                {results.length} resultado{results.length !== 1 ? 's' : ''}
              </div>
              {results.map(item => (
                <Link
                  key={item.slug}
                  href={`/articulo/${item.slug}`}
                  onClick={handleSelect}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-cream transition-colors border-b border-border2 last:border-b-0 group"
                >
                  <span className={`inline-flex items-center text-[9px] font-bold tracking-[.06em] uppercase px-[6px] py-[3px] rounded flex-shrink-0 mt-[2px] ${NIVEL_CLASS[item.nivel]}`}>
                    {NIVEL_LABEL[item.nivel]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-ink leading-[1.3] group-hover:text-moss transition-colors line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[11.5px] text-ink3 mt-[2px] line-clamp-1">
                      {item.resuelve}
                    </div>
                  </div>
                  <span className="text-[11px] text-ink3 flex-shrink-0 mt-[2px]">
                    {item.lectura} min
                  </span>
                </Link>
              ))}
              <Link
                href={`/?q=${encodeURIComponent(query)}`}
                onClick={handleSelect}
                className="flex items-center justify-center gap-2 px-4 py-2 text-[12.5px] font-semibold text-moss hover:text-forest hover:bg-mist transition-colors"
              >
                Ver todos los resultados →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
