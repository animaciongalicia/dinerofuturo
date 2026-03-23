import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Perfil inversor moderado: la cartera 60/40 explicada',
  description:
    'Guía del inversor moderado en España. Cartera 60/40, ETFs recomendados, brókers, rentabilidad histórica y los errores más comunes del inversor equilibrado.',
  alternates: { canonical: siteUrl('/perfiles-inversor/inversor-moderado') },
  openGraph: {
    title: 'Perfil inversor moderado: la cartera 60/40 — Dinero Futuro',
    description: 'Equilibrio entre crecimiento y seguridad. ETFs, brókers y errores a evitar.',
    type: 'website',
    url: siteUrl('/perfiles-inversor/inversor-moderado'),
  },
}

const CHECKLIST = [
  'Tienes el fondo de emergencia completo y ninguna deuda de consumo',
  'Tu horizonte de inversión es de 5 a 15 años',
  'Puedes ver caídas del 20–30% sin perder el sueño, si el plan es sólido',
  'Buscas que tu dinero crezca por encima de la inflación de forma consistente',
  'No quieres dedicar horas a la semana a gestionar tu cartera',
]

const CARTERA = [
  { nombre: 'ETF renta variable global (MSCI World)', pct: 65, color: 'bg-[#FDE68A]', label: '65%' },
  { nombre: 'ETF renta fija / Letras Tesoro', pct: 25, color: 'bg-[#FCD34D]', label: '25%' },
  { nombre: 'Liquidez estratégica', pct: 10, color: 'bg-[#FEF3C7]', label: '10%' },
]

const BROKERS = [
  {
    nombre: 'MyInvestor',
    perfil: 'El mejor para principiantes en España',
    pros: 'Fondos indexados desde 1€, fácil de usar, sin comisión de custodia, cuenta remunerada incluida',
    contras: 'Gama de ETFs más limitada que IB o DeGiro',
    url: '#',
  },
  {
    nombre: 'DeGiro',
    perfil: 'Barato y con amplio catálogo de ETFs',
    pros: 'Muy bajo coste por operación (€1–3), acceso a bolsas europeas y americanas, ETFs gratuitos seleccionados',
    contras: 'Interfaz menos intuitiva, sin cuenta remunerada, sin fondos de inversión',
    url: '#',
  },
  {
    nombre: 'Interactive Brokers',
    perfil: 'Para carteras medianas o grandes',
    pros: 'El más barato en operativas frecuentes, máximo catálogo de productos, ideal para >50.000€',
    contras: 'Curva de aprendizaje alta, interfaz compleja, mínimo de actividad mensual',
    url: '#',
  },
]

const ERRORES = [
  {
    titulo: 'Market timing: esperar "el momento perfecto"',
    desc: 'Nadie sabe cuándo va a caer o subir el mercado. Ni los profesionales. El inversor moderado que espera "a que baje" suele comprar más caro o no comprar nunca.',
  },
  {
    titulo: 'Sobre-diversificación: comprar demasiados ETFs',
    desc: 'Un ETF MSCI World ya incluye 1.400 empresas de 23 países. Añadir 5 ETFs más no reduce el riesgo, solo complica la gestión y multiplica los costes.',
  },
  {
    titulo: 'No rebalancear una vez al año',
    desc: 'Si tu objetivo es 65/35 y las acciones suben mucho, acabas con un 80/20. Rebalancear una vez al año (vender lo que subió, comprar lo que bajó) mantiene tu perfil real.',
  },
  {
    titulo: 'Revisar la cartera cada día',
    desc: 'La volatilidad diaria es ruido. Un inversor moderado con horizonte de 10 años no debería mirar su cartera más de una vez al mes. Más frecuencia genera ansiedad innecesaria.',
  },
]

export default function InversorModeradoPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/perfiles-inversor" className="hover:text-forest transition-colors">Perfiles de inversor</Link>
        <span>/</span>
        <span className="text-ink font-medium">Inversor moderado</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

        {/* Hero */}
        <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FDE68A] flex items-center justify-center text-[30px]">
              ⚖️
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-[#78350F] mb-1">
                Perfil de inversor
              </p>
              <h1 className="font-fraunces text-[34px] font-black text-ink leading-tight max-sm:text-[26px]">
                Inversor moderado / equilibrado
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-ink2 leading-[1.7]">
            Buscas un equilibrio entre seguridad y crecimiento. Puedes tolerar cierta
            volatilidad si el objetivo está claro, y entiendes que invertir a largo plazo
            tiene sentido. No quieres hacerte rico rápido —{' '}
            <strong className="text-ink">quieres que tu dinero trabaje con consistencia.</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#FDE68A] text-[#78350F]">
              Horizonte: Medio/largo plazo (5–15 años)
            </span>
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#FDE68A] text-[#78350F]">
              Riesgo: Medio
            </span>
          </div>
        </div>

        {/* ¿Eres tú? */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">¿Eres tú?</h2>
          <div className="bg-paper border border-border rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-border last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#FCD34D] bg-[#FFFBEB] flex-shrink-0 mt-[2px]" />
                <p className="text-[15px] text-ink2 leading-[1.6]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cartera recomendada */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            Tu cartera recomendada
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-6">
            La base: más del 60% en renta variable global (para crecer), el resto en renta
            fija y liquidez (para amortiguar caídas). Simple, barata, efectiva.
          </p>

          {/* Barra visual */}
          <div className="mb-5">
            <div className="flex h-10 rounded-xl overflow-hidden mb-3">
              {CARTERA.map((c) => (
                <div
                  key={c.nombre}
                  style={{ width: `${c.pct}%` }}
                  className={`${c.color} flex items-center justify-center text-[12px] font-bold text-[#78350F]`}
                >
                  {c.label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CARTERA.map((c) => (
                <div key={c.nombre} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${c.color}`} />
                  <span className="text-[13px] text-ink2">
                    <strong className="text-ink">{c.label}</strong> — {c.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-5">
            <p className="text-[14px] text-ink2 leading-[1.7]">
              <strong className="text-ink">ETF concreto sugerido:</strong> iShares Core
              MSCI World (IWDA) para la parte de renta variable. Para la renta fija:
              Letras del Tesoro a 12 meses o ETF de bonos europeos (IEAG). El fondo de
              emergencia se gestiona <em>aparte</em> de esta cartera.
            </p>
          </div>
        </section>

        {/* El portafolio 60/40 */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            El portafolio 60/40 clásico
          </h2>
          <div className="bg-paper border border-border rounded-2xl p-6">
            <p className="text-[15px] text-ink2 leading-[1.7] mb-4">
              El portafolio 60% acciones / 40% bonos es uno de los más estudiados en la
              historia de las finanzas. Fue diseñado en los años 50 y sigue siendo la
              referencia para el inversor equilibrado por una razón simple:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-cream rounded-xl p-4">
                <p className="font-semibold text-[14px] text-ink mb-1">En mercados alcistas</p>
                <p className="text-[13px] text-ink2 leading-[1.6]">
                  El 60% en acciones captura gran parte del crecimiento. Los bonos
                  amortiguan sin quitar demasiado rendimiento.
                </p>
              </div>
              <div className="bg-cream rounded-xl p-4">
                <p className="font-semibold text-[14px] text-ink mb-1">En mercados bajistas</p>
                <p className="text-[13px] text-ink2 leading-[1.6]">
                  El 40% en renta fija actúa como colchón. Históricamente, cuando las
                  acciones caen, los bonos suelen subir o mantenerse.
                </p>
              </div>
            </div>
            <p className="text-[13px] text-ink3 leading-relaxed border-t border-border pt-4">
              <strong className="text-ink">¿Sigue siendo válido en 2026?</strong> Sí,
              aunque en entornos de tipos altos la correlación acciones-bonos puede romperse
              temporalmente. Para carteras medianas sin necesidad de optimización extrema,
              sigue siendo una opción robusta y probada.
            </p>
          </div>
        </section>

        {/* Brókers recomendados */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Brókers recomendados
          </h2>
          <div className="space-y-4">
            {BROKERS.map((b, i) => (
              <div key={i} className="bg-paper border border-border rounded-2xl p-5">
                <h3 className="font-fraunces text-[20px] font-black text-ink mb-1">{b.nombre}</h3>
                <p className="text-[13px] font-semibold text-forest mb-3">{b.perfil}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11.5px] font-bold uppercase tracking-[.07em] text-moss mb-1">Ventajas</p>
                    <p className="text-[13px] text-ink2 leading-[1.6]">{b.pros}</p>
                  </div>
                  <div>
                    <p className="text-[11.5px] font-bold uppercase tracking-[.07em] text-red-500 mb-1">A tener en cuenta</p>
                    <p className="text-[13px] text-ink2 leading-[1.6]">{b.contras}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rentabilidad histórica */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Rentabilidad histórica esperada
          </h2>
          <div className="bg-paper border border-border rounded-2xl p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="font-fraunces text-[42px] font-black text-[#78350F] leading-none">5–7%</p>
                <p className="text-[12px] text-ink3 font-medium mt-1">rentabilidad anual media</p>
              </div>
              <div className="flex-1 border-l border-border pl-6">
                <p className="text-[14px] text-ink2 leading-[1.7]">
                  Basado en el rendimiento histórico del S&P 500 (~10% nominal, ~7%
                  real ajustado a inflación) ponderado con la parte defensiva de la
                  cartera. Recuerda: rentabilidades pasadas no garantizan las futuras.
                </p>
              </div>
            </div>
            <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-4">
              <p className="text-[14px] text-ink2 leading-[1.65]">
                <strong className="text-ink">El efecto del tiempo:</strong> 10.000€
                al 6% anual se convierten en <strong>17.908€ en 10 años</strong>,{' '}
                <strong>32.071€ en 20 años</strong> y <strong>57.435€ en 30 años</strong>.
                Sin hacer nada más que mantener la inversión.
              </p>
              <Link
                href="/herramientas/interes-compuesto"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-forest mt-2 hover:text-forest/70 transition-colors"
              >
                Calcula tu propio escenario →
              </Link>
            </div>
          </div>
        </section>

        {/* Errores */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Errores que comete el inversor moderado
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {ERRORES.map((e, i) => (
              <div key={i} className="flex gap-4 bg-paper border border-border rounded-xl p-5">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[14px] flex-shrink-0 mt-[1px]">
                  ✕
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-ink mb-1">{e.titulo}</h3>
                  <p className="text-[14px] text-ink2 leading-[1.6]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="font-fraunces text-[22px] font-black text-ink mb-4">
            Artículos y herramientas para este perfil
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/articulo/cartera-inversion-principiantes-modelo', label: '📖 Cartera de inversión para principiantes', desc: 'Modelo paso a paso con ETFs reales' },
              { href: '/articulo/mejores-brokers-principiantes-2026', label: '📖 Mejores brókers para principiantes 2026', desc: 'Comparativa con pros y contras' },
              { href: '/herramientas/interes-compuesto', label: '🧮 Calculadora de interés compuesto', desc: 'Cuánto crecerá tu cartera' },
              { href: '/herramientas/objetivo-ahorro', label: '🎯 Calculadora de objetivo de ahorro', desc: 'Cuánto necesitas ahorrar cada mes' },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex flex-col px-5 py-4 bg-paper border border-border rounded-xl hover:border-sage hover:shadow-card transition-all"
              >
                <span className="text-[14px] font-semibold text-ink mb-[3px]">{r.label}</span>
                <span className="text-[12.5px] text-ink3">{r.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTAs finales */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
          <Link
            href="/perfiles-inversor"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink2 hover:text-forest transition-colors"
          >
            ← Ver todos los perfiles
          </Link>
          <Link
            href="/que-hacer-con-mi-dinero"
            className="inline-flex items-center gap-2 bg-forest text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-forest/90 transition-colors"
          >
            → Diagnóstico personalizado
          </Link>
        </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
