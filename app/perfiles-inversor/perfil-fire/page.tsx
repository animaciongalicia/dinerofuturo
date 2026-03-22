import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Perfil FIRE: independencia financiera y retiro anticipado en España | Dinero Futuro',
  description:
    'Guía completa del movimiento FIRE en España. Los 4 tipos de FIRE, la regla del 4%, tu número FIRE, tasa de ahorro y cómo funciona con los impuestos españoles.',
  alternates: { canonical: siteUrl('/perfiles-inversor/perfil-fire') },
  openGraph: {
    title: 'Perfil FIRE: independencia financiera en España — Dinero Futuro',
    description: 'Todo sobre FIRE: regla del 4%, número FIRE, tasa de ahorro y peculiaridades españolas.',
    type: 'website',
    url: siteUrl('/perfiles-inversor/perfil-fire'),
  },
}

const TIPOS_FIRE = [
  {
    nombre: 'LeanFIRE',
    emoji: '🌿',
    desc: 'Vivir con poco. Gastos muy reducidos (generalmente menos de 25.000€/año). Ideal si valoras la libertad por encima del consumo y vives en zonas con bajo coste de vida.',
    numero: '~300.000–600.000€',
  },
  {
    nombre: 'FatFIRE',
    emoji: '💎',
    desc: 'Libertad financiera sin recortes. Gastos altos (60.000€/año o más). Necesitas un patrimonio mucho mayor, pero mantienes tu nivel de vida actual o lo mejoras.',
    numero: '~1.500.000€+',
  },
  {
    nombre: 'CoastFIRE',
    emoji: '🏄',
    desc: 'Alcanzas un patrimonio suficiente para que crezca solo hasta la jubilación. No necesitas aportar más — solo dejar que el interés compuesto haga su trabajo mientras trabajas en lo que quieras.',
    numero: 'Depende de tu edad y gastos',
  },
  {
    nombre: 'BaristaFIRE',
    emoji: '☕',
    desc: 'Dejas tu trabajo exigente y pasas a uno part-time o menos estresante que cubra los gastos básicos. Tu patrimonio cubre el resto. Combina ingresos activos y rentas pasivas.',
    numero: 'Patrimonio parcial (~400.000–800.000€)',
  },
]

const TABLA_AHORRO = [
  { tasa: '10%', descripcion: 'Ahorro estándar', anos: 51 },
  { tasa: '20%', descripcion: 'Ahorro comprometido', anos: 37 },
  { tasa: '30%', descripcion: 'Foco en FIRE', anos: 28 },
  { tasa: '40%', descripcion: 'FIRE como objetivo principal', anos: 22 },
  { tasa: '50%', descripcion: 'FIRE agresivo', anos: 17 },
  { tasa: '65%', descripcion: 'Extreme FIRE', anos: 11 },
]

const CARTERA = [
  { nombre: 'ETF global (MSCI World / S&P 500)', pct: 60, color: 'bg-[#FED7AA]', label: '60%' },
  { nombre: 'ETF mercados emergentes', pct: 15, color: 'bg-[#FDBA74]', label: '15%' },
  { nombre: 'ETF dividendos (VHYL, IDIV)', pct: 15, color: 'bg-[#FB923C]', label: '15%' },
  { nombre: 'Liquidez (12 meses de gastos)', pct: 10, color: 'bg-[#FEF3C7]', label: '10%' },
]

export default function PerfilFirePage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/perfiles-inversor" className="hover:text-forest transition-colors">Perfiles de inversor</Link>
        <span>/</span>
        <span className="text-ink font-medium">Perfil FIRE</span>
      </nav>

      <div className="max-w-[760px]">

        {/* Hero */}
        <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FED7AA] flex items-center justify-center text-[30px]">
              🔥
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-[#7C2D12] mb-1">
                Perfil de inversor
              </p>
              <h1 className="font-fraunces text-[34px] font-black text-ink leading-tight max-sm:text-[26px]">
                FIRE: Independencia financiera
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-ink2 leading-[1.7]">
            Tu objetivo es <strong className="text-ink">no depender de un salario.</strong>{' '}
            Maximizas la tasa de ahorro, construyes un patrimonio que genere rentas
            pasivas y, llegado el momento, decides si sigues trabajando — o no. El
            trabajo se convierte en una opción, no en una obligación.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#FED7AA] text-[#7C2D12]">
              Horizonte: 10–20 años
            </span>
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#FED7AA] text-[#7C2D12]">
              Riesgo: Medio-alto
            </span>
          </div>
        </div>

        {/* ¿Qué es FIRE? */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            ¿Qué es FIRE?
          </h2>
          <div className="bg-paper border border-border rounded-2xl p-6">
            <p className="text-[15px] text-ink2 leading-[1.7] mb-4">
              <strong className="text-ink">FIRE</strong> son las siglas de{' '}
              <em>Financial Independence, Retire Early</em> (independencia financiera,
              retiro anticipado). El movimiento nació en los años 90 con el libro{' '}
              <em>Your Money or Your Life</em> de Vicki Robin y se popularizó en la
              última década gracias a blogs como Mr. Money Mustache.
            </p>
            <p className="text-[15px] text-ink2 leading-[1.7]">
              La idea central es simple: si acumulas suficiente patrimonio invertido,
              los rendimientos de ese patrimonio pueden cubrir tus gastos indefinidamente.
              No necesitas trabajar más. El "retiro anticipado" no significa no hacer nada
              — significa elegir qué hacer con tu tiempo.
            </p>
          </div>
        </section>

        {/* Los 4 tipos de FIRE */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Los 4 tipos de FIRE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPOS_FIRE.map((tipo) => (
              <div
                key={tipo.nombre}
                className="bg-paper border border-border rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[22px]">{tipo.emoji}</span>
                  <h3 className="font-fraunces text-[18px] font-black text-ink">{tipo.nombre}</h3>
                </div>
                <p className="text-[13.5px] text-ink2 leading-[1.65] mb-3">{tipo.desc}</p>
                <div className="bg-cream rounded-lg px-3 py-2">
                  <p className="text-[11.5px] font-semibold text-ink3">
                    Patrimonio necesario aprox.: <span className="text-ink">{tipo.numero}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* La matemática del FIRE */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            La matemática del FIRE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Regla del 4% */}
            <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-5">
              <h3 className="font-fraunces text-[20px] font-black text-ink mb-2">
                La regla del 4%
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7] mb-3">
                Si retiras el 4% de tu patrimonio cada año, las probabilidades de que
                ese patrimonio dure 30+ años son históricamente muy altas (~96%).
                Fue publicada en el estudio Trinity (1998) y es el pilar de FIRE.
              </p>
              <div className="bg-white rounded-xl p-3 text-center">
                <p className="text-[11px] uppercase tracking-[.07em] text-ink3 font-semibold mb-1">
                  Si gastas 24.000€/año
                </p>
                <p className="font-fraunces text-[28px] font-black text-[#7C2D12]">
                  600.000€
                </p>
                <p className="text-[11.5px] text-ink3">es tu número FIRE (24.000 × 25)</p>
              </div>
            </div>

            {/* Número FIRE */}
            <div className="bg-paper border border-border rounded-2xl p-5">
              <h3 className="font-fraunces text-[20px] font-black text-ink mb-2">
                Tu número FIRE
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7] mb-3">
                Es el patrimonio que necesitas para ser financieramente independiente.
                Se calcula multiplicando tus gastos anuales por 25.
              </p>
              <div className="bg-cream rounded-xl p-3">
                <div className="text-[14px] text-ink2 space-y-1">
                  <div className="flex justify-between">
                    <span>Gastos anuales × 25</span>
                    <span className="font-bold text-ink">= Número FIRE</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-ink3">
                    <span>20.000€/año × 25</span>
                    <span>= 500.000€</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-ink3">
                    <span>30.000€/año × 25</span>
                    <span>= 750.000€</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-ink3">
                    <span>40.000€/año × 25</span>
                    <span>= 1.000.000€</span>
                  </div>
                </div>
              </div>
              <Link
                href="/herramientas/numero-fire"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-forest mt-3 hover:text-forest/70 transition-colors"
              >
                Calcular mi número FIRE exacto →
              </Link>
            </div>
          </div>
        </section>

        {/* Tu cartera FIRE */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            Tu cartera FIRE
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-6">
            Similar al perfil dinámico, pero con más énfasis en activos que generen
            flujo de caja (dividendos) y una mayor reserva de liquidez para cubrir
            los primeros años del retiro sin necesidad de vender en un mal momento.
          </p>

          {/* Barra visual */}
          <div className="mb-5">
            <div className="flex h-10 rounded-xl overflow-hidden mb-3">
              {CARTERA.map((c) => (
                <div
                  key={c.nombre}
                  style={{ width: `${c.pct}%` }}
                  className={`${c.color} flex items-center justify-center text-[12px] font-bold text-[#7C2D12]`}
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

          <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-xl p-5">
            <p className="text-[14px] text-ink2 leading-[1.7]">
              <strong className="text-ink">La liquidez de 12 meses</strong> es el
              "colchón del retiro". Si el mercado cae un 40% en el año 1 de tu retiro,
              vives de esta reserva y no vendes acciones en el peor momento. Es la
              versión ampliada del fondo de emergencia tradicional.
            </p>
          </div>
        </section>

        {/* Tasa de ahorro */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            La tasa de ahorro: el factor más importante
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-5">
            La tasa de ahorro tiene más impacto en cuándo alcanzas FIRE que la
            rentabilidad de tus inversiones. Cuanto más ahorras, más rápido llegas.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-cream border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-ink">Tasa de ahorro</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Descripción</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Años hasta FIRE</th>
                </tr>
              </thead>
              <tbody>
                {TABLA_AHORRO.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center font-black font-fraunces text-[18px] ${
                        row.anos <= 15 ? 'text-[#16A34A]' :
                        row.anos <= 25 ? 'text-[#7C2D12]' :
                        'text-ink3'
                      }`}>{row.tasa}</span>
                    </td>
                    <td className="px-5 py-4 text-ink2">{row.descripcion}</td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold ${
                        row.anos <= 15 ? 'text-[#16A34A]' :
                        row.anos <= 25 ? 'text-[#7C2D12]' :
                        'text-ink3'
                      }`}>{row.anos} años</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12.5px] text-ink3 mt-3 leading-relaxed">
            Asumiendo rentabilidad del 7% anual, empezando desde cero con gastos anuales fijos.
            El punto de partida y las circunstancias personales modifican estos números.
          </p>
        </section>

        {/* FIRE en España */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            El FIRE en España: lo que cambia
          </h2>
          <div className="space-y-4">
            <div className="bg-paper border border-border rounded-xl p-5">
              <h3 className="font-semibold text-[15px] text-ink mb-2">
                Impuestos sobre las ganancias (IRPF)
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                En España, los rendimientos del capital tributan entre el 19% y el 28%
                según tramo. Esto reduce efectivamente tu tasa de retirada segura. Muchos
                FIRE españoles calculan con una tasa del 3,5% en lugar del 4% para ser
                conservadores. Planifica con tu asesor fiscal.
              </p>
            </div>

            <div className="bg-paper border border-border rounded-xl p-5">
              <h3 className="font-semibold text-[15px] text-ink mb-2">
                La pensión pública como seguro de longevidad
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                Si cotizas suficientes años antes del retiro FIRE, tendrás derecho a
                una pensión pública cuando llegues a la edad legal de jubilación (actualmente
                67 años). Esto reduce enormemente el riesgo de quedarse sin dinero en la
                vejez. Es una ventaja del FIRE europeo frente al estadounidense.
              </p>
            </div>

            <div className="bg-paper border border-border rounded-xl p-5">
              <h3 className="font-semibold text-[15px] text-ink mb-2">
                Sanidad pública: la ventaja española
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                En EEUU, el mayor gasto post-retiro suele ser el seguro médico privado.
                En España, la sanidad pública cubre la mayoría de las necesidades.
                Esto reduce significativamente el número FIRE necesario para vivir bien.
              </p>
            </div>

            <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-xl p-5">
              <h3 className="font-semibold text-[15px] text-ink mb-2">
                Autónomo o sociedad patrimonial
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                Muchos FIRE en España utilizan una sociedad limitada patrimonial para
                gestionar su cartera, ya que el tipo del Impuesto de Sociedades (25%)
                puede ser más eficiente que el IRPF personal para rentas altas. Es
                una estrategia avanzada que requiere asesoramiento profesional.
              </p>
            </div>
          </div>
        </section>

        {/* Herramientas */}
        <section className="mb-12">
          <h2 className="font-fraunces text-[22px] font-black text-ink mb-4">
            Herramientas y artículos para tu camino FIRE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/herramientas/numero-fire', label: '🔥 Calculadora número FIRE', desc: 'Cuánto necesitas y cuándo lo alcanzas' },
              { href: '/herramientas/interes-compuesto', label: '🧮 Calculadora de interés compuesto', desc: 'El poder del tiempo sobre tu cartera' },
              { href: '/articulo/cartera-inversion-principiantes-modelo', label: '📖 Cartera de inversión: modelo práctico', desc: 'Construye tu cartera FIRE paso a paso' },
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

      </div>
    </div>
  )
}
