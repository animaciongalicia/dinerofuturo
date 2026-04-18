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
      // Deprecated categories — merged into active categories
      {
        source: '/categoria/vivienda',
        destination: '/categoria/hipotecas',
        permanent: true,
      },
      {
        source: '/categoria/impuestos',
        destination: '/categoria/inversion',
        permanent: true,
      },
      {
        source: '/categoria/finanzas',
        destination: '/categoria/presupuesto',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
