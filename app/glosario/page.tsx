import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Glosario financiero',
  description: 'Diccionario de términos financieros explicados en lenguaje claro. Sin jerga innecesaria.',
}

const terms = [
  { term: 'ETF', def: 'Fondo cotizado en bolsa. Replica un índice (p. ej. S&P 500) con comisiones muy bajas. Ideal para invertir de forma diversificada sin seleccionar acciones.' },
  { term: 'Fondo indexado', def: 'Similar al ETF pero se compra directamente al fondo, no en bolsa. Misma idea: seguir un índice con costes mínimos.' },
  { term: 'Interés compuesto', def: 'Los intereses que genera tu inversión se reinvierten y a su vez generan más intereses. Con tiempo, el efecto es exponencial.' },
  { term: 'Euríbor', def: 'Tipo de interés al que se prestan dinero los bancos europeos. Sirve de referencia para la mayoría de hipotecas variables en España.' },
  { term: 'IPC', def: 'Índice de Precios al Consumo. Mide la inflación: cuánto suben los precios de lo que compras habitualmente.' },
  { term: 'Diversificación', def: 'No poner todos los huevos en la misma cesta. Repartir el dinero entre diferentes activos para reducir el riesgo.' },
  { term: 'Rentabilidad', def: 'Ganancia de una inversión expresada como porcentaje del capital invertido. Una rentabilidad del 7% anual sobre 10.000€ son 700€ al año.' },
  { term: 'Riesgo', def: 'Probabilidad de perder parte del dinero invertido. A más rentabilidad esperada, generalmente más riesgo.' },
  { term: 'Cartera', def: 'El conjunto de inversiones que tienes. Puede incluir acciones, bonos, fondos, inmuebles, cripto, etc.' },
  { term: 'Bróker', def: 'Intermediario que te permite comprar y vender activos financieros (acciones, ETFs, etc.). Ejemplos: DEGIRO, Interactive Brokers, MyInvestor.' },
  { term: 'Dividend', def: 'Parte del beneficio que una empresa reparte entre sus accionistas. Cobras dinero por tener acciones, aunque haya menos que en acciones de crecimiento.' },
  { term: 'Volatilidad', def: 'Cuánto oscila el precio de un activo. Alta volatilidad = grandes subidas y bajadas. El cripto tiene mucha; los bonos del estado, poca.' },
  { term: 'Fondo de emergencia', def: '3–6 meses de gastos en una cuenta líquida y segura. Es el primer paso antes de invertir.' },
  { term: 'IRPF', def: 'Impuesto sobre la Renta de las Personas Físicas. Las ganancias de inversiones tributan como rendimientos del capital mobiliario.' },
  { term: 'Plan de pensiones', def: 'Vehículo de ahorro para la jubilación con ventajas fiscales. Las aportaciones reducen la base imponible del IRPF.' },
]

export default function GlosarioPage() {
  return (
    <div className="max-w-[820px] mx-auto px-7 py-14">
      <div className="mb-10">
        <p className="text-[13px] font-medium text-moss mb-2">Referencia rápida</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-3">
          Glosario financiero
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7]">
          Los términos que necesitas saber, explicados sin jerga. Actualizado continuamente.
        </p>
      </div>

      <div className="divide-y divide-border">
        {terms.map(({ term, def }) => (
          <div key={term} className="py-5 flex gap-6 max-sm:flex-col max-sm:gap-1">
            <div className="w-[180px] flex-shrink-0">
              <span className="font-fraunces text-[17px] font-bold text-ink">{term}</span>
            </div>
            <p className="text-[15px] text-ink2 leading-[1.7] flex-1">{def}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-[14px] text-ink3">
          ¿Falta algún término?{' '}
          <Link href="/contacto" className="text-moss font-semibold hover:text-forest">
            Escríbenos →
          </Link>
        </p>
      </div>
    </div>
  )
}
