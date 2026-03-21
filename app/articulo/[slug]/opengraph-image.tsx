import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/articles'

export const runtime = 'nodejs'
export const alt     = 'Dinero Futuro'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORIA_EMOJI: Record<string, string> = {
  ahorro:      '🏦',
  inversion:   '📈',
  cripto:      '₿',
  presupuesto: '💸',
  vivienda:    '🏠',
  impuestos:   '🧾',
  jubilacion:  '🏥',
  comparativa: '📊',
}

const NIVEL_LABEL: Record<number, string> = {
  0: 'Nivel 0 · Empezar',
  1: 'Nivel 1 · Ahorrar',
  2: 'Nivel 2 · Invertir',
  3: 'Nivel 3 · Cripto',
}

const NIVEL_COLOR: Record<number, string> = {
  0: '#1A6FA8',
  1: '#2D6A4F',
  2: '#991B1B',
  3: '#7C5C10',
}

const NIVEL_BG: Record<number, string> = {
  0: '#E8F4FD',
  1: '#D8F3DC',
  2: '#FEE2E2',
  3: '#F5EDD0',
}

export default async function OGImage({ params }: { params: { slug: string } }) {
  let article
  try { article = getArticleBySlug(params.slug) }
  catch {
    // fallback generic OG
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: '#1A3D2B',
          }}
        >
          <span style={{ fontFamily: 'serif', fontSize: 72, fontWeight: 900, color: '#fff' }}>
            Dinero Futuro
          </span>
        </div>
      ),
      { ...size },
    )
  }

  const emoji = CATEGORIA_EMOJI[article.categoria] ?? '💰'
  const nivelColor = NIVEL_COLOR[article.nivel]
  const nivelBg    = NIVEL_BG[article.nivel]
  const nivelLabel = NIVEL_LABEL[article.nivel]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: '#1A3D2B', padding: '60px 72px', position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: 'absolute', top: -120, right: -120, width: 480, height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(82,183,136,.25), transparent 70%)',
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: 'absolute', bottom: -80, left: 80, width: 320, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,150,62,.2), transparent 70%)',
          }}
        />

        {/* Top row: brand + level */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#52B788', marginRight: 6,
              }}
            />
            <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 20, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              DINERO FUTURO
            </span>
          </div>

          <div
            style={{
              background: nivelBg, color: nivelColor,
              padding: '6px 16px', borderRadius: 8,
              fontSize: 14, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase',
            }}
          >
            {nivelLabel}
          </div>
        </div>

        {/* Content area */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'center', flex: 1 }}>
          {/* Left: emoji */}
          <div
            style={{
              width: 160, height: 160, borderRadius: 32, flexShrink: 0,
              background: 'rgba(255,255,255,.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80,
            }}
          >
            {emoji}
          </div>

          {/* Right: title + extract */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            <h1
              style={{
                fontSize: article.title.length > 60 ? 38 : 46,
                fontWeight: 900, color: '#fff', lineHeight: 1.15,
                margin: 0, letterSpacing: '-0.5px',
              }}
            >
              {article.title}
            </h1>
            <p
              style={{
                fontSize: 20, color: 'rgba(255,255,255,.6)', lineHeight: 1.55,
                margin: 0, maxWidth: 560,
              }}
            >
              {article.extracto}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 36, paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, color: '#52B788' }}>📖</span>
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 17 }}>
              {article.lectura} min de lectura
            </span>
          </div>
          <div
            style={{
              background: '#B8963E', color: '#1A3D2B',
              padding: '8px 20px', borderRadius: 8,
              fontSize: 16, fontWeight: 700,
            }}
          >
            ✓ Solución directa
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
