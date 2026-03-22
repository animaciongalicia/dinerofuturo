import { getArticlesByCategoria } from '@/lib/articles'
import CategoriaContent from '@/components/CategoriaContent'
import type { Metadata } from 'next'
import type { Article } from '@/lib/types'
import { siteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

const CATEGORIAS: Record<Article['categoria'], {
  label: string
  h1: string
  desc: string
  body: string
  resuelve: string
  emoji: string
}> = {
  ahorro: {
    label: 'Ahorro',
    h1: 'Todo sobre cuentas remuneradas, depósitos y letras del Tesoro',
    emoji: '🏦',
    desc: 'Cuentas de ahorro, depósitos y letras del Tesoro explicados sin complicaciones. Haz que tu dinero genere algo mientras espera.',
    body: 'Tu dinero en cuenta corriente pierde valor cada año por la inflación. En esta sección encontrarás comparativas reales de cuentas remuneradas, cómo funcionan los depósitos a plazo fijo y si las letras del Tesoro siguen siendo buena opción. Sin publicidad encubierta, sin comisiones ocultas.',
    resuelve: 'Tengo dinero parado y no sé dónde meterlo sin riesgo',
  },
  inversion: {
    label: 'Inversión',
    h1: 'ETFs, fondos indexados y bolsa para personas normales',
    emoji: '📈',
    desc: 'Aprende a invertir en ETFs y fondos indexados. Sin necesitar un bróker caro ni conocimientos de economía.',
    body: 'Invertir en bolsa no requiere seguir el mercado todos los días ni pagar comisiones abusivas a un gestor de fondos. La inversión indexada pasiva es el método más sencillo, barato y efectivo para la mayoría de personas. Aquí te explicamos cómo empezar, qué bróker usar y cómo construir una cartera que aguante el paso del tiempo.',
    resuelve: 'Quiero invertir pero no sé qué comprar ni dónde',
  },
  cripto: {
    label: 'Cripto',
    h1: 'Bitcoin y criptomonedas explicados sin humo',
    emoji: '₿',
    desc: 'Todo sobre Bitcoin, Ethereum y criptomonedas. Sin promesas de hacerse rico y con fiscalidad incluida.',
    body: 'Las criptomonedas existen, son reales y tienen utilidad. Pero también son el mercado donde más gente pierde dinero por no entender lo que compra. Aquí explicamos qué es Bitcoin, cómo funcionan las carteras digitales, qué pasa con los impuestos en España y cuánto porcentaje de tu cartera tiene sentido dedicar a esto (pista: no mucho).',
    resuelve: 'Quiero entender cripto sin que me estafen',
  },
  presupuesto: {
    label: 'Presupuesto',
    h1: 'Controla tus gastos y llega a fin de mes sin agobios',
    emoji: '💸',
    desc: 'Métodos de presupuesto reales para personas normales. La regla 50/30/20, el sobre método y más.',
    body: 'Si no sabes exactamente en qué se va tu dinero cada mes, no puedes mejorar. Un presupuesto no es una hoja de cálculo imposible — es simplemente saber qué entra y qué sale. En esta sección encontrarás métodos sencillos (50/30/20, método sobre, presupuesto base cero) y cómo aplicarlos sin volverse loco.',
    resuelve: 'No sé en qué se me va el dinero cada mes',
  },
  vivienda: {
    label: 'Vivienda',
    h1: 'Hipotecas, compra vs alquiler y todo sobre tu piso',
    emoji: '🏠',
    desc: 'Guías prácticas sobre hipotecas, el Euríbor y si compensa más comprar o alquilar según tu situación.',
    body: 'Comprar una vivienda es la decisión financiera más grande que toma la mayoría de personas. Pero hacerla bien requiere entender cómo funciona una hipoteca, qué es el Euríbor y cómo te afecta, cuánto cuesta realmente una compra y si en tu caso concreto comprar es mejor que alquilar. Aquí tienes las herramientas y los artículos para decidir con criterio.',
    resuelve: 'No sé si me compensa comprar piso o seguir de alquiler',
  },
  impuestos: {
    label: 'Impuestos',
    h1: 'Declara tus inversiones sin pagar de más a Hacienda',
    emoji: '🧾',
    desc: 'Guía fiscal para inversores particulares en España. Cómo tributan ETFs, fondos, cripto y dividendos.',
    body: 'Hacienda no te explica cómo pagar menos dentro de la ley — eso te lo tienes que buscar tú. En esta sección encontrarás guías claras sobre cómo tributan los ETFs, los fondos de inversión, las criptomonedas y los dividendos en el IRPF español. También cómo usar las pérdidas para compensar ganancias y cuándo usar un plan de pensiones como deducción.',
    resuelve: 'No sé cómo declarar mis inversiones en la renta',
  },
  jubilacion: {
    label: 'Jubilación',
    h1: 'Prepara tu pensión sin depender solo del Estado',
    emoji: '🏥',
    desc: 'Planes de pensiones, PIAS, fondos de jubilación y cómo complementar la pensión pública española.',
    body: 'La pensión pública española no va a desaparecer, pero probablemente no va a ser suficiente para mantener tu nivel de vida actual. Preparar la jubilación no significa resignarse: significa tomar decisiones hoy que marquen la diferencia en 20 o 30 años. Aquí tienes una guía honesta sobre planes de pensiones, sus ventajas fiscales y sus inconvenientes, y alternativas como los PIAS o simplemente invertir en ETFs a largo plazo.',
    resuelve: 'No sé si voy a tener suficiente para jubilarme',
  },
  comparativa: {
    label: 'Comparativas',
    h1: 'Comparativas honestas de brókers, cuentas y productos',
    emoji: '📊',
    desc: 'Comparativas de brókers, cuentas remuneradas y productos financieros sin sesgo ni patrocinios encubiertos.',
    body: 'En internet hay miles de comparativas de brókers y cuentas de ahorro. La mayoría están pagadas o reciben comisión por cada registro. Las nuestras no. Comparamos comisiones reales, tiempos de respuesta del soporte, facilidad de uso y qué pasa si una plataforma quiebra. Para que elijas con información real, no con la que le conviene al que escribe.',
    resuelve: 'No sé qué bróker o cuenta elegir',
  },
}

export function generateStaticParams() {
  return (Object.keys(CATEGORIAS) as Array<Article['categoria']>).map(c => ({ categoria: c }))
}

export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
  const meta = CATEGORIAS[params.categoria as Article['categoria']]
  if (!meta) return {}
  const canonical = siteUrl(`/categoria/${params.categoria}`)
  return {
    title: meta.h1,
    description: meta.desc,
    alternates: { canonical, languages: { es: canonical, 'x-default': canonical } },
    openGraph: {
      type: 'website',
      title: meta.h1,
      description: meta.desc,
      url: canonical,
      locale: 'es_ES',
      siteName: 'Dinero Futuro',
    },
  }
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const cat  = params.categoria as Article['categoria']
  const meta = CATEGORIAS[cat]
  if (!meta) notFound()

  const articles = getArticlesByCategoria(cat)

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      {/* Hero */}
      <div className="mb-10">
        <div className="text-[44px] mb-3">{meta.emoji}</div>

        <h1 className="font-fraunces text-[40px] font-black text-ink tracking-[-0.5px] mb-4 leading-tight max-sm:text-[30px]">
          {meta.h1}
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.75] max-w-[1200px] mb-6">
          {meta.body}
        </p>

        {/* Resuelve strip */}
        <div className="inline-flex items-center gap-3 bg-cream border-l-[3px] border-sage rounded-r-xl px-5 py-3">
          <span className="text-[11px] font-bold uppercase tracking-[.08em] text-sage whitespace-nowrap">Resuelve</span>
          <span className="text-[15px] font-semibold text-forest">{meta.resuelve}</span>
        </div>
      </div>

      {/* Client component handles filter + grid */}
      <CategoriaContent articles={articles} />
    </div>
  )
}
