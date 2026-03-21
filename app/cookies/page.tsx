import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Información sobre las cookies que utiliza Dinero Futuro y cómo gestionarlas.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-[740px] mx-auto px-7 py-14">
      <h1 className="font-fraunces text-[38px] font-black text-ink tracking-[-0.5px] mb-2">Política de cookies</h1>
      <p className="text-[13px] text-ink3 mb-10">Última actualización: marzo 2026</p>

      <div className="prose prose-base max-w-none prose-headings:font-fraunces prose-headings:text-ink prose-headings:tracking-tight prose-h2:text-[22px] prose-h2:font-bold prose-h2:mt-8 prose-p:text-ink2 prose-p:leading-[1.75]">

        <p>
          Una <strong>cookie</strong> es un pequeño archivo de texto que un sitio web guarda en tu navegador cuando lo visitas. Las cookies permiten que el sitio recuerde información sobre tu visita (idioma, preferencias, etc.) y, en algunos casos, sirven para medir el uso del sitio.
        </p>

        <h2>1. Cookies propias</h2>
        <p>
          Dinero Futuro utiliza actualmente las siguientes cookies propias:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Finalidad</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>df_newsletter</code></td>
                <td>Recuerda si ya te has suscrito al newsletter para no mostrarte el banner de nuevo</td>
                <td>1 año</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>2. Cookies de análisis (terceros)</h2>
        <p>
          Si el sitio tiene activado Google Analytics 4, se instalan las siguientes cookies de análisis:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Finalidad</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>_ga</code></td>
                <td>Google</td>
                <td>Distinguir usuarios únicos</td>
                <td>2 años</td>
              </tr>
              <tr>
                <td><code>_ga_*</code></td>
                <td>Google</td>
                <td>Mantener el estado de la sesión</td>
                <td>2 años</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Google Analytics está configurado con anonimización de IP activada. Los datos recogidos son estadísticos y no permiten identificarte personalmente. Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
        </p>

        <h2>3. Cookies de publicidad (si se activa AdSense)</h2>
        <p>
          Si en el futuro se activa Google AdSense, Google instalará cookies adicionales para mostrar anuncios relevantes. Actualizaremos esta política cuando eso ocurra. Google AdSense utiliza la cookie <code>NID</code> y otras para personalizar anuncios. Más información en <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.
        </p>

        <h2>4. Cómo gestionar las cookies</h2>
        <p>
          Puedes controlar y eliminar las cookies desde la configuración de tu navegador:
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>
          Ten en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del sitio.
        </p>

        <p>
          Para cualquier consulta sobre cookies, contacta en <strong>hola@dinerofuturo.com</strong>.
        </p>
      </div>
    </div>
  )
}
