import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de afiliados',
  description: 'Cómo funciona la política de enlaces de afiliado en Dinero Futuro: transparencia total sobre cómo ganamos dinero y por qué no afecta a nuestra independencia editorial.',
}

export default function AfiliadosPage() {
  return (
    <div className="max-w-[740px] mx-auto px-7 py-14">
      <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-2">
        Política de afiliados
      </h1>
      <p className="text-[13px] text-ink3 mb-10">Última actualización: marzo 2026</p>

      <div className="prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">

        <h2>¿Qué es un enlace de afiliado?</h2>
        <p>
          Algunos de los enlaces que aparecen en Dinero Futuro son enlaces de afiliado. Esto significa que si haces clic en uno de esos enlaces y contratas o te registras en el producto o servicio al que apunta, Dinero Futuro puede recibir una pequeña comisión por parte del proveedor — sin ningún coste adicional para ti.
        </p>
        <p>
          Esta comisión es la forma principal con la que este proyecto se financia, junto con la publicidad contextual. Nos permite mantener todo el contenido gratuito y sin muros de pago.
        </p>

        <h2>¿Cómo identificamos los enlaces de afiliado?</h2>
        <p>
          Cuando un enlace es de afiliado, lo indicamos en el contexto del artículo o comparativa donde aparece. No ocultamos esta relación.
        </p>
        <p>
          Los programas de afiliados con los que trabajamos o podemos trabajar incluyen plataformas y productos del sector financiero como brókers, neobancos, aplicaciones de inversión y herramientas de ahorro disponibles en España y Latinoamérica. Todos cumplen con la regulación financiera aplicable en sus mercados.
        </p>

        <h2>¿Afecta esto a nuestra opinión?</h2>
        <p>
          No. Esta es la regla que nos damos:
        </p>
        <ul>
          <li><strong>Solo recomendamos productos que recomendaríamos aunque no hubiera comisión.</strong> Si un producto no nos parece adecuado para la mayoría de lectores, no lo enlazamos, independientemente de si hay acuerdo económico o no.</li>
          <li><strong>La existencia de un acuerdo de afiliado nunca mejora la valoración de un producto.</strong> Si Trade Republic, Revolut o cualquier otro aparece bien valorado es porque lo consideramos bueno para un perfil determinado, no por razones comerciales.</li>
          <li><strong>Señalamos los defectos.</strong> Las comparativas de Dinero Futuro incluyen contras y limitaciones de cada producto. Un producto con afiliado puede salir peor valorado que uno sin afiliado si así lo consideramos más honesto.</li>
        </ul>

        <h2>¿Qué hacemos con esos ingresos?</h2>
        <p>
          Los ingresos de afiliados y publicidad se reinvierten en el proyecto: tiempo de escritura y revisión, alojamiento, herramientas y mejoras del sitio. Dinero Futuro no tiene inversores ni acuerdos editoriales con las empresas que menciona.
        </p>

        <h2>Legislación aplicable</h2>
        <p>
          Esta política cumple con los requisitos de la <strong>Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)</strong> y con las directrices de transparencia publicitaria de la Comisión Federal de Comercio de Estados Unidos (FTC), que exigen revelar las relaciones comerciales que puedan influir en el contenido.
        </p>
        <p>
          Si tienes cualquier duda sobre si un enlace concreto es de afiliado o sobre nuestra política editorial, puedes escribirnos a <a href="mailto:hola@dinerofuturo.online">hola@dinerofuturo.online</a>.
        </p>

      </div>

      <div className="mt-12 pt-8 border-t border-border flex gap-4 text-[13px] text-ink3">
        <Link href="/aviso-legal" className="hover:text-moss transition-colors">Aviso legal</Link>
        <Link href="/privacidad" className="hover:text-moss transition-colors">Política de privacidad</Link>
        <Link href="/cookies" className="hover:text-moss transition-colors">Política de cookies</Link>
      </div>
    </div>
  )
}
