import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'
import ToolSchema from '@/components/ToolSchema'

const TITLE = 'Calculadora de jubilación: cuánto ahorrar para retirarte'
const DESC = 'Calcula cuánto capital necesitas para jubilarte y cuánto ahorrar cada mes según tu edad, tu pensión pública estimada y la rentabilidad.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: siteUrl('/herramientas/calculadora-jubilacion') },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    url: siteUrl('/herramientas/calculadora-jubilacion'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema name="Calculadora de jubilación" description={DESC} path="/herramientas/calculadora-jubilacion" />
      {children}
    </>
  )
}
