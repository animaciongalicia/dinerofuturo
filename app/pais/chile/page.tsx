import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Finanzas personales en Chile: APV, AFP, Fintual y cómo hacer crecer tus lucas',
  description:
    'Guía financiera para Chile: APV, AFP bien elegida, Fintual, salir de deudas de retail y hacer crecer tus ahorros. Explicado sin tecnicismos.',
  alternates: { canonical: siteUrl('/pais/chile') },
  openGraph: {
    title: 'Finanzas personales en Chile — Dinero Futuro',
    description: 'APV, AFP, Fintual y cómo hacer crecer tus lucas en Chile.',
    type: 'website',
    url: siteUrl('/pais/chile'),
  },
}

const DOLORES = [
  {
    emoji: '😤',
    titulo: 'Las AFP me roban las lucas',
    desc: 'Llevas años cotizando y cuando ves tu saldo te da rabia. Las comisiones se comen una parte, los rendimientos no siempre acompañan y sientes que el sistema no trabaja para ti.',
  },
  {
    emoji: '💳',
    titulo: 'Las deudas de retail no bajan',
    desc: 'CMR Falabella, Ripley Card, La Polar. Las tasas de las tarjetas de retail llegan al 40-50% anual. Pagas cada mes pero la deuda no baja porque los intereses te consumen.',
  },
  {
    emoji: '🏠',
    titulo: 'El arriendo se come todo el sueldo',
    desc: 'En Santiago el arriendo puede significar el 40-50% del sueldo. Queda poco para ahorrar e invertir, y la sensación es que nunca vas a poder comprar.',
  },
  {
    emoji: '🤔',
    titulo: 'No entiendes el APV ni si te conviene',
    desc: 'El APV es la mejor herramienta fiscal que tiene Chile para el ciudadano de a pie, pero nadie la explica bien. ¿Régimen A o B? ¿APV o Cuenta 2?',
  },
  {
    emoji: '📊',
    titulo: 'No sabes en qué Fondo de AFP estar',
    desc: 'Fondos A, B, C, D, E — y nadie te explicó cuál corresponde a tu edad y horizonte. La AFP te pone en uno por defecto que quizás no es el más conveniente.',
  },
  {
    emoji: '😰',
    titulo: 'No te alcanza para llegar a los mínimos de inversión',
    desc: 'Muchos fondos mutuos piden 500.000 o 1.000.000 de pesos para entrar. Con lo que sobra a fin de mes eso parece imposible, aunque ya no lo sea con Fintual y Racional.',
  },
]

const SOLUCIONES = [
  {
    titulo: 'Primero: liquidar las deudas de retail',
    color: 'bg-red-50 border-red-200',
    badge: 'Urgente',
    badgeColor: 'bg-red-100 text-red-800',
    pasos: [
      'CMR, Ripley, Hites: tasas del 30-50% anual son las deudas más caras de Chile',
      'Consolida en un crédito de consumo del banco si la tasa es menor',
      'Paga mínimo en todas menos en la de mayor tasa — ahí metes todo',
      'Una vez pagadas: córtalas o úsalas solo si pagas el total cada mes',
    ],
    link: '/articulo/deudas-como-salir-por-donde-empezar',
    linkLabel: 'Cómo salir de deudas →',
  },
  {
    titulo: 'Activa el APV — la ventaja fiscal que casi nadie usa',
    color: 'bg-blue-50 border-blue-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-blue-100 text-blue-800',
    pasos: [
      'APV Régimen A: el Estado te bonifica el 15% de lo que aportas (tope anual)',
      'APV Régimen B: deduces de impuestos — mejor si pagas impuesto de 2ª categoría',
      'Puedes abrirlo en tu AFP, en Fintual, Racional, o en un banco',
      'Con $50.000 mensuales ya tiene sentido abrir uno — no hay mínimo real',
    ],
    link: '/nivel/2',
    linkLabel: 'Guía de inversión →',
  },
  {
    titulo: 'Elige bien tu Fondo AFP',
    color: 'bg-amber-50 border-amber-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-amber-100 text-amber-800',
    pasos: [
      'Fondo A: máximo riesgo y rentabilidad — para menores de 35 años con horizonte largo',
      'Fondo C: equilibrio riesgo/rentabilidad — para 35-50 años',
      'Fondos D y E: conservadores — para quienes están cerca de jubilar',
      'Compara rendimientos netos en el comparador de la Superintendencia de Pensiones',
    ],
    link: '/herramientas/fondo-emergencia',
    linkLabel: 'Calcular mi colchón →',
  },
  {
    titulo: 'Invierte con Fintual o Racional',
    color: 'bg-green-50 border-green-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-green-100 text-green-800',
    pasos: [
      'Fintual: 4 carteras (Risky Norris → Johanna), desde $1 — las más populares en Chile',
      'Racional: similar a Fintual, quizás mejor para quien ya sabe algo más',
      'Ambas invierten en ETFs internacionales — diversificación global desde Chile',
      'Sin mínimos reales, sin comisiones de entrada, reguladas por la CMF',
    ],
    link: '/articulo/que-es-un-etf-y-como-funciona',
    linkLabel: 'Qué son los ETFs →',
  },
]

const PRODUCTOS = [
  {
    nombre: 'APV (Ahorro Previsional Voluntario)',
    tipo: 'Ahorro con beneficio fiscal',
    para: 'Complementar la pensión con ventaja tributaria',
    ventaja: 'El Estado te bonifica o deduces impuestos — es el mejor beneficio fiscal disponible',
  },
  {
    nombre: 'Cuenta 2 AFP',
    tipo: 'Ahorro voluntario',
    para: 'Ahorro de libre disponibilidad en tu AFP actual',
    ventaja: 'Puedes retirar cuando quieras, sin penalización — no tiene el bloqueo de la AFP',
  },
  {
    nombre: 'Fintual',
    tipo: 'Robo-advisor',
    para: 'Invertir en ETFs globales desde Chile sin complicaciones',
    ventaja: 'Desde $1, CMF regulado, 4 perfiles de riesgo, interfaz muy intuitiva',
  },
  {
    nombre: 'Racional',
    tipo: 'Robo-advisor',
    para: 'Carteras indexadas de bajo costo para ahorradores chilenos',
    ventaja: 'Más opciones de personalización que Fintual, similar estructura de costos',
  },
  {
    nombre: 'Cuenta RUT BancoEstado',
    tipo: 'Cuenta bancaria gratuita',
    para: 'Cuenta de transacciones básica sin costo de mantenimiento',
    ventaja: 'Universal, sin requisitos — la base para empezar si no tienes cuenta bancaria',
  },
  {
    nombre: 'AFP (A, B, C, D, E)',
    tipo: 'Pensión obligatoria',
    para: 'Cotización mensual obligatoria del 10% del sueldo imponible',
    ventaja: 'Elige bien el Fondo según tu edad — la diferencia en 30 años puede ser enorme',
  },
]

const GLOSARIO = [
  { termino: 'APV', def: 'Ahorro Previsional Voluntario. La mejor herramienta fiscal de Chile: bonificación del Estado o deducción de impuestos.' },
  { termino: 'AFP', def: 'Administradora de Fondos de Pensiones. Gestiona la cotización obligatoria del 10% del sueldo. Hay 7 AFPs activas.' },
  { termino: 'Cuenta 2 AFP', def: 'Cuenta de ahorro voluntario en tu AFP. Puedes retirar cuando quieras, sin bloqueos de jubilación.' },
  { termino: 'CMF', def: 'Comisión para el Mercado Financiero. El regulador financiero chileno — como la CNMV en España.' },
  { termino: 'FOGAPE', def: 'Fondo de Garantía para Pequeños y Medianos Empresarios. Avales del Estado para créditos de PYMEs.' },
  { termino: 'UF', def: 'Unidad de Fomento. Unidad de cuenta ajustada diariamente por inflación. Hipotecas, arriendos y contratos se expresan en UF.' },
  { termino: 'CAE', def: 'Crédito con Aval del Estado. El crédito universitario más usado — muchos chilenos lo arrastran más de 10 años.' },
  { termino: 'Fondos A-E', def: 'Los 5 tipos de Fondo de AFP, de mayor a menor riesgo. A=máximo riesgo/rentabilidad, E=mínimo riesgo/capital.' },
]

const ARTICULOS = [
  { href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', label: 'Interés compuesto: ejemplos reales' },
  { href: '/articulo/que-es-un-etf-y-como-funciona', label: 'Qué es un ETF y cómo funciona' },
  { href: '/articulo/como-empezar-a-invertir-desde-cero', label: 'Cómo empezar a invertir desde cero' },
  { href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Deudas: cómo salir y por dónde empezar' },
  { href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera de inversión para principiantes' },
  { href: '/articulo/diferencia-entre-ahorrar-e-invertir', label: 'La diferencia entre ahorrar e invertir' },
]

export default function ChilePage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Finanzas en Chile</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="relative bg-[#D52B1E] rounded-2xl px-8 py-10 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none pr-4 pt-2">🇨🇱</div>
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-red-200 mb-2">
              Finanzas personales en Chile
            </p>
            <h1 className="font-fraunces text-[38px] font-black text-white leading-tight mb-4 max-sm:text-[28px]">
              Hacé rendir tus lucas de verdad
            </h1>
            <p className="text-[17px] text-red-100 leading-[1.7] max-w-[560px]">
              AFP, APV, Fintual, deudas de retail. Chile tiene un sistema financiero
              potente pero nadie te enseña a usarlo bien. Acá aprendes a tomar las
              decisiones que hacen diferencia de verdad.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-white text-[#D52B1E] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
              >
                🧭 ¿Qué hago con mis lucas?
              </Link>
              <Link
                href="/nivel/0"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors"
              >
                Empezar desde cero →
              </Link>
            </div>
          </div>

          {/* Dolores */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              ¿Te suena alguno de estos?
            </h2>
            <p className="text-[15px] text-ink2 mb-6">Si te identificas con más de uno, estás en el lugar correcto.</p>
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
              Por dónde empezar en Chile
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Las finanzas tienen un orden que funciona. Salta el orden y tarda el doble.
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
              Productos y plataformas en Chile
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Todos regulados por la CMF o la Superintendencia de Pensiones.
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
            <p className="text-[15px] text-ink2 mb-5">Conceptos que aplican igual en Chile que en cualquier parte del mundo.</p>
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
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">El vocabulario financiero chileno</h2>
            <p className="text-[15px] text-ink2 mb-5">Las palabras que te vas a encontrar al manejar tu dinero en Chile.</p>
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
            <h3 className="font-fraunces text-[24px] font-black mb-2">¿No sabes por dónde empezar?</h3>
            <p className="text-[15px] text-green-100 mb-5">Responde 7 preguntas y te damos un plan financiero adaptado a tu situación real.</p>
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
