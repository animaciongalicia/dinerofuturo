import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/utils'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const SITE_NAME = 'Dinero Futuro'
const SITE_DESC =
  'Educación financiera práctica para personas normales. Artículos sin jerga, sin humo y sin venderte nada que no te sirva.'
const GA_ID       = process.env.NEXT_PUBLIC_GA_ID
const ADSENSE_ID  = process.env.NEXT_PUBLIC_ADSENSE_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),

  title: {
    default: `${SITE_NAME} — Educación financiera en español`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,

  alternates: {
    canonical: siteUrl(),
    languages: { es: siteUrl(), 'x-default': siteUrl() },
  },

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Educación financiera en español`,
    description: SITE_DESC,
    url: siteUrl(),
    images: [{ url: siteUrl('/og-default.png'), width: 1200, height: 630, alt: SITE_NAME }],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Educación financiera en español`,
    description: SITE_DESC,
    images: [siteUrl('/og-default.png')],
  },

  verification: {
    google: 'CXoD1QrFE8OInkgJKfym88j5d_AmoHon19j89kUO8Jo',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink text-[16px] leading-[1.7] font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>

      {/* Google AdSense — solo carga si NEXT_PUBLIC_ADSENSE_ID está definida */}
      {ADSENSE_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}

      {/* Google Analytics 4 — solo carga si NEXT_PUBLIC_GA_ID está definida */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
          </Script>
        </>
      )}
    </html>
  )
}
