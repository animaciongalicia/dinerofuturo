import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de Hipoteca — Cuota mensual y coste total',
  description:
    'Calcula la cuota mensual de tu hipoteca, el total que pagarás al banco y el ahorro de amortizar anticipadamente. Compara fija vs variable al instante.',
  alternates: { canonical: siteUrl('/herramientas/calculadora-hipoteca') },
  openGraph: {
    title: 'Calculadora de Hipoteca — Dinero Futuro',
    description: 'Cuota mensual, coste real total y ahorro por amortización anticipada. Sin registro.',
    type: 'website',
    url: siteUrl('/herramientas/calculadora-hipoteca'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
