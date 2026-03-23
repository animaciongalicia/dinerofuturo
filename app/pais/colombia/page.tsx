import Link from 'next/link'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Finanzas personales en Colombia: cómo hacer rendir la plata de verdad',
  description:
    'Aprende a manejar tu plata en Colombia: CDT, AFP, Nequi, Daviplata, inversión en el exterior y cómo salir de deudas. Sin humo, sin enredos.',
  alternates: { canonical: siteUrl('/pais/colombia') },
  openGraph: {
    title: 'Finanzas personales en Colombia — Dinero Futuro',
    description: 'Cómo hacer rendir la plata de verdad en Colombia.',
    type: 'website',
    url: siteUrl('/pais/colombia'),
  },
}

const DOLORES = [
  {
    emoji: '😞',
    titulo: 'La plata en la cuenta se pierde sola',
    desc: 'El banco te cobra 4x1000 cada vez que mueves la plata, comisión por mantenimiento y el CDT te da menos que la inflación. Trabajas para el banco.',
  },
  {
    emoji: '😕',
    titulo: 'No sabes qué va a pasar con tu pensión',
    desc: '¿AFP o Colpensiones? Nadie te explicó bien la diferencia y tomaste lo que te dijeron en la empresa sin entender qué implicaba para tu futuro.',
  },
  {
    emoji: '💳',
    titulo: 'Las deudas no bajan',
    desc: 'Tarjeta de crédito al 30-40% anual, crédito de libre inversión, cuotas del celular. Cada mes pagas pero el saldo no baja — los intereses te consumen.',
  },
  {
    emoji: '🤔',
    titulo: 'No sabes cómo invertir afuera de Colombia',
    desc: 'Escuchas que deberías tener dólares y ETFs pero no sabes cómo hacerlo legalmente desde Colombia sin montos mínimos imposibles.',
  },
  {
    emoji: '📊',
    titulo: 'El CDT es lo único que conoces',
    desc: 'Ahorro = CDT. Eso te enseñaron. Pero hay muchas más opciones con mayor rentabilidad y igual o más seguridad que no conoces.',
  },
  {
    emoji: '😓',
    titulo: 'Los ingresos variables te descontrolan',
    desc: 'Freelance, comisiones, negocio propio. Un mes te va bien, otro mal. Sin organización financiera esto se convierte en estrés permanente.',
  },
]

const SOLUCIONES = [
  {
    titulo: 'Primero: ponle orden a los ingresos',
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'Nivel 0',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    pasos: [
      'Separa lo que entra de lo que sale — simple pero muy pocos lo hacen',
      'Pon el ahorro como un gasto fijo, no como "lo que sobre"',
      'El 4x1000: haz tus movimientos con cabeza para no pagarlo de más',
      'Cuenta de nómina vs cuenta de ahorro vs cuenta de inversión — son tres cosas distintas',
    ],
    link: '/nivel/0',
    linkLabel: 'Organizar mi presupuesto →',
  },
  {
    titulo: 'Acaba con las deudas caras primero',
    color: 'bg-red-50 border-red-200',
    badge: 'Urgente',
    badgeColor: 'bg-red-100 text-red-800',
    pasos: [
      'Tarjeta de crédito al 3% mensual = 43% anual. Es la deuda más cara que tienes.',
      'Crédito de libranza o nómina puede costar 18-25% anual — también urgente',
      'Método: paga el mínimo en todas y ataca con todo la de mayor tasa',
      'Cuando pagues una, ese dinero va a atacar la siguiente',
    ],
    link: '/articulo/deudas-como-salir-por-donde-empezar',
    linkLabel: 'Cómo salir de deudas →',
  },
  {
    titulo: 'Construye tu fondo de emergencias',
    color: 'bg-green-50 border-green-200',
    badge: 'Nivel 1',
    badgeColor: 'bg-green-100 text-green-800',
    pasos: [
      'Mínimo 3 meses de gastos básicos en un lugar separado e intocable',
      'En Colombia: cuenta de ahorros remunerada (Nubank, Nequi Ahorro) o CDT a corto plazo',
      'No es para invertir — es para que un imprevisto no te destruya',
      'Sin fondo de emergencias, cualquier crisis te manda de vuelta al punto cero',
    ],
    link: '/herramientas/fondo-emergencia',
    linkLabel: 'Calcular mi colchón →',
  },
  {
    titulo: 'Empieza a invertir tu plata',
    color: 'bg-blue-50 border-blue-200',
    badge: 'Nivel 2',
    badgeColor: 'bg-blue-100 text-blue-800',
    pasos: [
      'CDT a buena tasa: compara en Tyba o Alkanza — el banco no siempre da la mejor',
      'ETFs internacionales desde Colombia: Tyba, Alpiste o Luisa (plataformas locales)',
      'Acciones BVC: interesante pero menor liquidez y más concentrado en Colombia',
      'Antes de invertir: revisa que tu AFP o Colpensiones esté en orden',
    ],
    link: '/nivel/2',
    linkLabel: 'Guía de inversión →',
  },
]

const PRODUCTOS = [
  {
    nombre: 'Nubank Colombia',
    tipo: 'Neobanco',
    para: 'Cuenta de ahorros con rendimiento diario, tarjeta sin cuota de manejo',
    ventaja: 'Sin 4x1000 en movimientos internos, rentabilidad competitiva',
  },
  {
    nombre: 'Nequi',
    tipo: 'Billetera digital (Bancolombia)',
    para: 'Pagos, envíos gratis y ahorro con "bolsillos"',
    ventaja: 'Más de 18 millones de usuarios, muy fácil de usar',
  },
  {
    nombre: 'Daviplata',
    tipo: 'Billetera digital (Davivienda)',
    para: 'Pagos, recarga, envíos y cuenta de ahorros',
    ventaja: 'Sin cuota de manejo, útil para recibir nómina sin cuenta bancaria',
  },
  {
    nombre: 'CDT (Tyba / Alkanza)',
    tipo: 'Inversión renta fija',
    para: 'Ahorrar a plazo fijo con más tasa que el banco tradicional',
    ventaja: 'Compara tasas de múltiples entidades en un solo lugar',
  },
  {
    nombre: 'Tyba / Alpiste',
    tipo: 'Plataforma de inversión',
    para: 'ETFs internacionales, acciones y fondos desde Colombia',
    ventaja: 'Invertir en dólares desde Colombia de forma legal y sencilla',
  },
  {
    nombre: 'AFP (Colpensiones o privada)',
    tipo: 'Pensión obligatoria',
    para: 'Cotización mensual obligatoria si trabajas formalmente',
    ventaja: 'Revisa cuál te conviene: Colpensiones para menor ingreso, AFP privada si ganas bien',
  },
]

const GLOSARIO = [
  { termino: 'CDT', def: 'Certificado de Depósito a Término. Inviertes una suma por un tiempo fijo a una tasa pactada. Muy popular en Colombia.' },
  { termino: '4x1000', def: 'Impuesto del 4 por mil sobre transacciones financieras. 0.4% sobre cada movimiento — reduce mucho si no planificas.' },
  { termino: 'AFP', def: 'Administradora de Fondos de Pensiones. Las privadas (Protección, Porvenir, Colfondos, Old Mutual) compiten con Colpensiones.' },
  { termino: 'Colpensiones', def: 'Pensión pública del Estado. Puede convenir más que la AFP privada si tienes ingresos bajos o cotizas muchos años.' },
  { termino: 'Prima de servicios', def: 'Pago equivalente a 15 días de salario en junio y diciembre. Hay que saber manejarla — muchos la gastan en horas.' },
  { termino: 'Cesantías', def: 'Ahorro forzoso equivalente a un mes de salario por año trabajado. Úsalas bien — son tu primera red de seguridad.' },
  { termino: 'Retención en la fuente', def: 'Anticipo del impuesto de renta que te descuentan del salario. Hay que conocerla para no tener sorpresas.' },
  { termino: 'GMF', def: 'Gravamen a los Movimientos Financieros. El nombre formal del 4x1000 en los estados de cuenta.' },
]

const ARTICULOS = [
  { href: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', label: '¿Qué es el interés compuesto? Ejemplos reales' },
  { href: '/articulo/diferencia-entre-ahorrar-e-invertir', label: 'La diferencia entre ahorrar e invertir' },
  { href: '/articulo/como-empezar-a-invertir-desde-cero', label: 'Cómo empezar a invertir desde cero' },
  { href: '/articulo/fondo-de-emergencia-cuanto-necesitas', label: 'Fondo de emergencia: cuánto necesitas' },
  { href: '/articulo/gestionar-ingresos-irregulares', label: 'Cómo gestionar ingresos irregulares' },
  { href: '/articulo/que-es-un-etf-y-como-funciona', label: 'Qué es un ETF y cómo funciona' },
]

export default function ColombiaPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-forest transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-ink font-medium">Finanzas en Colombia</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero */}
          <div className="relative bg-[#003087] rounded-2xl px-8 py-10 mb-10 overflow-hidden">
            <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none select-none pr-4 pt-2">🇨🇴</div>
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-yellow-300 mb-2">
              Finanzas personales en Colombia
            </p>
            <h1 className="font-fraunces text-[38px] font-black text-white leading-tight mb-4 max-sm:text-[28px]">
              Haz rendir la plata de verdad
            </h1>
            <p className="text-[17px] text-blue-100 leading-[1.7] max-w-[560px]">
              Sin humo, sin enredos. Aprende a organizar tus finanzas, sacar el mayor
              partido al CDT, entender AFP vs Colpensiones y empezar a invertir
              afuera de Colombia — aunque estés empezando.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/que-hacer-con-mi-dinero"
                className="inline-flex items-center gap-2 bg-yellow-400 text-[#003087] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors"
              >
                🧭 ¿Qué hago con mi plata?
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
            <p className="text-[15px] text-ink2 mb-6">Si reconoces más de uno, estás en el lugar correcto.</p>
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
              Hay un orden que funciona. Saltar pasos solo hace que todo tome más tiempo.
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
              Plataformas y productos en Colombia
            </h2>
            <p className="text-[15px] text-ink2 mb-6">
              Opciones reales, reguladas por la SuperFinanciera. Sin esquemas de multinivel ni promesas imposibles.
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
            <p className="text-[15px] text-ink2 mb-5">Conceptos que aplican igual en Colombia que en cualquier parte del mundo.</p>
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
            <h2 className="font-fraunces text-[26px] font-black text-ink mb-2">El vocabulario financiero colombiano</h2>
            <p className="text-[15px] text-ink2 mb-5">Las palabras que vas a encontrar al manejar tu plata en Colombia.</p>
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
            <p className="text-[15px] text-green-100 mb-5">Responde 7 preguntas y te damos un plan financiero ajustado a tu situación.</p>
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
