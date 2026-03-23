import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de objetivo de ahorro: cuánto ahorrar cada mes',
  description: 'Cuánto tienes que ahorrar cada mes para alcanzar tu meta financiera, con y sin rentabilidad.',
  alternates: { canonical: siteUrl('/herramientas/objetivo-ahorro') },
  openGraph: {
    title: 'Calculadora de objetivo de ahorro: cuánto ahorrar cada mes',
    description: 'Cuánto tienes que ahorrar cada mes para alcanzar tu meta financiera, con y sin rentabilidad.',
    type: 'website',
    url: siteUrl('/herramientas/objetivo-ahorro'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de objetivo de ahorro: cuánto ahorrar cada mes',
    description: 'Cuánto tienes que ahorrar cada mes para alcanzar tu meta financiera, con y sin rentabilidad.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
