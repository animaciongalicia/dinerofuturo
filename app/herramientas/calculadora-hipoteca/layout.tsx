import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de hipoteca: cuota mensual y coste total real',
  description: 'Calcula tu cuota hipotecaria, total de intereses y ahorro por amortización anticipada. Gratis y sin registro.',
  alternates: { canonical: siteUrl('/herramientas/calculadora-hipoteca') },
  openGraph: {
    title: 'Calculadora de hipoteca: cuota mensual y coste total real',
    description: 'Calcula tu cuota hipotecaria, total de intereses y ahorro por amortización anticipada. Gratis y sin registro.',
    type: 'website',
    url: siteUrl('/herramientas/calculadora-hipoteca'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de hipoteca: cuota mensual y coste total real',
    description: 'Calcula tu cuota hipotecaria, total de intereses y ahorro por amortización anticipada. Gratis y sin registro.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
