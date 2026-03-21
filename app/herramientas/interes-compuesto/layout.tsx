import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Interés Compuesto — Dinero Futuro',
  description:
    'Calcula cuánto crecerá tu inversión con el tiempo. Introduce capital inicial, aportación mensual, años y rentabilidad. Gráfico año a año incluido. Gratuita.',
  alternates: {
    canonical: '/herramientas/interes-compuesto',
  },
  openGraph: {
    title: 'Calculadora de Interés Compuesto',
    description:
      'Descubre el poder del interés compuesto. Calcula el crecimiento de tu inversión con aportaciones mensuales, gráfico incluido.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
