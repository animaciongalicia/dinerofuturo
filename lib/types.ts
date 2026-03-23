export type Article = {
  slug: string
  title: string
  fecha: string
  nivel: 0 | 1 | 2 | 3
  categoria: 'ahorro' | 'inversion' | 'cripto' | 'presupuesto'
            | 'vivienda' | 'impuestos' | 'jubilacion' | 'comparativa'
            | 'hipotecas' | 'banca' | 'finanzas'
  resuelve: string        // el problema concreto que resuelve
  extracto: string
  lectura: number         // minutos de lectura
  destacado?: boolean
  nuevo?: boolean
  pais?: 'mexico' | 'colombia' | 'argentina' | 'chile' | 'espana'
  content?: string
}
