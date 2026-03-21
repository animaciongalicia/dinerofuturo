'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

// ── Compound Interest Calculator ──────────────────────────────────────────────
function CompoundCalculator() {
  const [initial, setInitial]   = useState(1000)
  const [monthly, setMonthly]   = useState(100)
  const [rate, setRate]         = useState(7)
  const [years, setYears]       = useState(20)

  const months = years * 12
  const r = rate / 100 / 12
  const futureInitial = initial * Math.pow(1 + r, months)
  const futureMonthly = r > 0 ? monthly * ((Math.pow(1 + r, months) - 1) / r) : monthly * months
  const total = Math.round(futureInitial + futureMonthly)
  const invested = initial + monthly * months

  return (
    <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
      <div className="flex flex-col gap-4">
        {[
          { label: 'Capital inicial (€)', value: initial, setter: setInitial, min: 0, max: 100000, step: 500 },
          { label: 'Aportación mensual (€)', value: monthly, setter: setMonthly, min: 0, max: 5000, step: 50 },
          { label: 'Rentabilidad anual (%)', value: rate, setter: setRate, min: 0.1, max: 20, step: 0.1 },
          { label: 'Años de inversión', value: years, setter: setYears, min: 1, max: 40, step: 1 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label}>
            <div className="flex justify-between text-[13px] font-semibold text-ink mb-1">
              <span>{label}</span>
              <span className="text-moss">{value}{label.includes('%') ? '%' : label.includes('años') ? ' años' : '€'}</span>
            </div>
            <input
              type="range"
              min={min} max={max} step={step}
              value={value}
              onChange={e => setter(Number(e.target.value))}
              className="w-full accent-sage"
            />
          </div>
        ))}
      </div>
      <div className="bg-forest rounded-2xl p-8 text-white flex flex-col justify-center gap-4">
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[.1em] text-sage mb-1">Capital final en {years} años</div>
          <div className="font-fraunces text-[48px] font-black leading-none">{total.toLocaleString('es-ES')}€</div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[11px] text-white/50 mb-1">Total aportado</div>
            <div className="font-fraunces text-[22px] font-bold">{invested.toLocaleString('es-ES')}€</div>
          </div>
          <div>
            <div className="text-[11px] text-white/50 mb-1">Intereses generados</div>
            <div className="font-fraunces text-[22px] font-bold text-mint">{(total - invested).toLocaleString('es-ES')}€</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Emergency Fund Calculator ─────────────────────────────────────────────────
function EmergencyFundCalculator() {
  const [expenses, setExpenses]   = useState(1500)
  const [jobType, setJobType]     = useState<'funcionario' | 'empleado' | 'autonomo'>('empleado')
  const [dependents, setDependents] = useState(0)

  const baseMonths = jobType === 'funcionario' ? 3 : jobType === 'empleado' ? 4 : 6
  const extraMonths = dependents > 0 ? 1 : 0
  const totalMonths = baseMonths + extraMonths
  const fund = expenses * totalMonths

  return (
    <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-[13px] font-semibold text-ink mb-2 block">Gastos mensuales fijos (€)</label>
          <div className="flex justify-between text-[13px] text-moss font-semibold mb-1">
            <span>€{expenses}</span>
          </div>
          <input type="range" min={500} max={5000} step={100} value={expenses}
            onChange={e => setExpenses(Number(e.target.value))}
            className="w-full accent-sage" />
        </div>
        <div>
          <label className="text-[13px] font-semibold text-ink mb-2 block">Tipo de trabajo</label>
          <div className="grid grid-cols-3 gap-2">
            {([['funcionario', '🏛️ Funcionario'], ['empleado', '👔 Empleado'], ['autonomo', '🧑‍💻 Autónomo']] as const).map(([val, label]) => (
              <button key={val} onClick={() => setJobType(val)}
                className={`py-2 px-3 rounded-lg text-[12px] font-medium border-[1.5px] transition-all ${jobType === val ? 'bg-forest text-white border-forest' : 'bg-cream border-border text-ink3 hover:border-sage'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[13px] font-semibold text-ink mb-2 block">Personas a tu cargo</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(n => (
              <button key={n} onClick={() => setDependents(n)}
                className={`w-10 h-10 rounded-lg text-[14px] font-bold border-[1.5px] transition-all ${dependents === n ? 'bg-forest text-white border-forest' : 'bg-cream border-border text-ink3 hover:border-sage'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-forest rounded-2xl p-8 text-white flex flex-col justify-center gap-4">
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[.1em] text-sage mb-1">Tu fondo de emergencia</div>
          <div className="font-fraunces text-[48px] font-black leading-none">{fund.toLocaleString('es-ES')}€</div>
        </div>
        <div className="h-px bg-white/10" />
        <div>
          <div className="text-[11px] text-white/50 mb-1">Equivale a</div>
          <div className="font-fraunces text-[22px] font-bold">{totalMonths} meses de gastos</div>
          <div className="text-[13px] text-white/60 mt-1">
            {baseMonths} base {extraMonths > 0 ? `+ ${extraMonths} por dependientes` : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Tool wrapper ──────────────────────────────────────────────────────────────
const tools = [
  {
    id: 'interes-compuesto',
    ico: '🧮',
    name: 'Interés compuesto',
    desc: 'Calcula cuánto crecerá tu dinero con aportaciones periódicas.',
    Component: CompoundCalculator,
  },
  {
    id: 'fondo-emergencia',
    ico: '🛡️',
    name: 'Fondo de emergencia',
    desc: 'Descubre cuánto necesitas según tu situación laboral y familiar.',
    Component: EmergencyFundCalculator,
  },
]

export default function HerramientasPage() {
  const [active, setActive] = useState(tools[0].id)
  const current = tools.find(t => t.id === active) ?? tools[0]
  const { Component } = current

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <div className="mb-10">
        <h1 className="font-fraunces text-[40px] font-black text-ink tracking-[-0.5px] mb-2">
          Herramientas gratuitas
        </h1>
        <p className="text-[16px] text-ink3">Calcula antes de decidir. Sin registro, sin email.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap mb-8">
        {tools.map(({ id, ico, name }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold border-[1.5px] transition-all ${active === id ? 'bg-forest text-white border-forest' : 'bg-white border-border text-ink3 hover:border-sage'}`}
          >
            {ico} {name}
          </button>
        ))}
      </div>

      {/* Calculator */}
      <div className="bg-white border border-border rounded-2xl p-8">
        <h2 className="font-fraunces text-[24px] font-bold text-ink mb-1">{current.name}</h2>
        <p className="text-[14px] text-ink3 mb-6">{current.desc}</p>
        <Component />
      </div>
    </div>
  )
}
