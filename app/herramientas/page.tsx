import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Herramientas financieras gratuitas',
  description:
    'Calculadoras gratuitas de interés compuesto, hipoteca, fondo de emergencia, número FIRE y objetivo de ahorro. Sin registro. Sin email. Resultados al instante.',
  alternates: { canonical: siteUrl('/herramientas') },
  openGraph: {
    title: 'Herramientas financieras gratuitas — Dinero Futuro',
    description: 'Calcula antes de decidir. Sin registro, sin email.',
    type: 'website',
    url: siteUrl('/herramientas'),
  },
}

const TOOLS = [
  {
    href: '/herramientas/interes-compuesto',
    ico: '🧮',
    name: 'Interés compuesto',
    resuelve: '¿Cuánto valdrá mi dinero si lo invierto ahora?',
    desc: 'Introduce un capital inicial, una aportación mensual, los años y la rentabilidad esperada. La calculadora te muestra cuánto creció tu dinero y, lo más importante, cuánto de ese total son intereses que generó el mercado por ti.',
    cuando: 'Antes de decidir si invertir, para ver el coste real de esperar un año más, o para comparar distintas rentabilidades.',
    color: 'bg-[#EBF5EF] border-sage/30',
    icoColor: 'bg-sage/20',
  },
  {
    href: '/herramientas/fondo-emergencia',
    ico: '🛡️',
    name: 'Fondo de emergencia',
    resuelve: '¿Cuánto dinero necesito guardado para imprevistos?',
    desc: 'No es lo mismo ser funcionario que autónomo. Esta calculadora ajusta la cantidad que necesitas según tu tipo de empleo y las personas a tu cargo, para que tu colchón sea el adecuado — ni demasiado pequeño ni dinero inmovilizado de más.',
    cuando: 'Si estás construyendo tu primer colchón de seguridad o quieres saber si el que tienes es suficiente.',
    color: 'bg-[#EEF2FF] border-indigo-200',
    icoColor: 'bg-indigo-100',
  },
  {
    href: '/herramientas/calculadora-hipoteca',
    ico: '🏠',
    name: 'Calculadora de hipoteca',
    resuelve: '¿Cuánto pagaré al mes y cuánto cuesta realmente el piso?',
    desc: 'Calcula la cuota mensual de tu hipoteca según el precio, la entrada, el plazo y el tipo de interés. También muestra el total que pagarás al banco — la cifra que casi nadie conoce antes de firmar — y cuánto ahorras amortizando anticipadamente.',
    cuando: 'Antes de pedir una hipoteca, para comparar ofertas de distintos bancos o para calcular el impacto de amortizar cuando tengas un extra.',
    color: 'bg-gold-light border-gold/30',
    icoColor: 'bg-gold/20',
  },
  {
    href: '/herramientas/objetivo-ahorro',
    ico: '🎯',
    name: 'Objetivo de ahorro',
    resuelve: '¿Cuánto tengo que ahorrar cada mes para llegar a mi meta?',
    desc: 'Pon tu meta en euros, tu plazo y lo que ya tienes ahorrado. La calculadora te dice cuánto necesitas apartar al mes, con y sin rentabilidad por invertirlo. Sirve para cualquier objetivo: colchón de emergencia, entrada de piso, viaje, jubilación anticipada.',
    cuando: 'Cuando tienes un objetivo concreto en mente y quieres saber si es alcanzable con tu presupuesto actual.',
    color: 'bg-[#FFF7ED] border-orange-200',
    icoColor: 'bg-orange-100',
  },
  {
    href: '/herramientas/numero-fire',
    ico: '🔥',
    name: 'Número FIRE',
    resuelve: '¿Cuánto dinero necesito para no tener que trabajar más?',
    desc: 'El movimiento FIRE (Financial Independence, Retire Early) se basa en la regla del 4%: si tienes 25 veces tus gastos anuales invertidos, puedes vivir de las rentas indefinidamente. Esta calculadora te muestra tu número exacto y cuántos años necesitas para alcanzarlo.',
    cuando: 'Si quieres explorar la independencia financiera o simplemente entender a qué distancia estás de no depender de un sueldo.',
    color: 'bg-[#FEF2F2] border-red-200',
    icoColor: 'bg-red-100',
  },
]

export default function HerramientasPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <div className="flex gap-10 items-start">
      <main className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
          Herramientas gratuitas
        </p>
        <h1 className="font-fraunces text-[42px] font-black text-ink leading-tight mb-4 max-sm:text-[30px]">
          Calcula antes de decidir
        </h1>
        <p className="text-[17px] text-ink2 leading-[1.7] max-w-[600px]">
          Cinco calculadoras para tomar decisiones financieras con números reales.
          Sin registro. Sin email. Sin publicidad intrusiva.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 gap-6">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group flex gap-6 border rounded-2xl p-7 transition-all hover:shadow-card-lg hover:-translate-y-[2px] max-sm:flex-col max-sm:gap-4 ${tool.color}`}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-[28px] flex-shrink-0 ${tool.icoColor}`}>
              {tool.ico}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-fraunces text-[22px] font-black text-ink leading-tight">
                  {tool.name}
                </h2>
                <span className="text-moss font-semibold text-[14px] whitespace-nowrap flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  Abrir →
                </span>
              </div>

              <p className="text-[14px] font-semibold text-forest mb-2 italic">
                "{tool.resuelve}"
              </p>

              <p className="text-[14px] text-ink2 leading-[1.65] mb-3">
                {tool.desc}
              </p>

              <div className="inline-flex items-center gap-2 text-[12.5px] text-ink3">
                <span className="font-semibold text-ink3">Útil cuando:</span>
                <span>{tool.cuando}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[13px] text-ink3 text-center mt-10">
        Todas las calculadoras son orientativas. Los resultados no constituyen asesoramiento financiero.
      </p>
      </main>
      <Sidebar hideTools />
      </div>
    </div>
  )
}
