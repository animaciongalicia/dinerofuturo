import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Finanzas personales en México: guía práctica para hacer crecer tu lana',
  description:
    'Aprende a manejar tu dinero en México: CETES, AFORE, inversión con poco dinero, cómo salir de deudas y hacer rendir la quincena. Sin tecnicismos, sin rollo.',
  alternates: { canonical: siteUrl('/pais/mexico') },
  openGraph: {
    title: 'Finanzas personales en México — Dinero Futuro',
    description: 'Guía práctica para hacer crecer tu lana en México.',
    type: 'website',
    url: siteUrl('/pais/mexico'),
  },
}

const DOLORES = [
  {
    emoji: '😩',
    titulo: 'La quincena llega y ya no alcanza',
    desc: 'Recibes tu raya, pagas lo urgente y en tres días ya no queda nada. No es que gastes de más — es que nadie te enseñó a organizarte.',
  },
  {
    emoji: '😶',
    titulo: 'Tienes AFORE pero ni sabes cuál es',
    desc: 'Llevas años cotizando al IMSS y sabes que algo se va a tu AFORE, pero no sabes cuánto tienes, cuál te asignaron ni si está bien manejada.',
  },
  {
    emoji: '💸',
    titulo: 'El banco te cobra por todo y te da nada',
    desc: 'Comisiones por mantenimiento, por retiro, por todo. Y mientras, tus ahorros generan 0.1% anual. El banco gana con tu dinero, tú no.',
  },
  {
    emoji: '😰',
    titulo: 'No sabes dónde meter tus ahorros',
    desc: '¿CETES? ¿SOFIPOS? ¿GBM? ¿Acciones? Hay demasiadas opciones y mucho ruido en redes. No sabes qué es seguro y qué es una estafa.',
  },
  {
    emoji: '📉',
    titulo: 'Tienes deudas que no bajan',
    desc: 'Tarjeta de crédito, Coppel, préstamo personal, abonos del celular. Pagas cada mes pero el saldo nunca baja porque los intereses te comen.',
  },
  {
    emoji: '🤷',
    titulo: 'Nadie te habló de dinero en serio',
    desc: 'En la escuela no te enseñaron finanzas. En casa tampoco. Y en internet solo ves gurús que venden cursos o influencers con Lamborghinis.',
  },
]

const SOLUCIONES = [
  {
    titulo: 'Primero: organiza el gasto',
    color: 'bg-amber-50 border-amber-200',
    badge: 'Nivel 0',
    badgeColor: 'bg-amber-100 text-amber-800',
    pasos: [
      'Anota cuánto entra y cuánto sale cada quincena',
      'Separa: gastos fijos, gastos variables, deudas, ahorro',
      'El ahorro va primero — antes que cualquier otro gasto',
      'Meta inicial: 10% de lo que ganas, en una cuenta separada',
    ],
    link: '/nivel/0',
    linkLabel: 'Empezar desde cero →',
  },
  {
    titulo: 'Liquida las deudas caras',
    color: 'bg-red-50 border-red-200',
    badge: 'Urgente',
    badgeColor: 'bg-red-100 text-red-800',
    pasos: [
      'Lista todas tus deudas con su tasa de interés',
      'Tarjetas departamentales (Liverpool, Coppel): 60-80% anual — las más peligrosas',
      'Paga primero la de interés más alto mientras das el mínimo en las demás',
      'Nunca saques un préstamo personal para pagar otra deuda (salvo tasa mucho menor)',
    ],
    link: '/articulo/deudas-como-salir-por-donde-empezar',
    linkLabel: 'Cómo salir de deudas →',
  },
  {
    titulo: 'Arma tu colchón de emergencias',
    color: 'bg-green-50 border-green-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-green-100 text-green-800',
    pasos: [
      'Mínimo 3 meses de gastos guardados en un lugar separado',
      'En México: CETES a 28 días o SOFIPOS son lo ideal',
      'No toques este dinero salvo emergencia real',
      'Una vez completo, empieza a pensar en inversión',
    ],
    link: '/herramientas/fondo-emergencia',
    linkLabel: 'Calcular mi colchón →',
  },
  {
    titulo: 'Empieza a invertir',
    color: 'bg-blue-50 border-blue-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-blue-100 text-blue-800',
    pasos: [
      'CETES Directo: desde $100 pesos, respaldado por el gobierno',
      'GBM Pocket: para ETFs globales desde México, muy sencillo',
      'Revisa tu AFORE: cámbiala si tu rendimiento neto es menor al promedio del sistema',
      'Con horizonte largo (+10 años): ETFs de renta variable dan más que CETES',
    ],
    link: '/nivel/2',
    linkLabel: 'Guía de inversión →',
  },
]

const PRODUCTOS = [
  {
    nombre: 'CETES Directo',
    tipo: 'Ahorro / Renta fija',
    para: 'Colchón de emergencias y ahorro de corto plazo',
    ventaja: 'Respaldado por el gobierno federal, desde $100 pesos',
    url: 'https://www.cetesdirecto.com',
    externo: true,
  },
  {
    nombre: 'AFORE',
    tipo: 'Pensión obligatoria',
    para: 'Jubilación — si trabajas en el IMSS/ISSSTE ya tienes una',
    ventaja: 'Revísala en AFORENET, cámbiala si rinde menos que el promedio',
    url: 'https://www.aforenet.mx',
    externo: true,
  },
  {
    nombre: 'GBM / Bursanet',
    tipo: 'Broker de inversión',
    para: 'ETFs globales, acciones BMV y NYSE desde México',
    ventaja: 'GBM Pocket es lo más sencillo para principiantes',
    url: null,
    externo: false,
  },
  {
    nombre: 'Nu (Nubank México)',
    tipo: 'Neobanco',
    para: 'Cuenta de ahorro con rendimiento diario, sin comisiones',
    ventaja: 'Rinde por encima de CETES a 28 días, sin mínimos',
    url: null,
    externo: false,
  },
  {
    nombre: 'PPR (Plan Personal de Retiro)',
    tipo: 'Inversión con ventaja fiscal',
    para: 'Quienes pagan impuestos: deduces hasta 10% de tu ingreso anual',
    ventaja: 'La deducción hace que tu inversión valga más desde el primer año',
    url: null,
    externo: false,
  },
  {
    nombre: 'SOFIPOS',
    tipo: 'Ahorro regulado',
    para: 'Alternativa a los bancos para ahorrar con mejor tasa',
    ventaja: 'Fondeo para pequeños ahorradores, reguladas por CNBV',
    url: null,
    externo: false,
  },
]

const GLOSARIO = [
  { termino: 'AFORE', def: 'Administradora de Fondos para el Retiro. Gestiona tu pensión obligatoria si cotizas al IMSS.' },
  { termino: 'CETES', def: 'Certificados de la Tesorería. Bonos del gobierno federal mexicano. Muy seguros, rendimiento variable.' },
  { termino: 'SOFIPO', def: 'Sociedad Financiera Popular. Cooperativas de ahorro reguladas, alternativa a los bancos.' },
  { termino: 'PPR', def: 'Plan Personal de Retiro. Inversión para jubilación con beneficio fiscal: deduces de impuestos.' },
  { termino: 'TIIE', def: 'Tasa de Interés Interbancaria de Equilibrio. El "tipo de interés" de referencia en México.' },
  { termino: 'SAR', def: 'Sistema de Ahorro para el Retiro. El sistema completo de pensiones de México (incluye AFORE).' },
  { termino: 'UDI', def: 'Unidad de Inversión. Valor que se actualiza con la inflación, protege tu ahorro.' },
  { termino: 'BMV', def: 'Bolsa Mexicana de Valores. La bolsa de acciones de México.' },
]

const ARTICULOS = [
  { href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', label: '¿Qué es el interés compuesto? Ejemplos reales' },
  { href: '/articulo/diferencia-entre-ahorrar-e-invertir', label: 'La diferencia entre ahorrar e invertir' },
  { href: '/articulo/como-empezar-a-invertir-desde-cero', label: 'Cómo empezar a invertir desde cero' },
  { href: '/articulo/fondo-de-emergencia-cuanto-necesitas', label: 'Fondo de emergencia: cuánto necesitas' },
  { href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Deudas: cómo salir y por dónde empezar' },
  { href: '/articulo/primer-sueldo-que-hacer-con-tu-dinero', label: 'Primer sueldo: qué hacer con tu dinero' },
]

export default function MexicoPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Finanzas en México</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="relative bg-[#006847] rounded-2xl px-8 py-10 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none pr-4 pt-2">🇲🇽</div>
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-green-300 mb-2">
              Finanzas personales en México
            </p>
            <h1 className="font-fraunces text-[38px] font-black text-white leading-tight mb-4 max-sm:text-[28px]">
              Haz rendir tu lana de verdad
            </h1>
            <p className="text-[17px] text-green-100 leading-[1.7] max-w-[560px]">
              Sin cursos de pago, sin gurús en redes. Aquí aprendes a organizar el gasto,
              salir de deudas, armar tu colchón y empezar a invertir — aunque la quincena
              no alcance todavía.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-white text-[#006847] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
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

          {/* Productos y plataformas */}
          <section className="mb-12">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Productos y plataformas en México
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Opciones reales, accesibles y reguladas. Sin promesas raras ni esquemas de red.
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
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-[12px] text-forest hover:underline shrink-0 mt-1">
                      Ver sitio ↗
                    </a>
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
            <p className="text-[15px] text-ink2 mb-5">Conceptos universales que aplican igual en México que en cualquier parte.</p>
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

          {/* Glosario México */}
          <section className="mb-8">
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">
              Palabras que vas a escuchar
            </h2>
            <p className="text-[15px] text-ink2 mb-5">El vocabulario financiero mexicano explicado en cristiano.</p>
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
