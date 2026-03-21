import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre el proyecto — Dinero Futuro',
  description: 'Qué es Dinero Futuro, por qué existe y quién lo escribe.',
}

export default function SobrePage() {
  return (
    <div className="max-w-[740px] mx-auto px-7 py-14">
      <div className="mb-10">
        <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-3">
          Sobre el proyecto
        </h1>
        <p className="text-[16px] text-ink2 leading-[1.7]">
          Por qué existe Dinero Futuro y para quién es.
        </p>
      </div>

      <div className="prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">

        <h2>El problema</h2>
        <p>
          La educación financiera en España y Latinoamérica está llena de contenido pensado para venderte algo: fondos de inversión caros, cursos de trading, libros de autoayuda disfrazados de finanzas, o simplemente humo. El que no te intenta vender algo, te habla con tanta jerga que acabas más perdido que al principio.
        </p>

        <h2>Por qué existe Dinero Futuro</h2>
        <p>
          Dinero Futuro nació para ser lo opuesto: artículos prácticos que resuelven problemas reales, escritos en lenguaje de la calle, sin agenda comercial oculta. Si algo tiene un enlace de afiliado, lo dices claramente. Si no sabes algo, también lo dices.
        </p>
        <p>
          El objetivo no es que te conviertas en trader ni en experto financiero. El objetivo es que tomes mejores decisiones con tu dinero: ahorrar más, endeudarte menos, invertir de forma sensata y entender lo que firmas.
        </p>

        <h2>Cómo está organizado</h2>
        <p>
          El contenido sigue una progresión de 4 niveles:
        </p>
        <ul>
          <li><strong>Nivel 0 — Empezar:</strong> conceptos básicos, presupuesto, fondo de emergencia.</li>
          <li><strong>Nivel 1 — Ahorrar:</strong> cuentas de ahorro, estrategias para gastar menos, automatizar el ahorro.</li>
          <li><strong>Nivel 2 — Invertir:</strong> fondos indexados, ETFs, carteras diversificadas.</li>
          <li><strong>Nivel 3 — Cripto:</strong> Bitcoin, blockchain y cómo no perder dinero en el intento.</li>
        </ul>

        <h2>Contacto</h2>
        <p>
          Para cualquier consulta, corrección o sugerencia: <strong>hola@dinerofuturo.com</strong>
        </p>
        <p>
          También puedes usar el{' '}
          <Link href="/contacto">formulario de contacto</Link>.
        </p>
      </div>
    </div>
  )
}
