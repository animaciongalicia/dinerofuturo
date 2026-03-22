'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function calcMensualSinRentabilidad(meta: number, actual: number, meses: number): number {
  const needed = meta - actual
  if (needed <= 0) return 0
  return Math.ceil(needed / meses)
}

function calcMensualConRentabilidad(meta: number, actual: number, meses: number, tasaAnual: number): number {
  const r = tasaAnual / 100 / 12
  const futureActual = actual * Math.pow(1 + r, meses)
  const needed = meta - futureActual
  if (needed <= 0) return 0
  if (r === 0) return Math.ceil(needed / meses)
  return Math.ceil(needed / ((Math.pow(1 + r, meses) - 1) / r))
}

const PRESETS = [
  { label: 'Fondo emergencia', amount: 6000 },
  { label: 'Entrada piso', amount: 40000 },
  { label: 'Coche', amount: 15000 },
  { label: 'Viaje', amount: 3000 },
  { label: 'Máster', amount: 8000 },
]

export default function ObjetivoAhorroPage() {
  const [meta, setMeta]       = useState(10000)
  const [actual, setActual]   = useState(0)
  const [meses, setMeses]     = useState(24)
  const [tasa, setTasa]       = useState(3)

  const sinRent  = useMemo(() => calcMensualSinRentabilidad(meta, actual, meses), [meta, actual, meses])
  const conRent  = useMemo(() => calcMensualConRentabilidad(meta, actual, meses, tasa), [meta, actual, meses, tasa])
  const ahorro   = sinRent - conRent
  const yaAlcanzo = actual >= meta

  return (
    <div className="max-w-[860px] mx-auto px-7 py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-moss transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Objetivo de ahorro</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">Herramienta gratuita</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink leading-tight mb-3 max-sm:text-[28px]">
          ¿Cuánto necesito ahorrar al mes?
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7] max-w-[600px]">
          Pon tu meta, cuánto tienes ya y en cuánto tiempo la quieres alcanzar. La calculadora te muestra la cuota mensual necesaria — y cuánto te ahorras si ese dinero genera algo de rentabilidad mientras tanto.
        </p>
      </div>

      {/* Presets */}
      <div className="mb-8">
        <p className="text-[12px] font-semibold text-ink3 uppercase tracking-[.08em] mb-3">Objetivos frecuentes</p>
        <div className="flex gap-2 flex-wrap">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => setMeta(p.amount)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all ${meta === p.amount ? 'bg-forest text-white border-forest' : 'bg-white border-border text-ink3 hover:border-sage'}`}
            >
              {p.label} · {formatEur(p.amount)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-10 max-lg:grid-cols-1">

        {/* ── LEFT: Inputs ── */}
        <div className="space-y-7">
          <SliderField label="Mi objetivo" value={meta} min={500} max={200000} step={500} format={formatEur} onChange={setMeta} />
          <SliderField label="Ya tengo ahorrado" value={actual} min={0} max={meta} step={100} format={formatEur} onChange={v => setActual(Math.min(v, meta))} />
          <SliderField label="Plazo" value={meses} min={1} max={120} step={1} format={v => v < 12 ? `${v} meses` : `${(v/12).toFixed(1).replace('.0','')} años`} onChange={setMeses} />
          <SliderField label="Rentabilidad anual del ahorro" value={tasa} min={0} max={10} step={0.5} format={v => `${v}%`} onChange={setTasa} />
          <p className="text-[12px] text-ink3">
            Si guardas el dinero en una cuenta remunerada (~3%) o lo inviertes en fondos de bajo riesgo, esa rentabilidad reduce la cuota mensual necesaria.
          </p>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="lg:sticky lg:top-[88px] h-fit space-y-4">

          {yaAlcanzo ? (
            <div className="bg-mist border border-sage rounded-2xl p-6 text-center">
              <div className="text-[40px] mb-2">🎉</div>
              <p className="font-fraunces text-[20px] font-bold text-forest">¡Ya lo tienes!</p>
              <p className="text-[13px] text-ink3 mt-2">Tu ahorro actual supera tu objetivo.</p>
            </div>
          ) : (
            <>
              <div className="bg-forest rounded-2xl p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-2">
                  Con rentabilidad del {tasa}%
                </p>
                <div className="font-fraunces text-[52px] font-black leading-none mb-1">{formatEur(conRent)}<span className="text-[20px] text-white/60">/mes</span></div>
                <p className="text-[13px] text-white/60">durante {meses < 12 ? `${meses} meses` : `${(meses/12).toFixed(1).replace('.0','')} años`}</p>
              </div>

              <div className="bg-white border border-border rounded-xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-ink3 mb-3">Sin rentabilidad (cuenta sin intereses)</p>
                <div className="font-fraunces text-[28px] font-black text-ink mb-2">{formatEur(sinRent)}<span className="text-[15px] text-ink3 font-sans font-normal">/mes</span></div>
                {ahorro > 0 && (
                  <p className="text-[12.5px] text-moss font-semibold">
                    Invertir te ahorra {formatEur(ahorro)}/mes
                  </p>
                )}
              </div>

              {/* Meta breakdown */}
              <div className="bg-cream border border-border rounded-xl p-4 text-[13px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-ink3">Falta para la meta</span>
                  <span className="font-semibold text-ink">{formatEur(Math.max(0, meta - actual))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink3">Total a aportar</span>
                  <span className="font-semibold text-ink">{formatEur(conRent * meses)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Educational content */}
      <div className="mt-16 border-t border-border pt-12 space-y-8 max-w-[720px]">
        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Por qué importa la rentabilidad del ahorro</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Para objetivos a más de 18-24 meses, la diferencia entre guardar el dinero en una cuenta sin intereses y ponerlo en una cuenta remunerada al 3% o en un fondo monetario puede reducir la cuota mensual necesaria de forma significativa. A más plazo, más importa. Para plazos cortos (menos de 6 meses), la rentabilidad es marginal y no justifica asumir riesgo.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Cuándo invertir vs cuándo solo ahorrar</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Si necesitas el dinero en menos de 2-3 años, no lo inviertas en bolsa. La bolsa puede bajar justo cuando lo necesites. Para objetivos de corto plazo: cuentas remuneradas, depósitos o letras del tesoro. Para objetivos de 5+ años: fondos indexados. Para el fondo de emergencia: siempre en algo líquido y sin riesgo.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link href="/articulo/como-ahorrar-dinero-cuando-no-te-alcanza" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors">
            Cómo ahorrar si no te alcanza →
          </Link>
          <Link href="/articulo/diferencia-entre-ahorrar-e-invertir" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Ahorrar vs invertir
          </Link>
        </div>
      </div>
    </div>
  )
}

function SliderField({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number
  format: (v: number) => string; onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-[6px]">
        <label className="text-[13px] font-medium text-ink3">{label}</label>
        <span className="text-[16px] font-black text-ink font-fraunces">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
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
