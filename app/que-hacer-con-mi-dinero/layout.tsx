import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: '¿Qué hago con mi dinero? Diagnóstico financiero personalizado',
  description: 'Responde 7 preguntas y recibe un plan financiero adaptado a tu situación: deudas, fondo de emergencia, inversión y más. Gratis, sin registro.',
  alternates: { canonical: siteUrl('/que-hacer-con-mi-dinero') },
  openGraph: {
    title: '¿Qué hago con mi dinero? — Diagnóstico gratuito',
    description: '7 preguntas, un plan personalizado. Descubre tus prioridades financieras reales.',
    type: 'website',
    url: siteUrl('/que-hacer-con-mi-dinero'),
    locale: 'es_ES',
    siteName: 'Dinero Futuro',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué hago con mi dinero? — Diagnóstico gratuito',
    description: '7 preguntas, un plan personalizado. Gratis y sin registro.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
