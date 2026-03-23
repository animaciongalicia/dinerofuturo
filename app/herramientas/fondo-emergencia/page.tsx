'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

type JobType = 'funcionario' | 'empleado' | 'autonomo'

const JOB_TYPES: { value: JobType; label: string; months: number; desc: string }[] = [
  { value: 'funcionario', label: '🏛️ Funcionario / empleo muy estable', months: 3, desc: 'Protección legal alta. Despido difícil e indemnización garantizada.' },
  { value: 'empleado', label: '👔 Empleado empresa privada', months: 5, desc: 'Riesgo de despido real. Tiempo de búsqueda de empleo incluido.' },
  { value: 'autonomo', label: '🧑‍💻 Autónomo / freelance', months: 7, desc: 'Sin prestación por desempleo. Ingresos pueden caer de golpe.' },
]

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export default function FondoEmergenciaPage() {
  const [rent, setRent]           = useState(900)
  const [food, setFood]           = useState(400)
  const [utilities, setUtilities] = useState(150)
  const [transport, setTransport] = useState(150)
  const [other, setOther]         = useState(200)
  const [jobType, setJobType]     = useState<JobType>('empleado')
  const [dependents, setDependents] = useState(0)

  const totalExpenses = rent + food + utilities + transport + other
  const baseMonths    = JOB_TYPES.find(j => j.value === jobType)!.months
  const extraMonths   = dependents > 0 ? 1 : 0
  const totalMonths   = baseMonths + extraMonths
  const fund          = totalExpenses * totalMonths
  const currentJob    = JOB_TYPES.find(j => j.value === jobType)!

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-moss transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Fondo de emergencia</span>
      </nav>

      <div className="flex gap-10 items-start">
      <main className="flex-1 min-w-0">

      {/* Hero visual */}
      <div className="bg-[#1B4332] rounded-2xl px-8 py-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <p className="text-[12px] font-bold uppercase tracking-[.15em] text-emerald-300 mb-2">Herramienta gratuita</p>
        <h1 className="font-fraunces text-[36px] font-black leading-tight mb-3 max-sm:text-[26px]">
          Calculadora de fondo de emergencia
        </h1>
        <p className="text-[16px] text-emerald-100 leading-[1.65] max-w-[520px]">
          El consejo de &ldquo;guarda 3 meses de salario&rdquo; es demasiado genérico. Tu colchón depende de tu tipo de empleo, tus gastos reales y de si tienes personas a cargo.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-10 max-lg:grid-cols-1">

        {/* ── LEFT: Inputs ── */}
        <div className="space-y-8">

          {/* Gastos fijos */}
          <div>
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-1">Tus gastos fijos mensuales</h2>
            <p className="text-[13px] text-ink3 mb-5">Solo lo que no puedes dejar de pagar en una emergencia real.</p>
            <div className="space-y-4">
              {[
                { label: 'Alquiler o hipoteca', value: rent, setter: setRent, min: 0, max: 3000, step: 50, placeholder: '900' },
                { label: 'Alimentación básica', value: food, setter: setFood, min: 0, max: 1500, step: 50, placeholder: '400' },
                { label: 'Suministros (luz, agua, internet, gas)', value: utilities, setter: setUtilities, min: 0, max: 600, step: 10, placeholder: '150' },
                { label: 'Transporte imprescindible', value: transport, setter: setTransport, min: 0, max: 500, step: 10, placeholder: '150' },
                { label: 'Seguros y otros fijos', value: other, setter: setOther, min: 0, max: 800, step: 10, placeholder: '200' },
              ].map(({ label, value, setter, min, max, step, placeholder }) => (
                <div key={label} className="flex items-center gap-3">
                  <label className="text-[13px] text-ink2 min-w-0 flex-1">{label}</label>
                  <div className="relative flex-shrink-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-ink3">€</span>
                    <input
                      type="number"
                      min={min} max={max} step={step}
                      value={value}
                      placeholder={placeholder}
                      onChange={e => setter(Math.max(0, Number(e.target.value)))}
                      className="w-[110px] pl-7 pr-3 py-2 border border-border rounded-lg text-[14px] font-semibold text-ink text-right focus:outline-none focus:border-sage transition-colors bg-white"
                    />
                  </div>
                </div>
              ))}

              {/* Total expenses row */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-[14px] font-bold text-ink">Total gastos fijos/mes</span>
                <span className="text-[18px] font-black text-forest font-fraunces">{formatEur(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Tipo de empleo */}
          <div>
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-1">Tu tipo de empleo</h2>
            <p className="text-[13px] text-ink3 mb-4">Determina cuántos meses de colchón necesitas.</p>
            <div className="flex flex-col gap-3">
              {JOB_TYPES.map(({ value, label, months, desc }) => (
                <button
                  key={value}
                  onClick={() => setJobType(value)}
                  className={`text-left p-4 rounded-xl border-[1.5px] transition-all ${
                    jobType === value
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white border-border text-ink hover:border-sage'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13.5px] font-semibold">{label}</span>
                    <span className={`text-[11px] font-bold px-2 py-[2px] rounded-full ${jobType === value ? 'bg-white/20 text-white' : 'bg-mist text-forest'}`}>
                      {months} meses base
                    </span>
                  </div>
                  <span className={`text-[12px] ${jobType === value ? 'text-white/70' : 'text-ink3'}`}>{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dependientes */}
          <div>
            <h2 className="font-fraunces text-[20px] font-bold text-ink mb-1">Personas a tu cargo</h2>
            <p className="text-[13px] text-ink3 mb-4">Si tienes hijos, pareja sin ingresos u otras personas dependientes, añade 1 mes extra.</p>
            <div className="flex gap-3">
              {[0, 1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => setDependents(n)}
                  className={`w-12 h-12 rounded-xl text-[15px] font-bold border-[1.5px] transition-all ${
                    dependents === n
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white border-border text-ink3 hover:border-sage'
                  }`}
                >
                  {n === 0 ? 'Ninguna' : n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Result ── */}
        <div className="lg:sticky lg:top-[88px] h-fit">
          <div className="bg-forest rounded-2xl p-7 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-2">Tu fondo de emergencia</p>
            <div className="font-fraunces text-[52px] font-black leading-none mb-1">{formatEur(fund)}</div>
            <p className="text-[13px] text-white/60 mb-6">
              {baseMonths} meses base{extraMonths > 0 ? ` + ${extraMonths} por dependientes` : ''}
            </p>

            <div className="h-px bg-white/10 mb-6" />

            {/* Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Gastos fijos/mes</span>
                <span className="font-semibold">{formatEur(totalExpenses)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Meses de cobertura</span>
                <span className="font-semibold">{totalMonths}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/60">Perfil</span>
                <span className="font-semibold">{currentJob.label.split(' ').slice(1, 3).join(' ')}</span>
              </div>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <p className="text-[12px] text-white/50 leading-[1.6]">
              Guárdalo en una cuenta remunerada separada de tu cuenta corriente. Tiene que ser accesible en horas, no en semanas.
            </p>
          </div>

          {/* Progress hint */}
          <div className="mt-4 p-4 bg-cream border border-border rounded-xl">
            <p className="text-[12.5px] text-ink2 leading-[1.6]">
              <span className="font-semibold text-ink">¿No lo tienes todavía?</span>{' '}
              Este es tu primer objetivo antes de cualquier inversión. Empieza con el 10% de tu sueldo mensual hasta alcanzarlo.
            </p>
          </div>
        </div>
      </div>

      {/* Educational content */}
      <div className="mt-12 border-t border-border pt-10 space-y-6">
        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Por qué "3 meses de salario" es un mal consejo</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            El consejo genérico de guardar 3 meses ignora completamente tu situación. Un autónomo sin prestación por desempleo que pierde sus clientes principales necesita mucho más margen que un funcionario con empleo blindado. Y los gastos relevantes son los fijos imprescindibles, no el salario completo — en una emergencia real, los caprichos desaparecen solos.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Dónde guardar el fondo de emergencia</h2>
          <p className="text-[15px] text-ink2 leading-[1.75] mb-3">
            Dos requisitos no negociables: liquidez inmediata (poder sacarlo en horas) y sin riesgo de pérdida. Eso excluye la bolsa, los ETFs y las criptomonedas.
          </p>
          <ul className="space-y-2 text-[15px] text-ink2">
            <li className="flex gap-2"><span className="text-sage font-bold">✓</span> Cuenta de ahorro remunerada separada (Trade Republic, EVO, Openbank)</li>
            <li className="flex gap-2"><span className="text-sage font-bold">✓</span> Letras del Tesoro a 3-6 meses (algo de planificación pero sin riesgo)</li>
            <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> Cuenta corriente mezclada con gastos del día a día</li>
            <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> Depósitos a plazo con penalización por cancelación anticipada</li>
          </ul>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">El orden correcto</h2>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Primero el fondo de emergencia, luego las deudas caras, luego la inversión. Sin colchón, cualquier imprevisto te obliga a vender inversiones en el peor momento posible. El fondo no es un lujo — es el requisito previo para que todo lo demás funcione.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link href="/articulo/fondo-de-emergencia-cuanto-necesitas" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors">
            Leer el artículo completo →
          </Link>
          <Link href="/articulo/diferencia-entre-ahorrar-e-invertir" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Ahorrar vs invertir
          </Link>
          <Link href="/articulo/como-empezar-a-invertir-desde-cero" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Cómo empezar a invertir
          </Link>
        </div>
      </div>

      </main>
      <Sidebar />
      </div>
    </div>
  )
}
