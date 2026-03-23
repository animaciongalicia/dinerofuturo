import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora del fondo de emergencia: cuánto necesitas exactamente | Dinero Futuro',
  description: 'Calcula tu fondo de emergencia según tus gastos reales y situación laboral. Sin fórmulas genéricas.',
  alternates: { canonical: siteUrl('/herramientas/fondo-emergencia') },
  openGraph: {
    title: 'Calculadora del fondo de emergencia: cuánto necesitas exactamente',
    description: 'Calcula tu fondo de emergencia según tus gastos reales y situación laboral. Sin fórmulas genéricas.',
    type: 'website',
    url: siteUrl('/herramientas/fondo-emergencia'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora del fondo de emergencia: cuánto necesitas exactamente',
    description: 'Calcula tu fondo de emergencia según tus gastos reales y situación laboral. Sin fórmulas genéricas.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
