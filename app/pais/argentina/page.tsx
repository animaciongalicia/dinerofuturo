import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Finanzas personales en Argentina: cómo cuidar tu guita con inflación y todo',
  description:
    'Guía financiera para Argentina: CEDEARs, dólar MEP, cuentas remuneradas, cómo protegerse de la inflación y qué hacer con los ahorros en pesos. Sin verso.',
  alternates: { canonical: siteUrl('/pais/argentina') },
  openGraph: {
    title: 'Finanzas personales en Argentina — Dinero Futuro',
    description: 'Cómo cuidar tu guita en Argentina, con inflación y todo.',
    type: 'website',
    url: siteUrl('/pais/argentina'),
  },
}

const DOLORES = [
  {
    emoji: '📉',
    titulo: 'El plazo fijo no le gana a la inflación',
    desc: 'Metés la guita a plazo fijo y cuando la sacás, en términos reales tenés menos que antes. Ahorrás en pesos y la inflación te come los ahorros.',
  },
  {
    emoji: '💵',
    titulo: 'No podés comprar dólares libremente',
    desc: 'El cepo cambiario y los límites del dólar ahorro te complican todo. Hay que conocer el dólar MEP y el CCL para dolarizarte legalmente.',
  },
  {
    emoji: '😤',
    titulo: 'No sabés si los CEDEARs son para vos',
    desc: 'Escuchás hablar de CEDEARs todo el tiempo pero no entendés bien qué son, si son seguros, cómo tributan ni por dónde empezar.',
  },
  {
    emoji: '🏦',
    titulo: 'No confiás en el sistema financiero',
    desc: 'El 2001 sigue presente. Tenés plata en efectivo o en el colchón porque no sabés si el banco te la va a devolver el día que la necesitás.',
  },
  {
    emoji: '🤷',
    titulo: 'Cada dos por tres cambian las reglas',
    desc: 'Un día sube el impuesto PAIS, otro lo sacan. Hoy el dólar está en X, mañana hay una nueva medida. Es difícil planificar con tanta incertidumbre.',
  },
  {
    emoji: '💸',
    titulo: 'Los impuestos se comen las ganancias',
    desc: 'Bienes personales, ganancias, impuesto PAIS. Si invertís sin saber cómo tributa cada cosa, la ganancia real puede ser mucho menor de lo que creés.',
  },
]

const SOLUCIONES = [
  {
    titulo: 'Primero: cubrirse de la inflación',
    color: 'bg-sky-50 border-sky-200',
    badge: 'Urgente',
    badgeColor: 'bg-sky-100 text-sky-800',
    pasos: [
      'Plata en efectivo o cuenta corriente sin rendimiento = pérdida garantizada',
      'Mínimo: fondos money market (FCI) como primer paso — rinden todos los días',
      'Mercado Pago y Ualá tienen rendimiento automático desde peso cero',
      'El objetivo: que la plata no pierda valor mientras decidís qué hacer con ella',
    ],
    link: '/nivel/1',
    linkLabel: 'Estrategias de ahorro →',
  },
  {
    titulo: 'Dolarizarte de forma legal',
    color: 'bg-green-50 border-green-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-green-100 text-green-800',
    pasos: [
      'Dólar MEP (o Bolsa): comprás bonos en pesos y los vendés en dólares — 100% legal',
      'No requiere autorización del BCRA ni tiene límite semanal',
      'Bull Market, IOL o Balanz: los brokers más usados para dólar MEP',
      'Sin cepo, sin trámites raros — es la vía más limpia para tener dólares',
    ],
    link: '/nivel/2',
    linkLabel: 'Empezar a invertir →',
  },
  {
    titulo: 'CEDEARs: invertir en el exterior desde Argentina',
    color: 'bg-violet-50 border-violet-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-violet-100 text-violet-800',
    pasos: [
      'CEDEAR = recibo local de una acción extranjera (Apple, Amazon, ETFs)',
      'Se compran en pesos pero siguen al dólar CCL — te protege de devaluación',
      'El CEDEAR del SPY replica el S&P 500 desde tu cuenta en Argentina',
      'Tributa Bienes Personales como cualquier activo financiero — tenelo en cuenta',
    ],
    link: '/articulo/que-es-un-etf-y-como-funciona',
    linkLabel: 'Qué son los ETFs →',
  },
  {
    titulo: 'Fondo de emergencias en pesos y dólares',
    color: 'bg-amber-50 border-amber-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-amber-100 text-amber-800',
    pasos: [
      'Una parte en FCI money market: acceso inmediato, rinde todos los días',
      'Otra parte en dólares físicos o MEP: para emergencias reales o largas',
      'El colchón de emergencias en Argentina tiene que estar dolarizado al menos en parte',
      'No pongas todo en plazo fijo — si necesitás la plata no la vas a poder sacar',
    ],
    link: '/herramientas/fondo-emergencia',
    linkLabel: 'Calcular mi colchón →',
  },
]

const PRODUCTOS = [
  {
    nombre: 'Mercado Pago',
    tipo: 'Billetera digital',
    para: 'Rendimiento automático en pesos, pagos, envíos',
    ventaja: 'Rinde todos los días desde $1, sin mínimos, sin plazo',
  },
  {
    nombre: 'Ualá',
    tipo: 'Neobanco',
    para: 'Cuenta remunerada, tarjeta Mastercard, inversiones',
    ventaja: 'FCI propio con rendimiento automático, muy fácil de usar',
  },
  {
    nombre: 'Brubank',
    tipo: 'Banco digital',
    para: 'Cuenta bancaria 100% digital con rendimiento automático',
    ventaja: 'CBU real, tarjeta de débito, FCI desde la misma app',
  },
  {
    nombre: 'Bull Market / IOL / Balanz',
    tipo: 'Broker',
    para: 'CEDEARs, acciones, bonos, dólar MEP',
    ventaja: 'Los tres más usados para invertir en Argentina — regulados por CNV',
  },
  {
    nombre: 'CEDEARs (SPY, QQQ, KO...)',
    tipo: 'Activo financiero',
    para: 'Invertir en empresas extranjeras desde Argentina en pesos',
    ventaja: 'Protegés el ahorro del tipo de cambio porque siguen al dólar CCL',
  },
  {
    nombre: 'FCI Money Market',
    tipo: 'Fondo de inversión',
    para: 'Alternativa al plazo fijo con liquidez inmediata',
    ventaja: 'Rinde todos los días, podés rescatar en 24-48h hábiles',
  },
]

const GLOSARIO = [
  { termino: 'CEDEAR', def: 'Certificado de Depósito Argentino. Recibo de una acción extranjera que cotiza en pesos en la bolsa argentina.' },
  { termino: 'FCI', def: 'Fondo Común de Inversión. El equivalente a un fondo de inversión en Argentina. Los money market son los más seguros.' },
  { termino: 'Dólar MEP', def: 'Dólar Bolsa o MEP. La forma legal de comprar dólares sin el cepo vendiendo bonos en pesos y recomprándolos en dólares.' },
  { termino: 'Dólar CCL', def: 'Contado con Liquidación. Como el MEP pero para girar fondos al exterior. El tipo de cambio al que se valúan los CEDEARs.' },
  { termino: 'Brecha cambiaria', def: 'Diferencia entre el dólar oficial y el dólar libre (blue o financiero). Afecta todo en la economía argentina.' },
  { termino: 'Bienes Personales', def: 'Impuesto anual sobre el patrimonio neto. Aplica a inversiones, inmuebles y activos financieros — hay que considerarlo.' },
  { termino: 'Plazo fijo UVA', def: 'Depósito bancario ajustado por inflación (UVA). Protege mejor del IPC que el plazo fijo tradicional pero con menos liquidez.' },
  { termino: 'CNV', def: 'Comisión Nacional de Valores. El organismo que regula los mercados financieros en Argentina — como la SEC en EE.UU.' },
]

const ARTICULOS = [
  { href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', label: 'Interés compuesto: ejemplos reales' },
  { href: '/articulo/que-es-un-etf-y-como-funciona', label: 'Qué es un ETF y cómo funciona' },
  { href: '/articulo/diferencia-entre-ahorrar-e-invertir', label: 'La diferencia entre ahorrar e invertir' },
  { href: '/articulo/que-hacer-cuando-la-bolsa-cae', label: 'Qué hacer cuando la bolsa cae' },
  { href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera de inversión para principiantes' },
  { href: '/articulo/fondo-de-emergencia-cuanto-necesitas', label: 'Fondo de emergencia: cuánto necesitas' },
]

export default function ArgentinaPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Finanzas en Argentina</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="relative bg-[#74ACDF] rounded-2xl px-8 py-10 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 text-[120px] opacity-15 leading-none select-none pr-4 pt-2">🇦🇷</div>
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-white/80 mb-2">
              Finanzas personales en Argentina
            </p>
            <h1 className="font-fraunces text-[38px] font-black text-white leading-tight mb-4 max-sm:text-[28px]">
              Cuidá tu guita, con inflación y todo
            </h1>
            <p className="text-[17px] text-white/90 leading-[1.7] max-w-[560px]">
              Argentina tiene reglas propias: cepo, inflación, brecha cambiaria. Acá
              aprendés a moverte en ese contexto — CEDEARs, dólar MEP, cuentas remuneradas
              y cómo no perder poder adquisitivo sin complicarte la vida.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-white text-[#4A90D9] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                🧭 ¿Qué hago con mi guita?
              </Link>
              <Link
                href="/nivel/0"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors"
              >
                Empezar desde cero →
              </Link>
            </div>
          </div>

          {/* Contexto especial Argentina */}
          <div className="border border-amber-200 bg-amber-50 rounded-xl px-5 py-4 mb-10 flex gap-3">
            <span className="text-[22px] shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="font-semibold text-[14px] text-amber-900 mb-1">El contexto argentino es único</p>
              <p className="text-[13.5px] text-amber-800 leading-[1.6]">
                Las finanzas en Argentina requieren adaptarse a reglas que cambian. Los consejos genéricos de "metelo en el banco y olvidate"
                acá no aplican. Esta guía está pensada para moverse dentro de ese contexto real, con las herramientas disponibles.
              </p>
            </div>
          </div>

          {/* Dolores */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              ¿Te suena alguno de estos?
            </h2>
            <p className="text-[15px] text-ink2 mb-6">Si dijiste que sí a más de uno, estás en el lugar indicado.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOLORES.map((d) => (
                <div key={d.titulo} className="border border-border rounded-xl p-5 hover:border-sage hover:shadow-card transition-all">
                  <div className="text-[24px] mb-2">{d.emoji}</div>
                  <h3 className="font-semibold text-[15px] text-ink mb-1">{d.titulo}</h3>
                  <p className="text-[13.5px] text-ink2 leading-[1.6]">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Soluciones */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Cómo moverse en la Argentina de hoy
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              No hay fórmulas mágicas, pero sí un orden que tiene sentido.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SOLUCIONES.map((s) => (
                <div key={s.titulo} className={`border rounded-xl p-6 ${s.color}`}>
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                  <h3 className="font-fraunces font-black text-[18px] text-ink mb-3">{s.titulo}</h3>
                  <ul className="space-y-2 mb-4">
                    {s.pasos.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink2">
                        <span className="text-forest mt-0.5 shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.link} className="text-[13px] font-semibold text-forest hover:underline">
                    {s.linkLabel}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Productos */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Plataformas y productos disponibles
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Todos regulados por el BCRA o la CNV. Sin esquemas raros.
            </p>
            <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
              {PRODUCTOS.map((p) => (
                <div key={p.nombre} className="flex items-start gap-4 px-5 py-4 hover:bg-cream/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-[15px] text-ink">{p.nombre}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-cream text-ink3">{p.tipo}</span>
                    </div>
                    <p className="text-[13px] text-ink3 mb-0.5">{p.para}</p>
                    <p className="text-[13px] text-ink2">✓ {p.ventaja}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Artículos */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">Artículos para empezar</h2>
            <p className="text-[15px] text-ink2 mb-5">Conceptos que aplican en Argentina igual que en cualquier parte.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARTICULOS.map((a) => (
                <Link key={a.href} href={a.href}
                  className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 hover:border-sage hover:shadow-card transition-all group">
                  <span className="text-forest text-[16px]">→</span>
                  <span className="text-[14px] font-medium text-ink group-hover:text-forest transition-colors">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Glosario */}
          <section className="mb-8">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">Glosario: el vocabulario argentino</h2>
            <p className="text-[15px] text-ink2 mb-5">Términos que vas a escuchar si invertís en Argentina.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GLOSARIO.map((g) => (
                <div key={g.termino} className="border border-border rounded-xl px-4 py-3">
                  <span className="font-bold text-[14px] text-ink">{g.termino}</span>
                  <p className="text-[13px] text-ink2 mt-0.5">{g.def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-forest rounded-2xl px-8 py-7 text-white text-center">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-green-300 mb-2">Diagnóstico personalizado</p>
            <h3 className="font-fraunces text-[24px] font-black mb-2">¿No sabés por dónde arrancar?</h3>
            <p className="text-[15px] text-green-100 mb-5">Respondé 7 preguntas y te damos un plan financiero ajustado a tu situación.</p>
            <Link href="/que-hacer-con-mi-dinero"
              className="inline-flex items-center gap-2 bg-white text-forest font-bold text-[15px] px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
              🧭 Hacer el diagnóstico gratis
            </Link>
          </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
