import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Finanzas personales en España: guía práctica para hacer crecer tu dinero',
  description:
    'Aprende a manejar tu dinero en España: cuentas remuneradas, Letras del Tesoro, ETFs, IRPF, hipotecas y pensiones. Sin tecnicismos, sin relleno.',
  alternates: { canonical: siteUrl('/pais/espana') },
  openGraph: {
    title: 'Finanzas personales en España — Dinero Futuro',
    description: 'Guía práctica para hacer crecer tu dinero en España.',
    type: 'website',
    url: siteUrl('/pais/espana'),
  },
}

const DOLORES = [
  {
    emoji: '😩',
    titulo: 'Tu banco te paga el 0,01% y tú lo sigues usando',
    desc: 'BBVA, Santander, CaixaBank… te cobran comisiones y te dan nada a cambio. Mientras, otros bancos pagan el 3% sin condiciones. Es el coste de la inercia.',
  },
  {
    emoji: '😶',
    titulo: 'No sabes qué hacer con el dinero que te sobra',
    desc: 'Tienes 5.000, 10.000 o 20.000 euros en cuenta corriente. Sabes que deberían "hacer algo" pero no sabes el qué. Cada mes pierden valor con la inflación.',
  },
  {
    emoji: '🏠',
    titulo: '¿Comprar piso o seguir de alquiler? No consigues calcularlo',
    desc: 'El mercado inmobiliario en España es complicado. Precio del metro cuadrado, Euríbor, gastos de compra, rentabilidad del alquiler. Nadie te da los números claros.',
  },
  {
    emoji: '🧾',
    titulo: 'La declaración de la renta te genera ansiedad',
    desc: 'Rendimientos del capital, retención, deducciones por inversión en fondos… La Agencia Tributaria no te lo pone fácil y tienes miedo de pagar más de lo que debes.',
  },
  {
    emoji: '📉',
    titulo: 'La pensión pública no te va a dar para vivir',
    desc: 'Lo sabes. El sistema de pensiones español está bajo presión. Pero no sabes qué hacer ahora mismo para compensarlo sin complicarte la vida.',
  },
  {
    emoji: '🤷',
    titulo: 'Has oído hablar de ETFs pero no sabes si son para ti',
    desc: 'Fondos indexados, Trade Republic, Vanguard, MSCI World… llevas meses leyendo y sigues sin dar el paso. El miedo a hacerlo mal te paraliza.',
  },
]

const SOLUCIONES = [
  {
    titulo: 'Primero: organiza el gasto',
    color: 'bg-amber-50 border-amber-200',
    badge: 'Nivel 0',
    badgeColor: 'bg-amber-100 text-amber-800',
    pasos: [
      'Apunta cuánto entra neto cada mes (después de IRPF y SS)',
      'Separa: gastos fijos, gastos variables, ahorro, inversión',
      'El ahorro va PRIMERO — antes de pagar el ocio',
      'Meta mínima: 10-15% de lo que ingresa, automatizado el mismo día de la nómina',
    ],
    link: '/nivel/0',
    linkLabel: 'Empezar desde cero →',
  },
  {
    titulo: 'Arma tu colchón de emergencias',
    color: 'bg-green-50 border-green-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-green-100 text-green-800',
    pasos: [
      '3-6 meses de gastos guardados en una cuenta remunerada o Letras del Tesoro a 3 meses',
      'Trade Republic y EVO Banco pagan entre 2,5% y 3,25% con liquidez total',
      'Las Letras del Tesoro a 6-12 meses dan rentabilidad similar con riesgo prácticamente cero',
      'No metas este dinero en fondos de renta variable: necesitas que esté ahí sí o sí',
    ],
    link: '/articulo/fondo-de-emergencia-cuanto-necesitas',
    linkLabel: 'Calcular mi colchón →',
  },
  {
    titulo: 'Mueve el dinero parado',
    color: 'bg-blue-50 border-blue-200',
    badge: 'Urgente si tienes ahorros',
    badgeColor: 'bg-blue-100 text-blue-800',
    pasos: [
      'Cualquier dinero parado en cuenta corriente pierde poder de compra con la inflación',
      'Cuenta remunerada (Trade Republic, EVO, MyInvestor): sin riesgo, sin bloqueos',
      'Letras del Tesoro a 6-12 meses: rentabilidad algo superior, sin riesgo de crédito',
      'El proceso es 100% online y tarda menos de 30 minutos en total',
    ],
    link: '/articulo/mejores-cuentas-remuneradas-2026',
    linkLabel: 'Mejores cuentas 2026 →',
  },
  {
    titulo: 'Empieza a invertir a largo plazo',
    color: 'bg-purple-50 border-purple-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-purple-100 text-purple-800',
    pasos: [
      'Para horizonte de 5+ años: fondos indexados o ETFs globales',
      'MyInvestor: fondos indexados de Vanguard, Amundi e iShares, sin comisión de compraventa',
      'Trade Republic: ETFs desde 1€ con plan de ahorro automático mensual',
      'La estrategia más sencilla: ETF MSCI World o Vanguard FTSE All-World, aportación mensual fija',
    ],
    link: '/articulo/cartera-inversion-principiantes-modelo',
    linkLabel: 'Cartera para principiantes →',
  },
]

const PRODUCTOS = [
  {
    nombre: 'Trade Republic',
    tipo: 'Bróker / Cuenta remunerada',
    para: 'Cuenta que paga ~3,25% + ETFs desde 1€ con planes de ahorro automáticos',
    ventaja: 'Sin condiciones, sin comisiones de custodia. Regulado por BaFin (Alemania)',
    link: '/articulo/trade-republic-review-2026',
    externo: false,
  },
  {
    nombre: 'MyInvestor',
    tipo: 'Banco online / Bróker',
    para: 'Fondos indexados (Vanguard, Amundi, iShares) sin comisión desde 1€',
    ventaja: 'Regulado por CNMV y Banco de España. Perfecto para fondos indexados',
    link: '/articulo/mejores-brokers-principiantes-2026',
    externo: false,
  },
  {
    nombre: 'Letras del Tesoro',
    tipo: 'Renta fija pública',
    para: 'Ahorro a 3, 6 o 12 meses con respaldo del Estado español',
    ventaja: 'Riesgo prácticamente cero. Se compran en tesoro.pub.es o a través del banco',
    link: '/articulo/letras-del-tesoro-como-comprarlas-paso-a-paso',
    externo: false,
  },
  {
    nombre: 'EVO Banco',
    tipo: 'Neobanco',
    para: 'Cuenta remunerada ~2,85% sin domiciliación obligatoria de nómina',
    ventaja: 'Banco español sin comisiones. Buena alternativa para quien quiere banco doméstico',
    link: null,
    externo: false,
  },
  {
    nombre: 'Indexa Capital',
    tipo: 'Gestión automatizada',
    para: 'Cartera de fondos indexados gestionada por algoritmo, desde 1.000€',
    ventaja: 'La solución más "pasiva" posible: configuras y olvidas. Bajo coste total',
    link: null,
    externo: false,
  },
  {
    nombre: 'Plan de Pensiones / PPIF',
    tipo: 'Inversión con ventaja fiscal',
    para: 'Deducción en IRPF (hasta 1.500€/año en aportaciones directas)',
    ventaja: 'Los Planes de Pensiones de Empleo (PPIF) son especialmente ventajosos si tu empresa los ofrece',
    link: '/articulo/plan-de-pensiones-merece-la-pena-2026',
    externo: false,
  },
]

const GLOSARIO = [
  { termino: 'IRPF', def: 'Impuesto sobre la Renta de las Personas Físicas. Lo que pagas cada año a Hacienda sobre tus ingresos y ganancias de capital.' },
  { termino: 'Euríbor', def: 'Tipo de interés de referencia en la zona euro. Si tienes hipoteca variable, tu cuota sube y baja con él.' },
  { termino: 'TIN / TAE', def: 'TIN = tipo nominal anual. TAE = tasa anual equivalente, incluye comisiones. El que importa de verdad es el TAE.' },
  { termino: 'CNMV', def: 'Comisión Nacional del Mercado de Valores. El regulador de brókers e inversiones en España.' },
  { termino: 'FOGAIN', def: 'Fondo de Garantía de Inversiones. Protege hasta 100.000€ por inversor si un bróker español quiebra.' },
  { termino: 'FGD', def: 'Fondo de Garantía de Depósitos. Protege hasta 100.000€ por titular si un banco español quiebra.' },
  { termino: 'Letras del Tesoro', def: 'Deuda pública del Estado español a corto plazo (3, 6 o 12 meses). Prácticamente sin riesgo.' },
  { termino: 'Fondo indexado', def: 'Fondo que replica un índice bursátil (MSCI World, S&P 500…) con comisiones muy bajas. La base de la inversión pasiva.' },
]

const ARTICULOS = [
  { href: '/articulo/mejores-cuentas-remuneradas-2026', label: 'Mejores cuentas remuneradas 2026' },
  { href: '/articulo/letras-del-tesoro-como-comprarlas-paso-a-paso', label: 'Cómo comprar Letras del Tesoro paso a paso' },
  { href: '/articulo/hipoteca-fija-vs-variable-cual-elegir', label: 'Hipoteca fija vs variable: cuál elegir' },
  { href: '/articulo/mejores-brokers-principiantes-2026', label: 'Mejores brókers para principiantes 2026' },
  { href: '/articulo/trade-republic-review-2026', label: 'Trade Republic: análisis completo 2026' },
  { href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera de inversión para principiantes' },
  { href: '/articulo/plan-de-pensiones-merece-la-pena-2026', label: '¿Merece la pena el plan de pensiones en 2026?' },
  { href: '/articulo/comprar-vs-alquilar-piso-calculo', label: 'Comprar vs alquilar piso: el cálculo real' },
]

export default function EspanaPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/pais" className="hover:text-forest transition-colors">Finanzas por país</Link>
        <span>/</span>
        <span className="text-ink font-medium">España</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="relative bg-[#AA151B] rounded-2xl px-8 py-10 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none pr-4 pt-2">🇪🇸</div>
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-red-300 mb-2">
              Finanzas personales en España
            </p>
            <h1 className="font-fraunces text-[38px] font-black text-white leading-tight mb-4 max-sm:text-[28px]">
              Haz trabajar tu dinero de verdad
            </h1>
            <p className="text-[17px] text-red-100 leading-[1.7] max-w-[560px]">
              Sin humo, sin cursos caros. Aprende a dejar de regalarle dinero a tu banco,
              dónde meter los ahorros sin riesgo y cómo empezar a invertir aunque no tengas
              ni idea de fondos indexados ni de Euríbor.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-white text-[#AA151B] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
              >
                🧭 ¿Qué hago con mi dinero?
              </Link>
              <Link
                href="/nivel/0"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors"
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
            <p className="text-[15px] text-ink2 mb-6">Si dijiste que sí a más de uno, estás en el lugar correcto.</p>
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
              Por dónde empezar
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Las finanzas tienen un orden. No saltes pasos — funciona como una escalera.
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
              Productos y plataformas en España
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Opciones reales, reguladas y sin letra pequeña trampa.
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
                  {p.link && (
                    <Link href={p.link}
                      className="text-[12px] text-forest hover:underline shrink-0 mt-1">
                      Ver guía →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Artículos */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Artículos para empezar
            </h2>
            <p className="text-[15px] text-ink2 mb-5">
              Los más útiles para alguien que vive en España y quiere poner orden en su dinero.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARTICULOS.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 hover:border-sage hover:shadow-card transition-all group"
                >
                  <span className="text-forest text-[16px]">→</span>
                  <span className="text-[14px] font-medium text-ink group-hover:text-forest transition-colors">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Glosario */}
          <section className="mb-8">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Palabras que vas a escuchar
            </h2>
            <p className="text-[15px] text-ink2 mb-5">El vocabulario financiero español explicado en cristiano.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GLOSARIO.map((g) => (
                <div key={g.termino} className="border border-border rounded-xl px-4 py-3">
                  <span className="font-bold text-[14px] text-ink">{g.termino}</span>
                  <p className="text-[13px] text-ink2 mt-0.5">{g.def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Wizard */}
          <div className="bg-forest rounded-2xl px-8 py-7 text-white text-center">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-green-300 mb-2">Diagnóstico personalizado</p>
            <h3 className="font-fraunces text-[24px] font-black mb-2">¿No sabes por dónde empezar?</h3>
            <p className="text-[15px] text-green-100 mb-5">Responde 7 preguntas y te damos un plan financiero ajustado a tu situación real.</p>
            <Link
              href="/que-hacer-con-mi-dinero"
              className="inline-flex items-center gap-2 bg-white text-forest font-bold text-[15px] px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              🧭 Hacer el diagnóstico gratis
            </Link>
          </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}
