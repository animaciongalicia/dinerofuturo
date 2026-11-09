'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { calcularJubilacion } from '@/lib/jubilacion'

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

const FAQ = [
  {
    q: '¿Cuánto dinero necesito para jubilarme?',
    a: 'Depende de cuánto quieras ingresar cada mes, de cuánto te dé la pensión pública y de cuántos años tengas que cubrir. La calculadora resta tu pensión estimada al ingreso que quieres, calcula el hueco mensual y lo convierte en el capital que necesitas tener ahorrado el día que te jubiles. Como referencia rápida, la regla del 4% sale de multiplicar el hueco anual por 25.',
  },
  {
    q: '¿La calculadora incluye mi pensión pública?',
    a: 'No la calcula, la introduces tú. La pensión depende de tu historial de cotización y de normas que cambian, así que lo más fiable es usar la estimación del simulador oficial de la Seguridad Social y escribir ese importe mensual en la casilla correspondiente.',
  },
  {
    q: '¿Por qué los resultados están en euros de hoy?',
    a: 'Porque la inflación hace que 2.000 euros dentro de 30 años compren menos que hoy. Al trabajar en euros constantes, el importe que ves es comparable con lo que ganas y gastas ahora. Debajo del resultado también ves el capital expresado en euros del año de tu jubilación.',
  },
  {
    q: '¿Qué rentabilidad debo poner?',
    a: 'Usa supuestos prudentes: no hay rentabilidad garantizada. Una cifra moderada antes de jubilarte y otra más baja ya jubilado, porque entonces conviene asumir menos riesgo. Prueba varios escenarios y fíjate en cuánto cambia el ahorro mensual necesario.',
  },
  {
    q: '¿Y si me jubilo antes de poder cobrar la pensión pública?',
    a: 'Indica la edad desde la que empezarás a cobrarla. Entre tu jubilación y esa edad la calculadora cubre con tu ahorro el ingreso completo que quieres, sin descontar pensión, y a partir de ahí solo el hueco que quede.',
  },
  {
    q: '¿Tiene en cuenta los impuestos?',
    a: 'No. Los resultados son antes de impuestos. Las retiradas de planes de pensiones, fondos u otras inversiones tributan según cada caso, así que el importe neto que recibas puede ser menor. Consulta a un profesional antes de decidir.',
  },
]

export default function CalculadoraJubilacionPage() {
  const [edadActual, setEdadActual]         = useState(35)
  const [edadJubilacion, setEdadJubilacion] = useState(65)
  const [edadPension, setEdadPension]       = useState(66)
  const [edadFin, setEdadFin]               = useState(90)
  const [ingresoDeseado, setIngresoDeseado] = useState(2000)
  const [pensionPublica, setPensionPublica] = useState(1200)
  const [ahorroActual, setAhorroActual]     = useState(20000)
  const [rentAntes, setRentAntes]           = useState(6)
  const [rentDespues, setRentDespues]       = useState(3)
  const [inflacion, setInflacion]           = useState(2)

  const r = useMemo(() => calcularJubilacion({
    edadActual, edadJubilacion, edadPension, edadFin,
    ingresoDeseado, pensionPublica, ahorroActual, rentAntes, rentDespues, inflacion,
  }), [edadActual, edadJubilacion, edadPension, edadFin, ingresoDeseado, pensionPublica, ahorroActual, rentAntes, rentDespues, inflacion])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="max-w-wrap mx-auto px-7 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="flex items-center gap-2 text-[13px] text-ink3 mb-8">
        <Link href="/herramientas" className="hover:text-moss transition-colors">Herramientas</Link>
        <span>/</span>
        <span className="text-ink">Calculadora de jubilación</span>
      </nav>

      <div className="flex gap-10 items-start">
      <main className="flex-1 min-w-0">

      <div className="bg-forest rounded-2xl px-8 py-8 mb-8 text-white">
        <p className="text-[12px] font-bold uppercase tracking-[.15em] text-sage mb-2">Herramienta gratuita</p>
        <h1 className="font-fraunces text-[36px] font-black leading-tight mb-3 max-sm:text-[26px]">
          Calculadora de jubilación
        </h1>
        <p className="text-[16px] text-white/80 leading-[1.65] max-w-[560px]">
          Descubre cuánto capital necesitas el día que te jubiles y cuánto ahorrar cada mes desde hoy para llegar. Tú pones la pensión pública que esperas cobrar; la calculadora cubre el resto.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-10 max-lg:grid-cols-1">

        {/* ── Datos ── */}
        <div className="space-y-7">
          <SliderField label="Tu edad actual" value={edadActual} min={18} max={70} step={1} format={v => `${v} años`} onChange={setEdadActual} />
          <SliderField label="Edad a la que quieres dejar de trabajar" value={edadJubilacion} min={50} max={75} step={1} format={v => `${v} años`} onChange={setEdadJubilacion} />
          <div>
            <SliderField label="Edad desde la que cobrarás la pensión pública" value={edadPension} min={60} max={75} step={1} format={v => `${v} años`} onChange={setEdadPension} />
            <p className="text-[12px] text-ink3 mt-2">Consulta la tuya en la Seguridad Social: depende de tu historial de cotización. Si te jubilas antes, tu ahorro cubre todo hasta esa edad.</p>
          </div>
          <SliderField label="Planificar hasta los" value={edadFin} min={80} max={100} step={1} format={v => `${v} años`} onChange={setEdadFin} />

          <div>
            <SliderField label="Ingreso mensual que quieres al jubilarte" value={ingresoDeseado} min={500} max={6000} step={50} format={v => `${formatEur(v)}/mes`} onChange={setIngresoDeseado} />
            <p className="text-[12px] text-ink3 mt-2">En euros de hoy. Una referencia habitual es el 70-80% de lo que gastas ahora.</p>
          </div>
          <div>
            <SliderField label="Pensión pública mensual estimada" value={pensionPublica} min={0} max={4000} step={50} format={v => `${formatEur(v)}/mes`} onChange={setPensionPublica} />
            <p className="text-[12px] text-ink3 mt-2">Pon la estimación del simulador oficial de la Seguridad Social, en euros de hoy. El valor inicial es solo un ejemplo.</p>
          </div>

          <SliderField label="Ahorro que ya tienes para la jubilación" value={ahorroActual} min={0} max={1000000} step={5000} format={formatEur} onChange={setAhorroActual} />

          <div className="pt-2 border-t border-border">
            <p className="text-[13px] font-semibold text-ink mb-4">Supuestos (cámbialos y compara escenarios)</p>
            <div className="space-y-7">
              <SliderField label="Rentabilidad anual hasta jubilarte" value={rentAntes} min={1} max={10} step={0.5} format={v => `${v}%`} onChange={setRentAntes} />
              <SliderField label="Rentabilidad anual ya jubilado" value={rentDespues} min={0} max={6} step={0.5} format={v => `${v}%`} onChange={setRentDespues} />
              <SliderField label="Inflación media anual" value={inflacion} min={0} max={5} step={0.5} format={v => `${v}%`} onChange={setInflacion} />
            </div>
          </div>
        </div>

        {/* ── Resultados ── */}
        <div className="lg:sticky lg:top-[88px] h-fit space-y-4">
          {!r.valido ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-[14px] text-amber-800 font-semibold">
              La edad de jubilación debe ser mayor que tu edad actual, y la edad de planificación mayor que la de jubilación.
            </div>
          ) : (
            <>
              <div className="bg-forest rounded-2xl p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-sage mb-2">Capital que necesitas al jubilarte</p>
                <div className="font-fraunces text-[42px] font-black leading-none mb-1">{formatEur(r.capitalNecesario)}</div>
                <p className="text-[13px] text-white/60">en euros de hoy · ≈ {formatEur(r.capitalNominal)} en euros del año {new Date().getFullYear() + r.anosAcumulacion}</p>
              </div>

              <div className={`rounded-2xl p-5 border ${r.yaCubierto ? 'bg-mist border-sage/30' : 'bg-gold-light border-gold/30'}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-forest mb-2">Ahorro mensual necesario</p>
                {r.yaCubierto ? (
                  <p className="font-fraunces text-[26px] font-black text-forest leading-tight">Ya llegas sin aportar más 🎉</p>
                ) : (
                  <>
                    <div className="font-fraunces text-[36px] font-black text-forest leading-none">{formatEur(r.ahorroMensual)}<span className="text-[16px] font-semibold">/mes</span></div>
                    <p className="text-[13px] text-forest/70 mt-1">durante {r.anosAcumulacion} años, en euros de hoy</p>
                  </>
                )}
              </div>

              <div className="bg-white border border-border rounded-xl p-4 space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-ink3">Hueco mensual a cubrir con ahorro</span>
                  <span className="font-semibold text-ink">{formatEur(r.huecoMensual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink3">Años cobrando del capital</span>
                  <span className="font-semibold text-ink">{Math.round(r.mesesJubilacion / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink3">Tu ahorro actual valdría</span>
                  <span className="font-semibold text-moss">{formatEur(r.ahorroProyectado)}</span>
                </div>
              </div>
            </>
          )}

          <p className="text-[11px] text-ink3 px-1">
            Calculadora orientativa en euros constantes y antes de impuestos. Las rentabilidades no están garantizadas. No es asesoramiento financiero.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="mt-12 border-t border-border pt-10 space-y-8">
        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Cómo funciona esta calculadora de jubilación</h2>
          <p className="text-[15px] text-ink2 leading-[1.75] mb-3">
            Calcula en dos pasos. Primero, cuánto capital necesitas el día que dejes de trabajar: es lo que hace falta para pagar, mes a mes, la diferencia entre el ingreso que quieres y tu pensión pública, durante todos los años que planifiques. Segundo, cuánto tienes que ahorrar al mes desde hoy para que ese capital esté ahí, contando con lo que ya has ahorrado y con la rentabilidad que supongas.
          </p>
          <p className="text-[15px] text-ink2 leading-[1.75]">
            Todo se calcula en euros de hoy. Así el resultado es comparable con tu sueldo actual y no te despistas con la inflación.
          </p>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Qué poner en cada casilla</h2>
          <ul className="space-y-2 text-[15px] text-ink2">
            <li className="flex gap-3"><span className="font-bold text-forest">•</span><span><strong className="text-ink">Ingreso que quieres:</strong> lo que necesitarás gastar al mes ya jubilado. Suele ser menos que ahora si no tendrás hipoteca ni gastos de trabajo.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest">•</span><span><strong className="text-ink">Pensión pública:</strong> la estimación del simulador oficial, no una cifra de memoria. Es el dato que más cambia el resultado.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest">•</span><span><strong className="text-ink">Rentabilidades:</strong> sé prudente. Ya jubilado conviene asumir menos riesgo, por eso la segunda casilla es más baja.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest">•</span><span><strong className="text-ink">Planificar hasta:</strong> mejor pasarse que quedarse corto. Quedarte sin dinero a los 85 es peor que sobrarte a los 95.</span></li>
          </ul>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-3">Los tres botones que más mueven el resultado</h2>
          <ol className="space-y-2 text-[15px] text-ink2">
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">1.</span><span><strong className="text-ink">Empezar antes.</strong> Cada año que retrasas el ahorro encarece mucho la cuota mensual. Prueba a cambiar tu edad actual y compruébalo.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">2.</span><span><strong className="text-ink">Retrasar la jubilación.</strong> Menos años que cubrir y más años para ahorrar: el efecto es doble.</span></li>
            <li className="flex gap-3"><span className="font-bold text-forest min-w-[20px]">3.</span><span><strong className="text-ink">Ajustar el ingreso deseado.</strong> Cada 100 euros menos al mes reducen el capital necesario de forma notable.</span></li>
          </ol>
        </div>

        <div>
          <h2 className="font-fraunces text-[24px] font-bold text-ink mb-4">Preguntas frecuentes</h2>
          <div className="space-y-5">
            {FAQ.map(f => (
              <div key={f.q}>
                <h3 className="text-[16px] font-bold text-ink mb-1">{f.q}</h3>
                <p className="text-[15px] text-ink2 leading-[1.7]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link href="/articulo/cuanto-dinero-necesito-para-jubilarme" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors">
            Cuánto dinero necesito para jubilarme →
          </Link>
          <Link href="/articulo/plan-de-pensiones-merece-la-pena-2026" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            ¿Merece la pena un plan de pensiones?
          </Link>
          <Link href="/herramientas/numero-fire" className="inline-flex items-center gap-2 bg-cream border border-border text-ink px-5 py-3 rounded-xl text-[14px] font-medium hover:border-sage transition-colors">
            Calculadora número FIRE
          </Link>
        </div>
      </div>

      </main>
      <Sidebar />
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
