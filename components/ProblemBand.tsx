import Link from 'next/link'

const problems = [
  {
    ico: '💸',
    problem: 'Gasto más de lo que gano y no sé dónde se va el dinero',
    arrow: '→ Presupuesto 50/30/20 en 10 min',
    href: '/articulo/regla-50-30-20-presupuesto',
  },
  {
    ico: '🎯',
    problem: 'Tengo ahorros parados y no sé qué hacer con ellos',
    arrow: '→ Árbol de decisión según tu perfil',
    href: '/articulo/como-empezar-a-invertir-desde-cero',
  },
  {
    ico: '😰',
    problem: 'Quiero invertir pero me da miedo perderlo todo',
    arrow: '→ Inversión conservadora sin riesgo',
    href: '/articulo/como-empezar-a-invertir-desde-cero',
  },
  {
    ico: '🏠',
    problem: 'No sé si me compensa comprar piso o seguir de alquiler',
    arrow: '→ Calculadora con tus cifras reales',
    href: '/herramientas',
  },
  {
    ico: '₿',
    problem: 'Todo el mundo habla de cripto y no entiendo nada',
    arrow: '→ Cripto nivel absoluto desde cero',
    href: '/nivel/3',
  },
  {
    ico: '🧾',
    problem: 'Hice inversiones y no sé cómo declararlo en la renta',
    arrow: '→ Guía fiscal sin tecnicismos',
    href: '/categoria/impuestos',
  },
]

export default function ProblemBand() {
  return (
    <section className="bg-forest py-[52px]">
      <div className="max-w-wrap mx-auto px-7">
        {/* Header */}
        <div className="text-center mb-9">
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-sage mb-[10px]">
            Encuentra tu punto de partida
          </div>
          <h2 className="font-fraunces text-[32px] font-bold text-white tracking-[-0.3px]">
            ¿Cuál es tu situación ahora mismo?
          </h2>
          <p className="text-[15px] text-white/55 mt-[6px]">
            Selecciona y te llevamos al artículo exacto que necesitas
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-[14px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {problems.map(({ ico, problem, arrow, href }) => (
            <Link
              key={problem}
              href={href}
              className="bg-white/[.07] border border-white/10 rounded-2xl p-[22px] cursor-pointer group transition-all hover:bg-white/[.13] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[22px] mb-[14px]">
                {ico}
              </div>
              <p className="text-[15px] font-semibold text-white leading-[1.35] mb-[6px]">{problem}</p>
              <p className="text-[12.5px] text-sage font-semibold">{arrow}</p>
              <div className="absolute bottom-[18px] right-[18px] w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[13px] text-sage transition-all group-hover:bg-sage group-hover:text-forest">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
