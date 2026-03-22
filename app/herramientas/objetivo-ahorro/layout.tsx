import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de Objetivo de Ahorro — ¿Cuánto necesito ahorrar al mes?',
  description:
    'Calcula cuánto tienes que ahorrar cada mes para alcanzar tu meta en el plazo que necesitas. Con y sin rentabilidad por invertirlo. Gratis.',
  alternates: { canonical: siteUrl('/herramientas/objetivo-ahorro') },
  openGraph: {
    title: 'Calculadora de Objetivo de Ahorro — Dinero Futuro',
    description: 'Tu meta, tu plazo, cuánto ahorrar al mes. Simple y al instante.',
    type: 'website',
    url: siteUrl('/herramientas/objetivo-ahorro'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
