import Link from 'next/link'
import { getArticlesByNivel } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { siteUrl } from '@/lib/utils'

// ─── Meta por nivel ───────────────────────────────────────────────────────────

const NIVEL_META: Record<string, {
  label: string
  h1: string
  tagline: string
  body: string
  resuelve: string
  emoji: string
  dolores: string[]
  queveras: { ico: string; titulo: string; desc: string }[]
  siguiente: { nivel: string; label: string; teaser: string } | null
}> = {
  '0': {
    label: 'Nivel 0 — Empezar',
    h1: 'Finanzas desde cero',
    tagline: 'El punto de partida. Sin jerga, sin conocimientos previos, sin juicios.',
    body: 'Si nunca has pensado en ahorrar, invertir o entender tu dinero, estás en el sitio correcto. Aquí no se asume nada. Explicamos todo desde el principio, con ejemplos reales y lenguaje normal.',
    resuelve: 'No sé por dónde empezar con mi dinero',
    emoji: '🔵',
    dolores: [
      'Cobras a fin de mes y el dinero desaparece sin saber cómo',
      'Sabes que deberías ahorrar pero nunca llegas a hacerlo',
      'Los conceptos financieros te suenan a chino',
      'Tienes deudas que no sabes cómo gestionar',
    ],
    queveras: [
      { ico: '📋', titulo: 'Presupuesto personal', desc: 'Cómo saber exactamente en qué se va tu dinero y recuperar el control.' },
      { ico: '🛡️', titulo: 'Fondo de emergencia', desc: 'Por qué necesitas un colchón y cuánto tiene que ser exactamente.' },
      { ico: '💸', titulo: 'Salir de deudas', desc: 'El método paso a paso para liquidar lo que debes sin agobios.' },
    ],
    siguiente: { nivel: '1', label: 'Nivel 1 — Ahorrar', teaser: 'Cuando controles el presupuesto, aprende a hacer que tu dinero crezca.' },
  },
  '1': {
    label: 'Nivel 1 — Ahorrar',
    h1: 'Aprende a ahorrar de verdad',
    tagline: 'No se trata de gastar menos. Se trata de que tu dinero trabaje mientras espera.',
    body: 'Ahorrar no es privarte de cosas. Es decidir conscientemente qué haces con tu dinero. Aquí encontrarás cuentas que sí dan rentabilidad, métodos que funcionan y herramientas para construir tu base financiera.',
    resuelve: 'Llego a fin de mes justo o no consigo ahorrar',
    emoji: '🟢',
    dolores: [
      'Tienes dinero en cuenta corriente perdiendo valor con la inflación',
      'Has intentado ahorrar pero siempre acabas gastándolo',
      'No sabes si las cuentas remuneradas o las letras del Tesoro merecen la pena',
      'Tienes un "colchón" pero no sabes si es suficiente',
    ],
    queveras: [
      { ico: '🏦', titulo: 'Cuentas que rentabilizan', desc: 'Comparativa de cuentas remuneradas, depósitos y letras del Tesoro actualizadas.' },
      { ico: '📐', titulo: 'Métodos de ahorro', desc: 'La regla 50/30/20, el ahorro automático y cómo adaptarlo a tu sueldo real.' },
      { ico: '📱', titulo: 'Neobancos y apps', desc: 'Revolut, Trade Republic, Wise: qué ofrecen y cuándo usar cada uno.' },
    ],
    siguiente: { nivel: '2', label: 'Nivel 2 — Invertir', teaser: 'Con el fondo de emergencia listo, el siguiente paso es poner tu dinero a trabajar de verdad.' },
  },
  '2': {
    label: 'Nivel 2 — Invertir',
    h1: 'Invierte sin banco ni experto',
    tagline: 'ETFs, fondos indexados y carteras reales. Sin comisiones absurdas, sin complicaciones.',
    body: 'Invertir no es para ricos ni para gente con carrera de economía. Con 50€ al mes y paciencia, cualquier persona puede construir patrimonio. Aquí te explicamos cómo, con qué herramientas y qué errores evitar.',
    resuelve: 'Tengo ahorros pero no sé qué hacer con ellos',
    emoji: '🔴',
    dolores: [
      'Tienes dinero ahorrado que sabes que debería estar "haciendo algo"',
      'Te da miedo la bolsa pero sientes que te estás perdiendo algo',
      'No sabes si los ETFs, los fondos o las acciones son para ti',
      'Has oído hablar de fondos indexados pero no sabes por dónde empezar',
    ],
    queveras: [
      { ico: '📈', titulo: 'ETFs e indexados', desc: 'Qué son, cuáles comprar, dónde contratarlos y cuánto cobran de verdad.' },
      { ico: '🗂️', titulo: 'Carteras modelo', desc: 'Carteras concretas para diferentes perfiles: conservador, moderado y dinámico.' },
      { ico: '🧠', titulo: 'Psicología del inversor', desc: 'Por qué la bolsa cae un 40% y tú no debes hacer nada. Y cómo lograrlo.' },
    ],
    siguiente: { nivel: '3', label: 'Nivel 3 — Cripto', teaser: 'Si ya tienes cartera indexada, aquí están los activos más volátiles y cómo no quemarte.' },
  },
  '3': {
    label: 'Nivel 3 — Cripto',
    h1: 'Cripto y activos avanzados',
    tagline: 'Para los que ya controlan lo básico y quieren ir más lejos. Sin fanatismos.',
    body: 'Bitcoin, Ethereum, DeFi, fiscalidad avanzada. Todo explicado sin fanatismos ni promesas de hacerse rico rápido. Si no tienes la base de los niveles 0–2, empieza por ahí.',
    resuelve: 'Quiero entender cripto sin perder dinero',
    emoji: '🟡',
    dolores: [
      'Todo el mundo habla de Bitcoin pero no entiendes qué es ni si merece la pena',
      'Has comprado cripto sin entenderlo y no sabes si vender o aguantar',
      'No sabes cómo declarar tus ganancias con cripto en la renta',
      'Te preguntas cuánto porcentaje de tu cartera debería ser cripto',
    ],
    queveras: [
      { ico: '₿', titulo: 'Bitcoin y Ethereum', desc: 'Qué son, cómo funcionan y por qué son diferentes al resto.' },
      { ico: '🧾', titulo: 'Fiscalidad cripto', desc: 'Cómo declarar operaciones en España para no tener problemas con Hacienda.' },
      { ico: '⚖️', titulo: 'Cripto en tu cartera', desc: 'Cuánto es razonable tener y cómo no convertirte en un especulador.' },
    ],
    siguiente: null,
  },
}

export function generateStaticParams() {
  return [{ nivel: '0' }, { nivel: '1' }, { nivel: '2' }, { nivel: '3' }]
}

export function generateMetadata({ params }: { params: { nivel: string } }): Metadata {
  const meta = NIVEL_META[params.nivel]
  if (!meta) return {}
  const canonical = siteUrl(`/nivel/${params.nivel}`)
  return {
    title: `${meta.h1} — ${meta.label} | Dinero Futuro`,
    description: meta.body,
    alternates: { canonical, languages: { es: canonical, 'x-default': canonical } },
    openGraph: {
      type: 'website',
      title: meta.h1,
      description: meta.body,
      url: canonical,
      locale: 'es_ES',
      siteName: 'Dinero Futuro',
    },
  }
}

const NIVEL_COLORS: Record<string, { badge: string; bar: string; bg: string; border: string }> = {
  '0': { badge: 'bg-[#E8F4FD] text-[#1A6FA8]', bar: 'bg-[#1A6FA8]', bg: 'bg-[#E8F4FD]', border: 'border-[#93C5FD]' },
  '1': { badge: 'bg-mist text-forest',          bar: 'bg-sage',       bg: 'bg-mist',       border: 'border-sage'       },
  '2': { badge: 'bg-[#FEE2E2] text-[#991B1B]',  bar: 'bg-[#991B1B]', bg: 'bg-[#FEE2E2]', border: 'border-[#FCA5A5]'  },
  '3': { badge: 'bg-gold-light text-[#7C5C10]', bar: 'bg-gold',       bg: 'bg-gold-light', border: 'border-[#FDE68A]'  },
}

const ALL_NIVELES = ['0', '1', '2', '3']

export default function NivelPage({ params }: { params: { nivel: string } }) {
  const meta   = NIVEL_META[params.nivel]
  if (!meta) notFound()

  const colors   = NIVEL_COLORS[params.nivel]
  const articles = getArticlesByNivel(Number(params.nivel))

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* ── Level switcher ─────────────────────────────────────────── */}
          <div className="flex gap-2 flex-wrap mb-8">
            {ALL_NIVELES.map(n => (
              <Link
                key={n}
                href={`/nivel/${n}`}
                className={`px-4 py-[6px] rounded-full text-[12.5px] font-semibold border-[1.5px] transition-all hover:-translate-y-px ${
                  n === params.nivel
                    ? `${NIVEL_COLORS[n].badge} border-current font-bold`
                    : 'bg-cream border-border text-ink3 hover:border-sage'
                }`}
              >
                {NIVEL_META[n].emoji} Nivel {n}
              </Link>
            ))}
          </div>

          {/* ── Hero ───────────────────────────────────────────────────── */}
          <div className={`${colors.bg} border ${colors.border} rounded-2xl p-8 mb-8`}>
            <div className={`w-10 h-1 rounded-full mb-4 ${colors.bar}`} />
            <p className="text-[12px] font-bold uppercase tracking-[.12em] text-ink3 mb-2">{meta.label}</p>
            <h1 className="font-fraunces text-[40px] font-black text-ink leading-tight mb-3 max-sm:text-[28px]">
              {meta.h1}
            </h1>
            <p className="text-[17px] text-ink2 leading-[1.65] font-medium mb-4">{meta.tagline}</p>
            <p className="text-[15px] text-ink2 leading-[1.7]">{meta.body}</p>
          </div>

          {/* ── ¿Te suena esto? ────────────────────────────────────────── */}
          <div className="bg-paper border border-border rounded-2xl p-7 mb-8">
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-5">¿Te suena alguno de estos?</h2>
            <ul className="space-y-3">
              {meta.dolores.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[3px] w-5 h-5 rounded-full bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center text-[11px] font-black flex-shrink-0">✗</span>
                  <span className="text-[15px] text-ink2 leading-[1.6]">{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-border">
              <div className="inline-flex items-center gap-3 bg-cream rounded-xl px-4 py-3">
                <span className="text-[18px]">👇</span>
                <p className="text-[14px] text-forest font-semibold">Los artículos de abajo resuelven exactamente estos problemas.</p>
              </div>
            </div>
          </div>

          {/* ── Qué verás aquí ─────────────────────────────────────────── */}
          <div className="mb-8">
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-4">Qué encontrarás en este nivel</h2>
            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {meta.queveras.map(({ ico, titulo, desc }) => (
                <div key={titulo} className="bg-paper border border-border rounded-xl p-5">
                  <span className="text-[26px] block mb-3">{ico}</span>
                  <h3 className="font-semibold text-[14px] text-ink mb-1">{titulo}</h3>
                  <p className="text-[13px] text-ink3 leading-[1.55]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Artículos ──────────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-fraunces text-[20px] font-bold text-ink">
                Artículos de este nivel
                {articles.length > 0 && (
                  <span className="ml-2 text-[14px] font-normal text-ink3">({articles.length})</span>
                )}
              </h2>
            </div>

            {articles.length === 0 ? (
              <div className="bg-cream border border-border rounded-2xl p-12 text-center">
                <div className="text-[48px] mb-4">{meta.emoji}</div>
                <p className="font-fraunces text-[20px] font-bold text-ink mb-2">Próximamente</p>
                <p className="text-ink3">Estamos preparando el contenido de este nivel.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
                {articles.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} variant="third" gradientIndex={i} />
                ))}
              </div>
            )}
          </div>

          {/* ── Siguiente nivel ────────────────────────────────────────── */}
          {meta.siguiente && (
            <Link
              href={`/nivel/${meta.siguiente.nivel}`}
              className="flex items-center justify-between gap-6 bg-paper border border-border rounded-2xl p-6 hover:shadow-card hover:border-sage transition-all group"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-1">Siguiente paso</p>
                <p className="font-fraunces text-[18px] font-bold text-ink group-hover:text-forest transition-colors">
                  {meta.siguiente.label}
                </p>
                <p className="text-[13.5px] text-ink3 mt-1 leading-snug">{meta.siguiente.teaser}</p>
              </div>
              <span className="text-[24px] text-ink3 group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
            </Link>
          )}

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
