'use client'

import Link from 'next/link'
import Search from './Search'
import { useState, useRef, useEffect } from 'react'

const MAS_LINKS = [
  { href: '/que-hacer-con-mi-dinero', label: '¿Qué hago con mi dinero?', emoji: '🧭', desc: 'Plan personalizado en 5 preguntas' },
  { href: '/herramientas',            label: 'Herramientas',             emoji: '🧮', desc: 'Calculadoras financieras' },
  { href: '/categoria/hipotecas',     label: 'Hipotecas',                emoji: '🏠', desc: 'Euríbor, tipos, gastos y más' },
  { href: '/categoria/banca',         label: 'Neobancos',                emoji: '📱', desc: 'Revolut, Trade Republic, Wise' },
  { href: '/finanzas-personales',     label: 'Finanzas personales',      emoji: '💡', desc: 'Pareja, autónomos, irregulares' },
  { href: '/categoria/comparativa',   label: 'Comparativas',             emoji: '📊', desc: 'Brókers, cuentas y productos' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="sticky top-0 z-[100] bg-paper/95 backdrop-blur-md border-b border-border">
      <div className="max-w-wrap mx-auto px-7 flex items-center gap-0 h-[58px]">

        {/* Logo */}
        <Link
          href="/"
          className="font-fraunces text-[20px] font-black text-forest mr-8 whitespace-nowrap flex-shrink-0"
        >
          Dinero <em className="not-italic text-gold">Futuro</em>
        </Link>

        {/* Niveles — siempre visibles */}
        <div className="flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { href: '/nivel/0', label: 'Nivel 0 — Empezar' },
            { href: '/nivel/1', label: 'Nivel 1 — Ahorrar' },
            { href: '/nivel/2', label: 'Nivel 2 — Invertir' },
            { href: '/nivel/3', label: 'Nivel 3 — Cripto' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-medium text-ink3 px-[13px] h-[58px] flex items-center whitespace-nowrap border-b-2 border-transparent hover:text-moss hover:border-sage transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Dropdown "Más" */}
        <div className="relative flex-shrink-0" ref={ref}>
          <button
            onClick={() => setOpen(v => !v)}
            className={`text-[13px] font-medium px-[13px] h-[58px] flex items-center gap-1 whitespace-nowrap border-b-2 transition-colors cursor-pointer
              ${open ? 'text-forest border-forest' : 'text-ink3 border-transparent hover:text-moss hover:border-sage'}`}
          >
            Más
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </button>

          {open && (
            <div className="absolute top-[58px] left-0 bg-paper border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-[280px] py-2 z-50">
              {MAS_LINKS.map(({ href, label, emoji, desc }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-[10px] hover:bg-cream transition-colors group"
                >
                  <span className="text-[20px] mt-[1px] flex-shrink-0">{emoji}</span>
                  <div>
                    <div className="text-[13.5px] font-semibold text-ink group-hover:text-forest transition-colors leading-tight">
                      {label}
                    </div>
                    <div className="text-[11.5px] text-ink3 mt-[2px] leading-tight">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Espaciador */}
        <div className="flex-1" />

        {/* Right: Search + CTA */}
        <div className="flex items-center gap-[10px] flex-shrink-0 ml-4">
          <Search />
          <button className="bg-forest text-white border-none px-[18px] py-2 rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-moss transition-colors whitespace-nowrap max-lg:hidden">
            Suscribirme gratis
          </button>
        </div>

      </div>
    </nav>
  )
}
