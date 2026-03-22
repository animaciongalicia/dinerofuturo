import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: '¿Qué hago con mi dinero? — Plan personalizado | Dinero Futuro',
  description:
    'Responde 5 preguntas y descubre exactamente qué hacer con tu dinero ahora mismo: deudas, fondo de emergencia, inversión.',
  alternates: { canonical: siteUrl('/que-hacer-con-mi-dinero') },
  openGraph: {
    title: '¿Qué hago con mi dinero? — Plan personalizado | Dinero Futuro',
    description:
      'Responde 5 preguntas y descubre exactamente qué hacer con tu dinero ahora mismo: deudas, fondo de emergencia, inversión.',
    type: 'website',
    url: siteUrl('/que-hacer-con-mi-dinero'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
