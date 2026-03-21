'use client'

import { useState, useMemo } from 'react'

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
    <div className="max-w-[820px] mx-auto px-7 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[13px] font-medium text-moss mb-2">Herramientas gratuitas</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-3 leading-tight">
          Calculadora de interés compuesto
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7] max-w-[600px]">
          Descubre cuánto crece tu dinero con el tiempo. Cambia los valores y ve el resultado al instante.
        </p>
      </div>

      {/* Inputs + Summary */}
      <div className="grid grid-cols-[1fr_1fr] gap-10 mb-12 max-sm:grid-cols-1 max-sm:gap-6">
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
      <div className="mb-14">
        <h2 className="font-fraunces text-[22px] font-bold text-ink mb-6">
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
              const heightAportado = (row.aportado / maxTotal) * 100
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

                  {/* Bar background (interest) */}
                  <div
                    className="w-full rounded-t-[3px] relative overflow-hidden transition-all duration-500"
                    style={{ height: `${heightTotal}%` }}
                  >
                    {/* Intereses layer */}
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-sage/30"
                      style={{ height: '100%' }}
                    />
                    {/* Aportado layer */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 transition-all ${isLast ? 'bg-forest' : 'bg-moss/70'}`}
                      style={{ height: `${(row.aportado / row.total) * 100}%` }}
                    />
                  </div>

                  {/* Year label */}
                  {(row.year === 1 || row.year % 5 === 0 || isLast) && (
                    <div className="text-center text-[10px] text-ink3 mt-[5px]">
                      {row.year}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
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

      {/* Education section */}
      <div className="border-t border-border pt-10 prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">
        <h2>¿Qué es el interés compuesto?</h2>
        <p>
          El interés compuesto es el proceso por el que los intereses que genera tu inversión se suman al capital y, a su vez, generan más intereses. Es lo que Einstein (se dice, aunque probablemente no fue él) llamó &ldquo;la octava maravilla del mundo&rdquo;.
        </p>
        <p>
          La clave está en el tiempo. Con 10 años la diferencia es notable. Con 20 o 30 años, el efecto se vuelve espectacular: la mayor parte de tu capital final no viene de lo que aportaste, sino de los intereses que se fueron acumulando.
        </p>

        <h2>Cómo usar esta calculadora</h2>
        <ul>
          <li><strong>Capital inicial:</strong> el dinero que inviertes hoy.</li>
          <li><strong>Aportación mensual:</strong> lo que añades cada mes. Aunque sea poco, cambia mucho el resultado final.</li>
          <li><strong>Años:</strong> cuánto tiempo dejas crecer el dinero. Es la variable que más impacto tiene.</li>
          <li><strong>Rentabilidad anual:</strong> el rendimiento esperado. Los fondos indexados globales han dado históricamente entre un 7% y un 10% anual (antes de inflación). Usa un 5–7% para ser conservador.</li>
        </ul>

        <h2>¿Qué rentabilidad es realista?</h2>
        <p>
          El índice MSCI World (las 1.500 mayores empresas del mundo) ha dado una rentabilidad media anual de alrededor del <strong>8–10% en los últimos 30 años</strong>. Descontando inflación (~3%), te queda un 5–7% real. Para esta calculadora, entre un <strong>5% y 7%</strong> es una estimación razonable y conservadora.
        </p>
        <p>
          Recuerda: rentabilidades pasadas no garantizan rentabilidades futuras. Esta calculadora es solo una herramienta educativa.
        </p>
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
