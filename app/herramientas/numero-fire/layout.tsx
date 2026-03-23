import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora número FIRE: años hasta la independencia financiera | Dinero Futuro',
  description: 'Calcula tu número FIRE, años que te faltan y edad de jubilación anticipada con la regla del 4%.',
  alternates: { canonical: siteUrl('/herramientas/numero-fire') },
  openGraph: {
    title: 'Calculadora número FIRE: años hasta la independencia financiera',
    description: 'Calcula tu número FIRE, años que te faltan y edad de jubilación anticipada con la regla del 4%.',
    type: 'website',
    url: siteUrl('/herramientas/numero-fire'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora número FIRE: años hasta la independencia financiera',
    description: 'Calcula tu número FIRE, años que te faltan y edad de jubilación anticipada con la regla del 4%.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
