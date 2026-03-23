import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Finanzas personales por país: México, Colombia, Argentina y Chile',
  description:
    'Guías de finanzas personales adaptadas a cada país hispanohablante. Aprende con los productos, vocabulario y contexto real de tu país.',
  alternates: { canonical: siteUrl('/pais') },
}

const PAISES = [
  {
    href: '/pais/mexico',
    bandera: '🇲🇽',
    nombre: 'México',
    tagline: 'Haz rendir tu lana de verdad',
    color: 'bg-[#006847]',
    textColor: 'text-white',
    subtextColor: 'text-green-200',
    temas: ['CETES Directo', 'AFORE', 'GBM Pocket', 'PPR fiscal', 'Nu México'],
  },
  {
    href: '/pais/colombia',
    bandera: '🇨🇴',
    nombre: 'Colombia',
    tagline: 'Haz rendir la plata de verdad',
    color: 'bg-[#003087]',
    textColor: 'text-white',
    subtextColor: 'text-blue-200',
    temas: ['CDT', 'AFP vs Colpensiones', 'Nequi', 'Daviplata', 'Tyba'],
  },
  {
    href: '/pais/argentina',
    bandera: '🇦🇷',
    nombre: 'Argentina',
    tagline: 'Cuidá tu guita, con inflación y todo',
    color: 'bg-[#74ACDF]',
    textColor: 'text-white',
    subtextColor: 'text-white/80',
    temas: ['CEDEARs', 'Dólar MEP', 'FCI money market', 'Mercado Pago', 'Ualá'],
  },
  {
    href: '/pais/chile',
    bandera: '🇨🇱',
    nombre: 'Chile',
    tagline: 'Hacé rendir tus lucas de verdad',
    color: 'bg-[#D52B1E]',
    textColor: 'text-white',
    subtextColor: 'text-red-200',
    temas: ['APV Régimen A/B', 'AFP (fondos A-E)', 'Fintual', 'Racional', 'Cuenta 2'],
  },
]

export default function PaisesPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Finanzas por país</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12">
        <p className="text-[12px] font-bold uppercase tracking-[.15em] text-forest mb-3">Hispanosfera</p>
        <h1 className="font-fraunces text-[40px] font-black text-ink leading-tight mb-4 max-sm:text-[28px]">
          Finanzas personales por país
        </h1>
        <p className="text-[17px] text-ink2 leading-[1.7] max-w-[560px] mx-auto">
          Los conceptos son universales. Los productos, las leyes y el vocabulario son distintos
          en cada país. Elige el tuyo y aprende con ejemplos y herramientas de tu contexto real.
        </p>
      </div>

      {/* Grid de países */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {PAISES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`group relative ${p.color} rounded-2xl p-7 overflow-hidden hover:scale-[1.01] transition-all`}
          >
            <div className="absolute top-0 right-0 text-[90px] opacity-10 leading-none select-none pr-3 pt-1">{p.bandera}</div>
            <div className={`text-[13px] font-semibold uppercase tracking-wider ${p.subtextColor} mb-1`}>
              {p.bandera} {p.nombre}
            </div>
            <h2 className={`font-fraunces text-[22px] font-black ${p.textColor} mb-3 leading-tight`}>
              {p.tagline}
            </h2>
            <div className="flex flex-wrap gap-2">
              {p.temas.map((t) => (
                <span key={t} className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full bg-white/15 text-white">
                  {t}
                </span>
              ))}
            </div>
            <div className={`mt-4 text-[13px] font-semibold ${p.subtextColor} group-hover:translate-x-1 transition-transform inline-block`}>
              Ver guía →
            </div>
          </Link>
        ))}
      </div>

      {/* Lo común para todos */}
      <div className="border border-border rounded-2xl p-8 mb-10">
        <h2 className="font-fraunces text-[24px] font-black text-ink mb-2">
          Lo que funciona en todos los países
        </h2>
        <p className="text-[15px] text-ink2 mb-6">
          Independientemente de dónde vivas, estos principios son universales:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: '1', t: 'Gastar menos de lo que ingresas', d: 'La base de todo. Sin esto, ninguna estrategia funciona.' },
            { n: '2', t: 'Tener un fondo de emergencias', d: 'Entre 3 y 6 meses de gastos, en algo líquido y seguro.' },
            { n: '3', t: 'Invertir a largo plazo', d: 'El interés compuesto funciona igual en México que en Chile.' },
          ].map((item) => (
            <div key={item.n} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-forest text-white text-[13px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.n}
              </div>
              <div>
                <p className="font-semibold text-[14px] text-ink mb-0.5">{item.t}</p>
                <p className="text-[13px] text-ink2">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA wizard */}
      <div className="bg-forest rounded-2xl px-8 py-7 text-white text-center">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-green-300 mb-2">Para cualquier país</p>
        <h3 className="font-fraunces text-[24px] font-black mb-2">¿No sabes por dónde empezar?</h3>
        <p className="text-[15px] text-green-100 mb-5">
          Responde 7 preguntas y recibe un diagnóstico financiero personalizado.
        </p>
        <Link
          href="/que-hacer-con-mi-dinero"
          className="inline-flex items-center gap-2 bg-white text-forest font-bold text-[15px] px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
        >
          🧭 Hacer el diagnóstico gratis
        </Link>
      </div>
    </div>
  )
}
