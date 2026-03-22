import type { Metadata } from 'next'
import { siteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calculadora de Fondo de Emergencia — Dinero Futuro',
  description:
    'Calcula exactamente cuánto dinero necesitas en tu fondo de emergencia según tu trabajo, gastos y personas a cargo. Funcionario, empleado o autónomo.',
  alternates: { canonical: siteUrl('/herramientas/fondo-emergencia') },
  openGraph: {
    title: 'Calculadora de Fondo de Emergencia',
    description: 'Cuánto necesitas guardado según tu situación real. No el consejo genérico de los 3 meses.',
    type: 'website',
    url: siteUrl('/herramientas/fondo-emergencia'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
