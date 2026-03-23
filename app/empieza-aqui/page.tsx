import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Empieza aquí: guía de finanzas personales desde cero | Dinero Futuro',
  description:
    'Si nunca has organizado tu dinero, empieza aquí. Paso a paso: presupuesto, fondo de emergencia, salir de deudas e invertir. Sin jerga, sin cursos de pago.',
  alternates: { canonical: siteUrl('/empieza-aqui') },
  openGraph: {
    title: 'Empieza aquí: finanzas personales desde cero — Dinero Futuro',
    description: 'El punto de partida si nunca has organizado tu dinero. Sin jerga, sin humo.',
    type: 'website',
    url: siteUrl('/empieza-aqui'),
  },
}

const PASOS = [
  {
    num: '01',
    titulo: 'Entiende en qué punto estás',
    color: 'border-amber-400',
    numColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    desc: 'Antes de cualquier estrategia, necesitas saber de dónde partes. ¿Tienes deudas? ¿Ahorros? ¿Ingresos estables o irregulares? El diagnóstico es el primer paso.',
    acciones: [
      { label: '🧭 Diagnóstico financiero personalizado (7 preguntas)', href: '/que-hacer-con-mi-dinero', destacado: true },
      { label: 'La diferencia entre ahorrar e invertir', href: '/articulo/diferencia-entre-ahorrar-e-invertir' },
      { label: 'Cómo hacer un presupuesto personal que funcione', href: '/articulo/como-hacer-un-presupuesto-personal-que-funcione' },
    ],
  },
  {
    num: '02',
    titulo: 'Sal de las deudas caras',
    color: 'border-red-400',
    numColor: 'text-red-500',
    bgColor: 'bg-red-50',
    desc: 'Si tienes deudas con intereses por encima del 7-8% (tarjeta de crédito, préstamos de consumo), atacarlas es la inversión con mayor rentabilidad garantizada que puedes hacer. Ningún ETF te da un 25% sin riesgo.',
    acciones: [
      { label: 'Cómo salir de deudas: por dónde empezar', href: '/articulo/deudas-como-salir-por-donde-empezar', destacado: true },
      { label: 'Primer sueldo: qué hacer con tu dinero', href: '/articulo/primer-sueldo-que-hacer-con-tu-dinero' },
    ],
  },
  {
    num: '03',
    titulo: 'Construye tu fondo de emergencia',
    color: 'border-green-400',
    numColor: 'text-green-600',
    bgColor: 'bg-green-50',
    desc: 'Entre 3 y 9 meses de gastos fijos en una cuenta líquida separada. No es para hacerlo crecer — es para que ningún imprevisto te obligue a tomar malas decisiones financieras bajo presión.',
    acciones: [
      { label: 'Fondo de emergencia: cuánto necesitas exactamente tú', href: '/articulo/fondo-de-emergencia-cuanto-necesitas', destacado: true },
      { label: '🧮 Calculadora de fondo de emergencia', href: '/herramientas/fondo-emergencia' },
      { label: 'Mejores cuentas remuneradas 2026', href: '/articulo/mejores-cuentas-remuneradas-2026' },
    ],
  },
  {
    num: '04',
    titulo: 'Empieza a invertir (de forma sencilla)',
    color: 'border-blue-400',
    numColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    desc: 'Con el colchón cubierto y sin deudas caras, el dinero que te sobra cada mes puede empezar a trabajar. La estrategia más efectiva para la mayoría de personas no es compleja: inversión indexada pasiva, aportaciones periódicas, paciencia.',
    acciones: [
      { label: 'Cómo empezar a invertir desde cero: la guía sin rodeos', href: '/articulo/como-empezar-a-invertir-desde-cero', destacado: true },
      { label: 'Qué es un ETF y cómo funciona', href: '/articulo/que-es-un-etf-y-como-funciona' },
      { label: 'Interés compuesto: el concepto que cambia cómo ves el dinero', href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales' },
      { label: '🧮 Calculadora de interés compuesto', href: '/herramientas/interes-compuesto' },
    ],
  },
  {
    num: '05',
    titulo: 'Construye una cartera real',
    color: 'border-violet-400',
    numColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
    desc: 'Una vez invirtiendo, el siguiente paso es estructurar una cartera acorde a tu perfil: horizonte temporal, tolerancia al riesgo y objetivos. No es complejo — la mayoría de inversores particulares solo necesitan 2-3 fondos.',
    acciones: [
      { label: 'Cartera de inversión para principiantes: modelo completo', href: '/articulo/cartera-inversion-principiantes-modelo', destacado: true },
      { label: 'ETF vs fondo indexado: diferencias que importan', href: '/articulo/etf-vs-fondo-indexado-diferencias' },
      { label: 'Mejores brókers para principiantes en 2026', href: '/articulo/mejores-brokers-principiantes-2026' },
      { label: 'Conoce tu perfil de inversor', href: '/perfiles-inversor' },
    ],
  },
]

const CONCEPTOS = [
  { label: 'Interés compuesto', href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', desc: 'La razón por la que invertir pronto importa más que invertir mucho' },
  { label: 'Inflación', href: '/articulo/que-es-la-inflacion-y-como-te-afecta', desc: 'Por qué guardar dinero en el colchón es perder dinero' },
  { label: 'Qué es un ETF', href: '/articulo/que-es-un-etf-y-como-funciona', desc: 'El vehículo de inversión más eficiente para la mayoría de personas' },
  { label: 'Ahorrar vs invertir', href: '/articulo/diferencia-entre-ahorrar-e-invertir', desc: 'Son cosas distintas y confundirlas cuesta dinero' },
  { label: 'Fondo de emergencia', href: '/articulo/fondo-de-emergencia-cuanto-necesitas', desc: 'El requisito previo a cualquier inversión' },
  { label: 'Cómo salir de deudas', href: '/articulo/deudas-como-salir-por-donde-empezar', desc: 'El orden correcto para atacar las deudas sin agobiarte' },
]

const HERRAMIENTAS = [
  { label: 'Calculadora de interés compuesto', href: '/herramientas/interes-compuesto', desc: 'Cuánto tendrás en 10, 20 o 30 años si empiezas hoy' },
  { label: 'Calculadora de fondo de emergencia', href: '/herramientas/fondo-emergencia', desc: 'Tu número exacto según tu tipo de empleo' },
  { label: 'Calculadora de hipoteca', href: '/herramientas/calculadora-hipoteca', desc: 'Cuota, intereses y coste total de tu préstamo' },
  { label: 'Número FIRE', href: '/herramientas/numero-fire', desc: 'Cuánto necesitas para ser financieramente independiente' },
]

export default function EmpiezaAquiPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Empieza aquí</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="mb-10">
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-forest mb-3">Guía de inicio</p>
            <h1 className="font-fraunces text-[42px] font-black text-ink leading-[1.1] mb-4 max-sm:text-[30px]">
              Si nunca has organizado<br className="max-sm:hidden" /> tu dinero, empieza aquí
            </h1>
            <p className="text-[18px] text-ink2 leading-[1.7] max-w-[620px] mb-6">
              No necesitas un máster en finanzas. No necesitas mucho dinero para empezar.
              Solo necesitas el orden correcto y la información sin humo.
              Esta guía es ese orden.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-forest text-white font-bold text-[15px] px-6 py-3 rounded-xl hover:bg-forest/90 transition-colors"
              >
                🧭 Diagnóstico personalizado gratis
              </Link>
              <Link
                href="/glosario"
                className="inline-flex items-center gap-2 border border-border text-ink2 font-semibold text-[14px] px-5 py-3 rounded-xl hover:border-sage hover:text-ink transition-colors"
              >
                Glosario financiero →
              </Link>
            </div>
          </div>

          {/* Aviso */}
          <div className="border border-sage bg-green-50/60 rounded-xl px-5 py-4 mb-10 flex gap-3">
            <span className="text-[20px] shrink-0 mt-0.5">💡</span>
            <p className="text-[14px] text-ink2 leading-[1.6]">
              <strong className="text-ink">Las finanzas tienen un orden.</strong> Saltar pasos —
              por ejemplo, invertir antes de tener fondo de emergencia — no ahorra tiempo: lo
              multiplica. Esta guía está estructurada en ese orden. Empieza por el paso en el
              que estás, no por el que parece más emocionante.
            </p>
          </div>

          {/* Pasos */}
          <section className="mb-14">
            <h2 className="font-fraunces text-[28px] font-black text-ink mb-6">Los 5 pasos en orden</h2>
            <div className="space-y-5">
              {PASOS.map((paso) => (
                <div key={paso.num} className={`border-l-4 ${paso.color} ${paso.bgColor} rounded-r-xl px-6 py-5`}>
                  <div className="flex items-start gap-4">
                    <span className={`font-fraunces text-[42px] font-black leading-none ${paso.numColor} shrink-0 mt-[-4px]`}>
                      {paso.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-fraunces text-[20px] font-black text-ink mb-1">{paso.titulo}</h3>
                      <p className="text-[14px] text-ink2 leading-[1.65] mb-3">{paso.desc}</p>
                      <div className="flex flex-col gap-1.5">
                        {paso.acciones.map((a) => (
                          <Link
                            key={a.href}
                            href={a.href}
                            className={`inline-flex items-center gap-2 text-[13.5px] font-medium transition-colors w-fit
                              ${a.destacado
                                ? 'text-forest font-semibold hover:underline'
                                : 'text-ink2 hover:text-forest'
                              }`}
                          >
                            {!a.destacado && <span className="text-ink3">→</span>}
                            {a.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conceptos clave */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Conceptos que debes conocer
            </h2>
            <p className="text-[15px] text-ink2 mb-5">
              No hace falta leerlos todos de golpe. Léelos cuando aparezcan en tu camino.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONCEPTOS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="border border-border rounded-xl px-4 py-3.5 hover:border-sage hover:shadow-card transition-all group"
                >
                  <p className="font-semibold text-[14px] text-ink group-hover:text-forest transition-colors mb-0.5">{c.label}</p>
                  <p className="text-[12.5px] text-ink3">{c.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Herramientas gratuitas */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Calculadoras gratuitas
            </h2>
            <p className="text-[15px] text-ink2 mb-5">
              Más útil que leer: meter tus propios números y ver el resultado.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HERRAMIENTAS.map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  className="border border-border rounded-xl px-4 py-3.5 hover:border-sage hover:shadow-card transition-all group"
                >
                  <p className="font-semibold text-[14px] text-ink group-hover:text-forest transition-colors mb-0.5">🧮 {h.label}</p>
                  <p className="text-[12.5px] text-ink3">{h.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Perfiles */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              ¿Con cuál te identificas?
            </h2>
            <p className="text-[15px] text-ink2 mb-5">
              Cada situación tiene su punto de partida. Elige el perfil que más se acerque al tuyo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Empezando desde cero', href: '/perfiles-inversor/empezando-desde-cero', desc: 'Primeros pasos, sin experiencia previa' },
                { label: 'Inversor conservador', href: '/perfiles-inversor/inversor-conservador', desc: 'Priorizas seguridad sobre rentabilidad' },
                { label: 'Inversor moderado', href: '/perfiles-inversor/inversor-moderado', desc: 'Equilibrio entre riesgo y crecimiento' },
                { label: 'Inversor dinámico', href: '/perfiles-inversor/inversor-dinamico', desc: 'Horizonte largo y tolerancia alta al riesgo' },
                { label: 'Perfil FIRE', href: '/perfiles-inversor/perfil-fire', desc: 'Independencia financiera como objetivo' },
                { label: 'Ver todos los perfiles', href: '/perfiles-inversor', desc: 'Comparativa completa de perfiles' },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="border border-border rounded-xl px-4 py-3.5 hover:border-sage hover:shadow-card transition-all group"
                >
                  <p className="font-semibold text-[14px] text-ink group-hover:text-forest transition-colors mb-0.5">{p.label}</p>
                  <p className="text-[12.5px] text-ink3">{p.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ rápida */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Con cuánto dinero puedo empezar a invertir?',
                  a: 'Con 50 euros o dólares al mes ya tiene sentido. Lo importante no es la cantidad inicial — es la constancia y el tiempo. La mayoría de plataformas (MyInvestor, Trade Republic, Fintual en Chile) no tienen mínimos reales.',
                },
                {
                  q: '¿Tengo que entender de bolsa para invertir?',
                  a: 'No. La inversión indexada pasiva no requiere saber analizar empresas ni seguir mercados. Compras un fondo que replica el mercado global, haces aportaciones periódicas y no vendes cuando baja. Eso es todo.',
                },
                {
                  q: '¿Es seguro invertir? ¿Puedo perderlo todo?',
                  a: 'Un fondo indexado global invierte en miles de empresas. Para perderlo todo, tendrían que quebrar simultáneamente Apple, Microsoft, Nestlé, Toyota y 1.496 empresas más. Lo que sí puede pasar es que baje un 30-40% temporalmente — por eso el horizonte mínimo recomendado es de 5-10 años.',
                },
                {
                  q: '¿Cuándo debo empezar? ¿No es mejor esperar a tener más dinero?',
                  a: 'El mayor error es esperar. Cada año que pasa sin invertir es crecimiento compuesto que no recuperas. Empieza con lo que puedas ahora mismo y aumenta las aportaciones cuando puedas. El tiempo es el activo más valioso que tienes.',
                },
              ].map((item) => (
                <div key={item.q} className="border border-border rounded-xl px-5 py-4">
                  <p className="font-semibold text-[15px] text-ink mb-2">{item.q}</p>
                  <p className="text-[14px] text-ink2 leading-[1.65]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-forest rounded-2xl px-8 py-8 text-white">
            <div className="max-w-[520px]">
              <p className="text-[12px] font-bold uppercase tracking-[.15em] text-green-300 mb-2">¿No sabes en qué paso estás?</p>
              <h3 className="font-fraunces text-[28px] font-black mb-3 leading-tight">
                Recibe un plan financiero personalizado en 3 minutos
              </h3>
              <p className="text-[15px] text-green-100 mb-5 leading-[1.65]">
                Responde 7 preguntas sobre tu situación actual y recibe un diagnóstico detallado:
                prioridades, cartera sugerida, checklist para los próximos 90 días y lecturas recomendadas.
                Gratis, sin registro.
              </p>
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-white text-forest font-bold text-[15px] px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                🧭 Empezar el diagnóstico →
              </Link>
            </div>
          </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
