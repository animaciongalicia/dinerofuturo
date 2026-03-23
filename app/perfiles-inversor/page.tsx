import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Perfiles de inversor: ¿cuál eres tú?',
  description:
    'Descubre tu perfil de inversor: conservador, moderado, dinámico o FIRE. Cada perfil con cartera recomendada, productos adecuados y estrategia a seguir.',
  alternates: { canonical: siteUrl('/perfiles-inversor') },
  openGraph: {
    title: 'Perfiles de inversor: ¿cuál eres tú? — Dinero Futuro',
    description: 'Descubre tu perfil de inversor y la cartera que le corresponde.',
    type: 'website',
    url: siteUrl('/perfiles-inversor'),
  },
}

const PERFILES = [
  {
    href: '/perfiles-inversor/empezando-desde-cero',
    emoji: '🌱',
    nombre: 'Empezando desde cero',
    desc: 'Todavía no inviertes o acabas de empezar. Tu prioridad es construir una base sólida antes de pensar en rentabilidad.',
    horizonte: 'Corto/medio plazo',
    riesgo: 'Muy bajo',
    bgCard: 'bg-[#EBF5EF]',
    bgIco: 'bg-[#C6E6D0]',
    borderColor: 'border-[#A3D4B4]',
    pillBg: 'bg-[#C6E6D0] text-[#1B5E35]',
  },
  {
    href: '/perfiles-inversor/inversor-conservador',
    emoji: '🛡️',
    nombre: 'Conservador',
    desc: 'Priorizas la seguridad sobre la rentabilidad. No puedes permitirte perder dinero o te genera demasiada ansiedad.',
    horizonte: 'Corto/medio plazo',
    riesgo: 'Bajo',
    bgCard: 'bg-[#EFF6FF]',
    bgIco: 'bg-[#BFDBFE]',
    borderColor: 'border-[#93C5FD]',
    pillBg: 'bg-[#BFDBFE] text-[#1E40AF]',
  },
  {
    href: '/perfiles-inversor/inversor-moderado',
    emoji: '⚖️',
    nombre: 'Moderado / Equilibrado',
    desc: 'Buscas un equilibrio entre seguridad y crecimiento. Puedes tolerar cierta volatilidad si el objetivo está claro.',
    horizonte: 'Medio/largo plazo (5–15 años)',
    riesgo: 'Medio',
    bgCard: 'bg-[#FFFBEB]',
    bgIco: 'bg-[#FDE68A]',
    borderColor: 'border-[#FCD34D]',
    pillBg: 'bg-[#FDE68A] text-[#78350F]',
  },
  {
    href: '/perfiles-inversor/inversor-dinamico',
    emoji: '🚀',
    nombre: 'Dinámico / Crecimiento',
    desc: 'Buscas máximo crecimiento a largo plazo. Entiendes que la volatilidad es parte del camino y no te asusta.',
    horizonte: 'Largo plazo (15+ años)',
    riesgo: 'Alto',
    bgCard: 'bg-[#F5F3FF]',
    bgIco: 'bg-[#DDD6FE]',
    borderColor: 'border-[#C4B5FD]',
    pillBg: 'bg-[#DDD6FE] text-[#4C1D95]',
  },
  {
    href: '/perfiles-inversor/perfil-fire',
    emoji: '🔥',
    nombre: 'FIRE (Independencia financiera)',
    desc: 'Tu objetivo es no depender de un salario. Maximizas la tasa de ahorro y construyes un patrimonio que genere rentas pasivas.',
    horizonte: '10–20 años',
    riesgo: 'Medio-alto',
    bgCard: 'bg-[#FFF7ED]',
    bgIco: 'bg-[#FED7AA]',
    borderColor: 'border-[#FDBA74]',
    pillBg: 'bg-[#FED7AA] text-[#7C2D12]',
  },
]

export default function PerfilesInversorPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
              Conoce tu punto de partida
            </p>
            <h1 className="font-fraunces text-[42px] font-black text-ink leading-tight mb-4 max-sm:text-[30px]">
              ¿Qué tipo de inversor eres?
            </h1>
            <p className="text-[17px] text-ink2 leading-[1.7] max-w-[640px] mb-6">
              Tu perfil determina qué productos usar, cuánto riesgo asumir y qué estrategia
              seguir. No existe un perfil mejor que otro — existe el que encaja con tu
              situación real.
            </p>
            <Link
              href="/que-hacer-con-mi-dinero"
              className="inline-flex items-center gap-2 bg-forest text-white font-semibold text-[15px] px-6 py-3 rounded-xl hover:bg-forest/90 transition-colors"
            >
              → Descúbrelo con el diagnóstico interactivo
            </Link>
          </div>

          {/* Perfiles grid */}
          <div className="grid grid-cols-1 gap-5 mb-16">
            {PERFILES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`group flex gap-6 border rounded-2xl p-7 transition-all hover:shadow-card-lg hover:-translate-y-[2px] max-sm:flex-col max-sm:gap-4 ${p.bgCard} ${p.borderColor}`}
              >
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[32px] flex-shrink-0 ${p.bgIco}`}>
                  {p.emoji}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="font-fraunces text-[22px] font-black text-ink leading-tight">
                      {p.nombre}
                    </h2>
                    <span className="text-moss font-semibold text-[14px] whitespace-nowrap flex-shrink-0 group-hover:translate-x-1 transition-transform">
                      Ver perfil completo →
                    </span>
                  </div>

                  <p className="text-[15px] text-ink2 leading-[1.65] mb-4">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full ${p.pillBg}`}>
                      Horizonte: {p.horizonte}
                    </span>
                    <span className={`inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full ${p.pillBg}`}>
                      Riesgo: {p.riesgo}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA final */}
          <div className="bg-forest/5 border border-forest/20 rounded-2xl p-8 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
              ¿No sabes cuál eres?
            </p>
            <h2 className="font-fraunces text-[26px] font-black text-ink leading-tight mb-3">
              El diagnóstico te dice cuál es tu perfil real
            </h2>
            <p className="text-[15px] text-ink2 leading-[1.7] max-w-[480px] mx-auto mb-6">
              En 4 preguntas analizamos tu situación — deudas, fondo de emergencia, horizonte
              temporal — y te decimos exactamente qué hacer con tu dinero ahora mismo.
            </p>
            <Link
              href="/que-hacer-con-mi-dinero"
              className="inline-flex items-center gap-2 bg-forest text-white font-semibold text-[15px] px-8 py-3 rounded-xl hover:bg-forest/90 transition-colors"
            >
              → Empezar el diagnóstico gratis
            </Link>
          </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
