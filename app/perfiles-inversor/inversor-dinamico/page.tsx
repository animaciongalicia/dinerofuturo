import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Perfil inversor dinámico: máximo crecimiento a largo plazo',
  description:
    'Guía del inversor dinámico o de crecimiento. Cartera 90% renta variable, cómo gestionar la volatilidad, el efecto del tiempo y errores a evitar.',
  alternates: { canonical: siteUrl('/perfiles-inversor/inversor-dinamico') },
  openGraph: {
    title: 'Perfil inversor dinámico — Dinero Futuro',
    description: 'Máximo crecimiento a largo plazo. Cartera, volatilidad como aliada y errores a evitar.',
    type: 'website',
    url: siteUrl('/perfiles-inversor/inversor-dinamico'),
  },
}

const CHECKLIST = [
  'Tu horizonte de inversión es de 15 años o más',
  'Tienes el fondo de emergencia completo y ninguna deuda de consumo',
  'Puedes ver una caída del 40–50% en tu cartera sin vender',
  'Entiendes que la volatilidad es el precio que pagas por la rentabilidad superior',
  'Tu objetivo principal es el máximo crecimiento del capital a largo plazo',
]

const CARTERA = [
  { nombre: 'ETF global (MSCI World/S&P500)', pct: 60, color: 'bg-[#DDD6FE]', label: '60%' },
  { nombre: 'ETF mercados emergentes', pct: 20, color: 'bg-[#C4B5FD]', label: '20%' },
  { nombre: 'ETF small caps', pct: 15, color: 'bg-[#A78BFA]', label: '15%' },
  { nombre: 'Liquidez estratégica', pct: 5, color: 'bg-[#EDE9FE]', label: '5%' },
]

const TABLA_TIEMPO = [
  { años: 10, capital: '10.000€', resultado7: '19.672€', resultado10: '25.937€' },
  { años: 20, capital: '10.000€', resultado7: '38.697€', resultado10: '67.275€' },
  { años: 30, capital: '10.000€', resultado7: '76.123€', resultado10: '174.494€' },
]

const ERRORES = [
  {
    titulo: 'Apalancamiento: invertir con dinero prestado',
    desc: 'Los CFDs, el margen o los préstamos para invertir multiplican tanto las ganancias como las pérdidas. Un inversor dinámico no necesita apalancamiento — el tiempo hace el trabajo.',
  },
  {
    titulo: 'Criptomonedas sin criterio como base de cartera',
    desc: 'Bitcoin y otras criptos pueden ser una posición especulativa del 5–10% de la cartera. Pero construir toda la estrategia sobre ellas es apostar, no invertir. La volatilidad es extrema y no tiene fundamentales claros.',
  },
  {
    titulo: 'Stock picking: intentar elegir las acciones ganadoras',
    desc: 'El 90% de los gestores profesionales no baten al índice a largo plazo. Un particular que intenta elegir acciones individuales tiene las probabilidades aún más en contra.',
  },
  {
    titulo: 'Vender en pánico cuando el mercado cae un 30%',
    desc: 'Es exactamente lo contrario de lo que hay que hacer. Las caídas son oportunidades de compra para el inversor dinámico. El que aguanta — o compra más — es quien obtiene los mejores retornos históricos.',
  },
]

export default function InversorDinamicoPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/perfiles-inversor" className="hover:text-forest transition-colors">Perfiles de inversor</Link>
        <span>/</span>
        <span className="text-ink font-medium">Inversor dinámico</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0 max-w-[760px]">

        {/* Hero */}
        <div className="bg-[#F5F3FF] border border-[#C4B5FD] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DDD6FE] flex items-center justify-center text-[30px]">
              🚀
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-[#4C1D95] mb-1">
                Perfil de inversor
              </p>
              <h1 className="font-fraunces text-[34px] font-black text-ink leading-tight max-sm:text-[26px]">
                Inversor dinámico / Crecimiento
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-ink2 leading-[1.7]">
            Buscas máximo crecimiento a largo plazo. Entiendes que la volatilidad es
            parte del camino y no te asusta — de hecho, las caídas las ves como
            oportunidades. Tu horizonte temporal es largo y{' '}
            <strong className="text-ink">el tiempo es tu mayor activo.</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#DDD6FE] text-[#4C1D95]">
              Horizonte: Largo plazo (15+ años)
            </span>
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#DDD6FE] text-[#4C1D95]">
              Riesgo: Alto
            </span>
          </div>
        </div>

        {/* ¿Eres tú? */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">¿Eres tú?</h2>
          <div className="bg-paper border border-border rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-border last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#C4B5FD] bg-[#F5F3FF] flex-shrink-0 mt-[2px]" />
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
            Prácticamente toda la cartera en renta variable. Sin bonos, o con una
            posición mínima. La diversificación viene del tipo de activos de renta
            variable, no de añadir activos defensivos.
          </p>

          {/* Barra visual */}
          <div className="mb-5">
            <div className="flex h-10 rounded-xl overflow-hidden mb-3">
              {CARTERA.map((c) => (
                <div
                  key={c.nombre}
                  style={{ width: `${c.pct}%` }}
                  className={`${c.color} flex items-center justify-center text-[12px] font-bold text-[#4C1D95]`}
                >
                  {c.pct >= 10 ? c.label : ''}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

          <div className="bg-[#F5F3FF] border border-[#C4B5FD] rounded-xl p-5">
            <p className="text-[14px] text-ink2 leading-[1.7]">
              <strong className="text-ink">¿Por qué 0% renta fija?</strong> Con un
              horizonte de 15+ años, los ciclos económicos se suavizan. Históricamente,
              cualquier período de 15 años en el S&P 500 ha terminado en positivo.
              Añadir renta fija solo reduce el rendimiento esperado a largo plazo sin
              proteger de lo que realmente importa: el largo plazo.
            </p>
          </div>
        </section>

        {/* Gestionar volatilidad */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Gestiona la volatilidad como ventaja
          </h2>
          <div className="bg-paper border border-border rounded-2xl p-6">
            <p className="text-[15px] text-ink2 leading-[1.7] mb-5">
              Cuando el mercado cae un 30%, la reacción instintiva es vender. El inversor
              dinámico hace lo contrario: <strong className="text-ink">compra más.</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.07em] text-red-500 font-semibold mb-2">El inversor que vende</p>
                <p className="text-[13px] text-ink2 leading-[1.5]">
                  Vende con pérdidas, pierde el rebote, vuelve a comprar más caro.
                  Rentabilidad real: muy por debajo del índice.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.07em] text-yellow-600 font-semibold mb-2">El inversor que aguanta</p>
                <p className="text-[13px] text-ink2 leading-[1.5]">
                  No hace nada. El mercado recupera. Obtiene la rentabilidad del índice.
                  Válido para el perfil moderado.
                </p>
              </div>
              <div className="bg-[#F5F3FF] border border-[#C4B5FD] rounded-xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-[.07em] text-[#4C1D95] font-semibold mb-2">El inversor dinámico</p>
                <p className="text-[13px] text-ink2 leading-[1.5]">
                  Compra más durante la caída. Cuando el mercado recupera, tiene
                  más participaciones a precio rebajado.
                </p>
              </div>
            </div>
            <p className="text-[13px] text-ink3 leading-relaxed">
              Para esto sirve la liquidez estratégica del 5–10%: no para estar fuera del
              mercado, sino para aprovechar las caídas. Y para nuevas aportaciones mensuales
              que no debes pausar cuando el mercado cae.
            </p>
          </div>
        </section>

        {/* Factor tiempo */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            El factor tiempo: la tabla que lo explica todo
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-cream border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-ink">Capital inicial</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Años</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Al 7% anual</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Al 10% anual</th>
                </tr>
              </thead>
              <tbody>
                {TABLA_TIEMPO.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-ink">{row.capital}</td>
                    <td className="px-5 py-4 text-ink2">{row.años} años</td>
                    <td className="px-5 py-4 font-semibold text-[#4C1D95]">{row.resultado7}</td>
                    <td className="px-5 py-4 font-semibold text-[#16A34A]">{row.resultado10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-ink3 mt-3 leading-relaxed">
            El 7% es una estimación conservadora para una cartera de renta variable
            diversificada. El 10% es el retorno histórico nominal del S&P 500. Ambos
            son escenarios sin contar aportaciones mensuales adicionales.
          </p>
          <Link
            href="/herramientas/interes-compuesto"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-forest mt-2 hover:text-forest/70 transition-colors"
          >
            Calcula tu escenario personalizado →
          </Link>
        </section>

        {/* Errores */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Errores del inversor agresivo
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
              { href: '/articulo/que-hacer-cuando-la-bolsa-cae', label: '📖 Qué hacer cuando la bolsa cae', desc: 'Cómo actuar (y no actuar) en una corrección' },
              { href: '/herramientas/interes-compuesto', label: '🧮 Calculadora de interés compuesto', desc: 'Ve crecer tu cartera en el tiempo' },
              { href: '/articulo/cartera-inversion-principiantes-modelo', label: '📖 Cartera de inversión: modelo práctico', desc: 'Construye tu cartera paso a paso' },
              { href: '/perfiles-inversor/perfil-fire', label: '🔥 Perfil FIRE', desc: 'El siguiente paso: independencia financiera' },
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
