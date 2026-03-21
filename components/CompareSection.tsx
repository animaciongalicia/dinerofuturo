import Link from 'next/link'

const comparisons = [
  { rank: '01', name: 'MyInvestor',     value: '0.35%', sub: 'comisión total', pct: 72 },
  { rank: '02', name: 'Indexa Capital', value: '0.42%', sub: 'comisión total', pct: 58 },
  { rank: '03', name: 'Finizens',       value: '0.55%', sub: 'comisión total', pct: 38 },
]

export default function CompareSection() {
  return (
    <section className="py-[52px]">
      <div className="max-w-wrap mx-auto px-7">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-fraunces text-[24px] font-bold text-ink tracking-[-0.3px]">Comparativa del mes</h2>
          <Link href="/categoria/comparativa" className="text-[13px] text-moss font-semibold flex items-center gap-1 hover:text-forest">
            Ver todas las comparativas →
          </Link>
        </div>

        <div className="bg-white border border-border rounded-[20px] overflow-hidden">
          <div className="grid grid-cols-2 max-lg:grid-cols-1">
            {/* Left — dark */}
            <div className="p-[36px_40px] bg-forest text-white flex flex-col justify-center">
              <div className="text-[11px] font-semibold tracking-[.12em] uppercase text-sage mb-3">
                Comparativa sin sesgo · Marzo 2026
              </div>
              <h3 className="font-fraunces text-[28px] font-bold leading-[1.25] mb-[10px]">
                Indexa vs MyInvestor vs Finizens — ¿Cuál cobra realmente menos?
              </h3>
              <p className="text-[14px] text-white/65 leading-[1.6] mb-5">
                Analizamos comisiones reales, rentabilidad a 5 años, facilidad de uso y atención al cliente. Sin afiliados que nos paguen la posición.
              </p>
              <p className="text-[12px] text-white/40 italic">
                📌 Actualizado con datos de marzo 2026. Sin patrocinadores.
              </p>
            </div>

            {/* Right */}
            <div className="p-[36px_40px] flex flex-col gap-4 justify-center">
              {comparisons.map(({ rank, name, value, sub, pct }) => (
                <div key={name} className="flex items-center gap-[14px] p-[14px] bg-cream border border-border rounded-xl">
                  <div className="font-fraunces text-[20px] font-black text-border w-6 flex-shrink-0">{rank}</div>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-ink">{name}</div>
                    <div className="h-[6px] rounded-full bg-mist mt-[5px] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sage to-mint"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-fraunces text-[22px] font-black text-moss">{value}</div>
                    <div className="text-[11px] text-ink3">{sub}</div>
                  </div>
                </div>
              ))}

              <Link
                href="/categoria/comparativa"
                className="mt-[6px] w-full bg-gold text-forest px-[26px] py-[14px] rounded-[10px] text-[14px] font-bold text-center hover:brightness-110 transition-all"
              >
                Ver comparativa completa →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
