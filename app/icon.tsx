import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A3D2B',
          color: '#95D5B2',
          fontSize: 300,
          fontWeight: 900,
          borderRadius: 96,
        }}
      >
        DF
      </div>
    ),
    { ...size },
  )
}
