import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Perfil inversor conservador: cartera y productos recomendados',
  description:
    'Guía completa para el inversor conservador en España. Cartera recomendada, productos concretos (Letras del Tesoro, ETF, cuentas remuneradas) y rentabilidad esperada.',
  alternates: { canonical: siteUrl('/perfiles-inversor/inversor-conservador') },
  openGraph: {
    title: 'Perfil inversor conservador — Dinero Futuro',
    description: 'Cartera y productos para quien prioriza la seguridad sobre la rentabilidad.',
    type: 'website',
    url: siteUrl('/perfiles-inversor/inversor-conservador'),
  },
}

const CHECKLIST = [
  'Perder un 10% de tu inversión te generaría una ansiedad que no vale la pena',
  'Tu horizonte de inversión es inferior a 5 años',
  'Necesitas saber que el dinero está "ahí" en cualquier momento',
  'Priorizas preservar el capital por encima de hacerlo crecer',
  'Estás cerca de jubilarte o de necesitar ese dinero para algo concreto',
]

const CARTERA = [
  { nombre: 'Renta fija (letras, bonos)', pct: 40, color: 'bg-[#BFDBFE]', label: '40%' },
  { nombre: 'Liquidez (cuentas, depósitos)', pct: 30, color: 'bg-[#93C5FD]', label: '30%' },
  { nombre: 'ETF renta variable global', pct: 20, color: 'bg-[#60A5FA]', label: '20%' },
  { nombre: 'Otros (oro, inmueble...)', pct: 10, color: 'bg-[#DBEAFE]', label: '10%' },
]

const PRODUCTOS = [
  {
    nombre: 'Letras del Tesoro (3–12 meses)',
    tipo: 'Renta fija',
    rentabilidad: '~2,5–3%',
    liquidez: 'Media (hasta vencimiento)',
    riesgo: 'Muy bajo',
  },
  {
    nombre: 'Cuenta remunerada Openbank',
    tipo: 'Liquidez',
    rentabilidad: '~2,47% TAE',
    liquidez: 'Alta (inmediata)',
    riesgo: 'Muy bajo',
  },
  {
    nombre: 'Fondo Naranja Renta Fija (ING)',
    tipo: 'Fondo bonos',
    rentabilidad: '~2–3%',
    liquidez: 'Alta (T+1)',
    riesgo: 'Bajo',
  },
  {
    nombre: 'iShares Core MSCI World (IWDA)',
    tipo: 'ETF renta variable',
    rentabilidad: 'Histórico ~7% anual',
    liquidez: 'Alta (mercado abierto)',
    riesgo: 'Medio',
  },
]

export default function InversorConservadorPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/perfiles-inversor" className="hover:text-forest transition-colors">Perfiles de inversor</Link>
        <span>/</span>
        <span className="text-ink font-medium">Inversor conservador</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0 max-w-[760px]">

        {/* Hero */}
        <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#BFDBFE] flex items-center justify-center text-[30px]">
              🛡️
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-[#1E40AF] mb-1">
                Perfil de inversor
              </p>
              <h1 className="font-fraunces text-[34px] font-black text-ink leading-tight max-sm:text-[26px]">
                Inversor conservador
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-ink2 leading-[1.7]">
            Priorizas la seguridad sobre la rentabilidad. No puedes permitirte —
            económica o psicológicamente — perder dinero. Tu objetivo principal es{' '}
            <strong className="text-ink">preservar el capital</strong> y obtener algo
            de rentabilidad que al menos supere a la inflación.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#BFDBFE] text-[#1E40AF]">
              Horizonte: Corto/medio plazo
            </span>
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#BFDBFE] text-[#1E40AF]">
              Riesgo: Bajo
            </span>
          </div>
        </div>

        {/* ¿Eres tú? */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            ¿Eres tú?
          </h2>
          <div className="bg-paper border border-border rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 border-b border-border last:border-0"
              >
                <div className="w-5 h-5 rounded border-2 border-[#93C5FD] bg-[#EFF6FF] flex-shrink-0 mt-[2px]" />
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
            Una cartera conservadora no significa no invertir. Significa que la mayor
            parte del dinero está en activos de bajo riesgo, con una pequeña exposición
            a renta variable para crecer por encima de la inflación.
          </p>

          {/* Barra visual */}
          <div className="mb-5">
            <div className="flex h-10 rounded-xl overflow-hidden mb-3">
              {CARTERA.map((c) => (
                <div
                  key={c.nombre}
                  style={{ width: `${c.pct}%` }}
                  className={`${c.color} flex items-center justify-center text-[12px] font-bold text-[#1E40AF]`}
                >
                  {c.pct >= 15 ? c.label : ''}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
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

          <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-xl p-5">
            <p className="text-[14px] text-ink2 leading-[1.7]">
              <strong className="text-ink">Nota importante:</strong> El 20% en ETF de
              renta variable es opcional si tienes un horizonte muy corto (&lt;2 años).
              Si tu horizonte es de 3–5 años, ese 20% puede crecer hasta un 30–35%
              sin salirte del perfil conservador.
            </p>
          </div>
        </section>

        {/* Productos concretos */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Productos concretos
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-cream border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-ink">Producto</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Tipo</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Rentabilidad</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Liquidez</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTOS.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-ink">{p.nombre}</td>
                    <td className="px-5 py-4 text-ink3">{p.tipo}</td>
                    <td className="px-5 py-4 text-ink2">{p.rentabilidad}</td>
                    <td className="px-5 py-4 text-ink2">{p.liquidez}</td>
                    <td className="px-5 py-4">
                      <span className="bg-[#BFDBFE] text-[#1E40AF] text-[11.5px] font-semibold px-2 py-[3px] rounded-full">
                        {p.riesgo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rentabilidad esperada */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Rentabilidad esperada
          </h2>
          <div className="bg-paper border border-border rounded-2xl p-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <p className="font-fraunces text-[40px] font-black text-[#1E40AF] leading-none">
                  2–4%
                </p>
                <p className="text-[12px] text-ink3 font-medium mt-1">rentabilidad anual esperada</p>
              </div>
              <div className="flex-1 border-l border-border pl-6">
                <p className="text-[14px] text-ink2 leading-[1.7]">
                  Con la cartera descrita arriba. Los años con mercado positivo podrías
                  llegar al 5–6%. En años malos, el peor escenario razonable es una
                  caída del 3–5%. No es emocionante, pero es predecible.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-1">Escenario pesimista</p>
                <p className="font-fraunces text-[22px] font-black text-red-500">−3%</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-1">Escenario base</p>
                <p className="font-fraunces text-[22px] font-black text-[#1E40AF]">+3%</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-1">Escenario optimista</p>
                <p className="font-fraunces text-[22px] font-black text-[#16A34A]">+6%</p>
              </div>
            </div>
          </div>
        </section>

        {/* El riesgo real de ser demasiado conservador */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            El riesgo real de ser demasiado conservador
          </h2>
          <div className="bg-[#FFF7ED] border border-orange-200 rounded-2xl p-6">
            <p className="text-[15px] text-ink2 leading-[1.7] mb-4">
              Hay un riesgo que el inversor conservador suele ignorar:{' '}
              <strong className="text-ink">la inflación.</strong> Si la inflación está
              al 3% y tu dinero rinde un 1%, estás perdiendo poder adquisitivo cada año.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-2">10.000€ hoy</p>
                <p className="font-fraunces text-[24px] font-black text-ink">10.000€</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-2">En cuenta corriente (0%)<br />tras 10 años con inflación 3%</p>
                <p className="font-fraunces text-[24px] font-black text-red-500">7.374€</p>
                <p className="text-[11px] text-red-500 font-semibold">−26% poder adquisitivo</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.08em] text-ink3 font-semibold mb-2">Con cartera conservadora (3%)<br />tras 10 años</p>
                <p className="font-fraunces text-[24px] font-black text-[#16A34A]">13.439€</p>
                <p className="text-[11px] text-[#16A34A] font-semibold">+34% real</p>
              </div>
            </div>
            <p className="text-[13px] text-ink3 mt-4 leading-relaxed">
              No invertir nada no es la opción segura. Es la opción de perder dinero
              despacio sin darte cuenta.
            </p>
          </div>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="font-fraunces text-[22px] font-black text-ink mb-4">
            Artículos relevantes para este perfil
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/articulo/mejores-cuentas-remuneradas-2026', label: '📖 Mejores cuentas remuneradas 2026', desc: 'Dónde guardar el fondo con rentabilidad' },
              { href: '/articulo/letras-del-tesoro-como-comprarlas-paso-a-paso', label: '📖 Letras del Tesoro: cómo comprarlas', desc: 'Guía paso a paso sin complicaciones' },
              { href: '/herramientas/fondo-emergencia', label: '🛡️ Calculadora fondo de emergencia', desc: 'Cuánto necesitas según tu situación' },
              { href: '/herramientas/interes-compuesto', label: '🧮 Interés compuesto', desc: 'Ve crecer tu cartera en el tiempo' },
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
