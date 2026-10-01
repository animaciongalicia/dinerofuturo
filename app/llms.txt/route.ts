import { getAllArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/utils'

// Se genera en build: el recuento y los enlaces siempre coinciden con el contenido real
export const dynamic = 'force-static'

const CATEGORIAS: Array<[string, string]> = [
  ['ahorro', 'Ahorro'],
  ['inversion', 'Inversión'],
  ['presupuesto', 'Presupuesto'],
  ['hipotecas', 'Hipotecas'],
  ['banca', 'Neobancos y banca'],
  ['cripto', 'Criptomonedas'],
  ['comparativa', 'Comparativas'],
  ['jubilacion', 'Jubilación'],
  ['finanzas', 'Finanzas personales'],
  ['impuestos', 'Impuestos'],
]

export function GET() {
  const articles = getAllArticles()
  const u = (p: string) => siteUrl(p)

  const porCategoria = CATEGORIAS.map(([slug, label]) => {
    const items = articles.filter(a => a.categoria === slug)
    if (!items.length) return ''
    const lines = items.map(a => `- [${a.title}](${u(`/articulo/${a.slug}`)}): ${a.extracto}`).join('\n')
    return `### ${label}\n\n${lines}`
  }).filter(Boolean).join('\n\n')

  const body = `# Dinero Futuro

> Educación financiera práctica en español: ahorro, inversión, hipotecas, banca y criptomonedas, sin jerga y sin humo. Contenido educativo, no asesoramiento financiero personalizado.

Dinero Futuro es un blog de finanzas personales para personas sin formación financiera previa. El contenido está organizado en 4 niveles de dificultad progresiva y cubre España y varios países de Latinoamérica (México, Colombia, Argentina, Chile).

## Secciones principales

- [Inicio](${u('/')})
- [Empieza aquí](${u('/empieza-aqui')}): guía de entrada según tu situación
- [¿Qué hago con mi dinero? — Diagnóstico](${u('/que-hacer-con-mi-dinero')})
- [Todos los artículos](${u('/articulos')})
- [Finanzas personales](${u('/finanzas-personales')})
- [Glosario financiero](${u('/glosario')})
- [Sobre Dinero Futuro](${u('/sobre')})

## Niveles

- [Nivel 0 — Empezar desde cero](${u('/nivel/0')})
- [Nivel 1 — Ahorrar](${u('/nivel/1')})
- [Nivel 2 — Invertir](${u('/nivel/2')})
- [Nivel 3 — Cripto y avanzado](${u('/nivel/3')})

## Herramientas (calculadoras gratuitas, sin registro)

- [Calculadora de interés compuesto](${u('/herramientas/interes-compuesto')})
- [Calculadora de fondo de emergencia](${u('/herramientas/fondo-emergencia')})
- [Calculadora de hipoteca](${u('/herramientas/calculadora-hipoteca')})
- [Calculadora de objetivo de ahorro](${u('/herramientas/objetivo-ahorro')})
- [Calculadora de número FIRE](${u('/herramientas/numero-fire')})

## Perfiles de inversor

- [Empezando desde cero](${u('/perfiles-inversor/empezando-desde-cero')})
- [Conservador](${u('/perfiles-inversor/inversor-conservador')})
- [Moderado](${u('/perfiles-inversor/inversor-moderado')})
- [Dinámico](${u('/perfiles-inversor/inversor-dinamico')})
- [FIRE](${u('/perfiles-inversor/perfil-fire')})

## Por país

- [España](${u('/pais/espana')}) · [México](${u('/pais/mexico')}) · [Colombia](${u('/pais/colombia')}) · [Argentina](${u('/pais/argentina')}) · [Chile](${u('/pais/chile')})

## Información

- Artículos publicados: ${articles.length}
- Idioma: español
- Enfoque: educativo, sin asesoramiento financiero personalizado
- Sitemap: ${u('/sitemap.xml')}
- RSS: ${u('/feed.xml')}

## Artículos

${porCategoria}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
