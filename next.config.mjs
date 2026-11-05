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
      // Fusión de artículos duplicados (misma intención de búsqueda) → artículo pilar
      { source: '/articulo/que-es-la-inflacion-explicacion-sencilla', destination: '/articulo/que-es-la-inflacion-y-como-te-afecta', permanent: true },
      { source: '/articulo/que-es-interes-compuesto-explicacion-simple', destination: '/articulo/que-es-el-interes-compuesto-ejemplos-reales', permanent: true },
      { source: '/articulo/gastos-hormiga-cuanto-pierdes-sin-darte-cuenta', destination: '/articulo/gastos-hormiga-fugas-invisibles-presupuesto', permanent: true },
      { source: '/articulo/cuenta-de-ahorro-vs-deposito-plazo-fijo', destination: '/articulo/cuenta-remunerada-vs-deposito-plazo-fijo', permanent: true },
      { source: '/articulo/pagar-cuotas-vs-contado-cuando-conviene', destination: '/articulo/pagar-contado-vs-financiar-cuando-conviene', permanent: true },
      { source: '/articulo/efectivo-tarjeta-apps-pago-cual-conviene', destination: '/articulo/efectivo-vs-tarjeta-vs-bizum-cual-te-hace-gastar-mas', permanent: true },
      { source: '/articulo/como-ahorrar-dinero-cuando-no-te-alcanza', destination: '/articulo/como-ahorrar-dinero-cuando-ganas-poco', permanent: true },
      { source: '/articulo/sueldo-minimo-como-ahorrar', destination: '/articulo/como-ahorrar-dinero-cuando-ganas-poco', permanent: true },
      { source: '/articulo/dejar-de-pedir-dinero-prestado-fin-de-mes', destination: '/articulo/como-dejar-de-pedir-dinero-prestado-antes-de-cobrar', permanent: true },
      { source: '/articulo/deudas-como-salir-por-donde-empezar', destination: '/articulo/como-salir-de-deudas-rapido-plan-paso-a-paso', permanent: true },
      { source: '/articulo/hipoteca-100-mas-gastos-como-conseguirla', destination: '/articulo/hipoteca-al-100-como-conseguirla', permanent: true },
      { source: '/articulo/supermercado-marca-vs-marca-blanca-ahorro-real', destination: '/articulo/supermercado-caro-vs-barato-comparativa-ahorro', permanent: true },
      { source: '/articulo/linea-credito-revolving-como-funciona', destination: '/articulo/tarjeta-credito-vs-tarjeta-revolving-diferencias', permanent: true },
      { source: '/articulo/cuentas-nostro-vostro-bancos-transferencias-internacionales', destination: '/articulo/banca-corresponsal-transferencias-internacionales', permanent: true },
      { source: '/articulo/cash-pooling-para-familias-centralizar-cuentas-optimizar-liquidez', destination: '/articulo/cuentas-concentradoras-cash-pooling-gestion-liquidez', permanent: true },
      { source: '/articulo/wallets-criptomonedas-como-elegir-custodial-no-custodial', destination: '/articulo/que-es-wallet-criptomonedas-principiantes', permanent: true },
      { source: '/articulo/exchanges-centralizados-vs-descentralizados-donde-comprar-cripto', destination: '/articulo/que-es-un-exchange-de-criptomonedas', permanent: true },
      { source: '/articulo/impuestos-ganancias-inversiones-cuanto-pagar', destination: '/articulo/declaracion-renta-inversiones-como-tributar', permanent: true },
      { source: '/articulo/plan-pensiones-vs-fondo-indexado-diferencias', destination: '/articulo/plan-de-pensiones-merece-la-pena-2026', permanent: true },
      { source: '/articulo/calcular-numero-magico-jubilacion-cuanto-necesitas', destination: '/articulo/cuanto-dinero-necesito-para-jubilarme', permanent: true },
      { source: '/articulo/automatizar-ahorro-metas-especificas', destination: '/articulo/automatizar-ahorros-guardar-dinero-sin-enterarte', permanent: true },
      { source: '/articulo/como-ahorrar-para-vacaciones-sin-tocar-fondo-emergencia', destination: '/articulo/como-ahorrar-para-viajar', permanent: true },
      { source: '/articulo/ahorrar-pago-inicial-coche-sin-tocar-fondo-emergencia', destination: '/articulo/como-ahorrar-para-cambiar-de-coche-sin-prestamo', permanent: true },
      { source: '/articulo/dinero-para-imprevistos-cuanto-guardar-donde-ponerlo', destination: '/articulo/fondo-de-emergencia-cuanto-necesitas', permanent: true },
      { source: '/articulo/como-crear-colchon-6-meses-gastos-partiendo-de-cero', destination: '/articulo/fondo-de-emergencia-cuanto-necesitas', permanent: true },
      { source: '/articulo/dinero-y-pareja-como-juntar-finanzas-sin-romper-la-relacion', destination: '/articulo/finanzas-en-pareja-como-organizarlo', permanent: true },
      { source: '/articulo/banco-tradicional-vs-neobanco-vs-colchon-donde-poner-dinero', destination: '/articulo/neobanco-vs-banco-tradicional-cual-elegir', permanent: true },
      { source: '/articulo/presupuesto-mensual-para-principiantes', destination: '/articulo/como-hacer-un-presupuesto-personal-que-funcione', permanent: true },
      { source: '/articulo/primer-mes-con-presupuesto-plan-dia-a-dia', destination: '/articulo/como-hacer-un-presupuesto-personal-que-funcione', permanent: true },
      { source: '/articulo/cripto-sin-saber-nada-por-donde-empezar', destination: '/articulo/cripto-para-principiantes-guia-completa', permanent: true },
      { source: '/articulo/criptomonedas-que-son-de-verdad-guia-principiantes', destination: '/articulo/cripto-para-principiantes-guia-completa', permanent: true },
      { source: '/articulo/por-donde-empezar-cripto-principiante', destination: '/articulo/cripto-para-principiantes-guia-completa', permanent: true },
      { source: '/articulo/lending-defi-prestar-cripto-intereses-sin-intermediarios', destination: '/articulo/defi-explicado-como-funciona-ganar-dinero-sin-intermediarios', permanent: true },
      { source: '/articulo/liquidez-cripto-slippage-orden-compra-venta', destination: '/articulo/liquidez-cripto-que-es-por-que-importa', permanent: true },
      // /articulo/empieza-aqui nunca existió: la guía vive en /empieza-aqui
      { source: '/articulo/empieza-aqui', destination: '/empieza-aqui', permanent: true },
      // Categoría sin artículos — fusionada con hipotecas
      { source: '/categoria/vivienda', destination: '/categoria/hipotecas', permanent: true },
    ]
  },
}

export default nextConfig
