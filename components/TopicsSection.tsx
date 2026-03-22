import Link from 'next/link'
import { getArticlesByCategoria } from '@/lib/articles'
import type { Article } from '@/lib/types'

const TOPICS: {
  ico: string
  name: string
  desc: string
  nivel: string
  categoria: Article['categoria']
  href: string
}[] = [
  { ico: '💸', name: 'Presupuesto y gasto',   desc: 'Controla lo que sale antes de pensar en lo que entra.',                    nivel: 'Nivel 0–1', categoria: 'presupuesto', href: '/categoria/presupuesto' },
  { ico: '🏦', name: 'Ahorro inteligente',     desc: 'Cuentas, depósitos y letras del Tesoro explicados sin complicaciones.',    nivel: 'Nivel 1',   categoria: 'ahorro',      href: '/categoria/ahorro'      },
  { ico: '📈', name: 'Inversión en bolsa',     desc: 'ETFs, fondos indexados y cómo construir una cartera real.',                nivel: 'Nivel 2',   categoria: 'inversion',   href: '/categoria/inversion'   },
  { ico: '₿',  name: 'Cripto sin humo',        desc: 'Bitcoin, Ethereum y cómo no perder la cabeza ni el dinero.',              nivel: 'Nivel 3',   categoria: 'cripto',      href: '/categoria/cripto'      },
  { ico: '🏠', name: 'Hipotecas',              desc: 'Euríbor, fija vs variable, cuánto necesitas. Con calculadora incluida.',   nivel: 'Nivel 1–2', categoria: 'hipotecas',   href: '/categoria/hipotecas'   },
  { ico: '📱', name: 'Neobancos',              desc: 'Revolut, Trade Republic, Wise: cuál usar y para qué.',                    nivel: 'Nivel 1',   categoria: 'banca',       href: '/categoria/banca'       },
  { ico: '💡', name: 'Finanzas personales',    desc: 'Pareja, autónomos, ingresos variables. Lo que los libros ignoran.',       nivel: 'Nivel 0–2', categoria: 'finanzas',    href: '/categoria/finanzas'    },
  { ico: '📊', name: 'Comparativas',           desc: 'Brókers, cuentas, ETFs. Sin sesgo ni patrocinios.',                       nivel: 'Nivel 1–3', categoria: 'comparativa', href: '/categoria/comparativa' },
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
          {TOPICS.map(({ ico, name, desc, nivel, categoria, href }) => {
            const count = getArticlesByCategoria(categoria).length
            return (
              <Link
                key={name}
                href={href}
                className="bg-white border border-border rounded-[14px] p-[22px] cursor-pointer group transition-all hover:border-sage hover:-translate-y-[3px] hover:shadow-card relative after:content-['→'] after:absolute after:top-[18px] after:right-[18px] after:text-[15px] after:text-border after:transition-colors group-hover:after:text-sage"
              >
                <span className="text-[26px] mb-[10px] block">{ico}</span>
                <div className="font-fraunces text-[16px] font-bold text-ink mb-1 tracking-[-0.2px]">{name}</div>
                <p className="text-[12.5px] text-ink3 leading-[1.45] mb-[10px]">{desc}</p>
                <div className="text-[11px] text-moss font-semibold">
                  {count > 0 ? `${count} artículo${count !== 1 ? 's' : ''} · ` : ''}{nivel}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
