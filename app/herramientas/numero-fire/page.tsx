'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function calcYearsToFire(
  fireNumber: number,
  ahorroActual: number,
  ahorro: number,
  rentabilidadAnual: number,
): number {
  const r = rentabilidadAnual / 100 / 12
  if (ahorroActual >= fireNumber) return 0
  if (ahorro <= 0 && r === 0) return 999
  let saldo = ahorroActual
  for (let m = 1; m <= 600; m++) {
    saldo = saldo * (1 + r) + ahorro
    if (saldo >= fireNumber) return Math.ceil(m / 12)
  }
  return 999
}

export default function NumeroFirePage() {
  const [gastosMes, setGastosMes]   = useState(2000)
  const [tasaRetiro, setTasaRetiro] = useState(4)
  const [ahorroActual, setAhorroActual] = useState(20000)
  const [ahorro, setAhorro]         = useState(800)
  const [rentabilidad, setRentabilidad] = useState(7)
  const [edadActual, setEdadActual] = useState(35)

  const gastoAnual  = gastosMes * 12
  const fireNumber  = Math.round(gastoAnual / (tasaRetiro / 100))
  const falta       = Math.max(0, fireNumber - ahorroActual)
  const yearsToFire = useMemo(
    () => calcYearsToFire(fireNumber, ahorroActual, ahorro, rentabilidad),
    [fireNumber, ahorroActual, ahorro, rentabilidad],
  )
  const edadFire    = yearsToFire === 999 ? null : edadActual + yearsToFire
  const progreso    = Math.min(100, Math.round((ahorroActual / fireNumber) * 100))

  return (
    <div className="max-w-[860px] mx-auto px-7 py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-moss transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Número FIRE</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">Herramienta gratuita</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink leading-tight mb-3 max-sm:text-[28px]">
          Tu número FIRE
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7] max-w-[600px]">
          FIRE significa Financial Independence, Retire Early. Tu número FIRE es el capital que necesitas acumular para vivir de las rentas sin necesitar un sueldo. Esta calculadora te dice cuál es y cuánto tiempo te falta para alcanzarlo.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-10 max-lg:grid-cols-1">

        {/* ── LEFT: Inputs ── */}
        <div className="space-y-7">
          <div>
            <SliderField label="Gastos mensuales en FIRE" value={gastosMes} min={500} max={8000} step={100} format={v => `${formatEur(v)}/mes`} onChange={setGastosMes} />
            <p className="text-[12px] text-ink3 mt-2">Lo que gastarías al mes si no trabajaras. Incluye todo: vivienda, alimentación, ocio, viajes, seguros.</p>
          </div>

          <div>
            <SliderField label="Tasa de retiro segura" value={tasaRetiro} min={2} max={6} step={0.5} format={v => `${v}%`} onChange={setTasaRetiro} />
            <p className="text-[12px] text-ink3 mt-2">
              La regla del 4% (basada en el estudio Trinity, EEUU 1926-1995) dice que puedes retirar ese porcentaje anual sin quedarte sin dinero en 30+ años. Para jubilaciones largas o contextos europeos, el 3-3,5% es más conservador.
            </p>
          </div>

          <SliderField label="Ahorro actual invertido" value={ahorroActual} min={0} max={1000000} step={5000} format={formatEur} onChange={setAhorroActual} />

          <SliderField label="Ahorro mensual que puedes invertir" value={ahorro} min={0} max={5000} step={50} format={v => `${formatEur(v)}/mes`} onChange={setAhorro} />

          <SliderField label="Rentabilidad anual esperada" value={rentabilidad} min={1} max={12} step={0.5} format={v => `${v}%`} onChange={setRentabilidad} />

          <SliderField label="Tu edad actual" value={edadActual} min={18} max={65} step={1} format={v => `${v} años`} onChange={setEdadActual} />
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="lg:sticky lg:top-[88px] h-fit space-y-4">

          {/* FIRE number */}
          <div className="bg-forest rounded-2xl p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-2">Tu número FIRE</p>
            <div className="font-fraunces text-[46px] font-black leading-none mb-1">{formatEur(fireNumber)}</div>
            <p className="text-[13px] text-white/60 mb-5">{gastosMes * 12 < 1 ? '' : `${formatEur(gastoAnual)}/año ÷ ${tasaRetiro}%`}</p>

            {/* Progress bar */}
            <div className="mb-1">
              <div className="flex justify-between text-[12px] text-white/60 mb-1">
                <span>Progreso</span>
                <span className="font-semibold text-white">{progreso}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${progreso}%` }} />
              </div>
            </div>
            <p className="text-[12px] text-white/50">Tienes {formatEur(ahorroActual)} de {formatEur(fireNumber)}</p>
          </div>

          {/* Timeline */}
          <div className={`rounded-2xl p-5 border ${yearsToFire === 999 ? 'bg-amber-50 border-amber-200' : 'bg-mist border-sage/30'}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-forest mb-2">Tiempo estimado</p>
            {yearsToFire === 999 ? (
              <p className="text-[14px] text-amber-700 font-semibold">Con el ahorro actual no alcanzas el objetivo. Aumenta el ahorro mensual o reduce los gastos en FIRE.</p>
            ) : yearsToFire === 0 ? (
              <p className="font-fraunces text-[28px] font-black text-forest">¡Ya eres FIRE! 🎉</p>
            ) : (
              <>
                <div className="font-fraunces text-[36px] font-black text-forest leading-none">{yearsToFire} {yearsToFire === 1 ? 'año' : 'años'}</div>
                {edadFire && <p className="text-[13px] text-forest/70 mt-1">A los {edadFire} años de edad</p>}
              </>
            )}
          </div>

          {/* Key metrics */}
          <div className="bg-white border border-border rounded-xl p-4 space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-ink3">Te falta acumular</span>
              <span className="font-semibold text-ink">{formatEur(falta)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink3">Gastos anuales en FIRE</span>
              <span className="font-semibold text-ink">{formatEur(gastoAnual)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink3">Retiro anual seguro</span>
              <span className="font-semibold text-moss">{formatEur(fireNumber * (tasaRetiro / 100))}</span>
            </div>
          </div>

          <p className="text-[11px] text-ink3 px-1">
            Calculadora orientativa. No tiene en cuenta inflación, impuestos sobre retiradas ni cambios en gastos. Consulta un asesor financiero para planificación real.
          </p>
        </div>
      </div>

      {/* Educational content */}
      <div className="mt-16 border-t border-border pt-12 space-y-8 max-w-[720px]">
        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Qué es el movimiento FIRE</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            FIRE (Financial Independence, Retire Early) es una filosofía financiera que busca acumular suficiente capital para vivir de las rentas sin depender de un trabajo. No es necesariamente "no trabajar más" — muchas personas que alcanzan el FIRE siguen trabajando, pero en lo que quieren, porque ya no lo necesitan económicamente.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">La regla del 4%: de dónde viene</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            El estudio Trinity (1998) analizó carteras de renta variable y fija a lo largo de la historia del mercado americano desde 1926. Concluyó que retirar el 4% anual del portfolio inicial (ajustando por inflación cada año) tenía una tasa de éxito del 95% durante 30 años. Es un punto de partida razonable, pero la regla tiene limitaciones: fue diseñada para 30 años de retiro, el mercado americano, y no considera impuestos ni cambios significativos en los gastos. Para retiros de 40-50 años, el 3-3,5% es más prudente.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Las palancas para llegar antes</h2>
          <p className="text-[15px] text-ink2 leading-[1.75] mb-3">
            Hay tres formas de reducir el tiempo hasta el FIRE, por orden de impacto:
          </p>
          <ol className="space-y-2 text-[15px] text-ink2">
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">1.</span> <span><strong className="text-ink">Reducir gastos en FIRE</strong> — cada 100€/mes menos que necesites reduce tu número FIRE en 30.000€ con la regla del 4%.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">2.</span> <span><strong className="text-ink">Aumentar el ahorro mensual</strong> — es la palanca más directa sobre el tiempo.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">3.</span> <span><strong className="text-ink">Maximizar la rentabilidad</strong> — fondos indexados globales han dado históricamente un 7-9% real. Costes bajos, diversificación amplia.</span></li>
          </ol>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link href="/articulo/cartera-inversion-principiantes-modelo" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors">
            Cómo construir tu cartera →
          </Link>
          <Link href="/herramientas/interes-compuesto" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Calculadora interés compuesto
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
