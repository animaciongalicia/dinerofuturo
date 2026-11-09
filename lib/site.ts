/** Autor / editor del sitio: la sociedad titular (credibilidad E-E-A-T en contenido financiero) */
export const AUTHOR = {
  name: 'Inversiones Shiso, S.L.',
  legalName: 'INVERSIONES SHISO, S.L.',
  taxID: 'B70319223',
  locality: 'A Coruña',
  country: 'ES',
} as const

/** Organización autora para JSON-LD (sin dirección postal completa, solo localidad y país) */
export function authorOrganization(url: string) {
  return {
    '@type': 'Organization',
    name: AUTHOR.name,
    legalName: AUTHOR.legalName,
    taxID: AUTHOR.taxID,
    url,
    address: { '@type': 'PostalAddress', addressLocality: AUTHOR.locality, addressCountry: AUTHOR.country },
  }
}
