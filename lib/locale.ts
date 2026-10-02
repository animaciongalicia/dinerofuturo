import type { Article } from './types'

export type Pais = NonNullable<Article['pais']>

/** hreflang (BCP 47) por país del contenido */
export const PAIS_HREFLANG: Record<Pais, string> = {
  espana: 'es-ES',
  mexico: 'es-MX',
  colombia: 'es-CO',
  argentina: 'es-AR',
  chile: 'es-CL',
}

/** locale Open Graph (con guion bajo) por país */
export const PAIS_OG_LOCALE: Record<Pais, string> = {
  espana: 'es_ES',
  mexico: 'es_MX',
  colombia: 'es_CO',
  argentina: 'es_AR',
  chile: 'es_CL',
}
