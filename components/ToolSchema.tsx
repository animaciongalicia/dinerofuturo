import { siteUrl } from '@/lib/utils'

/** JSON-LD WebApplication para las calculadoras (herramienta gratuita, sin registro) */
export default function ToolSchema({ name, description, path }: { name: string; description: string; path: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: siteUrl(path),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: 'es',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'Dinero Futuro', url: siteUrl('/') },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
