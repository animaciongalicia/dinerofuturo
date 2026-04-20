import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Finanzas personales por país — Toda la hispanosfera',
  description:
    'Guías de finanzas personales adaptadas a cada país hispanohablante: España, México, Colombia, Argentina, Chile y más. Aprende con los productos y el contexto real de tu país.',
  alternates: { canonical: siteUrl('/pais') },
}

const PAISES = [
  {
    href: '/pais/espana',
    bandera: '🇪🇸',
    nombre: 'España',
    tagline: 'Haz trabajar tu dinero de verdad',
    color: 'bg-[#AA151B]',
    textColor: 'text-white',
    subtextColor: 'text-red-200',
    temas: ['Letras del Tesoro', 'Trade Republic', 'MyInvestor', 'IRPF', 'Euríbor'],
  },
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

// Países sin página dedicada — representados para mostrar alcance
const OTROS_PAISES = [
  { bandera: '🇵🇪', nombre: 'Perú' },
  { bandera: '🇺🇾', nombre: 'Uruguay' },
  { bandera: '🇻🇪', nombre: 'Venezuela' },
  { bandera: '🇪🇨', nombre: 'Ecuador' },
  { bandera: '🇧🇴', nombre: 'Bolivia' },
  { bandera: '🇵🇾', nombre: 'Paraguay' },
  { bandera: '🇩🇴', nombre: 'Rep. Dominicana' },
  { bandera: '🇨🇷', nombre: 'Costa Rica' },
  { bandera: '🇵🇦', nombre: 'Panamá' },
  { bandera: '🇬🇹', nombre: 'Guatemala' },
  { bandera: '🇭🇳', nombre: 'Honduras' },
  { bandera: '🇸🇻', nombre: 'El Salvador' },
  { bandera: '🇳🇮', nombre: 'Nicaragua' },
  { bandera: '🇨🇺', nombre: 'Cuba' },
  { bandera: '🇵🇷', nombre: 'Puerto Rico' },
  { bandera: '🇬🇶', nombre: 'Guinea Ecuatorial' },
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
        <p className="text-[12px] font-bold uppercase tracking-[.15em] text-forest mb-3">Toda la hispanosfera</p>
        <h1 className="font-fraunces text-[40px] font-black text-ink leading-tight mb-4 max-sm:text-[28px]">
          Finanzas personales por país
        </h1>
        <p className="text-[17px] text-ink2 leading-[1.7] max-w-[580px] mx-auto">
          Los conceptos son universales — el interés compuesto funciona igual en Madrid que en Ciudad de México.
          Pero los productos, las leyes y el vocabulario son distintos en cada país.
          Elige el tuyo y aprende con ejemplos de tu contexto real.
        </p>
      </div>

      {/* España — destacado */}
      <div className="mb-4">
        <Link
          href="/pais/espana"
          className="group relative bg-[#AA151B] rounded-2xl p-7 overflow-hidden hover:scale-[1.01] transition-all flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start"
        >
          <div className="absolute top-0 right-0 text-[100px] opacity-10 leading-none select-none pr-4 pt-1">🇪🇸</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-red-200 mb-1">
              🇪🇸 España — Guía completa
            </div>
            <h2 className="font-fraunces text-[26px] font-black text-white mb-2 leading-tight">
              Haz trabajar tu dinero de verdad
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Letras del Tesoro', 'Trade Republic', 'MyInvestor', 'IRPF', 'Euríbor', 'Hipotecas'].map((t) => (
                <span key={t} className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full bg-white/15 text-white">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[14px] font-semibold text-red-200 group-hover:translate-x-1 transition-transform shrink-0">
            Ver guía →
          </div>
        </Link>
      </div>

      {/* Resto de países con página — grid 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {PAISES.slice(1).map((p) => (
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

      {/* Toda la hispanosfera */}
      <div className="border border-border rounded-2xl p-8 mb-10">
        <h2 className="font-fraunces text-[22px] font-black text-ink mb-1">
          Toda la hispanosfera
        </h2>
        <p className="text-[14px] text-ink2 mb-6 leading-[1.6]">
          Este blog es para todos los países hispanohablantes. Los artículos usan español neutro
          y evitan referencias exclusivas a un solo país. Si no ves el tuyo con guía dedicada,
          todo el contenido general te aplica igualmente.
        </p>
        <div className="flex flex-wrap gap-3">
          {OTROS_PAISES.map(({ bandera, nombre }) => (
            <div
              key={nombre}
              className="flex items-center gap-2 bg-cream border border-border rounded-full px-3 py-1.5"
            >
              <span className="text-[16px]">{bandera}</span>
              <span className="text-[12.5px] font-medium text-ink2">{nombre}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-sage/10 border border-sage/30 rounded-full px-3 py-1.5">
            <span className="text-[12.5px] font-medium text-forest">+ más próximamente</span>
          </div>
        </div>
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
            { n: '3', t: 'Invertir a largo plazo', d: 'El interés compuesto funciona igual en México que en Chile o España.' },
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
