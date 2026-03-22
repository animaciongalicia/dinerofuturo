import Link from 'next/link'

const tools = [
  {
    ico: '🧮',
    name: 'Interés compuesto',
    desc: '¿Cuánto tendrás en 10, 20 o 30 años si inviertes 100€ al mes desde hoy?',
    cta: 'Calcular ahora →',
    href: '/herramientas/interes-compuesto',
  },
  {
    ico: '🏠',
    name: 'Calculadora de hipoteca',
    desc: 'Cuota mensual, total que pagas al banco y ahorro por amortizar anticipadamente.',
    cta: 'Calcular hipoteca →',
    href: '/herramientas/calculadora-hipoteca',
  },
  {
    ico: '🛡️',
    name: 'Fondo de emergencia',
    desc: 'Cuánto necesitas exactamente según tu trabajo, gastos y situación familiar.',
    cta: 'Calcular el mío →',
    href: '/herramientas/fondo-emergencia',
  },
  {
    ico: '🔥',
    name: 'Número FIRE',
    desc: 'Cuánto capital necesitas para vivir de las rentas y cuántos años te faltan.',
    cta: 'Calcular número →',
    href: '/herramientas/numero-fire',
  },
]

export default function ToolsSection() {
  return (
    <section className="bg-cream border-t border-b border-border py-[52px]">
      <div className="max-w-wrap mx-auto px-7">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Herramientas gratuitas</h2>
            <p className="text-[14px] text-ink3 mt-1">Calcula antes de decidir. Sin registro, sin email.</p>
          </div>
          <Link href="/herramientas" className="text-[13px] text-moss font-semibold flex items-center gap-1 hover:text-forest">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {tools.map(({ ico, name, desc, cta, href }) => (
            <Link
              key={name}
              href={href}
              className="bg-white border border-border rounded-2xl p-6 cursor-pointer group transition-all hover:border-sage hover:shadow-card hover:-translate-y-[2px] relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-sage after:to-mint after:opacity-0 hover:after:opacity-100 after:transition-opacity"
            >
              <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center text-[24px] mb-[14px]">
                {ico}
              </div>
              <div className="font-fraunces text-[17px] font-bold text-ink mb-[6px] tracking-[-0.2px]">{name}</div>
              <p className="text-[13px] text-ink3 leading-[1.5] mb-[14px]">{desc}</p>
              <div className="text-[12.5px] font-semibold text-moss flex items-center gap-1 group-hover:text-forest transition-colors">
                {cta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
