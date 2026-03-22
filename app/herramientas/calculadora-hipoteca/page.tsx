'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function calcHipoteca(principal: number, tasaAnual: number, años: number) {
  const n = años * 12
  const r = tasaAnual / 100 / 12
  if (r === 0) return { cuota: principal / n, totalPagado: principal, totalIntereses: 0 }
  const cuota = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPagado = cuota * n
  return {
    cuota: Math.round(cuota),
    totalPagado: Math.round(totalPagado),
    totalIntereses: Math.round(totalPagado - principal),
  }
}

function AmortizationBar({ principal, totalIntereses }: { principal: number; totalIntereses: number }) {
  const total = principal + totalIntereses
  const pctPrincipal = (principal / total) * 100
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-3 mb-2">
        <div className="bg-forest" style={{ width: `${pctPrincipal}%` }} />
        <div className="bg-gold/70 flex-1" />
      </div>
      <div className="flex gap-5 text-[12px] text-ink3">
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-forest" /> Capital ({Math.round(pctPrincipal)}%)</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-gold/70" /> Intereses ({Math.round(100 - pctPrincipal)}%)</span>
      </div>
    </div>
  )
}

export default function CalculadoraHipotecaPage() {
  const [precio, setPrecio]           = useState(250000)
  const [entrada, setEntrada]         = useState(20)
  const [plazo, setPlazo]             = useState(25)
  const [tasa, setTasa]               = useState(3.5)
  const [amortizacion, setAmortizacion] = useState(0)

  const principal = Math.round(precio * (1 - entrada / 100))
  const entradaEur = precio - principal

  const { cuota, totalPagado, totalIntereses } = useMemo(
    () => calcHipoteca(principal, tasa, plazo),
    [principal, tasa, plazo],
  )

  // Amortización anticipada
  const { cuota: cuotaAmort, totalPagado: totalAmort, totalIntereses: interesesAmort } = useMemo(() => {
    if (amortizacion === 0) return { cuota, totalPagado, totalIntereses }
    const newPrincipal = Math.max(0, principal - amortizacion)
    return calcHipoteca(newPrincipal, tasa, plazo)
  }, [principal, tasa, plazo, amortizacion, cuota, totalPagado, totalIntereses])

  const ahorro = totalIntereses - interesesAmort

  return (
    <div className="max-w-[900px] mx-auto px-7 py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-moss transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Calculadora de hipoteca</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">Herramienta gratuita</p>
        <h1 className="font-fraunces text-[38px] font-black text-ink leading-tight mb-3 max-sm:text-[28px]">
          Calculadora de hipoteca
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7] max-w-[600px]">
          Cuánto pagas al mes, cuánto pagas en total al banco y cuánto ahorras si amortizas antes. La cifra que casi nadie conoce antes de firmar.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-10 max-lg:grid-cols-1">

        {/* ── LEFT: Inputs ── */}
        <div className="space-y-7">

          {/* Precio vivienda */}
          <SliderField
            label="Precio de la vivienda"
            value={precio}
            min={50000} max={1000000} step={5000}
            format={formatEur}
            onChange={setPrecio}
          />

          {/* Entrada */}
          <div>
            <SliderField
              label={`Entrada — ${entrada}% (${formatEur(entradaEur)})`}
              value={entrada}
              min={5} max={50} step={1}
              format={v => `${v}%`}
              onChange={setEntrada}
            />
            {entrada < 20 && (
              <p className="text-[12px] text-amber-600 mt-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
                ⚠️ Con menos del 20% de entrada tendrás que contratar un seguro hipotecario adicional (PMI) que encarece el préstamo.
              </p>
            )}
          </div>

          {/* Plazo */}
          <SliderField
            label="Plazo"
            value={plazo}
            min={5} max={35} step={1}
            format={v => `${v} años`}
            onChange={setPlazo}
          />

          {/* Tipo de interés */}
          <SliderField
            label="Tipo de interés anual (TIN)"
            value={tasa}
            min={0.5} max={8} step={0.1}
            format={v => `${v.toFixed(1)}%`}
            onChange={setTasa}
          />

          {/* Separator */}
          <div className="border-t border-border pt-6">
            <h3 className="font-fraunces text-[18px] font-bold text-ink mb-1">Amortización anticipada</h3>
            <p className="text-[13px] text-ink3 mb-4">¿Tienes un extra? Ve cuánto ahorras reduciendo capital pendiente.</p>
            <SliderField
              label="Amortización extra"
              value={amortizacion}
              min={0} max={Math.min(principal, 100000)} step={1000}
              format={v => v === 0 ? 'Sin amortizar' : formatEur(v)}
              onChange={setAmortizacion}
            />
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="lg:sticky lg:top-[88px] h-fit space-y-4">

          {/* Main result */}
          <div className="bg-forest rounded-2xl p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-2">Cuota mensual</p>
            <div className="font-fraunces text-[52px] font-black leading-none mb-4">{formatEur(cuota)}</div>
            <div className="h-px bg-white/10 mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Capital prestado</span>
                <span className="font-semibold">{formatEur(principal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Total pagado al banco</span>
                <span className="font-semibold">{formatEur(totalPagado)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Total en intereses</span>
                <span className="font-semibold text-gold">{formatEur(totalIntereses)}</span>
              </div>
            </div>
            <div className="mt-4">
              <AmortizationBar principal={principal} totalIntereses={totalIntereses} />
            </div>
          </div>

          {/* Amortization saving */}
          {amortizacion > 0 && (
            <div className="bg-mist border border-sage/30 rounded-2xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-forest mb-2">Amortizando {formatEur(amortizacion)}</p>
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-ink3">Nueva cuota</span>
                  <span className="font-bold text-ink">{formatEur(cuotaAmort)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink3">Nuevo total intereses</span>
                  <span className="font-semibold text-ink">{formatEur(interesesAmort)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-sage/20">
                  <span className="font-semibold text-forest">Ahorro en intereses</span>
                  <span className="font-black text-forest text-[16px] font-fraunces">{formatEur(ahorro)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Gastos compra */}
          <div className="bg-cream border border-border rounded-xl p-4">
            <p className="text-[12px] font-semibold text-ink3 mb-2">Recuerda: gastos de compra (~10-12%)</p>
            <p className="text-[12px] text-ink3 leading-[1.6]">
              Además de la entrada necesitas liquidez para ITP/IVA, notaría, registro, gestoría y tasación.
              Para esta vivienda: <span className="font-bold text-ink">{formatEur(precio * 0.10)} – {formatEur(precio * 0.12)}</span> adicionales.
            </p>
          </div>
        </div>
      </div>

      {/* Educational content */}
      <div className="mt-16 border-t border-border pt-12 space-y-8 max-w-[720px]">
        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Lo que el banco no te enseña voluntariamente</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            La cuota mensual es solo parte de lo que pagas. El número que importa es el total de intereses — lo que le regalas al banco a cambio del préstamo. En una hipoteca de 200.000€ a 30 años al 3,5%, ese número supera los 120.000€. Casi el 60% del capital prestado. Conocer ese dato antes de firmar cambia completamente cómo negocias.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">El impacto real de amortizar anticipadamente</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Amortizar capital en los primeros años de la hipoteca tiene un efecto multiplicador: como los intereses se calculan sobre el capital pendiente, cada euro que reduces al principio te ahorra varios euros en intereses futuros. Una amortización de 10.000€ en el año 5 puede traducirse en 20.000-30.000€ menos de intereses totales.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">¿Cuánto necesito para comprar un piso?</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Los bancos financian como máximo el 80% del valor de tasación. Eso significa que necesitas al menos el 20% del precio como entrada, más un 10-12% adicional para los gastos de compra (impuestos, notaría, registro). Para una vivienda de 250.000€: necesitas tener disponibles entre 75.000€ y 80.000€ antes de firmar.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link href="/articulo/cuanto-dinero-necesito-para-comprar-piso" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors">
            Guía completa: comprar piso →
          </Link>
          <Link href="/articulo/hipoteca-fija-vs-variable-cual-elegir-2026" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Fija vs variable en 2026
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
