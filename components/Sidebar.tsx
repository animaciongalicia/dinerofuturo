import Link from 'next/link'
import type { Article } from '@/lib/types'

const TOOLS = [
  { href: '/herramientas/interes-compuesto',    label: 'Interés compuesto',    ico: '🧮' },
  { href: '/herramientas/fondo-emergencia',     label: 'Fondo de emergencia',  ico: '🛡️' },
  { href: '/herramientas/calculadora-hipoteca', label: 'Calculadora hipoteca', ico: '🏠' },
  { href: '/herramientas/objetivo-ahorro',      label: 'Objetivo de ahorro',   ico: '🎯' },
  { href: '/herramientas/numero-fire',          label: 'Número FIRE',          ico: '🔥' },
]

const SECCIONES = [
  { href: '/categoria/hipotecas',    label: 'Hipotecas',           ico: '🏠' },
  { href: '/categoria/banca',        label: 'Neobancos',           ico: '📱' },
  { href: '/finanzas-personales',    label: 'Finanzas personales', ico: '💡' },
  { href: '/categoria/inversion',    label: 'Inversión',           ico: '📈' },
  { href: '/categoria/cripto',       label: 'Cripto',              ico: '₿'  },
]

interface Props {
  related?: Article[]
  topBlock?: React.ReactNode
  hideTools?: boolean
  hideSections?: boolean
}

export default function Sidebar({ related, topBlock, hideTools, hideSections }: Props) {
  return (
    <aside className="w-[268px] flex-shrink-0 flex flex-col gap-5 max-lg:hidden">

      {topBlock}

      {/* ¿Qué hago con mi dinero? — CTA destacado */}
      <div className="bg-ink rounded-2xl p-5 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[.1em] text-white/50 mb-2">Diagnóstico gratuito</p>
        <p className="font-fraunces text-[18px] font-bold leading-snug mb-2">
          ¿Qué hago con mi dinero?
        </p>
        <p className="text-[12.5px] text-white/70 mb-4 leading-relaxed">
          Responde 7 preguntas y recibe un plan financiero personalizado para tu situación exacta.
        </p>
        <Link
          href="/que-hacer-con-mi-dinero"
          className="block text-center bg-gold text-ink text-[13px] font-bold px-4 py-[9px] rounded-lg hover:opacity-90 transition-opacity"
        >
          Empezar el diagnóstico →
        </Link>
      </div>

      {/* Perfiles de inversor */}
      <div className="bg-paper border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3">Perfiles de inversor</p>
        </div>
        {[
          { href: '/perfiles-inversor/empezando-desde-cero', label: 'Empezando desde cero', ico: '🌱' },
          { href: '/perfiles-inversor/inversor-conservador',  label: 'Perfil conservador',   ico: '🛡️' },
          { href: '/perfiles-inversor/inversor-moderado',     label: 'Perfil moderado',       ico: '⚖️' },
          { href: '/perfiles-inversor/inversor-dinamico',     label: 'Perfil dinámico',       ico: '🚀' },
          { href: '/perfiles-inversor/perfil-fire',           label: 'Perfil FIRE',           ico: '🔥' },
        ].map(({ href, label, ico }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-5 py-[10px] border-b border-border last:border-0 hover:bg-cream transition-colors group"
          >
            <span className="text-[15px] leading-none">{ico}</span>
            <span className="text-[13px] font-medium text-ink2 group-hover:text-forest transition-colors">{label}</span>
          </Link>
        ))}
        <div className="px-5 py-3 bg-cream border-t border-border">
          <Link href="/perfiles-inversor" className="text-[12px] font-semibold text-moss hover:text-forest transition-colors">
            Ver todos los perfiles →
          </Link>
        </div>
      </div>

      {/* Artículos relacionados */}
      {related && related.length > 0 && (
        <div className="bg-paper border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3">También te puede interesar</p>
          </div>
          <ul>
            {related.map(a => (
              <li key={a.slug} className="border-b border-border last:border-0">
                <Link
                  href={`/articulo/${a.slug}`}
                  className="flex flex-col px-5 py-4 hover:bg-cream transition-colors group"
                >
                  <span className="text-[13.5px] font-semibold text-ink group-hover:text-forest transition-colors leading-snug mb-1">
                    {a.title}
                  </span>
                  <span className="text-[12px] text-ink3 leading-snug line-clamp-2">{a.extracto}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Herramientas */}
      {!hideTools && (
        <div className="bg-paper border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3">Calculadoras gratuitas</p>
          </div>
          <ul>
            {TOOLS.map(t => (
              <li key={t.href} className="border-b border-border last:border-0">
                <Link
                  href={t.href}
                  className="flex items-center gap-3 px-5 py-[11px] hover:bg-cream transition-colors group"
                >
                  <span className="text-[16px] leading-none">{t.ico}</span>
                  <span className="text-[13px] font-medium text-ink2 group-hover:text-forest transition-colors">{t.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Secciones */}
      {!hideSections && (
        <div className="bg-paper border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-ink3">Explorar secciones</p>
          </div>
          <ul>
            {SECCIONES.map(s => (
              <li key={s.href} className="border-b border-border last:border-0">
                <Link
                  href={s.href}
                  className="flex items-center gap-3 px-5 py-[11px] hover:bg-cream transition-colors group"
                >
                  <span className="text-[16px] leading-none">{s.ico}</span>
                  <span className="text-[13px] font-medium text-ink2 group-hover:text-forest transition-colors">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter */}
      <div className="bg-forest rounded-2xl p-5 text-white">
        <p className="font-fraunces text-[17px] font-bold leading-snug mb-2">
          Una píldora financiera cada semana
        </p>
        <p className="text-[12.5px] text-white/75 mb-4 leading-relaxed">
          Sin spam. Sin productos. Solo lo que necesitas saber.
        </p>
        <Link
          href="/#newsletter"
          className="block text-center bg-white text-forest text-[13px] font-bold px-4 py-[9px] rounded-lg hover:bg-cream transition-colors"
        >
          Suscribirme gratis →
        </Link>
      </div>

    </aside>
  )
}
