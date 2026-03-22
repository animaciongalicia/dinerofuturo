import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora Número FIRE — ¿Cuánto necesito para no trabajar más?',
  description:
    'Calcula tu número FIRE: el capital necesario para vivir de las rentas sin trabajar. Basado en la regla del 4%. Gratis y sin registro.',
  alternates: { canonical: siteUrl('/herramientas/numero-fire') },
  openGraph: {
    title: 'Calculadora Número FIRE — Dinero Futuro',
    description: 'Cuánto necesitas para la independencia financiera y cuántos años te faltan.',
    type: 'website',
    url: siteUrl('/herramientas/numero-fire'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
