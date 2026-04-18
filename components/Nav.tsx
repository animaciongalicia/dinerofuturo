'use client'

import Link from 'next/link'
import Search from './Search'

const PRIMARY_LINKS = [
  { href: '/empieza-aqui',  label: '👋 Empieza aquí' },
  { href: '/nivel/0',       label: 'Nivel 0 — Empezar', sep: true },
  { href: '/nivel/1',       label: 'Nivel 1 — Ahorrar' },
  { href: '/nivel/2',       label: 'Nivel 2 — Invertir' },
  { href: '/nivel/3',       label: 'Nivel 3 — Cripto' },
]

const SECONDARY_LINKS = [
  { href: '/categoria/inversion',   label: 'Inversión' },
  { href: '/categoria/ahorro',      label: 'Ahorro' },
  { href: '/categoria/presupuesto', label: 'Presupuesto' },
  { href: '/categoria/hipotecas',   label: 'Hipotecas' },
  { href: '/categoria/banca',       label: 'Neobancos' },
  { href: '/categoria/cripto',      label: 'Cripto' },
  { href: '/categoria/comparativa', label: 'Comparativas' },
  { href: '/categoria/jubilacion',  label: 'Jubilación' },
]

export default function Nav() {
  return (
    <nav className="sticky top-0 z-[100]">

      {/* ── Fila principal ── */}
      <div className="bg-paper border-b border-border">
        <div className="max-w-wrap mx-auto px-7 flex items-center h-[56px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-fraunces text-[20px] font-black text-forest mr-6 whitespace-nowrap flex-shrink-0"
          >
            Dinero <em className="not-italic text-gold">Futuro</em>
          </Link>

          {/* Links primarios */}
          <div className="flex gap-0 overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PRIMARY_LINKS.map(({ href, label, sep }) => (
              <div key={href} className="flex items-center flex-shrink-0">
                {sep && <div className="w-px h-[18px] bg-border mx-1 flex-shrink-0" />}
                <Link
                  href={href}
                  className="text-[13.5px] font-semibold text-ink2 px-[12px] h-[56px] flex items-center whitespace-nowrap border-b-2 border-transparent hover:text-forest hover:border-forest transition-colors"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Derecha: Búsqueda + CTA */}
          <div className="flex items-center gap-[10px] flex-shrink-0 ml-3">
            <Search />
            <button className="bg-forest text-white border-none px-[16px] py-2 rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-moss transition-colors whitespace-nowrap max-lg:hidden">
              Suscribirme
            </button>
          </div>

        </div>
      </div>

      {/* ── Fila secundaria ── */}
      <div className="bg-stone-50 border-b border-border/60">
        <div className="max-w-wrap mx-auto px-7 flex justify-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-0 shrink-0">
            {SECONDARY_LINKS.map(({ href, label }, i) => (
              <div key={href} className="flex items-center flex-shrink-0">
                {i > 0 && <div className="w-px h-[12px] bg-border/50 flex-shrink-0" />}
                <Link
                  href={href}
                  className="text-[12px] font-medium text-ink3 px-[12px] h-[34px] flex items-center whitespace-nowrap hover:text-moss hover:bg-sage/10 rounded transition-colors"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

    </nav>

  )
}
