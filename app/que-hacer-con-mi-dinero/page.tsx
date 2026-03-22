'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type DeudaValue   = 'deudas_caras' | 'deudas_normales' | 'sin_deudas'
type FondoValue   = 'sin_fondo' | 'fondo_parcial' | 'fondo_ok'
type EdadValue    = 'joven' | 'adulto' | 'maduro' | 'senior'
type ObjetivoValue = 'estabilizar' | 'comprar_piso' | 'patrimonio' | 'fire'
type RiesgoValue  = 'conservador' | 'moderado' | 'agresivo'
type IngresosValue = 'fijo' | 'variable' | 'multiple'
type CapitalValue = 'poco' | 'medio' | 'bastante' | 'mucho'

interface Answers {
  deuda:    DeudaValue    | null
  fondo:    FondoValue    | null
  edad:     EdadValue     | null
  objetivo: ObjetivoValue | null
  riesgo:   RiesgoValue   | null
  ingresos: IngresosValue | null
  capital:  CapitalValue  | null
}

interface FilledAnswers {
  deuda:    DeudaValue
  fondo:    FondoValue
  edad:     EdadValue
  objetivo: ObjetivoValue
  riesgo:   RiesgoValue
  ingresos: IngresosValue
  capital:  CapitalValue
}

interface Priority {
  id: string
  icon: string
  title: string
  color: string
  bgColor: string
  queHacer: string
  porQue: string
  comoEmpezar: string[]
  tiempo: string
  link: { href: string; label: string }
}

interface Portfolio {
  title: string
  items: { name: string; pct: number; color: string }[]
  note: string
}

interface RecommendedArticle {
  href: string
  label: string
  desc: string
}

interface Plan {
  profileName: string
  profileEmoji: string
  profileDesc: string
  priorities: Priority[]
  portfolio: Portfolio
  nextWeek: string[]
  nextMonth: string[]
  nextQuarter: string[]
  articles: RecommendedArticle[]
}

// ─── Profile calculator ────────────────────────────────────────────────────────

function getProfile(a: FilledAnswers): { name: string; emoji: string; desc: string } {
  if (a.deuda === 'deudas_caras' || a.fondo === 'sin_fondo') {
    return {
      name: 'Constructor de base',
      emoji: '🏗️',
      desc: 'Tu prioridad número uno es sanear la base: eliminar deudas caras y construir un colchón de seguridad. Antes de pensar en invertir, estos pasos son imprescindibles para no tener que deshacer todo lo construido ante el primer imprevisto.',
    }
  }
  if (a.objetivo === 'fire' && (a.edad === 'joven' || a.edad === 'adulto') && a.fondo === 'fondo_ok') {
    return {
      name: 'Candidato FIRE',
      emoji: '🔥',
      desc: 'Aspiras a la independencia financiera y tienes el perfil para lograrlo: empiezas con tiempo, tienes la base cubierta y tu objetivo es claro. El camino FIRE requiere disciplina y una tasa de ahorro ambiciosa, pero es perfectamente alcanzable.',
    }
  }
  if (a.fondo === 'fondo_ok' && (a.capital === 'bastante' || a.capital === 'mucho') && (a.objetivo === 'patrimonio' || a.objetivo === 'fire')) {
    return {
      name: 'Acumulador avanzado',
      emoji: '📊',
      desc: 'Tienes una base sólida, un capital relevante y un objetivo claro de construcción de patrimonio. Estás en la fase de optimizar: encontrar la cartera correcta, maximizar eficiencia fiscal y ser consistente con las aportaciones.',
    }
  }
  if (a.fondo === 'fondo_ok' && (a.edad === 'joven' || a.edad === 'adulto') && (a.riesgo === 'moderado' || a.riesgo === 'agresivo')) {
    return {
      name: 'Inversor en formación',
      emoji: '🌱',
      desc: 'Tienes la base cubierta y el horizonte temporal de tu lado. Ahora toca construir el hábito de inversión, aprender a no dejarte llevar por el mercado y dejar que el interés compuesto haga su trabajo durante décadas.',
    }
  }
  if (a.edad === 'senior' || (a.edad === 'maduro' && a.riesgo === 'conservador')) {
    return {
      name: 'Próximo a la jubilación',
      emoji: '🏖️',
      desc: 'Estás en una fase donde preservar el capital es tan importante como hacerlo crecer. El foco debe estar en reducir la volatilidad progresivamente, maximizar las desgravaciones fiscales y preparar una estrategia de descapitalización ordenada.',
    }
  }
  if (a.fondo === 'fondo_ok' && (a.objetivo === 'estabilizar' || a.objetivo === 'comprar_piso')) {
    return {
      name: 'En transición',
      emoji: '🚀',
      desc: 'Tienes la base cubierta y un objetivo concreto en el horizonte. Estás en un momento de transición: acumular capital con propósito para el siguiente gran paso, ya sea comprar vivienda o consolidar tu posición financiera.',
    }
  }
  if (a.fondo === 'fondo_ok' && a.riesgo === 'conservador' && a.objetivo === 'patrimonio') {
    return {
      name: 'Ahorrador consistente',
      emoji: '💼',
      desc: 'Eres disciplinado con el ahorro y prefieres la seguridad a la rentabilidad máxima. Tu estrategia debe equilibrar la protección del capital con una rentabilidad suficiente para superar la inflación a largo plazo.',
    }
  }
  return {
    name: 'Constructor de base',
    emoji: '🏗️',
    desc: 'El primer paso es consolidar tu situación financiera: eliminar lo que lastra y construir la base que te permita avanzar con seguridad hacia tus objetivos.',
  }
}

// ─── Plan builder ──────────────────────────────────────────────────────────────

function buildPlan(a: FilledAnswers): Plan {
  const profile = getProfile(a)
  const priorities: Priority[] = []

  // Priority: expensive debt
  if (a.deuda === 'deudas_caras') {
    priorities.push({
      id: 'deuda_cara',
      icon: '🔥',
      title: 'Eliminar las deudas caras',
      color: 'text-red-700',
      bgColor: 'bg-red-50 border-red-200',
      queHacer:
        'Destina todo el excedente mensual a liquidar las deudas con interés superior al 5%: tarjetas de crédito, préstamos al consumo, financiaciones. Mientras estas deudas existan, cada euro invertido en bolsa tiene que batir ese 20% o 25% TAE para que tenga sentido. Y casi nunca lo hace.',
      porQue:
        'Una deuda al 20% TAE es la mejor inversión garantizada que existe. Cada euro que pagas es un 20% de rentabilidad asegurada. Ningún ETF ni fondo te da eso sin riesgo.',
      comoEmpezar: [
        'Haz una lista de todas tus deudas: importe, tipo de interés y cuota mensual',
        'Ordénalas de mayor a menor tipo de interés (método avalanche)',
        'Destina el máximo posible a la primera de la lista; paga el mínimo en el resto',
      ],
      tiempo: 'Empieza esta semana',
      link: { href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Guía completa para salir de deudas →' },
    })
  }

  // Priority: emergency fund (missing or partial)
  if (a.fondo === 'sin_fondo') {
    priorities.push({
      id: 'fondo_cero',
      icon: '🛡️',
      title: 'Crear el fondo de emergencia desde cero',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      queHacer:
        'Abre una cuenta remunerada separada de tu cuenta corriente y empieza a acumular entre 3 y 6 meses de tus gastos fijos. Este dinero no es para invertir: es el paracaídas que evita que cualquier imprevisto te obligue a endeudarte o vender inversiones en el peor momento.',
      porQue:
        'Sin fondo de emergencia, el primer problema serio (pérdida de empleo, avería del coche, gasto médico) te manda de vuelta al punto de partida. Es la diferencia entre un traspié y una catástrofe financiera.',
      comoEmpezar: [
        'Calcula tus gastos fijos mensuales (alquiler/hipoteca, comida, suministros, transporte)',
        'Abre una cuenta remunerada al 2-3% (Evo Banco, Openbank, Trade Republic)',
        'Domicilia una transferencia automática el día de cobro: empieza con lo que puedas, aunque sea 100€/mes',
      ],
      tiempo: 'Este mes',
      link: { href: '/herramientas/fondo-emergencia', label: 'Calculadora de fondo de emergencia →' },
    })
  } else if (a.fondo === 'fondo_parcial') {
    priorities.push({
      id: 'fondo_parcial',
      icon: '🛡️',
      title: 'Completar el fondo de emergencia',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      queHacer:
        'Tienes la base, pero te falta llegar a los 3-6 meses de gastos. Antes de desviar dinero hacia inversión, acaba de construir este colchón. El objetivo es que nunca tengas que tocar tus inversiones por un imprevisto.',
      porQue:
        'Con el fondo a medias sigues siendo vulnerable. Si el mercado cae justo cuando necesitas el dinero, venderás con pérdidas en el peor momento posible.',
      comoEmpezar: [
        'Calcula exactamente cuánto te falta para llegar a 3 meses de gastos',
        'Aumenta la aportación automática hasta cubrirlo en 6-12 meses',
        'Guárdalo en una cuenta remunerada, nunca en cuenta corriente ni en bolsa',
      ],
      tiempo: 'En 3-6 meses',
      link: { href: '/herramientas/fondo-emergencia', label: 'Calcular cuánto me falta →' },
    })
  }

  // Priority: buy property
  if (a.objetivo === 'comprar_piso' && a.deuda !== 'deudas_caras') {
    priorities.push({
      id: 'comprar_piso',
      icon: '🏠',
      title: 'Acumular la entrada para la vivienda',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50 border-orange-200',
      queHacer:
        'Para comprar una vivienda necesitas tener ahorrado entre el 30-32% del precio total: el 20% que no financia el banco, más un 10-12% de gastos de compraventa (impuestos, notaría, registro). Para una casa de 250.000€, esto supone unos 80.000€. Este dinero no debe estar en bolsa si el horizonte es inferior a 5 años.',
      porQue:
        'La bolsa puede caer un 40-50% justo el año en que quieres comprar. Con un horizonte corto, la seguridad del capital es más importante que la rentabilidad.',
      comoEmpezar: [
        'Define el precio máximo de la vivienda que buscas y calcula el 30% como objetivo de ahorro',
        'Abre una cuenta remunerada específica para este objetivo (no mezclar con el fondo de emergencia)',
        'Si el horizonte es mayor de 3 años, considera letras del tesoro a corto plazo para ganar algo de rentabilidad sin riesgo',
      ],
      tiempo: 'Planificación a 2-5 años',
      link: { href: '/herramientas/calculadora-hipoteca', label: 'Calculadora de hipoteca →' },
    })
  }

  // Priority: long-term investment
  if (a.fondo === 'fondo_ok' && a.deuda !== 'deudas_caras' && a.objetivo !== 'comprar_piso') {
    if (a.objetivo === 'patrimonio' || a.objetivo === 'fire') {
      priorities.push({
        id: 'invertir',
        icon: '📈',
        title: 'Invertir para el largo plazo',
        color: 'text-forest',
        bgColor: 'bg-green-50 border-green-200',
        queHacer:
          'Con la base cubierta, el siguiente paso es poner el dinero a trabajar en activos que batan la inflación a largo plazo. La estrategia más eficiente para la mayoría es un ETF indexado global de acumulación, con aportaciones automáticas mensuales independientemente del momento del mercado.',
        porQue:
          'La inflación erosiona el dinero parado. Con un horizonte de 10-20 años, la renta variable indexada ha generado históricamente entre el 7-10% anual. El tiempo en el mercado bate al timing del mercado.',
        comoEmpezar: [
          'Abre una cuenta en un bróker con ETFs baratos: MyInvestor, DeGiro o Interactive Brokers',
          'Empieza con un ETF MSCI World de acumulación (Vanguard o iShares) como posición principal',
          'Configura una aportación automática mensual, aunque sea pequeña',
        ],
        tiempo: 'Este mes',
        link: { href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera modelo para principiantes →' },
      })
    } else if (a.objetivo === 'estabilizar') {
      priorities.push({
        id: 'invertir_conservador',
        icon: '📈',
        title: 'Empezar a invertir con prudencia',
        color: 'text-forest',
        bgColor: 'bg-green-50 border-green-200',
        queHacer:
          'Una vez estabilizado, el dinero que va más allá del fondo de emergencia puede empezar a generar rentabilidad. Con un perfil más conservador, la combinación de cuentas remuneradas, letras del tesoro y un pequeño porcentaje en ETF global es un buen punto de partida.',
        porQue:
          'Tener dinero parado en cuenta corriente supone perder poder adquisitivo cada año por la inflación. Incluso una pequeña exposición a activos reales marca una diferencia a 10 años.',
        comoEmpezar: [
          'Maximiza primero la rentabilidad del dinero líquido: cuentas remuneradas al 2-3%',
          'Considera letras del tesoro a 3-12 meses para el dinero que no necesitas tocar',
          'Introduce gradualmente un ETF global con una parte del excedente (10-20% inicialmente)',
        ],
        tiempo: 'En 1-3 meses',
        link: { href: '/articulo/mejores-neobancos-espana-2026', label: 'Mejores cuentas remuneradas →' },
      })
    }
  }

  // Priority: retirement complement
  if (a.fondo === 'fondo_ok' && a.deuda !== 'deudas_caras' && (a.edad === 'maduro' || a.edad === 'senior')) {
    priorities.push({
      id: 'jubilacion',
      icon: '🌱',
      title: 'Complementar la pensión pública',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 border-purple-200',
      queHacer:
        'En los 10-15 años anteriores a la jubilación, los planes de pensiones vuelven a tener sentido fiscal si tu tipo marginal supera el 30%. La desgravación inmediata compensa las limitaciones del producto. Paralelamente, un ETF de dividendos puede generar rentas periódicas sin necesidad de vender capital.',
      porQue:
        'La pensión pública española se espera que cubra cada vez menos el nivel de vida previo a la jubilación. Cuanto antes empieces a complementarla, menos esfuerzo mensual necesitas.',
      comoEmpezar: [
        'Calcula tu tipo marginal del IRPF para ver si el plan de pensiones te da una desgravación relevante',
        'Si el marginal es >30%, maximiza la aportación anual al plan de pensiones (límite: 1.500€ individuales)',
        'Complementa con un ETF de dividendos europeo para generar rentas periódicas',
      ],
      tiempo: 'Este año',
      link: { href: '/articulo/plan-de-pensiones-merece-la-pena-2026', label: '¿Vale la pena el plan de pensiones? →' },
    })
  }

  // Priority: FIRE
  if (a.objetivo === 'fire') {
    priorities.push({
      id: 'fire',
      icon: '🔥',
      title: 'Calcular y perseguir tu número FIRE',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50 border-yellow-200',
      queHacer:
        'El camino hacia la independencia financiera tiene un número concreto: tus gastos anuales multiplicados por 25 (la regla del 4%). Si gastas 25.000€/año, necesitas un patrimonio de 625.000€. A partir de ahí, puedes retirar el 4% anual indefinidamente. El camino es aumentar la tasa de ahorro al máximo y invertirlo todo en activos de acumulación.',
      porQue:
        'Sin un número claro y una tasa de ahorro definida, el FIRE es un deseo vago. Con un objetivo concreto, cada decisión financiera tiene un contexto: ¿me acerca o me aleja del número?',
      comoEmpezar: [
        'Calcula tus gastos anuales actuales y tu número FIRE (× 25)',
        'Calcula tu tasa de ahorro actual: ahorro mensual / ingresos netos. El objetivo FIRE suele requerir >40%',
        'Maximiza desgravaciones fiscales y aporta todo el excedente a ETFs de acumulación',
      ],
      tiempo: 'Planificación a largo plazo',
      link: { href: '/herramientas/numero-fire', label: 'Calcular mi número FIRE →' },
    })
  }

  // ── Portfolio recommendation ───────────────────────────────────────────────

  let portfolio: Portfolio

  if (a.riesgo === 'conservador' && (a.capital === 'poco' || a.capital === 'medio')) {
    portfolio = {
      title: 'Cartera conservadora de partida',
      items: [
        { name: 'Cuenta remunerada / depósito', pct: 50, color: 'bg-blue-400' },
        { name: 'Letras del Tesoro (3-12m)', pct: 30, color: 'bg-blue-600' },
        { name: 'ETF renta fija europea', pct: 15, color: 'bg-green-500' },
        { name: 'ETF MSCI World (acumulación)', pct: 5, color: 'bg-forest' },
      ],
      note: 'Con este perfil y capital, la prioridad es preservar el capital y batir la inflación con riesgo mínimo. Puedes ir aumentando el porcentaje de renta variable con el tiempo.',
    }
  } else if (a.riesgo === 'conservador' && (a.capital === 'bastante' || a.capital === 'mucho')) {
    portfolio = {
      title: 'Cartera conservadora con capital',
      items: [
        { name: 'Renta fija europea (ETF)', pct: 35, color: 'bg-blue-500' },
        { name: 'Cuenta remunerada / depósito', pct: 25, color: 'bg-blue-400' },
        { name: 'ETF MSCI World (acumulación)', pct: 25, color: 'bg-forest' },
        { name: 'ETF dividendo europeo', pct: 15, color: 'bg-green-600' },
      ],
      note: 'Con capital suficiente, una cartera conservadora bien estructurada puede seguir generando retornos reales positivos. La clave es no huir de la renta variable, sino limitarla a un nivel con el que puedas dormir tranquilo.',
    }
  } else if (a.riesgo === 'moderado') {
    portfolio = {
      title: 'Cartera equilibrada (80/20)',
      items: [
        { name: 'ETF MSCI World (acumulación)', pct: 60, color: 'bg-forest' },
        { name: 'ETF Mercados Emergentes', pct: 20, color: 'bg-green-600' },
        { name: 'Renta fija corto plazo / bonos', pct: 15, color: 'bg-blue-500' },
        { name: 'Liquidez (cuenta remunerada)', pct: 5, color: 'bg-blue-300' },
      ],
      note: 'Cartera clásica de largo plazo: diversificación global con un colchón de renta fija que reduce la volatilidad. Brókers recomendados: MyInvestor, DeGiro o Interactive Brokers.',
    }
  } else if (a.riesgo === 'agresivo' && (a.edad === 'joven' || a.edad === 'adulto') && a.objetivo === 'fire') {
    portfolio = {
      title: 'Cartera FIRE agresiva',
      items: [
        { name: 'ETF MSCI World (acumulación)', pct: 70, color: 'bg-forest' },
        { name: 'ETF S&P 500 o Nasdaq', pct: 15, color: 'bg-green-600' },
        { name: 'ETF Mercados Emergentes', pct: 10, color: 'bg-yellow-500' },
        { name: 'Liquidez mínima operativa', pct: 5, color: 'bg-blue-300' },
      ],
      note: 'Con horizonte largo y objetivo FIRE, maximizar la exposición a renta variable global tiene sentido histórico. Las caídas son parte del proceso: el que vende, pierde.',
    }
  } else if (a.riesgo === 'agresivo') {
    portfolio = {
      title: 'Cartera de crecimiento agresiva',
      items: [
        { name: 'ETF MSCI World (acumulación)', pct: 60, color: 'bg-forest' },
        { name: 'ETF S&P 500', pct: 20, color: 'bg-green-600' },
        { name: 'ETF Mercados Emergentes', pct: 15, color: 'bg-yellow-500' },
        { name: 'Liquidez mínima operativa', pct: 5, color: 'bg-blue-300' },
      ],
      note: 'Cartera de máximo crecimiento para perfiles con horizonte largo y alta tolerancia a la volatilidad. Revisión anual para rebalancear, sin entrar en pánico en las correcciones.',
    }
  } else if (a.objetivo === 'comprar_piso') {
    portfolio = {
      title: 'Cartera para objetivo vivienda',
      items: [
        { name: 'Cuenta remunerada (objetivo vivienda)', pct: 50, color: 'bg-blue-400' },
        { name: 'Letras del Tesoro (3-12m)', pct: 35, color: 'bg-blue-600' },
        { name: 'ETF renta fija corto plazo', pct: 15, color: 'bg-green-500' },
      ],
      note: 'Con horizonte inferior a 5 años, la bolsa no es el lugar adecuado para este dinero. Maximiza la rentabilidad sin riesgo: letras del Tesoro + cuentas remuneradas.',
    }
  } else if (a.edad === 'senior' || (a.edad === 'maduro' && a.riesgo === 'conservador')) {
    portfolio = {
      title: 'Cartera orientada a rentas',
      items: [
        { name: 'Renta fija europea (ETF o fondos)', pct: 40, color: 'bg-blue-500' },
        { name: 'ETF dividendo europeo / global', pct: 30, color: 'bg-green-600' },
        { name: 'Liquidez / cuenta remunerada', pct: 20, color: 'bg-blue-300' },
        { name: 'ETF MSCI World (acumulación)', pct: 10, color: 'bg-forest' },
      ],
      note: 'En esta fase, la prioridad es generar rentas periódicas y preservar el capital. El porcentaje en renta variable debe ir reduciéndose gradualmente conforme se acerque la jubilación.',
    }
  } else {
    portfolio = {
      title: 'Cartera de partida equilibrada',
      items: [
        { name: 'ETF MSCI World (acumulación)', pct: 70, color: 'bg-forest' },
        { name: 'ETF Mercados Emergentes', pct: 15, color: 'bg-green-600' },
        { name: 'Renta fija / cuenta remunerada', pct: 15, color: 'bg-blue-500' },
      ],
      note: 'Un punto de partida sólido para la mayoría de perfiles. Simple, diversificado y de bajo coste. Ajusta los porcentajes según tu tolerancia real a la volatilidad.',
    }
  }

  // ── 90-day checklist ───────────────────────────────────────────────────────

  const nextWeek: string[] = []
  const nextMonth: string[] = []
  const nextQuarter: string[] = []

  if (a.deuda === 'deudas_caras') {
    nextWeek.push('Listar todas las deudas con sus tipos de interés exactos')
    nextMonth.push('Calcular cuánto puedes destinar mensualmente a la deuda más cara')
    nextQuarter.push('Revisar si has reducido el saldo de la deuda principal en al menos un 10%')
  } else if (a.fondo === 'sin_fondo') {
    nextWeek.push('Abrir una cuenta remunerada separada para el fondo de emergencia')
    nextMonth.push('Configurar transferencia automática mensual hacia el fondo de emergencia')
    nextQuarter.push('Llegar al primer mes de gastos cubierto en el fondo de emergencia')
  } else {
    nextWeek.push('Revisar tus gastos de los últimos 3 meses e identificar donde reducir')
  }

  if (a.fondo === 'fondo_parcial') {
    nextWeek.push('Calcular exactamente cuánto te falta para completar el fondo de emergencia')
    nextMonth.push('Aumentar la aportación mensual al fondo hasta completarlo en 6 meses')
  }

  if (a.objetivo === 'comprar_piso') {
    nextWeek.push('Calcular el precio objetivo de la vivienda y el ahorro necesario (30%)')
    nextMonth.push('Abrir cuenta remunerada específica para el objetivo vivienda')
    nextQuarter.push('Revisar simulación de hipoteca con tus ingresos actuales')
  }

  if (a.fondo === 'fondo_ok' && a.deuda !== 'deudas_caras' && a.objetivo !== 'comprar_piso') {
    nextWeek.push('Comparar brókers: MyInvestor, DeGiro, Interactive Brokers')
    nextMonth.push('Abrir cuenta en el bróker elegido y hacer la primera aportación')
    nextMonth.push('Configurar aportación mensual automática al ETF elegido')
    nextQuarter.push('Revisar que la asignación de activos sigue siendo la correcta')
  }

  if (a.objetivo === 'fire') {
    nextWeek.push('Calcular tu número FIRE (gastos anuales × 25)')
    nextMonth.push('Calcular tu tasa de ahorro actual e identificar cómo aumentarla')
    nextQuarter.push('Revisar si el ritmo de ahorro actual te lleva al número FIRE en el horizonte deseado')
  }

  if (a.edad === 'maduro' || a.edad === 'senior') {
    nextMonth.push('Revisar la previsión de pensión pública en la Seguridad Social')
    nextQuarter.push('Evaluar si un plan de pensiones individual tiene sentido fiscal en tu caso')
  }

  if (nextWeek.length === 0) nextWeek.push('Calcular tus ingresos y gastos mensuales reales')
  if (nextMonth.length === 0) nextMonth.push('Definir cuánto puedes ahorrar/invertir cada mes')
  if (nextQuarter.length === 0) nextQuarter.push('Hacer una revisión completa de tu situación financiera')

  // ── Recommended articles ───────────────────────────────────────────────────

  const articles: RecommendedArticle[] = []

  if (a.deuda === 'deudas_caras') {
    articles.push({ href: '/articulo/deudas-como-salir-por-donde-empezar', label: 'Cómo salir de las deudas: método avalanche y snowball', desc: 'Los dos métodos más eficaces para eliminar deudas y cuándo usar cada uno' })
  }
  articles.push({ href: '/herramientas/fondo-emergencia', label: 'Calculadora de fondo de emergencia', desc: 'Calcula exactamente cuánto necesitas según tus gastos reales' })
  if (a.objetivo === 'comprar_piso') {
    articles.push({ href: '/herramientas/calculadora-hipoteca', label: 'Calculadora de hipoteca', desc: 'Simula tu hipoteca y calcula el ahorro previo necesario' })
  }
  if (a.objetivo === 'fire') {
    articles.push({ href: '/herramientas/numero-fire', label: 'Calculadora número FIRE', desc: 'Descubre cuánto necesitas para jubilarte antes de tiempo' })
  }
  if (a.fondo === 'fondo_ok' && a.deuda !== 'deudas_caras') {
    articles.push({ href: '/articulo/cartera-inversion-principiantes-modelo', label: 'Cartera modelo para principiantes', desc: 'Una cartera sencilla, diversificada y de bajo coste explicada paso a paso' })
    articles.push({ href: '/articulo/que-es-un-etf-y-como-funciona', label: 'Qué es un ETF y cómo funciona', desc: 'La guía definitiva sobre ETFs para quien empieza desde cero' })
  }
  if (a.edad === 'maduro' || a.edad === 'senior') {
    articles.push({ href: '/articulo/plan-de-pensiones-merece-la-pena-2026', label: '¿Vale la pena un plan de pensiones en 2026?', desc: 'Análisis actualizado con los cambios fiscales recientes' })
  }
  articles.push({ href: '/articulo/mejores-neobancos-espana-2026', label: 'Mejores neobancos en España 2026', desc: 'Cuentas remuneradas, sin comisiones y con mejores condiciones actuales' })
  if (articles.length > 6) articles.splice(6)

  return {
    profileName: profile.name,
    profileEmoji: profile.emoji,
    profileDesc: profile.desc,
    priorities,
    portfolio,
    nextWeek,
    nextMonth,
    nextQuarter,
    articles,
  }
}

// ─── Answer label helpers ──────────────────────────────────────────────────────

function deudaLabel(v: DeudaValue): string {
  if (v === 'deudas_caras') return '🔥 Deudas caras'
  if (v === 'deudas_normales') return '🏠 Solo hipoteca/coche'
  return '✅ Sin deudas'
}
function fondoLabel(v: FondoValue): string {
  if (v === 'sin_fondo') return '🛡️ Sin fondo aún'
  if (v === 'fondo_parcial') return '🛡️ Fondo parcial'
  return '🛡️ Fondo completo'
}
function edadLabel(v: EdadValue): string {
  if (v === 'joven') return '🌱 18-30 años'
  if (v === 'adulto') return '📈 30-45 años'
  if (v === 'maduro') return '💼 45-55 años'
  return '🏖️ 55+ años'
}
function objetivoLabel(v: ObjetivoValue): string {
  if (v === 'estabilizar') return '⚖️ Estabilizarme'
  if (v === 'comprar_piso') return '🏠 Comprar vivienda'
  if (v === 'patrimonio') return '📊 Construir patrimonio'
  return '🔥 Independencia FIRE'
}
function riesgoLabel(v: RiesgoValue): string {
  if (v === 'conservador') return '🔵 Conservador'
  if (v === 'moderado') return '🟡 Moderado'
  return '🟢 Agresivo'
}
function ingresosLabel(v: IngresosValue): string {
  if (v === 'fijo') return '💼 Sueldo fijo'
  if (v === 'variable') return '📊 Autónomo/variable'
  return '🔀 Múltiples ingresos'
}
function capitalLabel(v: CapitalValue): string {
  if (v === 'poco') return '💰 Menos de 1.000€'
  if (v === 'medio') return '💰 1.000-10.000€'
  if (v === 'bastante') return '💰 10.000-50.000€'
  return '💰 Más de 50.000€'
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

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 text-[13px] text-ink3 hover:text-ink transition-colors flex items-center gap-1"
    >
      ← Atrás
    </button>
  )
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[680px] mx-auto px-6 py-16">
        {children}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QueHacerConMiDineroPage() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    deuda: null, fondo: null, edad: null,
    objetivo: null, riesgo: null, ingresos: null, capital: null,
  })

  const TOTAL_STEPS = 7

  function goBack() { setStep(s => Math.max(0, s - 1)) }

  function resetAll() {
    setAnswers({ deuda: null, fondo: null, edad: null, objetivo: null, riesgo: null, ingresos: null, capital: null })
    setStep(0)
  }

  function pick<K extends keyof Answers>(key: K, value: Answers[K], next: number) {
    setAnswers(a => ({ ...a, [key]: value }))
    setStep(next)
  }

  // ── Step 0 — Intro ──────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <StepWrapper>
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-4">
            Diagnóstico financiero gratuito
          </p>
          <h1 className="font-fraunces text-[42px] font-black text-ink leading-tight mb-4 max-sm:text-[30px]">
            ¿Qué hago con mi dinero?
          </h1>
          <p className="text-[17px] text-ink2 leading-[1.7] mb-3 max-w-[500px] mx-auto">
            Responde 7 preguntas y recibe un plan financiero personalizado para tu situación exacta.
          </p>
          <p className="text-[13px] text-ink3 mb-10">
            Sin registro · Sin email · Resultado inmediato
          </p>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 bg-forest text-white px-8 py-4 rounded-2xl
                       text-[16px] font-semibold hover:bg-moss transition-colors shadow-card-lg"
          >
            Empezar el diagnóstico →
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {[
            { icon: '🔍', label: 'Diagnóstico', desc: 'Analizamos tu situación real en 2 minutos' },
            { icon: '🎯', label: 'Prioridades', desc: 'Qué hacer primero según tu caso' },
            { icon: '🗺️', label: 'Plan de acción', desc: 'Pasos concretos para los próximos 90 días' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-5 text-center shadow-card">
              <div className="text-[28px] mb-2">{icon}</div>
              <div className="text-[14px] font-bold text-ink mb-1">{label}</div>
              <div className="text-[12px] text-ink3 leading-snug">{desc}</div>
            </div>
          ))}
        </div>
      </StepWrapper>
    )
  }

  // ── Step 1 — Deudas ─────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <StepWrapper>
        <ProgressBar step={1} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Tienes deudas ahora mismo?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          Incluye tarjetas de crédito, préstamos personales, hipoteca, financiaciones al consumo…
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="Sí, tengo deudas caras" sublabel="Tarjeta de crédito, préstamo personal, financiación al consumo (>5% de interés)" onClick={() => pick('deuda', 'deudas_caras', 2)} />
          <OptionCard label="Solo hipoteca o préstamo de coche" sublabel="Deuda con tipo de interés razonable y cuota fija mensual" onClick={() => pick('deuda', 'deudas_normales', 2)} />
          <OptionCard label="No tengo ninguna deuda" sublabel="Libre de cualquier préstamo o crédito activo" onClick={() => pick('deuda', 'sin_deudas', 2)} />
        </div>
      </StepWrapper>
    )
  }

  // ── Step 2 — Fondo de emergencia ────────────────────────────────────────────
  if (step === 2) {
    return (
      <StepWrapper>
        <ProgressBar step={2} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Tienes fondo de emergencia?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          Dinero guardado aparte, accesible en horas, para imprevistos: paro, avería, enfermedad.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="No tengo o menos de 1 mes de gastos" sublabel="Prácticamente sin colchón de seguridad" onClick={() => pick('fondo', 'sin_fondo', 3)} />
          <OptionCard label="Tengo 1-3 meses de gastos" sublabel="Empezando a construirlo, pero todavía incompleto" onClick={() => pick('fondo', 'fondo_parcial', 3)} />
          <OptionCard label="Tengo 3-6 meses o más" sublabel="Mi colchón de emergencia está completo" onClick={() => pick('fondo', 'fondo_ok', 3)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 3 — Edad ───────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <StepWrapper>
        <ProgressBar step={3} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿En qué etapa vital estás?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          El horizonte temporal es uno de los factores más importantes para decidir dónde invertir.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="18-30 años: empezando" sublabel="Horizonte largo, mayor capacidad de recuperación ante pérdidas" onClick={() => pick('edad', 'joven', 4)} />
          <OptionCard label="30-45 años: construyendo" sublabel="Fase de mayor acumulación y crecimiento patrimonial" onClick={() => pick('edad', 'adulto', 4)} />
          <OptionCard label="45-55 años: consolidando" sublabel="Horizonte intermedio, fase de consolidación" onClick={() => pick('edad', 'maduro', 4)} />
          <OptionCard label="55 o más: cerca de la jubilación" sublabel="Preservar el capital empieza a ser tan importante como hacerlo crecer" onClick={() => pick('edad', 'senior', 4)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 4 — Objetivo ───────────────────────────────────────────────────────
  if (step === 4) {
    return (
      <StepWrapper>
        <ProgressBar step={4} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Cuál es tu principal objetivo financiero ahora?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          Elige el que más encaje con tu situación. Define el destino de tu plan.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="Estabilizarme: salir de deudas y tener seguridad" sublabel="Consolidar la base antes de pensar en crecer" onClick={() => pick('objetivo', 'estabilizar', 5)} />
          <OptionCard label="Comprar una vivienda en los próximos años" sublabel="Acumular la entrada y preparar la hipoteca" onClick={() => pick('objetivo', 'comprar_piso', 5)} />
          <OptionCard label="Construir patrimonio a largo plazo" sublabel="Hacer crecer el capital de forma constante y diversificada" onClick={() => pick('objetivo', 'patrimonio', 5)} />
          <OptionCard label="Lograr independencia financiera (FIRE)" sublabel="Acumular suficiente para no depender de un sueldo" onClick={() => pick('objetivo', 'fire', 5)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 5 — Tolerancia al riesgo ───────────────────────────────────────────
  if (step === 5) {
    return (
      <StepWrapper>
        <ProgressBar step={5} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Cómo reaccionarías si tu inversión bajara un 20% en un año?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          Sé honesto. En 2022 el mercado global cayó un 20%. En 2008, más del 50%.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="Vendería todo para no perder más" sublabel="Prefiero seguridad aunque la rentabilidad sea menor" onClick={() => pick('riesgo', 'conservador', 6)} />
          <OptionCard label="Me preocuparía, pero esperaría a que se recupere" sublabel="Puedo aguantar la volatilidad si creo en la estrategia" onClick={() => pick('riesgo', 'moderado', 6)} />
          <OptionCard label="Aprovecharía para comprar más barato" sublabel="Las caídas son oportunidades, tengo mentalidad de largo plazo" onClick={() => pick('riesgo', 'agresivo', 6)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 6 — Ingresos ───────────────────────────────────────────────────────
  if (step === 6) {
    return (
      <StepWrapper>
        <ProgressBar step={6} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Cómo son tus ingresos?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          La estabilidad de los ingresos cambia la estrategia: con ingresos variables, el fondo de emergencia debe ser mayor.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="Sueldo fijo estable" sublabel="Empleado con nómina mensual predecible" onClick={() => pick('ingresos', 'fijo', 7)} />
          <OptionCard label="Autónomo o ingresos variables" sublabel="Mes a mes variable: proyectos, comisiones, temporadas" onClick={() => pick('ingresos', 'variable', 7)} />
          <OptionCard label="Varios ingresos o en crecimiento" sublabel="Múltiples fuentes, negocio propio o en expansión" onClick={() => pick('ingresos', 'multiple', 7)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 7 — Capital disponible ─────────────────────────────────────────────
  if (step === 7) {
    return (
      <StepWrapper>
        <ProgressBar step={7} total={TOTAL_STEPS} />
        <h2 className="font-fraunces text-[30px] font-black text-ink leading-tight mb-2 max-sm:text-[24px]">
          ¿Con cuánto dinero libre cuentas ahora mismo?
        </h2>
        <p className="text-[14px] text-ink3 mb-8 leading-relaxed">
          Dinero que no necesitas para gastos fijos ni para el fondo de emergencia. Sin decimales, una estimación es suficiente.
        </p>
        <div className="flex flex-col gap-3">
          <OptionCard label="Menos de 1.000€" sublabel="Poco margen, pero el hábito importa más que la cantidad" onClick={() => pick('capital', 'poco', 8)} />
          <OptionCard label="Entre 1.000€ y 10.000€" sublabel="Una cantidad con la que ya se puede construir algo sólido" onClick={() => pick('capital', 'medio', 8)} />
          <OptionCard label="Entre 10.000€ y 50.000€" sublabel="Capital relevante que merece una estrategia bien pensada" onClick={() => pick('capital', 'bastante', 8)} />
          <OptionCard label="Más de 50.000€" sublabel="Capital significativo: la eficiencia fiscal y la diversificación son clave" onClick={() => pick('capital', 'mucho', 8)} />
        </div>
        <BackButton onClick={goBack} />
      </StepWrapper>
    )
  }

  // ── Step 8 — Result ─────────────────────────────────────────────────────────

  const plan = buildPlan(answers as FilledAnswers)

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[720px] mx-auto px-6 py-16">

        {/* Result header */}
        <div className="mb-10 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-moss mb-3">
            Tu informe financiero personalizado
          </p>
          <h2 className="font-fraunces text-[38px] font-black text-ink leading-tight mb-2 max-sm:text-[28px]">
            Tu plan está listo
          </h2>
          <p className="text-[16px] text-ink2">Basado en tus 7 respuestas</p>
        </div>

        {/* ─ Section 1: Profile ─────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="bg-forest px-6 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-white/70 mb-1">
                Sección 1 · Tu perfil financiero
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[36px]">{plan.profileEmoji}</span>
                <h3 className="font-fraunces text-[26px] font-black text-white leading-tight">
                  {plan.profileName}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[15px] text-ink2 leading-[1.7] mb-5">{plan.profileDesc}</p>
              <div className="flex flex-wrap gap-2">
                {answers.deuda    && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{deudaLabel(answers.deuda)}</span>}
                {answers.fondo    && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{fondoLabel(answers.fondo)}</span>}
                {answers.edad     && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{edadLabel(answers.edad)}</span>}
                {answers.objetivo && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{objetivoLabel(answers.objetivo)}</span>}
                {answers.riesgo   && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{riesgoLabel(answers.riesgo)}</span>}
                {answers.ingresos && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{ingresosLabel(answers.ingresos)}</span>}
                {answers.capital  && <span className="text-[12px] px-3 py-1.5 bg-cream border border-border rounded-full text-ink2 font-medium">{capitalLabel(answers.capital)}</span>}
              </div>
            </div>
          </div>
        </section>

        {/* ─ Section 2: Priority pyramid ───────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white border border-border rounded-2xl shadow-card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-ink3 mb-1">
              Sección 2
            </p>
            <h3 className="font-fraunces text-[22px] font-black text-ink mb-5">
              Tu pirámide de prioridades
            </h3>
            {plan.priorities.length === 0 ? (
              <p className="text-[14px] text-ink2">Tu base financiera está en buen estado. Revisa el plan de acción para seguir optimizando.</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {plan.priorities.map((p, i) => (
                  <li key={p.id} className={`flex items-center gap-3 p-3.5 border rounded-xl ${p.bgColor}`}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-[13px] font-black text-ink">
                      {i + 1}
                    </span>
                    <span className="text-[18px]">{p.icon}</span>
                    <span className={`text-[14px] font-semibold ${p.color}`}>{p.title}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* ─ Section 3: Detailed action plan ───────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-border">
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-ink3 mb-1">
                Sección 3
              </p>
              <h3 className="font-fraunces text-[22px] font-black text-ink">
                Plan de acción detallado
              </h3>
            </div>
            {plan.priorities.length === 0 ? (
              <div className="p-6">
                <p className="text-[14px] text-ink2">Tu situación está bien encaminada. Mantén el rumbo con aportaciones periódicas y revisión anual de la cartera.</p>
              </div>
            ) : (
              plan.priorities.map((p, i) => (
                <div key={p.id} className={`p-6 ${i < plan.priorities.length - 1 ? 'border-b border-border' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center text-[14px] font-black font-fraunces">
                      {i + 1}
                    </div>
                    <span className="text-[20px]">{p.icon}</span>
                    <h4 className="text-[16px] font-bold text-ink leading-snug">{p.title}</h4>
                  </div>

                  {/* Tiempo badge */}
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[.08em] px-2.5 py-1 bg-mist text-moss rounded-full mb-4">
                    {p.tiempo}
                  </span>

                  {/* Qué hacer */}
                  <div className="mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-1.5">Qué hacer</p>
                    <p className="text-[14px] text-ink2 leading-[1.7]">{p.queHacer}</p>
                  </div>

                  {/* Por qué ahora */}
                  <div className="mb-4 pl-4 border-l-2 border-gold">
                    <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-1.5">Por qué ahora</p>
                    <p className="text-[13.5px] text-ink2 leading-[1.6] italic">{p.porQue}</p>
                  </div>

                  {/* Cómo empezar */}
                  <div className="mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3 mb-2">Cómo empezar</p>
                    <ul className="flex flex-col gap-1.5">
                      {p.comoEmpezar.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[14px] text-ink2 leading-[1.6]">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-forest" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link */}
                  <Link href={p.link.href} className="inline-flex items-center text-[13px] font-semibold text-moss hover:text-forest transition-colors">
                    {p.link.label}
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ─ Section 4: Portfolio ───────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white border border-border rounded-2xl shadow-card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-ink3 mb-1">
              Sección 4
            </p>
            <h3 className="font-fraunces text-[22px] font-black text-ink mb-2">
              {plan.portfolio.title}
            </h3>
            <p className="text-[14px] text-ink2 leading-[1.7] mb-6">{plan.portfolio.note}</p>

            {/* Portfolio bars */}
            <div className="flex flex-col gap-3 mb-4">
              {plan.portfolio.items.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] font-medium text-ink">{item.name}</span>
                    <span className="text-[13px] font-bold text-ink">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-cream rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-ink3 leading-[1.6]">
              Esta cartera es orientativa. Ajusta los porcentajes según tu situación, horizonte temporal y tolerancia real al riesgo. Consulta con un asesor independiente antes de tomar decisiones significativas.
            </p>
          </div>
        </section>

        {/* ─ Section 5: Next 90 days ────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white border border-border rounded-2xl shadow-card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-ink3 mb-1">
              Sección 5
            </p>
            <h3 className="font-fraunces text-[22px] font-black text-ink mb-6">
              Tus próximos 90 días
            </h3>

            {/* This week */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[.1em] px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                  Esta semana
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {plan.nextWeek.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 border-border bg-cream" />
                    <span className="text-[14px] text-ink2 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* This month */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[.1em] px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
                  Este mes
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {plan.nextMonth.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 border-border bg-cream" />
                    <span className="text-[14px] text-ink2 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next 3 months */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[.1em] px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                  En 3 meses
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {plan.nextQuarter.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 border-border bg-cream" />
                    <span className="text-[14px] text-ink2 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─ Section 6: Recommended reading ────────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-white border border-border rounded-2xl shadow-card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-ink3 mb-1">
              Sección 6
            </p>
            <h3 className="font-fraunces text-[22px] font-black text-ink mb-5">
              Lecturas recomendadas para tu perfil
            </h3>
            <ul className="flex flex-col gap-3">
              {plan.articles.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="flex items-start gap-3 p-3.5 rounded-xl border border-border hover:border-forest hover:bg-mist transition-all group">
                    <span className="mt-0.5 flex-shrink-0 text-moss group-hover:text-forest transition-colors text-[16px]">→</span>
                    <div>
                      <span className="text-[14px] font-semibold text-ink group-hover:text-forest transition-colors block mb-0.5">
                        {a.label}
                      </span>
                      <span className="text-[12px] text-ink3">{a.desc}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─ CTA buttons ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-xl
                       text-[14px] font-semibold hover:bg-moss transition-colors shadow-card"
          >
            ↺ Repetir el diagnóstico
          </button>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 bg-white border border-border text-ink px-6 py-3 rounded-xl
                       text-[14px] font-medium hover:border-sage transition-colors"
          >
            ← Cambiar última respuesta
          </button>
        </div>

        {/* ─ Disclaimer ─────────────────────────────────────────────────────── */}
        <p className="text-[12px] text-ink3 leading-[1.7] border-t border-border pt-6">
          <strong>Aviso legal:</strong> Este diagnóstico es orientativo y tiene únicamente fines educativos e informativos. No constituye asesoramiento financiero personalizado ni una recomendación de inversión. Cada situación financiera es única. Consulta con un asesor financiero independiente (con licencia CNMV) antes de tomar decisiones de inversión significativas. Las rentabilidades pasadas no garantizan resultados futuros.
        </p>
      </div>
    </div>
  )
}
