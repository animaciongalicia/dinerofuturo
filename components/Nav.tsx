'use client'

import Link from 'next/link'
import Search from './Search'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-paper/95 backdrop-blur-md border-b border-border">
      <div className="max-w-wrap mx-auto px-7 flex items-center gap-0 h-[58px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-fraunces text-[20px] font-black text-forest tracking-[-0.5px] mr-8 whitespace-nowrap flex-shrink-0"
        >
          Dinero <em className="not-italic text-gold">Futuro</em>
        </Link>

        {/* Links */}
        <div className="flex gap-0 overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { href: '/',                     label: 'Inicio' },
            { href: '/nivel/0',              label: 'Nivel 0 — Empezar' },
            { href: '/nivel/1',              label: 'Nivel 1 — Ahorrar' },
            { href: '/nivel/2',              label: 'Nivel 2 — Invertir' },
            { href: '/nivel/3',              label: 'Nivel 3 — Cripto' },
            { href: '/categoria/comparativa',label: 'Comparativas' },
            { href: '/herramientas',         label: 'Herramientas' },
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
