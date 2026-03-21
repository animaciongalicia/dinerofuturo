import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — Dinero Futuro',
  description: 'Escríbenos para cualquier consulta, corrección o sugerencia.',
}

export default function ContactoPage() {
  return (
    <div className="max-w-[600px] mx-auto px-7 py-14">
      <div className="mb-10">
        <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-3">
          Contacto
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7]">
          ¿Tienes una pregunta, has encontrado un error o quieres proponer un tema? Escríbenos.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-[6px]">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full border border-border rounded-xl px-4 py-[10px] text-[14px] text-ink placeholder:text-ink3 outline-none focus:border-sage transition-colors"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-[6px]">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full border border-border rounded-xl px-4 py-[10px] text-[14px] text-ink placeholder:text-ink3 outline-none focus:border-sage transition-colors"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-[6px]">Mensaje</label>
            <textarea
              rows={5}
              placeholder="¿En qué podemos ayudarte?"
              className="w-full border border-border rounded-xl px-4 py-[10px] text-[14px] text-ink placeholder:text-ink3 outline-none focus:border-sage transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-forest text-white py-[12px] rounded-xl text-[14px] font-semibold hover:bg-moss transition-colors"
          >
            Enviar mensaje →
          </button>
        </div>
      </div>

      <p className="text-[14px] text-ink3 text-center">
        O escríbenos directamente a{' '}
        <a href="mailto:hola@dinerofuturo.com" className="text-moss font-semibold hover:text-forest">
          hola@dinerofuturo.com
        </a>
      </p>
    </div>
  )
}
