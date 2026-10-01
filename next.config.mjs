/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },

  async redirects() {
    return [
      // Duplicate cuentas remuneradas — redirect to canonical
      {
        source: '/articulo/mejores-cuentas-remuneradas-comparativa-2026',
        destination: '/articulo/mejores-cuentas-remuneradas-2026',
        permanent: true,
      },
      // Artículos que Google rastreó en la raíz (estructura antigua) → /articulo/
      // Los enlaces rotos de origen ya están corregidos; esto recupera lo indexado.
      { source: '/como-salir-de-deudas-rapido-plan-paso-a-paso', destination: '/articulo/como-salir-de-deudas-rapido-plan-paso-a-paso', permanent: true },
      { source: '/fondo-de-emergencia-cuanto-necesitas', destination: '/articulo/fondo-de-emergencia-cuanto-necesitas', permanent: true },
      { source: '/que-es-la-inflacion-y-como-te-afecta', destination: '/articulo/que-es-la-inflacion-y-como-te-afecta', permanent: true },
      { source: '/gastos-hormiga-fugas-invisibles-presupuesto', destination: '/articulo/gastos-hormiga-fugas-invisibles-presupuesto', permanent: true },
      { source: '/diferencia-entre-ahorrar-e-invertir', destination: '/articulo/diferencia-entre-ahorrar-e-invertir', permanent: true },
      { source: '/como-invertir-100-euros-al-mes', destination: '/articulo/como-invertir-100-euros-al-mes', permanent: true },
      { source: '/deducciones-fiscales-por-invertir-dinero-hacienda-devuelve', destination: '/articulo/deducciones-fiscales-por-invertir-dinero-hacienda-devuelve', permanent: true },
      { source: '/que-es-el-interes-compuesto-ejemplos-reales', destination: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', permanent: true },
      { source: '/como-hacer-un-presupuesto-personal-que-funcione', destination: '/articulo/como-hacer-un-presupuesto-personal-que-funcione', permanent: true },
      // /articulo/empieza-aqui nunca existió: la guía vive en /empieza-aqui
      { source: '/articulo/empieza-aqui', destination: '/empieza-aqui', permanent: true },
      // Categoría sin artículos — fusionada con hipotecas
      { source: '/categoria/vivienda', destination: '/categoria/hipotecas', permanent: true },
    ]
  },
}

export default nextConfig
