import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Dinero Futuro — Educación financiera en español'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 90px',
          background: '#1A3D2B',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#95D5B2', letterSpacing: 2 }}>
          DINERO FUTURO
        </div>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 900, lineHeight: 1.1, marginTop: 24 }}>
          Tu dinero necesita un plan, no un máster
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#D8F3DC', marginTop: 32 }}>
          Educación financiera práctica. Sin jerga, sin humo.
        </div>
      </div>
    ),
    { ...size },
  )
}
