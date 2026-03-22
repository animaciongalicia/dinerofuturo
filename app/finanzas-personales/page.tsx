import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Finanzas personales: pareja, autónomos e ingresos irregulares | Dinero Futuro',
  description:
    'Guías prácticas de finanzas personales para situaciones reales: finanzas en pareja, gestión como autónomo e ingresos variables.',
  alternates: { canonical: siteUrl('/finanzas-personales') },
  openGraph: {
    title: 'Finanzas personales — Dinero Futuro',
    description: 'Guías para situaciones reales: pareja, autónomos e ingresos variables.',
    type: 'website',
    url: siteUrl('/finanzas-personales'),
  },
}

const ARTICULOS = [
  {
    href: '/articulo/finanzas-en-pareja-como-organizarlo',
    ico: '💑',
    name: 'Finanzas en pareja',
    resuelve: 'Tú ahorras, tu pareja gasta. ¿Cómo lo organizáis sin que sea una pelea?',
    desc: 'Cuenta conjunta, gastos compartidos, metas comunes. Los 3 modelos que funcionan.',
    color: 'bg-[#FDF4FF] border-purple-200',
    icoColor: 'bg-purple-100',
  },
  {
    href: '/articulo/finanzas-para-autonomos-guia-practica',
    ico: '🧾',
    name: 'Autónomos: cómo gestionar el dinero',
    resuelve: 'Eres autónomo y mezclas dinero personal con el del negocio',
    desc: 'Cómo separar cuentas, cuánto reservar para impuestos y cómo pagarte un sueldo fijo.',
    color: 'bg-[#FFF7ED] border-orange-200',
    icoColor: 'bg-orange-100',
  },
  {
    href: '/articulo/gestionar-ingresos-irregulares',
    ico: '📊',
    name: 'Ingresos irregulares: cómo presupuestar',
    resuelve: 'Tu sueldo cambia cada mes y no sabes cómo planificar',
    desc: 'El método del sueldo mínimo garantizado para vivir sin ansiedad con ingresos variables.',
    color: 'bg-[#EBF5EF] border-sage/30',
    icoColor: 'bg-sage/20',
  },
]

const OTRAS_GUIAS = [
  { href: '/articulo/como-hacer-un-presupuesto-personal-que-funcione', label: 'Cómo hacer un presupuesto personal que funcione' },
  { href: '/articulo/fondo-de-emergencia-cuanto-necesitas', label: 'Fondo de emergencia: cuánto necesitas exactamente tú' },
  { href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Deudas: cómo salir y por dónde empezar' },
  { href: '/articulo/como-ahorrar-dinero-cuando-no-te-alcanza', label: 'Cómo ahorrar dinero cuando no te alcanza' },
  { href: '/articulo/primer-sueldo-que-hacer-con-tu-dinero', label: 'Primer sueldo: qué hacer con tu dinero' },
  { href: '/herramientas/objetivo-ahorro', label: 'Calculadora de objetivo de ahorro' },
]

export default function FinanzasPersonalesPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Hero */}
      <div className="mb-12">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
          Guías prácticas
        </p>
        <h1 className="font-fraunces text-[42px] font-black text-ink leading-tight mb-4 max-sm:text-[30px]">
          Finanzas personales
        </h1>
        <p className="text-[17px] text-ink2 leading-[1.7] max-w-[620px]">
          Las finanzas personales no son solo ahorrar e invertir. A veces tu situación
          no encaja en los consejos genéricos: tienes pareja con sueldo distinto, eres
          autónomo, o tus ingresos cambian cada mes. Estas guías van al grano.
        </p>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 gap-6 mb-14">
        {ARTICULOS.map((art) => (
          <Link
            key={art.href}
            href={art.href}
            className={`group flex gap-6 border rounded-2xl p-7 transition-all hover:shadow-card-lg hover:-translate-y-[2px] max-sm:flex-col max-sm:gap-4 ${art.color}`}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-[28px] flex-shrink-0 ${art.icoColor}`}>
              {art.ico}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="font-fraunces text-[22px] font-black text-ink leading-tight">
                  {art.name}
                </h2>
                <span className="text-moss font-semibold text-[14px] whitespace-nowrap flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  Leer →
                </span>
              </div>

              <p className="text-[14px] font-semibold text-forest mb-2 italic">
                "{art.resuelve}"
              </p>

              <p className="text-[14px] text-ink2 leading-[1.65]">
                {art.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-border mb-10" />

      {/* Otras guías útiles */}
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-5">
          Otras guías útiles
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OTRAS_GUIAS.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="flex items-center gap-3 px-4 py-3 bg-paper border border-border rounded-xl text-[14px] text-ink2 hover:text-forest hover:border-sage hover:shadow-card transition-all"
              >
                <span className="text-border text-[16px] leading-none">→</span>
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer note */}
      <p className="text-[13px] text-ink3 text-center mt-12">
        Los artículos son orientativos. Los ejemplos con números son ilustrativos y no constituyen asesoramiento financiero personalizado.
      </p>
    </div>
  )
}
