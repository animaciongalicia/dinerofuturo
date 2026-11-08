/**
 * Convierte un error de la API de Anthropic en un mensaje accionable (en español) y lo
 * emite también como anotación de GitHub Actions (::error::), que aparece en el resumen
 * de la ejecución y en el correo de aviso.
 */
export function explainFatal(err) {
  const status = err?.status
  const msg = String(err?.error?.error?.message ?? err?.message ?? '')

  let titulo = 'Error inesperado en el robot de artículos'
  let ayuda = 'Revisa el log completo de la ejecución en GitHub → Actions.'

  if (status === 400 && /credit balance/i.test(msg)) {
    titulo = 'SIN SALDO en la API de Anthropic'
    ayuda = 'Recarga saldo en console.anthropic.com → Plans & Billing (y activa la recarga automática). ' +
            'Hasta entonces no se publicará ningún artículo.'
  } else if (status === 401 || status === 403) {
    titulo = 'ANTHROPIC_API_KEY inválida, caducada o sin permisos'
    ayuda = 'Crea una clave nueva en console.anthropic.com y actualiza el secreto en ' +
            'GitHub → Settings → Secrets and variables → Actions → ANTHROPIC_API_KEY.'
  } else if (status === 429) {
    titulo = 'Límite de peticiones de la API alcanzado'
    ayuda = 'Se reintentará en la próxima ejecución programada.'
  } else if (status >= 500 || status === 529) {
    titulo = 'La API de Anthropic no está disponible ahora mismo'
    ayuda = 'Es temporal: se reintentará en la próxima ejecución programada.'
  }

  console.error(`\n❌ ${titulo}\n   ${ayuda}\n`)
  // Anotación visible en GitHub Actions
  console.log(`::error title=${titulo}::${ayuda}`)
  console.error('Detalle técnico:', msg || err)
}
