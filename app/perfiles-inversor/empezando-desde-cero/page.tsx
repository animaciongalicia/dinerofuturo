import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Perfil inversor: Empezando desde cero',
  description:
    'Guía completa para quienes aún no invierten o acaban de empezar. Qué hacer primero, qué productos usar y cómo construir tu base financiera paso a paso.',
  alternates: { canonical: siteUrl('/perfiles-inversor/empezando-desde-cero') },
  openGraph: {
    title: 'Perfil inversor: Empezando desde cero — Dinero Futuro',
    description: 'Qué hacer cuando todavía no inviertes. Base sólida antes que rentabilidad.',
    type: 'website',
    url: siteUrl('/perfiles-inversor/empezando-desde-cero'),
  },
}

const CHECKLIST = [
  'No tienes aún un fondo de emergencia completo (3–6 meses de gastos)',
  'Nunca has invertido o llevas menos de un año haciéndolo',
  'Tienes deudas con intereses superiores al 5–6%',
  'La idea de ver tu dinero caer un 20% te genera pánico real',
  'No tienes claro qué es un ETF, un fondo indexado o un bróker',
]

const ERRORES = [
  {
    titulo: 'Invertir antes de tener el fondo de emergencia',
    desc: 'Si inviertes sin colchón y surge un imprevisto, tendrás que vender en el peor momento posible. El fondo no es opcional.',
  },
  {
    titulo: 'Buscar "el mejor producto" antes de construir el hábito',
    desc: 'La diferencia entre una cuenta al 2% y al 2,5% es insignificante. Lo que importa es que empieces a separar dinero cada mes.',
  },
  {
    titulo: 'Empezar con criptomonedas o acciones individuales',
    desc: 'Son los vehículos de mayor riesgo y mayor complejidad. Para alguien que empieza, los ETF indexados son la opción correcta.',
  },
  {
    titulo: 'Esperar a tener "suficiente" dinero para empezar',
    desc: 'Puedes invertir desde 1€ en algunos brókers. El tiempo en el mercado importa más que el capital inicial.',
  },
]

const TIMELINE = [
  { mes: 'Mes 1–2', accion: 'Calcula cuánto necesitas en el fondo de emergencia', herramienta: { href: '/herramientas/fondo-emergencia', label: 'Calculadora fondo de emergencia' } },
  { mes: 'Mes 2–4', accion: 'Abre una cuenta remunerada o compra Letras del Tesoro para guardar el fondo', herramienta: null },
  { mes: 'Mes 4–7', accion: 'Completa el fondo de emergencia. Automatiza el ahorro mensual', herramienta: null },
  { mes: 'Mes 7–9', accion: 'Abre una cuenta en MyInvestor o DeGiro. Compra tu primer ETF indexado global', herramienta: null },
  { mes: 'Mes 9–12', accion: 'Establece aportaciones periódicas automáticas (DCA). No mires el mercado cada día', herramienta: { href: '/herramientas/interes-compuesto', label: 'Calcula el efecto del interés compuesto' } },
]

const SENALES_AVANCE = [
  'Tienes el fondo de emergencia completo (mínimo 3 meses de gastos)',
  'Llevas más de 6 meses invirtiendo de forma consistente',
  'Entiendes qué compras y por qué (ETF, diversificación, largo plazo)',
  'No has vendido en pánico durante una caída del mercado',
  'Tu deuda de consumo es cero o mínima',
]

export default function EmpezandoDesdeCeroPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/perfiles-inversor" className="hover:text-forest transition-colors">Perfiles de inversor</Link>
        <span>/</span>
        <span className="text-ink font-medium">Empezando desde cero</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

        {/* Hero */}
        <div className="bg-[#EBF5EF] border border-[#A3D4B4] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C6E6D0] flex items-center justify-center text-[30px]">
              🌱
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-[#1B5E35] mb-1">
                Perfil de inversor
              </p>
              <h1 className="font-fraunces text-[34px] font-black text-ink leading-tight max-sm:text-[26px]">
                Empezando desde cero
              </h1>
            </div>
          </div>
          <p className="text-[16px] text-ink2 leading-[1.7]">
            Todavía no inviertes o acabas de empezar. Tu prioridad ahora mismo{' '}
            <strong className="text-ink">no es la rentabilidad</strong> — es construir
            una base sólida que te permita invertir sin ponerte en riesgo. Antes de
            pensar en qué ETF comprar, hay pasos previos que son mucho más importantes.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#C6E6D0] text-[#1B5E35]">
              Horizonte: Corto/medio plazo
            </span>
            <span className="inline-flex items-center text-[12.5px] font-semibold px-3 py-1 rounded-full bg-[#C6E6D0] text-[#1B5E35]">
              Riesgo: Muy bajo
            </span>
          </div>
        </div>

        {/* ¿Eres tú? */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            ¿Eres tú? Marca lo que describes
          </h2>
          <div className="bg-paper border border-border rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 border-b border-border last:border-0"
              >
                <div className="w-5 h-5 rounded border-2 border-[#A3D4B4] bg-[#EBF5EF] flex-shrink-0 mt-[2px]" />
                <p className="text-[15px] text-ink2 leading-[1.6]">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-ink3 mt-3 leading-relaxed">
            Si marcas 2 o más, este es tu perfil actual. No importa cuántos años llevas
            trabajando ni cuánto cobras.
          </p>
        </section>

        {/* Pirámide financiera */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            Tu prioridad ahora mismo
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-6">
            Hay un orden correcto. Saltarse pasos es el error más común y más caro.
          </p>

          <div className="space-y-3">
            {/* Paso 1 */}
            <div className="flex gap-4 bg-[#FEF2F2] border border-red-200 rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[16px] font-black text-red-700 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-ink mb-1">Elimina las deudas caras</h3>
                <p className="text-[14px] text-ink2 leading-[1.6]">
                  Tarjetas de crédito al 20% TAE, préstamos al consumo al 8–12%. Pagar
                  estas deudas es la mejor "inversión" que puedes hacer: cada euro que
                  pagas te da una rentabilidad garantizada igual al tipo de interés.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex gap-4 bg-[#FFFBEB] border border-yellow-200 rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-[16px] font-black text-yellow-700 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-ink mb-1">Construye el fondo de emergencia</h3>
                <p className="text-[14px] text-ink2 leading-[1.6]">
                  Entre 3 y 6 meses de tus gastos fijos, en una cuenta que sea líquida
                  (puedes sacar el dinero en 24–48h). No en inversiones. No en criptos.
                  En una cuenta remunerada o Letras del Tesoro a 3–6 meses.
                </p>
                <Link
                  href="/herramientas/fondo-emergencia"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-forest mt-2 hover:text-forest/70 transition-colors"
                >
                  Calcular cuánto necesito →
                </Link>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex gap-4 bg-[#EBF5EF] border border-[#A3D4B4] rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-[#C6E6D0] flex items-center justify-center text-[16px] font-black text-[#1B5E35] flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-ink mb-1">Empieza a invertir</h3>
                <p className="text-[14px] text-ink2 leading-[1.6]">
                  Solo cuando los pasos 1 y 2 están cubiertos. El vehículo recomendado
                  para empezar: un ETF indexado al MSCI World o S&P 500 con aportaciones
                  mensuales automáticas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Productos adecuados */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Productos adecuados para ti
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-cream border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-ink">Producto</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Para qué sirve</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Cuándo usarlo</th>
                  <th className="text-left px-5 py-3 font-semibold text-ink">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-ink">Cuenta remunerada</td>
                  <td className="px-5 py-4 text-ink2">Guardar el fondo de emergencia con pequeña rentabilidad</td>
                  <td className="px-5 py-4 text-ink2">Siempre, desde el día 1</td>
                  <td className="px-5 py-4"><span className="bg-[#C6E6D0] text-[#1B5E35] text-[11.5px] font-semibold px-2 py-[3px] rounded-full">Muy bajo</span></td>
                </tr>
                <tr className="border-b border-border hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-ink">Letras del Tesoro</td>
                  <td className="px-5 py-4 text-ink2">Guardar el fondo con rentabilidad ligeramente superior</td>
                  <td className="px-5 py-4 text-ink2">Cuando el fondo ya está construido</td>
                  <td className="px-5 py-4"><span className="bg-[#C6E6D0] text-[#1B5E35] text-[11.5px] font-semibold px-2 py-[3px] rounded-full">Muy bajo</span></td>
                </tr>
                <tr className="hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-ink">ETF indexado global</td>
                  <td className="px-5 py-4 text-ink2">Primera inversión real. Amplia diversificación a bajo coste</td>
                  <td className="px-5 py-4 text-ink2">Solo después de tener el fondo completo</td>
                  <td className="px-5 py-4"><span className="bg-[#FDE68A] text-[#78350F] text-[11.5px] font-semibold px-2 py-[3px] rounded-full">Medio-bajo</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Errores típicos */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-5">
            Lo que NO deberías hacer
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

        {/* Timeline 12 meses */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            Tu plan para los próximos 12 meses
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-6">
            Un plan concreto es mejor que uno perfecto que nunca se ejecuta.
          </p>
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#C6E6D0]" />
            <div className="space-y-4">
              {TIMELINE.map((paso, i) => (
                <div key={i} className="flex gap-5 relative">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EF] border-2 border-[#A3D4B4] flex items-center justify-center text-[11px] font-black text-[#1B5E35] flex-shrink-0 z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-paper border border-border rounded-xl p-4 mb-1">
                    <p className="text-[11.5px] font-bold uppercase tracking-[.08em] text-moss mb-1">
                      {paso.mes}
                    </p>
                    <p className="text-[14px] text-ink2 leading-[1.6]">{paso.accion}</p>
                    {paso.herramienta && (
                      <Link
                        href={paso.herramienta.href}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-forest mt-2 hover:text-forest/70 transition-colors"
                      >
                        {paso.herramienta.label} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cuándo pasar al siguiente perfil */}
        <section className="mb-10">
          <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
            Cuándo pasar al siguiente perfil
          </h2>
          <p className="text-[15px] text-ink2 leading-[1.7] mb-5">
            Este perfil es temporal. Estas son las señales de que has avanzado:
          </p>
          <div className="bg-[#EBF5EF] border border-[#A3D4B4] rounded-2xl overflow-hidden">
            {SENALES_AVANCE.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 border-b border-[#C6E6D0] last:border-0"
              >
                <span className="text-[#1B5E35] font-bold text-[16px] flex-shrink-0 mt-[1px]">✓</span>
                <p className="text-[14px] text-ink2 leading-[1.6]">{s}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-ink3 mt-3">
            Si cumples 4 o más, considera avanzar al perfil conservador o moderado.
          </p>
        </section>

        {/* Links a recursos */}
        <section className="mb-12">
          <h2 className="font-fraunces text-[22px] font-black text-ink mb-4">
            Recursos útiles para este perfil
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/herramientas/fondo-emergencia', label: '🛡️ Calculadora fondo de emergencia', desc: 'Cuánto necesitas exactamente tú' },
              { href: '/herramientas/interes-compuesto', label: '🧮 Calculadora de interés compuesto', desc: 'Cuánto crecerá tu dinero' },
              { href: '/articulo/como-empezar-a-invertir-desde-cero', label: '📖 Cómo empezar a invertir desde cero', desc: 'Guía paso a paso' },
              { href: '/articulo/fondo-de-emergencia-cuanto-necesitas', label: '📖 Fondo de emergencia', desc: 'Cuánto necesitas y dónde guardarlo' },
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
