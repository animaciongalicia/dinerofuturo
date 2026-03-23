import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo Dinero Futuro trata tus datos personales de acuerdo al RGPD.',
}

export default function PrivacidadPage() {
  return (
    <div className="max-w-[740px] mx-auto px-7 py-14">
      <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-2">Política de privacidad</h1>
      <p className="text-[13px] text-ink3 mb-10">Última actualización: marzo 2026</p>

      <div className="prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">

        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li><strong>Nombre:</strong> [NOMBRE DEL TITULAR]</li>
          <li><strong>NIF:</strong> [NIF]</li>
          <li><strong>Dirección:</strong> [DIRECCIÓN]</li>
          <li><strong>Email:</strong> hola@dinerofuturo.online</li>
        </ul>

        <h2>2. Qué datos recogemos y para qué</h2>

        <h3>Suscripción al newsletter (email)</h3>
        <p>
          Cuando te suscribes al newsletter proporcionas tu dirección de email. Utilizamos este dato únicamente para enviarte los artículos nuevos y comunicaciones relacionadas con el blog.
        </p>
        <ul>
          <li><strong>Base jurídica:</strong> Consentimiento explícito del interesado (art. 6.1.a RGPD)</li>
          <li><strong>Plazo de conservación:</strong> Hasta que te des de baja o solicites la eliminación</li>
          <li><strong>Comunicación a terceros:</strong> No cedemos datos a terceros salvo obligación legal. Los datos pueden alojarse en Google Sheets (Google LLC), sujeto a las cláusulas contractuales estándar de la UE</li>
        </ul>

        <h3>Datos de navegación (analytics)</h3>
        <p>
          Si tienes activado Google Analytics, se recogen datos de navegación anonimizados (páginas visitadas, tiempo en el sitio, país de procedencia). No se recogen datos personales identificables a través de analytics.
        </p>
        <ul>
          <li><strong>Base jurídica:</strong> Interés legítimo / consentimiento previo según legislación aplicable</li>
          <li><strong>Plazo de conservación:</strong> 14 meses (configuración por defecto de GA4)</li>
        </ul>

        <h2>3. Tus derechos</h2>
        <p>
          En virtud del RGPD tienes derecho a:
        </p>
        <ul>
          <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti</li>
          <li><strong>Rectificación:</strong> corregir datos incorrectos</li>
          <li><strong>Supresión:</strong> eliminar tus datos ("derecho al olvido")</li>
          <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento en determinadas circunstancias</li>
          <li><strong>Limitación:</strong> restringir el tratamiento en determinados casos</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos envía un email a <strong>hola@dinerofuturo.online</strong> con el asunto "Derechos RGPD". Responderemos en el plazo máximo de 30 días.
        </p>
        <p>
          También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>
        </p>

        <h2>4. Darte de baja del newsletter</h2>
        <p>
          Puedes darte de baja en cualquier momento enviando un email a hola@dinerofuturo.online con el asunto "Baja newsletter". Tramitaremos la baja en 24 horas.
        </p>

        <h2>5. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o destrucción. La comunicación entre tu navegador y el servidor está cifrada mediante HTTPS/TLS.
        </p>

        <h2>6. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política. Cuando lo hagamos, actualizaremos la fecha de la parte superior de esta página. Si los cambios son significativos, te informaremos por email si eres suscriptor.
        </p>
      </div>
    </div>
  )
}
