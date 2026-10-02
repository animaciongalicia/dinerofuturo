import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import ToolSchema from '@/components/ToolSchema'

export const metadata: Metadata = {
  title: 'Calculadora número FIRE: años hasta la independencia financiera',
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
  return (
    <>
      <ToolSchema name="Calculadora del número FIRE" description="Calcula tu número FIRE, años que te faltan y edad de jubilación anticipada con la regla del 4%." path="/herramientas/numero-fire" />
      {children}
    </>
  )
}
