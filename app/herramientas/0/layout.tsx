import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora del número FIRE: cuándo puedes jubilarte anticipadamente',
  description: 'Calcula tu número FIRE, años hasta la independencia financiera y edad de jubilación anticipada con la regla del 4%.',
  alternates: { canonical: siteUrl('/herramientas/0') },
  openGraph: {
    title: 'Calculadora del número FIRE: cuándo puedes jubilarte anticipadamente',
    description: 'Calcula tu número FIRE, años hasta la independencia financiera y edad de jubilación anticipada con la regla del 4%.',
    type: 'website',
    url: siteUrl('/herramientas/0'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora del número FIRE: cuándo puedes jubilarte anticipadamente',
    description: 'Calcula tu número FIRE, años hasta la independencia financiera y edad de jubilación anticipada con la regla del 4%.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
