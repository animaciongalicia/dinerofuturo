import type { Metadata } from 'next'
import Link from 'next/link'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Glosario financiero: términos explicados en lenguaje claro | Dinero Futuro',
  description: 'Diccionario de más de 40 términos financieros explicados sin jerga. ETF, euríbor, interés compuesto, IRPF y mucho más.',
  alternates: { canonical: siteUrl('/glosario') },
}

const TERMS: { term: string; def: string; cat: string }[] = [
  // Inversión
  { term: 'ETF', cat: 'Inversión', def: 'Fondo cotizado en bolsa que replica un índice (p. ej. S&P 500) con comisiones muy bajas. Puedes comprar y vender durante el horario de mercado como si fuera una acción.' },
  { term: 'Fondo indexado', cat: 'Inversión', def: 'Similar al ETF pero se contrata directamente con la gestora, no en bolsa. Misma idea: seguir un índice con costes mínimos. En España tiene ventaja fiscal frente al ETF (puedes traspasar sin tributar).' },
  { term: 'Interés compuesto', cat: 'Inversión', def: 'Los intereses generados se reinvierten y a su vez generan más intereses. Con tiempo, el efecto es exponencial. 10.000€ al 7% anual durante 30 años = 76.000€.' },
  { term: 'Cartera', cat: 'Inversión', def: 'El conjunto de inversiones que tienes: acciones, bonos, fondos, inmuebles, cripto, etc.' },
  { term: 'Diversificación', cat: 'Inversión', def: 'No poner todos los huevos en la misma cesta. Repartir el dinero entre diferentes activos, sectores y geografías para reducir el riesgo total.' },
  { term: 'Rentabilidad', cat: 'Inversión', def: 'Ganancia de una inversión expresada como porcentaje del capital invertido. Una rentabilidad del 7% anual sobre 10.000€ = 700€ al año.' },
  { term: 'Riesgo', cat: 'Inversión', def: 'Probabilidad de perder parte del dinero invertido. A mayor rentabilidad esperada, generalmente mayor riesgo. El cripto tiene mucho; los bonos del estado, poco.' },
  { term: 'Volatilidad', cat: 'Inversión', def: 'Cuánto oscila el precio de un activo. Alta volatilidad = grandes subidas y bajadas. No es lo mismo que riesgo, aunque se confunden habitualmente.' },
  { term: 'Bróker', cat: 'Inversión', def: 'Intermediario que te permite comprar y vender activos financieros. Ejemplos: DeGiro, Interactive Brokers, MyInvestor.' },
  { term: 'Dividendo', cat: 'Inversión', def: 'Parte del beneficio que una empresa reparte entre sus accionistas en efectivo. Las acciones que pagan dividendo son más frecuentes en empresas maduras y estables.' },
  { term: 'Acumulación vs Distribución', cat: 'Inversión', def: 'Un fondo de acumulación reinvierte automáticamente los dividendos (más eficiente fiscalmente). Uno de distribución te los paga en efectivo.' },
  { term: 'TER', cat: 'Inversión', def: 'Total Expense Ratio. El coste anual total de un fondo o ETF expresado como porcentaje. Un TER del 0,20% sobre 10.000€ = 20€/año.' },
  { term: 'Rebalanceo', cat: 'Inversión', def: 'Ajustar periódicamente los porcentajes de tu cartera para volver a los pesos originales. Si la bolsa sube mucho, rebalanceas vendiendo un poco de renta variable y comprando renta fija.' },
  { term: 'DCA (Dollar Cost Averaging)', cat: 'Inversión', def: 'Estrategia de invertir una cantidad fija de forma periódica (ej: 200€/mes) independientemente del precio. Reduce el impacto del timing y es ideal para principiantes.' },
  // Ahorro
  { term: 'Fondo de emergencia', cat: 'Ahorro', def: '3–6 meses de gastos en una cuenta líquida y segura. Es el primer paso antes de invertir. Si lo tienes en bolsa y hay una emergencia, puedes verte obligado a vender en el peor momento.' },
  { term: 'Cuenta remunerada', cat: 'Ahorro', def: 'Cuenta bancaria que paga intereses por el saldo depositado. La rentabilidad suele ser inferior a la de las letras del Tesoro o depósitos a plazo.' },
  { term: 'Depósito a plazo fijo', cat: 'Ahorro', def: 'Producto bancario que bloquea tu dinero durante un tiempo fijo a cambio de un tipo de interés garantizado. Seguro pero sin liquidez durante el plazo.' },
  { term: 'Letra del Tesoro', cat: 'Ahorro', def: 'Deuda pública española a corto plazo (3, 6, 9 o 12 meses). Rentabilidad garantizada por el Estado, considerada libre de riesgo. Se compra en el Banco de España o brókers.' },
  { term: 'Inflación', cat: 'Ahorro', def: 'Aumento generalizado de los precios. Si la inflación es del 3% y tu cuenta no te da nada, pierdes un 3% de poder adquisitivo cada año aunque el saldo no baje.' },
  // Hipotecas
  { term: 'Euríbor', cat: 'Hipotecas', def: 'Tipo de interés al que se prestan dinero los bancos europeos a corto plazo. Sirve de referencia para la mayoría de hipotecas variables en España. Se revisa normalmente cada 6 o 12 meses.' },
  { term: 'TIN', cat: 'Hipotecas', def: 'Tipo de Interés Nominal. El porcentaje de interés puro del préstamo, sin incluir gastos ni comisiones.' },
  { term: 'TAE', cat: 'Hipotecas', def: 'Tasa Anual Equivalente. Incluye el TIN más todos los gastos y comisiones del producto. Es la cifra real de comparación entre productos financieros.' },
  { term: 'Amortización', cat: 'Hipotecas', def: 'Devolución del capital prestado. Cada cuota hipotecaria incluye intereses + amortización. Al principio pagas más intereses; al final, más capital.' },
  { term: 'ITP', cat: 'Hipotecas', def: 'Impuesto de Transmisiones Patrimoniales. Se paga al comprar una vivienda de segunda mano. Varía por comunidad autónoma: entre el 6% y el 10% del precio de compra.' },
  // Fiscalidad
  { term: 'IRPF', cat: 'Fiscalidad', def: 'Impuesto sobre la Renta de las Personas Físicas. Las ganancias de inversiones tributan como rendimientos del capital mobiliario: 19% hasta 6.000€, 21% de 6.000 a 50.000€, 23% de 50.000 a 200.000€, 27% a partir de ahí.' },
  { term: 'Plusvalía', cat: 'Fiscalidad', def: 'Ganancia obtenida al vender un activo por más de lo que pagaste. Tributa en el IRPF como ganancia patrimonial.' },
  { term: 'Base imponible', cat: 'Fiscalidad', def: 'La cantidad sobre la que se calcula el impuesto. Las aportaciones a planes de pensiones reducen la base imponible del IRPF.' },
  // Jubilación
  { term: 'Plan de pensiones', cat: 'Jubilación', def: 'Vehículo de ahorro para la jubilación con ventajas fiscales. Las aportaciones reducen la base imponible. Problema: el dinero está bloqueado hasta jubilarte (con excepciones) y al rescatar tributa como renta del trabajo.' },
  { term: 'FIRE', cat: 'Jubilación', def: 'Financial Independence, Retire Early. Movimiento que busca alcanzar la independencia financiera lo antes posible mediante alta tasa de ahorro e inversión.' },
  { term: 'Regla del 4%', cat: 'Jubilación', def: 'Regla práctica que dice que puedes retirar un 4% de tu cartera al año sin agotarla en 30 años. Para FIRE, necesitas 25 veces tus gastos anuales invertidos.' },
  { term: 'Número FIRE', cat: 'Jubilación', def: 'La cantidad de dinero invertido que necesitas para jubilarte anticipadamente. Fórmula: gastos anuales × 25 (con la regla del 4%).' },
]

const CATS = Array.from(new Set(TERMS.map(t => t.cat)))

const CAT_COLOR: Record<string, string> = {
  'Inversión':  'bg-[#EFF6FF] text-[#1D4ED8]',
  'Ahorro':     'bg-mist text-forest',
  'Hipotecas':  'bg-[#FFF7ED] text-[#9A3412]',
  'Fiscalidad': 'bg-[#FEF9C3] text-[#7C5C10]',
  'Jubilación': 'bg-[#F5F3FF] text-[#5B21B6]',
}

export default function GlosarioPage() {
  return (
    <div className="max-w-wrap mx-auto px-7 py-14">
      {/* Header */}
      <div className="max-w-[680px] mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-2">Referencia rápida</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-3">
          Glosario financiero
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7]">
          {TERMS.length} términos financieros explicados sin jerga. Actualizado continuamente.
        </p>
      </div>

      {/* Per category */}
      <div className="space-y-12">
        {CATS.map(cat => (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[11px] font-bold uppercase tracking-[.1em] px-3 py-[5px] rounded-full ${CAT_COLOR[cat] ?? 'bg-cream text-ink3'}`}>
                {cat}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-0 max-md:grid-cols-1">
              {TERMS.filter(t => t.cat === cat).map(({ term, def }) => (
                <div key={term} className="py-4 border-b border-border flex gap-4">
                  <span className="font-fraunces text-[15px] font-bold text-ink w-[160px] flex-shrink-0 pt-[1px]">
                    {term}
                  </span>
                  <p className="text-[14px] text-ink2 leading-[1.65] flex-1">{def}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-[14px] text-ink3">
          ¿Falta algún término?{' '}
          <Link href="/contacto" className="text-moss font-semibold hover:text-forest transition-colors">
            Escríbenos →
          </Link>
        </p>
      </div>
    </div>
  )
}
