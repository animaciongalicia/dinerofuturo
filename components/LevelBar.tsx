'use client'

import { useState } from 'react'
import Link from 'next/link'

const levels = [
  { key: 'all', label: 'Todos', className: 'bg-[#E8ECE5] text-ink2', href: '/' },
  { key: '0', label: '🔵 Nivel 0 · Empezar', className: 'bg-[#E8F4FD] text-[#1A6FA8]', href: '/nivel/0' },
  { key: '1', label: '🟢 Nivel 1 · Ahorrar', className: 'bg-mist text-forest', href: '/nivel/1' },
  { key: '2', label: '🔴 Nivel 2 · Invertir', className: 'bg-[#FEE2E2] text-[#991B1B]', href: '/nivel/2' },
  { key: '3', label: '🟡 Nivel 3 · Cripto', className: 'bg-gold-light text-[#7C5C10]', href: '/nivel/3' },
]

const extras = [
  { key: 'comparativa', label: 'Comparativas', className: 'bg-[#F5F3FF] text-[#5B21B6]', href: '/categoria/comparativa' },
  { key: 'tools', label: 'Herramientas', className: 'bg-[#ECFDF5] text-[#065F46]', href: '/herramientas' },
]

export default function LevelBar() {
  const [active, setActive] = useState('all')

  return (
    <div className="bg-cream border-b border-border py-3 overflow-x-auto">
      <div className="max-w-wrap mx-auto px-7 flex items-center gap-2 whitespace-nowrap">
        <span className="text-[11px] font-semibold uppercase tracking-[.09em] text-ink3 mr-[6px]">Filtrar:</span>
        {levels.map(({ key, label, className, href }) => (
          <Link
            key={key}
            href={href}
            onClick={() => setActive(key)}
            className={`
              px-[15px] py-[6px] rounded-full text-[12.5px] font-medium cursor-pointer border-[1.5px] transition-all hover:-translate-y-px
              ${className}
              ${active === key ? 'font-bold border-current' : 'border-transparent'}
            `}
          >
            {label}
          </Link>
        ))}

        <div className="w-px h-[18px] bg-border mx-1 flex-shrink-0" />

        {extras.map(({ key, label, className, href }) => (
          <Link
            key={key}
            href={href}
            onClick={() => setActive(key)}
            className={`
              px-[15px] py-[6px] rounded-full text-[12.5px] font-medium cursor-pointer border-[1.5px] transition-all hover:-translate-y-px
              ${className}
              ${active === key ? 'font-bold border-current' : 'border-transparent'}
            `}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
