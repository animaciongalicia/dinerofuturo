import Link from 'next/link'

const TOPICS = [
  { label: '🧮 Calculadoras',           href: '/herramientas',              className: 'bg-[#ECFDF5] text-[#065F46]' },
  { label: '🎯 Perfiles de inversor',   href: '/perfiles-inversor',         className: 'bg-[#EEF2FF] text-[#3730A3]' },
  { label: '🌍 Por país',              href: '/pais',                      className: 'bg-[#EFF6FF] text-[#1D4ED8]' },
  { label: '💡 Finanzas personales',    href: '/finanzas-personales',       className: 'bg-[#FDF4FF] text-[#7E22CE]' },
  { label: '🧭 ¿Qué hago con mi dinero?', href: '/que-hacer-con-mi-dinero', className: 'bg-[#FFF7ED] text-[#9A3412]' },
  { label: '📚 Glosario',              href: '/glosario',                  className: 'bg-[#F5F3FF] text-[#5B21B6]' },
]

export default function LevelBar() {
  return (
    <div className="bg-cream border-b border-border py-[10px] overflow-x-auto">
      <div className="max-w-wrap mx-auto px-7 flex items-center gap-2 whitespace-nowrap">
        <span className="text-[11px] font-semibold uppercase tracking-[.09em] text-ink3 mr-[6px] flex-shrink-0">Explorar:</span>
        {TOPICS.map(({ label, href, className }) => (
          <Link
            key={href}
            href={href}
            className={`px-[14px] py-[5px] rounded-full text-[12.5px] font-medium border border-transparent hover:border-current transition-all hover:-translate-y-px flex-shrink-0 ${className}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
