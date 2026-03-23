import Link from 'next/link'

const columns = [
  {
    title: 'Niveles',
    links: [
      { label: 'Nivel 0 — Empezar', href: '/nivel/0' },
      { label: 'Nivel 1 — Ahorrar', href: '/nivel/1' },
      { label: 'Nivel 2 — Invertir', href: '/nivel/2' },
      { label: 'Nivel 3 — Cripto', href: '/nivel/3' },
      { label: 'Glosario financiero', href: '/glosario' },
    ],
  },
  {
    title: 'Herramientas',
    links: [
      { label: 'Interés compuesto', href: '/herramientas/interes-compuesto' },
      { label: 'Calculadora hipoteca', href: '/herramientas/calculadora-hipoteca' },
      { label: 'Fondo de emergencia', href: '/herramientas/fondo-emergencia' },
      { label: 'Número FIRE', href: '/herramientas/numero-fire' },
      { label: 'Comparativa brókers', href: '/categoria/comparativa' },
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: '👋 Empieza aquí', href: '/empieza-aqui' },
      { label: 'Últimos artículos', href: '/' },
      { label: 'Comparativas', href: '/categoria/comparativa' },
      { label: 'Sobre el proyecto', href: '/sobre' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Por país',
    links: [
      { label: '🇲🇽 México', href: '/pais/mexico' },
      { label: '🇨🇴 Colombia', href: '/pais/colombia' },
      { label: '🇦🇷 Argentina', href: '/pais/argentina' },
      { label: '🇨🇱 Chile', href: '/pais/chile' },
      { label: 'Ver todos los países', href: '/pais' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 pt-14">
      <div className="max-w-wrap mx-auto px-7 pb-12 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 max-xl:grid-cols-[2fr_1fr_1fr_1fr_1fr] max-lg:grid-cols-3 max-lg:gap-8 max-sm:grid-cols-2 max-sm:gap-6">
        {/* Brand */}
        <div>
          <div className="font-fraunces text-[24px] font-black text-white mb-[10px] tracking-[-0.5px]">
            Dinero <em className="not-italic text-gold">Futuro</em>
          </div>
          <p className="text-[13.5px] text-white/45 leading-[1.65] mb-5">
            Educación financiera práctica para personas normales del mundo hispanohablante. Sin jerga, sin humo, sin venderte lo que no necesitas.
          </p>
          <Link href="/#newsletter" className="inline-block bg-forest text-white px-[22px] py-[10px] rounded-lg text-[13.5px] font-semibold hover:bg-moss transition-colors">
            Suscribirme gratis
          </Link>
        </div>

        {/* Columns */}
        {columns.map(({ title, links }) => (
          <div key={title}>
            <div className="text-[11px] font-bold tracking-[.1em] uppercase text-white/30 mb-[14px]">{title}</div>
            <ul className="list-none">
              {links.map(({ label, href }) => (
                <li key={label} className="mb-[9px]">
                  <Link
                    href={href}
                    className="text-[13.5px] text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="max-w-wrap mx-auto px-7 py-5 border-t border-white/[.08] flex justify-between items-center text-[12px] text-white/25 flex-wrap gap-2">
        <span>© 2026 Dinero Futuro</span>
        <span className="flex gap-3">
          {[
            { label: 'Aviso legal', href: '/aviso-legal' },
            { label: 'Privacidad',  href: '/privacidad' },
            { label: 'Cookies',     href: '/cookies' },
            { label: 'Afiliados',   href: '/aviso-legal#politica-de-enlaces-afiliados' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="text-white/35 hover:text-white/70 transition-colors">
              {label}
            </Link>
          ))}
        </span>
      </div>

      {/* Legal */}
      <div className="bg-black/25 px-7 py-4 text-[11px] text-white/20 leading-[1.6] text-center">
        ⚠️ El contenido de Dinero Futuro es exclusivamente educativo e informativo. No constituye asesoramiento financiero personalizado. Consulta siempre con un profesional certificado antes de tomar decisiones de inversión.
      </div>
    </footer>
  )
}
