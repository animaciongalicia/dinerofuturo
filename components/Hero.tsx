import Link from 'next/link'

const problems = [
  {
    ico: '💸',
    bg: 'rgba(99,179,237,.15)',
    title: 'No me llega a fin de mes aunque gano bien',
    sub: '→ Presupuesto en 20 min sin apps raras',
    href: '/categoria/presupuesto',
  },
  {
    ico: '📈',
    bg: 'rgba(82,183,136,.15)',
    title: 'Tengo 5.000€ parados y no sé qué hacer',
    sub: '→ Las 4 opciones según tu perfil de riesgo',
    href: '/articulo/como-empezar-a-invertir-desde-cero',
  },
  {
    ico: '🏠',
    bg: 'rgba(184,150,62,.15)',
    title: '¿Comprar o alquilar? No sé calcular cuál sale mejor',
    sub: '→ Calculadora con tus números reales',
    href: '/herramientas',
  },
  {
    ico: '₿',
    bg: 'rgba(251,191,36,.15)',
    title: 'Todo el mundo habla de cripto y no entiendo nada',
    sub: '→ Cripto explicado sin morir en el intento',
    href: '/nivel/3',
  },
]

export default function Hero() {
  return (
    <section className="bg-forest overflow-hidden relative">
      {/* Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%,rgba(82,183,136,.15) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(184,150,62,.1) 0%,transparent 40%)',
        }}
      />

      <div className="max-w-wrap mx-auto px-7 pt-[60px] grid grid-cols-2 gap-0 min-h-[520px] max-lg:grid-cols-1">
        {/* Left */}
        <div className="pb-[60px] flex flex-col justify-center animate-fade-up">
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-sage mb-[18px] flex items-center gap-2 before:content-[''] before:block before:w-6 before:h-px before:bg-sage">
            Educación financiera real
          </div>
          <h1 className="font-fraunces text-[52px] max-sm:text-[34px] font-black text-white leading-[1.1] tracking-[-0.5px] mb-4">
            Tu dinero necesita<br />un plan, no<br />
            <em className="not-italic font-bold text-mint">un máster</em>
          </h1>
          <p className="text-[16px] text-white/65 leading-[1.7] mb-7 max-w-[440px]">
            Artículos prácticos para resolver problemas reales con tu dinero. Sin jerga, sin humo, sin venderte nada que no te sirva.
          </p>
          <div className="flex gap-3 flex-wrap mb-10">
            <Link
              href="/nivel/0"
              className="bg-gold text-forest px-[26px] py-[14px] rounded-[10px] text-[14px] font-bold hover:brightness-110 transition-all inline-flex items-center gap-[7px]"
            >
              ¿Por dónde empiezo? →
            </Link>
            <Link
              href="/herramientas"
              className="bg-white/[.08] text-white border-[1.5px] border-white/[.22] px-[26px] py-[14px] rounded-[10px] text-[14px] font-medium hover:bg-white/[.15] transition-all inline-flex items-center"
            >
              Ver herramientas gratis
            </Link>
          </div>
          <div className="flex gap-8">
            {[
              { num: '4', label: 'niveles de aprendizaje' },
              { num: '+120', label: 'artículos resueltos' },
              { num: '0€', label: 'para empezar' },
            ].map(({ num, label }) => (
              <div key={label} className="border-l border-white/[.12] pl-5">
                <div className="font-fraunces text-[28px] font-black text-white leading-none">{num}</div>
                <div className="text-[11px] text-white/45 mt-[3px] tracking-[.02em]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — problem cards */}
        <div className="pt-10 flex flex-col justify-start gap-[10px] relative max-lg:hidden animate-fade-up-2 before:content-['¿Cuál_es_tu_situación?'] before:text-[11px] before:font-semibold before:tracking-[.1em] before:uppercase before:text-white/35 before:mb-1">
          {problems.map(({ ico, bg, title, sub, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-white/[.07] border border-white/10 rounded-xl px-4 py-[14px] flex items-center gap-[14px] cursor-pointer group relative overflow-hidden transition-all hover:bg-white/[.13] hover:border-white/20 hover:pr-[38px]"
            >
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[19px] flex-shrink-0"
                style={{ background: bg }}
              >
                {ico}
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-white leading-[1.3]">{title}</div>
                <div className="text-[11.5px] text-sage mt-[2px] font-medium">{sub}</div>
              </div>
              <span className="absolute right-4 text-[14px] text-sage opacity-0 -translate-x-[6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
