'use client'

interface AdUnitProps {
  slot: string
  format?: 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export default function AdUnit({ slot, format = 'rectangle', className = '' }: AdUnitProps) {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID

  const sizeClass =
    format === 'horizontal' ? 'h-24 w-full' :
    format === 'vertical'   ? 'h-96 w-full' :
                              'h-64 w-full'

  // Dev placeholder
  if (process.env.NODE_ENV === 'development' || !ADSENSE_ID) {
    return (
      <div className={`${sizeClass} ${className} bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs`}>
        Espacio publicitario ({format})
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="text-[11px] text-ink3/50 mb-1 uppercase tracking-[.08em]">Publicidad</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
