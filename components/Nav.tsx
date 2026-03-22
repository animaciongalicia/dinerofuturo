'use client'

import Link from 'next/link'
import Search from './Search'

const NAV_LINKS = [
  { href: '/nivel/0',              label: 'Empezar' },
  { href: '/nivel/1',              label: 'Ahorrar' },
  { href: '/nivel/2',              label: 'Invertir' },
  { href: '/nivel/3',              label: 'Cripto' },
  { href: '/herramientas',         label: 'Herramientas',  sep: true },
  { href: '/categoria/hipotecas',  label: 'Hipotecas' },
  { href: '/categoria/banca',      label: 'Neobancos' },
  { href: '/que-hacer-con-mi-dinero', label: '¿Qué hago?' },
  { href: '/finanzas-personales',  label: 'Finanzas' },
  { href: '/categoria/comparativa',label: 'Comparativas' },
]

export default function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-paper/95 backdrop-blur-md border-b border-border">
      <div className="max-w-wrap mx-auto px-7 flex items-center h-[58px]">

        {/* Logo */}
        <Link
          href="/"
          className="font-fraunces text-[20px] font-black text-forest mr-6 whitespace-nowrap flex-shrink-0"
        >
          Dinero <em className="not-italic text-gold">Futuro</em>
        </Link>

        {/* Links */}
        <div className="flex gap-0 overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map(({ href, label, sep }) => (
            <div key={href} className="flex items-center flex-shrink-0">
              {sep && <div className="w-px h-[18px] bg-border mx-1 flex-shrink-0" />}
              <Link
                href={href}
                className="text-[13px] font-medium text-ink3 px-[11px] h-[58px] flex items-center whitespace-nowrap border-b-2 border-transparent hover:text-moss hover:border-sage transition-colors"
              >
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Right: Search + CTA */}
        <div className="flex items-center gap-[10px] flex-shrink-0 ml-3">
          <Search />
          <button className="bg-forest text-white border-none px-[16px] py-2 rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-moss transition-colors whitespace-nowrap max-lg:hidden">
            Suscribirme
          </button>
        </div>

      </div>
    </nav>
  )
}
