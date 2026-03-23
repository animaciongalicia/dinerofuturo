'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

interface YearRow {
  year: number
  total: number
  aportado: number
  intereses: number
}

function calcCompoundInterest(
  capital: number,
  aportacionMensual: number,
  años: number,
  rentabilidadAnual: number,
): YearRow[] {
  const r = rentabilidadAnual / 100
  const rMensual = Math.pow(1 + r, 1 / 12) - 1
  const rows: YearRow[] = []
  let saldo = capital

  for (let y = 1; y <= años; y++) {
    for (let m = 0; m < 12; m++) {
      saldo = saldo * (1 + rMensual) + aportacionMensual
    }
    const aportado = capital + aportacionMensual * 12 * y
    rows.push({
      year: y,
      total: Math.round(saldo),
      aportado: Math.round(aportado),
      intereses: Math.round(saldo - aportado),
    })
  }
  return rows
}

function formatEur(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export default function InteresCompuestoPage() {
  const [capital, setCapital] = useState(10000)
  const [aportacion, setAportacion] = useState(200)
  const [años, setAños] = useState(20)
  const [rentabilidad, setRentabilidad] = useState(7)

  const rows = useMemo(
    () => calcCompoundInterest(capital, aportacion, años, rentabilidad),
    [capital, aportacion, años, rentabilidad],
  )

  const last = rows[rows.length - 1]
  const maxTotal = last?.total ?? 1

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-forest transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Interés compuesto</span>
      </nav>

      <div className="flex gap-10 items-start">
        <main className="flex-1 min-w-0">

          {/* Hero visual */}
          <div className="bg-forest rounded-2xl px-8 py-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <p className="text-[12px] font-bold uppercase tracking-[.15em] text-green-300 mb-2">Herramienta gratuita</p>
            <h1 className="font-fraunces text-[36px] font-black leading-tight mb-3 max-sm:text-[26px]">
              Calculadora de interés compuesto
            </h1>
            <p className="text-[16px] text-green-100 leading-[1.65] max-w-[520px] mb-5">
              Descubre cuánto crece tu dinero con el tiempo. Ajusta los valores y ve el resultado al instante — año a año.
            </p>
            {last && (
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-[11px] text-green-300 uppercase tracking-wider font-semibold mb-0.5">Total en {años} años</div>
                  <div className="font-fraunces text-[22px] font-black text-white">{formatEur(last.total)}</div>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-[11px] text-green-300 uppercase tracking-wider font-semibold mb-0.5">De los que son intereses</div>
                  <div className="font-fraunces text-[22px] font-black text-white">{formatEur(last.intereses)}</div>
                </div>
              </div>
            )}
          </div>

          {/* Calculator card */}
          <div className="border border-border rounded-2xl p-6 mb-8 bg-paper">

            {/* Inputs + Summary */}
            <div className="grid grid-cols-[1fr_1fr] gap-10 mb-10 max-sm:grid-cols-1 max-sm:gap-6">
              {/* Sliders */}
              <div className="space-y-6">
                <InputSlider
                  label="Capital inicial"
                  value={capital}
                  min={0}
                  max={100000}
                  step={500}
                  format={formatEur}
                  onChange={setCapital}
                />
                <InputSlider
                  label="Aportación mensual"
                  value={aportacion}
                  min={0}
                  max={2000}
                  step={50}
                  format={formatEur}
                  onChange={setAportacion}
                />
                <InputSlider
                  label="Años de inversión"
                  value={años}
                  min={1}
                  max={40}
                  step={1}
                  format={v => `${v} años`}
                  onChange={setAños}
                />
                <InputSlider
                  label="Rentabilidad anual"
                  value={rentabilidad}
                  min={1}
                  max={15}
                  step={0.5}
                  format={v => `${v}%`}
                  onChange={setRentabilidad}
                />
              </div>

              {/* Result cards */}
              <div className="flex flex-col gap-4">
                <ResultCard
                  label="Total acumulado"
                  value={formatEur(last?.total ?? 0)}
                  highlight
                />
                <ResultCard
                  label="Dinero aportado"
                  value={formatEur(last?.aportado ?? 0)}
                />
                <ResultCard
                  label="Intereses generados"
                  value={formatEur(last?.intereses ?? 0)}
                  accent
                />
                {last && last.intereses > 0 && (
                  <p className="text-[13px] text-ink3 leading-[1.6] mt-1">
                    El <strong className="text-moss">{Math.round((last.intereses / last.total) * 100)}%</strong> de tu capital final son intereses — dinero que el mercado generó por ti.
                  </p>
                )}
              </div>
            </div>

            {/* Bar chart */}
            <div>
              <h2 className="font-fraunces text-[20px] font-bold text-ink mb-5">
                Evolución año a año
              </h2>
              <div className="overflow-x-auto">
                <div
                  className="flex items-end gap-[4px] h-[220px] min-w-[400px]"
                  role="img"
                  aria-label="Gráfico de barras: evolución del capital por año"
                >
                  {rows.map(row => {
                    const heightTotal = (row.total / maxTotal) * 100
                    const isLast = row.year === años

                    return (
                      <div
                        key={row.year}
                        className="flex-1 flex flex-col justify-end group relative"
                        style={{ height: '100%' }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-ink text-white text-[11px] rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                          <div className="font-semibold">Año {row.year}</div>
                          <div>{formatEur(row.total)}</div>
                        </div>

                        {/* Bar */}
                        <div
                          className="w-full rounded-t-[3px] relative overflow-hidden transition-all duration-500"
                          style={{ height: `${heightTotal}%` }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 bg-sage/30" style={{ height: '100%' }} />
                          <div
                            className={`absolute bottom-0 left-0 right-0 transition-all ${isLast ? 'bg-forest' : 'bg-moss/70'}`}
                            style={{ height: `${(row.aportado / row.total) * 100}%` }}
                          />
                        </div>

                        {(row.year === 1 || row.year % 5 === 0 || isLast) && (
                          <div className="text-center text-[10px] text-ink3 mt-[5px]">{row.year}</div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-5 mt-4">
                  <div className="flex items-center gap-[6px] text-[12px] text-ink3">
                    <span className="inline-block w-3 h-3 rounded-sm bg-moss/70" />
                    Dinero aportado
                  </div>
                  <div className="flex items-center gap-[6px] text-[12px] text-ink3">
                    <span className="inline-block w-3 h-3 rounded-sm bg-sage/30 border border-sage/40" />
                    Intereses generados
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla comparativa */}
          <div className="border border-border rounded-2xl p-6 mb-8">
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-1">El coste de esperar</h2>
            <p className="text-[14px] text-ink2 mb-5">Misma aportación mensual (200 €), misma rentabilidad (7%). Solo cambia la edad de inicio.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-semibold text-ink3">Empiezas a los</th>
                    <th className="text-right py-2 px-4 font-semibold text-ink3">Años invertido</th>
                    <th className="text-right py-2 px-4 font-semibold text-ink3">Total aportado</th>
                    <th className="text-right py-2 pl-4 font-semibold text-ink3">Capital a los 65</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { edad: 25, años: 40 },
                    { edad: 30, años: 35 },
                    { edad: 35, años: 30 },
                    { edad: 40, años: 25 },
                    { edad: 45, años: 20 },
                  ].map(({ edad, años: a }) => {
                    const rows = calcCompoundInterest(0, 200, a, 7)
                    const total = rows[rows.length - 1]?.total ?? 0
                    const aportado = 200 * 12 * a
                    return (
                      <tr key={edad} className={`border-b border-border/50 ${edad === 25 ? 'bg-green-50' : ''}`}>
                        <td className="py-2.5 pr-4 font-medium text-ink">{edad} años {edad === 25 ? <span className="text-[11px] text-forest font-semibold ml-1">← mejor caso</span> : ''}</td>
                        <td className="py-2.5 px-4 text-right text-ink2">{a} años</td>
                        <td className="py-2.5 px-4 text-right text-ink2">{formatEur(aportado)}</td>
                        <td className={`py-2.5 pl-4 text-right font-bold font-fraunces ${edad === 25 ? 'text-forest' : 'text-ink'}`}>{formatEur(total)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Content educativo */}
          <div className="space-y-6 mb-8">

            <div className="border border-border rounded-xl p-5">
              <h2 className="font-fraunces text-[19px] font-bold text-ink mb-2">¿Qué rentabilidad es realista?</h2>
              <p className="text-[14px] text-ink2 leading-[1.7] mb-3">
                El índice MSCI World — las 1.500 mayores empresas del mundo — ha dado una rentabilidad media anual de entre el <strong className="text-ink">8% y 10%</strong> en los últimos 30 años (antes de inflación). Descontando una inflación del 3%, te queda un <strong className="text-ink">5–7% real</strong>.
              </p>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                Para esta calculadora, usa un <strong className="text-ink">6–7%</strong> si quieres ser conservador. Rentabilidades pasadas no garantizan rentabilidades futuras — es una estimación educativa.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5">
              <h2 className="font-fraunces text-[19px] font-bold text-ink mb-2">Cómo poner esto en práctica</h2>
              <p className="text-[14px] text-ink2 leading-[1.7] mb-3">
                El vehículo más eficiente para aprovechar el interés compuesto a largo plazo es un{' '}
                <Link href="/articulo/que-es-un-etf-y-como-funciona" className="text-forest font-medium hover:underline">ETF de renta variable global</Link>{' '}
                que replique el MSCI World o el S&P 500. Con aportaciones automáticas mensuales y sin tocar la cartera en las caídas, el interés compuesto hace el resto.
              </p>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                Si nunca has invertido, la guía{' '}
                <Link href="/articulo/como-empezar-a-invertir-desde-cero" className="text-forest font-medium hover:underline">cómo empezar a invertir desde cero</Link>{' '}
                explica paso a paso cómo abrir una cuenta y hacer tu primera compra — sin jerga y sin venderte nada.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5">
              <h2 className="font-fraunces text-[19px] font-bold text-ink mb-2">Antes de invertir: el requisito previo</h2>
              <p className="text-[14px] text-ink2 leading-[1.7]">
                El interés compuesto solo funciona si no tienes que retirar el dinero antes de tiempo. Por eso el primer paso siempre es tener un{' '}
                <Link href="/articulo/fondo-de-emergencia-cuanto-necesitas" className="text-forest font-medium hover:underline">fondo de emergencia</Link>{' '}
                separado: entre 3 y 6 meses de gastos en una cuenta líquida. Sin ese colchón, cualquier imprevisto te obliga a vender inversiones en el peor momento.
              </p>
            </div>

          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="font-fraunces text-[22px] font-bold text-ink mb-4">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {[
                {
                  q: '¿Con cuánto dinero puedo empezar?',
                  a: 'Con cualquier cantidad. La mayoría de plataformas (MyInvestor, Trade Republic, Fintual) no tienen mínimos reales. Con 50 € al mes ya tiene sentido empezar — lo que importa es el tiempo.',
                },
                {
                  q: '¿Qué pasa si el mercado cae durante mi periodo de inversión?',
                  a: 'Las caídas son normales y temporales. El MSCI World ha caído más de un 20% en varias ocasiones desde 1970. En todas ellas, quien no vendió acabó con más dinero que antes de la caída. La clave es no vender en pánico.',
                },
                {
                  q: '¿La calculadora tiene en cuenta la inflación?',
                  a: 'No directamente. La rentabilidad que introduces es nominal. Si metes un 7%, el real ajustado por inflación (~3%) sería aproximadamente un 4%. Puedes ajustar la rentabilidad a la baja si quieres ver el valor real del dinero futuro.',
                },
                {
                  q: '¿ETF o fondo indexado para aprovechar el interés compuesto?',
                  a: 'Ambos funcionan igual de bien. La diferencia es fiscal y operativa: los fondos indexados permiten traspasos sin peaje fiscal en España; los ETFs son más flexibles internacionalmente. Aquí tienes la comparativa completa.',
                },
              ].map((item) => (
                <div key={item.q} className="border border-border rounded-xl px-4 py-3.5">
                  <p className="font-semibold text-[14px] text-ink mb-1">{item.q}</p>
                  <p className="text-[13.5px] text-ink2 leading-[1.65]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-forest rounded-2xl px-7 py-6 text-white flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1">
              <p className="font-fraunces text-[20px] font-black mb-1">¿No sabes en qué invertir para que esto funcione?</p>
              <p className="text-[14px] text-green-100">La guía de cómo empezar a invertir lo explica en pasos concretos.</p>
            </div>
            <Link
              href="/articulo/como-empezar-a-invertir-desde-cero"
              className="shrink-0 bg-white text-forest font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors whitespace-nowrap"
            >
              Leer la guía →
            </Link>
          </div>

        </main>
        <Sidebar />
      </div>
    </div>
  )
}

/* ─── Sub-components ─── */

function InputSlider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-[6px]">
        <label className="text-[13px] font-medium text-ink3">{label}</label>
        <span className="text-[15px] font-bold text-ink font-fraunces">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-[5px] rounded-full appearance-none cursor-pointer bg-mist accent-forest"
      />
      <div className="flex justify-between text-[11px] text-ink3/50 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  highlight,
  accent,
}: {
  label: string
  value: string
  highlight?: boolean
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 border ${
        highlight
          ? 'bg-forest text-white border-forest'
          : accent
          ? 'bg-mist border-sage/40'
          : 'bg-white border-border'
      }`}
    >
      <div
        className={`text-[11px] font-semibold uppercase tracking-[.08em] mb-1 ${
          highlight ? 'text-white/60' : 'text-ink3'
        }`}
      >
        {label}
      </div>
      <div
        className={`font-fraunces text-[28px] font-black tracking-[-0.5px] leading-tight ${
          highlight ? 'text-white' : accent ? 'text-moss' : 'text-ink'
        }`}
      >
        {value}
      </div>
    </div>
  )
}
