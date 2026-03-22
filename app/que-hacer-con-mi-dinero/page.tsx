'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type DeudaPath   = 'deudas_caras' | 'deudas_normales' | 'sin_deudas'
type FondoPath   = 'sin_fondo'    | 'fondo_parcial'   | 'fondo_ok'
type PensionPath = 'sin_pension'  | 'pension_empresa'  | 'pension_ok'
type DineroPath  = 'poco'         | 'medio'            | 'mucho'

interface Answers {
  deuda:   DeudaPath   | null
  fondo:   FondoPath   | null
  pension: PensionPath | null
  dinero:  DineroPath  | null
}

interface ResultStep {
  icon:  string
  title: string
  desc:  string
  link?: { href: string; label: string }
}

// ─── Decision logic ───────────────────────────────────────────────────────────

function buildResult(answers: Answers): { headline: string; steps: ResultStep[] } {
  const steps: ResultStep[] = []

  // Priority 1 — expensive debt
  if (answers.deuda === 'deudas_caras') {
    steps.push({
      icon: '🔥',
      title: 'Elimina las deudas caras primero',
      desc: 'Una tarjeta al 20% TAE es la mejor "inversión" que puedes hacer: cada euro que pagas te da un 20% garantizado.',
      link: { href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Cómo salir de las deudas →' },
    })
  }

  // Priority — emergency fund
  if (answers.fondo === 'sin_fondo') {
    steps.push({
      icon: '🛡️',
      title: 'Crea tu fondo de emergencia',
      desc: 'Sin colchón de 3–6 meses de gastos, cualquier imprevisto te obliga a endeudarte o vender inversiones en el peor momento.',
      link: { href: '/herramientas/fondo-emergencia', label: 'Calcular mi fondo →' },
    })
  } else if (answers.fondo === 'fondo_parcial') {
    steps.push({
      icon: '🛡️',
      title: 'Completa tu fondo de emergencia',
      desc: 'Tienes base, pero necesitas llegar a los 3–6 meses. Ponlo en una cuenta remunerada y apórtale antes de invertir.',
      link: { href: '/herramientas/fondo-emergencia', label: 'Ver cuánto me falta →' },
    })
  }

  // Priority — mortgage / normal debt (only if no expensive debt)
  if (answers.deuda === 'deudas_normales' && answers.fondo === 'fondo_ok') {
    steps.push({
      icon: '🏠',
      title: 'Decide si amortizar hipoteca o invertir',
      desc: 'Con el fondo cubierto, puedes comparar el tipo de tu hipoteca con la rentabilidad esperada del mercado para decidir dónde va el excedente.',
      link: { href: '/herramientas/calculadora-hipoteca', label: 'Calculadora de hipoteca →' },
    })
  }

  // Priority — pension
  if (answers.fondo === 'fondo_ok' && answers.pension === 'sin_pension') {
    steps.push({
      icon: '🌱',
      title: 'Empieza a pensar en la jubilación',
      desc: 'Cuanto antes empieces, menos tienes que aportar. El interés compuesto hace el trabajo pesado si le das tiempo suficiente.',
      link: { href: '/articulo/plan-de-pensiones-merece-la-pena-2026', label: '¿Vale la pena un plan de pensiones? →' },
    })
  }

  // Priority — invest the rest
  const hasGoodFund = answers.fondo === 'fondo_ok' || answers.fondo === 'fondo_parcial'
  const noExpensiveDebt = answers.deuda !== 'deudas_caras'

  if (hasGoodFund && noExpensiveDebt) {
    if (answers.dinero === 'poco') {
      steps.push({
        icon: '📈',
        title: 'Empieza a invertir aunque sea poco',
        desc: 'Con menos de 1.000€ lo mejor son ETFs de acumulación en un bróker sin comisiones. El hábito importa más que la cantidad.',
        link: { href: '/articulo/como-empezar-a-invertir-desde-cero', label: 'Cómo empezar a invertir →' },
      })
    } else if (answers.dinero === 'medio') {
      steps.push({
        icon: '📈',
        title: 'Invierte con una estrategia clara',
        desc: 'Con 1.000–10.000€ ya vale la pena un portafolio sencillo: ETF global + renta fija según tu horizonte temporal.',
        link: { href: '/articulo/que-es-un-etf-y-como-funciona', label: 'Qué es un ETF y cómo funciona →' },
      })
    } else {
      steps.push({
        icon: '📈',
        title: 'Diversifica e invierte con criterio',
        desc: 'Con más de 10.000€ conviene repartir en varios vehículos: ETFs indexados, renta fija y quizás inmueble. Habla con un asesor independiente.',
        link: { href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera modelo para principiantes →' },
      })
    }
  }

  // Fallback: if still no steps (edge case: fondo ok, deudas normales, pension ok, poco dinero)
  if (steps.length === 0) {
    steps.push({
      icon: '✅',
      title: 'Tu base financiera está en orden',
      desc: 'Tienes el fondo cubierto y la deuda controlada. El siguiente paso es optimizar: revisa tu cartera y evalúa si puedes aportar más.',
      link: { href: '/articulo/como-empezar-a-invertir-desde-cero', label: 'Cómo optimizar tu inversión →' },
    })
  }

  // Headline
  const count = steps.length
  const headline =
    count === 1 ? 'Tu siguiente paso' :
    count === 2 ? 'Tu plan en 2 pasos' :
    count === 3 ? 'Tu plan en 3 pasos' :
                  'Tu plan en 4 pasos'

  return { headline, steps }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[12px] font-semibold text-ink3 uppercase tracking-[.1em]">
          Paso {step} de {total}
        </span>
        <span className="text-[12px] text-ink3">{pct}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

interface OptionCardProps {
  label: string
  sublabel?: string
  onClick: () => void
}

function OptionCard({ label, sublabel, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 bg-white border-[1.5px] border-border rounded-2xl shadow-card
                 hover:border-forest hover:shadow-card-lg hover:-translate-y-[1px]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest
                 transition-all duration-150 group"
    >
      <span className="text-[15px] font-semibold text-ink leading-snug block group-hover:text-forest transition-colors">
        {label}
      </span>
      {sublabel && (
        <span className="text-[13px] text-ink3 mt-1 block leading-snug">{sublabel}</span>
      )}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QueHacerConMiDineroPage() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    deuda: null, fondo: null, pension: null, dinero: null,
  })

  const TOTAL_STEPS = 5

  function goBack() {
    setStep(s => Math.max(0, s - 1))
  }

  function resetAll() {
    setAnswers({ deuda: null, fondo: null, pension: null, dinero: null })
    setStep(0)
  }

  // ── Step 0 — Intro ──────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-4">
              Árbol de decisión gratuito
            </p>
            <h1 className="font-fraunces text-[42px] font-black text-ink leading-tight mb-4 max-sm:text-[30px]">
              ¿Qué hago con mi dinero?
            </h1>
            <p className="text-[17px] text-ink2 leading-[1.7] mb-10 max-w-[480px] mx-auto">
              Responde 5 preguntas y te digo exactamente por dónde empezar.
            </p>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 bg-forest text-white px-8 py-4 rounded-2xl
                         text-[16px] font-semibold hover:bg-moss transition-colors shadow-card-lg"
            >
              Empezar →
            </button>
          </div>

          {/* Preview cards */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            {[
              { icon: '🔥', label: 'Deudas', desc: '¿Cuál es tu situación actual?' },
              { icon: '🛡️', label: 'Seguridad',  desc: '¿Tienes un colchón de emergencia?' },
              { icon: '📈', label: 'Inversión',  desc: '¿Qué hacer con el dinero libre?' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="bg-white border border-border rounded-2xl p-5 text-center shadow-card">
                <div className="text-[28px] mb-2">{icon}</div>
                <div className="text-[14px] font-bold text-ink mb-1">{label}</div>
                <div className="text-[12px] text-ink3 leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Step 1 — Deudas ─────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <ProgressBar step={1} total={TOTAL_STEPS} />
          <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
            ¿Tienes deudas ahora mismo?
          </h2>
          <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
            Incluye tarjetas de crédito, préstamos personales, hipoteca, coche…
          </p>
          <div className="flex flex-col gap-3">
            <OptionCard
              label="Sí, tengo deudas caras"
              sublabel="Tarjeta de crédito, préstamo personal, financiación al consumo…"
              onClick={() => { setAnswers(a => ({ ...a, deuda: 'deudas_caras' })); setStep(2) }}
            />
            <OptionCard
              label="Sí, solo hipoteca o préstamo de coche"
              sublabel="Deuda con tipo de interés razonable y cuota fija"
              onClick={() => { setAnswers(a => ({ ...a, deuda: 'deudas_normales' })); setStep(2) }}
            />
            <OptionCard
              label="No tengo deudas"
              sublabel="Estoy libre de cualquier préstamo o crédito"
              onClick={() => { setAnswers(a => ({ ...a, deuda: 'sin_deudas' })); setStep(2) }}
            />
          </div>
        </div>
      </div>
    )
  }

  // ── Step 2 — Fondo de emergencia ────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <ProgressBar step={2} total={TOTAL_STEPS} />
          <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
            ¿Tienes fondo de emergencia?
          </h2>
          <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
            Dinero guardado aparte, accesible en horas, para imprevistos reales.
          </p>
          <div className="flex flex-col gap-3">
            <OptionCard
              label="No tengo o tengo menos de 1 mes de gastos"
              sublabel="Prácticamente sin colchón de seguridad"
              onClick={() => { setAnswers(a => ({ ...a, fondo: 'sin_fondo' })); setStep(3) }}
            />
            <OptionCard
              label="Tengo algo pero no llega a 3 meses"
              sublabel="Empezando a construirlo, pero todavía incompleto"
              onClick={() => { setAnswers(a => ({ ...a, fondo: 'fondo_parcial' })); setStep(3) }}
            />
            <OptionCard
              label="Sí, tengo al menos 3–6 meses cubiertos"
              sublabel="Mi colchón está en orden"
              onClick={() => { setAnswers(a => ({ ...a, fondo: 'fondo_ok' })); setStep(3) }}
            />
          </div>
          <button
            onClick={goBack}
            className="mt-6 text-[13px] text-ink3 hover:text-ink transition-colors flex items-center gap-1"
          >
            ← Atrás
          </button>
        </div>
      </div>
    )
  }

  // ── Step 3 — Pensión ────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <ProgressBar step={3} total={TOTAL_STEPS} />
          <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
            ¿Estás aportando algo para la jubilación?
          </h2>
          <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
            Plan de pensiones, fondo indexado a largo plazo, plan de empresa…
          </p>
          <div className="flex flex-col gap-3">
            <OptionCard
              label="No pienso en eso todavía"
              sublabel="No tengo ningún vehículo orientado a la jubilación"
              onClick={() => { setAnswers(a => ({ ...a, pension: 'sin_pension' })); setStep(4) }}
            />
            <OptionCard
              label="Tengo un plan de pensiones de empresa"
              sublabel="Mi empresa aporta al plan o tengo uno vinculado al trabajo"
              onClick={() => { setAnswers(a => ({ ...a, pension: 'pension_empresa' })); setStep(4) }}
            />
            <OptionCard
              label="Ya lo tengo cubierto / no me preocupa ahora"
              sublabel="Tengo una estrategia activa para la jubilación"
              onClick={() => { setAnswers(a => ({ ...a, pension: 'pension_ok' })); setStep(4) }}
            />
          </div>
          <button
            onClick={goBack}
            className="mt-6 text-[13px] text-ink3 hover:text-ink transition-colors flex items-center gap-1"
          >
            ← Atrás
          </button>
        </div>
      </div>
    )
  }

  // ── Step 4 — Dinero disponible ──────────────────────────────────────────────
  if (step === 4) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <ProgressBar step={4} total={TOTAL_STEPS} />
          <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
            ¿Cuánto dinero libre tienes ahora mismo?
          </h2>
          <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
            Dinero que no necesitas para gastos fijos ni para el fondo de emergencia.
          </p>
          <div className="flex flex-col gap-3">
            <OptionCard
              label="Menos de 1.000€"
              sublabel="Poco margen por ahora, pero algo es algo"
              onClick={() => { setAnswers(a => ({ ...a, dinero: 'poco' })); setStep(5) }}
            />
            <OptionCard
              label="Entre 1.000€ y 10.000€"
              sublabel="Una cantidad con la que ya se puede hacer algo interesante"
              onClick={() => { setAnswers(a => ({ ...a, dinero: 'medio' })); setStep(5) }}
            />
            <OptionCard
              label="Más de 10.000€"
              sublabel="Tengo un capital relevante esperando destino"
              onClick={() => { setAnswers(a => ({ ...a, dinero: 'mucho' })); setStep(5) }}
            />
          </div>
          <button
            onClick={goBack}
            className="mt-6 text-[13px] text-ink3 hover:text-ink transition-colors flex items-center gap-1"
          >
            ← Atrás
          </button>
        </div>
      </div>
    )
  }

  // ── Step 5 — Resultado ──────────────────────────────────────────────────────
  const { headline, steps: resultSteps } = buildResult(answers)

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[680px] mx-auto px-6 py-16">
        <ProgressBar step={5} total={TOTAL_STEPS} />

        {/* Result header */}
        <div className="mb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
            Tu recomendación personalizada
          </p>
          <h2 className="font-fraunces text-[36px] font-black text-ink leading-tight max-sm:text-[26px]">
            {headline}
          </h2>
        </div>

        {/* Steps */}
        <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden mb-6">
          {resultSteps.map((s, i) => (
            <div
              key={i}
              className={`p-6 ${i < resultSteps.length - 1 ? 'border-b border-border2' : ''}`}
            >
              <div className="flex gap-4">
                {/* Number circle */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center text-[14px] font-black font-fraunces mt-[1px]">
                  {i + 1}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[18px]">{s.icon}</span>
                    <h3 className="text-[15px] font-bold text-ink leading-snug">{s.title}</h3>
                  </div>
                  <p className="text-[13.5px] text-ink2 leading-[1.6] mb-3">{s.desc}</p>
                  {s.link && (
                    <Link
                      href={s.link.href}
                      className="inline-flex items-center text-[13px] font-semibold text-moss hover:text-forest transition-colors"
                    >
                      {s.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary of answers */}
        <div className="bg-white border border-border rounded-2xl p-5 mb-8 shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-ink3 mb-3">
            Tu perfil
          </p>
          <div className="flex flex-wrap gap-2">
            {answers.deuda && (
              <span className="text-[12px] px-3 py-1 bg-cream border border-border rounded-full text-ink2">
                {answers.deuda === 'deudas_caras'    ? '🔥 Deudas caras'       :
                 answers.deuda === 'deudas_normales' ? '🏠 Solo hipoteca/coche' :
                                                       '✅ Sin deudas'}
              </span>
            )}
            {answers.fondo && (
              <span className="text-[12px] px-3 py-1 bg-cream border border-border rounded-full text-ink2">
                {answers.fondo === 'sin_fondo'    ? '🛡️ Sin fondo aún'         :
                 answers.fondo === 'fondo_parcial' ? '🛡️ Fondo parcial'         :
                                                     '🛡️ Fondo completo'}
              </span>
            )}
            {answers.pension && (
              <span className="text-[12px] px-3 py-1 bg-cream border border-border rounded-full text-ink2">
                {answers.pension === 'sin_pension'     ? '🌱 Sin plan jubilación'  :
                 answers.pension === 'pension_empresa'  ? '🌱 Plan de empresa'      :
                                                          '🌱 Jubilación cubierta'}
              </span>
            )}
            {answers.dinero && (
              <span className="text-[12px] px-3 py-1 bg-cream border border-border rounded-full text-ink2">
                {answers.dinero === 'poco'  ? '💰 Menos de 1.000€'  :
                 answers.dinero === 'medio' ? '💰 1.000–10.000€'    :
                                             '💰 Más de 10.000€'}
              </span>
            )}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-xl
                       text-[14px] font-semibold hover:bg-moss transition-colors"
          >
            ↺ Volver a empezar
          </button>
          <button
            className="inline-flex items-center gap-2 bg-white border border-border text-ink px-6 py-3 rounded-xl
                       text-[14px] font-medium hover:border-sage transition-colors"
          >
            Ver artículos relacionados
          </button>
        </div>

        {/* Back button */}
        <button
          onClick={goBack}
          className="mt-6 text-[13px] text-ink3 hover:text-ink transition-colors flex items-center gap-1"
        >
          ← Cambiar última respuesta
        </button>

        {/* Disclaimer */}
        <p className="mt-10 text-[12px] text-ink3 leading-[1.6]">
          Este árbol de decisión es orientativo y no constituye asesoramiento financiero personalizado.
          Consulta con un asesor independiente antes de tomar decisiones importantes.
        </p>
      </div>
    </div>
  )
}
