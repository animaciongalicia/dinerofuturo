import Link from 'next/link'

const topics = [
  {
    ico: '💸',
    name: 'Presupuesto y gasto',
    desc: 'Controla lo que sale antes de pensar en lo que entra.',
    count: '18 artículos · Nivel 0–1',
    href: '/categoria/presupuesto',
  },
  {
    ico: '🏦',
    name: 'Ahorro inteligente',
    desc: 'Cuentas, depósitos y letras del Tesoro explicados sin complicaciones.',
    count: '24 artículos · Nivel 1',
    href: '/categoria/ahorro',
  },
  {
    ico: '📈',
    name: 'Inversión en bolsa',
    desc: 'ETFs, fondos indexados y cómo construir una cartera real.',
    count: '32 artículos · Nivel 2',
    href: '/categoria/inversion',
  },
  {
    ico: '₿',
    name: 'Cripto sin humo',
    desc: 'Bitcoin, Ethereum y cómo no perder la cabeza ni el dinero.',
    count: '21 artículos · Nivel 3',
    href: '/categoria/cripto',
  },
  {
    ico: '🏠',
    name: 'Vivienda e hipotecas',
    desc: 'Comprar, alquilar, Euribor. Con calculadoras incluidas.',
    count: '15 artículos · Nivel 1–2',
    href: '/categoria/vivienda',
  },
  {
    ico: '🧾',
    name: 'Impuestos',
    desc: 'Declara inversiones sin pagar de más. La guía que no te dan.',
    count: '12 artículos · Nivel 2–3',
    href: '/categoria/impuestos',
  },
  {
    ico: '🏥',
    name: 'Pensión y jubilación',
    desc: 'No depender solo del Estado. Las opciones que existen.',
    count: '10 artículos · Nivel 2',
    href: '/categoria/jubilacion',
  },
  {
    ico: '📊',
    name: 'Comparativas',
    desc: 'Brókers, cuentas, roboadvisors. Sin sesgo ni patrocinios.',
    count: '19 comparativas',
    href: '/categoria/comparativa',
  },
]

export default function TopicsSection() {
  return (
    <section className="bg-cream border-t border-b border-border py-[52px]">
      <div className="max-w-wrap mx-auto px-7">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Explora por tema</h2>
            <p className="text-[14px] text-ink3 mt-1">Cada sección va de menos a más difícil. Empieza donde estés.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[14px] max-lg:grid-cols-2 max-sm:grid-cols-2">
          {topics.map(({ ico, name, desc, count, href }) => (
            <Link
              key={name}
              href={href}
              className="bg-white border border-border rounded-[14px] p-[22px] cursor-pointer group transition-all hover:border-sage hover:-translate-y-[3px] hover:shadow-card relative after:content-['→'] after:absolute after:top-[18px] after:right-[18px] after:text-[15px] after:text-border after:transition-colors group-hover:after:text-sage"
            >
              <span className="text-[26px] mb-[10px] block">{ico}</span>
              <div className="font-fraunces text-[16px] font-bold text-ink mb-1 tracking-[-0.2px]">{name}</div>
              <p className="text-[12.5px] text-ink3 leading-[1.45] mb-[10px]">{desc}</p>
              <div className="text-[11px] text-moss font-semibold">{count}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
