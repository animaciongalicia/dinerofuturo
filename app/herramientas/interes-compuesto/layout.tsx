import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de interés compuesto: simula cómo crece tu dinero',
  description: 'Calcula cuánto crece tu inversión con el interés compuesto. Capital, rentabilidad anual y años para ver el resultado al instante.',
  alternates: { canonical: siteUrl('/herramientas/interes-compuesto') },
  openGraph: {
    title: 'Calculadora de interés compuesto: simula cómo crece tu dinero',
    description: 'Calcula cuánto crece tu inversión con el interés compuesto. Capital, rentabilidad anual y años para ver el resultado al instante.',
    type: 'website',
    url: siteUrl('/herramientas/interes-compuesto'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de interés compuesto: simula cómo crece tu dinero',
    description: 'Calcula cuánto crece tu inversión con el interés compuesto. Capital, rentabilidad anual y años para ver el resultado al instante.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
