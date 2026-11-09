/**
 * Cálculo de jubilación en euros constantes (poder adquisitivo de hoy).
 * No modela la pensión pública ni los impuestos: la pensión la introduce la persona
 * (p. ej. la estimación del simulador oficial) y los resultados son antes de impuestos.
 */
export interface JubilacionInput {
  edadActual: number
  edadJubilacion: number   // edad a la que deja de trabajar
  edadPension: number      // edad desde la que empieza a cobrar la pensión pública
  edadFin: number          // edad hasta la que se planifica cobrar
  ingresoDeseado: number   // €/mes en euros de hoy
  pensionPublica: number   // €/mes en euros de hoy (estimación de la persona)
  ahorroActual: number     // € ya ahorrados para la jubilación
  rentAntes: number        // % anual nominal hasta la jubilación
  rentDespues: number      // % anual nominal ya jubilado
  inflacion: number        // % anual
}

export interface JubilacionResultado {
  anosAcumulacion: number
  mesesJubilacion: number
  huecoMensual: number            // lo que falta cada mes tras empezar la pensión pública
  capitalNecesario: number        // € en euros de hoy, en el momento de jubilarse
  capitalNominal: number          // el mismo capital expresado en euros de ese año
  ahorroProyectado: number        // lo que valdría hoy lo ahorrado si no aporta más (euros de hoy)
  ahorroMensual: number           // € al mes en euros de hoy (0 si ya llega)
  yaCubierto: boolean
  valido: boolean
}

function realMensual(nominalPct: number, inflacionPct: number): number {
  const real = (1 + nominalPct / 100) / (1 + inflacionPct / 100) - 1
  return Math.pow(1 + real, 1 / 12) - 1
}

export function calcularJubilacion(i: JubilacionInput): JubilacionResultado {
  const anos = i.edadJubilacion - i.edadActual
  const meses = Math.round((i.edadFin - i.edadJubilacion) * 12)
  const valido = anos >= 1 && meses >= 1

  const vacio: JubilacionResultado = {
    anosAcumulacion: Math.max(0, anos), mesesJubilacion: Math.max(0, meses),
    huecoMensual: Math.max(0, i.ingresoDeseado - i.pensionPublica),
    capitalNecesario: 0, capitalNominal: 0, ahorroProyectado: 0, ahorroMensual: 0, yaCubierto: false, valido: false,
  }
  if (!valido) return vacio

  // 1) Capital necesario al jubilarse: valor presente de lo que hay que cubrir cada mes
  const rr = realMensual(i.rentDespues, i.inflacion)
  let capital = 0
  for (let m = 0; m < meses; m++) {
    const edad = i.edadJubilacion + m / 12
    const necesidad = edad < i.edadPension
      ? i.ingresoDeseado
      : Math.max(0, i.ingresoDeseado - i.pensionPublica)
    capital += necesidad / Math.pow(1 + rr, m + 1)
  }

  // 2) Cuánto crece lo ahorrado hasta la jubilación y cuánto falta aportar cada mes
  const rw = realMensual(i.rentAntes, i.inflacion)
  const n = anos * 12
  const factor = Math.pow(1 + rw, n)
  const proyectado = i.ahorroActual * factor
  const falta = capital - proyectado

  let ahorroMensual = 0
  if (falta > 0) {
    ahorroMensual = rw === 0 ? falta / n : (falta * rw) / (factor - 1)
  }

  return {
    anosAcumulacion: anos,
    mesesJubilacion: meses,
    huecoMensual: Math.max(0, i.ingresoDeseado - i.pensionPublica),
    capitalNecesario: capital,
    capitalNominal: capital * Math.pow(1 + i.inflacion / 100, anos),
    ahorroProyectado: proyectado,
    ahorroMensual,
    yaCubierto: falta <= 0,
    valido: true,
  }
}
