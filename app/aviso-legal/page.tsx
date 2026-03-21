import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Información legal sobre Dinero Futuro: titular, objeto del sitio, propiedad intelectual y responsabilidades.',
}

export default function AvisoLegalPage() {
  return (
    <div className="max-w-[740px] mx-auto px-7 py-14">
      <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-2">Aviso legal</h1>
      <p className="text-[13px] text-ink3 mb-10">Última actualización: marzo 2026</p>

      <div className="prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">

        <h2>1. Datos del titular</h2>
        <p>
          En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa que este sitio web, accesible bajo el dominio <strong>dinerofuturo.com</strong> (en adelante, "el Sitio"), es titularidad de:
        </p>
        <ul>
          <li><strong>Nombre / Razón social:</strong> [NOMBRE DEL TITULAR]</li>
          <li><strong>NIF/CIF:</strong> [NIF]</li>
          <li><strong>Domicilio:</strong> [DIRECCIÓN]</li>
          <li><strong>Email de contacto:</strong> hola@dinerofuturo.com</li>
        </ul>
        <p className="text-[13px] text-ink3 italic">
          Completa estos datos antes de publicar el sitio. Son obligatorios por la LSSI-CE española.
        </p>

        <h2>2. Objeto del sitio web</h2>
        <p>
          Dinero Futuro es un blog de educación financiera cuyo objetivo es divulgar conceptos, estrategias y recursos relacionados con las finanzas personales, el ahorro y la inversión para el público hispanohablante.
        </p>
        <p>
          El contenido publicado tiene carácter exclusivamente <strong>educativo e informativo</strong>. No constituye, en ningún caso, asesoramiento financiero, fiscal, legal ni de inversión personalizado.
        </p>

        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio (textos, imágenes, gráficos, logotipos, código fuente y diseño) son propiedad del titular o de terceros que han autorizado su uso. Quedan reservados todos los derechos de propiedad intelectual e industrial.
        </p>
        <p>
          Queda prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos sin autorización expresa y por escrito del titular, salvo en los casos previstos por la legislación vigente.
        </p>

        <h2>4. Exclusión de responsabilidad</h2>
        <p>
          El titular no garantiza la exactitud, exhaustividad o actualidad de los contenidos publicados. El Sitio puede contener errores u omisiones. La información puede quedar desactualizada.
        </p>
        <p>
          <strong>El titular no se responsabiliza de las decisiones financieras que el usuario pueda tomar basándose en la información publicada.</strong> Toda decisión de inversión o financiera debe tomarse previo asesoramiento profesional cualificado.
        </p>
        <p>
          El titular tampoco se responsabiliza del contenido de sitios externos a los que pueda enlazar el Sitio.
        </p>

        <h2>5. Política de enlaces (afiliados)</h2>
        <p>
          El Sitio puede incluir enlaces de afiliado a productos o servicios financieros. Cuando esto ocurra, se indicará expresamente. El titular puede percibir una comisión por las contrataciones realizadas a través de dichos enlaces, sin coste adicional para el usuario y sin que ello influya en la valoración del producto o servicio.
        </p>

        <h2>6. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen e interpretan conforme a la legislación española. Para la resolución de cualquier controversia, las partes, con renuncia expresa a su propio fuero, se someten a los Juzgados y Tribunales del domicilio del titular.
        </p>
      </div>
    </div>
  )
}
